type CupLetter = "A" | "B" | "C" | "D" | "E";
type WaistSize = string;
interface CupSizeDefinition {
  [waistSize: WaistSize]: Array<{
    /** Min number in the interval */
    min: number;
    /** Max number in the interval */
    max: number;
    /** Corresponding cup size letter */
    letter: CupLetter;
  }>;
}
const cupSizesDefinition: CupSizeDefinition = {
  "80": [
    { min: 73, max: 77, letter: "A" },
    { min: 77, max: 81, letter: "B" },
    { min: 81, max: 85, letter: "C" },
    { min: 85, max: 89, letter: "D" },
    { min: 89, max: 93, letter: "E" },
  ],
  "85": [
    { min: 78, max: 82, letter: "A" },
    { min: 82, max: 86, letter: "B" },
    { min: 86, max: 90, letter: "C" },
    { min: 90, max: 94, letter: "D" },
    { min: 94, max: 98, letter: "E" },
  ],
  "90": [
    { min: 80, max: 87, letter: "A" },
    { min: 87, max: 91, letter: "B" },
    { min: 91, max: 95, letter: "C" },
    { min: 95, max: 99, letter: "D" },
    { min: 99, max: 103, letter: "E" },
  ],
  "95": [
    { min: 88, max: 92, letter: "A" },
    { min: 92, max: 96, letter: "B" },
    { min: 96, max: 100, letter: "C" },
    { min: 100, max: 104, letter: "D" },
    { min: 104, max: 108, letter: "E" },
  ],
  "100": [
    { min: 93, max: 97, letter: "A" },
    { min: 97, max: 101, letter: "B" },
    { min: 101, max: 105, letter: "C" },
    { min: 105, max: 109, letter: "D" },
    { min: 109, max: 113, letter: "E" },
  ],
  "105": [
    { min: 98, max: 102, letter: "A" },
    { min: 102, max: 106, letter: "B" },
    { min: 106, max: 110, letter: "C" },
    { min: 110, max: 114, letter: "D" },
    { min: 114, max: 118, letter: "E" },
  ],
  "110": [
    { min: 103, max: 107, letter: "A" },
    { min: 107, max: 111, letter: "B" },
    { min: 111, max: 115, letter: "C" },
    { min: 115, max: 119, letter: "D" },
    { min: 119, max: 123, letter: "E" },
  ],
};

const normalizedWaistDefinition = [
  { min: 63, max: 67, size: "80" },
  { min: 67, max: 72, size: "85" },
  { min: 72, max: 77, size: "90" },
  { min: 77, max: 82, size: "95" },
  { min: 82, max: 87, size: "100" },
  { min: 87, max: 92, size: "105" },
  { min: 92, max: 97, size: "110" },
];

const normalizedPantSizeDefinition = [
  { min: 84, max: 89, size: "34" },
  { min: 89, max: 93, size: "36" },
  { min: 93, max: 97, size: "38" },
  { min: 97, max: 101, size: "40" },
  { min: 101, max: 105, size: "42" },
  { min: 105, max: 109, size: "44" },
];

class OutOfBoundCupSizeError extends Error {
  constructor() {
    super("Given sizes are out of bounds");

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, OutOfBoundCupSizeError.prototype);
  }
}

export const computeAsymetricCupSize = (
  waistSize: number,
  chestSize: number
) => {
  return computeCupSize(waistSize, chestSize * 2);
};

export const computeCupSize = (waistSize: number, chestSize: number) => {
  const normalizedWaistSize = computeNormalizedWaistSize(waistSize);
  const possibleCupSizes = cupSizesDefinition[normalizedWaistSize];

  if (!possibleCupSizes) {
    throw new OutOfBoundCupSizeError();
  }

  // For chest sizes
  const cupSize = possibleCupSizes.find(
    ({ min, max }) => chestSize < max && chestSize >= min
  );
  if (!cupSize) {
    throw new OutOfBoundCupSizeError();
  }

  return cupSize.letter;
};

export const computeNormalizedWaistSize = (waistSize: number) => {
  const normalizedWaistSize = normalizedWaistDefinition.find(
    ({ min, max }) => waistSize < max && waistSize >= min
  );
  if (!normalizedWaistSize) {
    throw new OutOfBoundCupSizeError();
  }

  return normalizedWaistSize.size;
};

export const computeNormalizedPantSize = (waistSize: number) => {
  const normalizedPantSize = normalizedPantSizeDefinition.find(
    ({ min, max }) => waistSize < max && waistSize >= min
  );
  if (!normalizedPantSize) {
    throw new OutOfBoundCupSizeError();
  }

  return normalizedPantSize.size;
};
