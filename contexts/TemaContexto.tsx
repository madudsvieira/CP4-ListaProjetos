import React, { createContext, useState, useEffect, ReactNode } from "react";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TemaContextoType = {
  temaEscuro: boolean;
  alternarTema: () => void;
};

export const TemaContexto = createContext<TemaContextoType>({
  temaEscuro: false,
  alternarTema: () => {},
});

export function TemaProvider({ children }: { children: ReactNode }) {
  const [temaEscuro, setTemaEscuro] = useState(false);

  useEffect(() => {
    (async () => {
      const salvo = await AsyncStorage.getItem("tema");
      if (salvo) {
        setTemaEscuro(salvo === "escuro");
      }
    })();
  }, []);

  const alternarTema = async () => {
    const novoTema = !temaEscuro;
    setTemaEscuro(novoTema);
    await AsyncStorage.setItem("tema", novoTema ? "escuro" : "claro");
  };

  const tema = temaEscuro ? MD3DarkTheme : MD3LightTheme;

  return (
    <TemaContexto.Provider value={{ temaEscuro, alternarTema }}>
      <PaperProvider theme={tema}>{children}</PaperProvider>
    </TemaContexto.Provider>
  );
}
