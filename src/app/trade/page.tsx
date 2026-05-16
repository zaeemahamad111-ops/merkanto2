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

const portfolio = [
  {
    category: "Category 01",
    title: "Heavy Industrial Components",
    desc: "Global supply of tier-1 heavy machinery and industrial automation hardware.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBU5JmztIoquFrxec7PAmnB3s0QGw3UlFe2Tzqnela6kWqfv1CKG6Ux__MjKfwwYqabiHDZD0ZjhBfJPeWvBJxu1yqkC5f_Ga3TxX0Psz30EshLFbqYNIjuqS3W_dU1mBx2KUJmx2Ji2bw_i79rYr3laGKmCn5i6qDPCFD5S470XqjiXuJnHygjLmy88uePKNVJzuJ9kOW9mb8XPAh2Vn-bq30Ybc0hi_fZMOx2DsBwCAIZLHeu1bWK5lE5RVmzgMnZlvRA-mrGi4o",
  },
  {
    category: "Category 02",
    title: "Raw Commodity Assets",
    desc: "Strategic sourcing of essential industrial raw materials and base metals.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAthzySRoiujyrhe58zhofYwrkSyQ0AyKew2hI4aOgGkl6iu_heDmYX-jyqRbBq9ff-2L_qbsXEHkyEW2wa46cF7aPCAH3F4iqmFL4CJCW53zahkdvZiN-v01euMFdQuq1nJ5kK29eLbdk6gQL5L2RPjpFNrg-2Wj6vjMYaR7bLcQYohb1aFVAcv1r4tCUpADCasMBTvbaYWjn-oFaw2bl8J-TdCUUbhDDJyUYYQcCwvKKbFo8t4jpSsvpPb49BD5sLKobQjQPW0Zc",
  },
  {
    category: "Category 03",
    title: "Specialized Electronics",
    desc: "Precision procurement of aerospace-grade components and micro-electronics.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbYL4qMuWFUUXx8opuZqc8sYW1LoY_5YvQlQ-AtPzkfIu7SnEGkTWSgLy_jRe0FRnDK5T_i7rXz185BcgwT0R_GlDG_4ngg6IgY6sAFPct8qL5hfjohFvKgflUoRujpE30u1LXR0qxMegdOzmb1B13BjFN_g9lo_gCAYAUXXC3kKoVloOjJDBeZieoqqp8eFKK12A-1_2mgl_9NvlgTmKkwrJHaBQNtbGiovvkmI-auC5-CccdqCdt7_TaeSc3P01KuYzsob-4VEw",
  },
  {
    category: "Category 04",
    title: "Sustainable Infrastructure",
    desc: "Exporting advanced green energy technology and sustainable system components.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkX91DQCPp1-8WZCWRANXHUt1FJzPeoUWxzYmefCRuPIvjVvFjNA7QPkTnZz54K0kMrXCctDTznJo929H6JuoUvz_4aJIt9o2cGBPfqjR2ria6sfCW7u9rbFdG9QP5GlezvzO2PZTwWL53dUf7KVALZHfPsO7uRgL-QJZLrPSUpbaq-OUxyKI4LWhv_K32d_RTxES0vVYzJAUxo5S3raPlU0QTAuaVT0-Gu4Yl3LtUjBCgJUGUzoqNI-ET_9tDiLkxabs_dhmzoi0",
  },
];

