"use client";

import { ChatList } from "@/components/chat-list";
import { ChatScrollAnchor } from "@/components/chat-scroll-anchor";
import { Button } from "@/components/ui/button";
import { useEnterSubmit } from "@/lib/use-enter-submit";
import { SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUp, Menu, Plus } from "lucide-react";
import { z } from "zod";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "./actions";
import { UserMessage } from "@/components/llm/message";
import { SheetContent, SheetTrigger, Sheet } from "@/components/ui/sheet";

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
      setMessages((currentMessages) => [...currentMessages, responseMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div className="flex flex-col w-full h-screen">
        <header className="fixed flex justify-start items-center gap-2 bg-background shadow shadow-gray-300 p-2 w-full h-12">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <Button
                variant="ghost"
                className="bg-background p-4"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.reload();
                }}
              >
                <Plus className="w-5 h-5" />
                <span>New Chat</span>
              </Button>
            </SheetContent>
          </Sheet>
          <div className="flex items-center">
            <h1>SkyShaper</h1>
          </div>
        </header>
        <div className="flex flex-1 mt-12">
          {/* Left */}
          <div className="flex flex-col sm:w-full min-h-full">
            {/* Chat */}
            <div className="px-4 p-4 max-w-2xl grow">
              {messages.length === 0 && (
                <div className="mt-8 text-center text-slate-400 text-sm">
                  <p>Start a conversation by typing a message.</p>
                </div>
              )}
              <ChatList messages={messages} />
            </div>
            {/* Chat input */}
            <div className="relative w-full">
              <ChatScrollAnchor />

              <div className="mx-auto sm:px-4 sm:max-w-2xl">
                <div className="flex flex-col justify-center space-y-4 bg-background bg-white shadow-lg md:py-4 p-3 sm:border border-t sm:rounded-t-xl">
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
                      <div className="top-3 right-0 sm:right-4 absolute">
                        <Button
                          type="submit"
                          size="icon"
                          disabled={!form.watch("message")}
                        >
                          <ArrowUp className="w-5 h-5" />
                          <span className="sr-only">Send</span>
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* Right */}
          <div className="sm:block hidden bg-background bg-slate-50 sm:w-96 back">
            <div className="flex flex-col h-full">
              <div className="flex-1 p-4 overflow-auto">[sidebar content]</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
