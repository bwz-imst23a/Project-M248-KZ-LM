"use client";
import AuthGuard from '../../components/AuthGuard';
import { useRouter } from 'next/navigation';
import { IoSearch } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { CiLogin } from "react-icons/ci";



import './create.css';


export default function CreateTrailPage() {
  const { push, back } = useRouter();

  return (
    <AuthGuard>
      <div className="container">
        <header className="header">
          <div className="header-left">
            <img src="/Mobile_Logo.png" alt="Trails Logo" className="logo" />
            <IoSearch className="icon" />
          </div>
          <div className="icons-container">
            <MdAccountCircle
              className="icon"
              onClick={() => push('/profile')}
            />
            <CiLogin
              className="icon"
              onClick={() => push('/login')}
            />
          </div>
        </header>

        <main className="form-container">
          <h1 className="title">Create Trail</h1>

          <form onSubmit={e => e.preventDefault()}>
            <label className="label">
              Trail Name*
              <input type="text" className="input" placeholder="Please enter a trail name" required />
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
              <input type="text" className="input" placeholder="Please enter a destination" required />
            </label>

            <label className="label">
              Endpoint*
              <input type="text" className="input" placeholder="Please enter a destination" required />
            </label>

            <div className="formbutton">
              <button type="button" className="buttons" onClick={back}>
                <MdOutlineCancel></MdOutlineCancel> Cancel
              </button>
              <button type="submit" className="buttons" onClick={() => push("../")}>
                <FaSave></FaSave> Save Trail
              </button>
            </div>
          </form>
        </main>
      </div>
    </AuthGuard>
  );
}
