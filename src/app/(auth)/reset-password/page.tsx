import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Sky Shaper - Reset Password",
  description: "Reset your password",
};

export default function ResetPasswordPage() {
  return (
    <>
      <h1 className="mb-8 text-center">Reset your password</h1>
      <ResetPasswordForm />
    </>
  );
}
