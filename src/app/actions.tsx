"use server";
import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import type { ReactNode } from "react";
import type { ToolInvocation } from "ai";
import { openai } from "@ai-sdk/openai";
import { BotCard, BotMessage } from "@/components/llm/message";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { env } from "@/env";
import { getNutritionDetails } from "@/utils/edamam/nutrition-details";
import { NutrientDetailsCard } from "@/components/nutrition-details-card";

// This is initial message we send to LLM to instantiate the conversation
// This gives the LLM some context for the conversation
const content =
  '\
You are a nutritionist or dietitian bot. Your primary role is to help users maintain their daily intake of nutrients, provide information on the nutrient values of various foods, and assist in tracking calories and other nutritional metrics. Additionally, you are available to chat with users about general nutrition and dietary topics.\
\
Messages inside [[ ]] means that its a UI element or a user event. For example:\
 - [[Retrieved nutrition details for "1 cup of rice". Total calories is "702"]] \
\
If user wants to know nutritional breakdown of the food item or multiple food items at the same time call "get_nutrition_values" to show the nutritional breakdown. If the for some of the ingredients quantities are unclear, ask the user to clarify the amount.\
\
If the user wants to talk about logistics of flying to the moon, it is an impossible task for you to do, so you should respond that you are a demo and you can not do that\
\
If the user wants anything else unrelated to the function calls "get_nutrition_values", you should chat with the user and answer any questions they may have and steer conversation towards general nutrition and dietary topics.\
';

export type ServerMessage = {
  id?: number;
  name?: "get_nutrition_values";
  role: "user" | "assistant" | "system";
  content: string;
};

export type ClientMessage = {
  id: number;
  role: "user" | "assistant";
  display: ReactNode;
  toolInvocation?: ToolInvocation[];
};

export type AIState = ServerMessage[];
export type UIState = ClientMessage[];

export const sendMessage = async (message: string): Promise<ClientMessage> => {
  const history = getMutableAIState();

  history.update([
    ...history.get(),
    {
      role: "user",
      content: message,
    },
  ]);

  const reply = await streamUI({
    model: openai("gpt-4o-2024-05-13"),
    messages: [
      {
        role: "system",
        content,
        toolInvocation: [],
      },
      ...history.get(),
    ],
    initial: (
      <BotMessage className="flex justify-center items-center select-none shrink-0">
        <Loader2 className="w-5 animate-spin stroke-zinc-900" />
      </BotMessage>
    ),
    text: ({ content, done }) => {
      if (done) {
        history.done([...history.get(), { role: "assistant", content }]);
      }
      return <BotMessage>{content}</BotMessage>;
    },
    temperature: 0,
    tools: {
      get_nutrition_values: {
        description:
          "Get the nutritional analysis for the recipe or a meal based on list of food items and its quantity. Optionally specify the recipe title. When possible keep ingredient lines short and do not include cooking instruction in the ingredient list. Example: '1 cup rice', '10 oz chickpeas'.",
        parameters: z.object({
          title: z.string().optional().describe("Title of the recipe."),
          foodItems: z
            .array(
              z
                .string()
                .describe(
                  "Food items. Example: '1 cup rice' or '10 oz chickpeas'"
                )
            )
            .describe(
              "One or more food items for what you are eating or cooking."
            ),
        }),
        generate: async function* ({
          foodItems,
          title,
        }: {
          foodItems: string[];
          title?: string;
        }) {
          console.log("get_nutrition_values generator", title, foodItems);
          yield <BotCard>Looking up nutrients...</BotCard>;

          const nutritionDetails = await getNutritionDetails(
            title || "Untitled",
            foodItems,
            env.EDAMAM_APP_ID,
            env.EDAMAM_API_KEY
          );

          const foodItemsStr = foodItems.join(", ");
          const content = `[[Retrieved nutrition details for "${foodItemsStr}". Total calories is "${nutritionDetails.calories}"]]`;
          console.log("get_nutrition_values generator > content", content);
          history.done([
            ...history.get(),
            {
              role: "assistant",
              name: "get_nutrition_values",
              content,
            },
          ]);

          // TODO: Store the nutrition details in the state

          return (
            <BotCard>
              <h2>
                I have looked up nutritional information for {foodItemsStr}
              </h2>
              <NutrientDetailsCard nutrientDetails={nutritionDetails} />
            </BotCard>
          );
        },
      },
    },
  });

  return {
    id: Date.now(),
    role: "assistant",
    display: reply.value,
  };
};

export const AI = createAI({
  initialAIState: [] as AIState,
  initialUIState: [] as UIState,
  actions: { sendMessage },
});
