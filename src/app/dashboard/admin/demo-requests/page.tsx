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

  const { demoRequests, isLoaded, updateDemoStatus, deleteDemoRequest, clearAllDemoRequests, fetchDemoVideos, saveDemoVideos } = useDemo();

  const [v1Title, setV1Title] = useState("Demo Video 1: Masterclass Overview");
  const [v1Url, setV1Url] = useState("https://player.vimeo.com/video/1197817919?h=31d77d474c");
  const [v2Title, setV2Title] = useState("Demo Video 2: Operational Systems Preview");
  const [v2Url, setV2Url] = useState("https://player.vimeo.com/video/1197817919?h=31d77d474c");
  const [savingVideos, setSavingVideos] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("merkanto_role");
      const user = localStorage.getItem("merkanto_user");
      if (!role || !user || role !== "admin") {
        router.push("/login");
      } else {
        setAuthChecked(true);
        loadVideos();
      }
    }
  }, [router]);

  const loadVideos = async () => {
    const vids = await fetchDemoVideos();
    setV1Title(vids.v1.title);
    setV1Url(vids.v1.url);
    setV2Title(vids.v2.title);
    setV2Url(vids.v2.url);
  };

  const handleSaveDemoVideos = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingVideos(true);
    setSaveMsg("");
    const ok = await saveDemoVideos(
      { title: v1Title, url: v1Url },
      { title: v2Title, url: v2Url }
    );
    if (ok) {
      setSaveMsg("Demo videos saved successfully!");
      setTimeout(() => setSaveMsg(""), 3000);
    }
    setSavingVideos(false);
  };

  const handleStatusChange = async (id: string, newStatus: "pending" | "approved" | "paused" | "rejected") => {
    await updateDemoStatus(id, newStatus);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Delete demo request for "${name}"?`)) {
      await deleteDemoRequest(id);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to delete ALL demo requests?")) {
      await clearAllDemoRequests();
    }
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
               <div className="uppercase tracking-[0.2em] text-white" style={{ fontFamily: "Outfit, sans-serif", fontSize: "18px", fontWeight: 700 }}>DEMO MANAGEMENT</div>
               <div className="text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Manage Demo Videos & Access Requests</div>
             </div>
             {demoRequests.length > 0 && (
               <button onClick={handleClearAll} className="px-4 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors uppercase tracking-widest text-xs font-bold" style={{ fontFamily: "Geist, monospace" }}>
                 Clear All Requests
               </button>
             )}
          </div>
        </header>

        <div className="p-6 md:p-8 space-y-8">
          {/* Demo Videos Management Card */}
          <motion.div className="glass-card p-6 border-l-4 border-l-primary space-y-6" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white uppercase tracking-[0.15em] font-bold text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>
                  DEMO VIDEOS CONFIGURATION
                </h3>
                <p className="text-on-surface-variant text-xs mt-1" style={{ fontFamily: "Geist, monospace" }}>
                  Configure the 2 Demo Videos shown to approved users on the /demo page.
                </p>
              </div>
              {saveMsg && (
                <span className="text-primary text-xs uppercase tracking-widest font-bold bg-primary/10 border border-primary/30 px-3 py-1.5" style={{ fontFamily: "Geist, monospace" }}>
                  {saveMsg}
                </span>
              )}
            </div>

            <form onSubmit={handleSaveDemoVideos} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Video 1 */}
                <div className="p-4 bg-surface-container-low border border-outline-variant/20 rounded space-y-4">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider font-mono">
                    <span className="material-symbols-outlined text-[16px]">video_library</span> Demo Video 1
                  </div>
                  <div>
                    <label className="text-on-surface-variant uppercase tracking-widest block text-[9px] mb-1 font-mono">Title</label>
                    <input type="text" required value={v1Title} onChange={e => setV1Title(e.target.value)} className="w-full bg-surface-container border border-outline-variant/30 focus:border-primary focus:outline-none text-white px-3 py-2 text-xs" placeholder="e.g. Masterclass Overview" />
                  </div>
                  <div>
                    <label className="text-on-surface-variant uppercase tracking-widest block text-[9px] mb-1 font-mono">Vimeo URL / Embed Code</label>
                    <input type="text" required value={v1Url} onChange={e => setV1Url(e.target.value)} className="w-full bg-surface-container border border-outline-variant/30 focus:border-primary focus:outline-none text-white px-3 py-2 text-xs font-mono" placeholder="https://vimeo.com/... or iframe embed" />
                  </div>
                </div>

                {/* Video 2 */}
                <div className="p-4 bg-surface-container-low border border-outline-variant/20 rounded space-y-4">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider font-mono">
                    <span className="material-symbols-outlined text-[16px]">video_library</span> Demo Video 2
                  </div>
                  <div>
                    <label className="text-on-surface-variant uppercase tracking-widest block text-[9px] mb-1 font-mono">Title</label>
                    <input type="text" required value={v2Title} onChange={e => setV2Title(e.target.value)} className="w-full bg-surface-container border border-outline-variant/30 focus:border-primary focus:outline-none text-white px-3 py-2 text-xs" placeholder="e.g. Operational Systems Preview" />
                  </div>
                  <div>
                    <label className="text-on-surface-variant uppercase tracking-widest block text-[9px] mb-1 font-mono">Vimeo URL / Embed Code</label>
                    <input type="text" required value={v2Url} onChange={e => setV2Url(e.target.value)} className="w-full bg-surface-container border border-outline-variant/30 focus:border-primary focus:outline-none text-white px-3 py-2 text-xs font-mono" placeholder="https://vimeo.com/... or iframe embed" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" disabled={savingVideos} className="bg-primary text-background font-bold px-6 py-2.5 uppercase tracking-widest text-xs hover:brightness-110 transition-all disabled:opacity-50" style={{ fontFamily: "Geist, monospace" }}>
                  {savingVideos ? "Saving..." : "Save Demo Videos"}
                </button>
              </div>
            </form>
          </motion.div>
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
                          <button onClick={() => handleDelete(req.id, req.name)} className="px-2 py-1 border border-outline-variant text-on-surface-variant hover:text-red-400 hover:border-red-400/50 transition-colors" title="Delete request">
                            <span className="material-symbols-outlined text-[14px]">delete</span>
                          </button>
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
