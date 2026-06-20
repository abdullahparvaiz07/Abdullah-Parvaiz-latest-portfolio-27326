/**
 * Abdullah OS — Desktop Icon Component
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DesktopIconConfig } from './types';
import { useOS } from './OSContext';

interface DesktopIconProps {
  config: DesktopIconConfig;
  index: number;
}

export default function DesktopIcon({ config, index }: DesktopIconProps) {
  const { openWindow } = useOS();
  const [isSelected, setIsSelected] = useState(false);

  const handleDoubleClick = () => {
    const titleMap: Record<string, string> = {
      'about': 'About Me',
      'projects': 'File Explorer — Projects',
      'skills': 'System Monitor — Skills',
      'experience': 'Event Log — Experience',
      'services': 'Services Manager',
      'resume': 'Resume.pdf — Document Viewer',
      'contact': 'Mail — Contact',
      'terminal': 'Terminal',
      'ai-assistant': 'AI Assistant',
      'secret-file': '⚠️ DO_NOT_OPEN.txt',
    };
    openWindow(config.windowId, titleMap[config.windowId] || config.label, config.emoji);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);
  };

  return (
    <motion.div
      className={`os-desktop-icon ${isSelected ? 'os-desktop-icon--selected' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onBlur={() => setIsSelected(false)}
      tabIndex={0}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="os-desktop-icon-emoji">{config.emoji}</div>
      <div className="os-desktop-icon-label">{config.label}</div>
    </motion.div>
  );
}
