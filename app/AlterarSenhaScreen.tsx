import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { getAuth, updatePassword } from "firebase/auth";

export default function AlterarSenhaScreen() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [novaSenha, setNovaSenha] = useState("");

  async function handleAlterarSenha() {
    if (!user) {
      Alert.alert("Erro", "Nenhum usuário logado.");
      return;
    }

    try {
      await updatePassword(user, novaSenha);
      Alert.alert("Sucesso", "Senha alterada com sucesso!");
      setNovaSenha("");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Não foi possível alterar a senha.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alterar Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Nova senha"
        secureTextEntry
        value={novaSenha}
        onChangeText={setNovaSenha}
      />
      <Button title="Alterar Senha" onPress={handleAlterarSenha} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});
