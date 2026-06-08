```tsx
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function SiteNav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="brand">
          <span className="brand-mark">
            <ShieldCheck size={21} />
          </span>
          <span>DEVIL DON OFFICIAL</span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex gap-3 flex-wrap"
        >
          <Link
            href="/"
            className="rounded-lg border px-4 py-2 font-bold"
          >
            Home
          </Link>

          <Link
            href="/buy"
            className="rounded-lg border px-4 py-2 font-bold"
          >
            Buy
          </Link>

          <Link
            href="/status"
            className="rounded-lg border px-4 py-2 font-bold"
          >
            Status
          </Link>

          <Link
            href="/admin"
            className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white"
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
      <div className="nav-inner flex justify-between items-center">
        <strong>DEVIL DON OFFICIAL</strong>

        <span className="font-bold text-blue-600">
          🔥 Premium BGMI Access 🔥
        </span>
      </div>
    </footer>
  );
}
```
