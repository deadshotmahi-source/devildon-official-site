```tsx
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

        <nav
          className="flex items-center gap-3 flex-wrap"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="rounded-xl border border-blue-200 bg-white px-4 py-2 font-bold shadow-sm"
          >
            Home
          </Link>

          <Link
            href="/buy"
            className="rounded-xl border border-blue-200 bg-white px-4 py-2 font-bold shadow-sm"
          >
            Buy
          </Link>

          <Link
            href="/status"
            className="rounded-xl border border-blue-200 bg-white px-4 py-2 font-bold shadow-sm"
          >
            Status
          </Link>

          <Link
            href="/admin"
            className="rounded-xl bg-blue-600 px-4 py-2 font-bold text-white"
          >
            Admin
          </Link>
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

        <span className="font-bold text-blue-600">
          🔥 Conquer the Battleground with Premium BGMI Access 🔥
        </span>
      </div>
    </footer>
  );
}
```
