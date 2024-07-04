import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { TotalNutrientProvider } from "@/lib/total-nutrient-context";
import { AI } from "./actions";
import { Header } from "@/components/home/header";

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
  const user = session.user;

  return (
    <AI>
      <TotalNutrientProvider>
        <div className="w-full h-screen">
          <Header user={user} />
          <div className="pt-[72px] h-screen-minus-header">{children}</div>
        </div>
      </TotalNutrientProvider>
    </AI>
  );
}
