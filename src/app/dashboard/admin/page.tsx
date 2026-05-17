"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { useCourses } from "@/hooks/useCourses";
import { useStudents } from "@/hooks/useStudents";
import { useAssignments } from "@/hooks/useAssignments";
import { useAdmins } from "@/hooks/useAdmins";
import { supabase } from "@/utils/supabaseClient";

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
  const { courses, addCourse, updateCourse, deleteCourse, isLoaded: coursesLoaded } = useCourses();
  const { students } = useStudents();
  const { assignments, addAssignment, gradeAssignment, deleteAssignment, isLoaded: assignmentsLoaded } = useAssignments();
  const { admins, addAdmin, deleteAdmin, isLoaded: adminsLoaded } = useAdmins();

  // Course management states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    img: string;
    sessions: SessionForm[];
  }>({
    title: "",
    description: "",
    img: "",
    sessions: [emptySessionForm()]
  });

  // Uploader status state
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // Admin creation modal states
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Assignment management states
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignForm, setAssignForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    targetOption: "all" as "all" | "select",
    selectedStudentIds: [] as string[]
  });
  
  const [gradesInput, setGradesInput] = useState<{ [submissionId: string]: string }>({});

  const [notifOpen, setNotifOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [viewAll, setViewAll] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Convert File to WebP client-side via Canvas and Upload
  const convertAndUploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          
          // Downscale slightly if too large to conserve space
          const MAX_WIDTH = 1000;
          let width = img.width;
          let height = img.height;
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob(async (blob) => {
            if (!blob) {
              reject(new Error("Canvas WebP conversion failed."));
              return;
            }
            try {
              const uniqueName = `upload_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.webp`;
              const { data, error } = await supabase
                .storage
                .from("resources")
                .upload(uniqueName, blob, {
                  contentType: "image/webp",
                  cacheControl: "3600",
                  upsert: false
                });

              if (error) {
                console.warn("Supabase storage bucket error, falling back to Base64 data URL:", error.message || error);
                const base64Reader = new FileReader();
                base64Reader.onloadend = () => {
                  resolve(base64Reader.result as string);
                };
                base64Reader.readAsDataURL(blob);
                return;
              }

              // Get public URL
              const { data: publicUrlData } = supabase
                .storage
                .from("resources")
                .getPublicUrl(uniqueName);

              resolve(publicUrlData.publicUrl);
            } catch (err) {
              console.warn("Supabase storage exception, falling back to Base64 data URL:", err);
              const base64Reader = new FileReader();
              base64Reader.onloadend = () => {
                resolve(base64Reader.result as string);
              };
              base64Reader.readAsDataURL(blob);
            }
          }, "image/webp", 0.85);
        };
        img.onerror = () => reject(new Error("Failed to load image file."));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read local file."));
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldKey: string, sessionIndex?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldKey);
    showToast("Converting and uploading file as WebP...");

    try {
      const uploadedUrl = await convertAndUploadImage(file);
      if (sessionIndex !== undefined) {
        handleSessionChange(sessionIndex, "img", uploadedUrl);
      } else {
        setFormData(prev => ({ ...prev, img: uploadedUrl }));
      }
      showToast("WebP Cover uploaded successfully!");
    } catch (err: any) {
      console.error(err);
      showToast(`Error: ${err.message || "Failed to upload cover."}`);
    } finally {
      setUploadingField(null);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      img: "",
      sessions: [emptySessionForm()]
    });
    setIsModalOpen(true);
  };

  const openEditModal = (course: any) => {
    setEditingId(course.id);
    setFormData({
      title: course.title,
      description: course.description || "",
      img: course.img || "",
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
    const cleanedSessions = formData.sessions.filter(s => s.title.trim() !== "" && s.youtubeUrl.trim() !== "");
    const coursePayload = {
      title: formData.title,
      description: formData.description,
      img: formData.img || "https://lh3.googleusercontent.com/aida-public/AB6AXuCklkeF4ZuMkBb75fsxKi5nNkwJbIhrHIfNrxc6miByGr7FpA4eCJjXy8z_KyvgKdU9Vgsg0I_REtweRpXHgVzsxFBhAluhenfRbhDS8tYaTVc4Mfx9PLYrGgntSE0cWyF2fbIryXFXGkShzU8jQptEPPYrx35C-BpX1nM2yFBdqXP1yHMZ2Bibq3eTXcynJBrjvUcLi7qFDaOX0BEa-EaMaR9vDB1idAOkW_dvivnre8ApnLwmHG4xZrWHFH9JZ2Vsbe7p-KHwJw",
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

  // Admin Account creation handlers
  const handleCreateAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminForm.name || !adminForm.email || !adminForm.password) {
      showToast("Please fill in all details.");
      return;
    }
    addAdmin({
      name: adminForm.name,
      email: adminForm.email,
      password: adminForm.password
    });
    setIsAdminModalOpen(false);
    showToast(`Administrator account for ${adminForm.name} created successfully.`);
  };

  // Assignment Handlers
  const openAssignModal = () => {
    setAssignForm({
      title: "",
      description: "",
      dueDate: "",
      targetOption: "all",
      selectedStudentIds: []
    });
    setIsAssignModalOpen(true);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignForm.title || !assignForm.dueDate) {
      showToast("Please fill in assignment title and due date.");
      return;
    }
    const assignedIds = assignForm.targetOption === "all" ? ["all"] : assignForm.selectedStudentIds;
    addAssignment({
      title: assignForm.title,
      description: assignForm.description,
      dueDate: assignForm.dueDate,
      assignedStudentIds: assignedIds
    });
    setIsAssignModalOpen(false);
    showToast(`Assignment "${assignForm.title}" published successfully!`);
  };

  const toggleStudentSelection = (studentId: string) => {
    setAssignForm(prev => {
      const selected = prev.selectedStudentIds.includes(studentId)
        ? prev.selectedStudentIds.filter(id => id !== studentId)
        : [...prev.selectedStudentIds, studentId];
      return { ...prev, selectedStudentIds: selected };
    });
  };

  const handleGradeSubmit = (assignmentId: string, studentId: string) => {
    const key = `${assignmentId}-${studentId}`;
    const grade = gradesInput[key];
    if (!grade || grade.trim() === "") {
      showToast("Please enter a grade before submitting.");
      return;
    }
    gradeAssignment(assignmentId, studentId, grade);
    showToast("Student assignment graded successfully!");
  };

  const displayedCourses = viewAll ? courses : courses.slice(0, 3);
  const totalCourses = courses.length;
  const enrolledStudents = students.length;
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
              {coursesLoaded && displayedCourses.map((mod) => (
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

          {/* DELIVERABLES & ASSIGNMENTS MANAGER */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="uppercase tracking-[0.2em]" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>ASSIGNMENTS & DELIVERABLES</h2>
              <button
                onClick={openAssignModal}
                className="bg-primary text-background font-bold px-4 py-2 hover:brightness-110 transition-all flex items-center gap-1 uppercase tracking-widest"
                style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}
              >
                <span className="material-symbols-outlined text-[16px]">add</span> Publish Work
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {assignmentsLoaded && assignments.length === 0 ? (
                <div className="glass-card p-12 text-center text-on-surface-variant border border-dashed border-outline-variant/20" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
                  No assignments published yet. Click "Publish Work" to assign tasks to scholars.
                </div>
              ) : (
                assignmentsLoaded && assignments.map((assign) => (
                  <div key={assign.id} className="glass-card p-6 flex flex-col justify-between relative overflow-hidden">
                    <button
                      onClick={() => { if(confirm(`Delete assignment "${assign.title}"?`)) deleteAssignment(assign.id); }}
                      className="absolute top-4 right-4 text-on-surface-variant hover:text-red-400 transition-colors"
                      title="Delete Assignment"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 font-bold uppercase tracking-widest">{assign.dueDate}</span>
                        <span className="text-on-surface-variant text-[10px] uppercase tracking-wider" style={{ fontFamily: "Geist, monospace" }}>
                          Assigned to: {assign.assignedStudentIds.includes("all") ? "All Scholars" : `${assign.assignedStudentIds.length} Student(s)`}
                        </span>
                      </div>
                      <h3 className="text-white font-bold" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "18px" }}>{assign.title}</h3>
                      <p className="text-on-surface-variant text-sm mt-1 mb-6">{assign.description}</p>
                    </div>

                    <div className="border-t border-outline-variant/15 pt-4 mt-2">
                      <h4 className="text-white uppercase tracking-widest text-[10px] mb-3" style={{ fontFamily: "Geist, monospace" }}>SCHOLAR SUBMISSIONS & GRADES ({assign.submissions.length})</h4>
                      {assign.submissions.length === 0 ? (
                        <div className="text-on-surface-variant text-xs italic py-2">No submissions recorded yet for this task.</div>
                      ) : (
                        <div className="space-y-3">
                          {assign.submissions.map((sub) => {
                            const student = students.find(s => s.id === sub.studentId) || { name: "Unknown Scholar" };
                            const gradeKey = `${assign.id}-${sub.studentId}`;
                            return (
                              <div key={sub.studentId} className="p-3 bg-surface-container/60 border border-outline-variant/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-white font-bold text-xs">{student.name}</span>
                                    {sub.status === "Graded" ? (
                                      <span className="bg-green-400/20 text-green-400 text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider">✓ Graded: {sub.grade}</span>
                                    ) : (
                                      <span className="bg-yellow-400/20 text-yellow-400 text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider">Pending Grade</span>
                                    )}
                                  </div>
                                  <div className="text-on-surface-variant text-xs mt-1 bg-background/50 p-2 border border-outline-variant/5 font-mono max-h-24 overflow-y-auto">
                                    {sub.answer || "(No submission text uploaded)"}
                                  </div>
                                  <div className="text-[10px] text-on-surface-variant mt-1">Submitted at: {sub.submittedAt}</div>
                                </div>
                                {sub.status !== "Graded" && (
                                  <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
                                    <input
                                      type="text"
                                      placeholder="e.g. 92/100"
                                      value={gradesInput[gradeKey] || ""}
                                      onChange={e => setGradesInput({ ...gradesInput, [gradeKey]: e.target.value })}
                                      className="bg-background border border-outline-variant/40 focus:border-primary focus:outline-none text-white text-xs px-2 py-1.5 w-24"
                                    />
                                    <button
                                      onClick={() => handleGradeSubmit(assign.id, sub.studentId)}
                                      className="bg-primary text-background font-bold text-[10px] px-3 py-1.5 uppercase tracking-widest hover:brightness-110 transition-all"
                                      style={{ fontFamily: "Geist, monospace" }}
                                    >
                                      Submit Grade
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.section>

          {/* Registries side-by-side Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Activity Log */}
            <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
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
            </motion.div>

            {/* Administrators Registry */}
            <motion.div className="glass-card p-6 flex flex-col justify-between" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22 }}>
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="uppercase tracking-[0.2em]" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>ADMINISTRATORS REGISTRY</h2>
                  <button
                    onClick={() => setIsAdminModalOpen(true)}
                    className="text-primary hover:underline uppercase tracking-widest text-[10px] flex items-center gap-1 font-bold"
                    style={{ fontFamily: "Geist, monospace" }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>add</span> Add Admin
                  </button>
                </div>
                
                <div className="space-y-4 max-h-[220px] overflow-y-auto custom-scrollbar pr-2">
                  {adminsLoaded && admins.map((admin) => (
                    <div key={admin.id} className="p-3 bg-surface-container border border-outline-variant/10 flex justify-between items-center gap-4">
                      <div>
                        <div className="text-white font-bold text-xs">{admin.name}</div>
                        <div className="text-[10px] text-on-surface-variant font-mono mt-0.5">{admin.email}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="bg-primary/20 text-primary text-[8px] px-1.5 py-0.5 uppercase tracking-wider font-mono">Role: {admin.role}</span>
                        {admin.id !== "a1" ? (
                          <button
                            onClick={() => { if (confirm(`Remove administrator privileges for ${admin.name}?`)) deleteAdmin(admin.id); }}
                            className="block text-red-400 hover:text-red-300 text-[10px] uppercase font-bold mt-1 text-right"
                          >
                            Revoke
                          </button>
                        ) : (
                          <div className="text-[9px] text-on-surface-variant font-mono mt-1">Primary</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-on-surface-variant text-[10px] mt-4 pt-4 border-t border-outline-variant/10 uppercase tracking-wide" style={{ fontFamily: "Geist, monospace" }}>
                Active System administrators: {admins.length}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Course Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="glass-card w-full max-w-2xl p-6 md:p-8 border border-primary/20 relative max-h-[90vh] overflow-y-auto my-auto">
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

                {/* Course Cover Image Uploader (with dynamic WebP conversion) */}
                <div className="p-4 bg-surface-container/60 border border-outline-variant/10">
                  <label className="text-white uppercase tracking-widest mb-2 block font-bold" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>Course Cover Image</label>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-24 h-16 bg-surface-container border border-outline-variant/20 flex items-center justify-center overflow-hidden shrink-0">
                      {formData.img ? (
                        <img src={formData.img} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-on-surface-variant text-xl">image</span>
                      )}
                    </div>
                    <div className="flex-1 space-y-2 w-full">
                      <input 
                        type="text" 
                        value={formData.img} 
                        onChange={e => setFormData({ ...formData, img: e.target.value })} 
                        className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary focus:outline-none text-white text-xs py-1" 
                        placeholder="Paste Cover Image URL" 
                      />
                      <div className="flex items-center gap-3">
                        <label className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 cursor-pointer hover:bg-primary/30 transition-colors uppercase tracking-widest text-[9px] font-bold select-none">
                          {uploadingField === "course-img" ? "Converting..." : "Upload File"}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => handleFileUpload(e, "course-img")}
                            className="hidden"
                          />
                        </label>
                        <span className="text-on-surface-variant text-[9px] uppercase tracking-wider font-mono">Accepts JPG/PNG/GIF $\rightarrow$ Converts directly to WebP</span>
                      </div>
                    </div>
                  </div>
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
                        
                        <div className="space-y-2">
                          <label className="text-on-surface-variant uppercase tracking-widest mb-1 block" style={{ fontFamily: "Geist, monospace", fontSize: "9px" }}>Lesson Description</label>
                          <input type="text" value={session.description} onChange={e => handleSessionChange(index, "description", e.target.value)} className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary focus:outline-none text-white text-xs py-1" placeholder="What will they learn?" />
                        </div>

                        {/* Session Cover Image Uploader (WebP uploader) */}
                        <div className="p-3 bg-background/50 border border-outline-variant/5 mt-1 space-y-2">
                          <label className="text-on-surface-variant uppercase tracking-widest block font-bold" style={{ fontFamily: "Geist, monospace", fontSize: "9px" }}>Lesson Cover Thumbnail</label>
                          <div className="flex items-center gap-3">
                            <input 
                              type="text" 
                              value={session.img} 
                              onChange={e => handleSessionChange(index, "img", e.target.value)} 
                              className="flex-1 bg-transparent border-b border-outline-variant/30 focus:border-primary focus:outline-none text-white text-[10px] py-1" 
                              placeholder="Paste Lesson Cover Thumbnail URL" 
                            />
                            <label className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 cursor-pointer hover:bg-primary/30 transition-colors uppercase tracking-widest text-[8px] font-bold select-none shrink-0">
                              {uploadingField === `sess-${index}` ? "Converting..." : "Upload File"}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={e => handleFileUpload(e, `sess-${index}`, index)}
                                className="hidden"
                              />
                            </label>
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

      {/* Admin Creator Modal */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="glass-card w-full max-w-md p-6 md:p-8 border border-primary/20 relative max-h-[90vh] overflow-y-auto my-auto">
              <button onClick={() => setIsAdminModalOpen(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
              <h2 className="text-white mb-6 uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "14px" }}>
                Add New Administrator Account
              </h2>
              
              <form onSubmit={handleCreateAdmin} className="space-y-6">
                <div>
                  <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>Administrator Name *</label>
                  <input type="text" required value={adminForm.name} onChange={e => setAdminForm({ ...adminForm, name: e.target.value })} className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary focus:outline-none transition-colors text-white py-2 px-0" placeholder="e.g. Liam Sterling" />
                </div>
                
                <div>
                  <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>Secure Email *</label>
                  <input type="email" required value={adminForm.email} onChange={e => setAdminForm({ ...adminForm, email: e.target.value })} className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary focus:outline-none transition-colors text-white py-2 px-0" placeholder="e.g. liam@merkanto.com" />
                </div>

                <div>
                  <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>Secure Password *</label>
                  <input type="password" required value={adminForm.password} onChange={e => setAdminForm({ ...adminForm, password: e.target.value })} className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary focus:outline-none transition-colors text-white py-2 px-0" placeholder="e.g. securePass123" />
                </div>

                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setIsAdminModalOpen(false)} className="flex-1 py-3 border border-outline-variant uppercase tracking-widest hover:bg-white/5 transition-colors text-xs" style={{ fontFamily: "Geist, monospace" }}>Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-primary text-background font-bold uppercase tracking-widest hover:brightness-110 transition-all text-xs" style={{ fontFamily: "Geist, monospace" }}>Publish Admin</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Assignment Modal */}
      <AnimatePresence>
        {isAssignModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="glass-card w-full max-w-xl p-6 md:p-8 border border-primary/20 relative max-h-[90vh] overflow-y-auto my-auto">
              <button onClick={() => setIsAssignModalOpen(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
              <h2 className="text-white mb-6 uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "14px" }}>
                Publish New Assignment Task
              </h2>
              
              <form onSubmit={handleCreateAssignment} className="space-y-6">
                <div>
                  <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>Assignment Title *</label>
                  <input type="text" required value={assignForm.title} onChange={e => setAssignForm({ ...assignForm, title: e.target.value })} className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary focus:outline-none transition-colors text-white py-2 px-0" placeholder="e.g. Letters of Credit Case Study" />
                </div>
                
                <div>
                  <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>Task Description *</label>
                  <textarea rows={3} required value={assignForm.description} onChange={e => setAssignForm({ ...assignForm, description: e.target.value })} className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary focus:outline-none transition-colors text-white py-2 px-0 resize-none text-xs" placeholder="Detail the requirements that scholars should cover..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>Due Date / Timeline *</label>
                    <input type="text" required value={assignForm.dueDate} onChange={e => setAssignForm({ ...assignForm, dueDate: e.target.value })} className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary focus:outline-none transition-colors text-white py-2 px-0" placeholder="e.g. Due in 5 days" />
                  </div>
                  <div>
                    <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>Target Audience</label>
                    <select
                      value={assignForm.targetOption}
                      onChange={e => setAssignForm({ ...assignForm, targetOption: e.target.value as "all" | "select" })}
                      className="w-full bg-surface-container border border-outline-variant/40 focus:border-primary focus:outline-none text-white py-2 px-2 text-xs"
                    >
                      <option value="all">All Enrolled Scholars</option>
                      <option value="select">Select Individual Students</option>
                    </select>
                  </div>
                </div>

                {assignForm.targetOption === "select" && (
                  <div className="border border-outline-variant/20 p-4 space-y-2 max-h-32 overflow-y-auto">
                    <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "9px" }}>SELECT TARGET STUDENTS:</label>
                    {students.map(student => (
                      <label key={student.id} className="flex items-center gap-2 text-white text-xs cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={assignForm.selectedStudentIds.includes(student.id)}
                          onChange={() => toggleStudentSelection(student.id)}
                          className="accent-primary"
                        />
                        <span>{student.name} ({student.email})</span>
                      </label>
                    ))}
                  </div>
                )}

                <div className="pt-4 flex gap-4 border-t border-outline-variant/20">
                  <button type="button" onClick={() => setIsAssignModalOpen(false)} className="flex-1 py-3 border border-outline-variant uppercase tracking-widest hover:bg-white/5 transition-colors" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-primary text-background font-bold uppercase tracking-widest hover:brightness-110 transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Publish Work</button>
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
