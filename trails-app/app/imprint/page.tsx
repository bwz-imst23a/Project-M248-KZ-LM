'use client';

import { useRouter } from "next/navigation";
import './imprint.css';
import { useState, useEffect } from "react";
import { MdAccountCircle } from "react-icons/md";
import { CiLogin, CiLogout } from "react-icons/ci";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logoutUser } from "../lib/firebaseConfig";
import Link from "next/link";

export default function ImprintPage() {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState<null | any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="background-container"></div>

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
        <div className="imprintcontent">
          <button className="cta" onClick={() => router.back()}>
            <span>Go Back</span>
            <svg width="15px" height="10px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
          <h1>Imprint</h1>
          <p>Project Name: Rappi Tours</p>
          <p>Responsible for Content: K. Zenker & L. Marty</p>
          <p>Disclaimer: This project was developed for educational purposes as part of Module 248...</p>
          <p>Copyright: All content and code of this project are protected by copyright...</p>
        </div>
      </div>
    </>
  );

}
