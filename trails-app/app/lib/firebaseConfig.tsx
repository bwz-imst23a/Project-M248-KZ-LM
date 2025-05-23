import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPKKM8zb5qoMlu7Y85oPlM4QY3ENCa-Kw",
  authDomain: "project-m248-kz-lm.firebaseapp.com",
  projectId: "project-m248-kz-lm",
  storageBucket: "project-m248-kz-lm.firebasestorage.app",
  messagingSenderId: "254142478109",
  appId: "1:254142478109:web:3cda135bba23522bb5d3f4",
  measurementId: "G-JVX2XJTD70"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const createUser = (auth: Auth, email: string, password: string): Promise<any> => {
  return createUserWithEmailAndPassword(auth, email, password);
};
export const signInUser = (auth: Auth, email: string, password: string): Promise<any> => {
  return signInWithEmailAndPassword(auth, email, password);
};
