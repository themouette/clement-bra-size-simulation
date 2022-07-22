import { InputNumber } from "./InputNumber";
import { AppState, AppStateActions } from "./lib/use-app-state";
import { useNormalizedPantSize } from "./lib/use-normalized-pant-size";

export interface PantFormProps {
  appState: AppState;
  actions: AppStateActions;
  backToMenu: () => void;
}

export const PantForm: React.FunctionComponent<PantFormProps> = ({
  appState: { hipsSize },
  actions,
  backToMenu,
}) => {
  const [hasError, normalizedSize] = useNormalizedPantSize(hipsSize);

  return (
    <div>
      <button onClick={backToMenu}>{`<<`}</button>
      <InputNumber
        id="tour_de_taille"
        label="Tour de taille"
        value={hipsSize}
        onChange={actions.setHipsSize}
      />
      <div>{hasError ? "Taille inconnue" : normalizedSize}</div>
    </div>
  );
};
