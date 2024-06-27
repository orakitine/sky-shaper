import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function NutrientDetailsCardSkeleton() {
  return (
    <Card className="sm:max-w-80">
      <CardHeader>
        <CardTitle>Nutrition Facts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 pb-4">
          <div className="bg-gray-300 rounded w-3/4 h-4 animate-pulse"></div>
        </div>
        <div className="flex justify-between font-bold text-xl">
          <span>Calories</span>
          <div className="bg-gray-300 rounded w-1/4 h-6 animate-pulse"></div>
        </div>
        <div className="border-gray-300 my-2 border-t-2" />
        <div className="flex justify-end font-medium text-sm">
          <span>% Daily Value*</span>
        </div>
        <div className="border-gray-300 my-2 border-t" />
        <div className="max-h-[300px] overflow-auto">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex justify-between mb-2">
              <div className="bg-gray-300 rounded w-1/2 h-4 animate-pulse"></div>
              <div className="bg-gray-300 rounded w-1/4 h-4 animate-pulse"></div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center text-gray-400 text-xs">
          *Percent Daily Values are based on a 2000 calorie diet
        </div>
      </CardContent>
    </Card>
  );
}
