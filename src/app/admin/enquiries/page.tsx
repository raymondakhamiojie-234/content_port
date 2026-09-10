"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Trash2, Mail } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Enquiry {
  id: string;
  fullName: string;
  company: string | null;
  email: string;
  phone: string | null;
  opportunityType: string;
  budgetRange: string | null;
  message: string;
  status: string;
  createdAt: string;
}

export default function EnquiriesAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated") {
      fetchEnquiries();
    }
  }, [status, router]);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("/api/enquiries");
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data);
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return <div className="p-8 text-white/50">Loading...</div>;
  }

  return (
    <div className="bg-zinc-950 p-8 min-h-screen text-white">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-display uppercase tracking-widest text-accent-gold">Business Enquiries</h2>
          <p className="text-white/50 mt-2">Manage inbound brand deals and communications.</p>
        </div>
      </div>

      <div className="bg-black border border-white/10 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal">Contact</th>
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal">Opportunity</th>
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal">Date</th>
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal">Status</th>
              <th className="p-4 text-xs uppercase tracking-widest text-white/50 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/30 flex flex-col items-center justify-center">
                  <MessageSquare className="w-12 h-12 text-white/10 mb-4" />
                  <p>No enquiries received yet.</p>
                </td>
              </tr>
            ) : (
              enquiries.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <p className="font-medium">{item.fullName}</p>
                    <p className="text-xs text-white/50">{item.email}</p>
                    {item.company && <p className="text-xs text-accent-gold mt-1">{item.company}</p>}
                  </td>
                  <td className="p-4">
                    <p className="text-white/80">{item.opportunityType}</p>
                    {item.budgetRange && <p className="text-xs text-green-400 mt-1">{item.budgetRange}</p>}
                  </td>
                  <td className="p-4 text-sm text-white/50">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded ${item.status === 'NEW' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-white/50'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end space-x-3">
                    <a href={`mailto:${item.email}`} className="p-2 text-white/50 hover:text-white transition-colors">
                      <Mail size={16} />
                    </a>
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
    </div>
  );
}
