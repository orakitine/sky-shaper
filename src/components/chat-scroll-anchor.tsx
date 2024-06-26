"use client";

import { useAtBottom } from "@/lib/use-at-bottom";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function ChatScrollAnchor() {
  const trackVisibility = true;
  const isAtBottom = useAtBottom();
  const { ref, entry, inView } = useInView({
    trackVisibility,
    delay: 100,
    rootMargin: "0px 0px -120px 0px",
  });

  useEffect(() => {
    if (isAtBottom && trackVisibility && !inView) {
      entry?.target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isAtBottom, trackVisibility, inView, entry]);

  return <div ref={ref} className="w-full h-px" />;
}
