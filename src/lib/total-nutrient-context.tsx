"use client";

import {
  combineNutrientDetails,
  emptyNutrientDetails,
} from "@/utils/edamam/nutrition-details";
import { NutrientDetails } from "@/utils/edamam/nutrition-details.types";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface TotalNutrientContextType {
  totalNutrientDetails: NutrientDetails;
  addNutrientDetails: (newDetails: NutrientDetails) => void;
}

const TotalNutrientContext = createContext<TotalNutrientContextType>({
  totalNutrientDetails: emptyNutrientDetails,
  addNutrientDetails: () => {},
});

export function TotalNutrientProvider({ children }: { children: ReactNode }) {
  const [totalNutrientDetails, setTotalNutrientDetails] =
    useState<NutrientDetails>(emptyNutrientDetails);

  const addNutrientDetails = (newDetails: NutrientDetails) => {
    setTotalNutrientDetails((prev: NutrientDetails) => {
      return combineNutrientDetails([prev, newDetails]);
    });
  };

  return (
    <TotalNutrientContext.Provider
      value={{ totalNutrientDetails, addNutrientDetails }}
    >
      {children}
    </TotalNutrientContext.Provider>
  );
}

export function useTotalNutrient() {
  return useContext(TotalNutrientContext);
}
