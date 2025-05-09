'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('User Registered:', formData);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Registrieren</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Passwort" value={formData.password} onChange={handleChange} required />
        <button type="submit">Registrieren</button>
      </form>
    </div>
  );
}
