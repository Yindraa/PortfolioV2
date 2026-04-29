"use client";

import { useState, useEffect } from "react";
import { portfolioData } from "../../lib/data";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectsProps {
  lang: "id" | "en";
}

// --- Helper: Status Badge Config ---
const statusConfig = {
  completed: {
    label: { id: "Selesai", en: "Completed" },
    color: "bg-white/10 text-gray-300 border-white/10",
    dot: "bg-gray-400",
  },
  "in-progress": {
    label: { id: "Dalam Pengembangan", en: "In Progress" },
    color: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    dot: "bg-amber-400",
  },
  live: {
    label: { id: "Live", en: "Live" },
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    dot: "bg-emerald-400",
  },
};

// --- Stagger Animation Variants ---
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function Projects({ lang }: ProjectsProps) {
  const { projects } = portfolioData[lang];

  // State Filter & Modal
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // State untuk Slider Gambar di dalam Modal
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Reset index gambar ke 0 setiap kali membuka projek baru
  useEffect(() => {
    if (selectedId) setCurrentImgIndex(0);
  }, [selectedId]);

  // Lock body scroll saat modal terbuka
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedId]);

  // Logika Filter
  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];
  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const selectedProject = projects.find((p) => p.id === selectedId);

  // Fungsi Navigasi Slider Modal
  const nextImage = () => {
    if (!selectedProject) return;
    const gallery =
      selectedProject.gallery.length > 0
        ? selectedProject.gallery
        : [selectedProject.image];
    setCurrentImgIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    if (!selectedProject) return;
    const gallery =
      selectedProject.gallery.length > 0
        ? selectedProject.gallery
        : [selectedProject.image];
    setCurrentImgIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <section
      id="proyek"
      className="w-full bg-[#050505] text-white py-24 relative z-10 border-t border-white/5 min-h-[800px]"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/3 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- HEADER & FILTER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-mono tracking-[0.3em] text-emerald-400 uppercase mb-4"
            >
              {lang === "id" ? "Karya Unggulan" : "Featured Work"}
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-medium text-gray-100"
            >
              {lang === "id" ? "Galeri Proyek" : "Project Gallery"}
            </motion.h3>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 border ${
                  filter === cat
                    ? "bg-emerald-500 text-black border-emerald-500 shadow-lg shadow-emerald-500/20"
                    : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- MAIN GRID --- */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={filter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => {
                const status = statusConfig[project.status];
                const maxVisibleTech = 3;
                const visibleTech = project.techStack.slice(0, maxVisibleTech);
                const remainingTech = project.techStack.length - maxVisibleTech;

                return (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    layout
                    layoutId={`project-card-${project.id}`}
                    onClick={() => setSelectedId(project.id)}
                    className="group cursor-pointer rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a0a0a] hover:border-emerald-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/5 flex flex-col"
                  >
                    {/* --- TOP: Thumbnail --- */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border backdrop-blur-md ${status.color}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${status.dot} ${
                              project.status === "live" ? "animate-pulse" : ""
                            }`}
                          />
                          {status.label[lang]}
                        </span>
                      </div>
                    </div>

                    {/* --- BOTTOM: Info Panel --- */}
                    <div className="p-5 flex flex-col flex-grow gap-3">
                      <span className="text-emerald-400 text-[10px] font-mono tracking-[0.2em] uppercase">
                        {project.category}
                      </span>

                      <h4 className="text-base font-semibold text-white leading-snug group-hover:text-emerald-300 transition-colors duration-300">
                        {project.title}
                      </h4>

                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 flex-grow">
                        {project.description}
                      </p>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        {visibleTech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded text-[10px] text-gray-400 font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                        {remainingTech > 0 && (
                          <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] text-emerald-400 font-mono">
                            +{remainingTech}
                          </span>
                        )}
                      </div>

                      {/* Quick Actions & Detail Link */}
                      <div className="flex items-center gap-2 mt-2 pt-3 border-t border-white/[0.06]">
                        {project.linkUrl && project.linkUrl !== "" && (
                          <a
                            href={project.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-[11px] font-medium hover:bg-emerald-500 hover:text-black transition-all duration-300 border border-emerald-500/20 hover:border-emerald-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                            Demo
                          </a>
                        )}
                        {project.githubUrl && project.githubUrl !== "" && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-gray-400 rounded-lg text-[11px] font-medium hover:bg-white/10 hover:text-white transition-all duration-300 border border-white/[0.08] hover:border-white/20"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Code
                          </a>
                        )}
                        <div className="ml-auto flex items-center gap-1.5 text-[11px] text-gray-500 group-hover:text-emerald-400 transition-colors duration-300">
                          <span className="hidden sm:inline">
                            {lang === "id" ? "Detail" : "Details"}
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* --- EMPTY STATE --- */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-300 mb-2">
                {lang === "id" ? "Belum ada proyek di kategori ini" : "No projects in this category"}
              </h4>
              <p className="text-sm text-gray-500 mb-6 max-w-sm">
                {lang === "id" ? "Coba pilih kategori lain atau lihat semua proyek." : "Try another category or view all projects."}
              </p>
              <button
                onClick={() => setFilter("All")}
                className="px-5 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-mono border border-emerald-500/20 hover:bg-emerald-500 hover:text-black transition-all duration-300"
              >
                {lang === "id" ? "Lihat Semua" : "View All"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- MODAL DETAIL --- */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Card — smooth spring animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  type: "spring",
                  damping: 28,
                  stiffness: 300,
                  mass: 0.8,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 15,
                transition: {
                  duration: 0.2,
                  ease: "easeIn" as const,
                },
              }}
              className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:h-[600px]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-30 p-2 bg-black/50 rounded-full text-white hover:bg-emerald-500 hover:text-black transition-colors border border-white/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              {/* --- LEFT: IMAGE SLIDER --- */}
              <div className="w-full md:w-[55%] bg-black relative flex items-center justify-center group/slider overflow-hidden h-[300px] md:h-full shrink-0">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImgIndex}
                    src={
                      selectedProject.gallery && selectedProject.gallery.length > 0
                        ? selectedProject.gallery[currentImgIndex]
                        : selectedProject.image
                    }
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    alt="Project Preview"
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-emerald-500 hover:text-black"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-emerald-500 hover:text-black"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProject.gallery.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setCurrentImgIndex(idx); }}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === currentImgIndex ? "bg-emerald-400 w-6" : "bg-white/40 w-1.5 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* --- RIGHT: DETAIL INFO --- */}
              <div className="w-full md:w-[45%] p-6 md:p-8 flex flex-col h-full overflow-y-auto bg-[#0a0a0a]">
                {/* Status Badge */}
                <div className="mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border ${statusConfig[selectedProject.status].color}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${statusConfig[selectedProject.status].dot} ${
                        selectedProject.status === "live" ? "animate-pulse" : ""
                      }`}
                    />
                    {statusConfig[selectedProject.status].label[lang]}
                  </span>
                </div>

                <span className="text-emerald-400 font-mono text-xs mb-2 tracking-wider uppercase">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                  {selectedProject.title}
                </h3>

                <div className="prose prose-invert prose-sm text-gray-300 leading-relaxed mb-8 flex-grow">
                  <p>{selectedProject.description}</p>
                </div>

                <div className="mb-8">
                  <h5 className="text-sm font-semibold text-white mb-3">
                    {lang === "id" ? "Teknologi:" : "Tech Stack:"}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex gap-4 pt-6 border-t border-white/10 shrink-0">
                  {selectedProject.linkUrl && selectedProject.linkUrl !== "" && (
                    <a href={selectedProject.linkUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-emerald-500 text-black text-center font-bold text-sm rounded-lg hover:bg-emerald-400 transition-colors">
                      {lang === "id" ? "Lihat Demo" : "Live Demo"}
                    </a>
                  )}
                  {selectedProject.githubUrl && selectedProject.githubUrl !== "" && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-white/10 text-white text-center font-bold text-sm rounded-lg hover:bg-white/20 transition-colors border border-white/10">
                      GitHub Repo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
