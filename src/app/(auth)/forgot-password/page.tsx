import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="flex justify-center items-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="space-y-8 w-full max-w-md">
        <div>
          <h2 className="mt-6 font-extrabold text-3xl text-center text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-gray-600 text-sm">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
