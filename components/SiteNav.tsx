"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { MotionExternalLink } from "@/components/MotionPrimitives";
import { socialLinks } from "@/lib/socials";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/buy", label: "Buy" },
  { href: "/status", label: "Status" },
  { href: "/admin", label: "Admin" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <motion.header
      className="nav"
      initial={{ y: -22, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="nav-inner">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link className="brand" href="/">
            <span className="brand-mark">
              <ShieldCheck size={21} />
            </span>
            <span>DEVIL DON OFFICIAL</span>
          </Link>
        </motion.div>
        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <motion.div key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Link className={active ? "active" : ""} href={item.href}>
                  {active && <motion.span className="active-glow" layoutId="nav-active" />}
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <a className="vip-key-link" href="https://ragekey.shop/" target="_blank" rel="noreferrer">
              <span>VIP KEY GENERATOR</span>
            </a>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="nav-inner">
        <div>
          <strong>DEVIL DON OFFICIAL</strong>
          <span>DEVIL DON OFFICIAL - Rule The Battleground Like A Beast</span>
        </div>
        <div className="social-links footer-socials" aria-label="Customer social links">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <MotionExternalLink key={social.label} className="social-link light" href={social.href}>
                <span className={`social-icon ${social.className}`}>
                  <Icon size={17} />
                </span>
                {social.label}
              </MotionExternalLink>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
