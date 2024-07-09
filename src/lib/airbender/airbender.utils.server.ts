"use server";

import { env } from "@/env";
import { airbender } from "./airbender.setup";

export const getAirbenderSessionFromServer = async (productKey?: string) => {
  return await airbender.fetchSession(
    productKey || env.NEXT_PUBLIC_AIRBENDER_PRODUCT_KEY
  );
};
