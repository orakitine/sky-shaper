"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type RegisterInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterInputs>();
  const [error, setError] = useState<string | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/callback`,
        },
      });
      if (error) throw error;
      setConfirmationSent(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (confirmationSent) {
    return (
      <>
        <h1 className="mb-8 text-center">Check your email</h1>
        <p>
          We&apos;ve sent you a confirmation email. Please check your inbox and
          click the link to confirm your account.
        </p>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
          },
        })}
      />
      {errors.email && (
        <span className="text-red-500 text-sm">{errors.email.message}</span>
      )}
      <Input
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters",
          },
        })}
      />
      {errors.password && (
        <span className="text-red-500 text-sm">{errors.password.message}</span>
      )}
      <Input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (val: string) => {
            if (watch("password") != val) {
              return "Your passwords do not match";
            }
          },
        })}
      />
      {errors.confirmPassword && (
        <span className="text-red-500 text-sm">
          {errors.confirmPassword.message}
        </span>
      )}
      {error && <span className="text-red-500 text-sm">{error}</span>}
      <Button type="submit" className="w-full">
        Sign Up
      </Button>
    </form>
  );
}
