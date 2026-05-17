"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const stats = [
  { value: "$4.2B+", label: "Facilitated Trade" },
  { value: "120+", label: "Global Routes" },
  { value: "15k", label: "Executive Alumni" },
  { value: "Kuwait", label: "HQ Operations" },
];

const modules = [
  {
    colSpan: "md:col-span-8",
    number: "Module 01",
    title: "Import & Export Fundamentals",
    desc: "Deciphering the legal complexities and operational frameworks of global trade. From Bill of Lading to Incoterms 2024.",
    lessons: "12 Lessons",
    duration: "14h Total",
    badge: "Premium",
    large: true,
  },
  {
    colSpan: "md:col-span-4",
    number: "Module 02",
    title: "Supplier Comms",
    desc: "The art of the negotiation in Chinese and Indian manufacturing hubs.",
    tag: "Live Workshop",
    large: false,
  },
  {
    colSpan: "md:col-span-4",
    number: "Module 03",
    title: "Trade Flow (GCC)",
    desc: "Strategic logistics between UAE, Kuwait, and India.",
    small: true,
  },
  {
    colSpan: "md:col-span-4",
    number: "Module 04",
    title: "Product Branding",
    desc: "Positioning luxury goods for the international market.",
    small: true,
  },
  {
    colSpan: "md:col-span-4",
    number: "Module 05",
    title: "Scaling Systems",
    desc: "Automating your operational flow with AI and ERPs.",
    small: true,
    highlight: true,
  },
];

const features = [
  { icon: "smart_display", title: "HD Video Lessons", desc: "Cinematic production quality capturing every operational nuance of global warehouses." },
  { icon: "terminal", title: "Live Operations", desc: "Weekly live sessions where we dissect actual ongoing trades and logistics challenges." },
  { icon: "workspace_premium", title: "Global Certification", desc: "Industry-recognized certification co-signed by the Merkanto Global Trade Hub." },
];

