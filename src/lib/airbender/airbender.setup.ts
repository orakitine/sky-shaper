import { env } from "@/env";
import { setupAirbender, wrappedStreamUI } from "@airbend3r/client";

// instead of ai/rsc
const streamUI = wrappedStreamUI({
  productKey: env.NEXT_PUBLIC_AIRBENDER_PRODUCT_KEY,
  logInputs: true,
  logOutputs: true,
  shouldValidateBeforeLogging: true,
});

export const airbender = setupAirbender({
  sdks: {
    default: {
      llm: streamUI,
      name: "openAi",
      version: "gpt-4o-2024-05-13",
    },
  },
});

export const { llm: airbenderStreamUI } = airbender.sdk("default");
