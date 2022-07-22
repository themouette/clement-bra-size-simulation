import React, { useCallback } from "react";
import "./App.css";
import { useAppState } from "./lib/use-app-state";
import { ChestForm } from "./ChestForm";
import { UnderwareTypeSelector } from "./UnderwareTypeSelector";
import { UnderwareType } from "./lib/types";
import { PantForm } from "./PantForm";
import { AsymetricChestForm } from "./AsymetricChestForm";

function App() {
  const [appState, appStateActions] = useAppState();
  const [underwareType, setUnderwareType] = React.useState<UnderwareType>();

  const backToMenu = useCallback(() => setUnderwareType(undefined), []);

  return (
    <div className="App">
      {
        /*
         * When there is a type selected, for now let's render nothing
         * it will be te subcomponent responsibility to render back button
         */ !underwareType && (
          <UnderwareTypeSelector
            underwareType={underwareType}
            setUnderwareType={setUnderwareType}
          />
        )
      }
      {underwareType === "bra" && !appState.isAsymetric && (
        <ChestForm
          appState={appState}
          actions={appStateActions}
          backToMenu={backToMenu}
        />
      )}
      {underwareType === "bra" && appState.isAsymetric && (
        <AsymetricChestForm
          appState={appState}
          actions={appStateActions}
          backToMenu={backToMenu}
        />
      )}
      {underwareType === "pants" && (
        <PantForm
          appState={appState}
          actions={appStateActions}
          backToMenu={backToMenu}
        />
      )}
      <div>
        {appState.breastSize} - {appState.chestSize}
      </div>
    </div>
  );
}

export default App;
