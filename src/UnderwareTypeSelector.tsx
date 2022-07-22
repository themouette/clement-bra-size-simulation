import { UnderwareType } from "./lib/types";

export interface UnderwareTypeSelectorProps {
  underwareType?: UnderwareType;
  setUnderwareType: (newType?: UnderwareType) => void;
}

const selectedProp = (isSelected: boolean) =>
  isSelected
    ? {
        style: { borderStyle: "inset" },
      }
    : null;

export const UnderwareTypeSelector: React.FunctionComponent<
  UnderwareTypeSelectorProps
> = ({ underwareType, setUnderwareType }) => {
  return (
    <div>
      <button
        onClick={() => setUnderwareType("pants")}
        {...selectedProp(underwareType === "pants")}
      >
        Cullotte/Tanga
      </button>
      <button
        onClick={() => setUnderwareType("bra")}
        {...selectedProp(underwareType === "bra")}
      >
        Soutien gorge
      </button>
    </div>
  );
};
