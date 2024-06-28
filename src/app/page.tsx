"use client";

import { ChatList } from "@/components/chat-list";
import { ChatScrollAnchor } from "@/components/chat-scroll-anchor";
import { Button } from "@/components/ui/button";
import { useEnterSubmit } from "@/lib/use-enter-submit";
import { SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowDown, ArrowUp, Eclipse } from "lucide-react";
import { z } from "zod";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "./actions";
import { UserMessage } from "@/components/llm/message";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { NutrientDetailsCard } from "@/components/llm/nutrition-details-card";
import { emptyNutrientDetails } from "@/utils/edamam/nutrition-details";

const chatSchema = z.object({
  message: z.string().min(1, "Message is required."),
});

export type ChatInput = z.infer<typeof chatSchema>;

export default function Home() {
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
      const responseMessage = await sendMessage(value);
      console.log("responseMessage", responseMessage);
      if (responseMessage.myData) {
        console.log("responseMessage.myData", responseMessage.myData);
      }
      setMessages((currentMessages) => [...currentMessages, responseMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <header className="z-10 fixed bg-background shadow-sm w-full h-16">
        <div className="flex justify-between items-center mx-auto p-4">
          <div className="flex items-center gap-2">
            <Eclipse className="w-6 h-6" />
            <h1 className="font-semibold text-lg">SkyShaper</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shadow-sm border rounded-md overflow-hidden"
              >
                <img
                  src="https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=22&flip=true"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="filter grayscale"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="grid md:grid-cols-[1fr_28rem] h-screen">
        <div className="flex flex-col">
          <div className="flex flex-col flex-1 items-start gap-8 mx-auto p-4 pt-20 max-w-2xl">
            <div className="min-w-[672px] h-px"></div>
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
        <div className="md:flex justify-center hidden bg-slate-50 pt-20">
          <div>
            <NutrientDetailsCard
              nutrientDetails={emptyNutrientDetails}
              title="Total"
              showFooter={false}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
