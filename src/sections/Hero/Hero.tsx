"use client";

import { useState, MouseEvent, useEffect } from "react";
import Beams from "../../animations/Beams";
import { motion, Variants } from "framer-motion";

const projectImages = [
  "/proyek/p5-1.jpeg",
  "/about/leilem-1.jpeg",
  "/about/jte-4.jpeg",
];

const content = {
  id: {
    badge: "Tersedia untuk eksplorasi proyek baru",
    title1: "Membangun",
    title2: "Pengalaman Digital",
    desc: "Fokus pada performa, aksesibilitas, dan arsitektur kode yang bersih menggunakan ekosistem Next.js.",
    btn: "Lihat Karya Saya",
    scroll: "SCROLL",
  },
  en: {
    badge: "Available for new project exploration",
    title1: "Building",
    title2: "Digital Experiences",
    desc: "Focused on performance, accessibility, and clean code architecture using the Next.js ecosystem.",
    btn: "View My Work",
    scroll: "SCROLL",
  },
};

interface HeroProps {
  lang: "id" | "en";
}

export default function Hero({ lang }: HeroProps) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnterText = () => {
    setIsHovering(true);
    setImgIndex((prevIndex) => (prevIndex + 1) % projectImages.length);
  };

  const t = content[lang];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
      },
    },
  };

  // Smooth scroll ke section proyek
  const scrollToProjects = () => {
    const el = document.getElementById("proyek");
    if (el) {
      window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative w-full min-h-screen bg-[#050505] text-white overflow-hidden flex items-center justify-center font-sans"
      onMouseMove={handleMouseMove}
    >
      {/* --- Background Layer --- */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:32px_32px] opacity-30 pointer-events-none"></div>

      {/* 2. Mengganti LightRays dengan Beams */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={3}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>

      {/* --- Floating Image Reveal --- */}
      {isMounted && (
        <div
          className={`fixed pointer-events-none z-10 w-64 h-80 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
            transform: `translate(-50%, -50%) ${isHovering ? "scale(1) rotate(-3deg)" : "scale(0.95) rotate(0deg)"}`,
          }}
        >
          <img
            key={projectImages[imgIndex]}
            src={projectImages[imgIndex]}
            alt="Project Showcase"
            className="w-full h-full object-cover opacity-90 animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      )}

      {/* --- Edge Navigations (Desktop) --- */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-8 z-30">
        <a
          href="https://github.com/Yindraa"
          className="text-xs font-mono tracking-widest text-gray-500 hover:text-white transition-colors [writing-mode:vertical-lr] rotate-180"
        >
          GITHUB
        </a>
        <a
          href="https://linkedin.com/in/made-narayindra-10aa24244"
          className="text-xs font-mono tracking-widest text-gray-500 hover:text-white transition-colors [writing-mode:vertical-lr] rotate-180"
        >
          LINKEDIN
        </a>
      </div>

      {/* --- Main Foreground Content --- */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center w-full px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
          <span className="text-sm font-medium text-gray-300 tracking-wide">
            {t.badge}
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] text-gray-100 transition-all"
        >
          {t.title1} <br />
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 cursor-pointer transition-all duration-500 relative"
            onMouseEnter={handleMouseEnterText}
            onMouseLeave={() => setIsHovering(false)}
          >
            {t.title2}
            <span
              className={`absolute -bottom-2 left-0 h-[2px] bg-white/30 transition-all duration-500 ${isHovering ? "w-full" : "w-0"}`}
            ></span>
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl font-light leading-relaxed"
        >
          {t.desc}
        </motion.p>

        {/* --- CTA Button (Redesigned) --- */}
        <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row items-center gap-5">
          <button
            onClick={scrollToProjects}
            className="group relative px-8 py-3.5 bg-emerald-500 text-black font-semibold text-sm uppercase tracking-widest rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:scale-105 active:scale-100"
          >
            {/* Shine sweep effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            <span className="relative flex items-center gap-2">
              {t.btn}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>

          {/* Social Links (Mobile — visible below CTA) */}
          <div className="flex lg:hidden items-center gap-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* --- Scroll Indicator --- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] text-gray-400 uppercase">
          {t.scroll}
        </span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[scroll-down_1.5s_ease-in-out_infinite]"></div>
        </div>
      </motion.div>
    </section>
  );
}
