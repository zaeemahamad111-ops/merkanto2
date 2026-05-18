"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { useCourses, Course, Session } from "@/hooks/useCourses";
import { useStudents } from "@/hooks/useStudents";
import { useAssignments } from "@/hooks/useAssignments";
import { useQA } from "@/hooks/useQA";

const getEmbedUrl = (url: string) => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    if (u.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
  } catch { return url; }
  return url;
};

const files = ["Trade Finance Guide.pdf", "Global Operations customs_template.xlsx", "Merkanto Supplier Checklist.docx"];
const TABS = ["My Learning", "Course Library", "Resources"];

export default function StudentDashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("merkanto_role");
      const user = localStorage.getItem("merkanto_user");
      if (!role || !user || role !== "student") {
        router.push("/login");
      } else {
        setAuthChecked(true);
      }
    }
  }, [router]);

  const { courses, isLoaded: coursesLoaded } = useCourses();
  const { students, markVideoWatched } = useStudents();
  const { assignments, submitAssignment, isLoaded: assignmentsLoaded } = useAssignments();

  const [activeTab, setActiveTab] = useState(0);
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [reminderSet, setReminderSet] = useState(false);

  // Split Workspace Interactive States
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [notesText, setNotesText] = useState("");
  const [notebookTab, setNotebookTab] = useState<"notes" | "qa">("notes");
  const { qaList: globalQaList, postQuestion, upvoteQuestion } = useQA();
  const [newQuestionText, setNewQuestionText] = useState("");

  const activeSessionQa = activeSession 
    ? globalQaList.filter(q => q.session_id === activeSession.id) 
    : [];

  useEffect(() => {
    if (activeSession) {
      const savedNotes = localStorage.getItem(`merkanto_notes_${activeSession.id}`) || "";
      setNotesText(savedNotes);
    }
  }, [activeSession]);

  const handleSaveNotes = (text: string) => {
    setNotesText(text);
    if (activeSession) {
      localStorage.setItem(`merkanto_notes_${activeSession.id}`, text);
    }
  };

  const handlePostQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || !activeSession || !currentStudent.id) return;
    
    const success = await postQuestion(activeSession.id, currentStudent.id, currentStudent.name, newQuestionText);
    if (success) {
      setNewQuestionText("");
      showToast("Question posted to classroom feed.");
    } else {
      showToast("Failed to post question. Please try again.");
    }
  };

  const handleUpvote = async (qId: string, currentUpvotes: number) => {
    await upvoteQuestion(qId, currentUpvotes);
  };

  // Submit assignment modal state
  const [submittingAssignmentId, setSubmittingAssignmentId] = useState<string | null>(null);
  const [submissionText, setSubmissionText] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

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
    watchedVideos: [] as string[]
  };

  const playVideo = (session: Session) => {
    const embedUrl = getEmbedUrl(session.youtubeUrl);
    setPlayingUrl(embedUrl);
    setActiveSession(session);
    if (currentStudent.id) {
      markVideoWatched(currentStudent.id, session.youtubeUrl);
      showToast("Lesson started. Progress recorded.");
    }
  };

  // Calculate dynamic progress metrics
  const totalSessionsCount = courses.reduce((acc, c) => acc + (c.sessions ? c.sessions.length : 0), 0);
  const watchedSessionsCount = courses.reduce((acc, c) => {
    if (!c.sessions) return acc;
    const watchedInCourse = c.sessions.filter(s => currentStudent.watchedVideos?.includes(s.youtubeUrl)).length;
    return acc + watchedInCourse;
  }, 0);
  
  const dynamicCompletion = totalSessionsCount > 0 
    ? Math.round((watchedSessionsCount / totalSessionsCount) * 100) 
    : 0;

  // Filter out courses matching query
  const filteredCourses = courses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // 1. Determine "Newest Course Available"
  const newestCourse = courses.length > 0 ? courses[courses.length - 1] : null;

  // 2. Determine "Resume Watching" (last watched video session, or first if nothing watched yet)
  let lastWatchedSession: Session | null = null;
  let lastWatchedCourseTitle = "";

  if (courses.length > 0) {
    for (const c of courses) {
      if (c.sessions) {
        const found = c.sessions.find(s => currentStudent.watchedVideos?.includes(s.youtubeUrl));
        if (found) {
          lastWatchedSession = found;
          lastWatchedCourseTitle = c.title;
          break;
        }
      }
    }
    // Fallback: If no watched videos yet, recommend the first session of the first course
    if (!lastWatchedSession && courses[0]?.sessions && courses[0].sessions.length > 0) {
      lastWatchedSession = courses[0].sessions[0];
      lastWatchedCourseTitle = courses[0].title;
    }
  }

  // 3. Filter assignments assigned to this student
  const studentAssignments = assignments.filter(a => 
    a.assignedStudentIds.includes("all") || a.assignedStudentIds.includes(currentStudent.id)
  );

  const handleSubmitWorkClick = (assignmentId: string) => {
    setSubmittingAssignmentId(assignmentId);
    setSubmissionText("");
  };

  const handlePublishSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionText || submissionText.trim() === "") {
      showToast("Please enter submission text.");
      return;
    }
    if (submittingAssignmentId && currentStudent.id) {
      submitAssignment(submittingAssignmentId, currentStudent.id, submissionText);
      showToast("Assignment submitted successfully!");
      setSubmittingAssignmentId(null);
    }
  };

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
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 top-10 w-72 bg-[#121414] border border-outline-variant/20 p-4 z-[100] shadow-2xl">
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
              {/* Newest & Resume Watching Row */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recommended / Resume Watching Lesson */}
                  <div className="glass-card p-6 flex flex-col justify-between border-primary/20 bg-primary/5">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                        <span className="text-primary uppercase tracking-widest text-[10px] font-bold" style={{ fontFamily: "Geist, monospace" }}>
                          {currentStudent.watchedVideos?.includes(lastWatchedSession?.youtubeUrl || "") ? "LAST COMPLETED LESSON" : "RESUME WATCHING"}
                        </span>
                      </div>
                      {lastWatchedSession ? (
                        <>
                          <div className="text-on-surface-variant text-[11px] uppercase tracking-wider mb-1" style={{ fontFamily: "Geist, monospace" }}>
                            {lastWatchedCourseTitle}
                          </div>
                          <h3 className="text-white font-bold mb-2" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "20px" }}>
                            {lastWatchedSession.title}
                          </h3>
                          <p className="text-on-surface-variant text-sm line-clamp-2 mb-4">
                            {lastWatchedSession.description || "Pick up exactly where you left off in your learning journey."}
                          </p>
                        </>
                      ) : (
                        <div className="text-on-surface-variant text-sm italic py-4">No active video sessions found inside course modules.</div>
                      )}
                    </div>
                    {lastWatchedSession && (
                      <button
                        onClick={() => playVideo(lastWatchedSession)}
                        className="bg-primary text-background font-bold text-xs uppercase tracking-widest py-2.5 px-6 hover:brightness-110 transition-all flex items-center justify-center gap-1 w-full"
                        style={{ fontFamily: "Geist, monospace" }}
                      >
                        <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                        Play Lesson Video
                      </button>
                    )}
                  </div>

                  {/* Newest Course Available */}
                  <div className="glass-card p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-primary" style={{ fontSize: "16px" }}>new_releases</span>
                        <span className="text-on-surface-variant uppercase tracking-widest text-[10px]" style={{ fontFamily: "Geist, monospace" }}>
                          NEWEST COURSE MODULE
                        </span>
                      </div>
                      {newestCourse ? (
                        <>
                          <h3 className="text-white font-bold mb-2" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "20px" }}>
                            {newestCourse.title}
                          </h3>
                          <p className="text-on-surface-variant text-sm line-clamp-2 mb-4">
                            {newestCourse.description || "Explore our brand new curriculum and trade resources."}
                          </p>
                        </>
                      ) : (
                        <div className="text-on-surface-variant text-sm italic py-4">No course modules currently published in academy.</div>
                      )}
                    </div>
                    {newestCourse && (
                      <button
                        onClick={() => setSelectedCourseDetail(newestCourse)}
                        className="border border-outline-variant text-white hover:border-primary hover:text-primary font-bold text-xs uppercase tracking-widest py-2.5 px-6 transition-all flex items-center justify-center gap-1 w-full"
                        style={{ fontFamily: "Geist, monospace" }}
                      >
                        <span className="material-symbols-outlined text-[16px]">menu_book</span>
                        Explore Course Lessons
                      </button>
                    )}
                  </div>
                </div>
              </motion.section>

              {/* Course Module Progress List */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
                <h2 className="text-on-surface mb-6 uppercase tracking-[0.2em]" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>MODULE PROGRESS</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {coursesLoaded && courses.length > 0 ? (
                    <div className="lg:col-span-3 glass-card p-6 md:p-8">
                      <h3 className="mb-4" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "22px", fontWeight: 500 }}>Active Course Library</h3>
                      <div className="space-y-4">
                        {courses.map((course, idx) => {
                          const totalS = course.sessions ? course.sessions.length : 0;
                          const watchedS = course.sessions 
                            ? course.sessions.filter(s => currentStudent.watchedVideos?.includes(s.youtubeUrl)).length 
                            : 0;
                          const courseProg = totalS > 0 ? Math.round((watchedS / totalS) * 100) : 0;
                          return (
                            <div key={course.id} className="p-4 bg-surface-container border border-outline-variant/10 flex justify-between items-center gap-4">
                              <div className="flex-1">
                                <div className="text-white font-bold text-sm" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>{course.title}</div>
                                <div className="h-1 bg-surface-container-highest rounded-full mt-2 w-full">
                                  <div className="h-1 bg-primary rounded-full transition-all" style={{ width: `${courseProg}%` }} />
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <div className="text-primary font-bold text-xs" style={{ fontFamily: "Geist, monospace" }}>{courseProg}% Done</div>
                                <div className="text-[10px] text-on-surface-variant uppercase mt-0.5">{watchedS}/{totalS} Lessons</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="lg:col-span-3 glass-card p-12 flex items-center justify-center text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
                      No active courses. Ask your admin to add modules.
                    </div>
                  )}
                </div>
              </motion.section>

              {/* DELIVERABLES & WORKS TO BE COMPLETED */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                <h2 className="text-on-surface mb-6 uppercase tracking-[0.2em]" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>CRITICAL DELIVERABLES</h2>
                <div className="glass-card divide-y divide-outline-variant/10">
                  {assignmentsLoaded && studentAssignments.length === 0 ? (
                    <div className="p-8 text-center text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
                      No assignments published or assigned to your profile yet!
                    </div>
                  ) : (
                    assignmentsLoaded && studentAssignments.map((assign) => {
                      const studentSubmission = assign.submissions?.find(sub => sub.studentId === currentStudent.id);
                      
                      return (
                        <div key={assign.id} className="flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-5 hover:bg-white/5 transition-colors gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-primary font-bold text-xs uppercase tracking-wider" style={{ fontFamily: "Geist, monospace" }}>{assign.dueDate}</span>
                              {studentSubmission?.status === "Graded" ? (
                                <span className="bg-green-400/20 text-green-400 text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider">✓ Graded: {studentSubmission.grade}</span>
                              ) : studentSubmission?.status === "Submitted" ? (
                                <span className="bg-yellow-400/20 text-yellow-400 text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider">✓ Submitted · Pending Grade</span>
                              ) : (
                                <span className="bg-red-400/20 text-red-400 text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider">Pending Submission</span>
                              )}
                            </div>
                            <h3 className="text-white font-bold" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "16px" }}>{assign.title}</h3>
                            <p className="text-on-surface-variant text-xs mt-1">{assign.description}</p>
                          </div>
                          
                          <div className="shrink-0">
                            {studentSubmission ? (
                              <button
                                disabled
                                className="border border-outline-variant/30 text-on-surface-variant/50 px-4 py-2 uppercase tracking-widest text-xs cursor-not-allowed"
                                style={{ fontFamily: "Geist, monospace" }}
                              >
                                Completed
                              </button>
                            ) : (
                              <button
                                onClick={() => handleSubmitWorkClick(assign.id)}
                                className="bg-primary text-background font-bold px-5 py-2 uppercase tracking-widest text-xs hover:brightness-110 transition-all"
                                style={{ fontFamily: "Geist, monospace" }}
                              >
                                Submit Work
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </motion.section>
            </>
          )}

          {/* TAB 1: COURSE LIBRARY */}
          {activeTab === 1 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="text-on-surface mb-6 uppercase tracking-[0.2em]" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>COURSE LIBRARY</h2>
              {coursesLoaded && filteredCourses.length === 0 && (
                <div className="glass-card p-12 text-center text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
                  No courses available match your search query.
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {coursesLoaded && filteredCourses.map((course) => {
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
                            onClick={() => playVideo(session)} 
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

      {/* Submit Assignment Modal */}
      <AnimatePresence>
        {submittingAssignmentId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="glass-card w-full max-w-lg p-6 md:p-8 border border-primary/20 relative max-h-[90vh] overflow-y-auto my-auto">
              <button onClick={() => setSubmittingAssignmentId(null)} className="absolute top-4 right-4 text-on-surface-variant hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
              
              <h2 className="text-white mb-2 uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "14px" }}>
                Submit Assignment Deliverable
              </h2>
              <p className="text-on-surface-variant text-xs mb-6">
                {assignments.find(a => a.id === submittingAssignmentId)?.title}
              </p>
              
              <form onSubmit={handlePublishSubmission} className="space-y-4">
                <div>
                  <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>YOUR SUBMISSION / TEXT ANSWER *</label>
                  <textarea
                    rows={6}
                    required
                    value={submissionText}
                    onChange={e => setSubmissionText(e.target.value)}
                    className="w-full bg-transparent border border-outline-variant/30 focus:border-primary focus:outline-none transition-colors text-white py-2 px-3 text-xs resize-none"
                    placeholder="Type or paste your completed homework/deliverable summary here..."
                  />
                </div>

                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setSubmittingAssignmentId(null)} className="flex-1 py-3 border border-outline-variant uppercase tracking-widest hover:bg-white/5 transition-colors text-xs" style={{ fontFamily: "Geist, monospace" }}>Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-primary text-background font-bold uppercase tracking-widest hover:brightness-110 transition-all text-xs" style={{ fontFamily: "Geist, monospace" }}>Submit Work</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal with Interactive Split Workspace */}
      <AnimatePresence>
        {playingUrl && activeSession && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-background/95 backdrop-blur-md">
            <div className="relative w-full max-w-6xl h-[85vh] bg-surface-container border border-primary/20 flex flex-col md:flex-row overflow-hidden shadow-2xl">
              
              {/* Left Side: Video Player */}
              <div className="h-[40vh] md:h-auto md:flex-1 bg-black relative flex flex-col">
                <div className="flex items-center justify-between px-6 py-3 border-b border-outline-variant/10 bg-surface-container-lowest">
                  <div>
                    <span className="text-[10px] text-primary uppercase font-bold tracking-widest" style={{ fontFamily: "Geist, monospace" }}>Active Session</span>
                    <h3 className="text-white text-sm uppercase tracking-wider font-bold" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>{activeSession.title}</h3>
                  </div>
                  <button 
                    onClick={() => { setPlayingUrl(null); setActiveSession(null); }} 
                    className="w-8 h-8 bg-surface-container border border-white/5 rounded-full flex items-center justify-center text-white hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
                <div className="flex-1 relative">
                  <iframe src={`${playingUrl}?autoplay=1`} className="w-full h-full absolute inset-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              </div>

              {/* Right Side: Tabbed Workspace (Notebook / QA Forum) */}
              <div className="w-full md:w-96 border-t md:border-t-0 md:border-l border-outline-variant/10 flex flex-col h-[45vh] md:h-full bg-surface-container-low">
                {/* Tab Switcher */}
                <div className="flex border-b border-outline-variant/10 bg-surface-container-lowest">
                  <button 
                    onClick={() => setNotebookTab("notes")} 
                    className={`flex-1 py-4 text-center uppercase tracking-widest font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 ${notebookTab === "notes" ? "text-primary bg-primary/5 border-b-2 border-primary" : "text-on-surface-variant hover:text-on-surface"}`}
                    style={{ fontFamily: "Geist, monospace" }}
                  >
                    <span className="material-symbols-outlined text-[16px]">edit_note</span>
                    My Notes
                  </button>
                  <button 
                    onClick={() => setNotebookTab("qa")} 
                    className={`flex-1 py-4 text-center uppercase tracking-widest font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 ${notebookTab === "qa" ? "text-primary bg-primary/5 border-b-2 border-primary" : "text-on-surface-variant hover:text-on-surface"}`}
                    style={{ fontFamily: "Geist, monospace" }}
                  >
                    <span className="material-symbols-outlined text-[16px]">forum</span>
                    Classroom Q&A
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-4">
                  {notebookTab === "notes" ? (
                    <div className="flex flex-col h-full space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-on-surface-variant uppercase tracking-widest" style={{ fontFamily: "Geist, monospace" }}>Personal Notepad</span>
                        <button 
                          onClick={() => {
                            const timeStr = `[Time ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}] - `;
                            handleSaveNotes(notesText + timeStr);
                          }}
                          className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-1 uppercase tracking-widest hover:bg-primary/20 transition-all font-bold"
                          style={{ fontFamily: "Geist, monospace" }}
                        >
                          + Insert Timestamp
                        </button>
                      </div>
                      <textarea
                        value={notesText}
                        onChange={e => handleSaveNotes(e.target.value)}
                        className="flex-1 w-full min-h-[300px] bg-transparent border border-outline-variant/20 focus:border-primary/40 focus:outline-none text-xs text-white p-3 resize-none line-height-relaxed"
                        placeholder="Write down key takeaways, logistics routes, or pricing structures... Notes are automatically saved client-side for this video session!"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      />
                      <div className="text-[10px] text-primary/70 flex items-center gap-1" style={{ fontFamily: "Geist, monospace" }}>
                        <span className="material-symbols-outlined text-[12px]">cloud_done</span>
                        Auto-saved locally
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full space-y-4">
                      {/* Q&A Post Form */}
                      <form onSubmit={handlePostQuestion} className="space-y-2">
                        <textarea
                          value={newQuestionText}
                          onChange={e => setNewQuestionText(e.target.value)}
                          className="w-full bg-transparent border border-outline-variant/20 focus:border-primary/40 focus:outline-none text-xs text-white p-2.5 resize-none h-16"
                          placeholder="Ask a question about this lecture..."
                          style={{ fontFamily: "Inter, sans-serif" }}
                        />
                        <button 
                          type="submit" 
                          className="w-full py-2 bg-primary text-background uppercase tracking-widest font-bold text-[10px] hover:brightness-110 transition-all flex items-center justify-center gap-1"
                          style={{ fontFamily: "Geist, monospace" }}
                        >
                          <span className="material-symbols-outlined text-[14px]">send</span>
                          Submit Question
                        </button>
                      </form>

                      {/* Q&A Feed */}
                      <div className="space-y-3 flex-1 overflow-y-auto max-h-[350px] pr-1 custom-scrollbar">
                        {activeSessionQa.map((q) => (
                          <div key={q.id} className="p-3 bg-surface-container border border-outline-variant/10 rounded-md space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-primary font-bold" style={{ fontFamily: "Geist, monospace" }}>{q.student_name}</span>
                              <button 
                                type="button"
                                onClick={() => handleUpvote(q.id, q.upvotes)}
                                className="flex items-center gap-1 text-[10px] text-on-surface-variant hover:text-primary transition-colors"
                              >
                                <span className="material-symbols-outlined text-[12px]">thumb_up</span>
                                {q.upvotes}
                              </button>
                            </div>
                            <p className="text-xs text-white leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{q.question_text}</p>
                            
                            {/* Replies */}
                            {q.replies && q.replies.length > 0 && (
                              <div className="pl-3 border-l-2 border-primary/30 mt-2 space-y-1 bg-white/2">
                                <div className="text-[9px] text-primary uppercase font-bold" style={{ fontFamily: "Geist, monospace" }}>Instructor Answer:</div>
                                {q.replies.map((r, i) => (
                                  <p key={i} className="text-[11px] text-on-surface-variant leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{r}</p>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

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
