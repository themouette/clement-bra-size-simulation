import { AppState, AppStateActions } from "./lib/use-app-state";
import React from "react";
import { useCupSize } from "./lib/use-cup-size";
import { useNormalizedWaistSize } from "./lib/use-normalized-waist-size";
import { InputNumber } from "./InputNumber";
import { ToggleButton } from "./ToggleButton";

export interface ChestFormProps {
  appState: AppState;
  actions: AppStateActions;
  backToMenu: () => void;
}

export const ChestForm: React.FunctionComponent<ChestFormProps> = ({
  appState: { isAsymetric, breastSize, chestSize },
  actions,
  backToMenu,
}) => {
  const [hasCupSizeError, cupSize] = useCupSize({
    isAsymetric: false,
    breastSize: breastSize,
    chestSize,
  });
  const [hasNormalizedWaistSizeError, normalizedWaistSize] =
    useNormalizedWaistSize(breastSize);

  return (
    <div>
      <button onClick={backToMenu}>{`<<`}</button>
      <ToggleButton
        isActive={isAsymetric}
        labelOn="Asymetrique"
        labelOff="Symétrique"
        onToggle={actions.toggleIsAsymetric}
      />
      <InputNumber
        id="tour_de_taille"
        label="Tour de taille"
        value={breastSize}
        onChange={actions.setBreastSize}
      />
      <InputNumber
        id="tour_de_poitrine"
        label="Tour de poitrine"
        value={chestSize}
        onChange={actions.setChestSize}
      />
      <div>
        {hasNormalizedWaistSizeError ? "Taille inconnue" : normalizedWaistSize}
        {hasCupSizeError ? "Bonnet inconnu" : cupSize}
      </div>
    </div>
  );
};
