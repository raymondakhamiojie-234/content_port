import { AuthProvider } from "@/components/providers/AuthProvider";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <AuthProvider>
        {children}
      </AuthProvider>
    </div>
  );
}
