import { NextResponse } from "next/server";

const validateToken = (req) => {
  const headerToken = req.headers.get("authorization");
  const regex = new RegExp(`^Bearer (${process.env.APP_SECRET})$`, "i");
  const apiToken = headerToken?.match(regex)?.[1];
  if (!apiToken) {
    return NextResponse.redirect(new URL("/api/unauthorized", req.url));
  }
  return NextResponse.next();
};

const initCookies = (req) => {
  const res = NextResponse.next();

  // init locale
  if (!req.cookies.has("locale")) {
    res.cookies.set("locale", "en");
  }

  return res;
};

export const config = {
  matcher: [
    "/api/admin/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/api/admin/")) {
    return validateToken(req);
  } else {
    return initCookies(req);
  }
}
