"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../sections/Hero/Hero";
import Profile from "../sections/Profile/Profile";
import Skills from "../sections/Skills/Skills";

export default function Home() {
  const [lang, setLang] = useState<"id" | "en">("id");

  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Profile lang={lang} />
      <Skills lang={lang} />
    </main>
  );
}
