"use client";

import { getAirbenderSessionFromServer } from "./airbender.utils.server";

type Config = {
  id: number;
  name: string;
  data: any;
};

const isTypeOfErrorResponse = (
  response: any
): response is { status: "error"; message: string } => {
  return response.status && response.status === "error";
};

type SessionResponse = {
  session: string;
  config: Config;
};

export const getAirbenderSession = async (): Promise<SessionResponse> => {
  // Check if the session is already saved
  const data = {
    session: sessionStorage.getItem("airbender-session"),
    config: JSON.parse(sessionStorage.getItem("airbender-config") || "{}"),
  };

  // If the session is already saved, return it
  if (data.session && data.config) return data as SessionResponse;

  // Otherwise, get a new session
  const newSession = await getAirbenderSessionFromServer();

  // Check if the response is an error
  if (isTypeOfErrorResponse(newSession)) throw new Error(newSession.message);

  // Save the values
  sessionStorage.setItem("airbender-session", newSession.id);
  sessionStorage.setItem("airbender-config", JSON.stringify(newSession.config));

  // Check if the new session has a config, if not throw an error
  if (!newSession.config) {
    throw new Error("Session config is missing");
  }

  return {
    session: newSession.id,
    config: newSession.config,
  };
};
