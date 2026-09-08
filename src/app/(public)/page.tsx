import { HeroSection } from "@/components/sections/HeroSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { CatchphrasesSection } from "@/components/sections/CatchphrasesSection";
import { MusicSection } from "@/components/sections/MusicSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-hidden bg-bg-primary">
      <HeroSection />
      
      {/* Introduction Section */}
      <section id="about" className="min-h-[70vh] w-full flex items-center justify-center py-32 px-6">
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-6xl font-display uppercase mb-8 text-accent-gold">Meet Queenfineshii</h2>
          <p className="text-lg md:text-2xl text-text-secondary font-light leading-relaxed mb-12">
            Ginika Millicent Nwanya, popularly known as Ginika Godwin or Queenfineshii, is a Nigerian-born content creator, musical artist and entertainer known for her bold personality, confidence, humor and ability to command attention.
          </p>
          <div className="text-2xl md:text-5xl font-script text-accent-pink">
            "I am the Queen of the United States of America because I said I am, and I am."
          </div>
        </div>
      </section>

      <JourneySection />
      
      <CatchphrasesSection />

      <MusicSection />

      {/* Film / Entertainment Placeholder */}
      <section id="film" className="py-32 px-6 bg-bg-secondary text-text-primary text-center">
        <h2 className="text-4xl md:text-6xl font-display uppercase mb-16 tracking-widest text-accent-gold">
          From Viral Moments to the Screen
        </h2>
        <div className="max-w-3xl mx-auto bg-bg-primary rounded-2xl shadow-xl aspect-video flex items-center justify-center border border-border-color">
          <span className="text-text-muted uppercase tracking-widest font-bold">Unfaithful Saturday - Short Film</span>
        </div>
      </section>

      {/* Achievements Placeholder */}
      <section className="py-32 px-6 bg-bg-primary text-text-primary text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 container mx-auto">
          <div className="bg-bg-secondary p-8 rounded-2xl shadow-sm border border-border-color">
            <h3 className="text-5xl md:text-6xl font-display font-bold text-accent-gold mb-4">1.5M+</h3>
            <p className="text-sm tracking-widest uppercase text-text-secondary">TikTok Followers</p>
          </div>
          <div className="bg-bg-secondary p-8 rounded-2xl shadow-sm border border-border-color">
            <h3 className="text-5xl md:text-6xl font-display font-bold text-accent-gold mb-4">Meta</h3>
            <p className="text-sm tracking-widest uppercase text-text-secondary">Recognized Creator</p>
          </div>
          <div className="bg-bg-secondary p-8 rounded-2xl shadow-sm border border-border-color">
            <h3 className="text-5xl md:text-6xl font-display font-bold text-accent-gold mb-4">Kai Cenat</h3>
            <p className="text-sm tracking-widest uppercase text-text-secondary">Collaboration</p>
          </div>
          <div className="bg-bg-secondary p-8 rounded-2xl shadow-sm border border-border-color">
            <h3 className="text-5xl md:text-6xl font-display font-bold text-accent-gold mb-4">Music</h3>
            <p className="text-sm tracking-widest uppercase text-text-secondary">Viral Billboard</p>
          </div>
        </div>
      </section>

      {/* Contact Placeholder */}
      <section id="contact" className="py-32 px-6 bg-bg-secondary text-text-primary text-center">
        <h2 className="text-4xl md:text-6xl font-display uppercase mb-6">
          Let's create something people will talk about.
        </h2>
        <p className="text-text-secondary mb-12 max-w-xl mx-auto">For brand partnerships, sponsorships, and collaborations, get in touch with our team.</p>
        <button className="px-12 py-5 bg-accent-gold text-bg-secondary font-bold uppercase tracking-widest hover:bg-accent-gold-hover transition-colors rounded-full shadow-lg">
          Get in Touch
        </button>
      </section>
    </main>
  );
}
