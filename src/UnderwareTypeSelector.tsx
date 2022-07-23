import { UnderwareType } from "./lib/types";
import "./UnderwareTypeSelector.css";

export interface UnderwareTypeSelectorProps {
  underwareType?: UnderwareType;
  setUnderwareType: (newType?: UnderwareType) => void;
  iconBraUrl?: string;
  iconPantUrl?: string;
}

const BLOCK = "UnderwareTypeSelector";

const activeClassName = (isActive: boolean) =>
  isActive ? `${BLOCK}_button--is-active` : "";

export const UnderwareTypeSelector: React.FunctionComponent<
  UnderwareTypeSelectorProps
> = ({ underwareType, setUnderwareType, iconBraUrl, iconPantUrl }) => {
  return (
    <div className={BLOCK}>
      <button
        className={`${BLOCK}_button ${activeClassName(
          underwareType === "bra"
        )}`}
        onClick={() => setUnderwareType("bra")}
      >
        <img src={iconBraUrl} alt="" className={`${BLOCK}_icon`} />
        Soutien-gorge
      </button>
      <button
        className={`${BLOCK}_button ${activeClassName(
          underwareType === "pants"
        )}`}
        onClick={() => setUnderwareType("pants")}
      >
        <img src={iconPantUrl} alt="" className={`${BLOCK}_icon`} />
        Cullotte & Tanga
      </button>
    </div>
  );
};
