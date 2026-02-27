"use client";

import { useState, MouseEvent, useEffect } from "react";
import Beams from "../../animations/Beams";
import { motion, Variants } from "framer-motion";

const projectImages = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
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
        type: "spring", // Sekarang TypeScript tidak akan protes lagi!
        stiffness: 120,
        damping: 14,
      },
    },
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

      {/* --- Edge Navigations --- */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-8 z-20">
        <a
          href="#"
          className="text-xs font-mono tracking-widest text-gray-500 hover:text-white transition-colors [writing-mode:vertical-lr] rotate-180"
        >
          GITHUB
        </a>
        <a
          href="#"
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

        <motion.div variants={itemVariants} className="mt-12 flex gap-6">
          <button className="text-sm uppercase tracking-widest font-semibold pb-1 border-b border-white/30 hover:border-white transition-colors">
            {t.btn}
          </button>
        </motion.div>
      </motion.div>

      {/* --- Scroll Indicator --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 opacity-60">
        <span className="text-[10px] font-mono tracking-[0.2em] text-gray-400 uppercase">
          {t.scroll}
        </span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[scroll-down_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </section>
  );
}
