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
    rootMargin: "0px 0px 0px 0px",
  });

  useEffect(() => {
    console.log("isAtBottom", isAtBottom, "inView", inView);
    if (isAtBottom && trackVisibility && !inView) {
      console.log("scrolling into view");
      entry?.target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isAtBottom, trackVisibility, inView, entry]);

  return <div ref={ref} className="w-full h-px"></div>;
}
