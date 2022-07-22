import { computeNormalizedWaistSize } from "./bra-size";

export const useNormalizedWaistSize = (breastSize: number) => {
  let hasError = false;
  let normalizedWaistSize = "";
  try {
    normalizedWaistSize = computeNormalizedWaistSize(breastSize);
  } catch (e) {
    hasError = true;
  }

  return [hasError, normalizedWaistSize];
};
