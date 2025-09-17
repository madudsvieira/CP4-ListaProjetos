import { useEffect, useState } from "react";
import { db } from "../services/firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

type Tarefa = {
  id?: string;       // 👈 agora é opcional
  titulo: string;
  concluida: boolean;
};

export default function useListaTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const auth = getAuth();
  const usuario = auth.currentUser;

  useEffect(() => {
    if (!usuario) return;

    const tarefasRef = collection(db, "usuarios", usuario.uid, "tarefas");
    const q = query(tarefasRef, orderBy("titulo"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista: Tarefa[] = [];
      snapshot.forEach((docSnap) => {
        lista.push({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Tarefa, "id">),
        });
      });
      setTarefas(lista);
    });

    return () => unsubscribe();
  }, [usuario]);

  async function adicionarTarefa(titulo: string) {
    if (!usuario) return;

    const tarefasRef = collection(db, "usuarios", usuario.uid, "tarefas");
    await addDoc(tarefasRef, {
      titulo,
      concluida: false,
    });
  }

  async function atualizarTarefa(id: string, novoTitulo: string) {
    if (!usuario) return;

    const tarefaRef = doc(db, "usuarios", usuario.uid, "tarefas", id);
    await updateDoc(tarefaRef, { titulo: novoTitulo });
  }

  async function toggleConcluida(id: string, concluida: boolean) {
    if (!usuario) return;

    const tarefaRef = doc(db, "usuarios", usuario.uid, "tarefas", id);
    await updateDoc(tarefaRef, { concluida: !concluida });
  }

  async function excluirTarefa(id: string) {
    if (!usuario) return;

    const tarefaRef = doc(db, "usuarios", usuario.uid, "tarefas", id);
    await deleteDoc(tarefaRef);
  }

  return { tarefas, adicionarTarefa, atualizarTarefa, toggleConcluida, excluirTarefa };
}
