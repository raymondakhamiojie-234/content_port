"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    <main className="p-8">
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
  );
}
