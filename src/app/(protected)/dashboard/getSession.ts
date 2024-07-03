"use server";
import { airbender } from "./setup";

const productKey = "5wq6ii3z80a";

export const getSessionFromServer = async () => {
  return await airbender.fetchSession(productKey || "");
};
