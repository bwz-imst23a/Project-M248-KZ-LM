"use client";
import AuthGuard from '../../components/AuthGuard';
import { useRouter } from 'next/navigation';

export default function CreateTrailPage() {
  const { push, back } = useRouter();
  return (
    <AuthGuard>
    <div>
      <header>
        <span>Logo</span>
        <span>SearchIcon</span>
        <span>LogoutIcon</span>
        <span>ProfileIcon</span>
      </header>


      <h1>Create Trail</h1>


        <label>
          Trail Name*
          <input type="text" placeholder="TrialNamePlaceholder" />
        </label>

        <label>
          Date*
          <div>
            <input type="text" placeholder="DatePlaceholder" />
            <span>CalendarIcon</span>
          </div>
        </label>

        <label>
          Time
          <div>
            <input type="text" placeholder="TimePlaceholder" />
            <span>ClockIcon</span>
          </div>
        </label>

        <div>
          <strong>Route</strong>
        </div>

        <label>
          Startpoint*
          <div>
            <input type="text" placeholder="StartPointPlaceholder" />
          </div>
        </label>

        <label>
          Endpoint*
          <div>
            <input type="text" placeholder="EndPointPlaceholder" />
          </div>
        </label>

      <form onSubmit={e => e.preventDefault()}>
        <div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              back();
            }}
          >
            <span>CancelIcon</span> Cancel
          </button>
          <button
            type="submit"
            onClick={(e) => {push("../");}}>
            <span>SaveIcon</span> Create Trail
          </button>
        </div>
        </form>
    </div>
    </AuthGuard>
  );
}