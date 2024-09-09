"use server";
import { env } from "@/env";
import { createServerClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { airbender } from "./airbender.setup";
export const getAirbenderSessionFromServer = async (productKey?: string) => {
  const supabase = createServerClient();

  const headersList = headers();
  const ipAddress =
    headersList.get("x-forwarded-for") ||
    headersList.get("x-real-ip") ||
    "no ip set";
  const finalProductKey = productKey || env.NEXT_PUBLIC_AIRBENDER_PRODUCT_KEY;
  const user = await supabase.auth.getUser();
  const userData = user.data.user;
  if (!userData) {
    throw new Error("User not found");
  }
  const userName = userData.user_metadata.name;

  const sessionId = await airbender.fetchSession({
    productKey: finalProductKey,
    ipAddress,
    name: userName,
  });

  console.log("sessionId", sessionId.id);
  return sessionId;
};
