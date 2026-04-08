/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Hexagon, Scan, Sparkles, Zap, ArrowRight, Github, Linkedin, Mail, Code2, Layers, Cpu, Globe, Server, PenTool, Wrench, Loader2, CheckCircle2, AlertCircle, Send, Download, Atom, Triangle, Box, Wind, LayoutTemplate, Database, Leaf, Flame, Network, RefreshCw, GitBranch, Cloud, Figma as FigmaIcon } from "lucide-react";
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
            <div className="loader-wrapper">
              <span className="loader-letter">l</span>
              <span className="loader-letter">o</span>
              <span className="loader-letter">a</span>
              <span className="loader-letter">d</span>
              <span className="loader-letter">i</span>
              <span className="loader-letter">n</span>
              <span className="loader-letter">g</span>
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

        {/* Floating Scattered Skill Icons — Official Brand Colors */}
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
          
          {/* React — #61DAFB */}
          <motion.div
            animate={{ y: [0, -18, 0], x: [0, 8, 0], rotate: [0, 360] }}
            transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, x: { duration: 7, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
            className="absolute top-[12%] left-[6%]"
          >
            <svg width="60" height="60" viewBox="0 0 256 228" opacity="0.15">
              <path d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.986 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488 29.348-9.723 48.443-25.443 48.443-41.52 0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345-3.24-10.257-7.612-21.163-12.963-32.432 5.106-11 9.31-21.767 12.459-31.957a145.53 145.53 0 0 1 7.46 2.338c25.94 8.946 42.508 22.212 42.508 32.366 0 10.786-17.88 24.858-45.164 34.34ZM178.948 142.032c-5.506 10.604-11.902 20.78-18.967 30.277-9.48.798-19.201 1.195-29.063 1.195-9.98 0-19.75-.41-29.196-1.195-7.14-9.483-13.579-19.58-19.133-30.128-5.47-10.387-10.206-20.893-14.187-31.37 3.935-10.497 8.633-21.055 14.065-31.498 5.501-10.603 11.898-20.78 18.964-30.276 9.48-.798 19.2-1.195 29.063-1.195 9.98 0 19.75.41 29.196 1.195 7.139 9.483 13.578 19.58 19.13 30.128 5.471 10.387 10.207 20.893 14.188 31.37-3.934 10.496-8.633 21.055-14.06 31.497Zm22.196-7.039c5.644 11.637 10.177 22.876 13.501 33.386-10.487 2.83-22.18 5.012-34.866 6.384 4.39-6.77 8.594-13.79 12.554-21.006 3.08-5.583 5.965-11.195 8.81-18.764ZM128.075 194.937c-6.282-7.396-12.424-15.335-18.313-23.755 5.962.276 12.06.418 18.238.418 6.293 0 12.496-.152 18.546-.444-5.956 8.462-12.14 16.403-18.471 23.781ZM54.715 175.753c-12.563-1.425-24.102-3.612-34.39-6.41 3.209-10.24 7.561-21.228 12.98-32.59 2.837 5.494 5.834 11.001 8.984 16.488 4.08 7.108 8.358 13.926 12.426 22.512ZM38.535 89.564c-5.184-10.987-9.458-21.844-12.633-32.041 10.16-2.876 21.607-5.122 34.132-6.56-4.285 6.75-8.401 13.692-12.297 20.792-3.249 5.916-6.29 11.84-9.202 17.81ZM128 30.947c6.395 7.408 12.644 15.4 18.624 23.91a239.2 239.2 0 0 0-18.706-.418c-6.16 0-12.211.148-18.103.415 5.912-8.454 12.004-16.402 18.185-23.907ZM202.25 53.406c12.34 7.124 16.162 28.172 10.523 55.517a145.53 145.53 0 0 1-1.157 5.07c-10.277-2.464-21.437-4.348-33.276-5.592 6.941-9.53 13.358-19.603 18.914-30.153a138.878 138.878 0 0 0 4.996-24.842ZM74.543 27.753c14.32-14.262 29.958-21.128 38.886-16.982 9.273 4.306 12.837 22.14 8.834 46.53-.32 1.944-.677 3.852-1.063 5.726-10.93-2.234-22.776-3.89-35.19-4.88-7.163-9.77-13.758-18.87-19.53-27.16a138.04 138.04 0 0 1 8.063-3.234ZM66.352 120.088c-2.4-4.615-4.68-9.252-6.84-13.89-2.155-4.627-4.178-9.23-6.078-13.8 3.76-1.04 7.673-2 11.724-2.874a296.392 296.392 0 0 0 1.194 30.564ZM88.756 166.07a310.208 310.208 0 0 1-12.21-22.137c4.094.652 8.31 1.125 12.627 1.41a295.96 295.96 0 0 1-.417 20.727ZM128.122 224.293c-8.462-5.133-16.37-15.005-23.14-27.78a296.094 296.094 0 0 0 23.118.86 296.094 296.094 0 0 0 23.178-.882c-6.746 12.687-14.66 22.503-23.156 27.802ZM167.604 166.016a311.906 311.906 0 0 1-.38-20.68c4.332-.28 8.572-.756 12.695-1.417a310.21 310.21 0 0 1-12.315 22.097ZM189.902 120.024c2.054 4.36 3.99 8.735 5.808 13.103-3.86 1.063-7.872 2.053-12.024 2.958a295.396 295.396 0 0 0 6.216-16.06ZM128.067 100.855c7.66 0 13.91 6.25 13.91 13.91 0 7.66-6.25 13.91-13.91 13.91-7.66 0-13.91-6.25-13.91-13.91 0-7.66 6.25-13.91 13.91-13.91Z" fill="#61DAFB"/>
            </svg>
          </motion.div>

          {/* Node.js — #339933 */}
          <motion.div
            animate={{ y: [0, 22, 0], x: [0, -12, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-[18%] right-[8%]"
          >
            <svg width="50" height="50" viewBox="0 0 256 289" opacity="0.12">
              <path d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.155.795-.53 1.855-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.59 1.59-2.915V83.08c0-1.325-.53-2.385-1.59-2.915L128.53 19.167c-1.06-.53-2.385-.53-3.18 0L19.875 80.165c-1.06.53-1.59 1.855-1.59 2.915v122.17c0 1.06.53 2.385 1.59 2.915l28.887 16.695c15.635 7.95 25.44-1.325 25.44-10.6V93.15c0-1.59 1.325-3.18 3.18-3.18h13.25c1.59 0 3.18 1.325 3.18 3.18v121.11c0 20.936-11.395 33.126-31.27 33.126-6.095 0-10.865 0-24.38-6.625L10.6 224.43C4.24 220.985 0 214.36 0 207.205V85.035c0-7.155 4.24-13.78 10.6-17.225L116.34 6.593c6.095-3.445 14.31-3.445 20.405 0l105.74 61.217c6.36 3.445 10.6 10.07 10.6 17.225v122.17c0 7.155-4.24 13.78-10.6 17.225l-105.74 61.217c-2.915 1.59-6.625 2.65-10.6 2.65l-.145.168Z" fill="#339933"/>
            </svg>
          </motion.div>

          {/* Tailwind CSS — #06B6D4 */}
          <motion.div
            animate={{ y: [0, -25, 0], rotate: [0, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            className="absolute bottom-[25%] left-[4%]"
          >
            <svg width="65" height="40" viewBox="0 0 256 154" opacity="0.14">
              <path d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0ZM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8Z" fill="#06B6D4"/>
            </svg>
          </motion.div>

          {/* Firebase — #FFCA28 */}
          <motion.div
            animate={{ y: [0, 15, 0], x: [0, 15, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[15%] right-[6%]"
          >
            <svg width="40" height="55" viewBox="0 0 256 351" opacity="0.12">
              <path d="m0 282.998 2.123-2.972L102.527 89.512l.212-2.017L58.48 4.358C54.77-2.606 44.33-.845 43.114 6.951L0 282.998Z" fill="#FFA000"/>
              <path d="m135.005 150.38 32.955-33.75-32.965-62.93c-3.129-5.957-11.866-5.975-14.962 0L102.42 87.287v2.86l32.584 60.233Z" fill="#F57C00"/>
              <path d="m0 282.998.962-.968 3.496-1.42 128.477-128 1.628-4.431-32.05-61.074z" fill="#FFCA28"/>
              <path d="M139.121 347.551 256 282.998l-32.073-198.69c-2.837-14.958-21.1-15.463-24.556-.946L0 282.998l115.608 64.553a24.166 24.166 0 0 0 23.513 0" fill="#FFCA28"/>
            </svg>
          </motion.div>

          {/* TypeScript — #3178C6 */}
          <motion.div
            animate={{ y: [0, -16, 0], x: [0, -10, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute top-[45%] left-[3%]"
          >
            <svg width="45" height="45" viewBox="0 0 256 256" opacity="0.10">
              <rect width="256" height="256" rx="20" fill="#3178C6"/>
              <path d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.15 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.717 10.669-11.434 2.62-4.717 3.932-10.58 3.932-17.59 0-5.063-.882-9.434-2.648-13.112a35.705 35.705 0 0 0-7.418-10.23c-3.178-3.06-6.94-5.766-11.283-8.119a140.077 140.077 0 0 0-14.578-6.95c-3.88-1.611-7.36-3.165-10.44-4.662-3.08-1.497-5.708-3.05-7.882-4.662-2.174-1.612-3.853-3.338-5.04-5.18-1.185-1.84-1.778-3.91-1.778-6.2 0-2.117.536-4.033 1.607-5.748 1.07-1.726 2.562-3.222 4.473-4.49 1.911-1.267 4.184-2.23 6.82-2.888 2.635-.66 5.537-.99 8.706-.99 2.287 0 4.69.173 7.209.518 2.52.345 5.04.893 7.562 1.641a49.505 49.505 0 0 1 7.209 2.82c2.287 1.094 4.376 2.36 6.27 3.8v-25.567c-4.143-1.669-8.735-2.89-13.776-3.665-5.04-.777-10.842-1.165-17.407-1.165-6.622 0-12.87.69-18.746 2.07-5.876 1.38-11.014 3.536-15.413 6.47-4.4 2.934-7.882 6.717-10.45 11.35-2.567 4.632-3.852 10.148-3.852 16.546 0 8.514 2.52 15.748 7.562 21.7 5.04 5.952 12.602 10.81 22.684 14.573 3.97 1.497 7.677 2.994 11.12 4.49 3.443 1.497 6.414 3.108 8.913 4.834 2.498 1.726 4.473 3.623 5.923 5.694 1.45 2.072 2.174 4.433 2.174 7.086 0 1.955-.478 3.796-1.436 5.522-.957 1.726-2.39 3.222-4.3 4.49-1.91 1.266-4.3 2.26-7.18 2.977-2.88.718-6.2 1.078-9.97 1.078-6.447 0-12.77-1.21-18.97-3.627-6.196-2.418-11.848-5.925-16.953-10.523ZM113.34 135.69H81.31v-24.35h90.326v24.35h-32.03v89.64h-26.27v-89.64Z" fill="white"/>
            </svg>
          </motion.div>

          {/* Next.js — white */}
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute top-[8%] left-[42%]"
          >
            <svg width="48" height="48" viewBox="0 0 256 256" opacity="0.08">
              <circle cx="128" cy="128" r="128" fill="white"/>
              <path d="M212.634 193.772c-2.058 0-3.349-1.235-3.92-2.282L153.483 107.06v60.478c0 2.64-1.69 4.345-4.32 4.345h-8.16c-2.64 0-4.344-1.705-4.344-4.344V89.29c0-2.64 1.705-4.345 4.345-4.345h9.176c2.07 0 3.377 1.253 3.978 2.33l54.694 83.57V89.29c0-2.64 1.705-4.345 4.345-4.345h8.144c2.64 0 4.345 1.705 4.345 4.345v78.253c0 2.64-1.706 4.345-4.345 4.345h-8.707Zm-92.378-4.345c0 2.64-1.705 4.345-4.345 4.345h-8.143c-2.64 0-4.345-1.705-4.345-4.345V89.274c0-2.64 1.706-4.345 4.345-4.345h8.143c2.64 0 4.345 1.705 4.345 4.345v100.153Z" fill="#0a0a0a"/>
            </svg>
          </motion.div>

          {/* MongoDB — #47A248 */}
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 8, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
            className="absolute bottom-[35%] right-[3%]"
          >
            <svg width="30" height="65" viewBox="0 0 256 549" opacity="0.12">
              <path d="M175.622 61.108C152.612 33.807 132.797 6.078 128.749.32a1.03 1.03 0 0 0-1.497 0c-4.048 5.759-23.863 33.487-46.873 60.788-197.507 251.896 31.48 421.08 31.48 421.08l1.993 1.168c.856 12.107 2.996 30.387 2.996 30.387h11.157s2.139-18.28 2.996-30.387l1.993-1.168s228.987-169.184 31.48-421.08h.148Z" fill="#47A248"/>
              <path d="M128.545 455.26s-2.139-1.496-3.307-2.663v-66.744s3.307 52.644 3.307 69.407Z" fill="#47A248" opacity="0.4"/>
            </svg>
          </motion.div>

          {/* Docker — #2496ED */}
          <motion.div
            animate={{ y: [0, 18, 0], x: [0, -14, 0] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            className="absolute top-[60%] right-[12%]"
          >
            <svg width="55" height="40" viewBox="0 0 256 185" opacity="0.10">
              <path d="M250.716 70.497c-5.033-3.407-16.633-4.64-25.558-2.92-1.233-9.128-6.472-17.06-15.87-24.17l-5.397-3.613-3.614 5.397c-6.844 10.534-8.68 27.837-1.556 38.897-3.198 1.83-9.607 4.317-18.024 4.155H.463l-.463 2.793c-2.24 13.143-.058 62.168 29.263 100.68C52.538 220.14 85.507 234 127.84 234c80.132 0 139.44-36.928 167.4-104.122 10.94.242 34.48.14 46.568-23.082.312-.559 1.037-1.918 3.138-6.3l1.15-2.51-4.38-2.969Zm-204.63-12.34h-26.61v26.61h26.61V58.158Zm0-31.237h-26.61v26.61h26.61V26.92Zm31.237 31.237H50.712v26.61h26.611V58.158Zm0-31.237H50.712v26.61h26.611V26.92Zm31.236 62.474H81.949v26.61h26.61V89.395Zm0-31.237H81.949v26.61h26.61V58.158Zm0-31.237H81.949v26.61h26.61V26.92Zm31.237 62.475H113.186v26.61h26.61V89.395Zm0-31.237H113.186v26.61h26.61V58.158Zm31.236 31.237h-26.61v26.61h26.61V89.395Z" fill="#2496ED"/>
            </svg>
          </motion.div>

          {/* Git — #F05032 */}
          <motion.div
            animate={{ y: [0, -14, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[70%] left-[10%]"
          >
            <svg width="45" height="45" viewBox="0 0 256 256" opacity="0.10">
              <path d="M251.172 116.594 139.4 4.828c-6.433-6.437-16.873-6.437-23.314 0l-23.21 23.21 29.443 29.443c6.842-2.312 14.688-.761 20.142 4.693 5.48 5.489 7.02 13.402 4.652 20.266l28.375 28.376c6.865-2.368 14.786-.828 20.267 4.66 7.663 7.66 7.663 20.075 0 27.74-7.665 7.666-20.08 7.666-27.749 0-5.764-5.77-7.188-14.236-4.27-21.324l-26.462-26.462-.003 69.637c1.868.926 3.634 2.11 5.192 3.666 7.66 7.663 7.66 20.08 0 27.747-7.664 7.662-20.085 7.662-27.74 0-7.663-7.668-7.663-20.084 0-27.747 1.967-1.966 4.22-3.42 6.623-4.373V86.932a21.484 21.484 0 0 1-6.623-4.382c-5.8-5.8-7.188-14.328-4.197-21.453L83.28 31.67 4.82 110.127c-6.44 6.44-6.44 16.884 0 23.322L116.59 245.22c6.44 6.437 16.873 6.437 23.316 0l111.282-105.3c6.433-6.442 6.433-16.88-.016-23.326" fill="#F05032"/>
            </svg>
          </motion.div>

          {/* Figma — multicolor */}
          <motion.div
            animate={{ y: [0, 22, 0], x: [0, 10, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
            className="absolute bottom-[8%] left-[40%]"
          >
            <svg width="30" height="45" viewBox="0 0 256 384" opacity="0.12">
              <path d="M64 384c35.328 0 64-28.672 64-64v-64H64c-35.328 0-64 28.672-64 64s28.672 64 64 64Z" fill="#0ACF83"/>
              <path d="M0 192c0-35.328 28.672-64 64-64h64v128H64c-35.328 0-64-28.672-64-64Z" fill="#A259FF"/>
              <path d="M0 64C0 28.672 28.672 0 64 0h64v128H64C28.672 128 0 99.328 0 64Z" fill="#F24E1E"/>
              <path d="M128 0h64c35.328 0 64 28.672 64 64s-28.672 64-64 64h-64V0Z" fill="#FF7262"/>
              <path d="M256 192c0 35.328-28.672 64-64 64s-64-28.672-64-64 28.672-64 64-64 64 28.672 64 64Z" fill="#1ABCFE"/>
            </svg>
          </motion.div>

          {/* AWS — #FF9900 */}
          <motion.div
            animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
            transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute top-[30%] right-[4%]"
          >
            <svg width="55" height="33" viewBox="0 0 256 153" opacity="0.08">
              <path d="M72.392 55.438c0 3.137.34 5.68.933 7.545a45.373 45.373 0 0 0 2.712 6.103c.424.678.593 1.356.593 1.865 0 .848-.508 1.695-1.61 2.543l-5.34 3.56c-.763.509-1.525.763-2.205.763-.848 0-1.695-.424-2.543-1.187a26.197 26.197 0 0 1-3.052-3.984c-.848-1.44-1.695-3.052-2.627-4.917-6.612 7.798-14.92 11.698-24.922 11.698-7.12 0-12.8-2.035-16.953-6.103-4.153-4.07-6.272-9.497-6.272-16.276 0-7.205 2.543-13.054 7.714-17.462 5.17-4.408 12.037-6.612 20.768-6.612 2.882 0 5.849.254 8.985.678 3.137.424 6.358 1.102 9.749 1.78V29.33c0-6.442-1.356-10.935-3.984-13.563-2.712-2.627-7.29-3.9-13.817-3.9-2.967 0-6.018.34-9.155 1.102-3.136.763-6.188 1.695-9.155 2.882-.593.254-1.356.508-2.12.678-.254.085-.593.17-.848.17-1.186 0-1.78-.848-1.78-2.628v-4.153c0-1.356.17-2.374.593-2.967.424-.593 1.187-1.187 2.374-1.78 2.967-1.525 6.527-2.797 10.68-3.815C33.908.424 38.23 0 42.722 0c10.342 0 17.885 2.374 22.716 7.12 4.747 4.747 7.12 11.952 7.12 21.616v28.483l-.166.22Z" fill="#252F3E"/>
              <path d="M233.364 80.91c-17.123 12.63-41.961 19.328-63.358 19.328-29.977 0-56.98-11.08-77.397-29.508-1.61-1.441-.17-3.39 1.78-2.288 22.038 12.8 49.296 20.514 77.482 20.514 18.989 0 39.916-3.984 59.16-12.122 2.882-1.271 5.34 1.865 2.333 4.076Z" fill="#FF9900"/>
              <path d="M240.57 72.604c-2.203-2.797-14.496-1.356-20.089-.678-1.695.17-1.95-1.271-.424-2.374 9.834-6.95 25.938-4.917 27.804-2.627 1.865 2.374-.508 18.648-9.749 26.446-1.44 1.187-2.797.509-2.12-.933 2.035-5.17 6.612-16.953 4.578-19.834Z" fill="#FF9900"/>
            </svg>
          </motion.div>

        </div>

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

          {/* Cards Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* FRONTEND HERO CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
              className="lg:col-span-2 bg-[#0d0d0d] border border-[#1a1a1a] border-t-2 border-t-orange-500 rounded-[16px] p-8 md:p-10 relative overflow-hidden group hover:border-[#2a2a2a] hover:border-t-orange-500 hover:-translate-y-1.5 transition-all duration-400 shadow-2xl"
            >
              {/* Subtle top-left glow */}
              <div className="absolute top-0 left-0 w-48 h-48 bg-orange-500/5 blur-[80px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700"></div>
              {/* Dot grid pattern bg */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,1) 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="max-w-xs">
                  <Code2 size={32} className="text-orange-500 mb-6" />
                  <h3 className="text-[22px] font-bold text-white tracking-[0.1em] uppercase mb-3">Frontend<br/>Engineering</h3>
                  <p className="text-[#555] text-[14px] leading-[1.7]">
                    Architecting scalable, zero-latency user interfaces with modern reactive paradigms.
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-6">
                  {[
                    { icon: Atom, name: "React" },
                    { icon: Triangle, name: "Next.js" },
                    { icon: Box, name: "Three.js" },
                    { icon: Wind, name: "Tailwind" },
                    { icon: LayoutTemplate, name: "Framer" }
                  ].map((tech, i) => (
                    <motion.div 
                      key={tech.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + (i * 0.08) }}
                      className="flex flex-col items-center gap-3 cursor-pointer group/logo"
                    >
                      <div className="text-white/20 group-hover/logo:text-white group-hover/logo:scale-110 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <tech.icon size={48} strokeWidth={1.5} className="group-hover/logo:text-orange-500 transition-colors duration-400" />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#555] tracking-[0.05em] group-hover/logo:text-orange-500 transition-colors duration-400">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>


            {/* BACKEND CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16,1,0.3,1] }}
              className="lg:col-span-1 bg-[#0d0d0d] border border-[#1a1a1a] border-t-2 border-t-orange-500 rounded-[16px] p-8 md:p-10 relative overflow-hidden group hover:border-[#2a2a2a] hover:border-t-orange-500 hover:-translate-y-1.5 transition-all duration-400 shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/5 blur-[60px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700"></div>

              <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                <div>
                  <Server size={32} className="text-orange-500 mb-6" />
                  <h3 className="text-[18px] font-bold text-white tracking-[0.1em] uppercase">Backend Systems</h3>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-6">
                  {[
                    { icon: Hexagon, name: "Node.js" },
                    { icon: Database, name: "PostgreSQL" },
                    { icon: Leaf, name: "MongoDB" },
                    { icon: Flame, name: "Firebase" },
                    { icon: Network, name: "REST APIs" }
                  ].map((tech, i) => (
                    <motion.div 
                      key={tech.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + (i * 0.08) }}
                      className="flex flex-col items-center gap-3 cursor-pointer group/logo"
                    >
                      <div className="text-white/20 group-hover/logo:text-white group-hover/logo:scale-110 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <tech.icon size={32} strokeWidth={1.5} className="group-hover/logo:text-orange-500 transition-colors duration-400" />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#555] tracking-[0.05em] group-hover/logo:text-orange-500 transition-colors duration-400">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>


            {/* UI/UX CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.16,1,0.3,1] }}
              className="lg:col-span-1 bg-[#0d0d0d] border border-[#1a1a1a] border-t-2 border-t-orange-500 rounded-[16px] p-8 md:p-10 relative overflow-hidden group hover:border-[#2a2a2a] hover:border-t-orange-500 hover:-translate-y-1.5 transition-all duration-400 shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/5 blur-[60px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700"></div>

              <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                <div>
                  <PenTool size={32} className="text-orange-500 mb-6" />
                  <h3 className="text-[18px] font-bold text-white tracking-[0.1em] uppercase">UI/UX Design</h3>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-6">
                  {[
                    { icon: FigmaIcon, name: "Figma" },
                    { icon: LayoutTemplate, name: "Framer" },
                    { icon: Box, name: "Spline" }
                  ].map((tech, i) => (
                    <motion.div 
                      key={tech.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 + (i * 0.08) }}
                      className="flex flex-col items-center gap-3 cursor-pointer group/logo"
                    >
                      <div className="text-white/20 group-hover/logo:text-white group-hover/logo:scale-110 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <tech.icon size={32} strokeWidth={1.5} className="group-hover/logo:text-orange-500 transition-colors duration-400" />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-[#555] tracking-[0.05em] group-hover/logo:text-orange-500 transition-colors duration-400">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* TOOLS BANNER */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.36, ease: [0.16,1,0.3,1] }}
              className="lg:col-span-2 mt-4 border-t border-[#1a1a1a] pt-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <h3 className="text-[18px] font-bold text-white tracking-[0.1em] uppercase">Tools & DevOps</h3>
              
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: GitBranch, name: "Git Systems" },
                  { icon: Box, name: "Docker" },
                  { icon: Cloud, name: "AWS Edge" },
                  { icon: Triangle, name: "Vercel" },
                  { icon: RefreshCw, name: "CI/CD" }
                ].map((tech, i) => (
                  <motion.div 
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.7 + (i * 0.05) }}
                    className="flex items-center gap-2 bg-[#161616] px-[12px] py-[6px] rounded-[6px] border border-[#222] hover:border-orange-500/40 hover:bg-[#1a1a1a] transition-all cursor-pointer group/pill"
                  >
                    <tech.icon size={14} className="text-[#666] group-hover/pill:text-orange-500 transition-colors duration-400" />
                    <span className="text-[12px] text-[#888] font-medium tracking-wide group-hover/pill:text-white transition-colors duration-400">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

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
