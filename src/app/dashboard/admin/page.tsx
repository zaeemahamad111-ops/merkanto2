"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { useCourses, Session } from "@/hooks/useCourses";
import { useStudents } from "@/hooks/useStudents";

interface SessionForm {
  id: string;
  title: string;
  youtubeUrl: string;
  description?: string;
  img?: string;
}

const emptySessionForm = (): SessionForm => ({
  id: Math.random().toString(36).substring(2, 9),
  title: "",
  youtubeUrl: "",
  description: "",
  img: ""
});

export default function AdminHubPage() {
  const router = useRouter();
  const { courses, addCourse, updateCourse, deleteCourse, isLoaded } = useCourses();
  const { students } = useStudents();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    sessions: SessionForm[];
  }>({
    title: "",
    description: "",
    sessions: [emptySessionForm()]
  });

  const [notifOpen, setNotifOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [viewAll, setViewAll] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      sessions: [emptySessionForm()]
    });
    setIsModalOpen(true);
  };

  const openEditModal = (course: any) => {
    setEditingId(course.id);
    setFormData({
      title: course.title,
      description: course.description || "",
      sessions: course.sessions && course.sessions.length > 0 
        ? course.sessions.map((s: any) => ({ ...s })) 
        : [emptySessionForm()]
    });
    setIsModalOpen(true);
  };

  const handleAddSessionField = () => {
    setFormData(prev => ({
      ...prev,
      sessions: [...prev.sessions, emptySessionForm()]
    }));
  };

  const handleRemoveSessionField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sessions: prev.sessions.filter((_, i) => i !== index)
    }));
  };

  const handleSessionChange = (index: number, field: keyof SessionForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      sessions: prev.sessions.map((session, i) => 
        i === index ? { ...session, [field]: value } : session
      )
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out sessions that don't have titles and URLs
    const cleanedSessions = formData.sessions.filter(s => s.title.trim() !== "" && s.youtubeUrl.trim() !== "");
    
    const coursePayload = {
      title: formData.title,
      description: formData.description,
      sessions: cleanedSessions
    };

    if (editingId) {
      updateCourse(editingId, coursePayload);
      showToast("Course module updated successfully.");
    } else {
      addCourse(coursePayload);
      showToast("New course module created successfully.");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      deleteCourse(id);
      showToast("Module deleted.");
    }
  };

  const displayedCourses = viewAll ? courses : courses.slice(0, 3);
  
  // Calculate true, actual stats
  const totalCourses = courses.length;
  const enrolledStudents = students.length;
  
  // Count how many videos actually watched across all students
  const totalWatchedVideos = students.reduce((acc, s) => acc + (s.watchedVideos ? s.watchedVideos.length : 0), 0);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <DashboardSidebar activeIndex={0} brandLabel="Global Operations" role="admin" onNewVenture={openAddModal} />

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <header className="sticky top-0 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/10 z-40 px-6 md:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="ml-12 md:ml-0">
              <div className="uppercase tracking-[0.2em]" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "18px", fontWeight: 700 }}>
                ADMINISTRATION PORTAL
              </div>
              <div className="text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>
                System Overview / Command Center
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="hover:text-primary transition-colors text-on-surface-variant relative"
                >
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                </button>
                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 top-10 w-80 glass-card border border-outline-variant/20 p-4 shadow-2xl z-50"
                    >
                      <div className="text-on-surface uppercase tracking-widest mb-3" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>NOTIFICATIONS</div>
                      {[
                        { text: "James Sterling started Lesson 1", time: "Dynamic Log" },
                        { text: "Aisha Nair watched Global Trade Basics", time: "Dynamic Log" },
                      ].map((n, i) => (
                        <div key={i} className="py-3 border-b border-outline-variant/10 last:border-0">
                          <div className="text-on-surface text-sm">{n.text}</div>
                          <div className="text-on-surface-variant mt-1" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>{n.time}</div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: "20px" }}>person</span>
                </div>
                <div className="hidden md:block">
                  <div className="text-on-surface" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>Admin — Merkanto</div>
                  <div className="text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Executive Director</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 space-y-8">
          {/* Real Metrics Bento */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="mb-6 uppercase tracking-[0.2em]" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>PORTAL OVERVIEW</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-primary mb-4 block" style={{ fontSize: "32px" }}>library_books</span>
                  <div className="text-on-surface-variant uppercase tracking-widest mb-2" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>ACTIVE COURSE MODULES</div>
                  <div className="font-black text-white" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "40px" }}>{totalCourses}</div>
                </div>
                <div className="text-primary mt-4" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Total modules available inside academy</div>
              </div>

              <div className="glass-card p-6 flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-primary mb-4 block" style={{ fontSize: "32px" }}>group</span>
                  <div className="text-on-surface-variant uppercase tracking-widest mb-2" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>ENROLLED SCHOLARS</div>
                  <div className="font-black text-white" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "40px" }}>{enrolledStudents}</div>
                </div>
                <div className="text-primary mt-4" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Actual registered students list</div>
              </div>

              <div className="glass-card p-6 flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-primary mb-4 block" style={{ fontSize: "32px" }}>play_circle</span>
                  <div className="text-on-surface-variant uppercase tracking-widest mb-2" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>COMPLETED LESSONS</div>
                  <div className="font-black text-white" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "40px" }}>{totalWatchedVideos}</div>
                </div>
                <div className="text-primary mt-4" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Total distinct lessons watched by all students</div>
              </div>
            </div>
          </motion.section>

          {/* Academy Modules */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="uppercase tracking-[0.2em]" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>ACADEMY MODULES</h2>
              <button
                onClick={() => setViewAll(!viewAll)}
                className="text-primary flex items-center gap-2 hover:gap-4 transition-all"
                style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}
              >
                {viewAll ? "Show Less" : "View All"} <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{viewAll ? "expand_less" : "arrow_forward"}</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {isLoaded && displayedCourses.map((mod) => (
                <div key={mod.id} className="glass-card group overflow-hidden flex flex-col">
                  <div className="h-40 overflow-hidden shrink-0">
                    <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" src={mod.img || "https://lh3.googleusercontent.com/aida-public/AB6AXuCklkeF4ZuMkBb75fsxKi5nNkwJbIhrHIfNrxc6miByGr7FpA4eCJjXy8z_KyvgKdU9Vgsg0I_REtweRpXHgVzsxFBhAluhenfRbhDS8tYaTVc4Mfx9PLYrGgntSE0cWyF2fbIryXFXGkShzU8jQptEPPYrx35C-BpX1nM2yFBdqXP1yHMZ2Bibq3eTXcynJBrjvUcLi7qFDaOX0BEa-EaMaR9vDB1idAOkW_dvivnre8ApnLwmHG4xZrWHFH9JZ2Vsbe7p-KHwJw"} alt={mod.title} />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "16px" }}>{mod.title}</h4>
                        <button
                          onClick={() => updateCourse(mod.id, { status: mod.status === "Live" ? "Draft" : "Live" })}
                          className={`px-2 py-1 shrink-0 cursor-pointer transition-all ${mod.status === "Live" ? "bg-primary/20 text-primary hover:bg-primary/30" : "bg-surface-container-highest text-on-surface-variant hover:bg-primary/10 hover:text-primary"}`}
                          style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}
                          title="Toggle Live/Draft"
                        >
                          {mod.status}
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>video_library</span>
                        {mod.sessions ? mod.sessions.length : 0} Video Lessons
                      </div>
                      {mod.description && (
                        <p className="text-on-surface-variant mt-2 line-clamp-2" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px" }}>{mod.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4 pt-4 border-t border-outline-variant/20">
                      <button onClick={() => openEditModal(mod)} className="flex-1 border border-outline-variant py-2 hover:border-primary hover:text-primary transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(mod.id, mod.title)} className="flex-1 border border-outline-variant py-2 text-red-400 hover:border-red-400 hover:bg-red-400/10 transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div onClick={openAddModal} className="border-2 border-dashed border-outline-variant/30 hover:border-primary/30 transition-colors flex flex-col items-center justify-center p-12 cursor-pointer group min-h-[280px]">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors mb-4" style={{ fontSize: "48px" }}>add_circle</span>
                <div className="text-on-surface-variant group-hover:text-on-surface transition-colors uppercase tracking-widest text-center" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>Upload New Module</div>
              </div>
            </div>
          </motion.section>

          {/* Student Activity Log */}
          <motion.div className="grid grid-cols-1 gap-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="glass-card p-6">
              <h2 className="mb-6 uppercase tracking-[0.2em]" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>STUDENT REGISTRY & STATUS</h2>
              <div className="space-y-5">
                {students.slice(0, 4).map((student) => (
                  <div key={student.id}>
                    <div className="flex justify-between mb-1">
                      <div className="text-on-surface" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>{student.name} ({student.email})</div>
                      <div className="text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>
                        {student.watchedVideos ? student.watchedVideos.length : 0} Lessons Watched · {student.progress}%
                      </div>
                    </div>
                    <div className="h-1 bg-surface-container-highest rounded-full">
                      <div className="h-1 rounded-full transition-all" style={{ width: `${student.progress}%`, background: student.progress > 80 ? "#46e176" : student.progress > 50 ? "#46e176aa" : "#46e17660" }} />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => router.push("/dashboard/admin/students")}
                className="mt-8 w-full border border-outline-variant py-3 uppercase tracking-widest hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}
              >
                Go to Student Registry <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Course Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="glass-card w-full max-w-2xl p-8 border border-primary/20 relative my-8">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
              <h2 className="text-white mb-6 uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "14px" }}>
                {editingId ? "Edit Course Module" : "Upload New Course Module"}
              </h2>
              
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>Course Title *</label>
                  <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary focus:outline-none transition-colors text-white py-2 px-0" placeholder="e.g. Advanced Logistics" />
                </div>
                
                <div>
                  <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>Description (Optional)</label>
                  <textarea rows={2} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary focus:outline-none transition-colors text-white py-2 px-0 resize-none" placeholder="A brief overview of the module..." />
                </div>

                {/* Video Sessions list */}
                <div className="border-t border-outline-variant/20 pt-4 space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="uppercase tracking-widest text-white" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>LESSON SESSIONS / VIDEOS</span>
                    <button type="button" onClick={handleAddSessionField} className="text-primary hover:underline flex items-center gap-1 uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>add</span> Add Lesson
                    </button>
                  </div>

                  <div className="space-y-4 max-h-72 overflow-y-auto custom-scrollbar pr-2">
                    {formData.sessions.map((session, index) => (
                      <div key={session.id} className="p-4 bg-surface-container border border-outline-variant/10 space-y-3 relative">
                        <button 
                          type="button" 
                          onClick={() => handleRemoveSessionField(index)} 
                          className="absolute top-2 right-2 text-on-surface-variant hover:text-red-400 transition-colors"
                          title="Remove Lesson"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>delete</span>
                        </button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          <div>
                            <label className="text-on-surface-variant uppercase tracking-widest mb-1 block" style={{ fontFamily: "Geist, monospace", fontSize: "9px" }}>Lesson Title *</label>
                            <input type="text" required value={session.title} onChange={e => handleSessionChange(index, "title", e.target.value)} className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary focus:outline-none text-white text-xs py-1" placeholder="e.g. Session 1: Basics" />
                          </div>
                          <div>
                            <label className="text-on-surface-variant uppercase tracking-widest mb-1 block" style={{ fontFamily: "Geist, monospace", fontSize: "9px" }}>YouTube Link *</label>
                            <input type="url" required value={session.youtubeUrl} onChange={e => handleSessionChange(index, "youtubeUrl", e.target.value)} className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary focus:outline-none text-white text-xs py-1" placeholder="https://youtube.com/watch?v=..." />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="text-on-surface-variant uppercase tracking-widest mb-1 block" style={{ fontFamily: "Geist, monospace", fontSize: "9px" }}>Lesson Cover Image (Optional)</label>
                            <input type="url" value={session.img} onChange={e => handleSessionChange(index, "img", e.target.value)} className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary focus:outline-none text-white text-xs py-1" placeholder="https://example.com/cover.jpg" />
                          </div>
                          <div>
                            <label className="text-on-surface-variant uppercase tracking-widest mb-1 block" style={{ fontFamily: "Geist, monospace", fontSize: "9px" }}>Lesson Description</label>
                            <input type="text" value={session.description} onChange={e => handleSessionChange(index, "description", e.target.value)} className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary focus:outline-none text-white text-xs py-1" placeholder="What will they learn?" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-4 border-t border-outline-variant/20">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border border-outline-variant uppercase tracking-widest hover:bg-white/5 transition-colors" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-primary text-background font-bold uppercase tracking-widest hover:brightness-110 transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Save Course</button>
                </div>
              </form>
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

      {/* Close notifications on outside click */}
      {notifOpen && <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />}
    </div>
  );
}
