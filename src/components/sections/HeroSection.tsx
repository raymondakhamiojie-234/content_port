"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (containerRef.current && bgRef.current && textRef.current) {
      // Parallax effect on background
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade out text on scroll
      gsap.to(textRef.current, {
        opacity: 0,
        y: 100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image / Placeholder */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 h-[120%] w-full"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="w-full h-full bg-neutral-900 bg-center bg-cover flex items-center justify-center">
            {/* Using a placeholder for now since there is no image */}
            <span className="text-white/20 text-xl">[HERO IMAGE PLACEHOLDER]</span>
        </div>
      </div>

      {/* Content */}
      <div 
        ref={textRef}
        className="relative z-20 text-center px-6 flex flex-col items-center"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-display font-bold uppercase tracking-widest text-white mb-4"
        >
          Queenfineshii
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-[1px] w-24 bg-accent-gold mb-6"
        />

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xl md:text-2xl font-light tracking-widest text-white/90 uppercase mb-2"
        >
          Ginika Godwin
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-sm md:text-base text-white/70 tracking-widest uppercase mb-12"
        >
          Content Creator • Musical Artist • Entertainer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link 
            href="#journey"
            className="px-8 py-4 bg-white text-black font-medium tracking-widest uppercase text-sm hover:bg-accent-gold transition-colors"
          >
            Explore My World
          </Link>
          <Link 
            href="#contact"
            className="px-8 py-4 bg-transparent border border-white text-white font-medium tracking-widest uppercase text-sm hover:bg-white/10 transition-colors"
          >
            Work With Me
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/50 mb-4">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ 
              y: ["-100%", "100%"] 
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear"
            }}
            className="absolute inset-0 bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
