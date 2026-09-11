"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({ enquiries: 0, music: 0, content: 0 });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated") {
      fetch("/api/stats")
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(err => console.error(err));
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) return null;

  return (
    <main className="p-8">
      <header className="mb-10 bg-black/40 border border-white/10 p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-display uppercase tracking-widest text-white mb-2">Welcome Back, {session.user?.name || 'Queen'}</h2>
          <p className="text-white/50 text-lg">Your digital empire awaits your command.</p>
        </div>
      </header>

      {/* Dashboard Stats */}
      <div className="mb-12">
        <h3 className="text-xl font-display uppercase tracking-widest text-white/80 mb-6 flex items-center"><span className="w-8 h-[1px] bg-accent-gold mr-4"></span> Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black border border-white/10 p-8 rounded-xl shadow-lg hover:border-accent-gold/30 transition-colors relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-white/50 text-sm uppercase tracking-widest mb-4">New Enquiries</h3>
            <p className="text-5xl font-display font-bold text-accent-gold mb-2">{stats.enquiries}</p>
            <p className="text-xs text-white/40 uppercase tracking-wider">Unread messages waiting</p>
          </div>
          <div className="bg-black border border-white/10 p-8 rounded-xl shadow-lg hover:border-accent-gold/30 transition-colors relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-white/50 text-sm uppercase tracking-widest mb-4">Total Music Tracks</h3>
            <p className="text-5xl font-display font-bold text-accent-gold mb-2">{stats.music}</p>
            <p className="text-xs text-white/40 uppercase tracking-wider">Across all platforms</p>
          </div>
          <div className="bg-black border border-white/10 p-8 rounded-xl shadow-lg hover:border-accent-gold/30 transition-colors relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-white/50 text-sm uppercase tracking-widest mb-4">Content Moments</h3>
            <p className="text-5xl font-display font-bold text-accent-gold mb-2">{stats.content}</p>
            <p className="text-xs text-white/40 uppercase tracking-wider">Viral posts uploaded</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-display uppercase tracking-widest text-white/80 mb-6 flex items-center"><span className="w-8 h-[1px] bg-accent-gold mr-4"></span> Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button onClick={() => router.push('/admin/music')} className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-all hover:scale-[1.02]">
            <span className="block text-accent-gold mb-3 text-2xl">♪</span>
            <span className="block text-sm uppercase tracking-widest font-bold">Add Music</span>
          </button>
          <button onClick={() => router.push('/admin/content')} className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-all hover:scale-[1.02]">
            <span className="block text-accent-gold mb-3 text-2xl">📸</span>
            <span className="block text-sm uppercase tracking-widest font-bold">Add Content</span>
          </button>
          <button onClick={() => router.push('/admin/journey')} className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-all hover:scale-[1.02]">
            <span className="block text-accent-gold mb-3 text-2xl">🏆</span>
            <span className="block text-sm uppercase tracking-widest font-bold">Add Milestone</span>
          </button>
          <button onClick={() => router.push('/admin/enquiries')} className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-all hover:scale-[1.02]">
            <span className="block text-accent-gold mb-3 text-2xl">✉️</span>
            <span className="block text-sm uppercase tracking-widest font-bold">Read Messages</span>
          </button>
        </div>
      </div>
    </main>
  );
}
