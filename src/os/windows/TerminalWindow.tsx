/**
 * Abdullah OS — Terminal Window
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useOS } from '../OSContext';
import { ACHIEVEMENT_IDS } from '../types';
import { TerminalLine } from '../types';

const NEOFETCH = `
  ╔═══════════════════════════════╗
  ║    ___    ____  _____         ║
  ║   /   |  / __ \\/ ___/        ║
  ║  / /| | / / / /\\__ \\         ║
  ║ / ___ |/ /_/ /___/ /         ║
  ║/_/  |_|\\____//____/          ║
  ║                               ║
  ║  Abdullah OS v2.0             ║
  ╚═══════════════════════════════╝

  OS:        Abdullah OS v2.0
  Host:      Portfolio Server
  Kernel:    React 19.0.0
  Shell:     AOS Terminal
  DE:        Abdullah Desktop
  WM:        Framer Motion
  Theme:     Dark Orange
  Icons:     Lucide React
  CPU:       TypeScript Engine
  Memory:    Powered by Vite
`;

const HELP_TEXT = `
Available commands:
  help       — Show this help message
  about      — Learn about Abdullah
  skills     — View skill set
  projects   — List all projects
  resume     — Download resume
  contact    — Show contact info
  whoami     — Display current user
  date       — Show current date & time
  neofetch   — System information
  clear      — Clear terminal
  ls         — List files
  pwd        — Print working directory
  echo       — Print text
`;

const ABOUT_TEXT = `
╔══════════════════════════════════════╗
║           ABDULLAH PARVAIZ           ║
║   Full-Stack Developer & UI/UX      ║
╚══════════════════════════════════════╝

Creative Developer specializing in high-end
digital experiences. Expert in React, Next.js,
TypeScript, and modern web technologies.

I bridge the gap between stunning visual
design and robust, scalable architecture.
`;

const SKILLS_TEXT = `
┌─────────────────────────────────────┐
│          SKILL MANIFEST             │
├──────────────────┬──────────────────┤
│ React            │ ████████████ 95% │
│ TypeScript       │ ███████████  90% │
│ Next.js          │ ██████████   88% │
│ Tailwind CSS     │ ███████████  92% │
│ JavaScript       │ ████████████ 95% │
│ Node.js          │ █████████    85% │
│ Framer Motion    │ ██████████   88% │
│ Figma            │ █████████    85% │
│ Git              │ ███████████  90% │
│ WordPress        │ ████████     80% │
└──────────────────┴──────────────────┘
`;

const PROJECTS_TEXT = `
┌────────────────────────────────────────────┐
│ #   Project                URL             │
├────────────────────────────────────────────┤
│ 1   PortFolyn             portfolyn.vercel │
│ 2   Subledge              subledge.github  │
│ 3   FitNexa AI            fitnexa.vercel   │
│ 4   Abdullah OS Portfolio (you are here!)  │
└────────────────────────────────────────────┘
`;

const CONTACT_TEXT = `
╔══════════════════════════════════════╗
║           CONTACT INFO              ║
╠══════════════════════════════════════╣
║ Email:    abdullahparvaizofficial    ║
║           @gmail.com                ║
║ GitHub:   abdullahparvaiz07         ║
║ LinkedIn: abdullah-parvaiz          ║
╚══════════════════════════════════════╝
`;

export default function TerminalWindow() {
  const { unlockAchievement } = useOS();
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', content: 'Abdullah OS Terminal v2.0' },
    { type: 'system', content: 'Type "help" for available commands.\n' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines]);

  const focusInput = () => inputRef.current?.focus();

  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const args = trimmed.split(/\s+/);
    const command = args[0];

    unlockAchievement(ACHIEVEMENT_IDS.USED_TERMINAL);

    switch (command) {
      case 'help':
        return HELP_TEXT;
      case 'about':
        return ABOUT_TEXT;
      case 'skills':
        return SKILLS_TEXT;
      case 'projects':
        return PROJECTS_TEXT;
      case 'contact':
        return CONTACT_TEXT;
      case 'neofetch':
        return NEOFETCH;
      case 'whoami':
        return 'abdullah';
      case 'date':
        return new Date().toString();
      case 'pwd':
        return '/home/abdullah';
      case 'ls':
        return 'about.txt  projects/  skills.json  resume.pdf  DO_NOT_OPEN.txt';
      case 'echo':
        return args.slice(1).join(' ') || '';
      case 'resume': {
        // Trigger download
        const resumeContent = 'Abdullah Parvaiz - Full-Stack Web Developer\nSee portfolio for full details.';
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Abdullah_Resume.txt';
        a.click();
        URL.revokeObjectURL(url);
        return '📄 Resume download started...';
      }
      case 'clear':
        return '__CLEAR__';
      case '':
        return '';
      default:
        return `command not found: ${command}\nType "help" for available commands.`;
    }
  }, [unlockAchievement]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && input === '') {
      setLines(prev => [...prev, { type: 'input', content: '' }]);
      return;
    }

    const result = processCommand(input);

    if (result === '__CLEAR__') {
      setLines([{ type: 'system', content: 'Terminal cleared.\n' }]);
    } else {
      setLines(prev => [
        ...prev,
        { type: 'input', content: input },
        ...(result ? [{ type: 'output' as const, content: result }] : []),
      ]);
    }

    setHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= history.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    }
  };

  return (
    <div className="os-terminal" onClick={focusInput}>
      <div className="os-terminal-scroll" ref={scrollRef}>
        {lines.map((line, i) => (
          <div key={i} className={`os-terminal-line os-terminal-line--${line.type}`}>
            {line.type === 'input' && (
              <span className="os-terminal-prompt">
                <span className="text-green-400">abdullah</span>
                <span className="text-white">@</span>
                <span className="text-blue-400">aos</span>
                <span className="text-white">:~$ </span>
              </span>
            )}
            <span className="os-terminal-content">{line.content}</span>
          </div>
        ))}

        {/* Active Input Line */}
        <form onSubmit={handleSubmit} className="os-terminal-input-line">
          <span className="os-terminal-prompt">
            <span className="text-green-400">abdullah</span>
            <span className="text-white">@</span>
            <span className="text-blue-400">aos</span>
            <span className="text-white">:~$ </span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="os-terminal-input"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}
