import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  adminProtectedRoutes,
  commonProtectedRoutes,
  getDefaultDashboardRoute,
  isAuthRoute,
  isRouteMatches,
  userProtectedRoutes,
  UserRole,
} from "./utils/authUtils";
import { getSessionCookieName } from "./utils/tokenUtils";

import { jwtUtils } from "./utils/jwtUtils";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const sessionTokenName = await getSessionCookieName();
  const sessionToken = request.cookies.get(sessionTokenName)?.value;

  const isAuthenticated = !!accessToken && !!sessionToken;

  const isAdminRoute = isRouteMatches(pathname, adminProtectedRoutes);
  const isUserRoute = isRouteMatches(pathname, userProtectedRoutes);
  const isCommonRoute = isRouteMatches(pathname, commonProtectedRoutes);
  const isProtected = isAdminRoute || isUserRoute || isCommonRoute;
  const isAuth = isAuthRoute(pathname);

  // 1. Unauthenticated User Access Controls
  if (!isAuthenticated) {
    if (isProtected) {
      // Redirect to login page and preserve redirect destination path
      const redirectUrl = new URL("/auth/login", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  // 2. Authenticated User Payload Checks
  const decoded = accessToken ? jwtUtils.decodedToken(accessToken) : null;

  // If token is expired, treat the user as unauthenticated
  if (decoded && decoded.exp && decoded.exp * 1000 < Date.now()) {
    if (isProtected) {
      const redirectUrl = new URL("/auth/login", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      const response = NextResponse.redirect(redirectUrl);
      // Clear expired cookies
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      response.cookies.delete(sessionTokenName);
      return response;
    }
    return NextResponse.next();
  }

  const role = (decoded?.role as UserRole) || UserRole.USER;

  // Prevent authenticated users from visiting auth routes (login/register)
  if (isAuth) {
    const defaultRoute = getDefaultDashboardRoute(role);
    return NextResponse.redirect(new URL(defaultRoute, request.url));
  }

  // Role-Based Access Control (RBAC) Guard Rules
  if (isAdminRoute) {
    if (role !== UserRole.ADMIN && role !== UserRole.SUPER_ADMIN) {
      // Non-admins redirected away from admin dashboard back to regular dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (isUserRoute) {
    if (role === UserRole.ADMIN || role === UserRole.SUPER_ADMIN) {
      // Admins/Super-admins redirected away from regular dashboard to admin dashboard
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
