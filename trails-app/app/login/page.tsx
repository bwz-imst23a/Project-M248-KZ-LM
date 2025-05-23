'use client';
import '../globals.css';
import Link from "next/link";


export default function LoginPage() { 
  return (
    //All Icons are currently replaced by placeholders
    <div>
      <header>
        <span>Logo</span>
        <span>ProfileIcon</span>
      </header>
      <div>
        <Link href="/">Go Back</Link>
      </div>
      <form>
        <h1>Welcome back</h1>
        <p>Please enter your details to sign in</p>
        <div>
          <span>EmailIcon</span>
          <input type="email" placeholder="Email address" />
        </div>
        <div>
          <span>PasswordIcon</span>
          <input type="password" placeholder="Password" />
          <span>Show/Hide</span>
        </div>
        <button type="submit">Sign in</button>
      </form>
      <div>
        <span>Haven't got an account yet? </span>
        <Link href="/register">Register here</Link>
      </div>
      <footer>
        <span>© 2025 Rappi Tours Inc.</span>
        <Link href="/imprint">Imprint</Link>
      </footer>
    </div>
  );
}
