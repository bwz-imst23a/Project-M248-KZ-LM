'use client';

import { useState } from "react";
import Link from "next/link";
import { registerUser } from "../components/FirebaseAuth";
import { CiLogin, CiLogout } from "react-icons/ci";
import { MdAccountCircle, MdOutlineMailOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import "./register.css";
import { FaRegEye, FaRegEyeSlash, FaUnlockAlt } from "react-icons/fa";


export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await registerUser(formData.email, formData.password);
      alert("Registration successful!");
    } catch (error: any) {
      alert("Error during registration: " + error.message);
    }
  };

  return (
    <>
    <div className="background-container"></div>
          <header className="header">
            <div className="header-left">
              <img src="/Mobile_Logo.png" alt="Trails Logo" className="logo" />
            </div>
          </header>
    <div className="registercontent">
      <div>
        <button onClick={() => router.back()} className="cta"><span>Go Back</span> <svg width="15px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg></button>
      </div>
      <h1>Welcome</h1>
      <p>Please enter your details to sign up</p>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="mail">
          <MdOutlineMailOutline></MdOutlineMailOutline>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FaUnlockAlt className="ks"></FaUnlockAlt>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {showPassword ? (
            <FaRegEye
              onClick={() => setShowPassword(false)}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <FaRegEyeSlash
              onClick={() => setShowPassword(true)}
              style={{ cursor: 'pointer' }}
            />
          )}

        </div>
        <div>
          <FaUnlockAlt></FaUnlockAlt>
            <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            />
        {showConfirmPassword ? (
            <FaRegEye
              onClick={() => setShowConfirmPassword(false)}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <FaRegEyeSlash
              onClick={() => setShowConfirmPassword(true)}
              style={{ cursor: 'pointer' }}
            />
        )}

        </div>
        <button type="submit" onClick={() => router.push("/login")}>Sign up</button>
      </form>
      <div className="register-login">
        <span>Already have an account? </span>
        <Link href="/login">Log in here</Link>
      </div>
      <footer className="register-footer">
        <span>© 2025 Rappi Tours Inc.</span>
        <Link href="/imprint">Imprint</Link>
      </footer>
    </div>
    </>
  );
}
