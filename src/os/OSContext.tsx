/**
 * Abdullah OS — State Management Context
 */

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { WindowState, Achievement, DEFAULT_ACHIEVEMENTS, ACHIEVEMENT_IDS } from './types';

/* ─── State Shape ─── */
interface OSState {
  windows: Record<string, WindowState>;
  achievements: Achievement[];
  nextZIndex: number;
  viewedProjects: Set<string>;
  achievementQueue: Achievement[];
}

/* ─── Actions ─── */
type OSAction =
  | { type: 'OPEN_WINDOW'; windowId: string; title: string; icon: string }
  | { type: 'CLOSE_WINDOW'; windowId: string }
  | { type: 'MINIMIZE_WINDOW'; windowId: string }
  | { type: 'MAXIMIZE_WINDOW'; windowId: string }
  | { type: 'FOCUS_WINDOW'; windowId: string }
  | { type: 'MOVE_WINDOW'; windowId: string; position: { x: number; y: number } }
  | { type: 'RESIZE_WINDOW'; windowId: string; size: { width: number; height: number } }
  | { type: 'UNLOCK_ACHIEVEMENT'; achievementId: string }
  | { type: 'DISMISS_ACHIEVEMENT' }
  | { type: 'VIEW_PROJECT'; projectId: string }
  | { type: 'LOAD_ACHIEVEMENTS'; achievements: Achievement[] };

/* ─── Default Window Configs ─── */
function getDefaultWindowState(windowId: string, title: string, icon: string, zIndex: number): WindowState {
  // Stagger window positions slightly for visual interest
  const baseX = 80 + Math.random() * 100;
  const baseY = 40 + Math.random() * 60;
  return {
    id: windowId,
    title,
    icon,
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    position: { x: baseX, y: baseY },
    size: { width: 750, height: 500 },
    zIndex,
  };
}

/* ─── Reducer ─── */
function osReducer(state: OSState, action: OSAction): OSState {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const existing = state.windows[action.windowId];
      if (existing?.isOpen && !existing.isMinimized) {
        // Already open — just bring to front
        return {
          ...state,
          windows: {
            ...state.windows,
            [action.windowId]: { ...existing, zIndex: state.nextZIndex, isMinimized: false },
          },
          nextZIndex: state.nextZIndex + 1,
        };
      }
      if (existing?.isOpen && existing.isMinimized) {
        return {
          ...state,
          windows: {
            ...state.windows,
            [action.windowId]: { ...existing, isMinimized: false, zIndex: state.nextZIndex },
          },
          nextZIndex: state.nextZIndex + 1,
        };
      }
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.windowId]: getDefaultWindowState(action.windowId, action.title, action.icon, state.nextZIndex),
        },
        nextZIndex: state.nextZIndex + 1,
      };
    }
    case 'CLOSE_WINDOW': {
      const w = state.windows[action.windowId];
      if (!w) return state;
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.windowId]: { ...w, isOpen: false },
        },
      };
    }
    case 'MINIMIZE_WINDOW': {
      const w = state.windows[action.windowId];
      if (!w) return state;
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.windowId]: { ...w, isMinimized: true },
        },
      };
    }
    case 'MAXIMIZE_WINDOW': {
      const w = state.windows[action.windowId];
      if (!w) return state;
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.windowId]: { ...w, isMaximized: !w.isMaximized, zIndex: state.nextZIndex },
        },
        nextZIndex: state.nextZIndex + 1,
      };
    }
    case 'FOCUS_WINDOW': {
      const w = state.windows[action.windowId];
      if (!w) return state;
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.windowId]: { ...w, zIndex: state.nextZIndex },
        },
        nextZIndex: state.nextZIndex + 1,
      };
    }
    case 'MOVE_WINDOW': {
      const w = state.windows[action.windowId];
      if (!w) return state;
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.windowId]: { ...w, position: action.position },
        },
      };
    }
    case 'RESIZE_WINDOW': {
      const w = state.windows[action.windowId];
      if (!w) return state;
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.windowId]: { ...w, size: action.size },
        },
      };
    }
    case 'UNLOCK_ACHIEVEMENT': {
      const ach = state.achievements.find(a => a.id === action.achievementId);
      if (!ach || ach.unlocked) return state;
      const updated = state.achievements.map(a =>
        a.id === action.achievementId ? { ...a, unlocked: true, unlockedAt: Date.now() } : a
      );
      const unlockedAch = updated.find(a => a.id === action.achievementId)!;
      return {
        ...state,
        achievements: updated,
        achievementQueue: [...state.achievementQueue, unlockedAch],
      };
    }
    case 'DISMISS_ACHIEVEMENT': {
      return {
        ...state,
        achievementQueue: state.achievementQueue.slice(1),
      };
    }
    case 'VIEW_PROJECT': {
      const newViewed = new Set(state.viewedProjects);
      newViewed.add(action.projectId);
      return {
        ...state,
        viewedProjects: newViewed,
      };
    }
    case 'LOAD_ACHIEVEMENTS': {
      return {
        ...state,
        achievements: action.achievements,
      };
    }
    default:
      return state;
  }
}

