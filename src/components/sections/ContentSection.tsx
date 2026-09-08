"use client";

import { motion } from "framer-motion";

interface ContentPost {
  id: string;
  title: string | null;
  caption: string | null;
  platform: string;
  url: string | null;
  mediaUrl: string | null;
  category: string | null;
}

export function ContentSection({ posts }: { posts: ContentPost[] }) {
  if (!posts || posts.length === 0) return null;

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
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-bg-primary rounded-2xl overflow-hidden shadow-lg border border-border-color group cursor-pointer"
              onClick={() => post.url && window.open(post.url, '_blank')}
            >
              <div className="aspect-[9/16] bg-accent-subtle relative flex items-center justify-center overflow-hidden">
                {post.mediaUrl ? (
                  <img src={post.mediaUrl} alt={post.title || "Content"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <span className="text-text-muted font-bold tracking-widest uppercase text-xs z-10">{post.platform} Video</span>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-0" />
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-lg mb-2 text-text-primary group-hover:text-accent-gold transition-colors line-clamp-2">
                  {post.title || post.caption || "Content Post"}
                </h3>
                <p className="text-sm text-text-muted capitalize">{post.platform}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
