"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmailConfirmed() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("/dashboard"); // Or wherever you want to redirect the user
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div className="flex justify-center items-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="space-y-8 w-full max-w-md text-center">
        <h2 className="mt-6 font-extrabold text-3xl text-gray-900">
          Email Confirmed!
        </h2>
        <p className="mt-2 text-gray-600 text-sm">
          Your email has been successfully confirmed. You will be redirected to
          the dashboard in a few seconds.
        </p>
        <div className="mt-5">
          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 shadow-sm px-4 py-2 border border-transparent rounded-md font-medium text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go to Dashboard Now
          </button>
        </div>
      </div>
    </div>
  );
}
