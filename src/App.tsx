import React, { useCallback } from "react";
import "./App.css";
import { useAppState } from "./lib/use-app-state";
import { ChestForm } from "./ChestForm";
import { UnderwareTypeSelector } from "./UnderwareTypeSelector";
import { UnderwareType } from "./lib/types";
import { PantForm } from "./PantForm";
import { AsymetricChestForm } from "./AsymetricChestForm";
import { ToggleButton } from "./ToggleButton";
import { InputNumber } from "./InputNumber";

const BLOCK = "App";

export interface AppProps {
  imageBraUrl?: string;
  imagePantUrl?: string;
  iconBraUrl?: string;
  iconPantUrl?: string;
}

function App({
  imageBraUrl = "",
  imagePantUrl = "",
  iconBraUrl = "",
  iconPantUrl = "",
}: AppProps) {
  const [appState, appStateActions] = useAppState();
  const [underwareType, setUnderwareType] = React.useState<UnderwareType>();

  const backToMenu = useCallback(() => setUnderwareType(undefined), []);

  return (
    <div className={BLOCK}>
      {
        /*
         * When there is a type selected, for now let's render nothing
         * it will be te subcomponent responsibility to render back button
         */ underwareType ? (
          <button onClick={backToMenu}>{`<<`}</button>
        ) : (
          <UnderwareTypeSelector
            iconPantUrl={iconPantUrl}
            iconBraUrl={iconBraUrl}
            underwareType={underwareType}
            setUnderwareType={setUnderwareType}
          />
        )
      }
      {underwareType === "bra" && (
        <img src={imageBraUrl} alt="" className={`${BLOCK}_image-header`} />
      )}
      {underwareType === "pants" && (
        <img src={imagePantUrl} alt="" className={`${BLOCK}_image-header`} />
      )}
      {underwareType === "bra" && (
        <>
          <InputNumber
            id="tour_de_taille"
            label="Votre tour de buste"
            value={appState.breastSize}
            suffix="cm"
            onChange={appStateActions.setBreastSize}
          />
          <p className={`${BLOCK}_help-text`}>
            Placez votre mètre ruban juste en-dessous de votre poitrine, faites
            le tour sans serrer trop fort, le ruban doit être droit au dos.
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
                  Placez le mètre ruban entre vos seins (au niveau du
                  décolleté), passez le sur la pointe de votre sein en vous
                  arrêtant au milieu du dos, sans serrer le mètre ruban.
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
        </>
      )}
      {underwareType === "bra" && !appState.isAsymetric && (
        <ChestForm appState={appState} actions={appStateActions} />
      )}
      {underwareType === "bra" && appState.isAsymetric && (
        <AsymetricChestForm appState={appState} actions={appStateActions} />
      )}
      {underwareType === "pants" && (
        <PantForm appState={appState} actions={appStateActions} />
      )}
    </div>
  );
}

export default App;
