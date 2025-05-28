'use client';

import { useState } from "react";
import Link from "next/link";
import { loginUser } from "../components/FirebaseAuth";
import "./login.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUnlockAlt } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

// Bitte Verklinkungen der Seite überprüfen und ggf. anpassen (oder hinzufügen, falls noch nicht vorhanden)

export default function LoginPage() { 
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await loginUser(formData.email, formData.password);
      alert("Login successful!");
    } catch (error: any) {
      alert("Login error: " + error.message);
    }
  };

  return (
    
    <div className="login-container">
      <header className="login-header">
        <span>Logo</span>
        <span>ProfileIcon</span>
      </header>
      <div className="login-back">
        <button type="button">Go Back</button>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Welcome back</h1>
        <p>Please enter your details to sign in</p>
        <div>
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
            type="password" 
            name="password"
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            required
          />
         <FaRegEyeSlash></FaRegEyeSlash>
        </div>
        <button type="submit">Sign in</button>
      </form>
      <div className="login-register">
        <span>Haven't got an account yet? </span>
        <Link href="/register">Register here</Link>
      </div>
      <footer className="login-footer">
        <span>© 2025 Rappi Tours Inc.</span>
        <Link href="/imprint">Imprint</Link>
      </footer>
    </div>
  );
}
