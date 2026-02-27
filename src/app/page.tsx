"use client"; // Jadikan Client Component karena menyimpan state bahasa

import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../sections/Hero/Hero";

export default function Home() {
  // State bahasa diletakkan di sini agar bisa dibagikan ke Navbar dan Hero
  const [lang, setLang] = useState<"id" | "en">("id");

  return (
    <main className="min-h-screen bg-[#050505]">
      {/* Melempar state lang dan fungsi setLang ke Navbar */}
      <Navbar lang={lang} setLang={setLang} />

      {/* Melempar state lang ke Hero */}
      <Hero lang={lang} />
    </main>
  );
}
