import { HeroSection } from "@/components/sections/HeroSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { CatchphrasesSection } from "@/components/sections/CatchphrasesSection";
import { MusicSection } from "@/components/sections/MusicSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-hidden">
      <HeroSection />
      
      {/* Introduction Section */}
      <section id="about" className="min-h-[70vh] w-full flex items-center justify-center py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-display uppercase mb-8 text-accent-gold">Meet Queenfineshii</h2>
          <p className="text-lg md:text-2xl text-text-secondary font-light leading-relaxed mb-12">
            Ginika Millicent Nwanya, popularly known as Ginika Godwin or Queenfineshii, is a Nigerian-born content creator, musical artist and entertainer known for her bold personality, confidence, humor and ability to command attention.
          </p>
          <div className="text-2xl md:text-4xl font-display text-white italic">
            "I am the Queen of the United States of America because I said I am, and I am."
          </div>
        </div>
      </section>

      <JourneySection />
      
      <CatchphrasesSection />

      <MusicSection />

      {/* Film / Entertainment Placeholder */}
      <section id="film" className="py-32 px-6 bg-black text-white text-center">
        <h2 className="text-4xl md:text-6xl font-display uppercase mb-16 tracking-widest text-accent-gold">
          From Viral Moments to the Screen
        </h2>
        <div className="max-w-3xl mx-auto bg-zinc-900 aspect-video flex items-center justify-center">
          <span className="text-white/30 uppercase tracking-widest">Unfaithful Saturday - Short Film</span>
        </div>
      </section>

      {/* Achievements Placeholder */}
      <section className="py-32 px-6 bg-zinc-950 text-white text-center border-y border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 container mx-auto">
          <div>
            <h3 className="text-6xl font-display font-bold text-accent-gold mb-2">1.5M+</h3>
            <p className="text-sm tracking-widest uppercase text-white/50">TikTok Followers</p>
          </div>
          <div>
            <h3 className="text-6xl font-display font-bold text-accent-gold mb-2">Meta</h3>
            <p className="text-sm tracking-widest uppercase text-white/50">Recognized Creator</p>
          </div>
          <div>
            <h3 className="text-6xl font-display font-bold text-accent-gold mb-2">Kai Cenat</h3>
            <p className="text-sm tracking-widest uppercase text-white/50">Collaboration</p>
          </div>
          <div>
            <h3 className="text-6xl font-display font-bold text-accent-gold mb-2">Music</h3>
            <p className="text-sm tracking-widest uppercase text-white/50">Viral Billboard</p>
          </div>
        </div>
      </section>

      {/* Contact Placeholder */}
      <section id="contact" className="py-32 px-6 bg-black text-white text-center">
        <h2 className="text-4xl md:text-6xl font-display uppercase mb-8">
          Let's create something people will talk about.
        </h2>
        <p className="text-white/50 mb-12">For brand partnerships, sponsorships, and collaborations.</p>
        <button className="px-12 py-5 bg-accent-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-colors">
          Get in Touch
        </button>
      </section>
    </main>
  );
}
