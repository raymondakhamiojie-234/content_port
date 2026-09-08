"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ImageUploader } from "@/components/ui/ImageUploader";

interface Film {
  id: string;
  title: string;
  releaseDate: string | null;
  posterUrl: string | null;
  featured: boolean;
}

export default function FilmsAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseDate: "",
    posterUrl: "",
    trailerUrl: "",
    videoUrl: "",
    credits: "",
    featured: false
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated") {
      fetchFilms();
    }
  }, [status, router]);

  const fetchFilms = async () => {
    try {
      const res = await fetch("/api/films");
      const data = await res.json();
      setFilms(data);
    } catch (error) {
      console.error("Error fetching films:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/films", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowModal(false);
        setFormData({ title: "", description: "", releaseDate: "", posterUrl: "", trailerUrl: "", videoUrl: "", credits: "", featured: false });
        fetchFilms();
      }
    } catch (error) {
      console.error("Error creating film:", error);
    }
  };

  if (status === "loading" || loading) {
    return <div className="p-8 text-white/50">Loading...</div>;
  }

  return (
    <div className="bg-zinc-950 p-8 min-h-screen text-white relative">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-display uppercase tracking-widest text-accent-gold">Films & Entertainment</h2>
          <p className="text-white/50 mt-2">Manage your acting and production credits.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-white text-black px-6 py-3 font-bold uppercase tracking-widest hover:bg-accent-gold transition-colors text-sm rounded"
        >
          <Plus size={18} />
          <span>Add Film</span>
        </button>
      </div>

      <div className="bg-black border border-white/10 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal">Poster</th>
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal">Title</th>
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal">Release Date</th>
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal">Featured</th>
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {films.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/30">
                  No films found. Create one!
                </td>
              </tr>
            ) : (
              films.map((film) => (
                <tr key={film.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    {film.posterUrl ? (
                      <img src={film.posterUrl} alt="Poster" className="w-12 h-16 object-cover rounded bg-white/10" />
                    ) : (
                      <div className="w-12 h-16 bg-white/5 rounded flex items-center justify-center text-white/20 text-xs text-center leading-tight">No img</div>
                    )}
                  </td>
                  <td className="p-4 font-medium">{film.title}</td>
                  <td className="p-4 text-white/70">
                    {film.releaseDate ? new Date(film.releaseDate).toLocaleDateString() : 'TBA'}
                  </td>
                  <td className="p-4">
                    {film.featured ? <Check className="text-accent-gold" size={18} /> : <span className="text-white/20">-</span>}
                  </td>
                  <td className="p-4 flex justify-end space-x-3 items-center h-[73px]">
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
              <h3 className="text-2xl font-display uppercase tracking-widest text-accent-gold">Add New Film</h3>
              <button onClick={() => setShowModal(false)} className="text-white/50 hover:text-white"><X /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Poster Artwork</label>
                <ImageUploader onUpload={(url) => setFormData({...formData, posterUrl: url})} defaultImage={formData.posterUrl} />
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
                <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Description / Synopsis</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent-gold outline-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Trailer URL (YouTube)</label>
                  <input type="url" value={formData.trailerUrl} onChange={e => setFormData({...formData, trailerUrl: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent-gold outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Full Video URL (Optional)</label>
                  <input type="url" value={formData.videoUrl} onChange={e => setFormData({...formData, videoUrl: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent-gold outline-none text-sm" />
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 accent-accent-gold" />
                <label htmlFor="featured" className="text-sm uppercase tracking-widest text-white/70">Feature on Homepage</label>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-end space-x-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 border border-white/10 rounded text-white/70 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">Cancel</button>
                <button type="submit" className="px-6 py-3 bg-accent-gold text-black rounded hover:bg-white transition-colors uppercase tracking-widest text-sm font-bold">Save Film</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
