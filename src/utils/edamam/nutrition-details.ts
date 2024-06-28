export async function getNutritionDetails(
  title: string,
  ingredients: string[],
  appId: string,
  appKey: string
): Promise<NutrientDetails | false> {
  const url = `https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${appKey}`;

  const body = {
    title: title,
    ingr: ingredients,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return false;
    }

    const data: NutrientDetails = await response.json();
    // TODO validate the shape of the data???
    return data;
  } catch (error) {
    console.error("Error in getNutritionDetails:", error);
    return false;
  }
}

// Function to parse the nutrients as a string
export function parseCalories(nutrients: NutrientDetails): number {
  const calories = nutrients.calories;
  return calories;
}

export const emptyNutrientDetails: NutrientDetails = {
  uri: "",
  yield: 0,
  calories: 0,
  totalCO2Emissions: 0,
  co2EmissionsClass: "",
  totalWeight: 0,
  dietLabels: [],
  healthLabels: [],
  cautions: [],
  totalNutrients: {},
  totalDaily: {},
  ingredients: [],
  cuisineType: [],
  mealType: [],
  dishType: [],
  totalNutrientsKCal: {},
};
