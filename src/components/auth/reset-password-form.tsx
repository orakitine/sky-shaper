"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ResetPasswordInputs = {
  password: string;
  confirmPassword: string;
};

export function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordInputs>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async (data) => {
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });
      if (error) throw error;
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        placeholder="Password"
        type="password"
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
        placeholder="Confirm Password"
        type="password"
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
        Set New Password
      </Button>
    </form>
  );
}
