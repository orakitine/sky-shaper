import { UIState } from "@/app/(protected)/actions";

interface MessagesProps {
  messages: UIState;
}

export function ChatList({ messages }: MessagesProps) {
  if (messages.length === 0) return null;

  return (
    <div className="flex flex-col">
      {messages.map((message) => (
        <div key={message.id} className="pb-4">
          {message.display}
        </div>
      ))}
    </div>
  );
}
