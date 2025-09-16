import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { auth } from "./firebaseConfig";

export type Tarefa = {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

function getUserTasksCollection() {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");
  return collection(db, "usuarios", user.uid, "tarefas");
}

export async function criarTarefa(tarefa: Omit<Tarefa, "id" | "createdAt" | "updatedAt">) {
  const tarefasRef = getUserTasksCollection();
  const now = Timestamp.now();

  const docRef = await addDoc(tarefasRef, {
    ...tarefa,
    createdAt: now,
    updatedAt: now,
  });

  return docRef.id;
}

export function observarTarefas(callback: (tarefas: Tarefa[]) => void) {
  const tarefasRef = getUserTasksCollection();
  const q = query(tarefasRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const lista: Tarefa[] = [];
    snapshot.forEach((docSnap) => {
      lista.push({ id: docSnap.id, ...docSnap.data() } as Tarefa);
    });
    callback(lista);
  });
}


export async function atualizarTarefa(id: string, dados: Partial<Tarefa>) {
  const tarefaRef = doc(getUserTasksCollection(), id);
  await updateDoc(tarefaRef, {
    ...dados,
    updatedAt: Timestamp.now(),
  });
}

export async function deletarTarefa(id: string) {
  const tarefaRef = doc(getUserTasksCollection(), id);
  await deleteDoc(tarefaRef);
}
