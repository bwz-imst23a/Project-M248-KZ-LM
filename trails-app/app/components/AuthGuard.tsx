'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('user');
    if (!userLoggedIn) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated ? <>{children}</> : null;
}
