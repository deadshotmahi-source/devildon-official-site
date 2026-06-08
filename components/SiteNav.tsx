import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function SiteNav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link className="brand" href="/">
          <span className="brand-mark">
            <ShieldCheck size={21} />
          </span>
          <span>DEVIL DON OFFICIAL</span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/buy">Buy</Link>
          <Link href="/status">Status</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="nav-inner">
        <strong>DEVIL DON OFFICIAL</strong>
        <span>Manual approval, secure keys, APK access after verification.</span>
      </div>
    </footer>
  );
}
