import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from "react-native";
import useListaTarefas from "../hooks/useListaTarefas";
import useUsuario from "../hooks/useUsuario";

export default function HomeScreen() {
  const { tarefas, adicionarTarefa, atualizarTarefa, toggleConcluida, excluirTarefa } = useListaTarefas();
  const { usuario, logout } = useUsuario();
  const [novaTarefa, setNovaTarefa] = useState("");

  function handleAdicionar() {
    if (novaTarefa.trim()) {
      adicionarTarefa(novaTarefa);
      setNovaTarefa("");
    }
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Bem-vindo, {usuario?.email}</Text>

      <TextInput
        placeholder="Nova tarefa"
        value={novaTarefa}
        onChangeText={setNovaTarefa}
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />
      <Button title="Adicionar" onPress={handleAdicionar} />

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5 }}>
            <TouchableOpacity onPress={() => toggleConcluida(item.id, item.concluida)}>
              <Text style={{ textDecorationLine: item.concluida ? "line-through" : "none" }}>
                {item.titulo}
              </Text>
            </TouchableOpacity>
            <Button title="Excluir" onPress={() => excluirTarefa(item.id)} />
          </View>
        )}
      />

      <Button title="Sair" onPress={logout} color="red" />
    </View>
  );
}
