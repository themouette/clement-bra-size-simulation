import { InputNumber } from "./InputNumber";
import { AppState, AppStateActions } from "./lib/use-app-state";
import { useNormalizedPantSize } from "./lib/use-normalized-pant-size";

export interface PantFormProps {
  appState: AppState;
  actions: AppStateActions;
}

export const PantForm: React.FunctionComponent<PantFormProps> = ({
  appState: { hipsSize },
  actions,
}) => {
  const [hasError, normalizedSize] = useNormalizedPantSize(hipsSize);

  return (
    <div>
      <InputNumber
        id="tour_de_taille"
        label="Tour de taille"
        value={hipsSize}
        onChange={actions.setHipsSize}
        suffix="cm"
      />
      <div>{hasError ? "Taille inconnue" : normalizedSize}</div>
    </div>
  );
};
