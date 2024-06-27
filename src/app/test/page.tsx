import { NutrientDetailsCard } from "@/components/nutrition-details-card";
import React from "react";
import { nSample } from "../../components/n-sample";
import { FeedBack } from "@/components/feedback";

export default function Test() {
  return (
    <>
      <NutrientDetailsCard nutrientDetails={nSample} />
      <hr className="my-8" />
      <FeedBack />
    </>
  );
}
