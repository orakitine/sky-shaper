import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const type = requestUrl.searchParams.get("type");

  console.log("confirm-email code", code);
  console.log("confirm-email type", type);

  if (code) {
    if (type === "signup") {
      try {
        const supabase = createRouteHandlerClient({ cookies });
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          console.error("Supabase error confirming email:", error);
          return NextResponse.redirect(
            new URL(`/email-confirmed?status=error}`, request.url)
          );
        }

        return NextResponse.redirect(
          new URL("/email-confirmed?status=success", request.url)
        );
      } catch (error) {
        console.error("Unexpected error during email confirmation:", error);
        return NextResponse.redirect(
          new URL(`/email-confirmed?status=error}`, request.url)
        );
      }
    } else {
      console.error("Invalid type for email confirmation:", type);
      return NextResponse.redirect(
        new URL(
          "/email-confirmed?status=error&message=invalid_type",
          request.url
        )
      );
    }
  } else {
    console.error("No code provided for email confirmation");
    return NextResponse.redirect(
      new URL("/email-confirmed?status=error&message=no_code", request.url)
    );
  }
}
