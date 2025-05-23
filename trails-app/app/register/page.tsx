'use client';

import { useState } from 'react';
import Link from "next/link";
import { registerUser } from "../components/firebaseAuth";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwörter stimmen nicht überein");
      return;
    }

    try {
      await registerUser(formData.email, formData.password);
      alert("Registrierung erfolgreich!");
    } catch (error: any) {
      alert("Fehler bei der Registrierung: " + error.message);
    }
  };

  return (
    //All Icons are currently replaced by placeholders
    <div>
      <header>
        <span>Logo</span>
        <span>LogoutIcon</span>
        <span>ProfileIcon</span>
      </header>
      <div>
        <Link href="/">Go Back</Link>
      </div>
      <h1>Welcome back</h1>
      <p>Please enter your details to sign in</p>
      <form onSubmit={handleSubmit}>
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
        <div>
          <span>PasswordIcon</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <span>Show/Hide</span>
        </div>
        <button type="submit">Sign up</button>
      </form>
      <div>
        <span>Already have an account? </span>
        <Link href="/login">Log in here</Link>
      </div>
      <footer>
        <span>© 2025 Rappi Tours Inc.</span>
        <Link href="/imprint">Imprint</Link>
      </footer>
    </div>
  );
}
