/**
 * Abdullah OS — Draggable & Resizable Window Component
 */

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOS } from './OSContext';

interface WindowProps {
  windowId: string;
  children: React.ReactNode;
  minWidth?: number;
  minHeight?: number;
}

export default function Window({ windowId, children, minWidth = 400, minHeight = 300 }: WindowProps) {
  const { state, closeWindow, minimizeWindow, maximizeWindow, focusWindow, moveWindow } = useOS();
  const windowState = state.windows[windowId];
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!windowState || !windowState.isOpen) return null;

  const { title, icon, isMinimized, isMaximized, position, size, zIndex } = windowState;

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('.os-win-controls')) return;
    e.preventDefault();
    focusWindow(windowId);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    };
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current || !isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    moveWindow(windowId, {
      x: dragRef.current.startPosX + dx,
      y: Math.max(0, dragRef.current.startPosY + dy),
    });
  };

  const handlePointerUp = () => {
    dragRef.current = null;
    setIsDragging(false);
  };

  const handleDoubleClickTitleBar = () => {
    maximizeWindow(windowId);
  };

  const style: React.CSSProperties = isMaximized
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 48px)', zIndex }
    : { top: position.y, left: position.x, width: size.width, height: size.height, zIndex };

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          className={`os-window ${isMaximized ? 'os-window--maximized' : ''} ${isDragging ? 'os-window--dragging' : ''}`}
          style={style}
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onPointerDown={() => focusWindow(windowId)}
        >
          {/* Title Bar */}
          <div
            className="os-win-titlebar"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onDoubleClick={handleDoubleClickTitleBar}
          >
            <div className="os-win-controls">
              <button
                className="os-win-btn os-win-btn--close"
                onClick={() => closeWindow(windowId)}
                title="Close"
              >
                <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
              <button
                className="os-win-btn os-win-btn--minimize"
                onClick={() => minimizeWindow(windowId)}
                title="Minimize"
              >
                <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 4H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
              <button
                className="os-win-btn os-win-btn--maximize"
                onClick={() => maximizeWindow(windowId)}
                title="Maximize"
              >
                <svg width="8" height="8" viewBox="0 0 8 8"><rect x="1" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.2" fill="none" rx="1"/></svg>
              </button>
            </div>
            <div className="os-win-title">
              <span className="os-win-title-icon">{icon}</span>
              <span className="os-win-title-text">{title}</span>
            </div>
            <div className="os-win-controls-spacer" />
          </div>

          {/* Content */}
          <div className="os-win-body">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
