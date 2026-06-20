/**
 * Abdullah OS — Services Window
 */

import React from 'react';
import { motion } from 'motion/react';
import { Globe, PenTool, Cpu, Code2, Wrench } from 'lucide-react';

const SERVICES = [
  {
    id: 'web-dev',
    name: 'Web Development',
    description: 'Full-stack web applications built with React, Next.js, Node.js — optimized for performance, SEO, and scalability.',
    icon: <Globe size={20} />,
    status: 'Running',
    pid: '1001',
    memory: '256 MB',
  },
  {
    id: 'uiux',
    name: 'UI/UX Design',
    description: 'Premium interface design with Figma, focusing on intuitive user experiences, responsive layouts, and modern aesthetics.',
    icon: <PenTool size={20} />,
    status: 'Running',
    pid: '1002',
    memory: '128 MB',
  },
  {
    id: 'ai',
    name: 'AI Integration',
    description: 'Integrating AI models (Gemini, GPT) into applications for chatbots, content generation, and intelligent automation.',
    icon: <Cpu size={20} />,
    status: 'Running',
    pid: '1003',
    memory: '512 MB',
  },
  {
    id: 'wordpress',
    name: 'WordPress Development',
    description: 'Custom WordPress themes, plugins, and full site builds for businesses needing a reliable CMS solution.',
    icon: <Code2 size={20} />,
    status: 'Running',
    pid: '1004',
    memory: '192 MB',
  },
  {
    id: 'consulting',
    name: 'Tech Consulting',
    description: 'Strategic guidance on tech stack selection, architecture design, and development best practices for startups and teams.',
    icon: <Wrench size={20} />,
    status: 'Idle',
    pid: '1005',
    memory: '64 MB',
  },
];

export default function ServicesWindow() {
  return (
    <div className="os-services">
      <div className="os-services-header">
        <div className="os-services-col os-services-col--status">Status</div>
        <div className="os-services-col os-services-col--name">Service Name</div>
        <div className="os-services-col os-services-col--pid">PID</div>
        <div className="os-services-col os-services-col--mem">Memory</div>
      </div>

      <div className="os-services-list">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.id}
            className="os-service-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="os-services-col os-services-col--status">
              <span className={`os-service-status ${service.status === 'Running' ? 'os-service-status--running' : 'os-service-status--idle'}`}>
                {service.status === 'Running' ? '●' : '○'} {service.status}
              </span>
            </div>
            <div className="os-services-col os-services-col--name">
              <div className="os-service-name-wrap">
                <span className="os-service-icon">{service.icon}</span>
                <div>
                  <div className="os-service-name">{service.name}</div>
                  <div className="os-service-desc">{service.description}</div>
                </div>
              </div>
            </div>
            <div className="os-services-col os-services-col--pid">{service.pid}</div>
            <div className="os-services-col os-services-col--mem">{service.memory}</div>
          </motion.div>
        ))}
      </div>

      <div className="os-services-footer">
        <span>{SERVICES.filter(s => s.status === 'Running').length} services running</span>
        <span>Total Memory: {SERVICES.reduce((sum, s) => sum + parseInt(s.memory), 0)} MB</span>
      </div>
    </div>
  );
}
