"use client";

import { ChatList } from "@/components/chat-list";
import { ChatScrollAnchor } from "@/components/chat-scroll-anchor";
import { Button } from "@/components/ui/button";
import { useEnterSubmit } from "@/lib/use-enter-submit";
import { SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { Plus, SendHorizontal } from "lucide-react";
import { z } from "zod";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "./actions";
import { UserMessage } from "@/components/llm/message";

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
    console.log("onSubmit", data);
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
      setMessages((currentMessages) => [...currentMessages, responseMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div className="pt-4 md:pt-10 pb-[200px]">
        <h1>Sky Shaper</h1>
        <ChatList messages={messages} />
        <ChatScrollAnchor />
      </div>
      <div className="peer-[[data--state=open]]:group-[]:lg:pl-[250px] peer-[[data-sate=open]]:group=[]:xl:pl-[300px] bottom-0 fixed inset-x-0 bg-gradient-to-b from-0% from-muted/30 to-50% to-muted/30 w-full">
        <div className="mx-auto sm:px-4 sm:max-w-2xl">
          <div className="flex flex-col justify-center space-y-4 bg-background bg-white shadow-lg px-3 py-2 md:py-4 sm:border border-t sm:rounded-t-xl">
            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
              <div className="relative flex flex-col bg-background sm:border sm:rounded-md w-full max-h-60 overflow-hidden grow">
                <TextareaAutosize
                  className="bg-transparent py-[1.3rem] pr-16 pl-4 w-full sm:text-sm min-h=[60px] resize-none focus-within:outline-none"
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
                <div className="top-4 right-0 sm:right-4 absolute">
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!form.watch("message")}
                  >
                    <SendHorizontal className="w-5 h-5" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </div>
            </form>
            <Button
              variant="outline"
              size="lg"
              className="bg-background mt-4 p-4 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
            >
              <Plus className="w-5 h-5" />
              <span>New Chat</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
