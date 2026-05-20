"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { defaultContent, ContentItem } from "@/utils/defaultContent";
import { motion, AnimatePresence } from "framer-motion";
import { clearContentCache } from "@/hooks/useContent";

const categories = ["Home", "About", "Trade", "Academy", "Automotive", "Weddings", "Events", "Socials"];

export default function CMSPage() {
  // Authentication states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Database and data states
  const [dbState, setDbState] = useState<"checking" | "table_missing" | "empty" | "ready">("checking");
  const [dbItems, setDbItems] = useState<ContentItem[]>([]);
  const [activeTab, setActiveTab] = useState("Home");
  
  // Status/Feedback states
  const [savingStatus, setSavingStatus] = useState<Record<string, "idle" | "saving" | "success" | "error">>({});
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState("");

  const missingKeysCount = dbItems.length > 0 
    ? defaultContent.filter((defaultItem) => !dbItems.some((dbItem) => dbItem.key === defaultItem.key)).length
    : 0;

  // 1. Session authorization check
  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = sessionStorage.getItem("merkanto_admin_session");
      if (session === "authorized") {
        setIsAuthorized(true);
        checkDatabaseStatus();
      }
    }
  }, []);

  // 2. Authenticate admin credentials
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase().trim() === "merkantopvtltd@gmail.com" && password === "Merkanto@123") {
      setIsAuthorized(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("merkanto_admin_session", "authorized");
      }
      checkDatabaseStatus();
    } else {
      setLoginError("INVALID ADMINISTRATOR CREDENTIALS.");
    }
  };

  // 3. Log out admin
  const handleLogout = () => {
    setIsAuthorized(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("merkanto_admin_session");
    }
  };

  // 4. Diagnose Supabase Table presence and seeding state
  const checkDatabaseStatus = async () => {
    setDbState("checking");
    setGeneralError("");
    try {
      const { data, error } = await supabase
        .from("merkanto_content")
        .select("*");

      if (error) {
        console.warn("Supabase query error:", error);
        // PostgREST code for relation/table missing is 42P01
        if (error.code === "42P01") {
          setDbState("table_missing");
        } else {
          setDbState("table_missing"); // Fallback to setup screen so user can run SQL or check keys
          setGeneralError(`Database Connection Error: ${error.message} (Code: ${error.code})`);
        }
      } else if (!data || data.length === 0) {
        setDbState("empty");
      } else {
        setDbItems(data as ContentItem[]);
        setDbState("ready");
      }
    } catch (err: any) {
      console.warn("Unexpected connection error:", err);
      setDbState("table_missing");
      setGeneralError(`An unexpected error occurred connecting to Supabase: ${err?.message || err}`);
    }
  };

  // 5. Seed default content values into Supabase with one-click
  const initializeDatabase = async () => {
    setDbState("checking");
    try {
      const { error } = await supabase
        .from("merkanto_content")
        .insert(
          defaultContent.map((item) => ({
            key: item.key,
            value: item.value,
            category: item.category,
            label: item.label,
            type: item.type
          }))
        );

      if (error) {
        setGeneralError(`Failed to seed database: ${error.message}`);
        setDbState("empty");
      } else {
        clearContentCache();
        checkDatabaseStatus();
      }
    } catch (err) {
      setGeneralError("Error seeding content. Verify table access keys.");
      setDbState("empty");
    }
  };

  // 6. Update a single content row value (auto-saves on blur or direct input save)
  const handleValueChange = (key: string, newValue: string) => {
    setDbItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, value: newValue } : item))
    );
  };

  // 7. Save item edits to Supabase
  const saveItem = async (key: string, value: string) => {
    setSavingStatus((prev) => ({ ...prev, [key]: "saving" }));
    try {
      const { error } = await supabase
        .from("merkanto_content")
        .update({ value })
        .eq("key", key);

      if (error) {
        setSavingStatus((prev) => ({ ...prev, [key]: "error" }));
      } else {
        setSavingStatus((prev) => ({ ...prev, [key]: "success" }));
        clearContentCache();
        setTimeout(() => {
          setSavingStatus((prev) => ({ ...prev, [key]: "idle" }));
        }, 2000);
      }
    } catch {
      setSavingStatus((prev) => ({ ...prev, [key]: "error" }));
    }
  };

  // 8. Handle media uploads into Supabase Storage
  const handleMediaUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingKey(key);
    try {
      // 1. Create a safe filename structure
      const fileExt = file.name.split(".").pop();
      const fileName = `${key.replace(/\./g, "_")}_${Date.now()}.${fileExt}`;
      
      // 2. Upload file to a public storage bucket named "merkanto_media"
      const { data, error } = await supabase.storage
        .from("merkanto_media")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false
        });

      if (error) {
        alert(`Media Upload Failed: ${error.message}\n\nEnsure that:\n1. The bucket 'merkanto_media' exists.\n2. The bucket is set to PUBLIC in the Supabase Dashboard.\n3. You have run the Storage RLS SQL policies script.`);
        console.warn("Storage upload error details:", error);
      } else if (data) {
        // 3. Fetch the public URL of the uploaded media
        const { data: urlData } = supabase.storage
          .from("merkanto_media")
          .getPublicUrl(fileName);

        if (urlData?.publicUrl) {
          handleValueChange(key, urlData.publicUrl);
          await saveItem(key, urlData.publicUrl);
        } else {
          alert("Media uploaded, but failed to retrieve its public URL.");
        }
      }
    } catch (err: any) {
      alert(`Media upload failed: ${err.message || err}`);
      console.warn("Media upload exception:", err);
    } finally {
      setUploadingKey(null);
      // Reset input element value so that uploading the same file again triggers onChange
      e.target.value = "";
    }
  };

  // Render SQL command snippet helper for setup
  const sqlCommand = `-- 1. CREATE WEBSITE CONTENT TABLE
CREATE TABLE IF NOT EXISTS public.merkanto_content (
  key text PRIMARY KEY,
  value text NOT null,
  category text NOT null,
  label text NOT null,
  type text NOT null
);

-- Enable select (read) for everyone
ALTER TABLE public.merkanto_content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON public.merkanto_content;
CREATE POLICY "Allow public read" ON public.merkanto_content FOR SELECT USING (true);

-- Enable insert/update/delete (write) for everyone
DROP POLICY IF EXISTS "Allow public write" ON public.merkanto_content;
CREATE POLICY "Allow public write" ON public.merkanto_content FOR ALL USING (true) WITH CHECK (true);


-- 2. CREATE STORAGE BUCKET & RLS POLICIES FOR MEDIA UPLOADS
INSERT INTO storage.buckets (id, name, public)
VALUES ('merkanto_media', 'merkanto_media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT USING (bucket_id = 'merkanto_media');

DROP POLICY IF EXISTS "Public Upload Access" ON storage.objects;
CREATE POLICY "Public Upload Access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'merkanto_media');

DROP POLICY IF EXISTS "Public Update Access" ON storage.objects;
CREATE POLICY "Public Update Access" ON storage.objects FOR UPDATE USING (bucket_id = 'merkanto_media');`;

  // ─── LOGIN SCREEN ───
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <motion.div 
          className="glass-card w-full max-w-[420px] p-8 relative z-10 border border-outline-variant/10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary uppercase tracking-[0.3em] text-[10px] md:text-[11px]" style={{ fontFamily: "Geist, monospace" }}>
            Merkanto Console
          </span>
          <h2 className="text-3xl font-medium mt-3 mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>
            CMS Gatekeeper
          </h2>

          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <div className="flex flex-col gap-2">
              <label className="text-on-surface-variant uppercase tracking-widest text-[10px]" style={{ fontFamily: "Geist, monospace" }}>Username</label>
              <input
                type="text"
                className="bg-transparent border-b border-outline-variant/40 py-2 focus:outline-none focus:border-primary transition-colors text-on-surface text-sm"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ fontFamily: "Manrope, sans-serif" }}
                placeholder="Enter username"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-on-surface-variant uppercase tracking-widest text-[10px]" style={{ fontFamily: "Geist, monospace" }}>Password</label>
              <input
                type="password"
                className="bg-transparent border-b border-outline-variant/40 py-2 focus:outline-none focus:border-primary transition-colors text-on-surface text-sm"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ fontFamily: "Manrope, sans-serif" }}
                placeholder="Enter password"
              />
            </div>

            {loginError && (
              <p className="text-error text-xs uppercase tracking-wider" style={{ fontFamily: "Geist, monospace" }}>
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-on-primary py-4 font-bold uppercase tracking-widest text-xs hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/10 mt-2"
              style={{ fontFamily: "Geist, monospace" }}
            >
              Authenticate Portal
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ─── DASHBOARD SCREEN ───
  return (
    <div className="min-h-screen text-on-surface relative pb-20">
      {/* Spotlight */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header bar */}
      <header className="border-b border-outline-variant/10 bg-surface/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-primary uppercase tracking-[0.2em] font-bold text-xs" style={{ fontFamily: "Geist, monospace" }}>
              Merkanto CMS
            </span>
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-on-surface-variant text-[11px] uppercase tracking-wider hidden sm:inline" style={{ fontFamily: "Geist, monospace" }}>
              Live Synchronization Enabled
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={checkDatabaseStatus}
              className="hover:text-primary transition-colors flex items-center justify-center p-2 text-on-surface-variant"
              title="Refresh database connection"
            >
              <span className="material-symbols-outlined text-[20px]">sync</span>
            </button>
            <button
              onClick={handleLogout}
              className="border border-outline-variant/40 hover:border-error hover:text-error text-on-surface-variant transition-all px-4 py-2 uppercase tracking-widest text-[10px]"
              style={{ fontFamily: "Geist, monospace" }}
            >
              Exit Console
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-6 md:px-16 mt-12 relative z-10">
        {/* State Banner 1: Database Error / Table Missing */}
        {dbState === "table_missing" && (
          <motion.div 
            className="bg-surface-container-highest border border-error/30 p-8 rounded-lg mb-10 max-w-3xl mx-auto space-y-6"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex items-center gap-3 text-error">
              <span className="material-symbols-outlined text-3xl">database</span>
              <h3 className="text-xl font-bold uppercase tracking-wide" style={{ fontFamily: "Outfit, sans-serif" }}>Database Setup Required</h3>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed" style={{ fontFamily: "Manrope, sans-serif" }}>
              To support live content updates, a database table named <strong>merkanto_content</strong> must be added to your Supabase project. Paste the following SQL script into the SQL Editor in your Supabase Dashboard:
            </p>
            <div className="relative">
              <pre className="bg-black/60 p-5 overflow-x-auto text-xs text-primary/80 border border-outline-variant/20 rounded font-mono leading-relaxed select-all max-h-60 overflow-y-auto">
                {sqlCommand}
              </pre>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(sqlCommand);
                  alert("SQL script copied to clipboard!");
                }}
                className="absolute top-3 right-3 bg-surface border border-outline-variant/40 text-[10px] text-on-surface-variant hover:text-primary hover:border-primary transition-all px-3 py-1.5 uppercase font-bold tracking-widest"
                style={{ fontFamily: "Geist, monospace" }}
              >
                Copy SQL
              </button>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={checkDatabaseStatus}
                className="bg-primary text-on-primary px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2"
                style={{ fontFamily: "Geist, monospace" }}
              >
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Table Created - Connect Now
              </button>
            </div>
          </motion.div>
        )}

        {/* State Banner 2: Table Empty (Needs seeding) */}
        {dbState === "empty" && (
          <motion.div 
            className="bg-surface-container-high border border-primary/30 p-8 rounded-lg mb-10 max-w-2xl mx-auto text-center space-y-6"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex flex-col items-center gap-3 text-primary">
              <span className="material-symbols-outlined text-5xl">cloud_sync</span>
              <h3 className="text-2xl font-bold uppercase tracking-wide" style={{ fontFamily: "Outfit, sans-serif" }}>Initialize Website Contents</h3>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-md mx-auto" style={{ fontFamily: "Manrope, sans-serif" }}>
              Your database table was successfully created but has no contents. Initialize it now with the website's default text Copy, images, and video paths.
            </p>
            <button
              onClick={initializeDatabase}
              className="bg-primary text-on-primary px-10 py-4 font-bold uppercase tracking-widest text-xs hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-primary/10"
              style={{ fontFamily: "Geist, monospace" }}
            >
              Initialize CMS Data
            </button>
          </motion.div>
        )}

        {/* State Banner 3: Loading */}
        {dbState === "checking" && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl animate-spin text-primary">sync</span>
            <p className="text-xs uppercase tracking-widest" style={{ fontFamily: "Geist, monospace" }}>Contacting Supabase Node...</p>
          </div>
        )}

        {/* State 4: Content Ready */}
        {dbState === "ready" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 flex flex-col gap-2 bg-surface-container-low border border-outline-variant/10 p-4">
              <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-mono mb-2 px-3">
                Category Pages
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`w-full text-left px-4 py-3 uppercase tracking-widest text-[11px] transition-all flex items-center justify-between ${
                    activeTab === cat
                      ? "bg-primary/10 text-primary border-l-2 border-primary font-bold"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  }`}
                  style={{ fontFamily: "Geist, monospace" }}
                >
                  {cat}
                  <span className="text-[10px] opacity-55">
                    ({dbItems.filter((i) => i.category === cat).length})
                  </span>
                </button>
              ))}
            </div>

            {/* Editing Pane */}
            <div className="lg:col-span-9 space-y-8">
              <div className="flex items-center justify-between border-b border-outline-variant/10 pb-4 mb-6">
                <h2 className="text-2xl font-semibold uppercase tracking-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
                  Editing {activeTab} Page
                </h2>
                <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 font-mono uppercase">
                  {dbItems.filter((i) => i.category === activeTab).length} fields editable
                </span>
              </div>

              {missingKeysCount > 0 && (
                <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                      <span className="material-symbols-outlined text-[18px]">info</span>
                      New CMS Fields Available ({missingKeysCount})
                    </h4>
                    <p className="text-xs text-on-surface-variant max-w-xl" style={{ fontFamily: "Manrope, sans-serif" }}>
                      New editable components (like social media links) have been added to the application. Click to sync your database without resetting any of your existing text or images.
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      const missingItems = defaultContent.filter(
                        (defaultItem) => !dbItems.some((dbItem) => dbItem.key === defaultItem.key)
                      );
                      if (missingItems.length === 0) return;
                      setDbState("checking");
                      try {
                        const { error } = await supabase
                          .from("merkanto_content")
                          .insert(
                            missingItems.map((item) => ({
                              key: item.key,
                              value: item.value,
                              category: item.category,
                              label: item.label,
                              type: item.type
                            }))
                          );

                        if (error) {
                          alert(`Sync failed: ${error.message}`);
                        } else {
                          alert("Database synced successfully! Added " + missingItems.length + " new fields.");
                        }
                      } catch (err: any) {
                        alert(`Sync failed: ${err.message || err}`);
                      } finally {
                        checkDatabaseStatus();
                      }
                    }}
                    className="bg-primary text-on-primary px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
                    style={{ fontFamily: "Geist, monospace" }}
                  >
                    Sync New Fields
                  </button>
                </div>
              )}

              {generalError && (
                <div className="p-4 bg-error/10 border border-error text-error text-xs uppercase tracking-wider mb-6" style={{ fontFamily: "Geist, monospace" }}>
                  {generalError}
                </div>
              )}

              {/* Loop over tab fields */}
              <div className="space-y-10">
                {dbItems
                  .filter((item) => item.category === activeTab)
                  .map((item) => {
                    const saveStatus = savingStatus[item.key] || "idle";

                    return (
                      <div 
                        key={item.key} 
                        className="bg-surface-container-low border border-outline-variant/10 p-6 md:p-8 space-y-4 hover:border-outline-variant/30 transition-colors"
                      >
                        {/* Label Row */}
                        <div className="flex justify-between items-center">
                          <span 
                            className="text-xs uppercase tracking-wider text-on-surface font-semibold"
                            style={{ fontFamily: "Geist, monospace" }}
                          >
                            {item.label}
                          </span>
                          <span 
                            className="text-[9px] uppercase tracking-wider font-mono text-on-surface-variant opacity-60"
                          >
                            {item.key}
                          </span>
                        </div>

                        {/* Text Inputs */}
                        {item.type === "text" && (
                          <input
                            type="text"
                            value={item.value}
                            onChange={(e) => handleValueChange(item.key, e.target.value)}
                            onBlur={() => saveItem(item.key, item.value)}
                            className="w-full bg-surface border border-outline-variant/30 p-3.5 focus:outline-none focus:border-primary text-on-surface text-sm transition-colors"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                          />
                        )}

                        {/* Textarea Inputs */}
                        {item.type === "textarea" && (
                          <textarea
                            value={item.value}
                            onChange={(e) => handleValueChange(item.key, e.target.value)}
                            onBlur={() => saveItem(item.key, item.value)}
                            rows={4}
                            className="w-full bg-surface border border-outline-variant/30 p-3.5 focus:outline-none focus:border-primary text-on-surface text-sm transition-colors resize-none leading-relaxed"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                          />
                        )}

                        {/* Image / Video Media Inputs with Upload Support */}
                        {(item.type === "image" || item.type === "video") && (
                          <div className="space-y-3">
                            {/* Input for direct URL pasting */}
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={item.value}
                                onChange={(e) => handleValueChange(item.key, e.target.value)}
                                onBlur={() => saveItem(item.key, item.value)}
                                placeholder="Paste direct media URL here"
                                className="flex-1 bg-surface border border-outline-variant/30 px-3.5 py-3 focus:outline-none focus:border-primary text-on-surface text-sm transition-colors"
                                style={{ fontFamily: "Manrope, sans-serif" }}
                              />
                              
                              {/* Direct file upload trigger */}
                              <label className="shrink-0 bg-surface-container-high border border-outline-variant/30 hover:border-primary hover:text-primary transition-all px-4 py-3 flex items-center justify-center cursor-pointer text-xs font-bold uppercase tracking-widest relative">
                                {uploadingKey === item.key ? (
                                  <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                                ) : (
                                  <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                                )}
                                <input
                                  type="file"
                                  accept={item.type === "video" ? "video/*" : "image/*"}
                                  className="hidden"
                                  disabled={uploadingKey !== null}
                                  onChange={(e) => handleMediaUpload(item.key, e)}
                                />
                              </label>
                            </div>

                            {/* Image preview box */}
                            {item.type === "image" && item.value && (
                              <div className="relative w-full max-w-[200px] h-[120px] border border-outline-variant/10 overflow-hidden bg-black/30">
                                <img
                                  src={item.value}
                                  alt="Field Preview"
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    // Fallback if URL is invalid
                                    (e.target as HTMLElement).style.display = "none";
                                  }}
                                />
                              </div>
                            )}

                            {/* Video preview box */}
                            {item.type === "video" && item.value && (
                              <div className="relative w-full max-w-[240px] h-[120px] border border-outline-variant/10 overflow-hidden bg-black/30">
                                <video
                                  src={item.value}
                                  controls
                                  muted
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            )}
                          </div>
                        )}

                        {/* Status bar */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-1.5 text-on-surface-variant text-[10px] tracking-wider uppercase font-mono">
                            {saveStatus === "idle" && (
                              <>
                                <span className="w-1.5 h-1.5 bg-outline rounded-full" />
                                Changes Auto-Saved on exit
                              </>
                            )}
                            {saveStatus === "saving" && (
                              <>
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                                <span className="text-primary font-bold">Synchronizing...</span>
                              </>
                            )}
                            {saveStatus === "success" && (
                              <>
                                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span className="text-primary font-bold">Live database synced!</span>
                              </>
                            )}
                            {saveStatus === "error" && (
                              <>
                                <span className="w-1.5 h-1.5 bg-error rounded-full animate-pulse" />
                                <span className="text-error font-bold">Sync failed!</span>
                              </>
                            )}
                          </div>

                          {/* Trigger manual save */}
                          <button
                            onClick={() => saveItem(item.key, item.value)}
                            disabled={saveStatus === "saving"}
                            className="bg-surface-container-high border border-outline-variant/20 hover:border-primary hover:text-primary transition-all px-4 py-1.5 uppercase font-bold tracking-widest text-[9px]"
                            style={{ fontFamily: "Geist, monospace" }}
                          >
                            Save Field
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
