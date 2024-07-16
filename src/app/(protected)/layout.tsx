import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { AI } from "./actions";
import ClientLayout from "./client-layout";

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
      <ClientLayout user={user}>{children}</ClientLayout>
    </AI>
  );
}
