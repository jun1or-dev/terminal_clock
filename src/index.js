import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./i18next";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
