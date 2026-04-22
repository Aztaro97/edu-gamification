import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const SESSION_COOKIE = "better-auth.session_token";
const PUBLIC_PATHS = new Set(["/login"]);

function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(en|ar)/, "") || "/";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (PUBLIC_PATHS.has(stripLocale(pathname))) {
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
