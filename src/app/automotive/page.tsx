"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import AlternatingText from "@/components/AlternatingText";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AutomotivePage() {
  const { getContent } = useContent();

  return (
    <div className="bg-background min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative h-[90vh] min-h-[500px] md:min-h-[700px] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-60"
            src={getContent("automotive.hero.img", "https://lh3.googleusercontent.com/aida-public/AB6AXuAohpsVZiOi2oxIp0hMFAGZ8u0nfYCZW38e2YoSFLNfdN6Xxpe44A-EMMxQLHdo67R7njV7jweqhHFT8trKp_HjdmZSDrwOvk_2wBPPVYlkiDSybZWMkiXYRKwIYj75eNpky7KOOpRenXNhjyHW2UYUmf6SxLlTB5Ub7o6kwo6RByFsoX1fvxzPiCnrSCR21M3LF4QPwwanIaVGYfzFC2QlrN9P_m82XzzjH5qnCL38kEYBBUmFWmMbGpmuPLi-Gb9TOg9Z_8M9Q28")}
            alt="Luxury supercar in minimalist concrete space"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <motion.div
          className="relative z-10 text-center px-6 md:px-0 pt-20 md:pt-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-3 py-1 mb-6 bg-primary/10 border border-primary/20 text-primary uppercase tracking-widest text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>
            {getContent("automotive.hero.badge", "Precision Craftsmanship")}
          </div>
          <h1 className="mb-6 max-w-4xl mx-auto uppercase tracking-tighter" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(32px, 8vw, 72px)", letterSpacing: "-0.03em", lineHeight: 1.0 }}>
            <AlternatingText
              text={getContent("automotive.hero.title", "The Art of Automotive Excellence")}
              highlightIndices={[3, 4]}
            />
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-10 text-base md:text-[18px]" style={{ fontFamily: "Manrope, sans-serif", lineHeight: 1.6 }}>
            {getContent("automotive.hero.description", "Bespoke interior reimagining, imported technical enhancements, and cinematic detailing for the discerning collector.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="w-full sm:w-auto bg-primary text-on-primary px-10 py-4 uppercase tracking-widest hover:brightness-110 transition-all text-center flex items-center justify-center animate-pulse" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
              Request Consultation
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── CURATED VERTICALS ─── */}
      <section className="py-[60px] md:py-[120px] px-6 md:px-16 max-w-[1280px] mx-auto">
        <motion.div className="mb-12 md:mb-16 text-center md:text-left" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="mb-4 animate-pulse-subtle" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.02em" }}>
            <AlternatingText text="Curated Verticals" />
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto md:mx-0" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Interior — large */}
          <motion.div
            className="md:col-span-8 group relative overflow-hidden glass-card h-[450px] md:h-[550px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
              src={getContent("automotive.vertical.1.img", "https://lh3.googleusercontent.com/aida-public/AB6AXuBOIqCYZaBFcIE9TgESEzShp1zX48vblh9igtli4YaBIyPyHJfGg8_YkDDvXvWR2RRyHmXnW44tL0mgk2BnDx4-x9ywHjTj-e06txKFFOblbKuluhZfe9C66eX306JfxYKAA9obGP5km90BMenA5fdR8TWPuOXGaL_fFmvBCdOA6P11WEUCbVDAZoESaF4Rmw8bYMrV-PYHYcfn0fYXDkK6xtAzByIU5VXGAfg0o-6a-7W_eHTrZWqsVKKM82eTq8LRUBt9kQicChQ")}
              alt="Luxury automotive interior"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-md">
              <span className="text-primary uppercase tracking-widest mb-4 block text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>Bespoke Design</span>
              <h3 className="mb-4 uppercase text-2xl md:text-[28px] font-medium" style={{ fontFamily: "Outfit, sans-serif" }}>
                {getContent("automotive.vertical.1.title", "Interior Reimagining")}
              </h3>
              <p className="text-on-surface-variant mb-6 text-sm md:text-base" style={{ fontFamily: "Manrope, sans-serif" }}>
                {getContent("automotive.vertical.1.description", "Complete cabin redesign using full-grain leathers, custom carbon structures, and tailored stitching.")}
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-primary uppercase tracking-widest hover:gap-4 transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
                View Details <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
              </Link>
            </div>
          </motion.div>

          {/* Technical Enhancements */}
          <motion.div
            className="md:col-span-4 group relative overflow-hidden glass-card h-[350px] md:h-[550px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              src={getContent("automotive.vertical.2.img", "https://lh3.googleusercontent.com/aida-public/AB6AXuB2H6v_0VnB5eY20gR3Kk-1Ym_5qF8pI_R2w08S6s1h9K9Xy3x5tV-fG_n4K3yD5M3f-K_N3Rj9sJj3v6x-K_M3Rj9sJj3v6x-K_M3Rj9sJj3v6x-K_M3")}
              alt="Automotive tuning"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="text-primary uppercase tracking-widest mb-2 block text-[10px]" style={{ fontFamily: "Geist, monospace" }}>Tuning Node</span>
              <h3 className="mb-2 uppercase text-xl md:text-2xl" style={{ fontFamily: "Outfit, sans-serif" }}>
                {getContent("automotive.vertical.2.title", "Technical Enhancements")}
              </h3>
              <p className="text-on-surface-variant text-sm" style={{ fontFamily: "Manrope, sans-serif" }}>
                {getContent("automotive.vertical.2.description", "Importing and engineering elite exhaust systems, forged wheels, and wind-tunnel tested aero packages.")}
              </p>
            </div>
          </motion.div>

          {/* Lower row - Typographic Design */}
          {[
            { title: "Forged Dynamics", subtitle: "AEROSPACE GRADE ALLOY", pattern: "bg-[radial-gradient(#46e176_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" },
            { title: "Lumina Signature", subtitle: "ADVANCED OPTICS", pattern: "bg-[linear-gradient(45deg,#46e176_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03]" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="md:col-span-4 group relative overflow-hidden glass-card h-[350px] flex flex-col justify-end p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
            >
              <div className={`absolute inset-0 ${item.pattern} transition-opacity duration-700 group-hover:opacity-[0.1]`} />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 via-transparent to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none w-full overflow-hidden">
                <div className="text-[80px] md:text-[100px] font-bold text-white/[0.02] uppercase tracking-[0.1em] leading-none whitespace-nowrap select-none" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {item.title} {item.title}
                </div>
              </div>
              <div className="relative z-10 flex flex-col gap-1">
                <div className="text-primary text-[10px] uppercase tracking-widest opacity-80" style={{ fontFamily: "Geist, monospace" }}>
                  {item.subtitle}
                </div>
                <h3 className="font-bold text-white uppercase tracking-[0.2em]" style={{ fontFamily: "Geist, monospace", fontSize: "14px" }}>
                  {item.title}
                </h3>
                <div className="w-8 h-[1px] bg-primary/40 mt-4 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
              </div>
            </motion.div>
          ))}

          {/* Bespoke Aesthetics - large */}
          <motion.div
            className="md:col-span-4 group relative overflow-hidden glass-card h-[300px] md:h-[350px] flex flex-col justify-end p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
              src={getContent("automotive.vertical.3.img", "https://lh3.googleusercontent.com/aida-public/AB6AXuCtnDF-l73h9Cel1bjYarVIigBQRmBD2LPqxRwbUrgJFKyNIkmx3BgLQ-tRhyD6neXeWhxJSHfCWoa-Kh2uQ0cnx2FBGoE7MCyLWB7KVCZW5qXQ9kx86UyWkLhVPFVJ1afGoO4Qd_f3EozS-EKxU7N6fPukiuahtsHz9Mr5dSUhG4vlwmxqCobEfywpmSjjYntXnU7ilQoBI25sBVIxaDefd74YKAnX1uRvCgJiBSEyVe47_a7WddeGnQqN8H0EBTRQ6CHdEX0mMX8")}
              alt="Bespoke Styling Details"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
            <div className="relative z-10 flex flex-col gap-1">
              <span className="text-primary uppercase tracking-widest text-[10px]" style={{ fontFamily: "Geist, monospace" }}>Exquisite Finish</span>
              <h3 className="mb-2 uppercase text-xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>
                {getContent("automotive.vertical.3.title", "Bespoke Aesthetics")}
              </h3>
              <p className="text-on-surface-variant text-sm" style={{ fontFamily: "Manrope, sans-serif" }}>
                {getContent("automotive.vertical.3.description", "Self-healing paint protection films, proprietary ceramic seals, and absolute detailing perfection.")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── QUALITY COMMITMENT ─── */}
      <section className="py-[60px] md:py-[120px] border-t border-outline-variant/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-20">
          <motion.div className="relative" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <img
              className="w-full object-cover"
              style={{ aspectRatio: "4/5" }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz0Jaro-qakB2FiqxMyi0CF0oeg3ntaQ-9AnH0ZBbBHwo01ln16xhk8uHbouOahXZImMO4p-rYPile1hRi8pnoWHKiYs8R4cRLxgPP1Gxcv9mBuzCvx1zty16Zyni40SqrcvQlt2Kt0KNz8ouma63VCnRd_DIN3dnxgidyueDqquahNs3QBcrRgfDorAaCFIXwK0lAgnXkGBBh9fIYGIB0hrtIDjA5hYOLzUK1HMaqbX67X-ymwLxmVxfXNIVNjoc9JDuxP9O8pM4"
              alt="Technician working on engine"
            />
            <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-32 h-32 md:w-44 md:h-44 bg-primary/20 backdrop-blur-2xl p-4 md:p-6 flex flex-col justify-end">
              <span className="text-primary font-bold leading-none mb-1 md:mb-0 text-[28px] md:text-[36px]" style={{ fontFamily: "Outfit, sans-serif" }}>12+</span>
              <span className="uppercase tracking-widest leading-tight text-[9px] md:text-[11px]" style={{ fontFamily: "Geist, monospace" }}>Years of Global Sourcing</span>
            </div>
          </motion.div>

          <motion.div className="text-center md:text-left" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="text-primary uppercase tracking-widest block mb-6 text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>Uncompromising Quality</span>
            <h2 className="mb-8 uppercase tracking-tight font-black" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(28px, 4vw, 48px)" }}>
              <AlternatingText text="Technical Precision for the Global Elite" />
            </h2>
            <p className="text-on-surface-variant mb-10 text-sm md:text-lg" style={{ fontFamily: "Manrope, sans-serif", lineHeight: 1.6 }}>
              At MERKANTO, we don't just modify vehicles; we curate experiences. Our global trade network grants us exclusive access to materials unavailable to the mainstream market.
            </p>
            <div className="space-y-6 text-left">
              {[
                { icon: "verified", title: "Authentic Sourcing", desc: "Every accessory is tracked from manufacturer to installation." },
                { icon: "precision_manufacturing", title: "Master Craftsmanship", desc: "Installed by elite technicians with decades of heritage expertise." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start max-w-[400px] mx-auto md:mx-0">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1", fontSize: "20px" }}>{item.icon}</span>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest mb-1 text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>{item.title}</h4>
                    <p className="text-on-surface-variant text-sm md:text-base" style={{ fontFamily: "Manrope, sans-serif" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
