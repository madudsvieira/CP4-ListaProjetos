import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";

import HomeScreen from "./HomeScreen";
import CadastrarScreen from "./CadastrarScreen";
import AlterarSenhaScreen from "./AlterarSenhaScreen";
import TaskFormScreen from "./TaskFormScreen";

import { UsuarioContexto } from "../contexts/UsuarioContexto";
import { TemaContexto } from "../contexts/TemaContexto";


const Stack: any = createNativeStackNavigator();

function Rotas() {
  const { usuario, carregando } = useContext(UsuarioContexto);
  const { temaEscuro } = useContext(TemaContexto);

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
  
      <Stack.Navigator>
        {usuario ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Início" }}
            />
            <Stack.Screen
              name="TaskForm"
              component={TaskFormScreen}
              options={{ title: "Tarefas" }}
            />
            <Stack.Screen
              name="AlterarSenha"
              component={AlterarSenhaScreen}
              options={{ title: "Alterar Senha" }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Cadastrar"
            component={CadastrarScreen}
            options={{ title: "Login / Cadastro" }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Rotas;
