/**
 * Abdullah OS — Experience Window (Event Log Style)
 */

import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Bookmark, Rocket, Award, GraduationCap } from 'lucide-react';

interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'milestone' | 'project' | 'education' | 'achievement';
  icon: React.ReactNode;
}

const TIMELINE: TimelineEntry[] = [
  {
    id: '1',
    date: '2023',
    title: 'Started Web Development Journey',
    description: 'Began self-teaching HTML, CSS, and JavaScript. Built first static websites and discovered a passion for creating digital experiences.',
    type: 'education',
    icon: <GraduationCap size={16} />,
  },
  {
    id: '2',
    date: '2023',
    title: 'Learned React & Modern JS',
    description: 'Dove deep into React ecosystem, state management, and component architecture. Built multiple projects to solidify understanding.',
    type: 'milestone',
    icon: <Bookmark size={16} />,
  },
  {
    id: '3',
    date: '2024',
    title: 'First Freelance Projects',
    description: 'Started taking freelance work, building responsive websites and web applications for real clients.',
    type: 'achievement',
    icon: <Award size={16} />,
  },
  {
    id: '4',
    date: '2024',
    title: 'Mastered Next.js & TypeScript',
    description: 'Expanded skill set to include server-side rendering, API routes, and type-safe development with TypeScript.',
    type: 'milestone',
    icon: <Bookmark size={16} />,
  },
  {
    id: '5',
    date: '2025',
    title: 'Built Subledge',
    description: 'Created an intuitive subscription manager with clean UI and smart billing tracking features.',
    type: 'project',
    icon: <Rocket size={16} />,
  },
  {
    id: '6',
    date: '2026',
    title: 'Launched PortFolyn',
    description: 'Built a professional CV & portfolio builder with advanced templates, used by 100+ professionals.',
    type: 'project',
    icon: <Rocket size={16} />,
  },
  {
    id: '7',
    date: '2026',
    title: 'FitNexa AI',
    description: 'Integrated Gemini AI into a fitness application for personalized workout recommendations.',
    type: 'project',
    icon: <Rocket size={16} />,
  },
  {
    id: '8',
    date: '2026',
    title: 'AI & Automation Focus',
    description: 'Began specializing in AI integration, building intelligent tools and automation workflows with modern LLMs.',
    type: 'milestone',
    icon: <Bookmark size={16} />,
  },
  {
    id: '9',
    date: '2026',
    title: 'Abdullah OS Portfolio',
    description: 'Created this dual-mode portfolio with a full interactive OS experience — the most ambitious project yet.',
    type: 'achievement',
    icon: <Award size={16} />,
  },
];

const typeColors: Record<string, string> = {
  milestone: '#f97316',
  project: '#22c55e',
  education: '#3b82f6',
  achievement: '#a855f7',
};

export default function ExperienceWindow() {
  return (
    <div className="os-experience">
      <div className="os-experience-header">
        <Calendar size={16} className="text-orange-500" />
        <span>Event Log — Learning Journey</span>
        <span className="os-experience-count">{TIMELINE.length} events</span>
      </div>

      <div className="os-experience-timeline">
        {TIMELINE.map((entry, i) => (
          <motion.div
            key={entry.id}
            className="os-experience-entry"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="os-experience-dot" style={{ backgroundColor: typeColors[entry.type] }} />
            <div className="os-experience-line" />
            <div className="os-experience-content">
              <div className="os-experience-meta">
                <span className="os-experience-date">{entry.date}</span>
                <span
                  className="os-experience-type"
                  style={{ color: typeColors[entry.type], borderColor: typeColors[entry.type] }}
                >
                  {entry.icon}
                  {entry.type}
                </span>
              </div>
              <h4 className="os-experience-title">{entry.title}</h4>
              <p className="os-experience-desc">{entry.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
