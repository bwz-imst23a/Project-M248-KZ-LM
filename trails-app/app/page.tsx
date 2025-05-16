'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoSearch } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { CiLogin, CiCloud } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";

export default function HomePage() {
  const router = useRouter();
  const [expandedTrail, setExpandedTrail] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  const trails = ["Marin", "Zurich", "Rapperswil"];

  const toggleTrail = (trail: string) => {
    setExpandedTrail(prev => (prev === trail ? null : trail));
  };

  return (
    <>
      <div className="background-container"></div>

      <header className="header">
        <img src="/Mobile_Logo.png" alt="Trails Logo" className="logo" />

        {/* Animated Search Bar */}
        <div className={`search-bar-container ${showSearch ? 'visible' : ''}`}>
          <input
            type="text"
            placeholder="Search trails..."
            className="search-bar"
            autoFocus
            onBlur={() => setShowSearch(false)}
          />
        </div>

        <div className="icons-container">
          <IoSearch
            className="icon"
            onClick={() => setShowSearch(prev => !prev)}
          />
          <MdAccountCircle
            className="icon"
            onClick={() => router.push('/profile')}
          />
          <CiLogin
            className="icon"
            onClick={() => router.push('/login')}
          />
        </div>
      </header>

      <section className="hero">
        <div className="hero-header">
          <h1 className="hero-title">Your Trails</h1>
          <IoMdAddCircleOutline
            className="add-icon"
            onClick={() => router.push('/trails/create')}
          />
        </div>
      </section>

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

        <footer className="footer">
          <p>ⓒ 2025 Rappi Tours Inc. Imprint</p>
        </footer>
      </>
    )
  }
