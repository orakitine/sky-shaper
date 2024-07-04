"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function EmailConfirmed() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <>
      <h1>Email Confirmed!</h1>
      <p className="text-sm">
        Your email has been successfully confirmed. You will be redirected to
        the dashboard in a few seconds.
      </p>
      <Button className="mt-5" onClick={() => router.push("/")}>
        Go to Dashboard Now
      </Button>
    </>
  );
}
