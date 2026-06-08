import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { socialLinks } from "@/lib/socials";

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
        <div>
          <strong>DEVIL DON OFFICIAL</strong>
          <span>🎮 DEVIL DON OFFICIAL — Rule The Battleground Like A Beast</span>
        </div>
        <div className="social-links footer-socials" aria-label="Customer social links">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a key={social.label} className="social-link light" href={social.href} target="_blank" rel="noreferrer">
                <span className={`social-icon ${social.className}`}>
                  <Icon size={17} />
                </span>
                {social.label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
