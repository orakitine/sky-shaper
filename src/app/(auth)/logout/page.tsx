"use client";

import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleLogout = async () => {
      await supabase.auth.signOut();
      router.push("/login");
    };

    handleLogout();
  }, [supabase, router]);

  return <div>Logging out...</div>;
}
