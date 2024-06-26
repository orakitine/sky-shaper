// page component

import { NutrientDetailsCard } from "@/components/nutrition-details-card";
import React from "react";
import { nSample } from "../../components/n-sample";

export default function Test() {
  return <NutrientDetailsCard nutrientDetails={nSample} />;
}
