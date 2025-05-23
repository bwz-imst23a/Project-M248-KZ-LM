'use client';

import { useState } from 'react';
import Link from "next/link";
import { loginUser } from "../components/firebaseAuth";

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
      alert("Login erfolgreich!");
    } catch (error: any) {
      alert("Fehler beim Login: " + error.message);
    }
  };

  return (
    //All Icons are currently replaced by placeholders
    <div>
      <header>
        <span>Logo</span>
        <span>ProfileIcon</span>
      </header>
      <div>
        <Link href="/">Go Back</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <h1>Welcome back</h1>
        <p>Please enter your details to sign in</p>
        <div>
          <span>EmailIcon</span>
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
          <span>PasswordIcon</span>
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            required
          />
          <span>Show/Hide</span>
        </div>
        <button type="submit">Sign in</button>
      </form>
      <div>
        <span>Haven't got an account yet? </span>
        <Link href="/register">Register here</Link>
      </div>
      <footer>
        <span>© 2025 Rappi Tours Inc.</span>
        <Link href="/imprint">Imprint</Link>
      </footer>
    </div>
  );
}
