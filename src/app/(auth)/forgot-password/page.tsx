import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Sky Shaper - Forgot Password",
  description: "Forgot your password? Enter your email address to reset it.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-center">Forgot your password?</h1>
      <p>
        Enter your email address and we&apos;ll send you a link to reset your
        password.
      </p>
      <ForgotPasswordForm />
    </div>
  );
}
