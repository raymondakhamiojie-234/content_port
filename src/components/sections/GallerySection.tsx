"use client";

import { motion } from "framer-motion";

export function GallerySection() {
  return (
    <section id="gallery" className="py-32 px-6 bg-bg-primary text-text-primary border-t border-border-color">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-widest text-accent-gold mb-4">
            Gallery
          </h2>
          <p className="text-xl font-script text-accent-pink">Moments captured in time</p>
        </div>

        {/* Simple Masonry Placeholder */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className={`bg-accent-subtle rounded-2xl overflow-hidden shadow-md flex items-center justify-center border-4 border-bg-secondary ${
                i % 3 === 0 ? "h-96" : i % 2 === 0 ? "h-64" : "h-80"
              }`}
            >
              <span className="text-text-muted font-bold tracking-widest uppercase text-xs">Image {item}</span>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-10 py-4 bg-transparent border-2 border-accent-gold text-accent-gold font-bold uppercase tracking-widest hover:bg-accent-gold hover:text-bg-secondary transition-colors rounded-full">
            Load More
          </button>
        </div>
      </div>
    </section>
  );
}
