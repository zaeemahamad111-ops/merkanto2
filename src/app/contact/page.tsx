"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen line-pattern">
      {/* ─── HERO HEADER ─── */}
      <section className="relative pt-32 md:pt-24 pb-12 md:pb-16 hero-gradient">
        <motion.div
          className="max-w-[1280px] mx-auto px-6 md:px-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block px-3 py-1 bg-surface-container-highest/30 border border-primary/30 mb-6" style={{ borderRadius: "9999px" }}>
            <span className="text-primary uppercase tracking-[0.2em] text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>Contact Excellence</span>
          </div>
          <h1 className="mb-4" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(36px, 8vw, 72px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Establish Connection
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-sm md:text-lg" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
            Engage with our global trade advisory. Whether you are scaling operations or entering new markets, your journey begins here.
          </p>
        </motion.div>
      </section>

      {/* ─── MAIN GRID ─── */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-16 pb-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inquiry Form */}
          <motion.div
            className="lg:col-span-7 glass-card p-8 md:p-14 relative overflow-hidden group"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16" />
            <h2 className="mb-10 text-center md:text-left" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(24px, 3vw, 48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Direct Inquiry
            </h2>
            <form className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-on-surface-variant uppercase tracking-widest text-[10px] md:text-[11px]" style={{ fontFamily: "Geist, monospace" }}>Full Name</label>
                  <input
                    className="bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-primary transition-colors text-on-surface text-sm md:text-base"
                    placeholder="Alexander Sterling"
                    type="text"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-on-surface-variant uppercase tracking-widest text-[10px] md:text-[11px]" style={{ fontFamily: "Geist, monospace" }}>Corporate Email</label>
                  <input
                    className="bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-primary transition-colors text-on-surface text-sm md:text-base"
                    placeholder="as@merkanto.global"
                    type="email"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-on-surface-variant uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Inquiry Type</label>
                <select
                  className="bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-primary transition-colors text-on-surface appearance-none"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <option className="bg-surface">Strategic Trade Partnership</option>
                  <option className="bg-surface">Institutional Academy Enrollment</option>
                  <option className="bg-surface">Automotive Logistics</option>
                  <option className="bg-surface">Wedding Cinema Commission</option>
                  <option className="bg-surface">Event Management</option>
                  <option className="bg-surface">Private Portfolio Advisory</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-on-surface-variant uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Message</label>
                <textarea
                  className="bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-primary transition-colors text-on-surface resize-none"
                  placeholder="Describe the scope of your vision..."
                  rows={4}
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>

              <div className="pt-4">
                <button
                  className="w-full bg-primary text-on-primary py-5 font-bold uppercase tracking-[0.3em] hover:brightness-110 active:scale-[0.99] transition-all shadow-xl shadow-primary/10"
                  type="submit"
                  style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}
                >
                  Dispatch Message
                </button>
              </div>
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {/* WhatsApp */}
            <div className="bg-surface-container-low border border-outline-variant/20 p-8 flex flex-col justify-between min-h-[200px] md:min-h-[240px] text-center md:text-left">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-[32px] md:text-[40px]">chat_bubble</span>
                  <h3 className="text-2xl md:text-[28px] font-medium" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>Instant Priority</h3>
                </div>
                <p className="text-on-surface-variant mb-8 text-sm md:text-base" style={{ fontFamily: "Inter, sans-serif" }}>
                  Connect with our concierge desk via encrypted WhatsApp for immediate institutional support.
                </p>
              </div>
              <a
                className="inline-flex items-center justify-center md:justify-start gap-4 text-primary uppercase tracking-widest border border-primary px-8 py-4 hover:bg-primary hover:text-on-primary transition-all self-center md:self-start w-full md:w-auto"
                href="#"
                style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}
              >
                Connect on WhatsApp
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_outward</span>
              </a>
            </div>

            {/* Office Info */}
            <div className="glass-card p-8">
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 bg-primary-container/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                  </div>
                  <div>
                    <h4 className="text-on-surface-variant uppercase tracking-widest mb-1" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Global Headquarters</h4>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px" }}>101 Marina Financial Center<br />Dubai, UAE</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 bg-primary-container/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">schedule</span>
                  </div>
                  <div>
                    <h4 className="text-on-surface-variant uppercase tracking-widest mb-1" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Operations Hours</h4>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px" }}>Mon — Fri: 08:00 - 22:00 GST<br />Saturday: Limited Support</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 bg-primary-container/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">language</span>
                  </div>
                  <div>
                    <h4 className="text-on-surface-variant uppercase tracking-widest mb-1" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Global Desk</h4>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px" }}>London • Singapore • New York<br />Tokyo • Zurich</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── MAP SECTION ─── */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-16 pb-[60px] md:pb-[120px]">
        <motion.div
          className="relative h-[300px] md:h-[480px] w-full overflow-hidden border border-white/10 group grayscale contrast-125 brightness-50 hover:brightness-75 transition-all duration-1000"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAklxDLivXSlTJapUZyU05UNuqGcWBiyUqcQcG8sg_obhZL4UDszwxmA_DTyND47Hnua6-rTsANhPSfqsUdyAvyae8U8zFbyq3R-hMIu6a5WicDJohvOFth4lpuQEFzGBa4WWibfy-eYJVsDPo2-uxPYs7QiBOGIOOz4KDKiIY_h3isLDY-3S7AnRWQ5olr_Rd6Tz5NWvGqtOMGY3fkPbrW_uJjQPx2ykVnU63mkcyQbO8nNncQqqGnY71p37KE65qXKbtvOf0OG1E"
            alt="Dubai Marina aerial view"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
 
          {/* Floating Map Tag */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute" />
            <div className="w-4 h-4 bg-primary rounded-full relative z-10 border-2 border-on-primary" />
            <div className="mt-4 glass-card px-4 md:px-6 py-2 md:py-3 border border-primary/40">
              <span className="text-primary uppercase tracking-[0.2em] whitespace-nowrap text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>MERKANTO HQ</span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
