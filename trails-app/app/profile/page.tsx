"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AuthGuard from "../components/AuthGuard";

function profile() {
  const [showPassword, setShowPassword] = useState(false);
  const { back } = useRouter();

  return (
    <AuthGuard>
    <>
    <div>
      <button type="button" onClick={() => { back(); }}>Go Back</button>
      <h2>Profil</h2>
      <div>
        <label>E-Mail</label>
        <div>EmailPlaceholder</div>
      </div>
      <div>
        <label>Passwort</label>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            value="passwordPlaceholder"
            readOnly
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span role="img" aria-label="Auge">{showPassword ? "PWNotVisiblePlaceholder" : "PWVisiblePlaceholder"}</span>
          </button>
        </div>
      </div>
    </div>
    </>
    </AuthGuard>
  );
}

export default profile;

