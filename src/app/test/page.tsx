import { NutrientDetailsCard } from "@/components/llm/nutrition-details-card";
import React from "react";
import { nSample } from "../../components/n-sample";
import { FeedBack } from "@/components/feedback";
import { NutrientDetailsCardSkeleton } from "@/components/llm/nutrition-details-card-skeleton";

export default function Test() {
  return (
    <>
      <NutrientDetailsCardSkeleton />
      <hr className="my-8" />
      <NutrientDetailsCard nutrientDetails={nSample} />
      <hr className="my-8" />
      <FeedBack />
    </>
  );
}
