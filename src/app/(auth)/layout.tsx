import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sky Shaper - Auth",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
