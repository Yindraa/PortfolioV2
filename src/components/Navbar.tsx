"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  lang: "id" | "en";
  setLang: (lang: "id" | "en") => void;
}

const navLinks = {
  id: ["Profil", "Keahlian", "Proyek", "Kontak"],
  en: ["Profile", "Skills", "Projects", "Contact"],
};

// --- Mobile menu animation variants ---
const menuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.3, ease: "easeInOut" as const },
      opacity: { duration: 0.2 },
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      height: { duration: 0.3, ease: "easeInOut" as const },
      opacity: { duration: 0.2, delay: 0.1 },
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.25, ease: "easeInOut" as const, delay: 0.1 },
      opacity: { duration: 0.15 },
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: { duration: 0.15 },
  },
};

export default function Navbar({ lang, setLang }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // State baru untuk fitur lanjutan
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const links = navLinks[lang];
  // Menyimpan ID murni (dari bahasa Indonesia) agar logic scroll-spy tidak rusak saat bahasa diubah
  const sectionIds = navLinks.id.map((link) => link.toLowerCase());

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Efek Glassmorphism (Muncul setelah scroll 50px)
      setIsScrolled(currentScrollY > 50);

      // 2. Smart Auto-Hide (Sembunyi saat scroll bawah, Muncul saat scroll atas)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsOpen(false); // Otomatis tutup menu mobile jika sedang terbuka
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;

      // 3. Scroll Progress Bar (Hitung persentase scroll dari total tinggi halaman)
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (height > 0) {
        setScrollProgress((winScroll / height) * 100);
      }

      // 4. Scroll Spy (Deteksi section yang sedang tampil di layar)
      let current = "";
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Jika bagian atas section berada di area pandang yang wajar
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  // Fungsi untuk smooth scrolling ketika link diklik
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    
    // 1. Tutup menu mobile terlebih dahulu
    setIsOpen(false);

    // 2. Gunakan setTimeout agar proses penutupan menu tidak membatalkan scroll di mobile
    setTimeout(() => {
      if (id === "") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        // 3. Gunakan getBoundingClientRect() untuk akurasi tinggi
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        
        // 4. Opsional: Beri jarak offset agar judul section tidak tertutup oleh navbar fixed
        const navbarHeight = 80; // Sesuaikan dengan perkiraan tinggi navbar kamu
        
        window.scrollTo({
          top: elementPosition - navbarHeight,
          behavior: "smooth",
        });
      }
    }, 150); // Jeda 150ms sudah sangat cukup untuk mobile browser
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled || isOpen
          ? "bg-[#050505]/90 backdrop-blur-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      {/* Garis batas bawah Navbar (hanya muncul jika sudah di-scroll) */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[1px] bg-white/10 transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`}
      ></div>

      {/* Scroll Progress Bar (Garis hijau tipis yang berjalan) */}
      <div
        className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-150 ease-out z-10"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative z-20">
        {/* Logo (Klik untuk kembali ke atas) */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, "")}
          className="text-xl font-bold tracking-tighter text-white relative group"
        >
          [Yindra]
          <span className="text-emerald-400 transition-transform inline-block group-hover:translate-x-1">
            .
          </span>
        </a>

        {/* Menu Navigasi Desktop */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link, idx) => {
            const sectionId = sectionIds[idx];
            const isActive = activeSection === sectionId;

            return (
              <a
                key={idx}
                href={`#${sectionId}`}
                onClick={(e) => handleNavClick(e, sectionId)}
                className={`text-sm font-medium relative py-1 transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {link}
                {/* Indikator Active (Garis bawah menyala) */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-emerald-400 transition-all duration-300 ease-out ${
                    isActive
                      ? "w-full shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                      : "w-0"
                  }`}
                ></span>
              </a>
            );
          })}
        </div>

        {/* Bagian Kanan: Tombol Bahasa & Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-xs font-mono tracking-widest hover:bg-white/10 hover:border-white/40 transition-all group"
          >
            <span
              className={`transition-opacity duration-300 ${lang === "id" ? "opacity-100 font-bold text-white" : "opacity-50 text-gray-400 group-hover:opacity-80"}`}
            >
              ID
            </span>
            <span className="w-px h-3 bg-white/30"></span>
            <span
              className={`transition-opacity duration-300 ${lang === "en" ? "opacity-100 font-bold text-white" : "opacity-50 text-gray-400 group-hover:opacity-80"}`}
            >
              EN
            </span>
          </button>

          {/* Hamburger → X Morphing Button */}
          <button
            className="md:hidden p-2 -mr-2 text-gray-400 hover:text-white transition-colors relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              {/* Line 1: rotates to form X top */}
              <span
                className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${
                  isOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              {/* Line 2: fades out */}
              <span
                className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              {/* Line 3: rotates to form X bottom */}
              <span
                className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${
                  isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* --- Mobile Dropdown Menu (AnimatePresence) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-full left-0 w-full bg-[#050505] border-b border-white/10 overflow-hidden z-50"
          >
            <div className="flex flex-col px-8 py-5">
              {links.map((link, idx) => {
                const sectionId = sectionIds[idx];
                const isActive = activeSection === sectionId;
                const num = String(idx + 1).padStart(2, "0");

                return (
                  <motion.div
                    key={idx}
                    variants={menuItemVariants}
                    className={`${
                      idx < links.length - 1 ? "border-b border-white/[0.06]" : ""
                    }`}
                  >
                    <a
                      href={`#${sectionId}`}
                      onClick={(e) => handleNavClick(e, sectionId)}
                      className="group flex items-center gap-4 py-4 transition-colors duration-300 w-full"
                    >
                      {/* Number prefix */}
                      <span className={`text-[11px] font-mono tracking-wider transition-colors duration-300 ${
                        isActive ? "text-emerald-400" : "text-gray-600"
                      }`}>
                        {num}/
                      </span>

                      {/* Link text */}
                      <span className={`text-lg font-medium tracking-tight transition-colors duration-300 ${
                        isActive
                          ? "text-emerald-400"
                          : "text-gray-200 group-hover:text-white"
                      }`}>
                        {link}
                      </span>

                      {/* Active dot */}
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] ml-auto" />
                      )}
                    </a>
                  </motion.div>
                );
              })}
            </div>

            {/* Social links row */}
            <motion.div
              variants={menuItemVariants}
              className="px-8 pb-5 pt-2 flex items-center gap-5 border-t border-white/[0.06]"
            >
              {/* Ubah array menjadi array of objects untuk menyimpan URL */}
              {[
                { name: "GitHub", url: "https://github.com/Yindraa" },
                { name: "LinkedIn", url: "https://linkedin.com/in/made-narayindra-10aa24244" }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url} // Arahkan href ke properti url
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-gray-500 hover:text-emerald-400 transition-colors duration-300 uppercase tracking-wider"
                >
                  {social.name}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