export default function TradePage() {
  return (
    <div className="bg-background min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative h-[90vh] min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-60"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIS_XXZEdyc4X_TjQ0j2jFwwhbN2IBRWXTed_znHlmdrsvzjIiyretvhJ1qlntdwbjH_fAsMW-Kex6I3_wXNqxLetnBrptc7iyo5xHN10JGNpZ1PqS_M0LOHlUD4ov2ny-u_h8B8cz1Cg1ozlHBJ3l8k7TSKDzKt7aJS3milJqhUDgHrQ9R0pGQqfOTSZABWDOXdEeufsC1plzMGddT1BLrJPND-T1jIV05TKegE2yM6rrbb0lhPmk8AbxOCkUgpYJ01abfCOO-mk"
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
              Architectural Global Precision
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-white mb-6 md:mb-8"
              style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(40px, 8vw, 72px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.0 }}
            >
              GLOBAL TRADE <br /><span className="text-primary">INTELLIGENCE</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-on-surface-variant mb-10 max-w-xl mx-auto md:mx-0 text-base md:text-[18px]" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
              Facilitating elite-scale import and export operations through a secure, premium ecosystem designed for the world's most sophisticated trading partners.
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
            <h2 className="text-white mb-4" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Operations & Compliance
            </h2>
            <p className="text-on-surface-variant max-w-md mx-auto md:mx-0" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px" }}>
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
              <h3 className="text-white mb-4" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "28px", fontWeight: 500 }}>
                {card.title}
              </h3>
              <p className="text-on-surface-variant mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px" }}>
                {card.desc}
              </p>
              {card.stats && (
               <div className="flex gap-6 md:gap-8">
                  {card.stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-primary font-bold text-2xl md:text-[28px]" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>{s.value}</div>
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
            <h2 className="text-white mb-6" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
              GLOBAL NODE REACH
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
            className="relative glass-card w-full overflow-hidden"
            style={{ aspectRatio: "21/9" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              className="w-full h-full object-cover opacity-20 grayscale invert"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw1438A-DcvYoumLLBxNzbWXWJdwBP85jDh0CnRrRz_jeZeKu3Ru_ZdH0gkOnFw7qp4oLcNAIBWntzVsXsU4P_t_c0djv3WKiJ30n3Yk35xU8spJJjRAA6cCZ1Yy9mMfjmEqBGmyPqElsMG2NdXcnTwYQ2AQbKBiogr7e8lf0-w-bvPYsPa3MpU1Xao_Qavr7M85JTggp3fsbRbuzHALJCxI-BfPLcQqj0pR8faMz28fULUBPffGfDHUTEgnziYS0h2xpOevkOv0g"
              alt="Global trade map"
            />
            {/* Orbit circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full border-primary/20 border-dashed border-2 rounded-full absolute scale-[0.8] opacity-10" />
              <div className="w-full h-full border-primary/10 border-dashed border-2 rounded-full absolute scale-[0.6] opacity-10" />
            </div>
            {/* Hub Pin */}
            <div className="absolute top-[30%] left-[45%] group cursor-pointer">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_15px_#46e176]" />
              <div className="absolute top-6 left-1/2 -translate-x-1/2 glass-card px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white uppercase" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>EMEA CENTRAL</span>
              </div>
            </div>
            <div className="absolute top-[25%] left-[65%] group cursor-pointer">
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
            </div>
            <div className="absolute top-[40%] left-[20%] group cursor-pointer">
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
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
                <div className="text-white mb-1 text-xl md:text-2xl font-medium" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>{r.label}</div>
                <div className="text-on-surface-variant text-sm md:text-base" style={{ fontFamily: "Inter, sans-serif" }}>{r.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CORE PORTFOLIO ─── */}
      <section className="py-[60px] md:py-[120px]">
        <div className="px-6 md:px-16 max-w-[1280px] mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h2 className="text-white" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
            CORE PORTFOLIO
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
                <h3 className="text-white mb-4 text-2xl md:text-[28px] font-medium" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>{item.title}</h3>
                <p className="text-on-surface-variant text-sm md:text-base" style={{ fontFamily: "Inter, sans-serif" }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── PARTNERSHIP CTA ─── */}
      <section className="py-[60px] md:py-[120px] px-6 md:px-16 max-w-[1280px] mx-auto border-t border-outline-variant/20">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <motion.div className="flex-1 text-center md:text-left" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-white mb-6" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
              STRATEGIC PARTNERSHIP PROTOCOL
            </h2>
            <p className="text-on-surface-variant mb-10 text-base md:text-[18px]" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
              Join an elite network of global trade entities. We offer bespoke partnership frameworks designed for institutional investors, manufacturing giants, and sovereign logistics providers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-6 text-left">
              {[
                { title: "Shared Intelligence", desc: "Real-time market volatility data." },
                { title: "Preferred Routing", desc: "Priority logistics lane access." },
                { title: "Joint Compliance", desc: "Unified regulatory clearance systems." },
                { title: "Revenue Sharing", desc: "Transparent co-investment models." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 mx-auto md:mx-0 max-w-[280px] md:max-w-none">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1", fontSize: "20px" }}>check_circle</span>
                  <div>
                    <div className="text-white uppercase mb-1 text-[11px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>{item.title}</div>
                    <div className="text-on-surface-variant text-sm md:text-base" style={{ fontFamily: "Inter, sans-serif" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-[420px] glass-card p-8 md:p-10 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16" />
            <h3 className="text-white mb-8 text-2xl md:text-[28px] font-medium" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>INITIATE INQUIRY</h3>
            <form className="space-y-6">
              {[
                { label: "Organization Name", type: "text" },
                { label: "Contact Email", type: "email" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-on-surface-variant uppercase tracking-widest mb-2 block text-[10px] md:text-[11px]" style={{ fontFamily: "Geist, monospace" }}>
                    {field.label}
                  </label>
                  <input className="w-full bg-transparent border-b border-outline focus:border-primary focus:ring-0 transition-all text-white py-2 px-0 outline-none" type={field.type} />
                </div>
              ))}
              <div>
                <label className="text-on-surface-variant uppercase tracking-widest mb-2 block text-[10px] md:text-[11px]" style={{ fontFamily: "Geist, monospace" }}>
                  Strategic Interest
                </label>
                <select className="w-full bg-transparent border-b border-outline focus:border-primary focus:ring-0 transition-all text-white py-2 px-0 outline-none appearance-none">
                  <option className="bg-surface">Supply Chain Partnership</option>
                  <option className="bg-surface">Institutional Trade</option>
                  <option className="bg-surface">Academy Accreditation</option>
                </select>
              </div>
              <button className="w-full bg-primary text-background font-bold uppercase tracking-widest py-4 mt-6 hover:opacity-90 transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
                Submit Professional Brief
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
