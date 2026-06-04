import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ACCESS_COOKIE = "hcp-prototype-access";
const ACCESS_GRANTED = "granted";

export function middleware(request: NextRequest) {
  const password = process.env.PROTOTYPE_ACCESS_PASSWORD;

  if (!password) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname === "/prototypes/hcp/access") {
    return NextResponse.next();
  }

  if (request.cookies.get(ACCESS_COOKIE)?.value === ACCESS_GRANTED) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/prototypes/hcp/access";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/prototypes/hcp/:path*"],
};
