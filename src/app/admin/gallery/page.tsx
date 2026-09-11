"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ImageUploader } from "@/components/ui/ImageUploader";

interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
  category: string | null;
  featured: boolean;
}

export default function GalleryAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    url: "",
    caption: "",
    category: "",
    featured: false
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated") {
      fetchImages();
    }
  }, [status, router]);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: GalleryImage) => {
    setEditingId(item.id);
    setFormData({
      url: item.url,
      caption: item.caption || "",
      category: item.category || "",
      featured: item.featured
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchImages();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...formData, id: editingId } : formData;
      const res = await fetch("/api/gallery", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setShowModal(false);
        setEditingId(null);
        setFormData({ url: "", caption: "", category: "", featured: false });
        fetchImages();
      }
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  if (status === "loading" || loading) {
    return <div className="p-8 text-white/50">Loading...</div>;
  }

  return (
    <div className="bg-zinc-950 p-8 min-h-screen text-white relative">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-display uppercase tracking-widest text-accent-gold">Gallery</h2>
          <p className="text-white/50 mt-2">Manage your photos, shoots, and visual assets.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-white text-black px-6 py-3 font-bold uppercase tracking-widest hover:bg-accent-gold transition-colors text-sm rounded"
        >
          <Plus size={18} />
          <span>Add Image</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map(img => (
          <div key={img.id} className="bg-black border border-white/10 rounded-lg overflow-hidden group">
            <div className="aspect-square relative bg-white/5">
              <img src={img.url} alt={img.caption || "Gallery image"} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-4 transition-opacity">
                <button onClick={() => handleEdit(img)} className="p-3 bg-white/10 rounded-full hover:bg-white/20 text-white"><Edit2 size={18} /></button>
                <button onClick={() => handleDelete(img.id)} className="p-3 bg-red-500/20 rounded-full hover:bg-red-500/40 text-red-400"><Trash2 size={18} /></button>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-white/80 line-clamp-1">{img.caption || "No caption"}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs uppercase tracking-widest text-accent-gold">{img.category || "General"}</span>
                {img.featured && <Check size={14} className="text-white/50" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-white/10 rounded-lg max-w-xl w-full p-8 my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-display uppercase tracking-widest text-accent-gold">Add New Image</h3>
              <button onClick={() => setShowModal(false)} className="text-white/50 hover:text-white"><X /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Upload Photo</label>
                <ImageUploader onUpload={(url) => setFormData({...formData, url: url})} defaultImage={formData.url} />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Caption (Optional)</label>
                <input type="text" value={formData.caption} onChange={e => setFormData({...formData, caption: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent-gold outline-none" />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent-gold outline-none">
                  <option value="">Select Category...</option>
                  <option value="Photoshoot">Photoshoot</option>
                  <option value="Behind the Scenes">Behind the Scenes</option>
                  <option value="Events">Events</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 accent-accent-gold" />
                <label htmlFor="featured" className="text-sm uppercase tracking-widest text-white/70">Feature in Main Gallery</label>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-end space-x-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 border border-white/10 rounded text-white/70 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">Cancel</button>
                <button type="submit" disabled={!formData.url} className="px-6 py-3 bg-accent-gold text-black rounded hover:bg-white transition-colors uppercase tracking-widest text-sm font-bold disabled:opacity-50">Save Image</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
