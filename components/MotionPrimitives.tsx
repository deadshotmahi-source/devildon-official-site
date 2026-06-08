"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const smooth = { duration: 0.65, ease: [0.22, 1, 0.36, 1] };

export function MotionMain({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.main className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
      {children}
    </motion.main>
  );
}

export function HeroBlock({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial="hidden" animate="show" variants={stagger}>
      {children}
    </motion.div>
  );
}

export function HeroItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp} transition={smooth}>
      {children}
    </motion.div>
  );
}

export function RevealSection({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      variants={fadeUp}
      transition={smooth}
    >
      {children}
    </motion.section>
  );
}

export function StaggerGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.16 }}
      variants={stagger}
    >
      {children}
    </motion.div>
  );
}

export function MotionCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.article
      className={className}
      variants={fadeUp}
      transition={smooth}
      whileHover={{ y: -8, scale: 1.025 }}
    >
      {children}
    </motion.article>
  );
}

export function MotionLink({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <motion.create(Link)
      className={className}
      href={href}
      whileHover={{ scale: 1.045 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.create(Link)>
  );
}

export function MotionExternalLink({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <motion.a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.045 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.a>
  );
}

export function FloatingPoster({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...smooth, delay: 0.28 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
}
