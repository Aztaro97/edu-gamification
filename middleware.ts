import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// In production with useSecureCookies: true, better-auth uses __Secure- prefix
const SESSION_COOKIES = [
  "better-auth.session_token",
  "__Secure-better-auth.session_token",
];

const PUBLIC_PATHS = new Set(["/login"]);

function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(en|ar)/, "") || "/";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const strippedPath = stripLocale(pathname);

  if (PUBLIC_PATHS.has(strippedPath)) {
    return intlMiddleware(request);
  }

  const hasSession = SESSION_COOKIES.some(
    (name) => !!request.cookies.get(name)?.value
  );

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
