import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Sky Shaper - Login",
  description: "Sign in to your account",
};

export default function LoginPage() {
  return (
    <>
      <h1 className="mb-8 text-center">Sign in to your account</h1>
      <LoginForm />
      <Separator className="my-8" />
      <Link className="block mt-4" href={"/register"}>
        <Button className="w-full" variant="secondary">
          Register
        </Button>
      </Link>
      <Link className="block mt-4 text-center" href={"/forgot-password"}>
        Forgot your password?
      </Link>
    </>
  );
}
