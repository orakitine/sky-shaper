"use client";

import { ChatContainer } from "@/components/chat/chat-container";
import { Header } from "@/components/home/header";
import { MobileSidebar } from "@/components/home/mobile-sidebar";
import { NutrientDetailsCard } from "@/components/llm/nutrition-details-card";
import { useAirbenderSession } from "@/lib/airbender/useAirbenderSession";
import { useTotalNutrient } from "@/lib/contexts/total-nutrient-context";
import { useUser } from "@/lib/contexts/user-context";
import { useState } from "react";

export default function Home() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { totalNutrientDetails } = useTotalNutrient();
  const user = useUser();

  const { isInitialized } = useAirbenderSession();

  if (!user || !isInitialized) {
    return null; // or a loading state
  }

  return (
    <>
      <Header user={user} onOpenSidebar={() => setIsMobileSidebarOpen(true)} />
      <div className="flex flex-1 pt-[72px]">
        <ChatContainer className="flex-1" />
        <div className="md:block hidden w-[420px]">
          <div className="fixed p-4">
            <NutrientDetailsCard
              nutrientDetails={totalNutrientDetails}
              title="Total"
              showFooter={false}
            />
          </div>
        </div>
      </div>
      <MobileSidebar
        nutrientDetails={totalNutrientDetails}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
    </>
  );
}
