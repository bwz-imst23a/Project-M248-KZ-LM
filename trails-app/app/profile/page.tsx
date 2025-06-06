'use client';

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import AuthGuard from "../components/AuthGuard";
import { CiLogin, CiLogout } from "react-icons/ci";
import { auth, logoutUser } from "../lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import "./profile.css";
import Link from "next/link";


export default function Profile() {  
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
              <CiLogout className="icon" onClick={async () => {
                await logoutUser();
                setUser(null);
              }} />
            )}
          </div>
        </header>

        <div className="desktop-wrapper">
          <div className="profilepagecontent">
            <div className="profile-content">
              <button onClick={() => router.back()} className="cta">
                <span>Go Back</span> 
                <svg width="15px" height="10px" viewBox="0 0 13 10">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
              <h2>Profile</h2>
              <div>
                <label>E-mail</label>
                <div>{email ? email : "Not logged in"}</div>
              </div>
            </div>
          </div>

          <footer className="profile-footer">
            <span>© 2025 Rappi Tours Inc.</span>
            <Link href="/imprint" className="imprint-link">Imprint</Link>
          </footer>
        </div>
      </>
    </AuthGuard>
  );

}
