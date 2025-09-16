import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { UsuarioContexto } from "../contexts/UsuarioContexto";

export default function useUsuario() {
  const { usuario, carregando } = useContext(UsuarioContexto);

  async function logout() {
    await signOut(auth);
  }

  return { usuario, carregando, logout };
}
