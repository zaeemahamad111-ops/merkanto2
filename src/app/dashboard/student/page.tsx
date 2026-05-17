"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { useCourses, Course, Session } from "@/hooks/useCourses";
import { useStudents } from "@/hooks/useStudents";

const getEmbedUrl = (url: string) => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    if (u.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
  } catch { return url; }
  return url;
};

const files = ["Trade Finance Guide.pdf", "Global Operations customs_template.xlsx", "Merkanto Supplier Checklist.docx"];

const assignments = [
  { title: "Trade Finance Report", due: "Due in 3 days", status: "Pending", color: "text-yellow-400" },
  { title: "Customs Clearance Case Study", due: "Due in 7 days", status: "In Progress", color: "text-primary" },
  { title: "Supplier Negotiation Transcript", due: "Submitted", status: "Graded — 92/100", color: "text-green-400" },
];

const TABS = ["My Learning", "Course Library", "Resources"];

export default function StudentDashboardPage() {
  const { courses, isLoaded } = useCourses();
  const { students, markVideoWatched } = useStudents();
  const [activeTab, setActiveTab] = useState(0);
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [reminderSet, setReminderSet] = useState(false);
  const [submitted, setSubmitted] = useState<string[]>([]);

  // Resolve logged in student
  const userEmail = typeof window !== "undefined" ? localStorage.getItem("merkanto_user") : null;
  const currentStudent = students.find(s => s.email === userEmail) || {
    id: "s5",
    name: "James Sterling",
    email: "student@merkanto.com",
    track: "Executive Track",
    progress: 57,
    lastModule: "Module 06",
    status: "Active" as const,
    joinedDate: "2024-01-10",
    watchedVideos: []
  };

  const playVideo = (youtubeUrl: string) => {
    const embedUrl = getEmbedUrl(youtubeUrl);
    setPlayingUrl(embedUrl);
    if (currentStudent.id) {
      markVideoWatched(currentStudent.id, youtubeUrl);
      showToast("Lesson started. Progress recorded.");
    }
  };

  // Calculate dynamic progress
  const totalSessionsCount = courses.reduce((acc, c) => acc + (c.sessions ? c.sessions.length : 0), 0);
  const watchedSessionsCount = courses.reduce((acc, c) => {
    if (!c.sessions) return acc;
    const watchedInCourse = c.sessions.filter(s => currentStudent.watchedVideos?.includes(s.youtubeUrl)).length;
    return acc + watchedInCourse;
  }, 0);
  
  const dynamicCompletion = totalSessionsCount > 0 
    ? Math.round((watchedSessionsCount / totalSessionsCount) * 100) 
    : 0;

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
  const activeCourse = courses[0] ?? null;
  
  const filteredCourses = courses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <DashboardSidebar activeIndex={0} brandLabel="Academy Portal" role="student" />

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <header className="sticky top-0 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/10 z-40 px-6 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="ml-12 md:ml-0">
              <div className="text-on-surface uppercase tracking-[0.2em]" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "18px", fontWeight: 700 }}>ACADEMY DASHBOARD</div>
              <div className="text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Student Portal / Learning Center</div>
            </div>
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <button onClick={() => setSearchOpen(!searchOpen)} className="hover:text-primary transition-colors text-on-surface-variant">
                  <span className="material-symbols-outlined">search</span>
                </button>
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 220 }} exit={{ opacity: 0, width: 0 }} className="absolute right-0 top-10 overflow-hidden">
                      <input
                        autoFocus
                        value={searchQuery}
                        onChange={e => { setSearchQuery(e.target.value); setActiveTab(1); }}
                        placeholder="Search courses..."
                        className="w-full bg-surface-container border border-outline-variant/40 focus:border-primary focus:outline-none text-white px-4 py-2"
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "13px" }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Notifications */}
              <div className="relative">
                <button onClick={() => setNotifOpen(!notifOpen)} className="hover:text-primary transition-colors text-on-surface-variant relative">
                  <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                </button>
                <AnimatePresence>
                  {notifOpen && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 top-10 w-72 glass-card border border-outline-variant/20 p-4 z-50">
                      <div className="text-on-surface uppercase tracking-widest mb-3" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>NOTIFICATIONS</div>
                      {["New lesson available in your course", "Live session starts in 2h 34m"].map((n, i) => (
                        <div key={i} className="py-2 border-b border-outline-variant/10 last:border-0 text-sm text-on-surface-variant">{n}</div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold uppercase" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>
                  {currentStudent.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="hidden md:block">
                  <div className="text-on-surface" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>{currentStudent.name}</div>
                  <div className="text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>{currentStudent.track}</div>
                </div>
              </div>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-8 mt-4 border-b border-outline-variant/10 -mb-[1px]">
            {TABS.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i)} className={`pb-3 uppercase tracking-widest transition-colors ${activeTab === i ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-on-surface"}`} style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
                {tab}
              </button>
            ))}
          </div>
        </header>

        <div className="p-6 md:p-8 space-y-8">

          {/* TAB 0: MY LEARNING */}
          {activeTab === 0 && (
            <>
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h2 className="text-on-surface mb-6 uppercase tracking-[0.2em]" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>CURRENT ACTIVE MODULE</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {activeCourse ? (
                    <div className="lg:col-span-2 glass-card overflow-hidden">
                      <div className="p-6 md:p-8">
                        <div className="text-primary mb-1 uppercase tracking-wider font-bold" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Active Course</div>
                        <h3 className="mb-2" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "24px", fontWeight: 500 }}>{activeCourse.title}</h3>
                        <p className="text-on-surface-variant text-sm mb-6">{activeCourse.description || "Learn the ins and outs of global trade."}</p>

                        <div className="space-y-4">
                          <h4 className="text-white uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Video Lesson Sessions:</h4>
                          {activeCourse.sessions && activeCourse.sessions.length > 0 ? (
                            <div className="space-y-3">
                              {activeCourse.sessions.map((session, index) => {
                                const watched = currentStudent.watchedVideos?.includes(session.youtubeUrl);
                                return (
                                  <div key={session.id} className="p-4 bg-surface-container border border-outline-variant/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-primary/30 transition-all">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs text-primary font-bold" style={{ fontFamily: "Geist, monospace" }}>Lesson 0{index + 1}</span>
                                        {watched && <span className="bg-primary/20 text-primary text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider">✓ Completed</span>}
                                      </div>
                                      <div className="text-white font-bold mt-1" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "15px" }}>{session.title}</div>
                                      {session.description && <p className="text-on-surface-variant text-xs mt-1">{session.description}</p>}
                                    </div>
                                    <button 
                                      onClick={() => playVideo(session.youtubeUrl)} 
                                      className={`px-4 py-2 uppercase tracking-widest shrink-0 font-bold transition-all text-xs flex items-center gap-1 ${watched ? "bg-surface-container-highest text-on-surface-variant hover:text-white" : "bg-primary text-background hover:brightness-110"}`}
                                      style={{ fontFamily: "Geist, monospace" }}
                                    >
                                      <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                                      {watched ? "Replay" : "Play"}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="p-6 text-center text-on-surface-variant border border-dashed border-outline-variant/20 text-xs">
                              No video lessons loaded inside this course module.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="lg:col-span-2 glass-card p-12 flex items-center justify-center text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
                      No active course. Ask your admin to add modules.
                    </div>
                  )}
                  
                  {/* Module Progress */}
                  <div className="glass-card p-6">
                    <h3 className="text-on-surface mb-6 uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>MODULE PROGRESS</h3>
                    <div className="space-y-5">
                      {courses.map((c, i) => {
                        const totalS = c.sessions ? c.sessions.length : 0;
                        const watchedS = c.sessions 
                          ? c.sessions.filter(s => currentStudent.watchedVideos?.includes(s.youtubeUrl)).length 
                          : 0;
                        const courseProg = totalS > 0 ? Math.round((watchedS / totalS) * 100) : 0;
                        return (
                          <div key={c.id}>
                            <div className="flex justify-between mb-1">
                              <span className="text-on-surface-variant truncate w-40" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>{c.title}</span>
                              <span className="text-primary" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>{courseProg}%</span>
                            </div>
                            <div className="h-1 bg-surface-container-highest rounded-full">
                              <div className="h-1 bg-primary rounded-full" style={{ width: `${courseProg}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-8 border-t border-white/5 pt-6">
                      <div className="text-primary font-bold" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "36px" }}>{dynamicCompletion}%</div>
                      <div className="text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>OVERALL COMPLETION</div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Bento Row */}
              <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
                {/* Live Session */}
                <div className="glass-card p-6 border-primary/20 bg-primary/5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-primary uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>LIVE SESSION</span>
                  </div>
                  <h4 className="mb-2" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "20px" }}>Trade Finance Live Q&A</h4>
                  <p className="text-on-surface-variant mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}>Begins in 2h 34m with Lead Instructor Aslan Merkanto.</p>
                  <button
                    onClick={() => { setReminderSet(!reminderSet); showToast(reminderSet ? "Reminder removed." : "Reminder set for Live Session!"); }}
                    className={`w-full border py-2 uppercase tracking-widest transition-all ${reminderSet ? "bg-primary text-on-primary border-primary" : "border-primary text-primary hover:bg-primary hover:text-on-primary"}`}
                    style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}
                  >
                    {reminderSet ? "✓ Reminder Set" : "Set Reminder"}
                  </button>
                </div>

                {/* Downloads */}
                <div className="glass-card p-6">
                  <h4 className="mb-4 uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>LESSON RESOURCES</h4>
                  <div className="space-y-3">
                    {files.map((file) => (
                      <div key={file} onClick={() => showToast(`Downloading ${file}...`)} className="flex items-center justify-between p-3 border border-outline-variant/20 hover:border-primary/40 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors" style={{ fontSize: "20px" }}>description</span>
                          <span className="text-on-surface group-hover:text-primary transition-colors" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>{file}</span>
                        </div>
                        <span className="material-symbols-outlined text-primary" style={{ fontSize: "18px" }}>download</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certificate */}
                <div className="bg-surface-container-low border border-outline-variant/10 p-6">
                  <h4 className="mb-2" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>CERTIFICATE STATUS</h4>
                  <div className="my-6 text-center">
                    <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "64px" }}>workspace_premium</span>
                    <p className="text-on-surface-variant mt-2" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}>Complete all video lessons to unlock your certification</p>
                  </div>
                  <div className="h-1 bg-surface-container-highest mb-2">
                    <div className="h-1 bg-primary" style={{ width: `${dynamicCompletion}%` }} />
                  </div>
                  <div className="flex justify-between text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>
                    <span>{dynamicCompletion}% complete</span>
                    <span>{totalSessionsCount - watchedSessionsCount} sessions left</span>
                  </div>
                </div>
              </motion.div>

              {/* Assignments */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                <h2 className="text-on-surface mb-6 uppercase tracking-[0.2em]" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>CRITICAL DELIVERABLES</h2>
                <div className="glass-card divide-y divide-outline-variant/10">
                  {assignments.map((a) => (
                    <div key={a.title} className="flex items-center justify-between px-6 py-5 hover:bg-white/5 transition-colors">
                      <div>
                        <div className="text-on-surface mb-1" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "18px" }}>{a.title}</div>
                        <div className="text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>{a.due}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={a.color} style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>{a.status}</span>
                        <button
                          onClick={() => { if (!submitted.includes(a.title)) { setSubmitted([...submitted, a.title]); showToast(`"${a.title}" submitted successfully!`); } }}
                          disabled={submitted.includes(a.title) || a.due === "Submitted"}
                          className={`border px-4 py-2 uppercase tracking-widest transition-all ${submitted.includes(a.title) || a.due === "Submitted" ? "border-primary/30 text-primary/50 cursor-not-allowed" : "border-outline-variant hover:border-primary hover:text-primary"}`}
                          style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}
                        >
                          {submitted.includes(a.title) || a.due === "Submitted" ? "Submitted" : "Submit"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            </>
          )}

          {/* TAB 1: COURSE LIBRARY */}
          {activeTab === 1 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="text-on-surface mb-6 uppercase tracking-[0.2em]" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>COURSE LIBRARY</h2>
              {isLoaded && filteredCourses.length === 0 && (
                <div className="glass-card p-12 text-center text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
                  No courses available match your search query.
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {isLoaded && filteredCourses.map((course) => {
                  const totalS = course.sessions ? course.sessions.length : 0;
                  const watchedS = course.sessions 
                    ? course.sessions.filter(s => currentStudent.watchedVideos?.includes(s.youtubeUrl)).length 
                    : 0;
                  
                  return (
                    <div key={course.id} className="glass-card group overflow-hidden flex flex-col justify-between">
                      <div>
                        <div className="h-40 overflow-hidden shrink-0 relative">
                          <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" src={course.img || "https://lh3.googleusercontent.com/aida-public/AB6AXuCklkeF4ZuMkBb75fsxKi5nNkwJbIhrHIfNrxc6miByGr7FpA4eCJjXy8z_KyvgKdU9Vgsg0I_REtweRpXHgVzsxFBhAluhenfRbhDS8tYaTVc4Mfx9PLYrGgntSE0cWyF2fbIryXFXGkShzU8jQptEPPYrx35C-BpX1nM2yFBdqXP1yHMZ2Bibq3eTXcynJBrjvUcLi7qFDaOX0BEa-EaMaR9vDB1idAOkW_dvivnre8ApnLwmHG4xZrWHFH9JZ2Vsbe7p-KHwJw"} alt={course.title} />
                          <div className="absolute top-2 right-2 bg-background/80 text-primary text-[10px] px-2 py-1 font-bold uppercase tracking-widest" style={{ fontFamily: "Geist, monospace" }}>
                            {watchedS}/{totalS} Lessons Done
                          </div>
                        </div>
                        <div className="p-5">
                          <h4 className="mb-2" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "18px" }}>{course.title}</h4>
                          {course.description && <p className="text-on-surface-variant text-xs line-clamp-2">{course.description}</p>}
                        </div>
                      </div>
                      
                      <div className="p-5 pt-0">
                        <button 
                          onClick={() => setSelectedCourseDetail(course)} 
                          className="w-full py-2 bg-primary text-background font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all text-center flex items-center justify-center gap-1"
                          style={{ fontFamily: "Geist, monospace" }}
                        >
                          <span className="material-symbols-outlined text-[16px]">menu_book</span>
                          View Video Lessons
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          )}

          {/* TAB 2: RESOURCES */}
          {activeTab === 2 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="text-on-surface mb-6 uppercase tracking-[0.2em]" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>LESSON RESOURCES</h2>
              <div className="glass-card divide-y divide-outline-variant/10">
                {files.map((file) => (
                  <div key={file} onClick={() => showToast(`Downloading ${file}...`)} className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">description</span>
                      <div>
                        <div className="text-on-surface" style={{ fontFamily: "Geist, monospace", fontSize: "13px" }}>{file}</div>
                        <div className="text-on-surface-variant" style={{ fontFamily: "Inter, sans-serif", fontSize: "12px" }}>Click to download</div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-primary">download</span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>

      {/* Course Detail / Session Picker Modal */}
      <AnimatePresence>
        {selectedCourseDetail && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-md overflow-y-auto">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="glass-card w-full max-w-2xl p-8 border border-primary/20 relative my-8">
              <button onClick={() => setSelectedCourseDetail(null)} className="absolute top-4 right-4 text-on-surface-variant hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
              
              <div className="mb-6">
                <div className="text-primary uppercase tracking-widest text-xs font-bold" style={{ fontFamily: "Geist, monospace" }}>Course Modules Explorer</div>
                <h2 className="text-white mt-1 uppercase tracking-widest" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "22px" }}>
                  {selectedCourseDetail.title}
                </h2>
                {selectedCourseDetail.description && (
                  <p className="text-on-surface-variant text-xs mt-2">{selectedCourseDetail.description}</p>
                )}
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                <h4 className="text-white uppercase tracking-widest text-[10px]" style={{ fontFamily: "Geist, monospace" }}>Video Lessons Available:</h4>
                {selectedCourseDetail.sessions && selectedCourseDetail.sessions.length > 0 ? (
                  <div className="space-y-3">
                    {selectedCourseDetail.sessions.map((session, index) => {
                      const watched = currentStudent.watchedVideos?.includes(session.youtubeUrl);
                      return (
                        <div key={session.id} className="p-4 bg-surface-container border border-outline-variant/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-primary/30 transition-all">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-primary font-bold" style={{ fontFamily: "Geist, monospace" }}>Lesson 0{index + 1}</span>
                              {watched && <span className="bg-primary/20 text-primary text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider">✓ Completed</span>}
                            </div>
                            <div className="text-white font-bold mt-1" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "15px" }}>{session.title}</div>
                            {session.description && <p className="text-on-surface-variant text-xs mt-1">{session.description}</p>}
                          </div>
                          <button 
                            onClick={() => playVideo(session.youtubeUrl)} 
                            className={`px-4 py-2 uppercase tracking-widest shrink-0 font-bold transition-all text-xs flex items-center gap-1 ${watched ? "bg-surface-container-highest text-on-surface-variant hover:text-white" : "bg-primary text-background hover:brightness-110"}`}
                            style={{ fontFamily: "Geist, monospace" }}
                          >
                            <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                            {watched ? "Replay" : "Play"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center text-on-surface-variant border border-dashed border-outline-variant/20 text-xs uppercase tracking-widest">
                    No video sessions uploaded inside this course module.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {playingUrl && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/95 backdrop-blur-md">
            <div className="relative w-full max-w-5xl aspect-video glass-card border border-primary/20 overflow-hidden">
              <button onClick={() => setPlayingUrl(null)} className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:text-primary transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
              <iframe src={`${playingUrl}?autoplay=1`} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
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

      {notifOpen && <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />}
    </div>
  );
}
