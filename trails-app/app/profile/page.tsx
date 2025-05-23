'use client';

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import AuthGuard from "../components/AuthGuard";
import { auth } from "../lib/firebaseConfig";

function Profile() {
  const [email, setEmail] = useState<string | null>(null);
  const { back } = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
    }
  }, []);

  return (
    <AuthGuard>
      <>
        <div>
          <button type="button" onClick={() => { back(); }}>Go Back</button>
          <h2>Profil</h2>
          <div>
            <label>E-Mail</label>
            <div>{email ? email : "Nicht angemeldet"}</div>
          </div>
        </div>
      </>
    </AuthGuard>
  );
}

export default Profile;
