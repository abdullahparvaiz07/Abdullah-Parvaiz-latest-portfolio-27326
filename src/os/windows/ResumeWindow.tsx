/**
 * Abdullah OS — Resume Window (Document Viewer)
 */

import React from 'react';
import { Download, FileText, User, Code2, Briefcase, GraduationCap, Mail, Github, Linkedin } from 'lucide-react';

export default function ResumeWindow() {
  const handleDownload = () => {
    // Create a simple text-based resume for download
    const resumeContent = `
ABDULLAH PARVAIZ
Full-Stack Web Developer & UI/UX Engineer
===========================================

CONTACT
Email: abdullahparvaizofficial@gmail.com
GitHub: github.com/abdullahparvaiz07
LinkedIn: linkedin.com/in/abdullah-parvaiz-4a0492386

SUMMARY
Creative Developer & UI/UX Engineer specializing in high-end digital experiences.
Expert in React, Next.js, TypeScript, and modern web technologies.

SKILLS
Frontend: React, Next.js, TypeScript, JavaScript, Tailwind CSS, Framer Motion
Backend: Node.js, Express, MongoDB, REST APIs
Design: Figma, UI/UX, Responsive Design
Tools: Git, VS Code, Vite, Vercel, WordPress

PROJECTS
1. PortFolyn - Professional CV & Portfolio Builder
2. Subledge - Subscription Management App
3. FitNexa AI - AI-Powered Fitness Application
4. Abdullah OS Portfolio - Interactive Dual-Mode Portfolio

EDUCATION
Self-Taught Developer | 2023 - Present
Continuously learning through projects, certifications, and real-world experience.
    `.trim();

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Abdullah_Parvaiz_Resume.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="os-resume">
      {/* Toolbar */}
      <div className="os-resume-toolbar">
        <div className="os-resume-toolbar-left">
          <FileText size={16} className="text-orange-500" />
          <span>Abdullah_Parvaiz_Resume.pdf</span>
        </div>
        <button className="os-resume-download" onClick={handleDownload}>
          <Download size={14} />
          <span>Download</span>
        </button>
      </div>

      {/* Resume Content (PDF-like view) */}
      <div className="os-resume-page">
        <div className="os-resume-content">
          {/* Header */}
          <div className="os-resume-header">
            <h1 className="os-resume-name">Abdullah Parvaiz</h1>
            <p className="os-resume-tagline">Full-Stack Web Developer & UI/UX Engineer</p>
            <div className="os-resume-contact-row">
              <span><Mail size={12} /> abdullahparvaizofficial@gmail.com</span>
              <span><Github size={12} /> abdullahparvaiz07</span>
              <span><Linkedin size={12} /> abdullah-parvaiz</span>
            </div>
          </div>

          <div className="os-resume-divider" />

          {/* Summary */}
          <div className="os-resume-section">
            <h3><User size={14} /> Summary</h3>
            <p>Creative Developer & UI/UX Engineer specializing in high-end digital experiences. Expert in building performant, accessible, and visually stunning web applications with modern technologies.</p>
          </div>

          <div className="os-resume-divider" />

          {/* Skills */}
          <div className="os-resume-section">
            <h3><Code2 size={14} /> Technical Skills</h3>
            <div className="os-resume-skills-grid">
              <div>
                <strong>Frontend</strong>
                <p>React, Next.js, TypeScript, JavaScript, Tailwind CSS, Framer Motion, HTML5/CSS3</p>
              </div>
              <div>
                <strong>Backend</strong>
                <p>Node.js, Express, MongoDB, REST APIs, PostgreSQL</p>
              </div>
              <div>
                <strong>Design & Tools</strong>
                <p>Figma, Git, VS Code, Vite, Vercel, WordPress, AI/Automation</p>
              </div>
            </div>
          </div>

          <div className="os-resume-divider" />

          {/* Projects */}
          <div className="os-resume-section">
            <h3><Briefcase size={14} /> Notable Projects</h3>
            <div className="os-resume-project">
              <strong>PortFolyn</strong> — Professional CV & portfolio builder with advanced templates and dynamic data integration.
            </div>
            <div className="os-resume-project">
              <strong>Subledge</strong> — Subscription manager for tracking expenses and preventing unwanted renewals.
            </div>
            <div className="os-resume-project">
              <strong>FitNexa AI</strong> — AI-powered fitness application with Gemini integration for personalized workouts.
            </div>
            <div className="os-resume-project">
              <strong>Abdullah OS Portfolio</strong> — Interactive dual-mode portfolio with a full desktop OS experience.
            </div>
          </div>

          <div className="os-resume-divider" />

          {/* Education */}
          <div className="os-resume-section">
            <h3><GraduationCap size={14} /> Education</h3>
            <p><strong>Self-Taught Developer</strong> — 2023 – Present</p>
            <p>Continuously learning through hands-on projects, online courses, and real-world development experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
