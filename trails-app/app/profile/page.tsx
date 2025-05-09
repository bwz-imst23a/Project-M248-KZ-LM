import AuthGuard from '../components/AuthGuard';

export default function ProtectedPage() {
  return (
    <AuthGuard>
      <h1>Nur für eingeloggte Nutzer!</h1>
    </AuthGuard>
  );
}
