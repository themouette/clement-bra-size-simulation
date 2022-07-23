import React from "react";
import "./InputNumber.css";

export interface InputNumberProps {
  /** input id */
  id: string;
  label: string;
  value: number;
  error?: string;
  helpText?: string;
  suffix?: string;
  onChange: (value: number) => void;
}

const parseNumberInput = (value: string) => parseFloat(value.replace(",", "."));
const BLOCK = "InputNumber";

export const InputNumber: React.FunctionComponent<InputNumberProps> = ({
  id,
  label,
  value,
  helpText,
  suffix,
  onChange,
}) => {
  return (
    <div className={BLOCK}>
      <label htmlFor={id} className={`${BLOCK}_label`}>
        {label}
      </label>
      <div className={`${BLOCK}_input-container`}>
        <input
          className={`${BLOCK}_input`}
          type="number"
          value={value}
          onChange={({ target: { value } }) =>
            onChange(parseNumberInput(value))
          }
        />
        {suffix && <span className={`${BLOCK}_input-suffix`}>{suffix}</span>}
      </div>
      {helpText ? <p className={`${BLOCK}_help-text`}>{helpText}</p> : null}
    </div>
  );
};
