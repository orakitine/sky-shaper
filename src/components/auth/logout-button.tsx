"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      router.push("/login");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="bg-red-500 hover:bg-red-700 focus:shadow-outline px-4 py-2 rounded-full font-bold text-white focus:outline-none"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}
