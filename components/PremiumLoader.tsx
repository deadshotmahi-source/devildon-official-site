"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 19) % 84)}%`,
  top: `${10 + ((index * 29) % 78)}%`,
  delay: index * 0.08,
  size: 3 + (index % 4),
}));

export function PremiumLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="premium-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="loader-grid" aria-hidden="true" />
          <div className="loader-streak streak-one" aria-hidden="true" />
          <div className="loader-streak streak-two" aria-hidden="true" />
          <div className="loader-fog fog-one" aria-hidden="true" />
          <div className="loader-fog fog-two" aria-hidden="true" />
          {particles.map((particle) => (
            <span
              aria-hidden="true"
              className="loader-particle"
              key={particle.id}
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}

          <motion.div
            className="loader-core"
            initial={{ opacity: 0, y: 26, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="loader-logo-wrap"
              animate={{ y: [0, -8, 0], scale: [1, 1.04, 1] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="loader-logo-ring" />
              <div className="loader-logo">
                <ShieldCheck size={46} />
              </div>
            </motion.div>

            <motion.h1
              className="loader-title"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.62 }}
            >
              DEVIL DON OFFICIAL
            </motion.h1>

            <motion.p
              className="loader-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.42, 1, 0.42] }}
              transition={{ delay: 0.38, duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
            >
              INITIALIZING BATTLE SYSTEM...
            </motion.p>

            <div className="loader-progress" aria-hidden="true">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.15, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
