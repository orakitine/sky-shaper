"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AutoRedirectProps {
  delay?: number;
  path?: string;
}

export function AutoRedirect({ delay = 5000, path = "/" }: AutoRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(path);
    }, delay);

    return () => clearTimeout(timer);
  }, [router, delay, path]);

  return null;
}
