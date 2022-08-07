import { AppState, AppStateActions } from "./lib/use-app-state";
import React from "react";
import { useCupSize } from "./lib/use-cup-size";
import { useNormalizedWaistSize } from "./lib/use-normalized-waist-size";
import { Result } from "./Result";

export interface ChestFormProps {
  appState: AppState;
  actions: AppStateActions;
}

export const ChestForm: React.FunctionComponent<ChestFormProps> = ({
  appState: { breastSize, chestSize },
}) => {
  const [hasCupSizeError, cupSize] = useCupSize({
    isAsymetric: false,
    breastSize: breastSize,
    chestSize,
  });
  const [hasNormalizedWaistSizeError, normalizedWaistSize] =
    useNormalizedWaistSize(breastSize);
  console.log({ cupSize, normalizedWaistSize });

  return (
    <Result
      hasError={hasCupSizeError || hasNormalizedWaistSizeError}
      hasValue={
        !!breastSize && !!chestSize && breastSize > 10 && chestSize > 10
      }
    >
      {hasNormalizedWaistSizeError ? "Taille inconnue" : normalizedWaistSize}{" "}
      {hasCupSizeError ? "Bonnet inconnu" : cupSize}
    </Result>
  );
};
