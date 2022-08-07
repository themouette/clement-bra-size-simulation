import { BreastSize, CupLetter } from "./types";

interface CupSizeDefinition {
  [waistSize: BreastSize]: Array<{
    /** Min number in the interval */
    min: number;
    /** Max number in the interval */
    max: number;
    /** Corresponding cup size letter */
    letter: CupLetter;
  }>;
}
const asymetricCupSizesDefinition: CupSizeDefinition = {
  "80": [
    { min: 36.5, max: 38.5, letter: "A" },
    { min: 38.5, max: 40.5, letter: "B" },
    { min: 40.5, max: 42.5, letter: "C" },
    { min: 42.5, max: 44.5, letter: "D" },
    { min: 44.5, max: 46.5, letter: "E" },
  ],
  "85": [
    { min: 39, max: 41, letter: "A" },
    { min: 41, max: 43, letter: "B" },
    { min: 43, max: 45, letter: "C" },
    { min: 45, max: 47, letter: "D" },
    { min: 47, max: 49, letter: "E" },
  ],
  "90": [
    { min: 40, max: 43.5, letter: "A" },
    { min: 43.5, max: 45.5, letter: "B" },
    { min: 45.5, max: 47.5, letter: "C" },
    { min: 47.5, max: 49.5, letter: "D" },
    { min: 49.5, max: 51.5, letter: "E" },
  ],
  "95": [
    { min: 44, max: 46, letter: "A" },
    { min: 46, max: 48, letter: "B" },
    { min: 48, max: 50, letter: "C" },
    { min: 50, max: 52, letter: "D" },
    { min: 52, max: 54, letter: "E" },
  ],
  "100": [
    { min: 46.5, max: 48.5, letter: "A" },
    { min: 48.5, max: 50.5, letter: "B" },
    { min: 50.5, max: 52.5, letter: "C" },
    { min: 52.5, max: 54.5, letter: "D" },
    { min: 54.5, max: 56.5, letter: "E" },
  ],
  "105": [
    { min: 49, max: 51, letter: "A" },
    { min: 51, max: 53, letter: "B" },
    { min: 53, max: 55, letter: "C" },
    { min: 55, max: 57, letter: "D" },
    { min: 57, max: 59, letter: "E" },
  ],
  "110": [
    { min: 51.5, max: 53.5, letter: "A" },
    { min: 53.5, max: 55.5, letter: "B" },
    { min: 55.5, max: 57.5, letter: "C" },
    { min: 57.5, max: 59.5, letter: "D" },
    { min: 59.5, max: 61.5, letter: "E" },
  ],
};
const symetricCupSizesDefinition: CupSizeDefinition = {
  "80": [
    { min: 73, max: 77, letter: "A" },
    { min: 77, max: 80, letter: "B" },
    { min: 80, max: 83, letter: "C" },
    { min: 83, max: 86, letter: "D" },
    { min: 86, max: 89, letter: "E" },
  ],
  "85": [
    { min: 78, max: 82, letter: "A" },
    { min: 82, max: 85, letter: "B" },
    { min: 85, max: 88, letter: "C" },
    { min: 88, max: 91, letter: "D" },
    { min: 91, max: 94, letter: "E" },
  ],
  "90": [
    { min: 80, max: 87, letter: "A" },
    { min: 87, max: 89, letter: "B" },
    { min: 89, max: 93, letter: "C" },
    { min: 93, max: 95, letter: "D" },
    { min: 95, max: 99, letter: "E" },
  ],
  "95": [
    { min: 85, max: 92, letter: "A" },
    { min: 92, max: 95, letter: "B" },
    { min: 95, max: 98, letter: "C" },
    { min: 98, max: 101, letter: "D" },
    { min: 101, max: 104, letter: "E" },
  ],
  "100": [
    { min: 93, max: 97, letter: "A" },
    { min: 97, max: 100, letter: "B" },
    { min: 100, max: 103, letter: "C" },
    { min: 103, max: 106, letter: "D" },
    { min: 106, max: 109, letter: "E" },
  ],
  "105": [
    { min: 98, max: 102, letter: "A" },
    { min: 102, max: 105, letter: "B" },
    { min: 105, max: 108, letter: "C" },
    { min: 108, max: 111, letter: "D" },
    { min: 111, max: 114, letter: "E" },
  ],
  "110": [
    { min: 103, max: 107, letter: "A" },
    { min: 107, max: 110, letter: "B" },
    { min: 110, max: 113, letter: "C" },
    { min: 113, max: 116, letter: "D" },
    { min: 116, max: 119, letter: "E" },
  ],
};

const normalizedBreastSizeDefinition = [
  { min: 63, max: 68, size: "80" },
  { min: 68, max: 73, size: "85" },
  { min: 73, max: 78, size: "90" },
  { min: 78, max: 83, size: "95" },
  { min: 83, max: 88, size: "100" },
  { min: 88, max: 93, size: "105" },
  { min: 93, max: 98, size: "110" },
];

class OutOfBoundCupSizeError extends Error {
  constructor() {
    super("Given sizes are out of bounds");

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, OutOfBoundCupSizeError.prototype);
  }
}

const createComputeCupSizeFromFedinitions =
  (definitions: CupSizeDefinition) =>
  (waistSize: number | undefined, chestSize: number | undefined) => {
    const normalizedWaistSize = computeNormalizedWaistSize(waistSize);
    const possibleCupSizes = definitions[normalizedWaistSize];

    if (!possibleCupSizes) {
      throw new OutOfBoundCupSizeError();
    }

    // For chest sizes
    const cupSize = possibleCupSizes.find(
      ({ min, max }) => (chestSize || 0) < max && (chestSize || 0) >= min
    );
    if (!cupSize) {
      throw new OutOfBoundCupSizeError();
    }

    return cupSize.letter;
  };

export const computeAsymetricCupSize = createComputeCupSizeFromFedinitions(
  asymetricCupSizesDefinition
);

export const computeCupSize = createComputeCupSizeFromFedinitions(
  symetricCupSizesDefinition
);

export const computeNormalizedWaistSize = (waistSize: number | undefined) => {
  const normalizedWaistSize = normalizedBreastSizeDefinition.find(
    ({ min, max }) => (waistSize || 0) < max && (waistSize || 0) >= min
  );
  if (!normalizedWaistSize) {
    throw new OutOfBoundCupSizeError();
  }

  return normalizedWaistSize.size;
};
