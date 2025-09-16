import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAzvfPoTdK8TZd9JFxQQy2_JxL2Ct8gUks",
  authDomain: "listatarefasapp.firebaseapp.com",
  projectId: "listatarefasapp",
  storageBucket: "listatarefasapp.appspot.com", 
  messagingSenderId: "654866984720",
  appId: "1:654866984720:web:c290fe902e9b7fdf2abf95",
  measurementId: "G-HV8P0FYDRH"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
