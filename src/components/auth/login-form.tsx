"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "@/lib/supabase/client";

type LoginInputs = {
  email: string;
  password: string;
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 shadow-sm px-4 py-2 border border-transparent rounded-md w-full font-medium text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign In
      </button>
    </form>
  );
}
