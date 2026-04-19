import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  tag: string;
  link?: string;
  image?: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

/* ─── per-card tilt / magnetic / parallax controller ─── */
function useCardInteraction(isActive: boolean) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [magnetic, setMagnetic] = useState({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isActive) return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const px = (e.clientX - rect.left) / rect.width; // 0 → 1
      const py = (e.clientY - rect.top) / rect.height;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setTilt({
          rotateX: (0.5 - py) * 20,
          rotateY: (px - 0.5) * 20,
        });
        setMagnetic({
          x: (e.clientX - cx) * 0.05,
          y: (e.clientY - cy) * 0.05,
        });
        setParallax({
          x: (px - 0.5) * 30,
          y: (py - 0.5) * 30,
        });
      });
    },
    [isActive]
  );

  const handleMouseEnter = useCallback(() => {
    if (isActive) setIsHovering(true);
  }, [isActive]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setMagnetic({ x: 0, y: 0 });
    setParallax({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || !isActive) {
      handleMouseLeave();
      return;
    }
    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return { tilt, magnetic, parallax, isHovering, cardRef };
}

/* ─── single project card ─── */
function ProjectCard({
  project,
  index,
  currentIndex,
  onClick,
}: {
  project: Project;
  index: number;
  currentIndex: number;
  onClick: () => void;
}) {
  const isActive = index === currentIndex;
  const isPrev = index < currentIndex;
  const isNext = index > currentIndex;
  const diff = index - currentIndex;

  const { tilt, magnetic, parallax, isHovering, cardRef } =
    useCardInteraction(isActive);

  // Calculate base 3D transforms for coverflow effect
  let baseTransform = "translate3d(0, 0, 0) rotateY(0deg) scale(1)";
  let filter = "brightness(1) blur(0px)";
  let zIndex = 30;
  let opacity = 1;

  if (!isActive) {
    // Math to space out multiple inactive cards
    const offsetMulti = Math.abs(diff);
    // Move them off center, pull them back in Z, rotate them in
    const sign = diff > 0 ? 1 : -1;
    const xOffset = sign * (45 + offsetMulti * 10);
    const zOffset = -150 - offsetMulti * 50;
    const rotateY = sign * -35; // Turn inward

    baseTransform = `translate3d(${xOffset}%, 0, ${zOffset}px) rotateY(${rotateY}deg) scale(0.85)`;
    filter = "brightness(0.4) blur(4px)";
    zIndex = 10 - offsetMulti;
    opacity = 1 - offsetMulti * 0.15;
  }

  // Combine base with magnetic tilt (only on active)
  const combinedTransform = isActive
    ? `translate3d(${magnetic.x}px, ${magnetic.y}px, 0) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1)`
    : baseTransform;

  return (
    <div
      ref={cardRef}
      onClick={!isActive ? onClick : undefined}
      className={`sw-card ${isActive ? "sw-card--active" : "sw-card--inactive"} ${
        isHovering ? "sw-card--hovered" : ""
      }`}
      style={{
        transform: combinedTransform,
        filter: filter,
        zIndex: zIndex,
        opacity: opacity,
      }}
    >
      {/* ── ambient neon glow (only strong on active) ── */}
      <div className="sw-card__glow" />

      {/* ── glass surface ── */}
      <div className="sw-card__glass">
        <div className="sw-card__noise" />
        <div className="sw-card__grid" />
        <div className="sw-card__accent" />

        {/* ── project image ── */}
        <div
          className="sw-card__img-wrap"
          style={
            isActive
              ? {
                  transform: `translate3d(${parallax.x * -0.3}px, ${
                    parallax.y * -0.3
                  }px, 0) scale(${isHovering ? 1.08 : 1})`,
                }
              : undefined
          }
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="sw-card__img"
              loading="lazy"
            />
          ) : (
            <div className="sw-card__img-placeholder" />
          )}
          <div className="sw-card__img-overlay" />
        </div>

        <div className="sw-card__scrim" />

        {/* ── content layer (parallax deeper) ── */}
        <div
          className="sw-card__content"
          style={
            isActive
              ? {
                  transform: `translate3d(${parallax.x * 0.4}px, ${
                    parallax.y * 0.3
                  }px, 40px)`,
                }
              : undefined
          }
        >
          <div
            className="sw-card__tag"
            style={
              isActive
                ? {
                    transform: `translate3d(${parallax.x * 0.6}px, ${
                      parallax.y * 0.4
                    }px, 60px)`,
                  }
                : undefined
            }
          >
            {project.tag}
          </div>

          <h3
            className="sw-card__title"
            style={
              isActive
                ? {
                    transform: `translate3d(${parallax.x * 0.2}px, ${
                      parallax.y * 0.15
                    }px, 20px)`,
                  }
                : undefined
            }
          >
            {project.title}
          </h3>

          <p className="sw-card__desc">{project.description}</p>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="sw-card__cta"
              onClick={(e) => {
                if (!isActive) e.preventDefault(); // prevent clicking inactive cards
              }}
            >
              <span className="sw-card__cta-text">View Project</span>
              <span className="sw-card__cta-icon">
                <ExternalLink size={15} />
              </span>
              <span className="sw-card__cta-fill" />
            </a>
          )}
        </div>

        {/* project number watermark */}
        <div
          className="sw-card__number"
          style={
            isActive
              ? {
                  transform: `translate3d(${parallax.x * -0.1}px, ${
                    parallax.y * -0.1
                  }px, -10px)`,
                }
              : undefined
          }
        >
          {String(project.id).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

/* ─── mobile swipe carousel ─── */
function MobileCarousel({ projects }: { projects: Project[] }) {
  const [current, setCurrent] = useState(0);

  const paginate = (d: number) => {
    setCurrent((p) => (p + d + projects.length) % projects.length);
  };

  const project = projects[current];

  return (
    <div className="sw-mobile">
      <div className="sw-mobile__card">
        <div className="sw-mobile__img-wrap">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="sw-mobile__img"
            />
          ) : (
            <div className="sw-mobile__img-placeholder" />
          )}
          <div className="sw-mobile__scrim" />
        </div>

        <div className="sw-mobile__content">
          <div className="sw-card__tag">{project.tag}</div>
          <h3 className="sw-mobile__title">{project.title}</h3>
          <p className="sw-mobile__desc">{project.description}</p>

          <div className="sw-mobile__actions">
            <button
              onClick={() => paginate(-1)}
              className="sw-mobile__nav-btn"
              aria-label="Previous"
            >
              <ArrowLeft size={18} />
            </button>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="sw-mobile__visit"
              >
                Visit Site
              </a>
            )}
            <button
              onClick={() => paginate(1)}
              className="sw-mobile__nav-btn"
              aria-label="Next"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="sw-mobile__dots">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`sw-mobile__dot ${
              i === current ? "sw-mobile__dot--active" : ""
            }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── main export (3D Coverflow Container) ─── */
export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024); // Use carousel under 1024px due to width needs
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const goToPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goToNext = () => {
    if (currentIndex < projects.length - 1) setCurrentIndex(currentIndex + 1);
  };

  // Keyboard navigation
  useEffect(() => {
    if (isMobile) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isMobile, projects.length]);

  // Auto-play (optional, but requested previous session)
  useEffect(() => {
    if (isMobile) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 6000); // 6 seconds
    return () => clearInterval(timer);
  }, [isMobile, projects.length]);

  if (isMobile) return <MobileCarousel projects={projects} />;

  return (
    <div className="sw-carousel-container">
      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        disabled={currentIndex === 0}
        className={`sw-nav-btn sw-nav-btn--left ${
          currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-white/10"
        }`}
      >
        <ArrowLeft size={24} />
      </button>

      <div className="sw-stage">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            currentIndex={currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <button
        onClick={goToNext}
        disabled={currentIndex === projects.length - 1}
        className={`sw-nav-btn sw-nav-btn--right ${
          currentIndex === projects.length - 1
            ? "opacity-30 cursor-not-allowed"
            : "hover:bg-white/10"
        }`}
      >
        <ArrowRight size={24} />
      </button>

      {/* Progress Indicators */}
      <div className="sw-indicators">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`sw-indicator ${
              idx === currentIndex ? "sw-indicator--active" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
