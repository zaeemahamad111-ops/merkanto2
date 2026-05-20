"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/utils/supabaseClient";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const emailParam = searchParams.get("email");

  const [email, setEmail] = useState(emailParam || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && user.email) {
          setEmail(user.email);
        } else if (!emailParam) {
          setError("Session not found. Please click the password reset link inside your email again.");
        }
      } catch (err) {
        console.error("Error retrieving user session:", err);
      }
    };
    checkSession();
  }, [emailParam]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // 1. Update password in Supabase Auth
      const { error: authError } = await supabase.auth.updateUser({ password });
      
      if (authError) {
        setError(`Auth Error: ${authError.message}`);
        setLoading(false);
        return;
      }

      // 2. Synchronize plain text password into profiles table for standard login fallback
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from("profiles")
          .update({ password })
          .eq("id", user.id);
      } else if (email) {
        await supabase
          .from("profiles")
          .update({ password })
          .eq("email", email);
      }

      setSuccess(true);
    } catch (err: any) {
      setError(`Reset Failed: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md glass-card p-8 border border-primary/20 relative">
      <div className="flex flex-col items-center mb-8">
        <Image src="/images/merkanto_logo_new.png" alt="Merkanto" width={300} height={100} className="h-12 w-auto object-contain mb-2" />
        <span className="uppercase tracking-[0.2em] text-on-surface-variant text-[11px]" style={{ fontFamily: "Geist, monospace" }}>
          ACADEMY SECURE SHELL
        </span>
      </div>

      <h2 className="text-white mb-6 uppercase tracking-widest text-center" style={{ fontFamily: "Geist, monospace", fontSize: "14px" }}>
        Reset Your Password
      </h2>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center space-y-6 py-4">
            <span className="material-symbols-outlined text-green-400" style={{ fontSize: "48px" }}>check_circle</span>
            <div className="space-y-2">
              <h3 className="text-white font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>Password Updated</h3>
              <p className="text-on-surface-variant text-xs">Your new credentials have been safely encrypted and saved. You can now log into your learning console.</p>
            </div>
            <Link
              href="/login"
              className="block w-full py-3 bg-primary text-background font-bold text-center uppercase tracking-widest hover:brightness-110 transition-all text-xs"
              style={{ fontFamily: "Geist, monospace" }}
            >
              Back to Login
            </Link>
          </motion.div>
        ) : (
          <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleReset} className="space-y-5">
            {error && (
              <div className="bg-red-400/10 border border-red-400/20 p-3 text-red-400 text-xs">
                {error}
              </div>
            )}

            <div className="bg-surface-container/30 p-3 border border-outline-variant/10 mb-2">
              <span className="text-on-surface-variant uppercase tracking-wider block text-[9px]" style={{ fontFamily: "Geist, monospace" }}>Account Email Target:</span>
              <span className="text-white text-xs font-bold font-mono">{email || "Verifying reset token..."}</span>
            </div>

            <div>
              <label className="text-on-surface-variant uppercase tracking-widest mb-1 block" style={{ fontFamily: "Geist, monospace", fontSize: "9px" }}>New Password *</label>
              <input
                type="password"
                required
                disabled={loading}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary focus:outline-none transition-colors text-white py-1.5 px-0 text-sm"
                placeholder="Enter at least 6 characters"
              />
            </div>

            <div>
              <label className="text-on-surface-variant uppercase tracking-widest mb-1 block" style={{ fontFamily: "Geist, monospace", fontSize: "9px" }}>Confirm Password *</label>
              <input
                type="password"
                required
                disabled={loading}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary focus:outline-none transition-colors text-white py-1.5 px-0 text-sm"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-background font-bold uppercase tracking-widest hover:brightness-110 transition-all text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "Geist, monospace" }}
            >
              {loading ? "Saving Credentials..." : "Save Credentials"}
            </button>

            <div className="text-center pt-2">
              <Link href="/login" className="text-on-surface-variant hover:text-white transition-colors text-xs uppercase tracking-wider" style={{ fontFamily: "Geist, monospace" }}>
                Cancel
              </Link>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <Suspense fallback={
        <div className="text-on-surface-variant uppercase tracking-widest font-mono text-xs">
          Loading Reset Shell...
        </div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
