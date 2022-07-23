import React from "react";
import "./App.css";
import { useAppState } from "./lib/use-app-state";
import { ChestForm } from "./ChestForm";
import { AsymetricChestForm } from "./AsymetricChestForm";
import { ToggleButton } from "./ToggleButton";
import { InputNumber } from "./InputNumber";

const BLOCK = "App";

export interface AppProps {}

function App(_: AppProps) {
  const [appState, appStateActions] = useAppState();

  return (
    <div className={BLOCK}>
      <InputNumber
        id="tour_de_taille"
        label="Votre tour de buste"
        value={appState.breastSize}
        suffix="cm"
        isOneLine
        onChange={appStateActions.setBreastSize}
      />
      <p className={`${BLOCK}_help-text ${BLOCK}_help-text--space-bottom`}>
        Placez votre mètre ruban juste en-dessous de votre poitrine, faites le
        tour sans serrer trop fort, le ruban doit être droit au dos.
      </p>
      <ToggleButton
        isActive={appState.isAsymetric}
        labelOn="Asymetrique"
        labelOff="Symétrique"
        onToggle={appStateActions.toggleIsAsymetric}
      />
      <div className={`${BLOCK}_cup-size-form`}>
        {appState.isAsymetric ? (
          <>
            <p className={`${BLOCK}_help-text`}>
              Placez le mètre ruban entre vos seins (au niveau du décolleté),
              passez le sur la pointe de votre sein en vous arrêtant au milieu
              du dos, sans serrer le mètre ruban.
            </p>
            <div className={`${BLOCK}_cup-grid`}>
              <div className={`${BLOCK}_cup-grid-item`}>
                <InputNumber
                  id="tour_de_poitrine_gauche"
                  label="Gauche"
                  value={appState.leftHalfChestSize}
                  suffix="cm"
                  onChange={appStateActions.setLeftHalfChestSize}
                />
              </div>
              <div className={`${BLOCK}_cup-grid-item`}>
                <InputNumber
                  id="tour_de_poitrine_droit"
                  label="Droit"
                  value={appState.rightHalfChestSize}
                  suffix="cm"
                  onChange={appStateActions.setRightHalfChestSize}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <p className={`${BLOCK}_help-text`}>
              Placez votre mètre ruban sur la pointe de vos seins, faites le
              tour, sans serrer, le ruban doit être droit au dos.
            </p>
            <InputNumber
              id="tour_de_poitrine"
              label="Tour de poitrine"
              value={appState.chestSize}
              suffix="cm"
              onChange={appStateActions.setChestSize}
            />
          </>
        )}
      </div>
      {!appState.isAsymetric && (
        <ChestForm appState={appState} actions={appStateActions} />
      )}
      {appState.isAsymetric && (
        <AsymetricChestForm appState={appState} actions={appStateActions} />
      )}
    </div>
  );
}

export default App;
