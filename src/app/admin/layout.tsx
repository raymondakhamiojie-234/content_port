import { AuthProvider } from "@/components/providers/AuthProvider";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex">
      <AuthProvider>
        <AdminSidebar />
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </AuthProvider>
    </div>
  );
}
