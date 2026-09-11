import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black py-20 border-t border-white/10 text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-display font-bold uppercase mb-4">Queenfineshii</h2>
            <p className="text-lg text-white/60 mb-2">Ginika Godwin</p>
            <p className="text-sm text-white/50 max-w-sm">
              Content Creator • Musical Artist • Entertainer
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold uppercase mb-6 text-accent-gold">Explore</h3>
            <ul className="space-y-4">
              <li><Link href="#about" className="text-white/70 hover:text-white transition-colors">About</Link></li>
              <li><Link href="#content" className="text-white/70 hover:text-white transition-colors">Content</Link></li>
              <li><Link href="#music" className="text-white/70 hover:text-white transition-colors">Music</Link></li>
              <li><Link href="#film" className="text-white/70 hover:text-white transition-colors">Film</Link></li>
              <li><Link href="#journey" className="text-white/70 hover:text-white transition-colors">Journey</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold uppercase mb-6 text-accent-gold">Connect</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              <a href="https://tiktok.com/@queenfineshii" target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-white/5 rounded-full hover:bg-accent-gold hover:text-black transition-all font-bold text-xs">
                TikTok
              </a>
              <a href="https://instagram.com/queenfineshii" target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-white/5 rounded-full hover:bg-accent-gold hover:text-black transition-all font-bold text-xs">
                IG
              </a>
              <a href="https://x.com/queenfineshii" target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-white/5 rounded-full hover:bg-accent-gold hover:text-black transition-all font-bold text-xs">
                X
              </a>
              <a href="https://youtube.com/@GinikaGodwin" target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-white/5 rounded-full hover:bg-accent-gold hover:text-black transition-all font-bold text-xs">
                YT
              </a>
              <a href="https://facebook.com/ginikagodwinn" target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-white/5 rounded-full hover:bg-accent-gold hover:text-black transition-all font-bold text-xs">
                FB
              </a>
              <a href="https://twitch.tv/ginikagodwinn" target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-white/5 rounded-full hover:bg-accent-gold hover:text-black transition-all font-bold text-xs">
                Twitch
              </a>
              <a href="https://snapchat.com/add/queenfineshii" target="_blank" rel="noopener noreferrer" className="px-3 py-2 bg-white/5 rounded-full hover:bg-accent-gold hover:text-black transition-all font-bold text-xs">
                Snap
              </a>
            </div>
            <ul className="space-y-4">
              <li><Link href="#contact" className="text-white/70 hover:text-white transition-colors">Work with me</Link></li>
              <li><Link href="/admin" className="text-white/40 hover:text-white transition-colors text-xs">Admin Login</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-white/40">
          <p>© {new Date().getFullYear()} Queenfineshii. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
