"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import AlternatingText from "@/components/AlternatingText";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const operationCards = [
  {
    colSpan: "md:col-span-2",
    icon: "sailing",
    title: "Export Logistics & Optimization",
    desc: "Strategic orchestration of outbound trade flows, leveraging deep-water port access and proprietary routing algorithms to minimize latency and ensure delivery precision.",
    stats: [
      { value: "48hr", label: "Customs Clearance" },
      { value: "128+", label: "Strategic Ports" },
    ],
  },
  {
    colSpan: "md:col-span-1",
    icon: "verified_user",
    title: "Customs & Documentation",
    desc: "Automated regulatory filing with Tier-1 compliance protocols for high-stakes shipments.",
    link: "View Protocols",
  },
  {
    colSpan: "md:col-span-1",
    icon: "source",
    title: "Product Sourcing",
    desc: "Direct access to primary manufacturer networks and vetted supply chains.",
  },
  {
    colSpan: "md:col-span-1",
    icon: "handshake",
    title: "Trade Consultation",
    desc: "Expert structural advisory for complex multi-jurisdictional trade ventures.",
  },
  {
    colSpan: "md:col-span-1",
    icon: "hub",
    title: "Supplier Network",
    desc: "Real-time verification of global production capacities and quality controls.",
  },
];

const regions = [
  { label: "Asia Pacific", sub: "Manufacturing Hubs" },
  { label: "European Union", sub: "Quality Standards" },
  { label: "Americas", sub: "Consumer Markets" },
  { label: "Middle East", sub: "Strategic Transit" },
];

