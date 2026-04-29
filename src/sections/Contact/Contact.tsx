"use client";

import { useState, useEffect } from "react";
import { portfolioData } from "../../lib/data";
import { motion, AnimatePresence } from "framer-motion";

interface ContactProps {
  lang: "id" | "en";
}

export default function Contact({ lang }: ContactProps) {
  const content = portfolioData[lang].contact;

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // State untuk focus tracking pada input
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // State untuk Waktu Lokal (Real-time)
  const [time, setTime] = useState<string>("");

  // Effect untuk menjalankan jam real-time (WITA / Asia/Makassar)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format jam ke zona waktu Manado (WITA)
      const formattedTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Makassar",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formattedTime);
    };

    updateTime(); // Setel langsung saat pertama dimuat
    const intervalId = setInterval(updateTime, 1000); // Perbarui setiap detik

    return () => clearInterval(intervalId); // Bersihkan interval saat komponen dibongkar
  }, []);

  // Simulasi pengiriman form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulasi proses pengiriman ke server (misal via EmailJS/Formspree)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: "", email: "", message: "" });

      // Kembalikan ke form setelah 5 detik
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="kontak"
      className="w-full bg-[#050505] text-white py-24 relative z-10 border-t border-white/5 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center lg:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-mono tracking-[0.3em] text-emerald-400 uppercase mb-4"
          >
            {lang === "id" ? "Hubungi Saya" : "Get in Touch"}
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-medium text-gray-100 max-w-2xl"
          >
            {lang === "id"
              ? "Mari berkolaborasi untuk menciptakan sesuatu yang luar biasa."
              : "Let's collaborate to build something extraordinary."}
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* --- KIRI: Status Widget & Direct Links --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* 1. Widget Status & Lokasi */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
              {/* Status Indicator */}
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium text-emerald-400/90 tracking-wide uppercase">
                  {content.status}
                </span>
              </div>

              {/* Waktu Lokal & Lokasi */}
              <div className="flex flex-col sm:items-end">
                <span className="text-xs text-gray-500 font-mono mb-1">
                  {content.timeLabel}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-emerald-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  {/* Tampilkan waktu, jika belum siap tampilkan "..." */}
                  <span className="font-mono w-[65px]">{time || "..."}</span>
                  <span className="text-gray-600 px-1">•</span>
                  <span>{content.location}</span>
                </div>
              </div>
            </div>

            {/* 2. Tombol Sosial & Email — Enhanced with micro-animations */}
            <div className="space-y-4">
              <ContactCard
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                }
                title="Email"
                value={content.email}
                href={`mailto:${content.email}`}
                delay={0}
              />
              <ContactCard
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                }
                title="LinkedIn"
                value={content.linkedin}
                href={`https://${content.linkedin}`}
                delay={0.05}
              />
              <ContactCard
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                }
                title="GitHub"
                value={content.github}
                href={`https://${content.github}`}
                delay={0.1}
              />
            </div>
          </motion.div>

          {/* --- KANAN: Formulir Interaktif --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors relative min-h-[450px]"
          >
            {/* AnimatePresence untuk transisi mulus Form <-> Success State */}
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                // 1. TAMPILAN FORMULIR (Belum Terkirim)
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Input: Nama */}
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className={`absolute left-4 transition-all duration-300 font-mono tracking-wider uppercase pointer-events-none ${
                        focusedField === "name" || formState.name
                          ? "text-[10px] text-emerald-400 top-2"
                          : "text-sm text-gray-500 top-3.5"
                      }`}
                    >
                      {lang === "id" ? "Nama" : "Name"}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white focus:outline-none focus:border-emerald-500 transition-all"
                    />
                    {/* Animated bottom border */}
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-emerald-500 transition-all duration-300 rounded-full ${focusedField === "name" ? "w-full" : "w-0"}`} />
                  </div>

                  {/* Input: Email */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className={`absolute left-4 transition-all duration-300 font-mono tracking-wider uppercase pointer-events-none ${
                        focusedField === "email" || formState.email
                          ? "text-[10px] text-emerald-400 top-2"
                          : "text-sm text-gray-500 top-3.5"
                      }`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white focus:outline-none focus:border-emerald-500 transition-all"
                    />
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-emerald-500 transition-all duration-300 rounded-full ${focusedField === "email" ? "w-full" : "w-0"}`} />
                  </div>

                  {/* Input: Pesan */}
                  <div className="relative">
                    <label
                      htmlFor="message"
                      className={`absolute left-4 transition-all duration-300 font-mono tracking-wider uppercase pointer-events-none ${
                        focusedField === "message" || formState.message
                          ? "text-[10px] text-emerald-400 top-2"
                          : "text-sm text-gray-500 top-3.5"
                      }`}
                    >
                      {lang === "id" ? "Pesan" : "Message"}
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formState.message}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white focus:outline-none focus:border-emerald-500 transition-all resize-none"
                    ></textarea>
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-emerald-500 transition-all duration-300 rounded-full ${focusedField === "message" ? "w-full" : "w-0"}`} />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full relative bg-emerald-500 text-black font-bold py-4 rounded-lg overflow-hidden hover:shadow-[0_0_25px_rgba(52,211,153,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {/* Shine sweep */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                    ) : (
                      <span className="relative flex items-center gap-2">
                        {lang === "id" ? "Kirim Pesan" : "Send Message"}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </span>
                    )}
                  </button>
                </motion.form>
              ) : (
                // 2. TAMPILAN SUKSES (Terkirim)
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
                >
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                    <motion.svg
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-10 h-10 text-emerald-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </motion.svg>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">
                    {content.successMsgTitle}
                  </h4>
                  <p className="text-gray-400 leading-relaxed max-w-sm">
                    {content.successMsgDesc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* --- FOOTER --- */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500 font-mono">
            &copy; {new Date().getFullYear()} Yindra. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { name: "Instagram", href: "https://www.instagram.com/yindraa_" },
              { name: "Threads", href: "https://www.threads.com/@yindraa_" },
              { name: "GitHub", href: `https://${content.github}` },
              { name: "LinkedIn", href: `https://${content.linkedin}` },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 font-mono hover:text-emerald-400 transition-colors duration-300 relative group/link"
              >
                {social.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-emerald-400 group-hover/link:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-gray-500 font-mono hover:text-emerald-400 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
            {lang === "id" ? "Kembali ke Atas" : "Back to Top"}
          </button>
        </div>
      </div>
    </section>
  );
}

// --- Sub-Component: Contact Card (Enhanced) ---
function ContactCard({
  icon,
  title,
  value,
  href,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
  delay?: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/30 hover:translate-x-1.5 transition-all duration-300 group"
    >
      <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black group-hover:rotate-6 transition-all duration-300">
        {icon}
      </div>
      <div className="flex-grow">
        <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">
          {title}
        </h4>
        <p className="text-white font-medium group-hover:text-emerald-400 transition-colors">
          {value}
        </p>
      </div>
      {/* Arrow indicator */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-4 h-4 text-gray-600 group-hover:text-emerald-400 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </motion.a>
  );
}
