import { useCallback, useEffect, useState } from "react";
import {
  deleteAirbenderSession,
  getAirbenderSession,
} from "./airbender.utils.client";

export function useAirbenderSession() {
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeAirbenderSession = useCallback(async () => {
    if (!isInitialized) {
      try {
        console.log("Initializing Airbender session");
        deleteAirbenderSession();
        await getAirbenderSession();
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize Airbender session:", error);
        // Handle the error appropriately (e.g., show a notification to the user)
      }
    }
  }, [isInitialized]);

  useEffect(() => {
    initializeAirbenderSession();
  }, [initializeAirbenderSession]);

  return { isInitialized };
}
