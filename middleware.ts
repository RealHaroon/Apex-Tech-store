import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { USER_SESSION_COOKIE, verifyUserSessionToken } from "@/lib/user-auth";

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};

const PUBLIC_ACCOUNT_PATHS = ["/account/login", "/account/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();

    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const valid = await verifySessionToken(token);
    if (!valid) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/account")) {
    if (PUBLIC_ACCOUNT_PATHS.includes(pathname)) return NextResponse.next();

    const token = request.cookies.get(USER_SESSION_COOKIE)?.value;
    const userId = await verifyUserSessionToken(token);
    if (!userId) {
      const loginUrl = new URL("/account/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
