"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogOut, LayoutDashboard, Image as ImageIcon, Music, Film, Map, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) return null;

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Content Stage", icon: ImageIcon, href: "/admin/content" },
    { name: "Music", icon: Music, href: "/admin/music" },
    { name: "Films", icon: Film, href: "/admin/films" },
    { name: "Journey", icon: Map, href: "/admin/journey" },
    { name: "Enquiries", icon: MessageSquare, href: "/admin/enquiries" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-display uppercase tracking-widest text-accent-gold">Admin Portal</h1>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 rounded hover:bg-white/5 transition-colors text-white/80 hover:text-white"
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => signOut()}
            className="flex items-center space-x-3 px-4 py-3 rounded w-full text-left hover:bg-red-500/10 hover:text-red-400 transition-colors text-white/60"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-zinc-950 p-8">
        <header className="mb-10">
          <h2 className="text-3xl font-display uppercase tracking-widest">Welcome, {session.user?.name || 'Queen'}</h2>
          <p className="text-white/50 mt-2">Manage your digital empire.</p>
        </header>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-black border border-white/10 p-6 rounded-lg shadow-lg">
            <h3 className="text-white/50 text-sm uppercase tracking-widest mb-2">Total Enquiries</h3>
            <p className="text-4xl font-display font-bold text-accent-gold">12</p>
          </div>
          <div className="bg-black border border-white/10 p-6 rounded-lg shadow-lg">
            <h3 className="text-white/50 text-sm uppercase tracking-widest mb-2">Music Tracks</h3>
            <p className="text-4xl font-display font-bold text-accent-gold">4</p>
          </div>
          <div className="bg-black border border-white/10 p-6 rounded-lg shadow-lg">
            <h3 className="text-white/50 text-sm uppercase tracking-widest mb-2">Content Items</h3>
            <p className="text-4xl font-display font-bold text-accent-gold">24</p>
          </div>
        </div>
      </main>
    </div>
  );
}
