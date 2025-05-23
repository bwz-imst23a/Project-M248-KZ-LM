'use client';
import { useRouter } from "next/navigation";
import './imprint.css';
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { CiLogin } from "react-icons/ci";


export default function ImprintPage() {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
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
          <CiLogin
            className="icon"
            onClick={() => router.push('/login')}
          />
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
              onBlur={() => setShowSearch(false)} />
          </div>
        </div>
      )}
      <div className="imprintcontent">
        <button className="cta" onClick={() => router.back()}>
        <span>Go Back</span>
        <svg width="15px" height="10px" viewBox="0 0 13 10">
          <path d="M1,5 L11,5"></path>
        <polyline points="8 1 12 5 8 9"></polyline>
        </svg>
        </button>
        <h1>Imprint</h1>
        <p>
          Project Name: Rappi Tours
        </p>
        <p>
          Responsible for Content:
          K. Zenker & L. Marty
        </p>
        <p>Disclaimer:
          This project was developed for educational purposes as part of Module 248. No responsibility is taken for the content of external links. The respective operators are solely responsible for the content of linked websites.
        </p>
        <p>
          Copyright:
          All content and code of this project are protected by copyright unless otherwise stated. Reuse or distribution requires the consent of the author.
        </p>
      </div>
    </>
  );
}
