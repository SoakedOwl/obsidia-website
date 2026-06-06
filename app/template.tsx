'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];

return (
    <>
      <motion.div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--accent)',
          transformOrigin: 'right center',
          zIndex: 99998,
          pointerEvents: 'none',
        }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut', delay: 0.15 }}
      >
        {children}
      </motion.div>
    </>
  );
}
