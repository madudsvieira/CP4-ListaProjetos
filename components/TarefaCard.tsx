import React from "react";
import { View, Text } from "react-native";

export default function TarefaCard() {
  return (
    <View style={{ padding: 10, margin: 5, borderWidth: 1 }}>
      <Text>Título da Tarefa</Text>
      <Text>Descrição</Text>
    </View>
  );
}
