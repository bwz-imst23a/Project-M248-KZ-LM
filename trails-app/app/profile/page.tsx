'use client';

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import AuthGuard from "../components/AuthGuard";
import { CiLogin, CiLogout } from "react-icons/ci";
import { auth, logoutUser } from "../lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// Bitte Verklinkungen der Seite überprüfen und ggf. anpassen (oder hinzufügen, falls noch nicht vorhanden)

function Profile() {  // Wieso ist hier der 'export default' nicht auf dieser Zeile, sondern erst am Ende der Datei? Bei allen anderen Seiten ist dies anders. Wurde dies mit AI gemacht und wiederum nicht genug gut aufgepasst?
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState<null | any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setEmail(user ? user.email : null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthGuard>
      <>
        <div className="background-container"></div>
        <header className="header">
          <div className="header-left">
            <img src="/Mobile_Logo.png" alt="Trails Logo" className="logo" />
          </div>

          <div className="icons-container">
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

        {showSearch && (
          <div className="overlay" onClick={() => setShowSearch(false)}>
            <div className="centered-search" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                placeholder="Search trails..."
                className="search-bar"
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
            </div>
          </div>
        )}

        <div className="profile-content">
          <button type="button" onClick={() => router.back()} className="cta">Go Back</button>
          <h2>Profile</h2>
          <div>
            <label>E-mail</label>
            <div>{email ? email : "Not logged in"}</div>
          </div>
        </div>
      </>
    </AuthGuard>
  );
}

export default Profile;
