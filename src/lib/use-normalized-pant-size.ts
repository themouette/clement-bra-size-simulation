import { computeNormalizedPantSize } from "./bra-size";

export const useNormalizedPantSize = (hipsSize: number) => {
  let hasError = false;
  let normalizedSize = "";
  try {
    normalizedSize = computeNormalizedPantSize(hipsSize);
  } catch (e) {
    hasError = true;
  }

  return [hasError, normalizedSize];
};
