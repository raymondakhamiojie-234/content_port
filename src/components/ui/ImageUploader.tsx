"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  defaultImage?: string;
}

export function ImageUploader({ onUpload, defaultImage }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setPreview(data.url);
        onUpload(data.url);
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10 group">
          <Image src={preview} alt="Upload preview" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <button 
              onClick={() => { setPreview(null); onUpload(""); }}
              className="bg-red-500 text-white p-2 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-white/10 border-dashed rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-3 text-white/50" />
            <p className="mb-2 text-sm text-white/50">
              <span className="font-semibold">{uploading ? "Uploading..." : "Click to upload"}</span>
            </p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*,video/*" 
            onChange={handleUpload} 
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}
