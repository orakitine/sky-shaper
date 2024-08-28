"use server";
import { env } from "@/env";

import { headers } from "next/headers";
import { airbender } from "./airbender.setup";

export const getAirbenderSessionFromServer = async (productKey?: string) => {
  let forwardedIp = headers().get("x-forwarded-for");
  let realIp = headers().get("x-real-ip");

  if (forwardedIp) {
    return await airbender.fetchSession(
      productKey || env.NEXT_PUBLIC_AIRBENDER_PRODUCT_KEY,
      forwardedIp
    );
  } else if (realIp) {
    return await airbender.fetchSession(
      productKey || env.NEXT_PUBLIC_AIRBENDER_PRODUCT_KEY,
      realIp
    );
  }

  // no ip set
  return await airbender.fetchSession(
    productKey || env.NEXT_PUBLIC_AIRBENDER_PRODUCT_KEY,
    "no ip set"
  );
};
