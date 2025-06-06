'use client';

import AuthGuard from "../../../components/AuthGuard";
import { useRouter, useParams } from "next/navigation";
import { MdAccountCircle } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { CiLogin, CiLogout } from "react-icons/ci";
import { useState, useEffect } from "react";
import { auth, logoutUser } from "../../../lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { fetchTrails, editTrail } from "../../../components/FirestoreTrails";

import "./edit.css";
import Link from "next/link";


export default function EditTrailPage() {
  const router = useRouter();
  const id = String(useParams().id || "");
  const [user, setUser] = useState<null | any>(null);
  const [trail, setTrail] = useState<{ name: string; date: string; start: string; end: string } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user && id) {
        const trails = await fetchTrails(user.uid);
        const currentTrail = trails.find(t => t.id === id);
        if (currentTrail) setTrail(currentTrail);
      }
    });
    return () => unsubscribe();
  }, [id]);

  const handleUpdate = async () => {
    if (!user || !trail || !id) return;

    await editTrail(user.uid, id, trail.name, trail.date);
    alert("Trail successfully updated!");
    router.push("../../");
  };

  return (
    <AuthGuard>
      <>
        <header className="header">
          <div className="header-left">
            <Link href="/">
              <img src="/Logo.png" alt="Trails Logo" className="logo" />
            </Link>
            <Link href="/" className="company-name">
              RappiTours
            </Link>
          </div>

          <div className="icons-container">
            {!user ? (
              <CiLogin className="icon" onClick={() => router.push('/login')} />
            ) : (
              <>
                <MdAccountCircle className="icon" onClick={() => router.push('/profile')} />
                <CiLogout className="icon" onClick={async () => { await logoutUser(); setUser(null); }} />
              </>
            )}
          </div>
        </header>

        <div className="desktop-wrapper">
          <main className="form-container">
            <h1 className="title">Edit Trail</h1>
            {trail ? (
              <form onSubmit={(e) => e.preventDefault()}>
                <label className="label">
                  Trail Name*
                  <input type="text" className="input" value={trail.name} onChange={(e) => setTrail({ ...trail, name: e.target.value })} required />
                </label>

                <label className="label">
                  Date*
                  <input type="date" className="input" value={trail.date} onChange={(e) => setTrail({ ...trail, date: e.target.value })} required />
                </label>

                <div className="formbutton">
                  <button type="button" className="buttons" onClick={() => router.back()}>
                    <MdOutlineCancel /> Cancel
                  </button>
                  <button type="submit" className="buttons" onClick={handleUpdate}>
                    <FaSave /> Update Trail
                  </button>
                </div>
              </form>
            ) : (
              <p>Load trail data...</p>
            )}
          </main>

          <footer className="profile-footer">
            <span>© 2025 Rappi Tours Inc.</span>
            <Link href="/imprint" className="imprint-link">Imprint</Link>
          </footer>
        </div>
      </>
    </AuthGuard>
  );

}
