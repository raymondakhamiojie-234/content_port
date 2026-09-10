"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
      <header className="mb-10">
        <h2 className="text-3xl font-display uppercase tracking-widest">Welcome, {session.user?.name || 'Queen'}</h2>
        <p className="text-white/50 mt-2">Manage your digital empire.</p>
      </header>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-black border border-white/10 p-6 rounded-lg shadow-lg">
          <h3 className="text-white/50 text-sm uppercase tracking-widest mb-2">Total Enquiries</h3>
          <p className="text-4xl font-display font-bold text-accent-gold">{stats.enquiries}</p>
        </div>
        <div className="bg-black border border-white/10 p-6 rounded-lg shadow-lg">
          <h3 className="text-white/50 text-sm uppercase tracking-widest mb-2">Music Tracks</h3>
          <p className="text-4xl font-display font-bold text-accent-gold">{stats.music}</p>
        </div>
        <div className="bg-black border border-white/10 p-6 rounded-lg shadow-lg">
          <h3 className="text-white/50 text-sm uppercase tracking-widest mb-2">Content Items</h3>
          <p className="text-4xl font-display font-bold text-accent-gold">{stats.content}</p>
        </div>
      </div>
    </main>
  );
}
