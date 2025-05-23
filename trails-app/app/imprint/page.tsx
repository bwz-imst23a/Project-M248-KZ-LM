'use client';
import { useRouter } from "next/navigation";
import './imprint.css';



export default function ImprintPage() {
  const { back } = useRouter();
  return (
    <>
      <div>
        <button onClick={(e) => { back(); }}>Go Back</button>
        <h1>Imprint</h1>
        <div className="imprintcontent">
        <p>
          Project Name: Rappi Tours
        </p>
        <p>
          Responsible for Content:
          K. Zenker & L. Marty
        </p>
        <p>Disclaimer:
          This project was developed for educational purposes as part of Module 248. No responsibility is taken for the content of external links. The respective operators are solely responsible for the content of linked websites.
        </p>
        <p>
          Copyright:
          All content and code of this project are protected by copyright unless otherwise stated. Reuse or distribution requires the consent of the author.
        </p>
        </div>
      </div>
    </>
  );
}
