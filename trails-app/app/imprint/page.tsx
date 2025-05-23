'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function ImprintPage() {
  const { back } = useRouter();
  return (
    <>
      <button onClick={(e) => { back(); }}>Go Back</button>
      <div style={{ padding: '20px' }}>
        <h1>Impressum</h1>
        <p>
          Verantwortlich für den Inhalt:
          <br /> XYZ Company, Musterstraße 123, 8000 Zürich
        </p>
        <p>
          Kontakt: <a href="mailto:info@xyz-company.com">info@xyz-company.com</a>
        </p>
        <p>
          Weitere rechtliche Hinweise finden Sie auf unserer Datenschutzseite.
        </p>
      </div>
    </>
  );
}
