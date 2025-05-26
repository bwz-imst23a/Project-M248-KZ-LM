'use client';

import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

export const fetchTrails = async (userId: string) => {
  if (!userId) return [];
  const querySnapshot = await getDocs(collection(db, `users/${userId}/trails`));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addTrail = async (userId: string, trailName: string, date: string) => {
  if (!userId) return alert("Bitte anmelden!");

  try {
    await addDoc(collection(db, `users/${userId}/trails`), {
      name: trailName,
      date: date,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Fehler beim Speichern des Trails:", error);
    alert("Fehler beim Speichern des Trails.");
  }
};

export const editTrail = async (userId: string, trailId: string, updatedName: string, updatedDate: string) => {
  if (!userId) return;

  const trailRef = doc(db, `users/${userId}/trails`, trailId);
  await updateDoc(trailRef, { name: updatedName, date: updatedDate });
};

export const deleteTrail = async (userId: string, trailId: string) => {
  if (!userId) return;

  await deleteDoc(doc(db, `users/${userId}/trails`, trailId));
};
