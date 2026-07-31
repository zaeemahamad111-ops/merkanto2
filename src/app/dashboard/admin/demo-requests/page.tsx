"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { useDemo } from "@/hooks/useDemo";

export default function AdminDemoRequestsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const { demoRequests, isLoaded, updateDemoStatus } = useDemo();

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("merkanto_role");
      const user = localStorage.getItem("merkanto_user");
      if (!role || !user || role !== "admin") {
        router.push("/login");
      } else {
        setAuthChecked(true);
      }
    }
  }, [router]);

  const handleStatusChange = async (id: string, newStatus: "pending" | "approved" | "paused" | "rejected") => {
    await updateDemoStatus(id, newStatus);
  };

  if (!mounted || !authChecked) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-primary font-bold uppercase tracking-widest text-xs" style={{ fontFamily: "Geist, monospace" }}>
          Authenticating Session...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar activeIndex={5} brandLabel="Global Operations" role="admin" />

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <header className="sticky top-0 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/10 z-40 px-6 md:px-8 py-5">
          <div className="flex items-center justify-between">
             <div className="ml-12 md:ml-0">
               <div className="uppercase tracking-[0.2em] text-white" style={{ fontFamily: "Outfit, sans-serif", fontSize: "18px", fontWeight: 700 }}>DEMO REQUESTS</div>
               <div className="text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Manage Access to the Course Preview</div>
             </div>
          </div>
        </header>

        <div className="p-6 md:p-8 space-y-8">
          {/* Table */}
          <motion.div className="glass-card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                    {["User", "Email", "Role", "Status", "Actions"].map(h => (
                      <th key={h} className="text-left px-6 py-4 text-on-surface-variant uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoaded && demoRequests.map((req) => (
                    <tr key={req.id} className="border-b border-outline-variant/10 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white" style={{ fontFamily: "Geist, monospace", fontSize: "13px" }}>{req.name}</td>
                      <td className="px-6 py-4 text-on-surface-variant" style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px" }}>{req.email}</td>
                      <td className="px-6 py-4 text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>{req.role}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 uppercase tracking-widest text-[9px] font-bold ${
                          req.demo_status === 'approved' ? 'bg-primary/20 text-primary' : 
                          req.demo_status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                          'bg-red-500/20 text-red-500'
                        }`} style={{ fontFamily: "Geist, monospace" }}>
                          {req.demo_status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {req.demo_status !== 'approved' && (
                            <button onClick={() => handleStatusChange(req.id, "approved")} className="px-3 py-1 border border-primary text-primary hover:bg-primary/20 transition-colors uppercase tracking-widest text-[10px]" style={{ fontFamily: "Geist, monospace" }}>
                              Approve
                            </button>
                          )}
                          {req.demo_status !== 'paused' && (
                            <button onClick={() => handleStatusChange(req.id, "paused")} className="px-3 py-1 border border-yellow-500 text-yellow-500 hover:bg-yellow-500/20 transition-colors uppercase tracking-widest text-[10px]" style={{ fontFamily: "Geist, monospace" }}>
                              Pause
                            </button>
                          )}
                          {req.demo_status !== 'rejected' && (
                            <button onClick={() => handleStatusChange(req.id, "rejected")} className="px-3 py-1 border border-red-500 text-red-500 hover:bg-red-500/20 transition-colors uppercase tracking-widest text-[10px]" style={{ fontFamily: "Geist, monospace" }}>
                              Reject
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {isLoaded && demoRequests.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant uppercase tracking-widest text-xs" style={{ fontFamily: "Geist, monospace" }}>
                        No demo requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
