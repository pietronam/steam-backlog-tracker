import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import SteamDataProvider from "./context/SteamDataContext.tsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <SteamDataProvider>
        <App />
      </SteamDataProvider>
    </ChakraProvider>
  </StrictMode>,
);
