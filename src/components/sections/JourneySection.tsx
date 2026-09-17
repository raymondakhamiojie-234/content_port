"use client";

import { motion } from "framer-motion";

const chapters = [
  {
    number: "01",
    title: "Anambra",
    description: "Her journey started in a small village in Anambra, Nigeria. She experienced difficult moments early on, including running away from home for survival and experiencing homelessness. She refused to let those experiences define her.",
  },
  {
    number: "02",
    title: "Lagos",
    description: "She moved to Lagos in late 2023 and began taking content creation more seriously, finding her voice and audience.",
  },
  {
    number: "03",
    title: "November 2023",
    description: "Her viral debut came through a street interview with Nigerian music star Don Jazzy, showing her the impact she could create.",
  },
  {
    number: "04",
    title: "Queenfineshii",
    description: "In 2025, she began focusing heavily on TikTok content. The Queenfineshii personality really began to take shape as a bold, confident character.",
  },
  {
    number: "05",
    title: "Rebuilding",
    description: "She faced major setbacks, including losing multiple TikTok accounts (one with over 1 million followers). Instead of quitting, she started over and continued building.",
  },
  {
    number: "06",
    title: "Today",
    description: "Today, she has over 1.5 million followers across TikTok accounts and is actively expanding into music, film, and production.",
  }
];

export function JourneySection() {
  return (
    <section 
      id="journey" 
      className="bg-bg-primary text-text-primary py-32 border-t border-border-color"
    >
      <div className="pl-6 md:pl-20">
        <h2 className="text-4xl md:text-6xl font-display uppercase mb-16 tracking-widest text-accent-gold">
          The Journey
        </h2>
      </div>
      
      <div className="w-full overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar">
        <div className="flex gap-8 md:gap-16 px-6 md:px-20 w-max">
          {chapters.map((chapter) => (
            <div key={chapter.number} className="w-[320px] md:w-[450px] flex-shrink-0 flex flex-col justify-center bg-bg-secondary p-10 rounded-2xl shadow-xl border border-border-color snap-center md:snap-start">
              <div className="text-6xl md:text-8xl font-display text-accent-pink/20 font-bold mb-4">
                {chapter.number}
              </div>
              <h3 className="text-2xl md:text-4xl font-display uppercase tracking-wider mb-6 text-text-primary">
                {chapter.title}
              </h3>
              <p className="text-base md:text-lg text-text-secondary font-light leading-relaxed">
                {chapter.description}
              </p>
            </div>
          ))}
          {/* Spacer at the end for proper padding on right edge */}
          <div className="w-[6vw] md:w-[10vw] flex-shrink-0"></div>
        </div>
      </div>
    </section>
  );
}
