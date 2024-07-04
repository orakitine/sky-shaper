import { ChatContainer } from "@/components/chat/chat-container";
import { Sidebar } from "@/components/home/sidebar";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="grid md:grid-cols-[1fr_28rem] h-screen-minus-header">
      <Suspense fallback={<div>Loading chat...</div>}>
        <ChatContainer />
      </Suspense>
      <Sidebar />
    </main>
  );
}

// This ensures the page is always rendered on the server
// which should resolve any static generation issues
export const dynamic = "force-dynamic";
