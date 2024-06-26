interface NutrientDetailsCardProps {
  nutrientDetails: NutrientDetails;
}

export function NutrientDetailsCard({
  nutrientDetails,
}: NutrientDetailsCardProps) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg max-w-10">
      <h2 className="font-bold text-2xl text-center">Nutrition Facts</h2>
      <div className="border-gray-300 my-2 border-t" />
      <div className="text-center">
        <p className="font-medium">Amount Per Serving</p>
        <div className="flex justify-between font-bold text-4xl">
          <span>Calories</span>
          <span>{nutrientDetails.calories}</span>
        </div>
      </div>
      <div className="border-gray-300 my-2 border-t" />
      <div className="flex justify-between font-medium text-sm">
        <span>% Daily Value*</span>
      </div>
      <div className="border-gray-300 my-2 border-t" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Total Fat 18.3 g</span>
          <span>28%</span>
        </div>
        <div className="pl-4">
          <div className="flex justify-between">
            <span>Saturated Fat 2 g</span>
            <span>10%</span>
          </div>
          <div className="flex justify-between">
            <span>Trans Fat 0 g</span>
            <span />
          </div>
        </div>
        <div className="flex justify-between">
          <span>Cholesterol 0 mg</span>
          <span>0%</span>
        </div>
        <div className="flex justify-between">
          <span>Sodium 70 mg</span>
          <span>3%</span>
        </div>
        <div className="flex justify-between">
          <span>Total Carbohydrate 333.2 g</span>
          <span>111%</span>
        </div>
        <div className="pl-4">
          <div className="flex justify-between">
            <span>Dietary Fiber 34.6 g</span>
            <span>138%</span>
          </div>
          <div className="flex justify-between">
            <span>Total Sugars 30.3 g</span>
            <span />
          </div>
          <div className="flex justify-between">
            <span>Includes - Added Sugars</span>
            <span />
          </div>
        </div>
        <div className="flex justify-between">
          <span>Protein 71 g</span>
          <span>142%</span>
        </div>
        <div className="flex justify-between">
          <span>Vitamin D 0 µg</span>
          <span>0%</span>
        </div>
        <div className="flex justify-between">
          <span>Calcium 179.1 mg</span>
          <span>18%</span>
        </div>
        <div className="flex justify-between">
          <span>Iron 13.8 mg</span>
          <span>77%</span>
        </div>
        <div className="flex justify-between">
          <span>Potassium 2203.2 mg</span>
          <span>47%</span>
        </div>
      </div>
      <div className="mt-2 text-center text-sm">
        *Percent Daily Values are based on a 2000 calorie diet
      </div>
    </div>
  );
}
