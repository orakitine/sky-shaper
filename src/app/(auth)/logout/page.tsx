"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleLogout = async () => {
      await supabase.auth.signOut();
      // TODO deleteAirbenderSession();
      router.push("/login");
    };

    handleLogout();
  }, [supabase, router]);

  return <div>Logging out...</div>;
}
