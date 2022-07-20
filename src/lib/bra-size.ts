const cupSizesDefinition = [
  { min: 0, max: 4, letter: "A" },
  { min: 4, max: 7, letter: "B" },
  { min: 7, max: 10, letter: "C" },
  { min: 10, max: 12, letter: "D" },
  { min: 12, max: 15, letter: "E" },
];

const normalizedWaistDefinition = [
  { min: 63, max: 67, size: "80" },
  { min: 67, max: 72, size: "85" },
  { min: 72, max: 77, size: "90" },
  { min: 77, max: 82, size: "95" },
  { min: 82, max: 87, size: "100" },
  { min: 87, max: 92, size: "105" },
  { min: 92, max: 97, size: "110" },
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
  return "A";
};

export const computeCupSize = (waistSize: number, chestSize: number) => {
  const sizeDiff = chestSize - waistSize;
  const cupSize = cupSizesDefinition.find(
    ({ min, max }) => sizeDiff < max && sizeDiff >= min
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
