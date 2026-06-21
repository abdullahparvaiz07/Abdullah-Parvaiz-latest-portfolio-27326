/**
 * Abdullah OS — Cinematic Welcome Screen
 * An impressive, particle-filled welcome animation that plays
 * before the boot sequence for a premium first impression.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

/* ── tiny seeded random for deterministic particles ── */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

/* ── Particle Canvas ── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const PARTICLE_COUNT = 120;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.1,
      hue: Math.random() > 0.7 ? 25 : 30, // orange-ish tones
    }));

    let time = 0;
    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw & update particles
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(time + p.y * 0.01) * 0.3;
        p.y += p.vy + Math.cos(time + p.x * 0.01) * 0.3;

        // Wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const pulse = Math.sin(time * 2 + p.x * 0.01) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 55%, ${p.opacity * pulse})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 55%, ${p.opacity * pulse * 0.15})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
}

/* ── Orbit Rings ── */
function OrbitRings() {
  return (
    <div className="welcome-orbits">
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className={`welcome-orbit welcome-orbit--${ring}`}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{
            opacity: { delay: 0.2 * ring, duration: 0.8 },
            scale: { delay: 0.2 * ring, duration: 1.2, ease: [0.16, 1, 0.3, 1] },
            rotate: {
              delay: 0.2 * ring,
              duration: 12 + ring * 6,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        />
      ))}
    </div>
  );
}

/* ── Main Welcome Screen ── */
export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [phase, setPhase] = useState<'enter' | 'show' | 'exit'>('enter');

  useEffect(() => {
    // Phase timings
    const t1 = setTimeout(() => setPhase('show'), 300);
    const t2 = setTimeout(() => setPhase('exit'), 4200);
    const t3 = setTimeout(onComplete, 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="welcome-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Particle Background */}
      <ParticleField />

      {/* Radial glow */}
      <motion.div
        className="welcome-glow"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: phase === 'exit' ? 0 : [0, 0.6, 0.4],
          scale: phase === 'exit' ? 2 : [0.5, 1.2, 1],
        }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />

      {/* Orbit Rings */}
      <OrbitRings />

      {/* Center Content */}
      <div className="welcome-center">
        {/* Logo */}
        <motion.div
          className="welcome-logo-container"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{
            opacity: phase === 'exit' ? 0 : 1,
            scale: phase === 'exit' ? 1.5 : 1,
            rotate: 0,
          }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
            rotate: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <div className="welcome-logo-ring" />
          <div className="welcome-logo-ring welcome-logo-ring--inner" />
          <img
            src="/logo.png"
            alt="Abdullah OS"
            className="welcome-logo-img"
          />
        </motion.div>

        {/* "Welcome to" text */}
        <motion.div
          className="welcome-subtitle"
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{
            opacity: phase === 'exit' ? 0 : 1,
            y: phase === 'exit' ? -20 : 0,
            filter: phase === 'exit' ? 'blur(10px)' : 'blur(0px)',
          }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
        >
          WELCOME TO
        </motion.div>

        {/* Main Title */}
        <div className="welcome-title-wrapper">
          {'ABDULLAH OS'.split('').map((char, i) => (
            <motion.span
              key={i}
              className={`welcome-title-char ${char === ' ' ? 'welcome-title-space' : ''}`}
              initial={{ opacity: 0, y: 60, rotateX: -90 }}
              animate={{
                opacity: phase === 'exit' ? 0 : 1,
                y: phase === 'exit' ? -40 : 0,
                rotateX: 0,
              }}
              transition={{
                delay: 0.9 + i * 0.06,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        {/* Version badge */}
        <motion.div
          className="welcome-version"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: phase === 'exit' ? 0 : 1,
            scale: phase === 'exit' ? 0.5 : 1,
          }}
          transition={{ delay: 1.8, duration: 0.6, ease: 'easeOut' }}
        >
          <span className="welcome-version-dot" />
          v2.0 — Portfolio Experience
        </motion.div>

        {/* Divider line */}
        <motion.div
          className="welcome-divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase === 'exit' ? 0 : 1 }}
          transition={{ delay: 2.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Tagline */}
        <motion.p
          className="welcome-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: phase === 'exit' ? 0 : 1,
            y: phase === 'exit' ? -10 : 0,
          }}
          transition={{ delay: 2.6, duration: 0.8, ease: 'easeOut' }}
        >
          Initializing your personalized desktop environment…
        </motion.p>

        {/* Loading indicator */}
        <motion.div
          className="welcome-loader"
          initial={{ opacity: 0 }}
          animate={{
            opacity: phase === 'exit' ? 0 : [0, 1],
          }}
          transition={{ delay: 3.0, duration: 0.5 }}
        >
          <div className="welcome-loader-dots">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="welcome-loader-dot"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Corner decorations */}
      <motion.div
        className="welcome-corner welcome-corner--tl"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'exit' ? 0 : 0.4 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      />
      <motion.div
        className="welcome-corner welcome-corner--tr"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'exit' ? 0 : 0.4 }}
        transition={{ delay: 1.7, duration: 0.8 }}
      />
      <motion.div
        className="welcome-corner welcome-corner--bl"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'exit' ? 0 : 0.4 }}
        transition={{ delay: 1.9, duration: 0.8 }}
      />
      <motion.div
        className="welcome-corner welcome-corner--br"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'exit' ? 0 : 0.4 }}
        transition={{ delay: 2.1, duration: 0.8 }}
      />

      {/* Scanlines overlay */}
      <div className="welcome-scanlines" />
    </motion.div>
  );
}
