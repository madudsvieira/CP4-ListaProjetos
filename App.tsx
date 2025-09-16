import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { carregarIdioma } from "./services/i18nConfig"; // ✅ com chaves
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { UsuarioProvider } from "./contexts/UsuarioContexto";
import { TemaProvider } from "./contexts/TemaContexto";
import Rotas from "./App"; // ✅ importa as rotas do index.tsx

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    carregarIdioma(); // ✅ agora é função
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
