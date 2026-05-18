"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { useQA, QA } from "@/hooks/useQA";
import { useCourses } from "@/hooks/useCourses";

export default function AdminQAPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
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

  const { qaList, isLoaded: qaLoaded, addReply } = useQA();
  const { courses, isLoaded: coursesLoaded } = useCourses();
  
  const [filterCourse, setFilterCourse] = useState<string>("All");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Helper to find course and session name
  const getSessionInfo = (sessionId: string) => {
    for (const c of courses) {
      const sess = c.sessions?.find(s => s.id === sessionId);
      if (sess) {
        return { course: c.title, session: sess.title };
      }
    }
    return { course: "Unknown Course", session: "Unknown Session" };
  };

  const handleReplySubmit = async (e: React.FormEvent, q: QA) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const success = await addReply(q.id, q.replies, replyText);
    if (success) {
      setReplyingTo(null);
      setReplyText("");
      showToast("Reply posted successfully!");
    } else {
      showToast("Failed to post reply.");
    }
  };

  // Enhance QA list with course info for filtering
  const enhancedQA = qaList.map(q => {
    const info = getSessionInfo(q.session_id);
    return { ...q, courseName: info.course, sessionName: info.session };
  });

  const filteredQA = enhancedQA.filter(q => {
    if (filterCourse !== "All" && q.courseName !== filterCourse) return false;
    return true;
  });

  const uniqueCourses = Array.from(new Set(enhancedQA.map(q => q.courseName)));

  if (!authChecked) {
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
      <DashboardSidebar activeIndex={2} brandLabel="Global Operations" role="admin" />

      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        <header className="sticky top-0 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/10 z-40 px-6 md:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="ml-12 md:ml-0">
              <div className="uppercase tracking-[0.2em]" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "18px", fontWeight: 700 }}>Q&A COMMAND CENTER</div>
              <div className="text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Global Student Inquiries & Support</div>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 space-y-8">
          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="bg-surface-container border border-outline-variant/20 text-white text-xs px-4 py-3 focus:outline-none focus:border-primary/50"
              style={{ fontFamily: "Geist, monospace" }}
            >
              <option value="All">All Courses</option>
              {uniqueCourses.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Q&A List */}
          <div className="space-y-6">
            {!qaLoaded || !coursesLoaded ? (
              <div className="text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>Loading inquiries...</div>
            ) : filteredQA.length === 0 ? (
              <div className="text-on-surface-variant" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>No questions found.</div>
            ) : (
              filteredQA.map((q) => (
                <motion.div 
                  key={q.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-surface-container border border-outline-variant/10 p-6 relative group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-primary font-bold uppercase tracking-widest mb-1" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>
                        {q.student_name}
                      </div>
                      <div className="text-on-surface-variant flex items-center gap-2" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>
                        <span className="material-symbols-outlined text-[14px]">book</span> {q.courseName} 
                        <span className="material-symbols-outlined text-[14px] ml-2">play_lesson</span> {q.sessionName}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant text-[11px]" style={{ fontFamily: "Geist, monospace" }}>
                      <span className="material-symbols-outlined text-[14px]">thumb_up</span> {q.upvotes}
                    </div>
                  </div>
                  
                  <p className="text-white text-sm mb-6 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                    {q.question_text}
                  </p>

                  {/* Replies List */}
                  {q.replies && q.replies.length > 0 && (
                    <div className="pl-4 border-l-2 border-primary/30 space-y-3 mb-6">
                      <div className="text-[10px] text-primary font-bold uppercase tracking-widest" style={{ fontFamily: "Geist, monospace" }}>Official Replies</div>
                      {q.replies.map((r, i) => (
                        <p key={i} className="text-sm text-on-surface-variant leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                          {r}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Reply Action */}
                  {replyingTo === q.id ? (
                    <form onSubmit={(e) => handleReplySubmit(e, q)} className="mt-4 flex flex-col gap-3">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your official response..."
                        className="w-full bg-background border border-outline-variant/20 focus:border-primary/50 text-white p-3 text-sm resize-none h-24 focus:outline-none"
                        style={{ fontFamily: "Inter, sans-serif" }}
                        autoFocus
                      />
                      <div className="flex gap-3 justify-end">
                        <button 
                          type="button" 
                          onClick={() => { setReplyingTo(null); setReplyText(""); }}
                          className="px-4 py-2 text-on-surface-variant hover:text-white text-xs uppercase tracking-widest transition-colors"
                          style={{ fontFamily: "Geist, monospace" }}
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          className="px-6 py-2 bg-primary text-background font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all"
                          style={{ fontFamily: "Geist, monospace" }}
                        >
                          Post Reply
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button 
                      onClick={() => setReplyingTo(q.id)}
                      className="text-primary hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest transition-colors"
                      style={{ fontFamily: "Geist, monospace" }}
                    >
                      <span className="material-symbols-outlined text-[16px]">reply</span>
                      Add Official Reply
                    </button>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 50, x: "-50%" }}
              className="fixed bottom-8 left-1/2 bg-primary text-background px-6 py-3 shadow-2xl flex items-center gap-3 z-50"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>info</span>
              <span className="font-bold uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
