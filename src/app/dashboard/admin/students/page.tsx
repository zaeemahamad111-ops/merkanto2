"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { useStudents, Student } from "@/hooks/useStudents";
import { useCourses } from "@/hooks/useCourses";

const TRACKS = ["Executive Track", "Foundation Track", "Advanced Track"];

const emptyForm = { name: "", email: "", password: "", progress: 0, lastModule: "Module 01" };

const getYouTubeEmbedUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtube.com")) return `https://www.youtube.com/embed/${urlObj.searchParams.get("v")}`;
    if (urlObj.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
  } catch (e) { return url; }
  return url;
};

export default function StudentManagementPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

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

  const { students, isLoaded, addStudent, updateStudent, deleteStudent } = useStudents();
  const { courses } = useCourses();
  const [modalOpen, setModalOpen] = useState(false);
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);


  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const openAdd = () => { setEditingId(null); setForm({ ...emptyForm }); setModalOpen(true); };
  const openEdit = (s: Student) => {
    setEditingId(s.id);
    setForm({ name: s.name, email: s.email, password: s.password || "", progress: s.progress, lastModule: s.lastModule || "" });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) { updateStudent(editingId, form); showToast("Student updated."); }
    else { addStudent(form); showToast("Student enrolled successfully."); }
    setModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Remove "${name}" from the system?`)) { deleteStudent(id); showToast("Student removed."); }
  };

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const avgProgress = students.length ? Math.round(students.reduce((a, s) => a + s.progress, 0) / students.length) : 0;

  if (!mounted || !authChecked) {
    return (
      <div className="flex h-screen bg-background items-center justify-center">
        <div className="text-primary font-bold uppercase tracking-widest text-xs" style={{ fontFamily: "Geist, monospace" }}>
          Authenticating Session...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <DashboardSidebar activeIndex={2} brandLabel="Global Operations" role="admin" onNewVenture={openAdd} />

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <header className="sticky top-0 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/10 z-40 px-6 md:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="ml-12 md:ml-0">
              <div className="uppercase tracking-[0.2em]" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "18px", fontWeight: 700 }}>STUDENT MANAGEMENT</div>
              <div className="text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Scholar Registry / Enrollment Control</div>
            </div>
            <button onClick={openAdd} className="bg-primary text-background px-6 py-3 font-bold uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>person_add</span>
              Enroll Student
            </button>
          </div>
        </header>

        <div className="p-6 md:p-8 space-y-8">
          {/* Stats */}
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {[
              { label: "Total Enrolled", value: students.length, icon: "group", delta: "+5 this month" },
              { label: "Avg. Progress", value: `${avgProgress}%`, icon: "query_stats", delta: "Across all modules" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-6">
                <span className="material-symbols-outlined text-primary mb-3 block" style={{ fontSize: "28px" }}>{stat.icon}</span>
                <div className="text-on-surface-variant uppercase tracking-widest mb-1" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>{stat.label}</div>
                <div className="font-black" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "36px" }}>{stat.value}</div>
                <div className="text-primary mt-1" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>{stat.delta}</div>
              </div>
            ))}
          </motion.div>

          {/* Filters */}
          <motion.div className="flex flex-col md:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontSize: "20px" }}>search</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full bg-surface-container border border-outline-variant/20 focus:border-primary focus:outline-none text-white pl-10 pr-4 py-3"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
              />
            </div>

          </motion.div>

          {/* Table */}
          <motion.div className="glass-card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-outline-variant/20">
                    {["Scholar", "Email", "Progress", "Last Module", "Status", "Actions"].map(h => (
                      <th key={h} className="text-left px-6 py-4 text-on-surface-variant uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoaded && filtered.map((s) => (
                    <tr key={s.id} className="border-b border-outline-variant/10 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "13px" }}>
                            {s.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <div className="text-on-surface" style={{ fontFamily: "Geist, monospace", fontSize: "13px" }}>{s.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px" }}>{s.email}</td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 min-w-[120px]">
                          <div className="flex-1 h-1 bg-surface-container-highest rounded-full">
                            <div className="h-1 bg-primary rounded-full" style={{ width: `${s.progress}%` }} />
                          </div>
                          <span className="text-primary shrink-0" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>{s.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>{s.lastModule}</td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => { setSelectedStudent(s); setProgressModalOpen(true); }} className="w-8 h-8 border border-outline-variant flex items-center justify-center hover:border-primary hover:text-primary transition-all text-on-surface-variant" title="View Progress">
                            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>visibility</span>
                          </button>
                          <button onClick={() => openEdit(s)} className="w-8 h-8 border border-outline-variant flex items-center justify-center hover:border-primary hover:text-primary transition-all text-on-surface-variant" title="Edit">
                            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>edit</span>
                          </button>
                          <button onClick={() => handleDelete(s.id, s.name)} className="w-8 h-8 border border-outline-variant flex items-center justify-center hover:border-red-400 hover:text-red-400 transition-all text-on-surface-variant" title="Delete">
                            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {isLoaded && filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
                        No students found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Student Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="glass-card w-full max-w-lg p-6 md:p-8 border border-primary/20 relative max-h-[90vh] overflow-y-auto my-auto">
              <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
              <h2 className="text-white mb-6 uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "14px" }}>
                {editingId ? "Edit Scholar" : "Enroll New Scholar"}
              </h2>
              <form onSubmit={handleSave} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>Full Name *</label>
                    <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary focus:outline-none text-white py-2 px-0" placeholder="e.g. Jane Doe" />
                  </div>
                  <div>
                    <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>Email *</label>
                    <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary focus:outline-none text-white py-2 px-0" placeholder="jane@university.edu" />
                  </div>
                </div>
                <div>
                  <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>Initial Password</label>
                  <input type="text" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary focus:outline-none text-white py-2 px-0" placeholder="Set a temporary password" />
                </div>



                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-3 border border-outline-variant uppercase tracking-widest hover:bg-white/5 transition-colors" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-primary text-background font-bold uppercase tracking-widest hover:brightness-110 transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>
                    {editingId ? "Save Changes" : "Enroll Scholar"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Modal */}
      <AnimatePresence>
        {progressModalOpen && selectedStudent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="glass-card w-full max-w-2xl p-6 md:p-8 border border-primary/20 relative max-h-[90vh] overflow-y-auto my-auto">
              <button onClick={() => setProgressModalOpen(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
              <h2 className="text-white mb-2 uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "14px" }}>
                {selectedStudent.name}'s Progress
              </h2>
              <div className="text-on-surface-variant mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px" }}>
                Watched Videos Log
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                {selectedStudent.watchedVideos && selectedStudent.watchedVideos.length > 0 ? (
                  selectedStudent.watchedVideos.map((url, i) => {
                    let matchedCourseTitle = "Unknown Module";
                    let matchedSessionTitle = "Unknown Lesson";
                    
                    for (const c of courses) {
                      if (c.sessions) {
                        const session = c.sessions.find(s => getYouTubeEmbedUrl(s.youtubeUrl) === url || s.youtubeUrl === url);
                        if (session) {
                          matchedCourseTitle = c.title;
                          matchedSessionTitle = session.title;
                          break;
                        }
                      }
                    }
                    
                    return (
                      <div key={i} className="bg-surface-container-low border border-outline-variant/10 p-4 flex items-center gap-4">
                        <span className="material-symbols-outlined text-primary">play_circle</span>
                        <div>
                          <div className="text-on-surface" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "15px" }}>
                            {matchedCourseTitle} — {matchedSessionTitle}
                          </div>
                          <div className="text-on-surface-variant truncate w-64 md:w-96" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>
                            {url}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center p-8 text-on-surface-variant border border-dashed border-outline-variant/20">
                    No videos watched yet.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface-container border border-primary/30 px-6 py-3 z-[200] shadow-xl">
            <span className="text-on-surface" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
