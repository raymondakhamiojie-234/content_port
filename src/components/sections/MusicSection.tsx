"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function MusicSection() {
  return (
    <section id="music" className="py-32 px-6 bg-zinc-950 text-white relative">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-6xl font-display uppercase mb-16 tracking-widest text-accent-gold text-center">
          The Sound of Queenfineshii
        </h2>

        {/* Featured Song */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded shadow-2xl shadow-accent-gold/20">
              <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center">
                <span className="text-white/20 text-xl font-display uppercase tracking-widest mb-4">Do It Daddy</span>
                <span className="text-white/10 text-sm">Cover Artwork Placeholder</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <h3 className="text-5xl md:text-7xl font-display font-bold uppercase mb-4">Do It Daddy</h3>
            <p className="text-accent-gold tracking-widest uppercase mb-8">Released July 2026</p>
            
            <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              The song became Queenfineshii's most viral release so far, with a TikTok dance trend spreading across the U.S. Seeing American rapper Sexyy Red dance to the song was a huge moment that proved how far the music had traveled.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="px-8 py-4 bg-white text-black font-medium tracking-widest uppercase text-sm hover:bg-accent-gold transition-colors w-full sm:w-auto">
                Listen Now
              </button>
            </div>
          </motion.div>
        </div>

        {/* Other Songs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Someday, I Will Be Gone", year: "2025 (Debut)" },
            { title: "Go to Court", year: "2025" },
            { title: "Shake That Ahh", year: "2026" },
          ].map((song, i) => (
            <motion.div 
              key={song.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-black border border-white/10 p-6 flex flex-col items-center text-center group hover:border-accent-gold/50 transition-colors"
            >
              <div className="w-full aspect-square bg-neutral-900 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <span className="text-white/10 text-xs">Artwork</span>
              </div>
              <h4 className="text-xl font-display uppercase mb-2">{song.title}</h4>
              <p className="text-white/50 text-sm tracking-widest">{song.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
