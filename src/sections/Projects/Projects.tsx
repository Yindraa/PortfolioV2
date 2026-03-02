"use client";

import { useState, useEffect } from "react";
import { portfolioData } from "../../lib/data";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectsProps {
  lang: "id" | "en";
}

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
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>

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

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all border ${
                  filter === cat
                    ? "bg-emerald-500 text-black border-emerald-500"
                    : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- MAIN GRID (Kembali ke Grid Kompak) --- */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                layoutId={`card-${project.id}`}
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedId(project.id)}
                className="group cursor-pointer relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-colors"
              >
                {/* Thumbnail Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110"
                />

                {/* Overlay Info */}
                {/* MOBILE: Opacity 100 (Selalu Muncul). DESKTOP: Opacity 0 (Muncul saat Hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-emerald-400 text-xs font-mono mb-2">
                    {project.category}
                  </span>
                  <h4 className="text-lg font-bold text-white">
                    {project.title}
                  </h4>
                  <p className="text-xs text-gray-300 mt-2 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-white/80">
                    <span>
                      {lang === "id"
                        ? "Klik untuk detail"
                        : "Click for details"}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --- MODAL DETAIL (Dengan Image Slider) --- */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              layoutId={`card-${selectedId}`}
              className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:h-[600px]"
            >
              {/* Tombol Close */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-30 p-2 bg-black/50 rounded-full text-white hover:bg-emerald-500 hover:text-black transition-colors border border-white/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* --- KIRI: IMAGE SLIDER --- */}
              <div className="w-full md:w-[55%] bg-black relative flex items-center justify-center group/slider overflow-hidden h-[300px] md:h-full shrink-0">
                {/* Gambar Aktif */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImgIndex}
                    src={
                      selectedProject.gallery &&
                      selectedProject.gallery.length > 0
                        ? selectedProject.gallery[currentImgIndex]
                        : selectedProject.image
                    }
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    alt="Project Preview"
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Tombol Navigasi Slider (Hanya muncul jika ada galeri) */}
                {selectedProject.gallery &&
                  selectedProject.gallery.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-4 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-emerald-500 hover:text-black"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5 8.25 12l7.5-7.5"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-4 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-emerald-500 hover:text-black"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </button>

                      {/* Indikator Titik (Dots) */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedProject.gallery.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImgIndex ? "bg-emerald-400 w-4" : "bg-white/50"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
              </div>

              {/* --- KANAN: DETAIL INFO --- */}
              <div className="w-full md:w-[45%] p-6 md:p-8 flex flex-col h-full overflow-y-auto bg-[#0a0a0a]">
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
                    Teknologi:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex gap-4 pt-6 border-t border-white/10 shrink-0">
                  {selectedProject.linkUrl && (
                    <a
                      href={selectedProject.linkUrl}
                      target="_blank"
                      className="flex-1 py-3 bg-emerald-500 text-black text-center font-bold text-sm rounded hover:bg-emerald-400 transition-colors"
                    >
                      {lang === "id" ? "Lihat Demo" : "Live Demo"}
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      className="flex-1 py-3 bg-white/10 text-white text-center font-bold text-sm rounded hover:bg-white/20 transition-colors border border-white/10"
                    >
                      GitHub Repo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
