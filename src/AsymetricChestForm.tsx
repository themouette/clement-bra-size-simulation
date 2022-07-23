import { AppState, AppStateActions } from "./lib/use-app-state";
import React from "react";
import { useCupSize } from "./lib/use-cup-size";
import { useNormalizedWaistSize } from "./lib/use-normalized-waist-size";
import { Result } from "./Result";

export interface AsymetricChestFormProps {
  appState: AppState;
  actions: AppStateActions;
}

export const AsymetricChestForm: React.FunctionComponent<
  AsymetricChestFormProps
> = ({ appState: { breastSize, leftHalfChestSize, rightHalfChestSize } }) => {
  const [hasLeftCupSizeError, leftCupSize] = useCupSize({
    isAsymetric: true,
    breastSize: breastSize,
    chestSize: leftHalfChestSize,
  });
  const [hasRightCupSizeError, rightCupSize] = useCupSize({
    isAsymetric: true,
    breastSize: breastSize,
    chestSize: rightHalfChestSize,
  });
  const [hasNormalizedWaistSizeError, normalizedWaistSize] =
    useNormalizedWaistSize(breastSize);

  return (
    <Result
      hasError={
        hasRightCupSizeError ||
        hasLeftCupSizeError ||
        hasNormalizedWaistSizeError
      }
      hasValue={
        breastSize > 50 && rightHalfChestSize > 10 && leftHalfChestSize > 10
      }
    >
      {hasNormalizedWaistSizeError ? "Taille inconnue" : normalizedWaistSize}{" "}
      {hasLeftCupSizeError ? "Bonnet inconnu" : leftCupSize}{" "}
      {hasRightCupSizeError ? "Bonnet inconnu" : rightCupSize}
    </Result>
  );
};