/* ─── Context ─── */
interface OSContextType {
  state: OSState;
  openWindow: (windowId: string, title: string, icon: string) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  moveWindow: (windowId: string, position: { x: number; y: number }) => void;
  resizeWindow: (windowId: string, size: { width: number; height: number }) => void;
  unlockAchievement: (achievementId: string) => void;
  dismissAchievement: () => void;
  viewProject: (projectId: string) => void;
}

const OSContext = createContext<OSContextType | null>(null);

export function useOS(): OSContextType {
  const ctx = useContext(OSContext);
  if (!ctx) throw new Error('useOS must be used within OSProvider');
  return ctx;
}

const ACHIEVEMENTS_STORAGE_KEY = 'abdullah-os-achievements';

/* ─── Provider ─── */
export function OSProvider({ children }: { children: React.ReactNode }) {
  const initialState: OSState = {
    windows: {},
    achievements: DEFAULT_ACHIEVEMENTS,
    nextZIndex: 100,
    viewedProjects: new Set(),
    achievementQueue: [],
  };

  const [state, dispatch] = useReducer(osReducer, initialState);

  // Load achievements from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Merge with defaults to pick up any new achievements
          const merged = DEFAULT_ACHIEVEMENTS.map(def => {
            const saved = parsed.find((s: Achievement) => s.id === def.id);
            return saved ? { ...def, unlocked: saved.unlocked, unlockedAt: saved.unlockedAt } : def;
          });
          dispatch({ type: 'LOAD_ACHIEVEMENTS', achievements: merged });
        }
      }
    } catch {}
  }, []);

  // Persist achievements to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(state.achievements));
    } catch {}
  }, [state.achievements]);

  // Auto-check "Viewed 3 Projects" achievement
  useEffect(() => {
    if (state.viewedProjects.size >= 3) {
      const ach = state.achievements.find(a => a.id === ACHIEVEMENT_IDS.VIEWED_3_PROJECTS);
      if (ach && !ach.unlocked) {
        dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: ACHIEVEMENT_IDS.VIEWED_3_PROJECTS });
      }
    }
  }, [state.viewedProjects.size, state.achievements]);

  const openWindow = useCallback((windowId: string, title: string, icon: string) => {
    dispatch({ type: 'OPEN_WINDOW', windowId, title, icon });
    // Unlock "First Folder" achievement
    const ach = state.achievements.find(a => a.id === ACHIEVEMENT_IDS.FIRST_FOLDER);
    if (ach && !ach.unlocked) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: ACHIEVEMENT_IDS.FIRST_FOLDER });
    }
  }, [state.achievements]);

  const closeWindow = useCallback((windowId: string) => dispatch({ type: 'CLOSE_WINDOW', windowId }), []);
  const minimizeWindow = useCallback((windowId: string) => dispatch({ type: 'MINIMIZE_WINDOW', windowId }), []);
  const maximizeWindow = useCallback((windowId: string) => dispatch({ type: 'MAXIMIZE_WINDOW', windowId }), []);
  const focusWindow = useCallback((windowId: string) => dispatch({ type: 'FOCUS_WINDOW', windowId }), []);
  const moveWindow = useCallback((windowId: string, position: { x: number; y: number }) => dispatch({ type: 'MOVE_WINDOW', windowId, position }), []);
  const resizeWindow = useCallback((windowId: string, size: { width: number; height: number }) => dispatch({ type: 'RESIZE_WINDOW', windowId, size }), []);
  const unlockAchievement = useCallback((achievementId: string) => dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId }), []);
  const dismissAchievement = useCallback(() => dispatch({ type: 'DISMISS_ACHIEVEMENT' }), []);
  const viewProject = useCallback((projectId: string) => dispatch({ type: 'VIEW_PROJECT', projectId }), []);

  return (
    <OSContext.Provider value={{
      state,
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      moveWindow,
      resizeWindow,
      unlockAchievement,
      dismissAchievement,
      viewProject,
    }}>
      {children}
    </OSContext.Provider>
  );
}
