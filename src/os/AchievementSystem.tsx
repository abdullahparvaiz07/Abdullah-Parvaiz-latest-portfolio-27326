/**
 * Abdullah OS — Achievement Toast System
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOS } from './OSContext';

export default function AchievementSystem() {
  const { state, dismissAchievement } = useOS();
  const current = state.achievementQueue[0];

  useEffect(() => {
    if (!current) return;
    const timer = setTimeout(() => {
      dismissAchievement();
    }, 4000);
    return () => clearTimeout(timer);
  }, [current, dismissAchievement]);

  return (
    <div className="os-achievement-toast-container">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.id}
            className="os-achievement-toast"
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="os-achievement-toast-glow" />
            <div className="os-achievement-toast-emoji">{current.emoji}</div>
            <div className="os-achievement-toast-content">
              <div className="os-achievement-toast-label">Achievement Unlocked!</div>
              <div className="os-achievement-toast-title">{current.title}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
