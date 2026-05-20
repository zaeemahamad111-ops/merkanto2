"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useStudents } from "@/hooks/useStudents";
import { useAdmins } from "@/hooks/useAdmins";
import { supabase } from "@/utils/supabaseClient";

export default function LoginPage() {
  const { students } = useStudents();
  const { admins } = useAdmins();

  const [role, setRole] = useState<"student" | "admin">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Forgot password flow states
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMsg, setForgotMsg] = useState<{ text: string; type: "success" | "error"; link?: string } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    setTimeout(() => {
      if (role === "admin") {
        const localAdmins = [
          { email: "merkantopvtltd@gmail.com", password: "Merkanto@123" }
        ];
        const foundAdmin = admins.find(a => a.email.toLowerCase().trim() === email.toLowerCase().trim() && a.password === password) ||
                           localAdmins.find(la => la.email.toLowerCase().trim() === email.toLowerCase().trim() && la.password === password);
        if (foundAdmin) {
          localStorage.setItem("merkanto_role", "admin");
          localStorage.setItem("merkanto_user", foundAdmin.email);
          router.push("/dashboard/admin");
        } else {
          setError("Invalid admin credentials. Please enter a valid administrator email and password.");
          setLoading(false);
        }
      } else {
        const localStudents = [
          { email: "student@merkanto.com", password: "student123", id: "s1" }
        ];
        const foundStudent = students.find(s => s.email.toLowerCase() === email.toLowerCase() && s.password === password) ||
                             localStudents.find(ls => ls.email === email.toLowerCase() && ls.password === password);
        if (foundStudent) {
          localStorage.setItem("merkanto_role", "student");
          localStorage.setItem("merkanto_user", foundStudent.email);
          localStorage.setItem("merkanto_student_id", foundStudent.id);
          router.push("/dashboard/student");
        } else {
          setError("Invalid credentials. Please enter a valid student email and password as created by the admin.");
          setLoading(false);
        }
      }
    }, 800);
  };



  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotMsg(null);

    if (!forgotEmail || forgotEmail.trim() === "") {
      setForgotMsg({ text: "Please enter your email.", type: "error" });
      return;
    }

    // Search both student & admin lists to check if the user is registered in profiles
    const matchedStudent = students.find(s => s.email.toLowerCase() === forgotEmail.toLowerCase());
    const matchedAdmin = admins.find(a => a.email.toLowerCase() === forgotEmail.toLowerCase());
    const matchedUser = matchedStudent || matchedAdmin;

    if (matchedUser) {
      setForgotMsg({
        text: "Sending reset instructions...",
        type: "success"
      });

      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setForgotMsg({
          text: `Supabase Auth Error: ${error.message}`,
          type: "error"
        });
      } else {
        setForgotMsg({
          text: `A secure password reset link has been dispatched to ${forgotEmail}. Please check your inbox and follow the instructions.`,
          type: "success"
        });
      }
    } else {
      setForgotMsg({
        text: "Account email not found in our registry database.",
        type: "error"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-primary/10 blur-[120px] rounded-full z-0" />

      <div className="w-full max-w-md px-6 relative z-10">
        <div className="flex justify-center mb-10">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image src="/images/merkanto_logo_new.png" alt="Merkanto Logo" width={240} height={60} className="h-10 w-auto object-contain" priority />
          </Link>
        </div>

        <motion.div className="glass-card p-8 md:p-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <AnimatePresence mode="wait">
            {!forgotOpen ? (
              <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="text-center mb-8">
                  <h1 className="text-white mb-2" style={{ fontFamily: "Outfit, sans-serif", fontSize: "28px", fontWeight: 600 }}>PORTAL ACCESS</h1>
                  <p className="text-on-surface-variant uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Secure Authentication</p>
                </div>

                {/* Role Toggle */}
                <div className="flex p-1 bg-surface-container-highest border border-outline-variant/20 rounded-sm mb-6">
                  {(["student", "admin"] as const).map((r) => (
                    <button key={r} onClick={() => { setRole(r); setError(""); setEmail(""); setPassword(""); }} className={`flex-1 py-3 text-center uppercase tracking-widest transition-all ${role === r ? "bg-primary text-background font-bold" : "text-on-surface-variant hover:text-on-surface"}`} style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>
                      {r}
                    </button>
                  ))}
                </div>



                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Email</label>
                    <input type="email" required value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder={role === "admin" ? "admin@merkanto.com" : "student@university.edu"} className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary focus:outline-none transition-colors text-white py-2 px-0" style={{ fontFamily: "Manrope, sans-serif" }} />
                  </div>
                  <div>
                    <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Password</label>
                    <input type="password" required value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="••••••••" className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary focus:outline-none transition-colors text-white py-2 px-0" style={{ fontFamily: "Manrope, sans-serif" }} />
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-red-400/10 border border-red-400/30 px-4 py-3 text-red-400" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button type="submit" disabled={loading} className="w-full bg-primary text-background py-4 font-bold uppercase tracking-[0.2em] hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_0_20px_rgba(200,165,90,0.2)] mt-4 disabled:opacity-70 text-xs" style={{ fontFamily: "Geist, monospace" }}>
                    {loading ? "Authenticating..." : "Authenticate"}
                  </button>
                </form>

                <div className="mt-8 flex justify-between items-center text-xs" style={{ fontFamily: "Manrope, sans-serif" }}>
                  <button onClick={() => { setForgotOpen(true); setForgotMsg(null); setForgotEmail(""); }} className="text-primary hover:underline bg-transparent border-0 cursor-pointer uppercase tracking-widest text-[10px]" style={{ fontFamily: "Geist, monospace" }}>
                    Forgot Password?
                  </button>
                  <span className="text-on-surface-variant">
                    Merkanto Academy v1.1
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div key="forgot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="text-center mb-8">
                  <h1 className="text-white mb-2" style={{ fontFamily: "Outfit, sans-serif", fontSize: "24px", fontWeight: 600 }}>PASSWORD RESET</h1>
                  <p className="text-on-surface-variant uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Generate Secure Reset Link</p>
                </div>

                <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
                  <div>
                    <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Account Email Address</label>
                    <input type="email" required value={forgotEmail} onChange={(e) => { setForgotEmail(e.target.value); setForgotMsg(null); }} placeholder="e.g. student@merkanto.com" className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary focus:outline-none transition-colors text-white py-2 px-0" style={{ fontFamily: "Manrope, sans-serif" }} />
                  </div>

                  <AnimatePresence>
                    {forgotMsg && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`border p-4 text-xs ${forgotMsg.type === "success" ? "bg-green-400/10 border-green-400/30 text-green-400" : "bg-red-400/10 border-red-400/30 text-red-400"}`}>
                        <div className="font-sans leading-relaxed">{forgotMsg.text}</div>
                        {forgotMsg.link && (
                          <Link href={forgotMsg.link} className="block mt-3 bg-green-400 text-background font-bold text-center py-2 px-4 uppercase tracking-widest hover:brightness-110 transition-all font-mono text-[10px]">
                            👉 Click to Reset Password Now 👈
                          </Link>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button type="submit" className="w-full bg-primary text-background py-4 font-bold uppercase tracking-[0.2em] hover:brightness-110 active:scale-[0.99] transition-all text-xs" style={{ fontFamily: "Geist, monospace" }}>
                    Generate Secure Link
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <button onClick={() => setForgotOpen(false)} className="text-on-surface-variant hover:text-white transition-colors bg-transparent border-0 cursor-pointer uppercase tracking-widest text-[10px]" style={{ fontFamily: "Geist, monospace" }}>
                    Back to Login Form
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