export default function AcademyPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden border-b border-outline-variant/10">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuALhGG74MWePnvYdyu0liEwb--Nshc3-n4G7Y59HAnK6j2lfE96nVJsx86Rgq1F8isl0ziNNIBka_Q4s2I85wkLAX_-Nizex7m9pcPWtrlIG-TgPfC6qNF8Dv4b_Xjh5y_psiEtF9A40v5y-PlhfrrxKuzO8rtY-AGDjzs3ZO28pYzdbAFRJYmQfO95fMOfMB264uRcLXXnpx8glMSHmh8JE9pqUGKa_jdf25oBzR0XmDx7r4ILk5heQd0Z3lYfV-nfM2c9-wmMits"
            alt="Shipping terminal at twilight"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute inset-0 glow-spotlight" />
        </div>

        <motion.div
          className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16 text-center pt-20 md:pt-24"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="inline-block bg-primary text-on-primary px-3 py-1 mb-6 md:mb-8 font-bold uppercase tracking-[0.2em] text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>
            Intelligence at Scale
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="max-w-5xl mx-auto mb-6 md:mb-8"
            style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(32px, 8vw, 72px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.03em" }}
          >
            Learn International Trade From <span className="text-primary italic">Real</span> Business Operations
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-on-surface-variant max-w-2xl mx-auto mb-10 md:mb-12 text-base md:text-[18px]" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
            Access the proprietary blueprints of global logistics. We don't just teach theory; we show you the live data streams of Merkanto's own international trade networks.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <Link
              href="/login"
              className="w-full md:w-auto bg-primary text-on-primary px-10 py-4 md:py-5 font-black uppercase tracking-[0.1em] hover:opacity-90 transition-all text-center flex items-center justify-center"
              style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}
            >
              DIVE INTO IT
            </Link>
            <button className="w-full md:w-auto border border-outline-variant text-on-surface px-10 py-4 md:py-5 font-medium uppercase tracking-[0.1em] hover:bg-white/5 transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
              Explore Curriculum
            </button>
          </motion.div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="relative z-10 mt-12 md:mt-16 border-t border-white/5 bg-surface/10 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-primary font-bold mb-1 text-2xl md:text-[28px]" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>{s.value}</div>
                <div className="text-on-surface-variant uppercase tracking-widest mt-1 text-[10px] md:text-[11px]" style={{ fontFamily: "Geist, monospace" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── CURRICULUM BENTO ─── */}
      <section className="py-[60px] md:py-[120px] px-6 md:px-16 max-w-[1280px] mx-auto">
        <motion.div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 text-left" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeInUp} className="max-w-2xl">
            <h2 className="mb-4" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
              The Architectural Curriculum
            </h2>
            <p className="text-on-surface-variant" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px" }}>
              A modular learning experience designed for industrial precision. Master the flow of goods from conceptual branding to final delivery.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="mt-6 md:mt-0 text-primary flex items-center gap-2 cursor-pointer" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
            VIEW FULL SYLLABUS <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.number}
              className={`${mod.colSpan} glass-card overflow-hidden p-8 md:p-10 ${mod.highlight ? "border-primary/20 bg-primary/5" : ""} ${mod.large ? "min-h-[350px] flex flex-col justify-end relative group" : "flex flex-col"} hover:border-primary/30 transition-all`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {mod.badge && (
                <div className="absolute top-6 right-6 md:top-10 md:right-10">
                  <span className="bg-primary/10 text-primary px-3 py-1 uppercase tracking-wider text-[10px] md:text-[11px]" style={{ fontFamily: "Geist, monospace" }}>{mod.badge}</span>
                </div>
              )}
              <div className="relative z-10">
                <span className="text-primary mb-2 block uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>{mod.number}</span>
                <h3 className="font-bold mb-4" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: mod.large ? "28px" : "20px" }}>{mod.title}</h3>
                <p className="text-on-surface-variant mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: mod.small ? "14px" : "16px" }}>{mod.desc}</p>
                {mod.lessons && (
                  <div className="flex gap-4">
                    <span className="flex items-center gap-2 text-on-surface" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>play_circle</span> {mod.lessons}
                    </span>
                    <span className="flex items-center gap-2 text-on-surface" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>schedule</span> {mod.duration}
                    </span>
                  </div>
                )}
                {mod.tag && (
                  <div className="mt-auto border-t border-white/10 pt-6 flex items-center justify-between">
                    <span className="text-on-surface uppercase" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>{mod.tag}</span>
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: "20px" }}>arrow_outward</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="bg-surface-container-low py-[60px] md:py-[120px] border-y border-outline-variant/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <motion.div className="text-center mb-12 md:mb-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="mb-6" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Designed for Performance
            </h2>
            <div className="w-16 md:w-24 h-1 bg-primary mx-auto mb-6" />
            <p className="text-on-surface-variant max-w-xl mx-auto" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px" }}>
              Our learning ecosystem is inspired by the efficiency of modern operations dashboards.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="flex flex-col items-center text-center p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: "32px" }}>{f.icon}</span>
                </div>
                <h4 className="font-bold mb-4 uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>{f.title}</h4>
                <p className="text-on-surface-variant" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px" }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ENROLLMENT CTA ─── */}
      <section className="py-[60px] md:py-[120px] px-6 md:px-16 relative overflow-hidden">
        <motion.div
          className="max-w-4xl mx-auto glass-card p-8 md:p-16 text-center relative z-10 border-primary/20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 md:w-48 h-1 bg-primary" />
          <h2 className="mb-6 md:mb-8" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(24px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
            Apply for the 2024 Cohort
          </h2>
          <p className="text-on-surface-variant mb-10 md:mb-12 text-base md:text-[18px]" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
            Limited to 500 executive candidates per quarter to ensure operational mentorship quality.
          </p>
          <form className="flex flex-col md:flex-row gap-6 md:gap-4 max-w-2xl mx-auto">
            <div className="flex-1">
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface py-4 px-0 outline-none text-center md:text-left"
                placeholder="Professional Email Address"
                type="email"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "16px" }}
              />
            </div>
            <button className="w-full md:w-auto bg-primary text-on-primary px-12 py-4 font-black uppercase tracking-[0.2em] hover:opacity-90 transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
              Request Access
            </button>
          </form>
          <p className="mt-8 text-on-surface-variant uppercase tracking-widest opacity-50" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>
            Secure enrollment window closes in 4 days.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
