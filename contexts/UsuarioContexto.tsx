import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

type UsuarioContextType = {
  usuario: User | null;
  carregando: boolean;
};

export const UsuarioContexto = createContext<UsuarioContextType>({
  usuario: null,
  carregando: true,
});

export function UsuarioProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UsuarioContexto.Provider value={{ usuario, carregando }}>
      {children}
    </UsuarioContexto.Provider>
  );
}
