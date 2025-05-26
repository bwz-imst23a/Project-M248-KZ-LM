'use client';

import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

export const fetchTrails = async (userId: string) => {
  if (!userId) return [];
  const querySnapshot = await getDocs(collection(db, `users/${userId}/trails`));
  const trails = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  return sortTrails(trails);
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

export const sortTrails = (trails: any[]) => {
  return trails.sort((a, b) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const dateA = new Date(a.date).setHours(0, 0, 0, 0);
    const dateB = new Date(b.date).setHours(0, 0, 0, 0);

    const isTodayA = dateA === today;
    const isTodayB = dateB === today;
    const isFutureA = dateA > today;
    const isFutureB = dateB > today;

    if (isTodayA && !isTodayB) return -1;
    if (isTodayB && !isTodayA) return 1;

    if (isFutureA && !isFutureB) return -1;
    if (isFutureB && !isFutureA) return 1;
    if (isFutureA && isFutureB) {
      const diff = dateA - dateB;
      return diff !== 0 ? diff : a.name.localeCompare(b.name);
    }

    if (!isTodayA && !isFutureA && !isTodayB && !isFutureB) {
      const diff = dateB - dateA;
      return diff !== 0 ? diff : a.name.localeCompare(b.name);
    }

    return a.name.localeCompare(b.name);
  });
};
