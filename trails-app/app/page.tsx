'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MdAccountCircle } from "react-icons/md";
import { CiLogin, CiLogout } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { auth } from "../app/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { logoutUser } from "../app/lib/firebaseConfig";
import { IoMdAddCircleOutline } from "react-icons/io";
import { fetchTrails, sortTrails, deleteTrail } from "../app/components/FirestoreTrails";

export default function HomePage() {
  const router = useRouter();
  const [expandedTrail, setExpandedTrail] = useState<string | null>(null);
  const [user, setUser] = useState<null | any>(null);
  const [trails, setTrails] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userTrails = await fetchTrails(user.uid);
        setTrails(sortTrails(userTrails));
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleTrail = (trailId: string) => {
    setExpandedTrail(prev => (prev === trailId ? null : trailId));
  };

  const getTrailClass = (date: string) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const trailDate = new Date(date).setHours(0, 0, 0, 0);

    if (trailDate === today) return "today-trail";
    if (trailDate > today) return "future-trail";
    return "past-trail";
  };

  const handleDelete = async (trailId: string) => {
    if (!user) return;
    
    const confirmed = window.confirm("Möchtest du diesen Trail wirklich löschen?");
    if (!confirmed) return;

    await deleteTrail(user.uid, trailId);
    alert("Trail erfolgreich gelöscht!");

    const userTrails = await fetchTrails(user.uid);
    setTrails(sortTrails(userTrails));
  };

  return (
    <>
      <div className="background-container"></div>

      <header className="header">
        <div className="header-left">
          <img src="/Mobile_Logo.png" alt="Trails Logo" className="logo" />
        </div>

        <div className="icons-container">
          <MdAccountCircle className="icon" onClick={() => router.push('/profile')} />
          {!user ? (
            <CiLogin className="icon" onClick={() => router.push('/login')} />
          ) : (
            <CiLogout className="icon" onClick={async () => { await logoutUser(); setUser(null); }} />
          )}
        </div>
      </header>

      <section className="hero">
        <div className="hero-header">
          <h1 className="hero-title">RappiTours</h1>
          {user && (
            <IoMdAddCircleOutline className="add-icon" onClick={() => router.push('/trails/create')} />
          )}
        </div>

        {!user ? (
          <p className="login-prompt">Please log in to manage your trails.</p>
        ) : (
          <div className="trails-container">
            {trails.map((trail) => (
              <div key={trail.id}>
                <div className={`trail ${getTrailClass(trail.date)}`}>
                  <span className="trail-text">{trail.name}</span>
                  <div className="trail-actions">
                    <FiEdit2 className="edit-icon" onClick={() => router.push(`/trails/edit/${trail.id}`)} />
                    <RiDeleteBin5Fill className="delete-icon" onClick={() => handleDelete(trail.id)} />
                    <IoIosArrowDown className={`arrow-icon ${expandedTrail === trail.id ? 'rotated' : ''}`} onClick={() => toggleTrail(trail.id)} />
                  </div>
                </div>
                <div className={`trail-details ${expandedTrail === trail.id ? 'expanded' : ''}`}>
                  <p>{trail.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <p>ⓒ 2025 Rappi Tours Inc.</p> 
        <Link href="/imprint">Imprint</Link>
      </footer>
    </>
  );
}
