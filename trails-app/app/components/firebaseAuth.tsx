import { auth, createUser, signInUser } from "../lib/firebaseConfig";

export async function registerUser(email: string, password: string) {
  try {
    const userCredential = await createUser(auth, email, password);
    console.log("User Registered:", userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    console.error("Registrierungsfehler:", error);
    throw new Error(error.message);
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInUser(auth, email, password);
    console.log("User Logged In:", userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    console.error("Login-Fehler:", error);
    throw new Error(error.message);
  }
}
