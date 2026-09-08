"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, Image as ImageIcon, Music, Film, Map, MessageSquare } from "lucide-react";
import Link from "next/link";

export function AdminSidebar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status !== "authenticated" || pathname === "/admin/login") {
    return null;
  }

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Content Stage", icon: ImageIcon, href: "/admin/content" },
    { name: "Music", icon: Music, href: "/admin/music" },
    { name: "Films", icon: Film, href: "/admin/films" },
    { name: "Gallery", icon: ImageIcon, href: "/admin/gallery" },
    { name: "Journey", icon: Map, href: "/admin/journey" },
    { name: "Enquiries", icon: MessageSquare, href: "/admin/enquiries" },
  ];

  return (
    <aside className="w-64 bg-black border-r border-white/10 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-display uppercase tracking-widest text-accent-gold">Admin Portal</h1>
      </div>
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded transition-colors ${
                isActive ? 'bg-accent-gold/20 text-accent-gold' : 'hover:bg-white/5 text-white/80 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
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
  );
}
