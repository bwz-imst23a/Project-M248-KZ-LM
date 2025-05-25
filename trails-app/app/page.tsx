'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IoSearch } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { CiLogin, CiCloud, CiLogout } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { auth } from "../app/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { logoutUser } from "../app/lib/firebaseConfig";

export default function HomePage() {
  const router = useRouter();
  const [expandedTrail, setExpandedTrail] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState<null | any>(null);

  const trails = ["Marin", "Zurich", "Rapperswil"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const toggleTrail = (trail: string) => {
    setExpandedTrail(prev => (prev === trail ? null : trail));
  };

  return (
    <>
      <div className="background-container"></div>

      <header className="header">
        <div className="header-left">
          <img src="/Mobile_Logo.png" alt="Trails Logo" className="logo" />
          <IoSearch
            className="icon"
            onClick={() => setShowSearch(prev => !prev)}
          />
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

      <section className="hero">
        <div className="hero-header">
          <h1 className="hero-title">RappiTours</h1>
        </div>
        {!user ? (
          <p className="login-prompt">
            Please log in to manage your trails.
          </p>
        ) : (
          <div className="trails-container">
            {trails.map((trail) => (
              <div key={trail}>
                <div className="trail">
                  <span className="trail-text">{trail}</span>
                  <div className="trail-actions">
                    <CiCloud className="trail-icon" />
                    <FiEdit2
                      className="edit-icon"
                      onClick={() =>
                        router.push(`/trails/edit/${trail.toLowerCase().replace(" ", "")}`)
                      }
                    />
                    <RiDeleteBin5Fill className="delete-icon" onClick={() => router.push('#')} />
                    <IoIosArrowDown
                      className={`arrow-icon ${expandedTrail === trail ? 'rotated' : ''}`}
                      onClick={() => toggleTrail(trail)}
                    />
                  </div>
                </div>
                <div className={`trail-details ${expandedTrail === trail ? 'expanded' : ''}`}>
                  <p>Placeholder content for {trail}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <p>ⓒ 2025 Rappi Tours Inc. </p> 
        <Link href="/imprint">Imprint</Link>
      </footer>
    </>
  )
}
