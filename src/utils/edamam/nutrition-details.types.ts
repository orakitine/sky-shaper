// Interface for nutrient details
export interface Nutrient {
  label: string;
  quantity: number;
  unit: string;
}

// Interface for totalNutrients and totalDaily sections
export interface Nutrients {
  [key: string]: Nutrient;
}

// Interface for parsed ingredient
export interface ParsedIngredient {
  quantity: number;
  measure: string;
  foodMatch: string;
  food: string;
  foodId: string;
  weight: number;
  retainedWeight: number;
  nutrients: Nutrients;
  measureURI: string;
  status: string;
}

// Interface for ingredient
export interface Ingredient {
  text: string;
  parsed: ParsedIngredient[];
}

// Main interface for the NutrientDetails
export interface NutrientDetails {
  uri: string;
  yield: number;
  calories: number;
  totalCO2Emissions: number;
  co2EmissionsClass: string;
  totalWeight: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  totalNutrients: Nutrients;
  totalDaily: Nutrients;
  ingredients: Ingredient[];
  cuisineType: string[];
  mealType: string[];
  dishType: string[];
  totalNutrientsKCal: Nutrients;
}
