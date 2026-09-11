"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Check } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ImageUploader } from "@/components/ui/ImageUploader";

interface ContentPost {
  id: string;
  title: string | null;
  caption: string | null;
  platform: string;
  featured: boolean;
}

export default function ContentAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState<ContentPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    platform: "tiktok",
    url: "",
    mediaUrl: "",
    category: "",
    featured: false
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated") {
      fetchContent();
    }
  }, [status, router]);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content");
      const data = await res.json();
      setContent(data);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: ContentPost) => {
    setEditingId(item.id);
    setFormData({
      title: item.title || "",
      caption: item.caption || "",
      platform: item.platform || "tiktok",
      url: (item as any).url || "",
      mediaUrl: (item as any).mediaUrl || "",
      category: (item as any).category || "",
      featured: item.featured
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content?")) return;
    try {
      const res = await fetch(`/api/content?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchContent();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...formData, id: editingId } : formData;
      const res = await fetch("/api/content", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setShowModal(false);
        setEditingId(null);
        setFormData({ title: "", caption: "", platform: "tiktok", url: "", mediaUrl: "", category: "", featured: false });
        fetchContent();
      }
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  if (status === "loading" || loading) {
    return <div className="p-8 text-white/50">Loading...</div>;
  }

  return (
    <div className="bg-zinc-950 p-8 min-h-screen text-white">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-display uppercase tracking-widest text-accent-gold">Content Stage</h2>
          <p className="text-white/50 mt-2">Manage your TikTok and Instagram viral moments.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-white text-black px-6 py-3 font-bold uppercase tracking-widest hover:bg-accent-gold transition-colors text-sm rounded"
        >
          <Plus size={18} />
          <span>Add Content</span>
        </button>
      </div>

      <div className="bg-black border border-white/10 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal">Title</th>
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal">Platform</th>
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal">Status</th>
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {content.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-white/30">
                  No content posts found. Create one!
                </td>
              </tr>
            ) : (
              content.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium">{item.title || item.caption || "Untitled"}</td>
                  <td className="p-4 text-white/70 capitalize">{item.platform}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded ${item.featured ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/50'}`}>
                      {item.featured ? 'Featured' : 'Standard'}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end space-x-3">
                    <button onClick={() => handleEdit(item)} className="p-2 text-white/50 hover:text-white transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-white/50 hover:text-red-400 transition-colors">
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
              <h3 className="text-2xl font-display uppercase tracking-widest text-accent-gold">Add New Content</h3>
              <button onClick={() => setShowModal(false)} className="text-white/50 hover:text-white"><X /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Thumbnail Image</label>
                <ImageUploader onUpload={(url) => setFormData({...formData, mediaUrl: url})} defaultImage={formData.mediaUrl} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Title</label>
                  <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent-gold outline-none" placeholder="Catchy title" />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Platform</label>
                  <select value={formData.platform} onChange={e => setFormData({...formData, platform: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent-gold outline-none">
                    <option value="tiktok">TikTok</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Caption</label>
                <textarea rows={3} value={formData.caption} onChange={e => setFormData({...formData, caption: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent-gold outline-none" />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-white/50 mb-2">Post URL (Link to video)</label>
                <input type="url" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent-gold outline-none text-sm" />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 accent-accent-gold" />
                <label htmlFor="featured" className="text-sm uppercase tracking-widest text-white/70">Feature prominently</label>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-end space-x-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 border border-white/10 rounded text-white/70 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">Cancel</button>
                <button type="submit" className="px-6 py-3 bg-accent-gold text-black rounded hover:bg-white transition-colors uppercase tracking-widest text-sm font-bold">Save Content</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
