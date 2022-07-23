import { AppState } from "./use-app-state";
import { computeAsymetricCupSize, computeCupSize } from "./bra-size";

export const useCupSize = ({
  isAsymetric,
  breastSize,
  chestSize,
}: Pick<AppState, "isAsymetric" | "breastSize" | "chestSize">): [
  boolean,
  string
] => {
  let hasError = false;
  let cupSize = "";
  try {
    cupSize = isAsymetric
      ? computeAsymetricCupSize(breastSize, chestSize)
      : computeCupSize(breastSize, chestSize);
  } catch (e) {
    hasError = true;
  }

  return [hasError, cupSize];
};
