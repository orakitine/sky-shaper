import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const noneAuthedPaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/confirm-email",
    "/email-confirmed",
  ];

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If the user is not signed in and the current path is not /login or /register,
  // redirect the user to /login
  if (!session && !noneAuthedPaths.includes(req.nextUrl.pathname)) {
    // console.log("redirecting to /login because:", req.nextUrl.pathname);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If the user is signed in and the current path is /login or /register,
  // redirect the user to /
  if (session && noneAuthedPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
