import Link from "next/link";
import { FaTiktok, FaInstagram, FaXTwitter, FaYoutube, FaFacebookF, FaTwitch, FaSnapchat } from "react-icons/fa6";

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
            <div className="flex flex-wrap gap-3 mb-8">
              <a href="https://tiktok.com/@queenfineshii" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-accent-gold hover:text-black transition-all">
                <FaTiktok size={18} />
              </a>
              <a href="https://instagram.com/queenfineshii" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-accent-gold hover:text-black transition-all">
                <FaInstagram size={18} />
              </a>
              <a href="https://x.com/queenfineshii" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-accent-gold hover:text-black transition-all">
                <FaXTwitter size={18} />
              </a>
              <a href="https://youtube.com/@GinikaGodwin" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-accent-gold hover:text-black transition-all">
                <FaYoutube size={18} />
              </a>
              <a href="https://facebook.com/ginikagodwinn" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-accent-gold hover:text-black transition-all">
                <FaFacebookF size={18} />
              </a>
              <a href="https://twitch.tv/ginikagodwinn" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-accent-gold hover:text-black transition-all">
                <FaTwitch size={18} />
              </a>
              <a href="https://snapchat.com/add/queenfineshii" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-accent-gold hover:text-black transition-all">
                <FaSnapchat size={18} />
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
