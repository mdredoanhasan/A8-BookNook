import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request) {
  const sessionCookie = getSessionCookie(request);

  // not logged in: go to the sign in page
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Add-Book",
    "/My-Books",
    "/My-Borrows",
    "/All-Books/:path+", // Book Details only, /All-Books stays public
  ],
};