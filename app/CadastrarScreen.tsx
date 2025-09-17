import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { auth, useGoogleAuth } from "../services/authService";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function CadastrarScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  
  const { loginComGoogle } = useGoogleAuth();

  async function handleCadastrar() {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      navigation.replace("Home");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  async function handleLoginGoogle() {
    try {
      await loginComGoogle();
      navigation.replace("Home");
    } catch (error: any) {
      Alert.alert("Erro", "Falha no login com Google");
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.botao} onPress={handleCadastrar}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoGoogle} onPress={handleLoginGoogle}>
        <Text style={styles.textoBotao}>Entrar com Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  botaoGoogle: {
    backgroundColor: "#DB4437",
    padding: 15,
    borderRadius: 6,
  },
  textoBotao: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});
