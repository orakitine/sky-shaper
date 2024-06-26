export async function getNutritionDetails(
  title: string,
  ingredients: string[],
  appId: string,
  appKey: string
): Promise<NutrientDetails> {
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
      throw new Error(
        `HTTP error! in getNutritionDetails status: ${response.status}`
      );
    }

    const data: NutrientDetails = await response.json();
    // TODO validate the shape of the data???
    return data;
  } catch (error) {
    console.error("Error in getNutritionDetails:", error);
    throw error;
  }
}

// Function to parse the nutrients as a string
export function parseCalories(nutrients: NutrientDetails): number {
  const calories = nutrients.calories;
  return calories;
}
