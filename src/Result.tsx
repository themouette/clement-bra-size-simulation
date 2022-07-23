import React from "react";
import "./Result.css";

export interface ResultProps {
  className?: string;
  children: React.ReactNode;
}

const BLOCK = "Result";

export const Result: React.FunctionComponent<ResultProps> = ({
  className,
  children,
}) => {
  return <div className={`${BLOCK} ${className}`}>{children}</div>;
};
