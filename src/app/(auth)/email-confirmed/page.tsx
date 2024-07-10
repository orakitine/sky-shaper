"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmailConfirmationStatus() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState(searchParams.get("status") || "unknown");

  useEffect(() => {
    if (searchParams.get("status") === "success") {
      const redirectTimer = setTimeout(() => {
        router.push("/");
      }, 5000); // Redirect after 5 seconds

      return () => clearTimeout(redirectTimer);
    }
  }, [router]);

  //https://skyshaper.rakitine.com/confirm-email?code=dd6a5cbb9733f827b6e77d6c021053da2e11761a7d5239708cb06964&type=signup
  const renderStatusMessage = () => {
    switch (status) {
      case "success":
        return (
          <Alert>
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your email has been successfully confirmed. You will be redirected
              to the dashboard in a few seconds.
            </AlertDescription>
          </Alert>
        );
      case "error":
        return (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was an error confirming your email. Please try again or
              contact support.
            </AlertDescription>
          </Alert>
        );
      default:
        return (
          <Alert>
            <AlertTitle>Unknown Status</AlertTitle>
            <AlertDescription>
              The email confirmation status is unknown. Please check your email
              or try again.
            </AlertDescription>
          </Alert>
        );
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-2xl">Email Confirmation Status</h1>
      {renderStatusMessage()}
      <Button onClick={() => router.push("/")}>Go to Dashboard Now</Button>
    </div>
  );
}
