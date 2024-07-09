"use client";

import { getAirbenderSession } from "@/airbender/airbender.utils.client";
import { AI } from "@/app/(protected)/actions";
import { UserMessage } from "@/components/llm/message";
import { useActions, useUIState } from "ai/rsc";
import { ChatInput } from "./chat-input";
import { ChatList } from "./chat-list";
import { ChatScrollAnchor } from "./chat-scroll-anchor";

export function ChatContainer() {
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
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1 items-start gap-8 mx-auto p-4 max-w-2xl">
        <div className="min-w-[620px] h-px"></div>
        <ChatList messages={messages} />
        <ChatScrollAnchor />
      </div>
      <ChatInput onSubmit={handleSubmit} />
    </div>
  );
}
