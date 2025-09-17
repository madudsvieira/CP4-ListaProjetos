import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
  signOut,
  User,
} from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

const firebaseConfig = {
  apiKey: "AIzaSyAzvfPoTdK8TZd9JFxQQy2_JxL2Ct8gUks",
  authDomain: "listatarefasapp.firebaseapp.com",
  projectId: "listatarefasapp",
  storageBucket: "listatarefasapp.appspot.com",
  messagingSenderId: "654866984720",
  appId: "1:654866984720:web:c290fe902e9b7fdf2abf95",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);


export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "218593320365-0kdeqm2cue1201dc7mjdrtnodoa8bhd1.apps.googleusercontent.com",
  });

  async function login(): Promise<User | null> {
    try {
      const result = await promptAsync();

      if (result?.type === "success" && result.authentication?.idToken) {
        const credential = GoogleAuthProvider.credential(
          result.authentication.idToken
        );
        const userCredential = await signInWithCredential(auth, credential);
        return userCredential.user;
      }
      return null;
    } catch (error) {
      console.error("Erro no login com Google:", error);
      return null;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  }

  return { user: auth.currentUser, login, logout };
}
