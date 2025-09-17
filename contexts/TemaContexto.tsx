import React, { createContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TemaContextoType = {
  temaEscuro: boolean;
  alternarTema: () => void;
};

export const TemaContexto = createContext<TemaContextoType>({
  temaEscuro: false,
  alternarTema: () => {},
});

export function TemaProvider({ children }: { children: React.ReactNode }) {
  const [temaEscuro, setTemaEscuro] = useState(false);

  
  useEffect(() => {
    (async () => {
      try {
        const valorSalvo = await AsyncStorage.getItem("tema");
        if (valorSalvo !== null) {
          setTemaEscuro(valorSalvo === "escuro");
        } else {
        
          const corSistema = Appearance.getColorScheme();
          setTemaEscuro(corSistema === "dark");
        }
      } catch (error) {
        console.log("Erro ao carregar tema:", error);
      }
    })();
  }, []);


  const alternarTema = async () => {
    try {
      const novoTema = !temaEscuro;
      setTemaEscuro(novoTema);
      await AsyncStorage.setItem("tema", novoTema ? "escuro" : "claro");
    } catch (error) {
      console.log("Erro ao salvar tema:", error);
    }
  };

  return (
    <TemaContexto.Provider value={{ temaEscuro, alternarTema }}>
      {children}
    </TemaContexto.Provider>
  );
}
