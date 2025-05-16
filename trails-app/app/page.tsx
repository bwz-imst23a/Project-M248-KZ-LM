'use client';

import { useRouter } from 'next/navigation';
import { IoSearch } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiCloud } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <div className="background-container"></div>

      <header className="header">
        <img src="/Mobile_Logo.png" alt="Trails Logo" className="logo" />
        <div className="icons">
          <IoSearch className="icon" onClick={() => router.push('#')} />
          <MdAccountCircle className="icon" onClick={() => router.push('/profile')} />
          <CiLogin className="icon" onClick={() => router.push('/login')} />
        </div>
      </header>

      <section className="hero">
        <h1 className="hero-title">Your Trails</h1>
        <IoMdAddCircleOutline className="add-icon" onClick={() => router.push('/trails/create')} />
      </section>

      <div className="trails-container">
        {["Marin", "Zurich", "Rapperswil"].map((trail) => (
          <div key={trail} className="trail">
            <span className="trail-text">{trail}</span>
            <div className="trail-actions">
              <CiCloud className="trail-icon" />
              <FiEdit2 className="edit-icon" onClick={() => router.push(`/trails/edit/${trail.toLowerCase().replace(" ", "")}`)} />
              <RiDeleteBin5Fill className="delete-icon" onClick={() => router.push(`#`)} />
              <IoIosArrowDown className="arrow-icon" />
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>ⓒ 2025 rappi Tours Inc. Imprint</p>
      </footer>
    </>
  );
}
