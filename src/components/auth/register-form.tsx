"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "@/lib/supabase/client";

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
      <div className="text-center">
        <h2 className="mb-4 font-bold text-2xl">Check your email</h2>
        <p>
          We&apos;ve sent you a confirmation email. Please check your inbox and
          click the link to confirm your account.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block font-medium text-gray-700 text-sm"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          className="block border-gray-300 focus:border-indigo-300 focus:ring-opacity-50 shadow-sm mt-1 rounded-md w-full focus:ring focus:ring-indigo-200"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block font-medium text-gray-700 text-sm"
        >
          Password
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
          Confirm Password
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 shadow-sm px-4 py-2 border border-transparent rounded-md w-full font-medium text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign Up
      </button>
    </form>
  );
}
