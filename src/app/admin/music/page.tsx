"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ImageUploader } from "@/components/ui/ImageUploader";

interface Song {
  id: string;
  title: string;
  releaseDate: string | null;
  coverUrl: string | null;
  featured: boolean;
}

export default function MusicAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseDate: "",
    coverUrl: "",
    spotifyUrl: "",
    appleUrl: "",
    youtubeUrl: "",
    featured: false
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated") {
      fetchSongs();
    }
  }, [status, router]);

  const fetchSongs = async () => {
    try {
      const res = await fetch("/api/music");
      const data = await res.json();
      setSongs(data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Song) => {
    setEditingId(item.id);
    setFormData({
      title: item.title || "",
      description: (item as any).description || "",
      releaseDate: item.releaseDate ? new Date(item.releaseDate).toISOString().split('T')[0] : "",
      coverUrl: item.coverUrl || "",
      spotifyUrl: (item as any).spotifyUrl || "",
      appleUrl: (item as any).appleUrl || "",
      youtubeUrl: (item as any).youtubeUrl || "",
      featured: item.featured
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this song?")) return;
    try {
      const res = await fetch(`/api/music?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchSongs();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...formData, id: editingId } : formData;
      const res = await fetch("/api/music", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setShowModal(false);
        setEditingId(null);
        setFormData({ title: "", description: "", releaseDate: "", coverUrl: "", spotifyUrl: "", appleUrl: "", youtubeUrl: "", featured: false });
        fetchSongs();
      }
    } catch (error) {
      console.error("Error saving song:", error);
    }
  };

  if (status === "loading" || loading) {
    return <div className="p-8 text-white/50">Loading...</div>;
  }

  return (
    <div className="bg-zinc-950 p-8 min-h-screen text-white relative">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-display uppercase tracking-widest text-accent-gold">Music Management</h2>
          <p className="text-white/50 mt-2">Manage your discography and featured tracks.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-white text-black px-6 py-3 font-bold uppercase tracking-widest hover:bg-accent-gold transition-colors text-sm rounded"
        >
          <Plus size={18} />
          <span>Add Song</span>
        </button>
      </div>

      <div className="bg-black border border-white/10 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal">Artwork</th>
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal">Title</th>
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal">Release Date</th>
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal">Featured</th>
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {songs.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/30">
                  No music found. Create one!
                </td>
              </tr>
            ) : (
              songs.map((song) => (
                <tr key={song.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    {song.coverUrl ? (
                      <img src={song.coverUrl} alt="Cover" className="w-12 h-12 object-cover rounded bg-white/10" />
                    ) : (
                      <div className="w-12 h-12 bg-white/5 rounded flex items-center justify-center text-white/20 text-xs">No img</div>
                    )}
                  </td>
                  <td className="p-4 font-medium">{song.title}</td>
                  <td className="p-4 text-white/70">
                    {song.releaseDate ? new Date(song.releaseDate).toLocaleDateString() : 'TBA'}
                  </td>
                  <td className="p-4">
                    {song.featured ? <Check className="text-accent-gold" size={18} /> : <span className="text-white/20">-</span>}
                  </td>
                  <td className="p-4 flex justify-end space-x-3 items-center h-[73px]">
                    <button onClick={() => handleEdit(song)} className="p-2 text-white/50 hover:text-white transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(song.id)} className="p-2 text-white/50 hover:text-red-400 transition-colors">
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
              <h3 className="text-2xl font-display uppercase tracking-widest text-accent-gold">Add New Song</h3>
              <button onClick={() => setShowModal(false)} className="text-white/50 hover:text-white"><X /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Artwork</label>
                <ImageUploader onUpload={(url) => setFormData({...formData, coverUrl: url})} defaultImage={formData.coverUrl} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent-gold outline-none" />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Release Date</label>
                  <input type="date" value={formData.releaseDate} onChange={e => setFormData({...formData, releaseDate: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent-gold outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Description / Story</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent-gold outline-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Spotify URL</label>
                  <input type="url" value={formData.spotifyUrl} onChange={e => setFormData({...formData, spotifyUrl: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent-gold outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Apple Music URL</label>
                  <input type="url" value={formData.appleUrl} onChange={e => setFormData({...formData, appleUrl: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent-gold outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">YouTube URL</label>
                  <input type="url" value={formData.youtubeUrl} onChange={e => setFormData({...formData, youtubeUrl: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent-gold outline-none text-sm" />
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 accent-accent-gold" />
                <label htmlFor="featured" className="text-sm uppercase tracking-widest text-white/70">Feature on Homepage</label>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-end space-x-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 border border-white/10 rounded text-white/70 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">Cancel</button>
                <button type="submit" className="px-6 py-3 bg-accent-gold text-black rounded hover:bg-white transition-colors uppercase tracking-widest text-sm font-bold">Save Song</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
