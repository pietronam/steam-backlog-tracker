import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import SteamDataProvider from "./context/SteamDataContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SteamDataProvider>
      <App />
    </SteamDataProvider>
  </StrictMode>,
);
