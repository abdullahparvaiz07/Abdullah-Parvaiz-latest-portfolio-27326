/**
 * Abdullah OS — Main Desktop Component
 */

import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { OSProvider } from './OSContext';
import BootSequence from './BootSequence';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import AchievementSystem from './AchievementSystem';
import { DESKTOP_ICONS, WINDOW_IDS } from './types';

// Window Content Components
import AboutWindow from './windows/AboutWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import SkillsWindow from './windows/SkillsWindow';
import ExperienceWindow from './windows/ExperienceWindow';
import ServicesWindow from './windows/ServicesWindow';
import ResumeWindow from './windows/ResumeWindow';
import ContactWindow from './windows/ContactWindow';
import TerminalWindow from './windows/TerminalWindow';
import AIAssistantWindow from './windows/AIAssistantWindow';
import SecretFileWindow from './windows/SecretFileWindow';

interface DesktopProps {
  onExitOS: () => void;
}

function DesktopInner({ onExitOS }: DesktopProps) {
  const [isBooting, setIsBooting] = useState(true);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
  }, []);

  return (
    <div className="os-desktop">
      {/* Wallpaper */}
      <div
        className="os-wallpaper"
        style={{ backgroundImage: 'url(/os-wallpaper-new.jpg)' }}
      />
      <div className="os-wallpaper-overlay" />

      <AnimatePresence>
        {isBooting && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      {!isBooting && (
        <>
          {/* Desktop Icon Grid */}
          <div className="os-desktop-grid">
            {DESKTOP_ICONS.map((icon, i) => (
              <DesktopIcon key={icon.id} config={icon} index={i} />
            ))}
          </div>

          {/* Windows */}
          <Window windowId={WINDOW_IDS.ABOUT}>
            <AboutWindow />
          </Window>
          <Window windowId={WINDOW_IDS.PROJECTS}>
            <ProjectsWindow />
          </Window>
          <Window windowId={WINDOW_IDS.SKILLS}>
            <SkillsWindow />
          </Window>
          <Window windowId={WINDOW_IDS.EXPERIENCE}>
            <ExperienceWindow />
          </Window>
          <Window windowId={WINDOW_IDS.SERVICES}>
            <ServicesWindow />
          </Window>
          <Window windowId={WINDOW_IDS.RESUME}>
            <ResumeWindow />
          </Window>
          <Window windowId={WINDOW_IDS.CONTACT}>
            <ContactWindow />
          </Window>
          <Window windowId={WINDOW_IDS.TERMINAL} minWidth={500} minHeight={350}>
            <TerminalWindow />
          </Window>
          <Window windowId={WINDOW_IDS.AI_ASSISTANT}>
            <AIAssistantWindow />
          </Window>
          <Window windowId={WINDOW_IDS.SECRET_FILE}>
            <SecretFileWindow />
          </Window>

          {/* Taskbar */}
          <Taskbar onExitOS={onExitOS} />

          {/* Achievement Toasts */}
          <AchievementSystem />
        </>
      )}
    </div>
  );
}

export default function Desktop({ onExitOS }: DesktopProps) {
  return (
    <OSProvider>
      <DesktopInner onExitOS={onExitOS} />
    </OSProvider>
  );
}
