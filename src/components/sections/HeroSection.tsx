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
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* Background Image / Placeholder */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 h-[120%] w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/80 z-10" />
        <Image
          src="/hero.jpg"
          alt="Queenfineshii"
          fill
          priority
          className="object-cover object-center md:object-top"
        />
      </div>

      {/* Content */}
      <div 
        ref={textRef}
        className="relative z-20 text-center px-6 flex flex-col items-center mt-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold uppercase tracking-widest text-white mb-2 drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
            Queenfineshii
          </h1>
          <span className="absolute -bottom-8 md:-bottom-12 right-0 md:-right-12 text-4xl md:text-6xl font-script text-accent-pink -rotate-6 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            The Queen
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 96 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-[2px] bg-accent-gold mb-8 mt-12"
        />

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xl md:text-2xl font-light tracking-widest text-text-secondary uppercase mb-2"
        >
          Ginika Godwin
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-sm md:text-base text-text-muted tracking-widest uppercase mb-12"
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
            className="px-10 py-4 bg-text-primary text-bg-primary font-medium tracking-widest uppercase text-sm hover:bg-accent-gold transition-colors rounded-full shadow-lg"
          >
            Explore My World
          </Link>
          <Link 
            href="#contact"
            className="px-10 py-4 bg-transparent border border-text-primary text-text-primary font-medium tracking-widest uppercase text-sm hover:bg-text-primary hover:text-bg-primary transition-colors rounded-full"
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
        <span className="text-[10px] uppercase tracking-widest text-text-muted mb-4 font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-text-muted/30 relative overflow-hidden">
          <motion.div 
            animate={{ 
              y: ["-100%", "100%"] 
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear"
            }}
            className="absolute inset-0 bg-text-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
