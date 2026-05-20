"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useContent } from "@/hooks/useContent";
import AlternatingText from "@/components/AlternatingText";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { getContent } = useContent();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9;
    }
  }, []);

  const divisions = [
    {
      title: getContent("home.division.0.title", "Institutional Trade"),
      description: getContent("home.division.0.description", "Precision-driven commodity trading and supply chain architecture for global markets."),
      cta: "Discover Trade",
      href: "/trade",
      colSpan: "md:col-span-2",
      height: "h-[400px]",
      img: getContent("home.division.0.img", "/images/academy.png"),
    },
    {
      title: getContent("home.division.1.title", "Academy Hub"),
      description: getContent("home.division.1.description", "Mentorship and curriculum for the next generation of exporters."),
      cta: "Learn More",
      href: "/academy",
      colSpan: "md:col-span-1",
      height: "h-[400px]",
      img: getContent("home.division.1.img", "/images/academy.png"),
    },
    {
      title: getContent("home.division.2.title", "Automotive"),
      description: getContent("home.division.2.description", "Global vehicle logistics and boutique acquisition services."),
      cta: "Explore",
      href: "/automotive",
      colSpan: "md:col-span-1",
      height: "h-[300px]",
      img: getContent("home.division.2.img", "/images/car interior.png"),
    },
    {
      title: getContent("home.division.3.title", "Weddings"),
      description: getContent("home.division.3.description", "Architecting timeless, high-production celebratory experiences."),
      cta: "View Cinema",
      href: "/wedding",
      colSpan: "md:col-span-1",
      height: "h-[300px]",
      img: getContent("home.division.3.img", "https://lh3.googleusercontent.com/aida-public/AB6AXuClmYFYOhxjTw17KMDLSnD1y6q-h3RHIrf7eFRA1ZwGgtFIkRnV-QlKZSxKC2hFcS7uxqg370wSqMzqlPN7EGnCmI65PDwfAt4vPjYNIrAY4KjkhsgfRTYYK10DJHH1GMsemYjvANUJ0tx6T2pPKSrC5oBS44tvoLZG7J4uwL_yJdaMa1Nf-j7qbWO9AKhfNB9htBc5DCPvFn-fLq_W8QUmgpa1IyG9seOrKu_2ftFJoUv7E0LRV0EW1mPrlWq5np_nVCUL2la4baM"),
    },
    {
      title: getContent("home.division.4.title", "Studios & Events"),
      description: getContent("home.division.4.description", "Large-scale event management and creative production house."),
      cta: "Explore",
      href: "/events",
      colSpan: "md:col-span-1",
      height: "h-[300px]",
      img: getContent("home.division.4.img", "/images/wedding set.png"),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[600px] md:h-screen md:min-h-[700px] flex items-center overflow-hidden py-20 md:py-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <video
            ref={videoRef}
            className="w-full h-full object-cover scale-[1.08]"
            src={getContent("home.hero.video", "/videos/hero_logistics.mp4")}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 hero-gradient z-20" />
        </div>

        <motion.div
          className="relative z-30 px-6 md:px-16 max-w-[1280px] mx-auto w-full text-center"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="inline-block px-3 py-1 mb-6 bg-surface-container-highest/30 border border-primary/20 backdrop-blur-md">
            <span className="text-primary uppercase tracking-[0.2em]" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
              {getContent("home.hero.badge", "Global Logistics Excellence")}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-on-surface mb-6 max-w-4xl mx-auto leading-tight"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(48px, 8vw, 72px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            <AlternatingText 
              text={getContent("home.hero.title", "Building Global Trade Leaders")}
              highlightIndices={[2, 3]}
            />
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed opacity-90 text-base md:text-[18px]"
            style={{ fontFamily: "Manrope, sans-serif", lineHeight: 1.6 }}
          >
            {getContent("home.hero.description", "Merkanto Global Trade Academy equips entrepreneurs and future exporters with practical international trade systems, supplier networks, branding strategies, and real-world import-export operations.")}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link
              href="/academy"
              className="w-full md:w-auto bg-primary text-on-primary px-10 py-4 font-bold tracking-widest uppercase text-sm hover:brightness-110 transition-all text-center"
              style={{ fontFamily: "Geist, monospace" }}
            >
              Explore Academy
            </Link>
            <Link
              href="/trade"
              className="w-full md:w-auto border border-white/30 backdrop-blur-md text-on-surface px-10 py-4 font-bold tracking-widest uppercase text-sm hover:bg-white/10 transition-all text-center"
              style={{ fontFamily: "Geist, monospace" }}
            >
              Explore Ventures
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="material-symbols-outlined text-primary/50" style={{ fontSize: "40px" }}>expand_more</span>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="py-[60px] md:py-[120px] px-6 md:px-16">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 items-center">
          <motion.div
            className="space-y-8 text-center md:text-left"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeInUp} className="inline-block h-[1px] w-12 bg-primary mx-auto md:mx-0" />
            <motion.h2
              variants={fadeInUp}
              style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
              className="text-on-surface animate-pulse-subtle"
            >
              <AlternatingText 
                text={getContent("home.about.title", "Architecting Global Trade Integration")}
              />
            </motion.h2>
            <motion.div variants={stagger} className="space-y-6 text-on-surface-variant max-w-lg mx-auto md:mx-0 text-base md:text-[18px]" style={{ fontFamily: "Manrope, sans-serif", lineHeight: 1.6 }}>
              <motion.p variants={fadeInUp} className="leading-relaxed whitespace-pre-line">
                {getContent("home.about.description", "Merkanto Global is a multi-sector enterprise integrating premium commodity trading, structured academy training, luxury automotive acquisitions, and elite creative production.")}
              </motion.p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex justify-center md:justify-start gap-8 md:gap-12 pt-4">
              <div>
                <div className="text-primary font-bold mb-1 text-[28px] md:text-[32px]" style={{ fontFamily: "Outfit, sans-serif" }}>15+</div>
                <div className="text-on-surface-variant uppercase tracking-wider text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>Global Hubs</div>
              </div>
              <div>
                <div className="text-primary font-bold mb-1 text-[28px] md:text-[32px]" style={{ fontFamily: "Outfit, sans-serif" }}>500+</div>
                <div className="text-on-surface-variant uppercase tracking-wider text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>Strategic Partners</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Abstract Visual */}
          <motion.div
            className="relative aspect-square"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px]" />
            <div className="relative h-full w-full glass-card flex items-center justify-center p-8 md:p-12 overflow-hidden">
              <div className="grid grid-cols-2 gap-4 w-full h-full opacity-60">
                {[
                  { icon: "architecture", color: "text-primary" },
                  { icon: "token", color: "text-on-surface" },
                  { icon: "deployed_code", color: "text-on-surface" },
                  { icon: "hub", color: "text-primary" },
                ].map(({ icon, color }) => (
                  <div key={icon} className="border border-white/10 p-4 flex items-center justify-center">
                    <span className={`material-symbols-outlined ${color}`} style={{ fontSize: "60px" }}>{icon}</span>
                  </div>
                ))}
              </div>
              <div className="absolute border-2 border-primary/20 w-48 h-48 rotate-45 flex items-center justify-center">
                <div className="border border-primary/40 w-32 h-32 -rotate-12 flex items-center justify-center">
                  <div className="bg-primary/10 w-16 h-16 blur-xl" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── DIVISIONS BENTO ─── */}
      <section className="py-[60px] md:py-[120px] px-6 md:px-16 relative overflow-hidden">
        <motion.div
          className="max-w-[1280px] mx-auto mb-12 md:mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary mb-4 block uppercase tracking-[0.3em]" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
            The Ecosystem
          </span>
          <h2 className="text-on-surface animate-pulse-subtle" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.02em" }}>
            <AlternatingText text="Operational Excellence Across Divisions" />
          </h2>
        </motion.div>

        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {divisions.map((div, i) => (
            <motion.div
              key={div.title}
              className={`${div.colSpan} relative group overflow-hidden glass-card p-1`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.005 }}
            >
              <div className={`relative ${div.height.replace('h-', 'h-[350px] md:h-')} overflow-hidden`}>
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={div.img}
                  alt={div.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-10">
                  <h3 className="text-on-surface mb-2 text-[28px] md:text-[32px] font-medium" style={{ fontFamily: "Outfit, sans-serif" }}>
                    {div.title}
                  </h3>
                  <p className="text-on-surface-variant max-w-md" style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px" }}>
                    {div.description}
                  </p>
                  <Link
                    href={div.href}
                    className="mt-6 flex items-center gap-2 text-[#cbc5b9] font-bold uppercase tracking-widest hover:text-white transition-colors"
                    style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}
                  >
                    {div.cta} <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
