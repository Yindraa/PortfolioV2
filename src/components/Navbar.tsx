"use client";

import { useState, useEffect } from "react";

interface NavbarProps {
  lang: "id" | "en";
  setLang: (lang: "id" | "en") => void;
}

const navLinks = {
  id: ["Profil", "Keahlian", "Proyek", "Kontak"],
  en: ["Profile", "Skills", "Projects", "Contact"],
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
    setIsOpen(false);

    if (id === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
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
          [Nama Anda]
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

          <button
            className="md:hidden p-2 -mr-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* --- Mobile Dropdown Menu --- */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 transition-all duration-500 ease-in-out overflow-hidden flex flex-col items-center ${
          isOpen ? "max-h-screen py-6 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        {links.map((link, idx) => {
          const sectionId = sectionIds[idx];
          const isActive = activeSection === sectionId;

          return (
            <a
              key={idx}
              href={`#${sectionId}`}
              onClick={(e) => handleNavClick(e, sectionId)}
              className={`text-lg font-medium py-4 w-full text-center transition-colors duration-300 ${
                isActive
                  ? "text-emerald-400 bg-white/5"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {link}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
