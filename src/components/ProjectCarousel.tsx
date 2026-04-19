import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, ExternalLink, ArrowLeft } from "lucide-react";

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
function useCardInteraction(cardRef: React.RefObject<HTMLDivElement | null>) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [magnetic, setMagnetic] = useState({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const px = (e.clientX - rect.left) / rect.width;   // 0 → 1
    const py = (e.clientY - rect.top) / rect.height;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      // 3‌D tilt  (max ±14°)
      setTilt({
        rotateX: (0.5 - py) * 28,
        rotateY: (px - 0.5) * 28,
      });
      // magnetic drift  (max ±8 px)
      setMagnetic({
        x: (e.clientX - cx) * 0.04,
        y: (e.clientY - cy) * 0.04,
      });
      // parallax for inner layers
      setParallax({
        x: (px - 0.5) * 30,
        y: (py - 0.5) * 30,
      });
    });
  }, [cardRef]);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setMagnetic({ x: 0, y: 0 });
    setParallax({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [cardRef, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return { tilt, magnetic, parallax, isHovering };
}

/* ─── single project card ─── */
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { tilt, magnetic, parallax, isHovering } = useCardInteraction(cardRef);
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { once: true, margin: "-80px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const cardTransform = isMobile
    ? "none"
    : `translate3d(${magnetic.x}px, ${magnetic.y}px, 0) perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`;

  return (
    <motion.div
      ref={inViewRef}
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 80, scale: 0.95 }
      }
      transition={{
        duration: 0.85,
        delay: index * 0.18,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="sw-card-wrapper"
    >
      <div
        ref={cardRef}
        className={`sw-card ${isHovering ? "sw-card--hovered" : ""}`}
        style={{
          transform: cardTransform,
          willChange: "transform",
        }}
      >
        {/* ── ambient neon glow (always-on, intensifies on hover) ── */}
        <div className="sw-card__glow" />

        {/* ── glass surface ── */}
        <div className="sw-card__glass">
          {/* noise + grid overlays */}
          <div className="sw-card__noise" />
          <div className="sw-card__grid" />

          {/* top accent bar */}
          <div className="sw-card__accent" />

          {/* ── project image ── */}
          <div
            className="sw-card__img-wrap"
            style={
              !isMobile
                ? {
                    transform: `translate3d(${parallax.x * -0.4}px, ${parallax.y * -0.4}px, 0) scale(${isHovering ? 1.08 : 1})`,
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
            {/* hue shift overlay on hover */}
            <div className="sw-card__img-overlay" />
          </div>

          {/* gradient scrim over image */}
          <div className="sw-card__scrim" />

          {/* ── content layer (parallax deeper) ── */}
          <div
            className="sw-card__content"
            style={
              !isMobile
                ? {
                    transform: `translate3d(${parallax.x * 0.5}px, ${parallax.y * 0.35}px, 40px)`,
                  }
                : undefined
            }
          >
            {/* tag chip */}
            <div
              className="sw-card__tag"
              style={
                !isMobile
                  ? {
                      transform: `translate3d(${parallax.x * 0.7}px, ${parallax.y * 0.5}px, 60px)`,
                    }
                  : undefined
              }
            >
              {project.tag}
            </div>

            {/* title (shallowest parallax → feels closest) */}
            <h3
              className="sw-card__title"
              style={
                !isMobile
                  ? {
                      transform: `translate3d(${parallax.x * 0.25}px, ${parallax.y * 0.2}px, 20px)`,
                    }
                  : undefined
              }
            >
              {project.title}
            </h3>

            {/* description */}
            <p className="sw-card__desc">{project.description}</p>

            {/* CTA */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="sw-card__cta"
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
              !isMobile
                ? {
                    transform: `translate3d(${parallax.x * -0.15}px, ${parallax.y * -0.15}px, -10px)`,
                  }
                : undefined
            }
          >
            {String(project.id).padStart(2, "0")}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── mobile swipe carousel ─── */
function MobileCarousel({ projects }: { projects: Project[] }) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(0);

  const paginate = (d: number) => {
    setDir(d);
    setCurrent((p) => (p + d + projects.length) % projects.length);
  };

  const project = projects[current];

  return (
    <div className="sw-mobile">
      <div className="sw-mobile__card">
        {/* image */}
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

        {/* content */}
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

      {/* dots */}
      <div className="sw-mobile__dots">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDir(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`sw-mobile__dot ${i === current ? "sw-mobile__dot--active" : ""}`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── main export ─── */
export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) return <MobileCarousel projects={projects} />;

  return (
    <div className="sw-grid">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
