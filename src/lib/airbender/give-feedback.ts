"use server";

import { airbender } from "./airbender.setup";

export const giveFeedback = async (
  logId: string,
  feedback: {
    comment: string;
    rating: number;
    id?: string;
  },
  sessionID: string
) => {
  return JSON.parse(
    JSON.stringify(await airbender.logFeedback(logId, sessionID, feedback))
  );
};
