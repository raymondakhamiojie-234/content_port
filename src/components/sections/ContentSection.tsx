"use client";

import { motion } from "framer-motion";

export function ContentSection() {
  return (
    <section id="content" className="py-32 px-6 bg-bg-secondary text-text-primary">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-widest text-accent-gold mb-4">
            The Content Stage
          </h2>
          <p className="text-xl font-script text-accent-pink">Viral moments & entertainment</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mock Video Cards */}
          {[1, 2, 3, 4, 5, 6].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-bg-primary rounded-2xl overflow-hidden shadow-lg border border-border-color group cursor-pointer"
            >
              <div className="aspect-[9/16] bg-accent-subtle relative flex items-center justify-center overflow-hidden">
                <span className="text-text-muted font-bold tracking-widest uppercase text-xs z-10">TikTok Video</span>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-0" />
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-lg mb-2 text-text-primary group-hover:text-accent-gold transition-colors">
                  "I am the Queen..."
                </h3>
                <p className="text-sm text-text-muted">1.2M Views • TikTok</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
