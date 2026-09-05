"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const chapters = [
  {
    number: "01",
    title: "Anambra",
    description: "Her journey started in a small village in Anambra, Nigeria. She experienced difficult moments early on, including running away from home for survival and experiencing homelessness. She refused to let those experiences define her.",
  },
  {
    number: "02",
    title: "Lagos",
    description: "She moved to Lagos in late 2021 and began taking content creation more seriously, finding her voice and audience.",
  },
  {
    number: "03",
    title: "November 2023",
    description: "Her viral debut came through a street interview with Nigerian music star Don Jazzy, showing her the impact she could create.",
  },
  {
    number: "04",
    title: "Queenfineshii",
    description: "About a year later, she began focusing heavily on TikTok content. The Queenfineshii personality really began to take shape as a bold, confident character.",
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Horizontal scroll effect
    if (sectionRef.current && containerRef.current) {
      const pinWrap = containerRef.current;
      const pinWrapWidth = pinWrap.scrollWidth;
      const windowWidth = window.innerWidth;
      
      gsap.to(pinWrap, {
        x: -pinWrapWidth + windowWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + pinWrapWidth,
        }
      });
    }
  }, []);

  return (
    <section 
      id="journey" 
      ref={sectionRef} 
      className="bg-bg-secondary text-white overflow-hidden py-20 min-h-screen flex items-center"
    >
      <div className="pl-6 md:pl-20">
        <h2 className="text-4xl md:text-6xl font-display uppercase mb-16 tracking-widest text-accent-gold">
          The Journey
        </h2>
        
        <div 
          ref={containerRef} 
          className="flex gap-12 md:gap-32 pb-20 w-max"
        >
          {chapters.map((chapter, index) => (
            <div key={chapter.number} className="w-[300px] md:w-[500px] flex-shrink-0 flex flex-col justify-center">
              <div className="text-6xl md:text-8xl font-display text-white/10 font-bold mb-4">
                {chapter.number}
              </div>
              <h3 className="text-2xl md:text-4xl font-display uppercase tracking-wider mb-6">
                {chapter.title}
              </h3>
              <p className="text-base md:text-lg text-text-secondary font-light leading-relaxed">
                {chapter.description}
              </p>
            </div>
          ))}
          {/* Spacer at the end for smooth scrolling exit */}
          <div className="w-[10vw]"></div>
        </div>
      </div>
    </section>
  );
}
