/**
 * Abdullah OS — About Me Window
 */

import React from 'react';
import { MapPin, GraduationCap, Code2, Heart } from 'lucide-react';

export default function AboutWindow() {
  return (
    <div className="os-about">
      {/* Profile Header */}
      <div className="os-about-header">
        <div className="os-about-avatar-wrap">
          <img src="/mine.jpg" alt="Abdullah Parvaiz" className="os-about-avatar" />
          <div className="os-about-status" />
        </div>
        <div className="os-about-meta">
          <h2 className="os-about-name">Abdullah Parvaiz</h2>
          <p className="os-about-role">Full-Stack Web Developer & UI/UX Engineer</p>
          <div className="os-about-tags">
            <span className="os-about-tag"><MapPin size={12} /> Pakistan</span>
            <span className="os-about-tag"><GraduationCap size={12} /> Self-Taught</span>
            <span className="os-about-tag"><Code2 size={12} /> 3+ Years</span>
          </div>
        </div>
      </div>

      {/* Info Sections */}
      <div className="os-about-sections">
        <div className="os-about-section">
          <h3 className="os-about-section-title">
            <Heart size={14} className="text-orange-500" /> About
          </h3>
          <p className="os-about-text">
            I'm a Creative Developer & UI/UX Engineer specializing in high-end digital experiences.
            I bridge the gap between stunning visual design and robust, scalable architecture.
            My approach treats code as a medium for crafting seamless, zero-latency interfaces
            that don't just work — they perform at the highest level.
          </p>
        </div>

        <div className="os-about-section">
          <h3 className="os-about-section-title">
            <Code2 size={14} className="text-orange-500" /> What I Do
          </h3>
          <ul className="os-about-list">
            <li>🎨 Frontend Engineering with React, Next.js & Framer Motion</li>
            <li>⚙️ Backend Development with Node.js & Express</li>
            <li>🎯 UI/UX Design & Prototyping in Figma</li>
            <li>🤖 AI Integration & Automation</li>
            <li>🌐 WordPress Development</li>
            <li>📱 Responsive & Accessible Web Design</li>
          </ul>
        </div>

        <div className="os-about-section">
          <h3 className="os-about-section-title">
            <GraduationCap size={14} className="text-orange-500" /> Education
          </h3>
          <p className="os-about-text">
            Self-taught developer with a passion for continuous learning.
            Completed multiple certifications and built real-world projects
            to master modern web development technologies.
          </p>
        </div>
      </div>
    </div>
  );
}
