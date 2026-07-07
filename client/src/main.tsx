import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import { SteamDataProvider } from "./context/SteamDataContext.tsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <QueryClientProvider client={queryClient}>
        <SteamDataProvider>
          <App />
        </SteamDataProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>,
);
