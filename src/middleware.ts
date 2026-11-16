import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Protect /admin and all subroutes except /admin/login
  if (!token && pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If already authenticated and visiting /admin/login, redirect to /admin dashboard
  if (token && pathname === "/admin/login") {
    const adminUrl = new URL("/admin", request.url);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export default middleware;

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
