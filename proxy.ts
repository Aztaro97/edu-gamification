import createMiddleware from "next-intl/middleware";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { auth } from "./lib/auth";

const intlMiddleware = createMiddleware(routing);

const PUBLIC_PATHS = new Set(["/login"]);

function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(en|ar)/, "") || "/";
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({
        headers: await headers()
    })

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (PUBLIC_PATHS.has(stripLocale(pathname))) {
    return intlMiddleware(request);
  }

  if (!session) {
    const localeMatch = pathname.match(/^\/(en|ar)/);
    const locale = localeMatch?.[1] ?? routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
