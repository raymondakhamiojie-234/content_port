"use client";

import { motion } from "framer-motion";

const phrases = [
  "Clock it",
  "Hit it. Hit it. Hit it",
  "Gooda gooda",
  "Keep going",
  "Hey Fineshyt",
];

export function CatchphrasesSection() {
  return (
    <section className="py-32 px-6 bg-black text-white overflow-hidden border-y border-white/10">
      <div className="container mx-auto text-center">
        <h2 className="text-sm md:text-base tracking-widest text-accent-gold uppercase mb-16">
          Clock It.
        </h2>
        
        <div className="flex flex-col items-center justify-center gap-8 md:gap-12">
          {phrases.map((phrase, i) => (
            <motion.div
              key={phrase}
              whileHover={{ scale: 1.05, color: "var(--accent-gold)" }}
              className="cursor-pointer"
            >
              <h3 className="text-4xl md:text-7xl lg:text-8xl font-display font-bold uppercase transition-colors duration-300">
                {phrase}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
