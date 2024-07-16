"use client";

import { AI } from "@/app/(protected)/actions";
import { UserMessage } from "@/components/llm/message";
import { getAirbenderSession } from "@/lib/airbender/airbender.utils.client";
import { cn } from "@/lib/utils";
import { useActions, useUIState } from "ai/rsc";
import { ChatInput } from "./chat-input";
import { ChatList } from "./chat-list";
import { ChatScrollAnchor } from "./chat-scroll-anchor";

export function ChatContainer({ className }: { className: string }) {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { sendMessage } = useActions<typeof AI>();

  const handleSubmit = async (value: string) => {
    if (!value.trim()) return;

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
    <div className={cn(className, "flex flex-col flex-1 w-full")}>
      <div className="flex flex-col flex-1 mx-auto w-full max-w-2xl">
        <div className="flex-1 w-full">
          <div className="bg-gray-200 mb-8 w-full h-px"></div>
          <ChatList messages={messages} />
          <ChatScrollAnchor />
        </div>
        <ChatInput onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
