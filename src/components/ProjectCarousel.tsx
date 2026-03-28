import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  tag: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + projects.length) % projects.length);
  };

  if (!isMobile) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: (index % 2) * 0.2 }}
            className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/30 hover:border-orange-500/50 transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105 transform">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-8 z-20">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-orange-500 text-sm font-bold tracking-widest mb-2">{project.tag}</div>
                  <h3 className="text-2xl font-bold uppercase tracking-wide mb-2">{project.title}</h3>
                  <p className="text-white/60 text-sm max-w-sm">
                    {project.description}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-orange-500 group-hover:text-black transition-all cursor-pointer">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden px-4">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/30 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-8 z-20">
              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-orange-500 text-sm font-bold tracking-widest mb-2">{projects[currentIndex].tag}</div>
                  <h3 className="text-2xl font-bold uppercase tracking-wide mb-2">{projects[currentIndex].title}</h3>
                  <p className="text-white/60 text-sm">
                    {projects[currentIndex].description}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <button 
                    onClick={() => paginate(-1)}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-orange-500 hover:text-black transition-all"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button 
                    onClick={() => paginate(1)}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-orange-500 hover:text-black transition-all"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-orange-500 w-6" : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
