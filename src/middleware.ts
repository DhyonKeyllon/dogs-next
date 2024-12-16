import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // ! TODO: Change this validation with a jwt validation lib
  const authenticated = !!token;

  if (!authenticated && req.nextUrl.pathname.startsWith("/conta")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (authenticated && req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/conta", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // ? which pages should this middleware exist on
  matcher: ["/conta/:path*", "/login/:path*"],
};
