"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");

  const name = "[Yindra]";
  const tagline = "Software Engineer • Fullstack Developer";

  useEffect(() => {
    // Phase 1: Loading (show intro for 2.5s)
    const exitTimer = setTimeout(() => {
      setPhase("exiting");
    }, 2500);

    // Phase 2: After exit animation completes
    const doneTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3200); // 2500 + 700ms exit animation

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {phase === "loading" || phase === "exiting" ? (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden"
          exit={{
            y: "-100%",
            transition: {
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
            },
          }}
          animate={phase === "exiting" ? { y: "-100%" } : { y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
          }}
        >
          {/* Subtle dot pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Name — stagger letter animation */}
            <div className="flex overflow-hidden mb-3">
              {name.split("").map((char, idx) => (
                <motion.span
                  key={idx}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + idx * 0.04,
                    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                  }}
                  className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight ${
                    char === "." ? "text-emerald-400" : "text-white"
                  }`}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-sm md:text-base font-mono text-gray-500 tracking-wider mb-10"
            >
              {tagline}
            </motion.p>

            {/* Loading line */}
            <div className="w-48 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 2.0,
                  delay: 0.5,
                  ease: "easeInOut" as const,
                }}
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full"
              />
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 text-[10px] font-mono text-gray-600 tracking-widest uppercase">
            Portfolio
          </div>
          <div className="absolute bottom-8 right-8 text-[10px] font-mono text-gray-600 tracking-widest uppercase">
            © {new Date().getFullYear()}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
