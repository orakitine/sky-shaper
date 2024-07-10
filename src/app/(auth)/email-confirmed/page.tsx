import { AutoRedirect } from "@/components/auth/auto-redirect";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EmailConfirmed({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const status = searchParams.status || "unknown";
  const redirectPath = "/"; // You can change this to any path you want to redirect to

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
      <Link href={redirectPath} passHref>
        <Button>Go to Dashboard Now</Button>
      </Link>
      {status === "success" && <AutoRedirect path={redirectPath} />}
    </div>
  );
}
