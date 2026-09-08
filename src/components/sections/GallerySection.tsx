"use client";

import { motion } from "framer-motion";

interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
  category: string | null;
}

export function GallerySection({ images }: { images: GalleryImage[] }) {
  if (!images || images.length === 0) return null;

  return (
    <section id="gallery" className="py-32 px-6 bg-bg-primary text-text-primary border-t border-border-color">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-widest text-accent-gold mb-4">
            Gallery
          </h2>
          <p className="text-xl font-script text-accent-pink">Moments captured in time</p>
        </div>

        {/* Masonry */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="bg-accent-subtle rounded-2xl overflow-hidden shadow-md relative group border-4 border-bg-secondary break-inside-avoid"
            >
              <img src={img.url} alt={img.caption || "Gallery photo"} className="w-full h-auto object-cover" />
              {img.caption && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center p-4 transition-opacity duration-300">
                  <p className="text-white text-center font-bold tracking-wide">{img.caption}</p>
                  {img.category && <p className="text-accent-gold text-xs uppercase tracking-widest mt-2">{img.category}</p>}
                </div>
              )}
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
