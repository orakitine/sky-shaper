"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "@/lib/supabase/client";

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
      <div>
        <label
          htmlFor="password"
          className="block font-medium text-gray-700 text-sm"
        >
          New Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
          className="block border-gray-300 focus:border-indigo-300 focus:ring-opacity-50 shadow-sm mt-1 rounded-md w-full focus:ring focus:ring-indigo-200"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block font-medium text-gray-700 text-sm"
        >
          Confirm New Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (val: string) => {
              if (watch("password") != val) {
                return "Your passwords do not match";
              }
            },
          })}
          className="block border-gray-300 focus:border-indigo-300 focus:ring-opacity-50 shadow-sm mt-1 rounded-md w-full focus:ring focus:ring-indigo-200"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 shadow-sm px-4 py-2 border border-transparent rounded-md w-full font-medium text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Set New Password
      </button>
    </form>
  );
}
