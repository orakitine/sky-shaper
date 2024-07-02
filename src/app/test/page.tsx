import React from "react";
import { FeedBack } from "@/components/feedback";
import { NutrientDetailsCardSkeleton } from "@/components/llm/nutrition-details-card-skeleton";

export default function Test() {
  return (
    <>
      <NutrientDetailsCardSkeleton />
      <hr className="my-8" />
      <FeedBack />
    </>
  );
}
