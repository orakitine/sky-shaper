import { RegisterForm } from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/dist/client/link";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Sky Shaper - Create Account",
  description: "Create a new account",
};

export default function RegisterPage() {
  return (
    <>
      <h1 className="mb-8 text-center">Create a new account</h1>
      <RegisterForm />
      <Separator className="my-8" />
      <Link className="block mt-4" href={"/login"}>
        <Button className="w-full" variant="secondary">
          Sign in
        </Button>
      </Link>
    </>
  );
}
