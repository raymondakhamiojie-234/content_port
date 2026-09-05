"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 text-white">
      <div className="w-full max-w-md p-8 border border-white/10 rounded-lg bg-black/50 backdrop-blur-sm shadow-xl">
        <h1 className="text-3xl font-display uppercase tracking-widest text-center mb-8 text-accent-gold">
          Admin Portal
        </h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 mb-6 rounded text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">
              Email
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-accent-gold transition-colors"
              placeholder="admin@queenfineshii.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-accent-gold transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-accent-gold transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
