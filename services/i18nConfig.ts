import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const resources = {
  pt: {
    translation: {
      login: "Login",
      email: "Email",
      senha: "Senha",
      entrar: "Entrar",
      criarConta: "Criar conta",
      sair: "Sair",
      minhasTarefas: "Minhas Tarefas",
      titulo: "Título",
      descricao: "Descrição",
      adicionarTarefa: "Adicionar Tarefa",
      pendente: "Pendente",
      concluida: "Concluída",
      temaClaro: "Usar Tema Claro",
      temaEscuro: "Usar Tema Escuro",
    },
  },
  en: {
    translation: {
      login: "Login",
      email: "Email",
      senha: "Password",
      entrar: "Sign in",
      criarConta: "Create account",
      sair: "Logout",
      minhasTarefas: "My Tasks",
      titulo: "Title",
      descricao: "Description",
      adicionarTarefa: "Add Task",
      pendente: "Pending",
      concluida: "Completed",
      temaClaro: "Use Light Theme",
      temaEscuro: "Use Dark Theme",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt",
  fallbackLng: "pt",
  interpolation: { escapeValue: false },
});

export async function mudarIdioma(lang: "pt" | "en") {
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem("idioma", lang);
}

export async function carregarIdioma() {
  const lang = await AsyncStorage.getItem("idioma");
  if (lang) {
    await i18n.changeLanguage(lang);
  }
}

export default i18n;
