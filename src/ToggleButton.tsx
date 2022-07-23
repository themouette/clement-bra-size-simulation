import "./ToggleButton.css";

export interface ToggleButtonProps {
  labelOn: string;
  labelOff: string;
  isActive: boolean;
  onToggle: (becomesActive: boolean) => void;
}

const BLOCK = "ToggleButton";

const activeClassName = (isActive: boolean) =>
  isActive ? `${BLOCK}_button--is-active` : `${BLOCK}_button--is-inactive`;

export const ToggleButton: React.FunctionComponent<ToggleButtonProps> = ({
  isActive,
  labelOn,
  labelOff,
  onToggle,
}) => {
  return (
    <div className={BLOCK}>
      <button
        className={`${BLOCK}_button ${activeClassName(!isActive)}`}
        onClick={() => isActive && onToggle(false)}
      >
        {labelOff}
      </button>
      <button
        className={`${BLOCK}_button ${activeClassName(isActive)}`}
        onClick={() => !isActive && onToggle(true)}
      >
        {labelOn}
      </button>
    </div>
  );
};
