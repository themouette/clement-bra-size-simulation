import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App, { AppProps } from "./App";

export const init = (root: string, appProps: AppProps = {}) => {
  const rootNode = document.getElementById(root) as HTMLElement;
  const reactRoot = ReactDOM.createRoot(rootNode);
  reactRoot.render(
    <React.StrictMode>
      <App {...appProps} />
    </React.StrictMode>
  );
};
