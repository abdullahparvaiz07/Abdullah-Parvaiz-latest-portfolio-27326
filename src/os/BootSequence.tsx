/**
 * Abdullah OS — Boot Sequence Animation
 * Terminal-style boot text + progress bar + logo
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const BOOT_LINES = [
  { text: "[OK] Welcome to Abdullah's OS...", delay: 200 },
  { text: '[OK] Loading Abdullah OS v2.0...', delay: 400 },
  { text: '[OK] Mounting file system...', delay: 300 },
  { text: '[OK] Loading projects database...', delay: 350 },
  { text: '[OK] Configuring network interfaces...', delay: 250 },
  { text: '[OK] Starting window manager...', delay: 400 },
  { text: '[OK] Loading user preferences...', delay: 200 },
  { text: '[OK] Desktop environment ready.', delay: 500 },
];

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let totalDelay = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      totalDelay += line.delay;
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
          setProgress(((i + 1) / BOOT_LINES.length) * 100);
        }, totalDelay)
      );
    });

    // After all lines, fade out and complete
    timers.push(
      setTimeout(() => {
        setFadeOut(true);
      }, totalDelay + 600)
    );

    timers.push(
      setTimeout(() => {
        onComplete();
      }, totalDelay + 1400)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!fadeOut ? (
        <motion.div
          className="os-boot-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <motion.div
            className="os-boot-logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/logo.png" alt="Abdullah OS" className="os-boot-logo-img" />
            <div className="os-boot-logo-label">Abdullah OS</div>
          </motion.div>

          {/* Boot Text */}
          <div className="os-boot-terminal">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                className="os-boot-line"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
              >
                <span className="os-boot-ok">[OK]</span>
                <span>{line.text.replace('[OK] ', '')}</span>
              </motion.div>
            ))}
            {visibleLines < BOOT_LINES.length && (
              <span className="os-boot-cursor">█</span>
            )}
          </div>

          {/* Progress Bar */}
          <div className="os-boot-progress-track">
            <motion.div
              className="os-boot-progress-fill"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
          <div className="os-boot-progress-label">{Math.round(progress)}%</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
