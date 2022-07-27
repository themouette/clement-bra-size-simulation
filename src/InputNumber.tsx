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

function whatDecimalSeparator() {
  const n = 1.1;
  return n.toLocaleString().substring(1, 2);
}
const decimalSeparator = whatDecimalSeparator();

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
  const [valueStr, setValueStr] = React.useState(value ? `${value}` : "");

  const interceptDot: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    // Intercept dot and comma
    const interceptedKeys = [".", ","];
    if (interceptedKeys.includes(event.key)) {
      event.preventDefault();
      setValueStr((previous) => {
        return previous.includes(decimalSeparator)
          ? previous
          : `${previous}${decimalSeparator}`;
      });
    }
    // If this is not a number nor a special key
    if (event.key.length === 1 && !/\d/.test(event.key)) {
      event.preventDefault();
    }
  };

  const onChangeCallback: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setValueStr(value);
    onChange(parseNumberInput(value));
  };
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
              type="text"
              inputMode="numeric"
              value={valueStr}
              onKeyDown={interceptDot}
              onChange={onChangeCallback}
            />
          </div>
          {suffix && <span className={`${BLOCK}_input-suffix`}>{suffix}</span>}
        </div>
      </div>
      {helpText ? <p className={`${BLOCK}_help-text`}>{helpText}</p> : null}
    </div>
  );
};
