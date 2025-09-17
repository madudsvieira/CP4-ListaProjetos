// App.tsx
import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { carregarIdioma } from "./services/i18nConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { UsuarioProvider } from "./contexts/UsuarioContexto";
import { TemaProvider } from "./contexts/TemaContexto";
import Rotas from "./app/index"; 

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    carregarIdioma();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TemaProvider>
        <UsuarioProvider>
          <Rotas />
        </UsuarioProvider>
      </TemaProvider>
    </QueryClientProvider>
  );
}
