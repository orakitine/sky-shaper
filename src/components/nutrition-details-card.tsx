interface NutrientDetailsCardProps {
  nutrientDetails: NutrientDetails;
}

export function NutrientDetailsCard({
  nutrientDetails,
}: NutrientDetailsCardProps) {
  return (
    <div className="bg-white shadow-md p-4 rounded-xl max-w-96">
      <h2 className="flex flex-col font-bold text-2xl text-center">
        <span>Nutrition Facts</span>
        {nutrientDetails.ingredients.map((ingredient, index) => (
          <span key={index} className="text-lg text-slate-500">
            {ingredient.text}
          </span>
        ))}
      </h2>
      <div className="border-gray-300 my-2 border-t-4" />
      <p className="font-bold">Total</p>
      <div className="flex justify-between font-bold text-4xl">
        <span>Calories</span>
        <span>{nutrientDetails.calories}</span>
      </div>
      <div className="border-gray-300 my-2 border-t-2" />
      <div className="flex justify-end font-medium text-sm">
        <span>% Daily Value*</span>
      </div>
      <div className="border-gray-300 my-2 border-t" />
      <div className="space-y-1">
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
      <div className="mt-4 text-center text-xs">
        *Percent Daily Values are based on a 2000 calorie diet
      </div>
    </div>
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
