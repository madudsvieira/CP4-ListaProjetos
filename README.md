# CP4-ListaProjetos

📱 Lista de Tarefas App

👥 Integrantes 

RM556270 - Bianca Vitoria - 2TDSPZ
RM558976 Maria Eduarda Pires Vieira - 2TDSPZ

Aplicativo desenvolvido em React Native (Expo) com Firebase para autenticação e armazenamento de dados.
O objetivo é gerenciar tarefas com suporte a login via Google, tema claro/escuro, internacionalização (i18n), notificações locais e integração com API externa.

🚀 Funcionalidades

🔑 Autenticação

Login/Cadastro via Firebase Authentication.

Login com Google via OAuth 2.0.

📂 Firestore

Estrutura organizada com coleção de tarefas.

Suporte a CRUD completo (criar, listar, editar e excluir tarefas).

Atualizações em tempo real com onSnapshot.

🎨 Tema Claro/Escuro

Alternância dinâmica com persistência usando AsyncStorage.

🌎 Internacionalização (i18n)

Suporte a Português e Inglês.

Troca de idioma em tempo real.

🔔 Notificações Locais

Agendamento de notificações para tarefas.

☁️ TanStack Query

Integração com API pública de frases motivacionais (https://type.fit/api/quotes).

Exibição de dados externos dentro do app.

🛠️ Arquitetura
/app
 ├── screens/        # Telas principais (Login, Home, Cadastro, etc.)
 ├── services/       # Firebase, autenticação, API externa, notificações
 ├── contexts/       # Contexto de Tema (claro/escuro)
 ├── assets/         # Ícones, imagens e splash
 └── i18nConfig.ts   # Configuração de internacionalização

📦 Tecnologias

React Native
 (Expo)

Firebase Authentication

Firebase Firestore

TanStack Query

Expo Notifications

i18next

⚙️ Como rodar o projeto
1️⃣ Instalar dependências
npm install

2️⃣ Rodar o app
npx expo start

3️⃣ Testar no celular

Instale o app Expo Go (Android/iOS).

Escaneie o QR Code gerado pelo terminal.

📹 Entrega

Código no GitHub.

README explicando funcionalidades.

Vídeo de até 5 minutos mostrando:

Login com Google

CRUD de tarefas (Firestore)

Troca de tema claro/escuro

Troca de idioma PT/EN

Notificação de tarefa

Exibição de frase motivacional da API
