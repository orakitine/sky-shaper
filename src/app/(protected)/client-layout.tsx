"use client";

import { TotalNutrientProvider } from "@/lib/total-nutrient-context";
import { UserProvider } from "@/lib/user-context";
import { User } from "@supabase/supabase-js";
import { ReactNode } from "react";

interface ClientLayoutProps {
  children: ReactNode;
  user: User;
}

export default function ClientLayout({ children, user }: ClientLayoutProps) {
  return (
    <TotalNutrientProvider>
      <UserProvider initialUser={user}>
        <div className="flex flex-col w-full h-screen">{children}</div>
      </UserProvider>
    </TotalNutrientProvider>
  );
}
