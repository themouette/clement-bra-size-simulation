import { computeNormalizedWaistSize } from "./bra-size";

export const useNormalizedWaistSize = (
  breastSize: number | undefined
): [boolean, string] => {
  let hasError = false;
  let normalizedWaistSize = "";
  try {
    normalizedWaistSize = computeNormalizedWaistSize(breastSize);
  } catch (e) {
    hasError = true;
  }

  return [hasError, normalizedWaistSize];
};
