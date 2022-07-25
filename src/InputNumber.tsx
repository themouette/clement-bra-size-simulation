import React from "react";
import "./InputNumber.css";

export interface InputNumberProps {
  /** input id */
  id: string;
  label: string;
  value: number | undefined;
  error?: string;
  helpText?: string;
  suffix?: string;
  isOneLine?: boolean;
  onChange: (value: number | undefined) => void;
}

const parseNumberInput = (value: string) => {
  const number = parseFloat(value.replace(",", "."));
  return Number.isNaN(number) ? undefined : number;
};
const BLOCK = "InputNumber";

export const InputNumber: React.FunctionComponent<InputNumberProps> = ({
  id,
  label,
  value,
  helpText,
  suffix,
  isOneLine = false,
  onChange,
}) => {
  return (
    <div className={BLOCK}>
      <div
        className={`${BLOCK}_one-line-wrapper${
          isOneLine ? ` ${BLOCK}_one-line-wrapper--is-one-line` : ""
        }`}
      >
        <label
          htmlFor={id}
          className={`${BLOCK}_label${
            isOneLine ? ` ${BLOCK}_label--is-one-line` : ""
          }`}
        >
          {label}
        </label>
        <div className={`${BLOCK}_input-container`}>
          <div className={`${BLOCK}_input-wrapper`}>
            <input
              type="number"
              value={Number.isNaN(value) || !value ? undefined : value}
              onChange={({ target: { value } }) =>
                onChange(parseNumberInput(value))
              }
            />
          </div>
          {suffix && <span className={`${BLOCK}_input-suffix`}>{suffix}</span>}
        </div>
      </div>
      {helpText ? <p className={`${BLOCK}_help-text`}>{helpText}</p> : null}
    </div>
  );
};
