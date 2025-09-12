import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore,collection,addDoc,getDocs,doc,updateDoc,deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRZe8cuY_U3nXbmy2TlsgcB-EoVpOQySs",
  authDomain: "listatarefas-41055.firebaseapp.com",
  projectId: "listatarefas-41055",
  storageBucket: "listatarefas-41055.firebasestorage.app",
  messagingSenderId: "942351339389",
  appId: "1:942351339389:web:135569cacf9c04fbde4614"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = getAuth(app)
export{auth,db,collection,addDoc,getDocs,doc,updateDoc,deleteDoc}