export default function TradePage() {
  const { getContent } = useContent();

  const portfolio = [
    {
      category: "Category 01",
      title: getContent("trade.portfolio.0.title", "Heavy Industrial Components"),
      desc: getContent("trade.portfolio.0.description", "Global supply of tier-1 heavy machinery and industrial automation hardware."),
      img: getContent("trade.portfolio.0.img", "/images/core 1.png"),
    },
    {
      category: "Category 02",
      title: getContent("trade.portfolio.1.title", "Raw Commodity Assets"),
      desc: getContent("trade.portfolio.1.description", "Strategic sourcing of essential industrial raw materials and base metals."),
      img: getContent("trade.portfolio.1.img", "/images/core 2.png"),
    },
    {
      category: "Category 03",
      title: getContent("trade.portfolio.2.title", "Specialized Electronics"),
      desc: getContent("trade.portfolio.2.description", "Precision procurement of aerospace-grade components and micro-electronics."),
      img: getContent("trade.portfolio.2.img", "/images/core 3.png"),
    },
    {
      category: "Category 04",
      title: getContent("trade.portfolio.3.title", "Sustainable Infrastructure"),
      desc: getContent("trade.portfolio.3.description", "Exporting advanced green energy technology and sustainable system components."),
      img: getContent("trade.portfolio.3.img", "/images/core 4.png"),
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative h-[90vh] min-h-[500px] md:min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-60"
            src={getContent("trade.hero.img", "/images/brochure_page7_img1.jpeg")}
            alt="Futuristic shipping terminal at dusk"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 glow-spotlight" />
        </div>

        <motion.div
          className="relative z-10 px-6 md:px-16 max-w-[1280px] mx-auto w-full pt-20 md:pt-0"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-3xl text-center md:text-left">
            <motion.div variants={fadeInUp} className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1 mb-6 uppercase tracking-widest text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>
              {getContent("trade.hero.subtitle", "Commodity Trading & Supply Chain Architecture")}
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-white mb-6 md:mb-8 uppercase"
              style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(40px, 8vw, 72px)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
            >
              <AlternatingText
                text={getContent("trade.hero.title", "GLOBAL TRADE INTELLIGENCE")}
                highlightIndices={[2]}
              />
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-on-surface-variant mb-10 max-w-xl mx-auto md:mx-0 text-base md:text-[18px]" style={{ fontFamily: "Manrope, sans-serif", lineHeight: 1.6 }}>
              {getContent("trade.hero.description", "We govern primary networks and trade lines across global markets. From origin validation to secure custom routing, Merkanto guarantees absolute execution reliability.")}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <Link href="/contact" className="w-full md:w-auto bg-primary text-background px-8 py-4 font-bold uppercase tracking-widest hover:opacity-90 transition-all text-center" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
                Establish Trade Node
              </Link>
              <Link href="/contact" className="w-full md:w-auto border border-outline text-on-surface px-8 py-4 font-medium uppercase tracking-widest hover:bg-white/5 transition-all text-center" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
                Institutional Profile
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── OPERATIONS BENTO ─── */}
      <section className="py-[60px] md:py-[120px] px-6 md:px-16 max-w-[1280px] mx-auto">
        <motion.div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeInUp} className="text-center md:text-left">
            <h2 className="text-white mb-4 animate-pulse-subtle" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.02em" }}>
              <AlternatingText text="Operations & Compliance" />
            </h2>
            <p className="text-on-surface-variant max-w-md mx-auto md:mx-0" style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px" }}>
              Our operational framework ensures seamless cross-border movement with absolute regulatory integrity.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="hidden md:block text-primary uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
            01 / Operational Core
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {operationCards.map((card, i) => (
            <motion.div
              key={card.title}
              className={`${card.colSpan} glass-card p-8 md:p-12 group`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="material-symbols-outlined text-primary mb-8 block group-hover:scale-110 transition-transform" style={{ fontSize: "40px" }}>
                {card.icon}
              </span>
              <h3 className="text-white mb-4" style={{ fontFamily: "Outfit, sans-serif", fontSize: "28px" }}>
                {card.title}
              </h3>
              <p className="text-on-surface-variant mb-6" style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px" }}>
                {card.desc}
              </p>
              {card.stats && (
                <div className="flex gap-6 md:gap-8">
                  {card.stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-primary font-bold text-2xl md:text-[28px]" style={{ fontFamily: "Outfit, sans-serif" }}>{s.value}</div>
                      <div className="text-on-surface-variant uppercase text-[10px] md:text-[11px]" style={{ fontFamily: "Geist, monospace" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
              {card.link && (
                <a href="/contact" className="flex items-center gap-2 text-primary uppercase tracking-widest mt-4" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
                  {card.link} <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── GLOBAL MAP ─── */}
      <section className="bg-surface-container-low py-[60px] md:py-[120px] relative overflow-hidden">
        <div className="px-6 md:px-16 max-w-[1280px] mx-auto relative z-10">
          <motion.div className="text-center mb-12 md:mb-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-white mb-6 animate-pulse-subtle" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.02em" }}>
              <AlternatingText text="GLOBAL NODE REACH" />
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12 text-on-surface-variant uppercase tracking-[0.2em] text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>
              <span>6 Continents</span>
              <span className="hidden md:block text-primary">•</span>
              <span>42 Nations</span>
              <span className="hidden md:block text-primary">•</span>
              <span>1,200+ Logistics Hubs</span>
            </div>
          </motion.div>

          <motion.div
            className="relative glass-card w-full overflow-hidden border-primary/20"
            style={{ aspectRatio: "21/9" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              className="w-full h-full object-cover opacity-80"
              src="/images/world_map_vector.png"
              alt="Global trade map"
            />
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-background/50 pointer-events-none" />

            {/* Orbit circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[80%] aspect-square border-primary/20 border-dashed border rounded-full absolute scale-[0.8] opacity-10 animate-[spin_60s_linear_infinite]" />
              <div className="w-[120%] aspect-square border-primary/10 border-dashed border rounded-full absolute scale-[0.6] opacity-10 animate-[spin_90s_linear_infinite_reverse]" />
            </div>

            {/* SVG Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <motion.line 
                x1="45%" y1="30%" x2="65%" y2="25%" 
                stroke="#46e176" strokeWidth="1.5" strokeDasharray="6 6" className="opacity-50"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.line 
                x1="45%" y1="30%" x2="20%" y2="40%" 
                stroke="#46e176" strokeWidth="1.5" strokeDasharray="6 6" className="opacity-50"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.line 
                x1="45%" y1="30%" x2="52%" y2="60%" 
                stroke="#46e176" strokeWidth="1.5" strokeDasharray="6 6" className="opacity-50"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
              />
            </svg>

            {/* Hub Pins */}
            <div className="absolute top-[30%] left-[45%] group cursor-pointer z-20">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-[0_0_20px_#46e176]" />
              <div className="absolute top-6 left-1/2 -translate-x-1/2 glass-card px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-white font-bold tracking-widest text-[10px]" style={{ fontFamily: "Geist, monospace" }}>EMEA CENTRAL</span>
              </div>
            </div>
            
            <div className="absolute top-[25%] left-[65%] group cursor-pointer z-20">
              <div className="w-3 h-3 bg-primary/80 rounded-full shadow-[0_0_15px_#46e176]" />
              <div className="absolute top-6 left-1/2 -translate-x-1/2 glass-card px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-white font-bold tracking-widest text-[10px]" style={{ fontFamily: "Geist, monospace" }}>APAC HUB</span>
              </div>
            </div>

            <div className="absolute top-[40%] left-[20%] group cursor-pointer z-20">
              <div className="w-3 h-3 bg-primary/80 rounded-full shadow-[0_0_15px_#46e176]" />
              <div className="absolute top-6 left-1/2 -translate-x-1/2 glass-card px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-white font-bold tracking-widest text-[10px]" style={{ fontFamily: "Geist, monospace" }}>AMERICAS NODE</span>
              </div>
            </div>

            <div className="absolute top-[60%] left-[52%] group cursor-pointer z-20">
              <div className="w-2 h-2 bg-primary/60 rounded-full shadow-[0_0_10px_#46e176]" />
              <div className="absolute top-6 left-1/2 -translate-x-1/2 glass-card px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-white font-bold tracking-widest text-[10px]" style={{ fontFamily: "Geist, monospace" }}>AFRICA TRANSIT</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 mt-12 md:mt-16">
            {regions.map((r) => (
              <motion.div
                key={r.label}
                className="p-6 border-l border-primary/30 text-center md:text-left"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-white mb-1 text-xl md:text-2xl font-medium" style={{ fontFamily: "Outfit, sans-serif" }}>{r.label}</div>
                <div className="text-on-surface-variant text-sm md:text-base" style={{ fontFamily: "Manrope, sans-serif" }}>{r.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CORE PORTFOLIO ─── */}
      <section className="py-[60px] md:py-[120px]">
        <div className="px-6 md:px-16 max-w-[1280px] mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h2 className="text-white animate-pulse-subtle" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.02em" }}>
            <AlternatingText text="CORE PORTFOLIO" />
          </h2>
          <div className="hidden md:flex gap-4">
            {["chevron_left", "chevron_right"].map((icon) => (
              <button key={icon} className="w-12 h-12 border border-outline rounded-full flex items-center justify-center text-white hover:border-primary transition-all">
                <span className="material-symbols-outlined">{icon}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-6 overflow-x-auto px-6 md:px-16 pb-8 custom-scrollbar">
          {portfolio.map((item, i) => (
            <motion.div
              key={item.title}
              className="flex-none w-[300px] md:w-[380px] glass-card group cursor-pointer overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="h-48 md:h-64 overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={item.img} alt={item.title} />
              </div>
              <div className="p-6 md:p-8">
                <div className="text-primary mb-2 uppercase tracking-widest text-[10px] md:text-[11px]" style={{ fontFamily: "Geist, monospace" }}>{item.category}</div>
                <h3 className="text-white mb-4 text-2xl md:text-[28px] font-medium" style={{ fontFamily: "Outfit, sans-serif" }}>{item.title}</h3>
                <p className="text-on-surface-variant text-sm md:text-base" style={{ fontFamily: "Manrope, sans-serif" }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
