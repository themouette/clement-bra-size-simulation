import { AppState, AppStateActions } from "./lib/use-app-state";
import React from "react";
import { useCupSize } from "./lib/use-cup-size";
import { useNormalizedWaistSize } from "./lib/use-normalized-waist-size";
import { InputNumber } from "./InputNumber";
import { ToggleButton } from "./ToggleButton";

export interface AsymetricChestFormProps {
  appState: AppState;
  actions: AppStateActions;
  backToMenu: () => void;
}

export const AsymetricChestForm: React.FunctionComponent<
  AsymetricChestFormProps
> = ({
  appState: { isAsymetric, breastSize, leftHalfChestSize, rightHalfChestSize },
  actions,
  backToMenu,
}) => {
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
        id="tour_de_poitrine_gauche"
        label="Mesure sein gauche"
        value={leftHalfChestSize}
        onChange={actions.setLeftHalfChestSize}
      />
      <InputNumber
        id="tour_de_poitrine_droit"
        label="Mesure sein droit"
        value={rightHalfChestSize}
        onChange={actions.setRightHalfChestSize}
      />
      <div>
        {hasNormalizedWaistSizeError ? "Taille inconnue" : normalizedWaistSize}
        {hasLeftCupSizeError ? "Bonnet inconnu" : leftCupSize}
        {hasRightCupSizeError ? "Bonnet inconnu" : rightCupSize}
      </div>
    </div>
  );
};
