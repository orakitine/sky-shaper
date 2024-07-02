import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { TotalNutrientProvider } from "@/lib/total-nutrient-context";
import { AI } from "./dashboard/actions";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <AI>
      <TotalNutrientProvider>{children}</TotalNutrientProvider>
    </AI>
  );
}
