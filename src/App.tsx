/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Hexagon, Scan, Sparkles, Zap, ArrowRight, Github, Linkedin, Mail, Code2, Layers, Cpu, Globe, Server, PenTool, Wrench, Loader2, CheckCircle2, AlertCircle, Send, Download } from "lucide-react";
import Hero3D from "./components/Hero3D";
import NewsCard from "./components/NewsCard";
import heroVideo from "./Robot_Waves_Hand_for_Website.mp4";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { IconCloudDemo } from "./components/ui/icon-cloud-demo";
import StickySlide from "./components/StickySlide";
import ProjectCarousel from "./components/ProjectCarousel";
import Chatbot from "./components/Chatbot";
import CustomCursor from "./components/CustomCursor";
import KeyboardShortcuts from "./components/KeyboardShortcuts";

const projects = [
  {
    id: 1,
    title: "Project Title 1",
    description: "Advanced web application featuring real-time data synchronization and a custom WebGL rendering engine.",
    tag: "01 // PROJECT"
  },
  {
    id: 2,
    title: "Project Title 2",
    description: "Advanced web application featuring real-time data synchronization and a custom WebGL rendering engine.",
    tag: "02 // PROJECT"
  },
  {
    id: 3,
    title: "Project Title 3",
    description: "Advanced web application featuring real-time data synchronization and a custom WebGL rendering engine.",
    tag: "03 // PROJECT"
  },
  {
    id: 4,
    title: "Project Title 4",
    description: "Advanced web application featuring real-time data synchronization and a custom WebGL rendering engine.",
    tag: "04 // PROJECT"
  }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    return !hasLoaded;
  });

  useEffect(() => {
    if (!isLoading) return;
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasLoaded", "true");
    }, 3500);
    
    return () => clearTimeout(timer);
  }, [isLoading]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { name: "", email: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setIsSubmitting(true);
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <div className="loader-wrapper">
              <span className="loader-letter">W</span>
              <span className="loader-letter">e</span>
              <span className="loader-letter">l</span>
              <span className="loader-letter">c</span>
              <span className="loader-letter">o</span>
              <span className="loader-letter">m</span>
              <span className="loader-letter">e</span>
              <div className="loader"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <CustomCursor />
      <KeyboardShortcuts />

      <div className="bg-black text-white font-sans selection:bg-orange-500/30">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1.5 bg-orange-500 origin-left z-50 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
          style={{ scaleX }}
        />
      
      {/* Hero Section */}
      <StickySlide>
      <section className="min-h-screen p-6 md:p-12 lg:p-16 flex flex-col overflow-hidden relative bg-black">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          <Hero3D />
          {/* Dark gradient overlays to ensure text remains readable and fade edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black/100"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_90%)]"></div>
        </div>

        {/* Top Bar */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-center w-full mb-12 lg:mb-20 relative z-50 gap-6 md:gap-0"
        >
          {/* Logo */}
          <div className="md:flex-1 flex items-center justify-center md:justify-start w-full md:w-auto">
            <img src="/logo.png" alt="Abdullah Parvaiz Logo" className="h-12 md:h-16 w-auto invert hover:scale-105 transition-transform duration-300" />
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm font-medium tracking-widest uppercase bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <a href="#about" className="relative group hover:text-orange-400 transition-colors">
              About
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </a>
            <a href="#projects" className="relative group hover:text-orange-400 transition-colors">
              Projects
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </a>
            <a href="#news" className="relative group hover:text-orange-400 transition-colors">
              News
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </a>
            <a href="#contact" className="relative group hover:text-orange-400 transition-colors">
              Contact
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </a>
          </nav>

          {/* Empty div to maintain flex layout if needed, or just remove entirely. Let's just remove the button and keep the flex layout balanced by leaving an empty div or removing it. Actually, removing the div might unbalance the flex-between if it relies on 3 elements. Let's keep an empty div to maintain spacing. */}
          <div className="md:flex-1 flex items-center justify-center md:justify-end w-full md:w-auto">
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">
          
          {/* Left Column (Title & Text) */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <h1 className="text-[3.5rem] sm:text-[5rem] lg:text-[6.5rem] xl:text-[7.5rem] font-bold uppercase leading-[0.85] tracking-[-0.02em] mb-8 hover:text-orange-400 transition-colors duration-300">
              ABDULLAH <br/>
              PARVAIZ
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed mb-10 max-w-md opacity-90 font-medium hover:text-orange-400 transition-colors duration-300">
              Engineered with high-end code and a zero-latency stack for those who don't just build the future—they ship it. Shift your reality.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button className="btn-53" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                <div className="original">VIEW PROJECTS</div>
                <div className="letters">
                  <span>V</span>
                  <span>I</span>
                  <span>E</span>
                  <span>W</span>
                  <span className="w-2"></span>
                  <span>P</span>
                  <span>R</span>
                  <span>O</span>
                  <span>J</span>
                  <span>E</span>
                  <span>C</span>
                  <span>T</span>
                  <span>S</span>
                </div>
              </button>
              
              <button className="btn-17" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                <span className="text-container">
                  <span className="text">ABOUT ME</span>
                </span>
              </button>
            </div>
          </motion.div>

          {/* Right Column (Video) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end mt-12 lg:mt-0"
          >
            <div className="w-full max-w-[1000px] relative mix-blend-screen pointer-events-none scale-[1.8] lg:scale-[2.5] origin-center lg:origin-right translate-x-8 lg:translate-x-16">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-contain"
                style={{ 
                  maskImage: 'linear-gradient(to left, transparent 5%, black 15%)', 
                  WebkitMaskImage: 'linear-gradient(to left, transparent 5%, black 15%)' 
                }}
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-20 lg:mt-auto flex flex-col lg:flex-row justify-end items-end gap-12 relative z-10"
        >
          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end text-xs font-medium tracking-widest uppercase shrink-0">
            <div className="px-4 py-2 border border-white/40 rounded-full">Let's</div>
            <div className="w-4 h-[1px] bg-white/40 hidden sm:block"></div>
            <div className="px-3 py-2 border border-white/40 rounded-full mt-4 sm:mt-0">we</div>
            <div className="w-4 h-[1px] bg-white/40 hidden sm:block"></div>
            <div className="px-4 py-2 border border-white/40 rounded-full mt-4 sm:mt-0">Build</div>
            <div className="w-4 h-[1px] bg-white/40 hidden sm:block"></div>
            <div className="px-4 py-2 border border-white/40 rounded-full mt-4 sm:mt-0">Together</div>
          </div>
        </motion.div>
      </section>
      </StickySlide>

      {/* About Section */}
      <StickySlide>
      <section id="about" className="min-h-screen py-32 px-6 md:px-12 lg:px-16 flex items-center relative border-t border-white/10 overflow-hidden bg-black">
        {/* Continuous Animated Background */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none"
        />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          {/* Left Content */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-full overflow-hidden border-2 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                  <img 
                    src="https://picsum.photos/seed/abdullah/400/400" 
                    alt="Abdullah Parvaiz" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-[1px] w-8 bg-orange-500"></div>
                    <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">Identification</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Abdullah Parvaiz</h3>
                </div>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-8 leading-[0.9] flex flex-col py-2">
                <motion.span 
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="block origin-bottom"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">WHO</span>
                </motion.span>
                <motion.span 
                  initial={{ x: -50, opacity: 0, scale: 0.9 }}
                  whileInView={{ x: 0, opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.175, 0.885, 0.32, 1.275] }}
                  className="block text-orange-500 origin-left"
                >
                  AM I?
                </motion.span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <p className="text-xl text-white/80 leading-relaxed mb-6 font-medium">
                I am a Senior Creative Developer & UI/UX Engineer specializing in high-end digital experiences.
              </p>
              <p className="text-lg text-white/60 leading-relaxed mb-10">
                I bridge the gap between stunning visual design and robust, scalable architecture. My approach treats code as a medium for crafting seamless, zero-latency interfaces that don't just work—they perform at the highest level.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <button className="lets-talk-btn" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  <span>Lets's Talk</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Bento Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 h-[500px] md:h-[600px]">
            {/* Large Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="col-span-2 relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/40 backdrop-blur-sm group p-8 flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] group-hover:bg-orange-500/30 transition-colors duration-500"></div>
              
              <div className="relative z-10">
                <Code2 className="text-orange-500 mb-6" size={40} strokeWidth={1.5} />
                <h3 className="text-3xl font-bold uppercase tracking-wide mb-2">Frontend Engineering</h3>
                <p className="text-white/60 max-w-md">Pixel-perfect implementation with complex animations, WebGL, and state-of-the-art framework architectures.</p>
              </div>
              
              <div className="relative z-10 flex flex-wrap gap-2 mt-8">
                {['React', 'Next.js', 'Three.js', 'Tailwind', 'Framer Motion'].map((tech) => (
                  <span key={tech} className="text-xs font-bold tracking-widest uppercase px-3 py-1 bg-black/50 border border-white/10 rounded-full text-white/70">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Small Card 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/40 backdrop-blur-sm group p-8 flex flex-col justify-center items-center text-center"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:16px_16px] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Layers className="text-white/80 mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500 group-hover:text-white" size={32} strokeWidth={1.5} />
              <h3 className="text-xl font-bold uppercase tracking-wide relative z-10">UI/UX Design</h3>
              <p className="text-white/50 text-sm mt-2 relative z-10">Figma to Code</p>
            </motion.div>

            {/* Small Card 2 - Accent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden border border-orange-500/30 bg-orange-500/5 backdrop-blur-sm group p-8 flex flex-col justify-center items-center text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Cpu className="text-orange-400 mb-4 relative z-10 group-hover:rotate-12 transition-transform duration-500" size={32} strokeWidth={1.5} />
              <h3 className="text-xl font-bold uppercase tracking-wide relative z-10 text-orange-50">Backend Systems</h3>
              <p className="text-orange-200/60 text-sm mt-2 relative z-10">Node, SQL, NoSQL</p>
            </motion.div>
          </div>
        </div>
      </section>
      </StickySlide>

      {/* Skills Section */}
      <StickySlide>
      <section id="skills" className="min-h-screen py-32 px-6 md:px-12 lg:px-16 relative border-t border-white/10 overflow-hidden bg-zinc-950">
        {/* Background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-orange-500"></div>
              <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">Expertise</span>
              <div className="h-[1px] w-12 bg-orange-500"></div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight leading-[0.9]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">WHAT CAN</span>
              <span className="block text-orange-500">I DO?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Frontend Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition-colors duration-500 group relative overflow-hidden"
              >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:scale-110 transform origin-top-right">
                <Code2 size={100} strokeWidth={1} />
              </div>
              <Code2 className="text-orange-500 mb-6 relative z-10" size={32} strokeWidth={1.5} />
              <h3 className="text-xl font-bold uppercase tracking-wide mb-4 relative z-10">Frontend</h3>
              <ul className="space-y-3 relative z-10">
                {['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js / WebGL', 'Framer Motion'].map((skill) => (
                  <li key={skill} className="text-white/70 text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500/50"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Backend Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition-colors duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:scale-110 transform origin-top-right">
                <Server size={100} strokeWidth={1} />
              </div>
              <Server className="text-orange-500 mb-6 relative z-10" size={32} strokeWidth={1.5} />
              <h3 className="text-xl font-bold uppercase tracking-wide mb-4 relative z-10">Backend</h3>
              <ul className="space-y-3 relative z-10">
                {['Node.js & Express', 'PostgreSQL', 'MongoDB', 'Firebase', 'RESTful APIs'].map((skill) => (
                  <li key={skill} className="text-white/70 text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500/50"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* UI/UX Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition-colors duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:scale-110 transform origin-top-right">
                <PenTool size={100} strokeWidth={1} />
              </div>
              <PenTool className="text-orange-500 mb-6 relative z-10" size={32} strokeWidth={1.5} />
              <h3 className="text-xl font-bold uppercase tracking-wide mb-4 relative z-10">UI/UX Design</h3>
              <ul className="space-y-3 relative z-10">
                {['Figma', 'Prototyping', 'Wireframing', 'Design Systems', 'User Research'].map((skill) => (
                  <li key={skill} className="text-white/70 text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500/50"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tools Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition-colors duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:scale-110 transform origin-top-right">
                <Wrench size={100} strokeWidth={1} />
              </div>
              <Wrench className="text-orange-500 mb-6 relative z-10" size={32} strokeWidth={1.5} />
              <h3 className="text-xl font-bold uppercase tracking-wide mb-4 relative z-10">Tools & DevOps</h3>
              <ul className="space-y-3 relative z-10">
                {['Git & GitHub', 'Docker', 'AWS', 'Vercel', 'CI/CD Pipelines'].map((skill) => (
                  <li key={skill} className="text-white/70 text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500/50"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Icon Cloud */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <IconCloudDemo />
          </motion.div>
          </div>
        </div>
      </section>
      </StickySlide>

      {/* Projects Section */}
      <StickySlide>
      <section id="projects" className="min-h-screen py-24 px-6 md:px-12 lg:px-16 relative border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
              Selected <span className="text-orange-500">Works</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl">
              A collection of high-impact projects engineered for scale and performance.
            </p>
          </motion.div>

          <ProjectCarousel projects={projects} />
        </div>
      </section>
      </StickySlide>

      {/* News & Updates Section */}
      <StickySlide>
      <section id="news" className="py-24 px-6 md:px-12 lg:px-16 relative border-t border-white/10 bg-zinc-950">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
              Latest <span className="text-orange-500">News</span>
            </h2>
            <p className="text-lg text-white/60">
              Updates, articles, and recent activities.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">
            <NewsCard 
              title="Launched New Portfolio Website"
              date="MAR 2026"
              summary="A complete redesign of my personal portfolio featuring 3D elements and smooth animations."
              details="This new portfolio was built from the ground up using React, Framer Motion, and Three.js. The goal was to create an immersive experience that showcases not just my projects, but my ability to craft high-performance, visually stunning web applications. The 3D hero section uses custom shaders to create a unique visual identity."
            />
            <NewsCard 
              title="Speaking at Web Dev Summit"
              date="FEB 2026"
              summary="Invited to speak about advanced WebGL techniques and performance optimization."
              details="I'll be sharing my insights on how to integrate WebGL into standard React applications without sacrificing performance or accessibility. The talk will cover techniques like offscreen canvas rendering, shader optimization, and asset loading strategies that I've developed over the past few years."
            />
            <NewsCard 
              title="Open Source Contribution"
              date="JAN 2026"
              summary="Major feature merged into a popular React animation library."
              details="Contributed a new layout animation engine that improves performance by 30% for complex list transitions. This was a challenging but rewarding process that involved deep diving into the browser's rendering pipeline and optimizing layout thrashing."
            />
          </div>
        </div>
      </section>
      </StickySlide>

      {/* Contact Section */}
      <StickySlide>
      <section id="contact" className="py-32 px-6 md:px-12 lg:px-16 relative border-t border-white/10 bg-zinc-950">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side: Text and Socials */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-8">
                Let's <span className="text-orange-500">Connect</span>
              </h2>
              <p className="text-xl text-white/70 mb-12 max-w-xl">
                Ready to build something extraordinary? Let's connect and discuss how we can engineer your next big idea.
              </p>
              <div className="flex flex-wrap justify-start gap-8 mt-8">
              {/* Email */}
              <div className="tooltip-container" style={{ '--brand-color': '#ea4335' } as React.CSSProperties}>
                <div className="tooltip">
                  <div className="profile">
                    <div className="user">
                      <div className="img">AP</div>
                      <div className="details">
                        <div className="name">Abdullah Parvaiz</div>
                        <div className="username">hello@example.com</div>
                      </div>
                    </div>
                    <div className="about">Let's build something!</div>
                  </div>
                </div>
                <div className="text">
                  <a className="icon" href="mailto:hello@example.com">
                    <div className="layer">
                      <span></span><span></span><span></span><span></span>
                      <span className="socialSVG">
                        <Mail size={20} color="white" />
                      </span>
                    </div>
                    <div className="text">Email</div>
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="tooltip-container" style={{ '--brand-color': '#ffffff', '--brand-bg': '#333' } as React.CSSProperties}>
                <div className="tooltip">
                  <div className="profile">
                    <div className="user">
                      <div className="img">AP</div>
                      <div className="details">
                        <div className="name">Abdullah Parvaiz</div>
                        <div className="username">@githubuser</div>
                      </div>
                    </div>
                    <div className="about">100+ Repositories</div>
                  </div>
                </div>
                <div className="text">
                  <a className="icon" href="#">
                    <div className="layer">
                      <span></span><span></span><span></span><span></span>
                      <span className="socialSVG">
                        <Github size={20} color="white" />
                      </span>
                    </div>
                    <div className="text">GitHub</div>
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="tooltip-container" style={{ '--brand-color': '#0077b5' } as React.CSSProperties}>
                <div className="tooltip">
                  <div className="profile">
                    <div className="user">
                      <div className="img">AP</div>
                      <div className="details">
                        <div className="name">Abdullah Parvaiz</div>
                        <div className="username">@linkedinuser</div>
                      </div>
                    </div>
                    <div className="about">500+ Connections</div>
                  </div>
                </div>
                <div className="text">
                  <a className="icon" href="#">
                    <div className="layer">
                      <span></span><span></span><span></span><span></span>
                      <span className="socialSVG">
                        <Linkedin size={20} color="white" />
                      </span>
                    </div>
                    <div className="text">LinkedIn</div>
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="tooltip-container" style={{ '--brand-color': '#e6683c', '--brand-bg': 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' } as React.CSSProperties}>
                <div className="tooltip">
                  <div className="profile">
                    <div className="user">
                      <div className="img">AP</div>
                      <div className="details">
                        <div className="name">Abdullah Parvaiz</div>
                        <div className="username">@instagramuser</div>
                      </div>
                    </div>
                    <div className="about">500+ Followers</div>
                  </div>
                </div>
                <div className="text">
                  <a className="icon" href="#">
                    <div className="layer">
                      <span></span><span></span><span></span><span></span>
                      <span className="socialSVG">
                        <svg fill="white" viewBox="0 0 448 512" height="1.5em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                        </svg>
                      </span>
                    </div>
                    <div className="text">Instagram</div>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <a 
                href="mailto:abdullahparvaizofficial@gmail.com" 
                className="inline-flex items-center gap-4 text-lg md:text-xl font-medium text-white hover:text-orange-500 hover:underline transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-all">
                  <Mail size={20} className="text-white group-hover:text-orange-500 transition-colors group-hover:animate-gentle-pulse" />
                </div>
                abdullahparvaizofficial@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Right Side: Email Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <form onSubmit={handleFormSubmit} className="w-full max-w-md bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              {/* Decorative gradient blob */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
                <Mail className="text-orange-500" /> Send a Message
              </h3>
              
              <div className="space-y-5 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1.5">Name</label>
                  <input 
                    id="name"
                    type="text" 
                    className={`w-full bg-black/50 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all placeholder:text-white/30`}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => { setFormData({...formData, name: e.target.value}); if(errors.name) setErrors({...errors, name: ''}); }}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12}/> {errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1.5">Email Address</label>
                  <input 
                    id="email"
                    type="email" 
                    className={`w-full bg-black/50 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all placeholder:text-white/30`}
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => { setFormData({...formData, email: e.target.value}); if(errors.email) setErrors({...errors, email: ''}); }}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12}/> {errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-1.5">Message</label>
                  <textarea 
                    id="message"
                    rows={4}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none placeholder:text-white/30"
                    placeholder="How can I help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className={`button w-full mt-2 ${isSubmitting || submitStatus === 'success' ? 'is-active' : ''}`}
                >
                  <div className="outline"></div>
                  <div className="state state--default">
                    <div className="icon">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g style={{ filter: "url(#shadow)" }}>
                          <path
                            d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z"
                            fill="currentColor"
                          ></path>
                        </g>
                        <defs>
                          <filter id="shadow">
                            <feDropShadow
                              dx="0"
                              dy="1"
                              stdDeviation="0.6"
                              floodOpacity="0.5"
                            ></feDropShadow>
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <p>
                      <span style={{ '--i': 0 } as React.CSSProperties}>S</span>
                      <span style={{ '--i': 1 } as React.CSSProperties}>e</span>
                      <span style={{ '--i': 2 } as React.CSSProperties}>n</span>
                      <span style={{ '--i': 3 } as React.CSSProperties}>d</span>
                      <span style={{ '--i': 4 } as React.CSSProperties}>M</span>
                      <span style={{ '--i': 5 } as React.CSSProperties}>e</span>
                      <span style={{ '--i': 6 } as React.CSSProperties}>s</span>
                      <span style={{ '--i': 7 } as React.CSSProperties}>s</span>
                      <span style={{ '--i': 8 } as React.CSSProperties}>a</span>
                      <span style={{ '--i': 9 } as React.CSSProperties}>g</span>
                      <span style={{ '--i': 10 } as React.CSSProperties}>e</span>
                    </p>
                  </div>
                  <div className="state state--sent">
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        strokeWidth="0.5px"
                        stroke="black"
                      >
                        <g style={{ filter: "url(#shadow)" }}>
                          <path
                            fill="currentColor"
                            d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                          ></path>
                          <path
                            fill="currentColor"
                            d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <p>
                      <span style={{ '--i': 5 } as React.CSSProperties}>S</span>
                      <span style={{ '--i': 6 } as React.CSSProperties}>e</span>
                      <span style={{ '--i': 7 } as React.CSSProperties}>n</span>
                      <span style={{ '--i': 8 } as React.CSSProperties}>t</span>
                    </p>
                  </div>
                </button>
                
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-lg flex items-center gap-2 text-sm mt-4"
                  >
                    <CheckCircle2 size={16} /> Message sent successfully!
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>

        {/* Footer Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-24 pt-8 border-t border-white/10 flex flex-col items-center justify-center text-center"
          >
            <p className="text-white/50 text-sm uppercase tracking-wider">
              &copy; 2026 Abdullah Parvaiz rights reserved
            </p>
          </motion.div>
        </div>
      </section>
      </StickySlide>
      <Chatbot />
    </div>
    </>
  );
}
