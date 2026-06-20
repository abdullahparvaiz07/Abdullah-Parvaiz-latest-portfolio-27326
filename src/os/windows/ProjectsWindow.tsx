/**
 * Abdullah OS — Projects Window (File Explorer Style)
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ExternalLink, Folder, FileCode, HardDrive } from 'lucide-react';
import { ProjectFile } from '../types';
import { useOS } from '../OSContext';

const PROJECT_FILES: ProjectFile[] = [
  {
    id: 'portfolyn',
    name: 'CV_Builder',
    ext: '.exe',
    size: '4.2 MB',
    modified: 'Apr 2026',
    description: 'A professional CV & portfolio builder featuring advanced templates, dynamic data integration, and seamless export for creative professionals.',
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://portfolyn-one.vercel.app/',
    image: '/portfolyn_preview.png',
    challenges: 'Building a drag-and-drop template system with real-time preview and PDF export.',
    results: 'Used by 100+ professionals to create stunning portfolios.',
  },
  {
    id: 'subledge',
    name: 'Subscription_Manager',
    ext: '.exe',
    size: '3.8 MB',
    modified: 'Mar 2026',
    description: 'An intuitive subscription manager that helps you track expenses, optimize billing cycles, and prevent unwanted renewals.',
    techStack: ['React', 'JavaScript', 'CSS3', 'Local Storage'],
    link: 'https://abdullahparvaiz07.github.io/Subledge/',
    image: '/subledge_preview.png',
    challenges: 'Designing an intuitive UX for complex billing data visualization.',
    results: 'Clean, responsive app with zero-dependency billing tracker.',
  },
  {
    id: 'fitnexa',
    name: 'AI_Fitness',
    ext: '.exe',
    size: '5.1 MB',
    modified: 'May 2026',
    description: 'An AI-powered fitness application designed to analyze workout routines, recommend tailored exercises, and help users train smarter.',
    techStack: ['React', 'Gemini AI', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://fit-nexa-ai.vercel.app/',
    image: '/fitnexa_preview.png',
    challenges: 'Integrating Gemini AI for personalized workout recommendations in real-time.',
    results: 'AI-driven fitness planning with stunning UI and instant results.',
  },
  {
    id: 'portfolio',
    name: 'Portfolio_Website',
    ext: '.exe',
    size: '6.7 MB',
    modified: 'Jun 2026',
    description: 'This very portfolio — a premium developer showcase with 3D hero, cinematic animations, and now a full Operating System mode.',
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
    link: '#',
    challenges: 'Building a dual-mode portfolio with a full OS experience, draggable windows, and achievement system.',
    results: 'A portfolio so unique visitors share it with others.',
  },
];

export default function ProjectsWindow() {
  const [selectedProject, setSelectedProject] = useState<ProjectFile | null>(null);
  const { viewProject } = useOS();

  const handleOpenProject = (project: ProjectFile) => {
    setSelectedProject(project);
    viewProject(project.id);
  };

  return (
    <div className="os-projects">
      <AnimatePresence mode="wait">
        {!selectedProject ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="os-projects-list"
          >
            {/* Address Bar */}
            <div className="os-projects-addressbar">
              <HardDrive size={14} />
              <span className="os-projects-path">C:\Users\Abdullah\Projects</span>
            </div>

            {/* File List Header */}
            <div className="os-projects-header">
              <span className="os-projects-col os-projects-col--name">Name</span>
              <span className="os-projects-col os-projects-col--size">Size</span>
              <span className="os-projects-col os-projects-col--date">Modified</span>
            </div>

            {/* Files */}
            {PROJECT_FILES.map((file, i) => (
              <motion.div
                key={file.id}
                className="os-projects-file"
                onDoubleClick={() => handleOpenProject(file)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ backgroundColor: 'rgba(249, 115, 22, 0.08)' }}
              >
                <div className="os-projects-col os-projects-col--name">
                  <FileCode size={16} className="text-orange-500" />
                  <span>{file.name}{file.ext}</span>
                </div>
                <span className="os-projects-col os-projects-col--size">{file.size}</span>
                <span className="os-projects-col os-projects-col--date">{file.modified}</span>
              </motion.div>
            ))}

            <div className="os-projects-footer">
              {PROJECT_FILES.length} items — Double-click to open
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="os-project-detail"
          >
            {/* Back Button */}
            <button className="os-project-back" onClick={() => setSelectedProject(null)}>
              <ArrowLeft size={16} />
              <span>Back to Projects</span>
            </button>

            {/* Project Preview */}
            {selectedProject.image && (
              <div className="os-project-preview">
                <img src={selectedProject.image} alt={selectedProject.name} />
              </div>
            )}

            <h2 className="os-project-title">{selectedProject.name.replace(/_/g, ' ')}</h2>
            <p className="os-project-desc">{selectedProject.description}</p>

            {/* Tech Stack */}
            <div className="os-project-tech">
              <span className="os-project-tech-label">Tech Stack:</span>
              <div className="os-project-tech-tags">
                {selectedProject.techStack.map(tech => (
                  <span key={tech} className="os-project-tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            {/* Challenges & Results */}
            {selectedProject.challenges && (
              <div className="os-project-section">
                <h4>💡 Challenges</h4>
                <p>{selectedProject.challenges}</p>
              </div>
            )}
            {selectedProject.results && (
              <div className="os-project-section">
                <h4>📈 Results</h4>
                <p>{selectedProject.results}</p>
              </div>
            )}

            {/* Launch Button */}
            {selectedProject.link && selectedProject.link !== '#' && (
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="os-project-launch"
              >
                <ExternalLink size={16} />
                <span>Launch Project</span>
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
