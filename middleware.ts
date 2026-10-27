import { NextRequest, NextResponse } from "next/server";
import { legacyDestination } from "./app/legacy-redirects";

export function middleware(request: NextRequest) {
  const destination = legacyDestination(request.nextUrl.pathname);
  if (!destination) return NextResponse.next();
  const target = new URL(destination, request.url);
  target.search = request.nextUrl.search;
  // An explicit fragment prevents an old fragment carrying onto the new page.
  if (!target.hash) target.hash = "#";
  return NextResponse.redirect(target, 301);
}

export const config = {
  matcher: ["/engage/:path*", "/framework/:path*", "/cpd/:path*", "/service-charter/:path*", "/workforce/:path*", "/regions/:path*", "/partnership/:path*"],
};
