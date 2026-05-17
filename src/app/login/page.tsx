"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useStudents } from "@/hooks/useStudents";

const ADMIN_CREDENTIALS = { email: "admin@merkanto.com", password: "admin123" };

export default function LoginPage() {
  const { students, isLoaded } = useStudents();
  const [role, setRole] = useState<"student" | "admin">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (role === "admin") {
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
          localStorage.setItem("merkanto_role", "admin");
          localStorage.setItem("merkanto_user", email);
          router.push("/dashboard/admin");
        } else {
          setError(`Invalid credentials. Hint: ${ADMIN_CREDENTIALS.email} / ${ADMIN_CREDENTIALS.password}`);
          setLoading(false);
        }
      } else {
        const foundStudent = students.find(s => s.email === email && s.password === password);
        if (foundStudent) {
          localStorage.setItem("merkanto_role", "student");
          localStorage.setItem("merkanto_user", email);
          localStorage.setItem("merkanto_student_id", foundStudent.id);
          router.push("/dashboard/student");
        } else {
          setError("Invalid credentials. Please enter a valid student email and password as created by the admin.");
          setLoading(false);
        }
      }
    }, 800);
  };

  const fillCredentials = () => {
    if (role === "admin") {
      setEmail(ADMIN_CREDENTIALS.email);
      setPassword(ADMIN_CREDENTIALS.password);
    } else {
      const demoStudent = students.find(s => s.email === "student@merkanto.com") || students[0];
      if (demoStudent) {
        setEmail(demoStudent.email);
        setPassword(demoStudent.password || "student123");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden line-pattern">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-primary/10 blur-[120px] rounded-full z-0" />

      <div className="w-full max-w-md px-6 relative z-10">
        <div className="flex justify-center mb-10">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image src="/images/merkanto_logo_new.png" alt="Merkanto Logo" width={240} height={60} className="h-10 w-auto object-contain" priority />
          </Link>
        </div>

        <motion.div className="glass-card p-8 md:p-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-8">
            <h1 className="text-white mb-2" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "28px", fontWeight: 600 }}>PORTAL ACCESS</h1>
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

          {/* Demo credentials hint */}
          <div className="bg-primary/10 border border-primary/20 px-4 py-3 mb-6 flex items-center justify-between">
            <div>
              <div className="text-primary" style={{ fontFamily: "Geist, monospace", fontSize: "10px", letterSpacing: "0.1em" }}>DEMO CREDENTIALS</div>
              <div className="text-on-surface-variant mt-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "12px" }}>
                {role === "admin" 
                  ? `${ADMIN_CREDENTIALS.email} / ${ADMIN_CREDENTIALS.password}` 
                  : (() => {
                      const demoS = students.find(s => s.email === "student@merkanto.com") || students[0];
                      return demoS ? `${demoS.email} / ${demoS.password || "student123"}` : "No students enrolled";
                    })()
                }
              </div>
            </div>
            <button onClick={fillCredentials} className="text-primary border border-primary/40 px-3 py-1 hover:bg-primary/10 transition-colors" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>
              FILL
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Email</label>
              <input type="email" required value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder={role === "admin" ? ADMIN_CREDENTIALS.email : "student@university.edu"} className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary focus:outline-none transition-colors text-white py-3 px-0" style={{ fontFamily: "Inter, sans-serif" }} />
            </div>
            <div>
              <label className="text-on-surface-variant uppercase tracking-widest mb-2 block" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Password</label>
              <input type="password" required value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="••••••••" className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary focus:outline-none transition-colors text-white py-3 px-0" style={{ fontFamily: "Inter, sans-serif" }} />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-red-400/10 border border-red-400/30 px-4 py-3 text-red-400" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" disabled={loading} className="w-full bg-primary text-background py-4 font-bold uppercase tracking-[0.2em] hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_0_20px_rgba(70,225,118,0.2)] mt-4 disabled:opacity-70" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
              {loading ? "Authenticating..." : "Authenticate"}
            </button>
          </form>

          <div className="mt-8 text-center text-on-surface-variant" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px" }}>
            Don't have access? <Link href="/contact" className="text-primary hover:underline">Request an invitation.</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
