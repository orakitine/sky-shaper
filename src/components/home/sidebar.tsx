"use client";

import { NutrientDetailsCard } from "@/components/llm/nutrition-details-card";
import { useTotalNutrient } from "@/lib/total-nutrient-context";

export function Sidebar() {
  const { totalNutrientDetails } = useTotalNutrient();

  return (
    <div className="md:flex justify-center hidden bg-slate-100 p-4">
      <div className="fixed">
        <NutrientDetailsCard
          nutrientDetails={totalNutrientDetails}
          title="Total"
          showFooter={false}
        />
      </div>
    </div>
  );
}
