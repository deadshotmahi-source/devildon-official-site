```tsx
import Link from "next/link";
import { ShieldCheck, Crown, Sparkles } from "lucide-react";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="nav-inner flex items-center justify-between py-4 flex-wrap gap-4">
        
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
        >
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-700 to-cyan-500 text-white shadow-lg">
            <ShieldCheck size={24} />
          </span>

          <div>
            <h1 className="text-xl font-black tracking-wide text-slate-900">
              DEVIL DON OFFICIAL
            </h1>

            <p className="flex items-center gap-1 text-xs font-semibold text-blue-600">
              <Sparkles size={12} />
              Premium BGMI Access
            </p>
          </div>
        </Link>

        <nav
          className="flex items-center gap-3 flex-wrap"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="rounded-xl border border-blue-200 bg-white px-5 py-2 font-bold text-slate-700 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/buy"
            className="rounded-xl border border-blue-200 bg-white px-5 py-2 font-bold text-slate-700 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:text-white"
          >
            Buy
          </Link>

          <Link
            href="/status"
            className="rounded-xl border border-blue-200 bg-white px-5 py-2 font-bold text-slate-700 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:text-white"
          >
            Status
          </Link>

          <Link
            href="/admin"
            className="rounded-xl bg-gradient-to-r from-blue-700 to-cyan-500 px-5 py-2 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105"
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
    <footer className="mt-20 border-t border-blue-100 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="nav-inner flex flex-col items-center justify-between gap-5 py-10 text-center md:flex-row md:text-left">

        <div>
          <h2 className="flex items-center justify-center gap-2 text-2xl font-black tracking-wide md:justify-start">
            <Crown className="text-yellow-400" size={24} />
            DEVIL DON OFFICIAL
          </h2>

          <p className="mt-2 text-sm text-slate-300">
            Elite Premium BGMI Access Platform
          </p>
        </div>

        <div className="max-w-lg">
          <p className="text-lg font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            🔥 Conquer the Battleground with Premium BGMI Access 🔥
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Secure activation • Fast approval • Instant APK delivery
          </p>
        </div>
      </div>
    </footer>
  );
}
```
