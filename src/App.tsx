/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Hexagon, Scan, Sparkles, Zap, ArrowRight, Github, Linkedin, Mail, Code2, Layers, Cpu, Globe, Server, PenTool, Wrench, Loader2, CheckCircle2, AlertCircle, Send, Download, Atom, Triangle, Box, Wind, LayoutTemplate, Database, Leaf, Flame, Network, RefreshCw, GitBranch, Cloud, Figma as FigmaIcon } from "lucide-react";
import Hero3D from "./components/Hero3D";
import NewsCard from "./components/NewsCard";
import Macbook from "./components/Macbook";
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
    title: "PortFolyn",
    description: "A professional CV & portfolio builder featuring advanced templates, dynamic data integration, and seamless export for creative professionals.",
    tag: "01 // SAAS",
    link: "https://portfolyn-one.vercel.app/"
  },
  {
    id: 2,
    title: "Subledge",
    description: "An intuitive subscription manager that helps you track expenses, optimize billing cycles, and prevent unwanted renewals and charges.",
    tag: "02 // WEB APP",
    link: "https://abdullahparvaiz07.github.io/Subledge/"
  },
  {
    id: 3,
    title: "FitNexa AI",
    description: "An AI-powered fitness application designed to analyze workout routines, recommend tailored exercises, and help users train smarter.",
    tag: "03 // AI PLATFORM",
    link: "https://fit-nexa-ai.vercel.app/"
  }
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            <div className="absolute top-6 md:top-12 lg:top-16 left-0 right-0 px-6 md:px-12 lg:px-16 w-full pointer-events-none">
              <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6 md:gap-0">
                <div className="md:flex-1 flex items-center justify-center md:justify-start w-full md:w-auto">
                  <img src="/logo.png" alt="Abdullah Parvaiz Logo" className="h-12 md:h-16 w-auto invert" />
                </div>
              </div>
            </div>
            <div className="scale-125 md:scale-150">
              <Macbook />
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
          className="flex flex-row justify-between items-center w-full mb-12 lg:mb-20 relative z-[95]"
        >
          {/* Logo */}
          <div className="flex-1 flex items-center justify-start">
            <img src="/logo.png" alt="Abdullah Parvaiz Logo" className="h-12 md:h-16 w-auto invert hover:scale-105 transition-transform duration-300" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium tracking-widest uppercase bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-8 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
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

          {/* Right Spacer & Mobile Toggle */}
          <div className="flex-1 flex items-center justify-end">
            <div className="md:hidden flex items-center relative z-[100]">
              <input 
                type="checkbox" 
                id="checkbox" 
                checked={isMobileMenuOpen} 
                onChange={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              />
              <label htmlFor="checkbox" className="toggle">
                <div className="bars" id="bar1"></div>
                <div className="bars" id="bar2"></div>
                <div className="bars" id="bar3"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl z-[90] flex flex-col items-center justify-center md:hidden"
            >
              <nav className="flex flex-col items-center gap-10 text-2xl font-bold uppercase tracking-widest text-white">
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-orange-400 transition-colors">About</a>
                <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-orange-400 transition-colors">Projects</a>
                <a href="#news" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-orange-400 transition-colors">News</a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-orange-400 transition-colors">Contact</a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

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
              Crafting high-performance applications with clean code and modern stacks. Turning ideas into interactive reality.
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
      <section id="about" className="min-h-screen py-32 px-6 md:px-12 lg:px-16 flex items-center relative border-t border-white/10 overflow-hidden bg-[#0a0a0a]">
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
          
          {/* Left Content - Profile Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-[300px] md:w-[350px] aspect-[3/4] sm:aspect-square md:aspect-[3/4] rounded-sm overflow-hidden group cursor-pointer"
            >
              {/* Subtle orange glowing border ring */}
              <div className="absolute inset-0 border border-orange-500/30 rounded-sm shadow-[0_0_30px_rgba(249,115,22,0.15)] z-20 pointer-events-none group-hover:border-orange-500/60 transition-colors duration-500"></div>
              
              {/* Noise overlay */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

              <img 
                src="/mine.jpg" 
                alt="Abdullah Parvaiz" 
                className="w-full h-full object-cover grayscale brightness-90 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-700 transform group-hover:scale-105 origin-center"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Right Content - Editorial Text */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-12 bg-orange-500"></div>
              <span className="text-orange-500 uppercase tracking-[0.1em] text-[11px] font-medium">
                Identification
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mb-8"
            >
              <h3 className="text-[22px] font-medium text-white">Abdullah Parvaiz</h3>
            </motion.div>

            {/* Title */}
            <h2 className="text-[64px] font-bold uppercase tracking-tight mb-10 leading-[0.9] flex flex-col text-orange-500">
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  WHO
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  AM I?
                </motion.span>
              </div>
            </h2>

            {/* Body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="max-w-xl"
            >
              <p className="text-[15px] text-[#888] leading-[1.8] mb-6">
                I am a Creative Developer & UI/UX Engineer specializing in high-end digital experiences.
              </p>
              <p className="text-[15px] text-[#888] leading-[1.8] mb-12">
                I bridge the gap between stunning visual design and robust, scalable architecture. My approach treats code as a medium for crafting seamless, zero-latency interfaces that don't just work &mdash; they perform at the highest level.
              </p>

              <div className="flex flex-wrap gap-4 mt-2">
                <button className="lets-talk-new-btn" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  <span>Let's Talk</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 74 74"
                    height="34"
                    width="34"
                  >
                    <circle strokeWidth="3" stroke="white" r="35.5" cy="37" cx="37"></circle>
                    <path
                      fill="white"
                      d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                    ></path>
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      </StickySlide>

      {/* Skills Section */}
      <StickySlide>
      <section id="skills" className="min-h-screen py-32 px-6 md:px-12 lg:px-16 flex flex-col justify-center relative border-t border-white/10 overflow-hidden bg-[#0a0a0a]">
        
        {/* Subtle radial glow and noise */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay z-10 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

        <div className="max-w-6xl mx-auto w-full relative z-20">
          
          {/* Section Header */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="text-orange-500 text-[11px] font-bold tracking-[0.15em] uppercase">What I Bring</span>
            </motion.div>
            
            <h2 className="text-[56px] font-[800] text-white leading-[0.9] tracking-tight mb-8">
              <div className="overflow-hidden">
                <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}>
                  Expertise &
                </motion.div>
              </div>
              <div className="overflow-hidden inline-block relative py-1">
                <motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease: [0.16,1,0.3,1] }}>
                  Tech Stack
                </motion.div>
                {/* Animated SVG underline */}
                <motion.svg className="absolute -bottom-2 left-0 w-full h-[6px] overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 10">
                  <motion.path 
                    d="M 0 5 Q 50 0 100 5" 
                    fill="none" 
                    stroke="#f97316" 
                    strokeWidth="3" 
                    initial={{ pathLength: 0 }} 
                    whileInView={{ pathLength: 1 }} 
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }} 
                  />
                </motion.svg>
              </div>
            </h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[15px] text-[#666] max-w-sm leading-[1.7]"
            >
              Every tool chosen with purpose.<br/>
              Every line written with intent.
            </motion.p>
          </div>

          {/* Premium Skills Layout with Icon Cloud */}
          <div className="relative flex flex-col lg:flex-row items-center gap-16 mt-12 bg-[#080808]/80 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 md:p-16 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] group">
            
            {/* Background Cinematic Effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none group-hover:bg-orange-500/20 transition-colors duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-700/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,1) 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>

            {/* Left: Interactive Icon Cloud */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16,1,0.3,1] }}
              className="w-full lg:w-1/2 flex justify-center items-center relative z-10"
            >
              {/* Dynamic Rings */}
              <div className="absolute inset-0 rounded-full border border-white/5 scale-[0.6] z-0 animate-[spin_40s_linear_infinite]"></div>
              <div className="absolute inset-0 rounded-full border border-orange-500/10 scale-[0.9] z-0 animate-[spin_60s_linear_infinite_reverse]"></div>
              
              <div className="scale-[1.15] md:scale-125 lg:scale-150 relative z-10 filter drop-shadow-[0_0_40px_rgba(249,115,22,0.15)] mix-blend-screen mix-blend-plus-lighter">
                <IconCloudDemo />
              </div>
            </motion.div>

            {/* Right: Expertise Domains */}
            <div className="w-full lg:w-1/2 flex flex-col gap-12 relative z-10">
              
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16,1,0.3,1] }}
                className="group/domain cursor-default relative"
              >
                <div className="text-orange-500/80 text-[11px] font-bold tracking-[0.2em] uppercase mb-3 group-hover/domain:text-orange-500 transition-colors duration-400">01 // Frontend Engineering</div>
                <h3 className="text-[32px] md:text-[40px] font-bold text-white mb-4 leading-tight tracking-tight">Crafting Zero-Latency Interfaces</h3>
                <p className="text-[#777] leading-[1.8] text-[15px] max-w-md group-hover/domain:text-[#aaa] transition-colors duration-400">
                  Utilizing modern architectures like React, Next.js, and Framer Motion to build deeply interactive, highly performant client-side experiences. Every pixel breathes.
                </p>
                <div className="w-full h-[1px] bg-white/5 mt-8 group-hover/domain:bg-gradient-to-r group-hover/domain:from-orange-500 group-hover/domain:to-transparent transition-all duration-700"></div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.16,1,0.3,1] }}
                className="group/domain cursor-default relative"
              >
                <div className="text-orange-500/80 text-[11px] font-bold tracking-[0.2em] uppercase mb-3 group-hover/domain:text-orange-500 transition-colors duration-400">02 // Backend Systems</div>
                <h3 className="text-[32px] md:text-[40px] font-bold text-white mb-4 leading-tight tracking-tight">Scalable Data Architecture</h3>
                <p className="text-[#777] leading-[1.8] text-[15px] max-w-md group-hover/domain:text-[#aaa] transition-colors duration-400">
                  Engineering resilient microservices and robust REST/GraphQL APIs with Node.js and PostgreSQL. Designed securely from the ground up to handle intense scale effortlessly.
                </p>
                <div className="w-full h-[1px] bg-white/5 mt-8 group-hover/domain:bg-gradient-to-r group-hover/domain:from-orange-500 group-hover/domain:to-transparent transition-all duration-700"></div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.16,1,0.3,1] }}
                className="group/domain cursor-default relative"
              >
                <div className="text-orange-500/80 text-[11px] font-bold tracking-[0.2em] uppercase mb-3 group-hover/domain:text-orange-500 transition-colors duration-400">03 // UI/UX Design</div>
                <h3 className="text-[32px] md:text-[40px] font-bold text-white mb-4 leading-tight tracking-tight">Editorial & Cinematic Aesthetics</h3>
                <p className="text-[#777] leading-[1.8] text-[15px] max-w-md group-hover/domain:text-[#aaa] transition-colors duration-400">
                  Prototyping in Figma and Spline to bring high-end editorial layouts and 3D web capabilities to life. Blending brutalist minimalism with magnetic interactivity.
                </p>
                <div className="w-full h-[1px] bg-white/5 mt-8 group-hover/domain:bg-gradient-to-r group-hover/domain:from-orange-500 group-hover/domain:to-transparent transition-all duration-700"></div>
              </motion.div>

            </div>
          </div>{/* End Grid */}
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center py-16 border border-white/5 rounded-2xl bg-white/[0.02]"
          >
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6">
              <Sparkles className="text-orange-500" size={20} />
            </div>
            <p className="text-white/40 text-lg font-medium mb-2">No news yet</p>
            <p className="text-white/20 text-sm">Stay tuned — updates coming soon.</p>
          </motion.div>
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
                        <div className="username">@abdullahparvaiz07</div>
                      </div>
                    </div>
                    <div className="about">10+ Repositories</div>
                  </div>
                </div>
                <div className="text">
                  <a className="icon" href="https://github.com/abdullahparvaiz07" target="_blank" rel="noopener noreferrer">
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
                        <div className="username">@abdullah-parvaiz</div>
                      </div>
                    </div>
                    <div className="about">500+ Connections</div>
                  </div>
                </div>
                <div className="text">
                  <a className="icon" href="https://www.linkedin.com/in/abdullah-parvaiz-4a0492386/" target="_blank" rel="noopener noreferrer">
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
            className="mt-24 pt-8 pb-8 border-t border-white/10 flex flex-col items-center justify-center text-center w-full px-6 md:px-0"
          >
            <p className="text-white/50 text-xs sm:text-sm md:text-base uppercase tracking-wider">
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
