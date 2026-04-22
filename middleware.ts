import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

// Cookie name used by better-auth for session tracking
const SESSION_COOKIE = "better-auth.session_token";

const PUBLIC_PATHS = ["/login"];

function isPublicPath(pathname: string): boolean {
  const withoutLocale = pathname.replace(/^\/(en|ar)/, "") || "/";
  return PUBLIC_PATHS.includes(withoutLocale);
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let better-auth handle its own API routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Public pages (login) don't require auth
  if (isPublicPath(pathname)) {
    return intlMiddleware(request);
  }

  const hasSession = !!request.cookies.get(SESSION_COOKIE)?.value;

  if (!hasSession) {
    const localeMatch = pathname.match(/^\/(en|ar)/);
    const locale = localeMatch?.[1] ?? routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
