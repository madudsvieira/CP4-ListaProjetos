import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { getAuth, signInWithCredential, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

WebBrowser.maybeCompleteAuthSession();


export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "218593320365-0kdeqm2cue1201dc7mjdrtnodoa8bhd1.apps.googleusercontent.com",
  });

  async function loginWithGoogle() {
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication?.idToken) {
        const credential = GoogleAuthProvider.credential(authentication.idToken);
        await signInWithCredential(auth, credential);
      }
    }
  }

  return { request, promptAsync, loginWithGoogle };
}


export async function criarContaComEmail(email: string, senha: string) {
  return await createUserWithEmailAndPassword(auth, email, senha);
}

export async function loginComEmail(email: string, senha: string) {
  return await signInWithEmailAndPassword(auth, email, senha);
}
