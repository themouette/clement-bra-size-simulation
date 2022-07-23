import React from "react";
import "./Result.css";

export interface ResultProps {
  className?: string;
  children: React.ReactNode;
  hasError: boolean;
  hasValue: boolean;
}

const BLOCK = "Result";

export const Result: React.FunctionComponent<ResultProps> = ({
  className,
  children,
  hasValue,
  hasError,
}) => {
  if (!hasValue) {
    return null;
  }
  if (hasError) {
    return (
      <div className={`${BLOCK} ${BLOCK}--is-error ${className}`}>
        Désolé, mais cette valeur n'est pas encore proposée par la marque.
      </div>
    );
  }

  return <div className={`${BLOCK} ${className}`}>{children}</div>;
};
