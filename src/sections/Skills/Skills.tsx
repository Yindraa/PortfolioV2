"use client";

import { portfolioData } from "../../lib/data";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  Transition,
} from "framer-motion";
import { MouseEvent } from "react";

interface SkillsProps {
  lang: "id" | "en";
}

export default function Skills({ lang }: SkillsProps) {
  const { skills } = portfolioData;
  const content = portfolioData[lang];

  const getSkillLogo = (skillName: string) => {
    const found = skills.find((s) => s.name === skillName);
    return found ? found.logo : "";
  };

  const row1 = skills.slice(0, Math.ceil(skills.length / 2));
  const row2 = skills.slice(Math.ceil(skills.length / 2));

  return (
    <section
      id="keahlian"
      className="w-full bg-[#050505] text-white py-24 relative overflow-hidden border-t border-white/5"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-mono tracking-[0.3em] text-emerald-400 uppercase mb-4"
        >
          {lang === "id" ? "Ekosistem Teknologi" : "Tech Ecosystem"}
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-medium text-gray-100"
        >
          {lang === "id" ? "Alat & Keahlian" : "Tools & Expertise"}
        </motion.h3>
      </div>

      {/* --- 1. MARQUEE --- */}
      <div className="relative w-full flex flex-col gap-6 mb-24">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none"></div>

        <div className="flex overflow-hidden group">
          <motion.div
            className="flex gap-6 px-4"
            animate={{ x: "-50%" }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          >
            {[...row1, ...row1, ...row1].map((skill, idx) => (
              <SkillCard key={`r1-${idx}`} skill={skill} />
            ))}
          </motion.div>
        </div>

        <div className="flex overflow-hidden group">
          <motion.div
            className="flex gap-6 px-4"
            initial={{ x: "-50%" }}
            animate={{ x: "0%" }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          >
            {[...row2, ...row2, ...row2].map((skill, idx) => (
              <SkillCard key={`r2-${idx}`} skill={skill} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* --- 2. GRID CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        {/* KIRI: Layanan & Fokus */}
        <div>
          <h4 className="text-xl font-medium text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-emerald-400"></span>
            {lang === "id" ? "Layanan & Fokus Utama" : "Services & Focus"}
          </h4>
          <div className="flex flex-col gap-4">
            {content.services.map((service, idx) => (
              <SpotlightCard key={idx} delay={idx * 0.1}>
                <div className="flex items-start gap-4 mb-4 relative z-10">
                  <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors duration-300 h-fit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={service.icon}
                      />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-lg font-medium text-gray-200 mb-1 group-hover:text-emerald-300 transition-colors">
                      {service.title}
                    </h5>
                    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                      {service.desc}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div className="pl-[60px] flex flex-wrap gap-2 relative z-10">
                  {service.relatedSkills.map((skillName, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/40 border border-white/10 text-[11px] text-gray-400 group-hover:border-emerald-500/30 group-hover:text-gray-200 transition-colors"
                    >
                      <img
                        src={getSkillLogo(skillName)}
                        alt=""
                        className="w-3 h-3 opacity-60 grayscale group-hover:grayscale-0 transition-all"
                      />
                      <span>{skillName}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* KANAN: Sertifikat */}
        <div>
          <h4 className="text-xl font-medium text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-emerald-400"></span>
            {lang === "id"
              ? "Sertifikasi & Lisensi"
              : "Certifications & Licenses"}
          </h4>

          <div className="grid grid-cols-1 gap-4">
            {content.certificates.map((cert, idx) => (
              <SpotlightCard key={cert.id} delay={idx * 0.1}>
                <div className="flex justify-between items-center relative z-10">
                  <div>
                    <h5 className="text-md font-medium text-gray-100 mb-1 group-hover:text-emerald-300 transition-colors">
                      {cert.title}
                    </h5>
                    <div className="flex items-center gap-3 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                      <span>{cert.issuer}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                      <span className="text-emerald-500/80 font-mono">
                        {cert.date}
                      </span>
                    </div>
                  </div>

                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/5 text-gray-400 hover:bg-emerald-500 hover:text-black transition-all z-20"
                    title="View Credential"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- SUB COMPONENTS ---

// 1. Komponen Kartu dengan Efek Spotlight (Mouse Follow)
function SpotlightCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    // Kalkulasi posisi kursor
    const x = clientX - left;
    const y = clientY - top;
    mouseX.set(x);
    mouseY.set(y);

    // Kalkulasi kemiringan 3D
    const MAX_ROTATION = 15;
    const calcX = (-(y - height / 2) / (height / 2)) * MAX_ROTATION;
    const calcY = ((x - width / 2) / (width / 2)) * MAX_ROTATION;

    rotateX.set(calcX);
    rotateY.set(calcY);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  // FIX ERROR TYPESCRIPT: Definisikan tipe Transition secara eksplisit
  const springTransition: Transition = {
    type: "spring",
    stiffness: 150,
    damping: 20,
  };

  return (
    // 1. WRAPPER LUAR (SENSOR): Diam, menangani mouse event & animasi muncul (entrance)
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay }}
      className="h-full perspective-1000" // Class perspective penting untuk efek 3D
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 2. KONTAINER DALAM (AKTOR): Bergerak, miring, dan memiliki styling kartu */}
      <motion.div
        className="group relative border border-white/10 bg-white/[0.02] overflow-hidden rounded-xl px-6 py-6 h-full transition-colors hover:border-white/20"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        // Scale diterapkan di sini agar tidak mempengaruhi ukuran wrapper sensor
        whileHover={{ scale: 1.02 }}
        transition={springTransition}
      >
        {/* Layer Spotlight */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                500px circle at ${mouseX}px ${mouseY}px,
                rgba(16, 185, 129, 0.15),
                transparent 80%
              )
            `,
            transform: "translateZ(0px)", // Pastikan di layer yang benar
          }}
        />

        {/* Konten Kartu */}
        <div
          className="relative h-full"
          style={{ transform: "translateZ(20px)" }}
        >
          {/* translateZ(20px) membuat teks terasa lebih timbul dari background */}
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

// 2. Komponen Kartu Skill Marquee
function SkillCard({ skill }: { skill: any }) {
  return (
    <div className="relative flex items-center gap-3 bg-white/5 border border-white/5 px-5 py-2.5 rounded-full shrink-0 hover:bg-white/10 hover:border-white/20 transition-all cursor-default group/card">
      <img
        src={skill.logo}
        alt={skill.name}
        className="w-5 h-5 opacity-50 group-hover/card:opacity-100 transition-opacity grayscale group-hover/card:grayscale-0"
      />
      <span className="text-sm font-medium text-gray-500 group-hover/card:text-white transition-colors">
        {skill.name}
      </span>
    </div>
  );
}
