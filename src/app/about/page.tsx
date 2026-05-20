"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen text-white relative overflow-hidden">
      {/* Background spotlights & SVGs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute inset-0 line-pattern pointer-events-none opacity-40 z-0" />

      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-16 max-w-[1280px] mx-auto z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1 mb-6 uppercase tracking-widest text-[10px] md:text-[11px]"
            style={{ fontFamily: "Geist, monospace" }}
          >
            Institutional Profile & Core Philosophy
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mb-8 font-black uppercase tracking-tight"
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              fontSize: "clamp(36px, 7vw, 68px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Structural Intelligence <br />
            <span className="text-primary">For Global Commerce</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Merkanto is a multi-dimensional global enterprise operating at the intersection of international trade, private capital execution, strategic compliance advisory, and elite academic accreditation. We engineer and govern private supply chains with absolute precision.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── MISSION & CORE PILLARS (BENTO) ─── */}
      <section className="py-16 md:py-24 px-6 md:px-16 max-w-[1280px] mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <motion.div
            className="glass-card p-8 md:p-10 flex flex-col justify-between h-[360px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <span className="material-symbols-outlined text-primary mb-6 block" style={{ fontSize: "36px" }}>
                hub
              </span>
              <h3 className="text-white mb-3 text-xl md:text-2xl font-bold uppercase tracking-wide" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>
                Supply Chain Orchestration
              </h3>
              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                We direct primary networks and logistics channels across six continents, implementing real-time verification and rigorous quality control for raw asset and high-value technical shipments.
              </p>
            </div>
            <div className="text-primary text-xs uppercase tracking-widest font-bold" style={{ fontFamily: "Geist, monospace" }}>
              01 / Operation Core
            </div>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            className="glass-card p-8 md:p-10 flex flex-col justify-between h-[360px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <span className="material-symbols-outlined text-primary mb-6 block" style={{ fontSize: "36px" }}>
                verified_user
              </span>
              <h3 className="text-white mb-3 text-xl md:text-2xl font-bold uppercase tracking-wide" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>
                Compliance & Security
              </h3>
              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Governance is our foundation. We operate structured compliance layers and automated customs documentation routing to guarantee secure, high-stakes regulatory clearance in complex jurisdictions.
              </p>
            </div>
            <div className="text-primary text-xs uppercase tracking-widest font-bold" style={{ fontFamily: "Geist, monospace" }}>
              02 / Risk Mitigation
            </div>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            className="glass-card p-8 md:p-10 flex flex-col justify-between h-[360px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <span className="material-symbols-outlined text-primary mb-6 block" style={{ fontSize: "36px" }}>
                school
              </span>
              <h3 className="text-white mb-3 text-xl md:text-2xl font-bold uppercase tracking-wide" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>
                Scholastic Excellence
              </h3>
              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Our Academy exists to cultivate the next cohort of global trade executives. We provide elite-track accreditation, dynamic video classrooms, and structured case review work.
              </p>
            </div>
            <div className="text-primary text-xs uppercase tracking-widest font-bold" style={{ fontFamily: "Geist, monospace" }}>
              03 / Academic Accreditation
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CORPORATE STANDARDS & GOVERNANCE ─── */}
      <section className="py-16 md:py-24 px-6 md:px-16 max-w-[1280px] mx-auto z-10 relative border-t border-outline-variant/10">
        <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
          <motion.div
            className="md:max-w-md"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white mb-6 uppercase tracking-tight font-black" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.1 }}>
              Governance <br />& Global Standards
            </h2>
            <p className="text-on-surface-variant text-base leading-relaxed mb-6 font-light" style={{ fontFamily: "Inter, sans-serif" }}>
              Merkanto operates in compliance with strict international trade acts and custom protocols. Our corporate structures protect private client interest and maintain maximum execution efficiency across trade nodes.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[11px]"
              style={{ fontFamily: "Geist, monospace" }}
            >
              Verify Legal Protocols
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
            </Link>
          </motion.div>

          <motion.div
            className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-surface-container-low border border-outline-variant/10 p-6 md:p-8">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-3" style={{ fontFamily: "Geist, monospace" }}>
                Operational Integrity
              </h4>
              <p className="text-on-surface-variant text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Every transaction undergoes secure AML validation and multi-layer structural check to protect private investment portfolios.
              </p>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/10 p-6 md:p-8">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-3" style={{ fontFamily: "Geist, monospace" }}>
                Accredited Syllabus
              </h4>
              <p className="text-on-surface-variant text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                The Academy curriculum is verified by institutional advisors to match primary industry standards for global logistics training.
              </p>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/10 p-6 md:p-8">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-3" style={{ fontFamily: "Geist, monospace" }}>
                Private Node Security
              </h4>
              <p className="text-on-surface-variant text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Student workspaces and private trade communication channels utilize advanced endpoint authentication to prevent database leaks.
              </p>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/10 p-6 md:p-8">
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-3" style={{ fontFamily: "Geist, monospace" }}>
                Sovereign Compliance
              </h4>
              <p className="text-on-surface-variant text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Full cross-border synchronization with custom agencies in 42 partner nations to enable priority green lane clearances.
              </p>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
}
