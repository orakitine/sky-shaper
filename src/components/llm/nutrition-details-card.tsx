"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTotalNutrient } from "@/lib/contexts/total-nutrient-context";
import { cn } from "@/lib/utils";
import {
  Nutrient,
  NutrientDetails,
} from "@/utils/edamam/nutrition-details.types";

interface NutrientDetailsCardProps {
  nutrientDetails: NutrientDetails;
  size?: "compact" | "expanded";
  title?: string;
  showFooter?: boolean;
}

export function NutrientDetailsCard({
  nutrientDetails,
  size = "expanded",
  title = "Nutrition Facts",
  showFooter = true,
}: NutrientDetailsCardProps) {
  const { addNutrientDetails } = useTotalNutrient();

  return (
    <Card className="sm:w-96">
      <CardHeader>
        <CardTitle className="text-gray-800">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 pb-4">
          {nutrientDetails.ingredients.map((ingredient, index) => (
            <div className="text-sm" key={index}>
              {ingredient.text}
            </div>
          ))}
        </div>
        <div className="flex justify-between font-bold text-xl">
          <span>Calories</span>
          <span>{nutrientDetails.calories}</span>
        </div>
        <div className="border-gray-300 my-2 border-t-2" />
        <div
          className={cn(
            "overflow-auto",
            size === "compact" && "max-h-40",
            size === "expanded" && "max-h-96"
          )}
        >
          {Object.entries(nutrientDetails.totalNutrients)
            .filter(nutrientsFilterFn)
            .map(nutrientsTransformFn)
            .map(([id, nutrient]) => {
              const classes = [];
              classes.push(isBolded(id) ? "font-bold" : "");
              classes.push(isTabbed(id) ? "ml-3" : "");
              return (
                <div key={id} className="flex justify-between">
                  <span className="flex justify-between space-x-1">
                    <span className={classes.join(" ")}>{nutrient.label}</span>
                    <span className="font-thin">
                      {nutrient.quantity} {nutrient.unit}
                    </span>
                  </span>
                  <span>{getDailyValue(nutrientDetails, id)}</span>
                </div>
              );
            })}
        </div>
        {nutrientDetails.calories > 0 && (
          <div className="mt-4 text-center text-gray-400 text-xs">
            *Percent Daily Values are based on a 2000 calorie diet
          </div>
        )}
      </CardContent>
      {showFooter && (
        <CardFooter className="flex justify-end">
          <Button
            onClick={() => {
              addNutrientDetails(nutrientDetails);
            }}
            variant="outline"
          >
            Add to my total
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

const nutrientsToBold = ["FAT", "PROCNT", "CHOCDF.net"];
const isBolded = (id: string) => nutrientsToBold.includes(id);
const nutrientsToTabbed = ["FAMS", "FAPU", "FASAT"];
const isTabbed = (id: string) => nutrientsToTabbed.includes(id);

const blockedNutrients = ["WATER", "CHOCDF", "FOLFD"];

const nutrientsFilterFn = ([id, nutrients]: [string, Nutrient]): boolean => {
  return !blockedNutrients.includes(id) && nutrients.quantity > 0;
};

const nutrientsTransformFn = ([id, nutrients]: [string, Nutrient]): [
  string,
  Nutrient
] => {
  // round to precision of 2
  const nutrientQuantity = Math.round(nutrients.quantity * 10) / 10;
  // remove 'Fatty acids, total 'string from label
  const nutrientLabel = nutrients.label.replace("Fatty acids, total ", "");

  return [
    id,
    { ...nutrients, label: nutrientLabel, quantity: nutrientQuantity },
  ];
};

const getDailyValue = (
  nutrientDetails: NutrientDetails,
  id: string
): string | null => {
  const totalDaily = nutrientDetails.totalDaily[id];
  if (totalDaily) {
    const value = Math.round(totalDaily.quantity);
    return `${value > 1 ? value : ">1"} ${totalDaily.unit}`;
  }
  return null;
};
