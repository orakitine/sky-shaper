import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface NutrientDetailsCardProps {
  nutrientDetails: NutrientDetails;
}

export function NutrientDetailsCard({
  nutrientDetails,
}: NutrientDetailsCardProps) {
  return (
    <Card className="sm:max-w-80">
      <CardHeader>
        <CardTitle>Nutrition Facts</CardTitle>
        <CardDescription>
          {nutrientDetails.ingredients.map((ingredient, index) => (
            <span key={index}>{ingredient.text}</span>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between font-bold text-xl">
          <span>Calories</span>
          <span>{nutrientDetails.calories}</span>
        </div>
        <div className="border-gray-300 my-2 border-t-2" />
        <div className="flex justify-end font-medium text-sm">
          <span>% Daily Value*</span>
        </div>
        <div className="border-gray-300 my-2 border-t" />
        <div className="max-h-[300px] overflow-auto">
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
        <div className="mt-4 text-center text-gray-400 text-xs">
          *Percent Daily Values are based on a 2000 calorie diet
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline">Add to my total</Button>
      </CardFooter>
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
