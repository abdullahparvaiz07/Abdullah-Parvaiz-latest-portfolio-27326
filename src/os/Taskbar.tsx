/**
 * Abdullah OS — Taskbar Component
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wifi, BatteryFull, Trophy, LogOut } from 'lucide-react';
import { useOS } from './OSContext';

interface TaskbarProps {
  onExitOS: () => void;
}

export default function Taskbar({ onExitOS }: TaskbarProps) {
  const { state, focusWindow, minimizeWindow } = useOS();
  const [time, setTime] = useState(new Date());
  const [showAchievements, setShowAchievements] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindows = Object.values(state.windows).filter(w => w.isOpen);
  const unlockedCount = state.achievements.filter(a => a.unlocked).length;

  const handleTabClick = (windowId: string) => {
    const w = state.windows[windowId];
    if (!w) return;
    if (w.isMinimized) {
      focusWindow(windowId);
      // Unminimize by focusing (the context handles restoring)
      const { openWindow } = useOS();
    } else {
      minimizeWindow(windowId);
    }
  };

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <>
      <div className="os-taskbar">
        {/* Left: Logo */}
        <div className="os-taskbar-left">
          <div className="os-taskbar-logo">
            <img src="/logo.png" alt="Abdullah OS" className="os-taskbar-logo-img" />
          </div>
        </div>

        {/* Center: Open Window Tabs */}
        <div className="os-taskbar-center">
          <AnimatePresence>
            {openWindows.map(w => (
              <motion.button
                key={w.id}
                className={`os-taskbar-tab ${!w.isMinimized ? 'os-taskbar-tab--active' : ''}`}
                onClick={() => {
                  if (w.isMinimized) {
                    focusWindow(w.id);
                  } else {
                    minimizeWindow(w.id);
                  }
                }}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                title={w.title}
              >
                <span className="os-taskbar-tab-icon">{w.icon}</span>
                <span className="os-taskbar-tab-title">{w.title}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Right: System Tray */}
        <div className="os-taskbar-right">
          {/* Achievements */}
          <button
            className="os-tray-btn"
            onClick={() => setShowAchievements(!showAchievements)}
            title="Achievements"
          >
            <Trophy size={14} />
            <span className="os-tray-badge">{unlockedCount}/{state.achievements.length}</span>
          </button>

          <div className="os-tray-separator" />

          <div className="os-tray-icons">
            <Wifi size={14} />
            <BatteryFull size={14} />
          </div>

          <div className="os-tray-separator" />

          {/* Clock */}
          <div className="os-tray-clock">
            <span className="os-tray-time">{formattedTime}</span>
            <span className="os-tray-date">{formattedDate}</span>
          </div>

          <div className="os-tray-separator" />

          {/* Exit OS */}
          <button className="os-exit-btn" onClick={onExitOS} title="Exit Abdullah OS">
            <LogOut size={14} />
          </button>
        </div>
      </div>

      {/* Achievements Popup */}
      <AnimatePresence>
        {showAchievements && (
          <motion.div
            className="os-achievements-popup"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="os-achievements-header">
              <Trophy size={16} className="text-orange-500" />
              <span>Achievements</span>
              <span className="os-achievements-count">{unlockedCount}/{state.achievements.length}</span>
            </div>
            <div className="os-achievements-list">
              {state.achievements.map(ach => (
                <div
                  key={ach.id}
                  className={`os-achievement-item ${ach.unlocked ? 'os-achievement-item--unlocked' : ''}`}
                >
                  <span className="os-achievement-emoji">{ach.emoji}</span>
                  <div className="os-achievement-info">
                    <div className="os-achievement-title">{ach.title}</div>
                    <div className="os-achievement-desc">{ach.description}</div>
                  </div>
                  {ach.unlocked && <span className="os-achievement-check">✓</span>}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
