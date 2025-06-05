'use client';

import { useState } from "react";
import Link from "next/link";
import { loginUser } from "../components/FirebaseAuth";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUnlockAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import "./login.css";


export default function LoginPage() { 
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);


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
      </header>

      <div className="login-container">
        <div>
          <button onClick={() => router.back()} className="cta">
            <span>Go Back</span>
            <svg width="15px" height="10px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <p>Please enter your details to sign in</p>

          <div className="mail">
            <MdOutlineMailOutline />
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
            <FaUnlockAlt className="ks" />
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
                style={{ cursor: "pointer" }}
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setShowPassword(true)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>

          <button type="submit" onClick={() => router.push("/")}>
            Sign in
          </button>
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
    </>
  );
}
