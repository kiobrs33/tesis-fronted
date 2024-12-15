import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { storeApp } from "./redux/storeApp.ts";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={storeApp}>
      <App />
    </Provider>
  </StrictMode>
);
