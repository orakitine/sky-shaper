"use client";

import { ChatContainer } from "@/components/chat/chat-container";
import { Header } from "@/components/home/header";
import { MobileSidebar } from "@/components/home/mobile-sidebar";
import { NutrientDetailsCard } from "@/components/llm/nutrition-details-card";
import {
  deleteAirbenderSession,
  getAirbenderSession,
} from "@/lib/airbender/airbender.utils.client";
import { useTotalNutrient } from "@/lib/contexts/total-nutrient-context";
import { useUser } from "@/lib/contexts/user-context";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { totalNutrientDetails } = useTotalNutrient();
  const user = useUser();

  useEffect(() => {
    if (user) {
      console.log("Initializing Airbender session");
      deleteAirbenderSession();
      getAirbenderSession().catch((error) => {
        console.error("Failed to initialize Airbender session:", error);
        // Handle the error appropriately (e.g., show a notification to the user)
      });
    }
  }, [user]);

  if (!user) {
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
