"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ImageUploader } from "@/components/ui/ImageUploader";

interface JourneyEvent {
  id: string;
  title: string | null;
  caption: string | null;
  mediaUrl: string | null;
  createdAt: string;
}

export default function JourneyAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<JourneyEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    mediaUrl: "",
    featured: true
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated") {
      fetchEvents();
    }
  }, [status, router]);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/journey");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching journey events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/journey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowModal(false);
        setFormData({ title: "", caption: "", mediaUrl: "", featured: true });
        fetchEvents();
      }
    } catch (error) {
      console.error("Error creating milestone:", error);
    }
  };

  if (status === "loading" || loading) {
    return <div className="p-8 text-white/50">Loading...</div>;
  }

  return (
    <div className="bg-zinc-950 p-8 min-h-screen text-white">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-display uppercase tracking-widest text-accent-gold">Journey Milestones</h2>
          <p className="text-white/50 mt-2">Manage timeline events and career milestones.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-white text-black px-6 py-3 font-bold uppercase tracking-widest hover:bg-accent-gold transition-colors text-sm rounded"
        >
          <Plus size={18} />
          <span>Add Milestone</span>
        </button>
      </div>

      <div className="bg-black border border-white/10 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal">Milestone</th>
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal">Description</th>
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal">Date</th>
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-white/30">
                  No milestones added yet.
                </td>
              </tr>
            ) : (
              events.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium">{item.title || "Untitled"}</td>
                  <td className="p-4 text-white/70 text-sm line-clamp-1 max-w-xs">{item.caption}</td>
                  <td className="p-4 text-sm text-white/50">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 flex justify-end space-x-3">
                    <button className="p-2 text-white/50 hover:text-white transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-white/50 hover:text-red-400 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-white/10 rounded-lg max-w-2xl w-full p-8 my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-display uppercase tracking-widest text-accent-gold">Add New Milestone</h3>
              <button onClick={() => setShowModal(false)} className="text-white/50 hover:text-white"><X /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Milestone Image (Optional)</label>
                <ImageUploader onUpload={(url) => setFormData({...formData, mediaUrl: url})} defaultImage={formData.mediaUrl} />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent-gold outline-none" placeholder="e.g. 1M Followers on TikTok" />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Description</label>
                <textarea required rows={3} value={formData.caption} onChange={e => setFormData({...formData, caption: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent-gold outline-none" />
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-end space-x-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 border border-white/10 rounded text-white/70 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">Cancel</button>
                <button type="submit" className="px-6 py-3 bg-accent-gold text-black rounded hover:bg-white transition-colors uppercase tracking-widest text-sm font-bold">Save Milestone</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
