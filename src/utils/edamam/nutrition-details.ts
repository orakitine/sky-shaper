import { NutrientDetails, Nutrients } from "./nutrition-details.types";

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

/**
 * Combines multiple NutrientDetails objects into a single NutrientDetails object.
 * @param details NutrientDetails[]
 * @returns NutrientDetail
 * @note Note that this function assumes that the units for each nutrient are consistent across all NutrientDetails objects. If there's a possibility of inconsistent units, you might need to add unit conversion logic.
 */
export function combineNutrientDetails(
  details: NutrientDetails[]
): NutrientDetails {
  if (details.length === 0) {
    throw new Error("Cannot combine an empty array of NutrientDetails");
  }

  const combined: NutrientDetails = {
    ...details[0],
    yield: 0,
    calories: 0,
    totalCO2Emissions: 0,
    totalWeight: 0,
    totalNutrients: {},
    totalDaily: {},
    ingredients: [],
    totalNutrientsKCal: {},
  };

  details.forEach((detail) => {
    combined.yield += detail.yield;
    combined.calories += detail.calories;
    combined.totalCO2Emissions += detail.totalCO2Emissions;
    combined.totalWeight += detail.totalWeight;

    combineNutrients(combined.totalNutrients, detail.totalNutrients);
    combineNutrients(combined.totalDaily, detail.totalDaily);
    combineNutrients(combined.totalNutrientsKCal, detail.totalNutrientsKCal);

    combined.ingredients = combined.ingredients.concat(detail.ingredients);

    // Combine unique labels using Array.from() instead of spread operator
    combined.dietLabels = Array.from(
      new Set(combined.dietLabels.concat(detail.dietLabels))
    );
    combined.healthLabels = Array.from(
      new Set(combined.healthLabels.concat(detail.healthLabels))
    );
    combined.cautions = Array.from(
      new Set(combined.cautions.concat(detail.cautions))
    );
    combined.cuisineType = Array.from(
      new Set(combined.cuisineType.concat(detail.cuisineType))
    );
    combined.mealType = Array.from(
      new Set(combined.mealType.concat(detail.mealType))
    );
    combined.dishType = Array.from(
      new Set(combined.dishType.concat(detail.dishType))
    );
  });

  // Recalculate co2EmissionsClass based on the new total
  combined.co2EmissionsClass = calculateCO2EmissionsClass(
    combined.totalCO2Emissions
  );

  return combined;
}

function combineNutrients(target: Nutrients, source: Nutrients) {
  Object.entries(source).forEach(([key, nutrient]) => {
    if (target[key]) {
      target[key].quantity += nutrient.quantity;
    } else {
      target[key] = { ...nutrient };
    }
  });
}

function calculateCO2EmissionsClass(totalCO2Emissions: number): string {
  // This is a placeholder implementation. You should replace this with your actual logic
  if (totalCO2Emissions < 100) return "A";
  if (totalCO2Emissions < 200) return "B";
  if (totalCO2Emissions < 300) return "C";
  if (totalCO2Emissions < 400) return "D";
  return "E";
}
