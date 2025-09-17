// app/TaskFormScreen.tsx
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { getAuth } from "firebase/auth";

// ❌ antes importava RootStackParamList, agora usamos any
type Props = NativeStackScreenProps<any, "TaskForm">;

export default function TaskFormScreen({ route, navigation }: Props) {
  const { id } = route.params || {};
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const auth = getAuth();
  const usuario = auth.currentUser;

  useEffect(() => {
    const carregar = async () => {
      if (!id || !usuario) return;
      const ref = doc(db, "usuarios", usuario.uid, "tarefas", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setTitulo((data as any)?.titulo ?? "");
        setDescricao((data as any)?.descricao ?? "");
      }
    };
    carregar();
  }, [id, usuario]);

  const salvar = async () => {
    if (!usuario) return Alert.alert("Erro", "Usuário não autenticado");
    try {
      if (id) {
        const ref = doc(db, "usuarios", usuario.uid, "tarefas", id);
        await updateDoc(ref, { titulo, descricao });
      } else {
        const col = collection(db, "usuarios", usuario.uid, "tarefas");
        await addDoc(col, { titulo, descricao });
      }
      navigation.goBack();
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível salvar");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />
      <Button title={id ? "Atualizar" : "Criar"} onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  textarea: { height: 100, textAlignVertical: "top" },
});
