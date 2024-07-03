"use client";
export const dynamic = "force-dynamic";

import { ChatList } from "@/components/chat-list";
import { ChatScrollAnchor } from "@/components/chat-scroll-anchor";
import { Button } from "@/components/ui/button";
import { useEnterSubmit } from "@/lib/use-enter-submit";
import { SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowDown, ArrowUp } from "lucide-react";
import { z } from "zod";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "./actions";
import { UserMessage } from "@/components/llm/message";

import { NutrientDetailsCard } from "@/components/llm/nutrition-details-card";
import { useTotalNutrient } from "@/lib/total-nutrient-context";
import { getAirbenderSession } from "@/airbender/airbender.utils.client";
const chatSchema = z.object({
  message: z.string().min(1, "Message is required."),
});

export type ChatInput = z.infer<typeof chatSchema>;

export default function Home() {
  const { totalNutrientDetails } = useTotalNutrient();
  const form = useForm<ChatInput>();
  const { formRef, onKeyDown } = useEnterSubmit();
  const [messages, setMessages] = useUIState<typeof AI>();
  const { sendMessage } = useActions<typeof AI>();

  const onSubmit: SubmitHandler<ChatInput> = async (data) => {
    const value = data.message.trim();
    formRef.current?.reset();
    if (!value) return;
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        role: "user",
        display: <UserMessage>{value}</UserMessage>,
      },
    ]);

    try {
      const { session } = await getAirbenderSession();
      const responseMessage = await sendMessage(value, session);
      setMessages((currentMessages) => [...currentMessages, responseMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="grid md:grid-cols-[1fr_28rem] h-screen">
      <div className="flex flex-col">
        <div className="flex flex-col flex-1 items-start gap-8 mx-auto p-4 pt-20 max-w-2xl">
          <div className="min-w-[620px] h-px"></div>
          {messages.length === 0 && (
            <div className="mt-12 text-slate-400 self-center">
              <p>Start a conversation by typing a message.</p>
              <ArrowDown className="mx-auto mt-6 w-16 h-16 text-slate-200" />
            </div>
          )}

          <ChatList messages={messages} />
          <ChatScrollAnchor />
        </div>

        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="bottom-0 sticky flex flex-col gap-1.5 bg-background mx-auto px-4 py-2 w-full max-w-2xl">
            <div className="relative">
              <TextareaAutosize
                className="border-neutral-400 shadow-sm p-4 pr-16 border rounded-2xl w-full min-h-3 resize-none"
                autoFocus
                tabIndex={0}
                onKeyDown={onKeyDown}
                placeholder="Send a message."
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                rows={1}
                {...form.register("message")}
              />
              <Button
                type="submit"
                size="icon"
                className="top-3 right-3 absolute w-8 h-8"
                disabled={!form.watch("message")}
              >
                <ArrowUp className="w-5 h-5" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="md:flex justify-center hidden bg-slate-100 pt-20">
        <div className="fixed">
          <NutrientDetailsCard
            nutrientDetails={totalNutrientDetails}
            title="Total"
            showFooter={false}
          />
        </div>
      </div>
    </main>
  );
}
