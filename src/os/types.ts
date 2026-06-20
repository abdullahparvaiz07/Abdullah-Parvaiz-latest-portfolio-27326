/**
 * Abdullah OS — Type Definitions
 */

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: WindowPosition;
  size: WindowSize;
  zIndex: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface DesktopIconConfig {
  id: string;
  label: string;
  emoji: string;
  windowId: string;
}

export interface TerminalLine {
  type: 'input' | 'output' | 'system';
  content: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  ext: string;
  size: string;
  modified: string;
  description: string;
  techStack: string[];
  link: string;
  image?: string;
  challenges?: string;
  results?: string;
}

export const WINDOW_IDS = {
  ABOUT: 'about',
  PROJECTS: 'projects',
  SKILLS: 'skills',
  EXPERIENCE: 'experience',
  SERVICES: 'services',
  RESUME: 'resume',
  CONTACT: 'contact',
  TERMINAL: 'terminal',
  AI_ASSISTANT: 'ai-assistant',
  SECRET_FILE: 'secret-file',
} as const;

export const ACHIEVEMENT_IDS = {
  FIRST_FOLDER: 'first-folder',
  VIEWED_3_PROJECTS: 'viewed-3-projects',
  USED_TERMINAL: 'used-terminal',
  FOUND_SECRET: 'found-secret',
  COMPLETED_CHALLENGE: 'completed-challenge',
} as const;

export const DESKTOP_ICONS: DesktopIconConfig[] = [
  { id: 'icon-about', label: 'About Me', emoji: '📁', windowId: WINDOW_IDS.ABOUT },
  { id: 'icon-projects', label: 'Projects', emoji: '📁', windowId: WINDOW_IDS.PROJECTS },
  { id: 'icon-skills', label: 'Skills', emoji: '📁', windowId: WINDOW_IDS.SKILLS },
  { id: 'icon-experience', label: 'Experience', emoji: '📁', windowId: WINDOW_IDS.EXPERIENCE },
  { id: 'icon-services', label: 'Services', emoji: '📁', windowId: WINDOW_IDS.SERVICES },
  { id: 'icon-resume', label: 'Resume.pdf', emoji: '📄', windowId: WINDOW_IDS.RESUME },
  { id: 'icon-contact', label: 'Contact', emoji: '📧', windowId: WINDOW_IDS.CONTACT },
  { id: 'icon-ai', label: 'AI Assistant', emoji: '🤖', windowId: WINDOW_IDS.AI_ASSISTANT },
  { id: 'icon-terminal', label: 'Terminal', emoji: '💻', windowId: WINDOW_IDS.TERMINAL },
  { id: 'icon-secret', label: 'DO_NOT_OPEN.txt', emoji: '🔒', windowId: WINDOW_IDS.SECRET_FILE },
];

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: ACHIEVEMENT_IDS.FIRST_FOLDER, title: 'Opened First Folder', description: 'Opened your first window in Abdullah OS', emoji: '🏆', unlocked: false },
  { id: ACHIEVEMENT_IDS.VIEWED_3_PROJECTS, title: 'Viewed 3 Projects', description: 'Explored 3 different project files', emoji: '🏆', unlocked: false },
  { id: ACHIEVEMENT_IDS.USED_TERMINAL, title: 'Used Terminal', description: 'Executed a command in the terminal', emoji: '🏆', unlocked: false },
  { id: ACHIEVEMENT_IDS.FOUND_SECRET, title: 'Found Secret File', description: 'Opened the mysterious DO_NOT_OPEN.txt', emoji: '🏆', unlocked: false },
  { id: ACHIEVEMENT_IDS.COMPLETED_CHALLENGE, title: 'Completed Hidden Challenge', description: 'Beat the Website Rescue Mission game', emoji: '🏆', unlocked: false },
];
