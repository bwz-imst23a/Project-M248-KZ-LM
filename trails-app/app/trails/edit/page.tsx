'use client';

import AuthGuard from '../../components/AuthGuard';
import { useRouter } from 'next/navigation';
import { IoSearch } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { CiLogin, CiLogout } from "react-icons/ci";
import { useState, useEffect } from "react";
import { auth, logoutUser } from "../../lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import './edit.css';

export default function EditTrailPage() {
  const router = useRouter();
  const [user, setUser] = useState<null | any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

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
          <h1 className="title">Edit Trail</h1>

          <form onSubmit={e => e.preventDefault()}>
            <label className="label">
              Trail Name*
              <input type="text" className="input" placeholder="Marin" required />
            </label>

            <label className="label">
              Date*
              <div className="input-icon">
                <input type="date" className="input" required />
              </div>
            </label>

            <label className="label">
              Time
              <div className="input-icon">
                <input type="time" className="input" />
              </div>
            </label>

            <div className="section-title">Route</div>

            <label className="label">
              Startpoint*
              <input type="text" className="input" placeholder="Marin Headlands (West)" required />
            </label>

            <label className="label">
              Endpoint*
              <input type="text" className="input" placeholder="Marin Headlands (East)" required />
            </label>

            <div className="formbutton">
              <button type="button" className="buttons" onClick={() => router.back()}>
                <MdOutlineCancel></MdOutlineCancel> Cancel
              </button>
              <button type="submit" className="buttons" onClick={() => router.push("../")}>
                <FaSave></FaSave> Update Trail
              </button>
            </div>
          </form>
        </main>
      </div>
    </AuthGuard>
  );
}
