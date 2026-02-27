"use client";

import { useState } from "react";
import { portfolioData } from "../../lib/data";
import { motion, AnimatePresence } from "framer-motion";
import Stack from "../../animations/Stack"; // Memanggil efek tumpukan foto

interface ProfileProps {
  lang: "id" | "en";
}

export default function Profile({ lang }: ProfileProps) {
  const data = portfolioData[lang];
  const [expandedExp, setExpandedExp] = useState<string | null>(null);

  const toggleGallery = (id: string) => {
    setExpandedExp(expandedExp === id ? null : id);
  };

  return (
    <section
      id="profil"
      className="w-full bg-[#050505] text-white pt-24 pb-32 px-6 md:px-12 relative z-10 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* --- KOLOM KIRI: TENTANG SAYA --- */}
        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* PERBAIKAN: Mengurangi jarak sticky dari top-32 ke top-24 agar seimbang dengan Navbar */}
          <div className="lg:sticky lg:top-24">
            {/* Header dengan Stack Avatar Interaktif */}
            <div className="flex flex-col xl:flex-row items-start xl:items-center gap-8 mb-10">
              {/* Wadah Animasi Stack */}
              <div
                style={{ width: 160, height: 160 }}
                className="shrink-0 relative z-20"
              >
                <Stack
                  randomRotation={true}
                  sensitivity={200}
                  sendToBackOnClick={true}
                  cards={data.about.avatars.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`profile-${i + 1}`}
                      className="w-full h-full object-cover rounded-2xl border-2 border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                    />
                  ))}
                  autoplay
                  autoplayDelay={3000}
                  pauseOnHover={false}
                />
              </div>

              <div className="mt-2 xl:mt-0">
                <h2 className="text-sm font-mono tracking-widest text-emerald-400 mb-3 uppercase flex items-center gap-3">
                  <span className="w-6 h-[1px] bg-emerald-400"></span>
                  {data.about.heading}
                </h2>
                <h3 className="text-3xl font-medium tracking-tight leading-[1.2] text-gray-100">
                  {lang === "id"
                    ? "Menghubungkan Logika & Kreativitas."
                    : "Bridging Logic & Creativity."}
                </h3>
              </div>
            </div>

            {/* Paragraf Bio */}
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light">
              {data.about.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* --- KOLOM KANAN: PENGALAMAN & TIMELINE --- */}
        <div className="lg:col-span-7 mt-8 lg:mt-6">
          <motion.h2
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-mono tracking-widest text-emerald-400 mb-10 uppercase flex items-center gap-4"
          >
            <span className="w-8 h-[1px] bg-emerald-400"></span>
            {lang === "id" ? "Riwayat Pengalaman" : "Experience History"}
          </motion.h2>

          <div className="relative border-l border-white/10 ml-3 md:ml-0 space-y-16 pb-12">
            {data.experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="relative pl-8 md:pl-12 group"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
              >
                {/* Timeline Node */}
                <div className="absolute left-[-5px] top-2.5 w-2.5 h-2.5 rounded-full bg-gray-600 group-hover:bg-emerald-400 group-hover:shadow-[0_0_12px_rgba(52,211,153,0.8)] transition-all duration-300"></div>

                {/* Header Pengalaman */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                  <div>
                    <h4 className="text-2xl font-medium text-gray-100 group-hover:text-emerald-300 transition-colors duration-300">
                      {exp.role}
                    </h4>
                    <h5 className="text-md text-emerald-400/80 mt-1 font-medium">
                      {exp.company}
                    </h5>
                  </div>
                  <span className="text-xs font-mono text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full w-fit shrink-0 mt-1 sm:mt-0">
                    {exp.duration}
                  </span>
                </div>

                {/* Deskripsi Teks */}
                <ul className="mt-6 space-y-3 text-gray-400 font-light text-sm md:text-base">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-emerald-500/50 mt-1.5 text-[10px]">
                        ■
                      </span>
                      <span className="leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>

                {/* Skill Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.skillTags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Galeri Dokumentasi Interaktif */}
                {exp.images && exp.images.length > 0 && (
                  <div className="mt-6">
                    <button
                      onClick={() => toggleGallery(exp.id)}
                      className="text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
                    >
                      {lang === "id"
                        ? "Lihat Dokumentasi"
                        : "View Documentation"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`w-3 h-3 transition-transform duration-300 ${expandedExp === exp.id ? "rotate-180" : ""}`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {expandedExp === exp.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {exp.images.map((imgUrl, i) => (
                              <div
                                key={i}
                                className="rounded-lg overflow-hidden border border-white/10 aspect-video group/img"
                              >
                                <img
                                  src={imgUrl}
                                  alt={`Documentation ${i + 1}`}
                                  className="w-full h-full object-cover opacity-70 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-500"
                                />
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
