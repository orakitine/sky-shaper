import { setupAirbender, wrappedStreamUI } from "@airbend3r/client";

// instead of ai/rsc
const streamUI = wrappedStreamUI({
  productKey: "5wq6ii3z80a",
  logInputs: true,
  logOutputs: true,
  shouldValidateBeforeLogging: false,
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
