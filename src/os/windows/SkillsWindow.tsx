/**
 * Abdullah OS — Skills Window (System Monitor Style)
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Monitor, Wrench, PenTool } from 'lucide-react';

interface Skill {
  name: string;
  level: number; // 0-100
  icon: string;
}

const SKILL_CATEGORIES: { id: string; label: string; icon: React.ReactNode; skills: Skill[] }[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: <Monitor size={14} />,
    skills: [
      { name: 'React', level: 95, icon: '⚛️' },
      { name: 'Next.js', level: 88, icon: '▲' },
      { name: 'TypeScript', level: 90, icon: '🔷' },
      { name: 'JavaScript', level: 95, icon: '🟨' },
      { name: 'Tailwind CSS', level: 92, icon: '🎨' },
      { name: 'Framer Motion', level: 88, icon: '✨' },
      { name: 'HTML/CSS', level: 97, icon: '🌐' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: <Cpu size={14} />,
    skills: [
      { name: 'Node.js', level: 85, icon: '🟩' },
      { name: 'Express', level: 82, icon: '⚡' },
      { name: 'MongoDB', level: 78, icon: '🍃' },
      { name: 'REST APIs', level: 88, icon: '🔗' },
      { name: 'PostgreSQL', level: 72, icon: '🐘' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: <Wrench size={14} />,
    skills: [
      { name: 'Git & GitHub', level: 90, icon: '🔀' },
      { name: 'VS Code', level: 95, icon: '💻' },
      { name: 'Vite', level: 88, icon: '⚡' },
      { name: 'Vercel', level: 85, icon: '▲' },
      { name: 'WordPress', level: 80, icon: '📝' },
    ],
  },
  {
    id: 'design',
    label: 'Design',
    icon: <PenTool size={14} />,
    skills: [
      { name: 'Figma', level: 85, icon: '🎨' },
      { name: 'UI/UX Design', level: 82, icon: '✏️' },
      { name: 'Responsive Design', level: 92, icon: '📱' },
      { name: 'AI Automation', level: 78, icon: '🤖' },
    ],
  },
];

export default function SkillsWindow() {
  const [activeTab, setActiveTab] = useState('frontend');
  const activeCategory = SKILL_CATEGORIES.find(c => c.id === activeTab)!;

  return (
    <div className="os-skills">
      {/* Tabs */}
      <div className="os-skills-tabs">
        {SKILL_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`os-skills-tab ${activeTab === cat.id ? 'os-skills-tab--active' : ''}`}
            onClick={() => setActiveTab(cat.id)}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Skills List */}
      <div className="os-skills-list">
        {activeCategory.skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="os-skill-row"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="os-skill-info">
              <span className="os-skill-icon">{skill.icon}</span>
              <span className="os-skill-name">{skill.name}</span>
              <span className="os-skill-pct">{skill.level}%</span>
            </div>
            <div className="os-skill-bar-track">
              <motion.div
                className="os-skill-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* System Info */}
      <div className="os-skills-sysinfo">
        <div className="os-skills-sysinfo-row">
          <span>Total Skills Loaded</span>
          <span>{SKILL_CATEGORIES.reduce((sum, c) => sum + c.skills.length, 0)}</span>
        </div>
        <div className="os-skills-sysinfo-row">
          <span>Average Proficiency</span>
          <span>
            {Math.round(
              SKILL_CATEGORIES.flatMap(c => c.skills).reduce((sum, s) => sum + s.level, 0) /
              SKILL_CATEGORIES.flatMap(c => c.skills).length
            )}%
          </span>
        </div>
        <div className="os-skills-sysinfo-row">
          <span>System Status</span>
          <span className="text-green-400">● All Systems Operational</span>
        </div>
      </div>
    </div>
  );
}
