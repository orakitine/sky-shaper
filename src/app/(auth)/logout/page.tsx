"use client";

import { deleteAirbenderSession } from "@/lib/airbender/airbender.utils.client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleLogout = async () => {
      await supabase.auth.signOut();
      deleteAirbenderSession();
      router.push("/login");
    };

    handleLogout();
  }, [supabase, router]);

  return <div>Logging out...</div>;
}
