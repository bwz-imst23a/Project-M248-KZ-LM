'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Willkommen auf der Trails-Management-App!</h1>
      <button onClick={() => router.push('/login')}>Login</button>
      <button onClick={() => router.push('/register')}>Registrieren</button>
    </div>
  );
}
