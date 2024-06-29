import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AI } from "./actions";
import { TotalNutrientProvider } from "@/lib/total-nutrient-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sky Shaper",
  description:
    "This is my playgoround to create a demo app for the use with Airbender",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AI>
      <TotalNutrientProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </TotalNutrientProvider>
    </AI>
  );
}
