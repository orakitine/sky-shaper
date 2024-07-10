import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const type = requestUrl.searchParams.get("type");

  console.log("confirm-email code", code);

  if (code && type === "signup") {
    try {
      const supabase = createRouteHandlerClient({ cookies });
      await supabase.auth.exchangeCodeForSession(code);
      return NextResponse.redirect(
        new URL("/email-confirmed?status=success", request.url)
      );
    } catch (error) {
      console.error("Error confirming email:", error);
      return NextResponse.redirect(
        new URL("/email-confirmed?status=error", request.url)
      );
    }
  }

  // If no code or wrong type, redirect to an error page or home page
  return NextResponse.redirect(
    new URL("/email-confirmed?status=error", request.url)
  );
}
