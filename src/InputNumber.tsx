import React from "react";

export interface InputNumberProps {
  /** input id */
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const parseNumberInput = (value: string) => parseFloat(value.replace(",", "."));

export const InputNumber: React.FunctionComponent<InputNumberProps> = ({
  id,
  label,
  value,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        value={value}
        onChange={({ target: { value } }) => onChange(parseNumberInput(value))}
      />
    </div>
  );
};
