import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { criarContaComEmail, loginComEmail } from "../services/authService";

export default function CadastrarScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleCriarConta() {
    try {
      await criarContaComEmail(email, senha);
      Alert.alert("Conta criada com sucesso!");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Erro ao criar conta", error.message);
    }
  }

  async function handleLogin() {
    try {
      await loginComEmail(email, senha);
      Alert.alert("Login realizado com sucesso!");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Erro ao fazer login", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🔑 Criar Conta / Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button title="Criar Conta" onPress={handleCriarConta} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Entrar" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  buttonContainer: {
    marginBottom: 10,
  },
});
