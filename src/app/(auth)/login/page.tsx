import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="space-y-8 w-full max-w-md">
        <div>
          <h2 className="mt-6 font-extrabold text-3xl text-center text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <LoginForm />
        <Link href={"/register"}>Register</Link>
      </div>
    </div>
  );
}
