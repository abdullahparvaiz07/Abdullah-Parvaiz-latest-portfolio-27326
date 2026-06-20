/**
 * Abdullah OS — Glitch Transition Overlay
 * Plays when switching between Portfolio Mode and OS Mode
 */

import React from 'react';
import { motion } from 'motion/react';

interface TransitionOverlayProps {
  onComplete: () => void;
}

export default function TransitionOverlay({ onComplete }: TransitionOverlayProps) {
  return (
    <motion.div
      className="os-transition-overlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 2000);
      }}
    >
      {/* CRT scanlines */}
      <div className="os-scanlines" />

      {/* Glitch strips */}
      <div className="os-glitch-container">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="os-glitch-strip"
            style={{
              top: `${(i / 12) * 100}%`,
              height: `${100 / 12}%`,
            }}
            initial={{ x: 0, opacity: 1 }}
            animate={{
              x: [0, (i % 2 === 0 ? 1 : -1) * (20 + Math.random() * 60), 0, (i % 2 === 0 ? -1 : 1) * (10 + Math.random() * 30), 0],
              opacity: [1, 0.7, 1, 0.5, 1],
            }}
            transition={{
              duration: 0.6,
              delay: i * 0.02,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Screen flicker */}
      <motion.div
        className="os-flicker"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.8, 0, 1, 0, 0.6, 0, 0],
        }}
        transition={{
          duration: 1.2,
          times: [0, 0.1, 0.15, 0.3, 0.35, 0.5, 0.6, 1],
        }}
      />

      {/* Final fade to black */}
      <motion.div
        className="os-fade-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      />
    </motion.div>
  );
}
