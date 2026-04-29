"use client";

import { useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import Intro from "../components/Intro";
import Hero from "../sections/Hero/Hero";
import Profile from "../sections/Profile/Profile";
import Skills from "../sections/Skills/Skills";
import Projects from "../sections/Projects/Projects";
import Contact from "../sections/Contact/Contact";

export default function Home() {
  const [lang, setLang] = useState<"id" | "en">("id");
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <main className="min-h-screen bg-[#050505]">
      {/* Intro Preloader */}
      {!introComplete && <Intro onComplete={handleIntroComplete} />}

      {/* Main Content — renders underneath intro, visible after intro exits */}
      <Navbar lang={lang} setLang={setLang} />

      <Hero lang={lang} />
      <Profile lang={lang} />
      <Skills lang={lang} />
      <Projects lang={lang} />
      <Contact lang={lang} />
    </main>
  );
}
