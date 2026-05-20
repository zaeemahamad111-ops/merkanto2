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

export default function AcademyPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden border-b border-outline-variant/10">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
            src="/images/academy.png"
            alt="Academy Background"
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
    </div>
  );
}
