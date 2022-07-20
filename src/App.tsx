import React from "react";
import "./App.css";
import {
  computeAsymetricCupSize,
  computeCupSize,
  computeNormalizedWaistSize,
} from "./lib/bra-size";
import { AppState, useAppState } from "./useAppState";

const useCupSize = ({ isAsymetric, waistSize, chestSize }: AppState) => {
  let hasError = false;
  let cupSize = "";
  try {
    cupSize = isAsymetric
      ? computeAsymetricCupSize(waistSize, chestSize)
      : computeCupSize(waistSize, chestSize);
  } catch (e) {
    hasError = true;
  }

  return [hasError, cupSize];
};
const useNormalizedWaistSize = (waistSize: number) => {
  let hasError = false;
  let normalizedWaistSize = "";
  try {
    normalizedWaistSize = computeNormalizedWaistSize(waistSize);
  } catch (e) {
    hasError = true;
  }

  return [hasError, normalizedWaistSize];
};
const parseNumberInput = (value: string) => parseFloat(value.replace(",", "."));

function App() {
  const [appState, { toggleIsAsymetric, setWaistSize, setChestSize }] =
    useAppState();

  const [hasCupSizeError, cupSize] = useCupSize(appState);
  const [hasNormalizedWaistSizeError, normalizedWaistSize] =
    useNormalizedWaistSize(appState.waistSize);

  return (
    <div className="App">
      <label>
        Tour de taille:
        <input
          type="number"
          value={appState.waistSize}
          onChange={({ target: { value } }) =>
            setWaistSize(parseNumberInput(value))
          }
        />
      </label>
      <label>
        Tour de poitrine:
        <input
          type="number"
          value={appState.chestSize}
          onChange={({ target: { value } }) =>
            setChestSize(parseNumberInput(value))
          }
        />
      </label>
      <div>
        {hasNormalizedWaistSizeError ? "Taille inconnue" : normalizedWaistSize}
        {hasCupSizeError ? "Bonnet inconnu" : cupSize}
      </div>
      <div>
        {appState.waistSize} - {appState.chestSize}
      </div>
      <label>
        <input
          type="checkbox"
          checked={appState.isAsymetric}
          onChange={toggleIsAsymetric}
        />
        J'ai une poitrine asymétrique
      </label>
    </div>
  );
}

export default App;
