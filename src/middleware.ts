import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { env } from "./lib/env";

const REFRESH_TOKEN_COOKIE_NAME = "refresh_token";

const protectedRoutes = ["/marketplace/new", "/marketplace/profile"];
const publicOnlyRoutes = ["/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthenticated = request.cookies.has(REFRESH_TOKEN_COOKIE_NAME);
  console.log(request.cookies.getAll());

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/sign-in", env.BASE_URL);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (publicOnlyRoutes.some((route) => pathname.startsWith(route))) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", env.BASE_URL));
    }
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
