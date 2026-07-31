"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { useDemo } from "@/hooks/useDemo";

const getEmbedUrl = (input: string) => {
  try {
    let urlStr = input;
    const srcMatch = input.match(/src="([^"]+)"/);
    if (srcMatch) urlStr = srcMatch[1];
    urlStr = urlStr.replace(/&amp;/g, '&');
    const u = new URL(urlStr);
    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    if (u.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    if (u.hostname.includes("vimeo.com") && !u.hostname.includes("player.vimeo.com")) {
      const videoId = u.pathname.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}${u.search}`;
    }
    return urlStr;
  } catch { return input; }
};

export default function DemoPage() {
  const router = useRouter();
  const { fetchDemoVideos } = useDemo();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [demoStatus, setDemoStatus] = useState<string | null>(null);
  
  const [demoVids, setDemoVids] = useState<{ v1: { title: string; url: string }; v2: { title: string; url: string } }>({
    v1: { title: "Demo Video 1: Masterclass Overview", url: "https://player.vimeo.com/video/1197817919?h=31d77d474c" },
    v2: { title: "Demo Video 2: Operational Systems Preview", url: "https://player.vimeo.com/video/1197817919?h=31d77d474c" }
  });
  const [activeVidIdx, setActiveVidIdx] = useState<0 | 1>(0);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    checkSession();
    fetchDemoVideos().then(vids => setDemoVids(vids));
  }, []);

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setUser(session.user);
      await fetchProfile(session.user.id);
    }
  };

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase.from("profiles").select("demo_status").eq("id", userId).maybeSingle();
    if (data) {
      setDemoStatus(data.demo_status || "none");
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.user) {
          setUser(data.user);
          await fetchProfile(data.user.id);
        }
      } else {
        // Register flow - check existing profile first
        const { data: existingProfile } = await supabase.from("profiles").select("*").eq("email", email.trim()).maybeSingle();
        if (existingProfile) {
          if (!existingProfile.demo_status) {
            await supabase.from("profiles").update({ demo_status: "pending" }).eq("id", existingProfile.id);
          }
          setIsLogin(true);
          setError("This email is already registered. Please enter your password to Sign In.");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({ 
          email: email.trim(), 
          password,
          options: {
            data: { name }
          }
        });
        if (error) throw error;
        
        if (data.user) {
          const { error: profileError } = await supabase.from("profiles").upsert({
            id: data.user.id,
            email: email.trim(),
            name: name || email.split("@")[0],
            role: "student",
            demo_status: "pending",
            progress: 0,
            joined_date: new Date().toISOString().split('T')[0]
          });
          if (profileError) {
            if (profileError.message?.includes("profiles_email_key")) {
              setIsLogin(true);
              setError("This email is already registered. Please Sign In below.");
              setLoading(false);
              return;
            }
            throw profileError;
          }
          
          setUser(data.user);
          setDemoStatus("pending");
        }
      }
    } catch (err: any) {
      if (err.message?.includes("profiles_email_key") || err.message?.includes("User already registered") || err.message?.includes("already registered")) {
        setIsLogin(true);
        setError("This email is already registered. Please enter your password to Sign In below.");
      } else if (err.message?.includes("Email not confirmed")) {
        setError("Email not confirmed. Please check your email inbox for the confirmation link, or disable 'Confirm email' in Supabase Auth settings.");
      } else {
        setError(err.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDemoStatus(null);
  };

  if (!mounted) return null;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-black to-black"></div>

      {/* Main UI */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
        
        {/* Header Logo */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-30">
          <button onClick={() => router.push("/")} className="text-white hover:opacity-80 transition-opacity flex items-center">
            <img src="/images/merkanto_logo_transparent_3.png" alt="Merkanto" className="h-8 md:h-10 object-contain" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!user ? (
            <motion.div 
              key="auth"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="glass-card max-w-md w-full p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              
              <div className="text-center mb-8">
                <h2 className="text-white uppercase tracking-[0.2em] mb-2 font-bold" style={{ fontFamily: "Outfit, sans-serif", fontSize: "24px" }}>
                  Course Demo
                </h2>
                <p className="text-on-surface-variant text-xs uppercase tracking-widest" style={{ fontFamily: "Geist, monospace" }}>
                  Unlock access to preview our masterclass
                </p>
              </div>

              {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-200 text-xs text-center">{error}</div>}

              <form onSubmit={handleAuth} className="space-y-5">
                {!isLogin && (
                  <div>
                    <label className="text-on-surface-variant uppercase tracking-widest mb-1 block text-[10px]" style={{ fontFamily: "Geist, monospace" }}>Full Name</label>
                    <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-surface-container border border-outline-variant/30 focus:border-primary focus:outline-none text-white px-4 py-3 text-sm transition-colors" />
                  </div>
                )}
                <div>
                  <label className="text-on-surface-variant uppercase tracking-widest mb-1 block text-[10px]" style={{ fontFamily: "Geist, monospace" }}>Email Address</label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-surface-container border border-outline-variant/30 focus:border-primary focus:outline-none text-white px-4 py-3 text-sm transition-colors" />
                </div>
                <div>
                  <label className="text-on-surface-variant uppercase tracking-widest mb-1 block text-[10px]" style={{ fontFamily: "Geist, monospace" }}>Password</label>
                  <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-surface-container border border-outline-variant/30 focus:border-primary focus:outline-none text-white px-4 py-3 text-sm transition-colors" />
                </div>

                <button type="submit" disabled={loading} className="w-full bg-primary text-background font-bold py-3 uppercase tracking-widest hover:brightness-110 transition-all text-xs disabled:opacity-50 mt-2" style={{ fontFamily: "Geist, monospace" }}>
                  {loading ? "Authenticating..." : (isLogin ? "Sign In" : "Request Access")}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button onClick={() => setIsLogin(!isLogin)} className="text-primary text-[10px] uppercase tracking-widest hover:underline" style={{ fontFamily: "Geist, monospace" }}>
                  {isLogin ? "Don't have an account? Request access" : "Already requested? Sign in"}
                </button>
              </div>
            </motion.div>
          ) : demoStatus === "approved" ? (
             <motion.div 
               key="approved"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="w-full max-w-5xl bg-black/90 border border-primary/30 p-4 shadow-2xl relative z-10 space-y-4"
             >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-white/10">
                   <div className="flex items-center gap-2">
                     <span className="text-primary text-xs uppercase tracking-widest flex items-center gap-1 font-bold bg-primary/10 px-3 py-1 border border-primary/20" style={{ fontFamily: "Geist, monospace" }}>
                       <span className="material-symbols-outlined text-[14px]">verified</span> Access Granted
                     </span>
                   </div>
                   
                   {/* Video Switcher Tabs */}
                   <div className="flex items-center gap-2 bg-surface-container p-1 border border-outline-variant/20 rounded">
                     <button
                       onClick={() => setActiveVidIdx(0)}
                       className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold transition-all ${
                         activeVidIdx === 0 ? "bg-primary text-background" : "text-on-surface-variant hover:text-white"
                       }`}
                       style={{ fontFamily: "Geist, monospace" }}
                     >
                       {demoVids.v1.title}
                     </button>
                     <button
                       onClick={() => setActiveVidIdx(1)}
                       className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold transition-all ${
                         activeVidIdx === 1 ? "bg-primary text-background" : "text-on-surface-variant hover:text-white"
                       }`}
                       style={{ fontFamily: "Geist, monospace" }}
                     >
                       {demoVids.v2.title}
                     </button>
                   </div>

                   <button onClick={handleLogout} className="text-on-surface-variant hover:text-white uppercase tracking-widest text-xs" style={{ fontFamily: "Geist, monospace" }}>
                     Sign Out
                   </button>
                </div>

                {/* Active Video Player */}
                <div className="w-full aspect-video bg-black relative overflow-hidden">
                  {(() => {
                    const rawUrl = (activeVidIdx === 0 ? demoVids.v1.url : demoVids.v2.url) || "";
                    const isHtmlEmbed = rawUrl.trim().startsWith("<iframe") || rawUrl.trim().startsWith("<div");
                    if (isHtmlEmbed) {
                      return (
                        <div 
                          key={activeVidIdx}
                          className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:absolute [&_iframe]:top-0 [&_iframe]:left-0" 
                          dangerouslySetInnerHTML={{ __html: rawUrl }} 
                        />
                      );
                    }
                    return (
                      <iframe
                        key={activeVidIdx}
                        src={getEmbedUrl(rawUrl)}
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                        className="w-full h-full"
                      ></iframe>
                    );
                  })()}
                </div>
             </motion.div>
          ) : (
            <motion.div 
              key="pending"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="glass-card max-w-lg w-full p-8 md:p-12 text-center border-l-4 border-l-primary"
            >
              <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: "48px" }}>hourglass_empty</span>
              
              <h2 className="text-white uppercase tracking-widest mb-4 font-bold" style={{ fontFamily: "Outfit, sans-serif", fontSize: "20px" }}>
                Access {demoStatus === 'rejected' ? 'Declined' : demoStatus === 'paused' ? 'Paused' : 'Pending'}
              </h2>
              
              <p className="text-on-surface-variant text-sm leading-relaxed mb-8" style={{ fontFamily: "Manrope, sans-serif" }}>
                If you already contacted the provider, please wait to get access. Otherwise, contact the provider for access to this exclusive course demo.
              </p>

              <div className="flex flex-col gap-4">
                <a 
                  href="https://wa.me/1234567890" // Placeholder
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white font-bold py-3 uppercase tracking-widest hover:brightness-110 transition-all text-xs flex items-center justify-center gap-2" 
                  style={{ fontFamily: "Geist, monospace" }}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-5 h-5 invert" alt="WhatsApp" />
                  Contact on WhatsApp
                </a>

                <button onClick={handleLogout} className="text-on-surface-variant text-[10px] uppercase tracking-widest hover:text-white transition-colors" style={{ fontFamily: "Geist, monospace" }}>
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
