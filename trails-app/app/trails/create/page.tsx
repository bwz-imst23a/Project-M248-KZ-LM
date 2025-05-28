'use client';

import AuthGuard from "../../components/AuthGuard";
import { useRouter } from "next/navigation";
import { MdAccountCircle } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { CiLogin, CiLogout } from "react-icons/ci";
import { useState, useEffect } from "react";
import { auth, logoutUser } from "../../lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { addTrail } from "../../components/FirestoreTrails";

import "./create.css";
import Link from "next/link";

// Bitte Verklinkungen der Seite überprüfen und ggf. anpassen (oder hinzufügen, falls noch nicht vorhanden)

export default function CreateTrailPage() {
  const router = useRouter();
  const [user, setUser] = useState<null | any>(null);
  const [trailName, setTrailName] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!user) {
      alert("Please log in to save a trail.");
      return;
    }
    
    try {
      await addTrail(user.uid, trailName, date);
      alert("Trail successfully saved!");
      router.push("../");
    } catch (error) {
      console.error("Error saving the trail: ", error);
      alert("Error saving the trail.");
    }
  };

  return (
    <AuthGuard>
      <div className="container">
        <header className="header">
          <div className="header-left">
            <img src="/Mobile_Logo.png" alt="Trails Logo" className="logo" />
          </div>
          <div className="icons-container">
            <MdAccountCircle
              className="icon"
              onClick={() => router.push('/profile')}
            />

            {!user ? (
              <CiLogin
                className="icon"
                onClick={() => router.push('/login')}
              />
            ) : (
              <CiLogout
                className="icon"
                onClick={async () => {
                  await logoutUser();
                  setUser(null);
                }}
              />
            )}
          </div>
        </header>

        <main className="form-container">
          <h1 className="title">Create Trail</h1>

          <form onSubmit={(e) => e.preventDefault()}>
            <label className="label">
              Trail Name*
              <input
                type="text"
                className="input"
                placeholder="Please enter a trail name"
                required
                value={trailName}
                onChange={(e) => setTrailName(e.target.value)}
              />
            </label>

            <label className="label">
              Date*
              <div className="input-icon">
                <input
                  type="date"
                  className="input"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </label>

            <div className="formbutton">
              <button type="button" className="buttons" onClick={() => router.back()}>
                <MdOutlineCancel /> Cancel
              </button>
              <button type="submit" className="buttons" onClick={handleSave}> 
                <FaSave /> Save Trail
              </button>
            </div>
          </form>
        </main>

        <footer className="footer">
          <p>ⓒ 2025 Rappi Tours Inc.</p> 
          <Link href="/imprint">Imprint</Link>
        </footer>
      </div>
    </AuthGuard>
  );
}
