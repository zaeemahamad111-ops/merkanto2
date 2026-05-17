"use client";

import { motion } from "framer-motion";

const styleItems = [
  {
    title: "Floral Sculpture",
    desc: "Avant-garde botanical installations that challenge traditional aesthetics.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk3U5I-1BEfplqXU9HJ3CSTVc2ANf2oQ6O7Ku13jg-X48LAZ7ndr2e1Vwy1dSeCfaq_qTeUlIvVlLJtFAsUHFYrjh5jeqFh6CmiULDmTOyJ5GppFMpdr1GM37RQqL50GSWQgX-O_89iai3WktKs6BYoTyYbof_TqoR0GthjNemAshtOc7k6qLmT7P0WuM6tVlmfRCEQMC9AX97TsMs9061rID41qaZVlPRdo_yk4_BSof82UU63tWIOVNp5Svyc_U1uBDp6r7OtGQ",
    offset: false,
  },
  {
    title: "Light Engineering",
    desc: "Synchronized lightscapes and projection mapping for deep immersion.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCD-GnVnN2RqNE6G10Dw-0WdC0m_ToGLT34qtddhW2IqjzZkyyUL476t88wqMhlsdd4EwRWpJo003rtdV02zfHJdTYi24YnHWBQG6s3Z1zOYXtPqEkTX7UIASrWbvEksWOmBRY0C1tp-h16aGk4fTbHH2Yw0aRuSs7ulhUV7Zf0KZ2UAQNQ8iUN7jIevqzxZdH2ACzDMNuqdK6iWdiew60zVImAR2Q2QXWQY0aXd1lFdjl0sKQo0FoM5EtDwk4vUi5OdRWGvQlMuvw",
    offset: true,
  },
  {
    title: "Sensory Scapes",
    desc: "Curating every touchpoint, from custom fragrance to tactile stationery.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2iM37OCVKU57vX2p4ZtvCcup4LfBNkpB_zIb31IUTHWZ0LiyJOxsDnOF32A5PC_3SY7_eX6dJ5cMwP9WUz7grXFkq0GvKl97EiGtBll0OW2YD9TO8b1AWijnS38OFIGpYn4NABCjAbDMzaB7ixQ1-UKShQewGu9LAi5LALkTaU8l9Ti5cv5vz1vLeA23Q8aTmEWjI1DBmc-secflZJOY4QC1lEIp8F5E4M-awOkjaO7ufW9uw0lWPSYD3EKt71Av2dnU_9SEkDAc",
    offset: false,
  },
  {
    title: "Sonic Architecture",
    desc: "Bespoke soundscapes and world-class artist management.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuByo01XzKysPoQPaHr6jkVpnlbuBhGtIB4bCCIirRiiC9mOqtMD4NVO5CWjGFhkic1E3GoU7MP6kLXfrkGVLLLmgIAIzW2jbIpdrJR1dJnPZGkqHiWX8qSbNJGv8LpRKbENb49f8WR2_lVhXSo3KG2Wfkg0aklEhM501dU5lPlmYQFzvoBqSt5zMgN7oW1MQzNZjiK1n85xzYkAZd10jN_7hW6BQahc91NZHHUssDNaCzoyK5o7wHV8n9w02u7TQXVXgunzVZkdtn4",
    offset: true,
  },
];

const destSteps = [
  {
    num: "01",
    title: "Global Site Sourcing",
    desc: "Exclusive access to private islands, historical palazzos, and high-altitude sanctuaries across 6 continents.",
  },
  {
    num: "02",
    title: "Logistical Sovereignty",
    desc: "Complete management of international charters, customs, and private security for high-profile gatherings.",
  },
  {
    num: "03",
    title: "Cultural Synthesis",
    desc: "Designing experiences that respect and elevate local traditions through a lens of modern luxury.",
  },
];

export default function EventsPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhCBAspxLpcY-L34jzrzboKs9iwXjEM7wX-gyUgBDNmWukIef8XuWA74-sV3eK17-V3B0VaS-xk8I53JGqMa3NOkWer9cLhbpse9l4fFGjy32VRFKfv-_s0kwCNQVW0X9X_pjx1OaA8zAfpZMDwozHU068ij_kfCDT5fnL5HBOHcC7a_8G9QOjWiTg7jBHWdohxvU5GF9JiACbOjzNkhwAOU-qnlmzVK1sRWb0z9hdFnRsK9ZiiXVCbn_Bp8hTA4tww9xe9sd8K5E"
            alt="Grand gala dinner in modern architectural space"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
          <div className="absolute inset-0 glow-spotlight" />
        </div>

        <motion.div
          className="relative z-10 text-center max-w-4xl px-6 pt-20 md:pt-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <span className="text-primary mb-6 block uppercase tracking-[0.4em] text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>
            Merkanto Studios Presents
          </span>
          <h1 className="text-on-surface mb-8" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(36px, 8vw, 72px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Couture Celebrations. <br />Global Precision.
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-10 text-base md:text-[18px]" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
            Architectural event design for the world's most discerning visionaries. From high-stakes institutional galas to intimate destination unions.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
            <button className="w-full md:w-auto bg-primary text-on-primary px-10 py-4 font-bold uppercase tracking-widest active:scale-95 transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
              Inquire Now
            </button>
            <button className="w-full md:w-auto border border-outline text-on-surface px-10 py-4 uppercase tracking-widest hover:bg-white/5 transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
              View Portfolio
            </button>
          </div>
        </motion.div>
      </section>

      {/* ─── LUXURY WEDDINGS ─── */}
      <section className="py-[60px] md:py-[120px] px-6 md:px-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
          <motion.div
            className="md:col-span-5 text-center md:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary uppercase tracking-widest mb-4 block text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>
              01 / Curated Unions
            </span>
            <h2 className="mb-6" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Luxury Weddings
            </h2>
            <p className="text-on-surface-variant mb-8 leading-relaxed text-sm md:text-base" style={{ fontFamily: "Inter, sans-serif" }}>
              We transform matrimonial ceremonies into immersive cinematic experiences. Every detail is meticulously engineered to reflect the unique legacy of the union, blending heritage aesthetics with avant-garde structural design.
            </p>
            <ul className="space-y-4 mb-10 text-left">
              {["Bespoke Architectural Altars", "Global Concierge for High-Net-Worth Guests", "Michelin-Level Culinary Choreography"].map((item) => (
                <li key={item} className="flex items-center gap-4 text-on-surface">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: "20px", fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-sm md:text-base" style={{ fontFamily: "Inter, sans-serif" }}>{item}</span>
                </li>
              ))}
            </ul>
            <a href="/wedding" className="inline-flex items-center gap-2 text-primary uppercase tracking-widest hover:gap-4 transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
              Explore The Wedding Atelier <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
            </a>
          </motion.div>
 
          <motion.div
            className="md:col-span-7 relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6ndt5T6jop5f1YqXMWopgMaXp_4mOekRg0p0s4Bjf01Bl398Mxk43k7Y6dLwcaYeRaljjbPU_OUWuxZ1qsQN51HgheRRM9Szqz11upVwBdY4jsNrX6D5NpwrYUyTARdYAUjn-exT7UYgicpBb02ScsFR58ulm7ES1koel4sZXhhnzlSuCmr87a3zU8rqfM-0D_EV2bzQsDk-FTDsHu0KOLLGvd2tojrSDg1Gihal46fPwIk5ZN9Jmgr3Ek4wsguTlC4cd4DbtHDA"
                alt="Ethereal glass wedding walkway"
              />
            </div>
            <div className="absolute -bottom-10 -left-6 md:-left-10 glass-card p-6 md:p-8 max-w-[280px] md:max-w-xs border border-primary/10">
              <div className="text-primary mb-2 uppercase tracking-wider text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>LATEST WORK</div>
              <div className="mb-4 text-xl md:text-2xl font-medium" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>The Glass Cathedral, Lake Como</div>
              <p className="text-on-surface-variant text-xs md:text-sm" style={{ fontFamily: "Inter, sans-serif" }}>A 3-day immersive experience for 200 guests featuring a floating glass pavilion.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CORPORATE EVENTS ─── */}
      <section className="py-[60px] md:py-[120px] bg-surface-container-lowest relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/3 opacity-50 blur-3xl" />
        <div className="px-6 md:px-16 max-w-[1280px] mx-auto relative z-10">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary uppercase tracking-widest mb-4 block text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>
              02 / Institutional Impact
            </span>
            <h2 style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Corporate Events
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large bento */}
            <motion.div
              className="md:col-span-2 relative group overflow-hidden"
              style={{ aspectRatio: "16/9" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ8qYYNsTsUlNjK7jonpK1TlyhkMXrmXptZ0dd-Tz6WBL6-pIDu8kYhvFq44GeA3wPP0bTBCdE_8HrmC7Tutd0VLsMacmSIq7myfMgJSZrvSwlY62_OLMzIdSBmPJo_O41AH_or0etdq1jBfeoEZnNg0n7TQ6mSy1lWGR7Cw0sxic92gtjC_u5iQWQ9yCXG2M2gQQ-TW48XwG9ZH4Xc_4PobrzzlYQwIZkZ3OquhR9RAwPL_GMQhrSZRiNgrT3vx0sCLQrjUV3v9k"
                alt="Corporate leadership summit"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
              <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 pr-4">
                <h3 className="mb-2 text-xl md:text-[28px] font-medium" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>Global Leadership Summits</h3>
                <p className="text-on-surface-variant text-sm md:text-base" style={{ fontFamily: "Inter, sans-serif" }}>Strategic environments for high-stakes decision making.</p>
              </div>
            </motion.div>

            {/* Product launches */}
            <motion.div
              className="glass-card p-8 flex flex-col justify-between group"
              style={{ aspectRatio: "1/1" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4 }}
            >
              <span className="material-symbols-outlined text-primary" style={{ fontSize: "48px", fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
              <div>
                <h3 className="mb-2" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "24px" }}>Product Launches</h3>
                <p className="text-on-surface-variant" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}>Theatrical debuts for revolutionary technology and luxury goods.</p>
              </div>
            </motion.div>

            {/* Networking */}
            <motion.div
              className="relative overflow-hidden group"
              style={{ aspectRatio: "1/1" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMzzdoUeKNp6Q9O0zK8nw6mLWprm6-pGtzN_vpnhysPGeT8K-fXL7HK60eFeZbkkEkWLjbFnDLvg6x1-_TFxQOc-VYOVQv7-BU5Cg1oUi0jRMx4lXt7ZmGnrB-4E4oDWyiTO3uv5UkAYWAKxuMl-a2X4pfsutschk6bn3h1shap8oNcQyaP96ACvU-4Tvz01NVaPnMfiCPbxy1cT6y3xAXs_sF1coGGvgh4-9cQmjGhJNoFHMWc1FGOjVgAxHu6S9qrw1CDfVs_p0"
                alt="Networking gala"
              />
              <div className="absolute inset-0 bg-background/40 group-hover:bg-background/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-background/80 px-4 py-2 uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>Networking Galas</span>
              </div>
            </motion.div>

            {/* Strategic Production */}
            <motion.div
              className="md:col-span-2 glass-card p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex-1">
                <h3 className="mb-4 text-2xl md:text-[28px] font-medium" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>Strategic Production</h3>
                <p className="text-on-surface-variant mb-6 text-sm md:text-base" style={{ fontFamily: "Inter, sans-serif" }}>
                  Full-scale logistics and technical direction for multi-city international tours. We manage the complexity so you can lead the conversation.
                </p>
                <button className="bg-primary text-on-primary px-6 py-2 uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
                  Request Case Study
                </button>
              </div>
              <div className="hidden md:flex w-1/3 justify-center">
                <span className="material-symbols-outlined text-primary/20" style={{ fontSize: "80px" }}>hub</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── DESTINATION EVENTS ─── */}
      <section className="py-[60px] md:py-[120px]">
        <div className="flex flex-col md:flex-row w-full min-h-[500px] md:min-h-[700px]">
          <motion.div
            className="w-full md:w-1/2 h-[350px] md:h-auto relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnrhpBolQVDoi3T12GYzFq-Lx2fZiEOS09xiN_coFuDwLcjd_Aea-4mOekRg0p0s4Bjf01Bl398Mxk43k7Y6dLwcaYeRaljjbPU_OUWuxZ1qsQN51HgheRRM9Szqz11upVwBdY4jsNrX6D5NpwrYUyTARdYAUjn-exT7UYgicpBb02ScsFR58ulm7ES1koel4sZXhhnzlSuCmr87a3zU8rqfM-0D_EV2bzQsDk-FTDsHu0KOLLGvd2tojrSDg1Gihal46fPwIk5ZN9Jmgr3Ek4wsguTlC4cd4DbtHDA"
              alt="Luxury desert campsite"
            />
            <div className="absolute inset-0 bg-background/20" />
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 bg-surface flex items-center p-8 md:p-20"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="max-w-xl text-center md:text-left">
              <span className="text-primary uppercase tracking-widest mb-4 block text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>
                03 / Beyond Borders
              </span>
              <h2 className="mb-8" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
                Destination Events
              </h2>
              <div className="space-y-10 md:space-y-12 text-left">
                {destSteps.map((step) => (
                  <div key={step.num} className="flex gap-6">
                    <span className="text-primary opacity-30 shrink-0 text-2xl md:text-[28px] font-medium" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>{step.num}</span>
                    <div>
                      <h4 className="mb-2 text-xl md:text-2xl" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>{step.title}</h4>
                      <p className="text-on-surface-variant text-sm md:text-base" style={{ fontFamily: "Inter, sans-serif" }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PRODUCTION & STYLING ─── */}
      <section className="py-[60px] md:py-[120px] px-6 md:px-16 max-w-[1280px] mx-auto">
        <motion.div className="text-center mb-12 md:mb-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-primary uppercase tracking-widest mb-4 block text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>
            04 / Aesthetic Integrity
          </span>
          <h2 style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
            Production & Styling
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {styleItems.map((item, i) => (
            <motion.div
              key={item.title}
              className={`space-y-4 ${item.offset ? "md:pt-12" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 group cursor-pointer" style={{ aspectRatio: "3/4" }}>
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.img} alt={item.title} />
              </div>
              <h4 style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "20px" }}>{item.title}</h4>
              <p className="text-on-surface-variant" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-[80px] md:py-[120px] px-6 md:px-16 text-center" style={{ background: "radial-gradient(circle at center, rgba(70,225,118,0.1) 0%, transparent 60%)" }}>
        <motion.div className="max-w-3xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="leading-tight mb-8" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(32px, 6vw, 64px)", fontWeight: 600, letterSpacing: "-0.03em" }}>
            Begin Your Legacy
          </h2>
          <p className="text-on-surface-variant mb-12 text-sm md:text-lg" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
            Merkanto Studios accepts a limited number of commissions annually to ensure unparalleled execution. Secure your date for 2025/2026.
          </p>
          <div className="flex flex-col items-center gap-4">
            <button className="w-full md:w-auto bg-primary text-on-primary px-12 py-5 font-bold uppercase tracking-widest hover:opacity-90 transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "14px" }}>
              Initiate Consultation
            </button>
            <p className="text-on-surface-variant text-xs md:text-sm" style={{ fontFamily: "Geist, monospace" }}>Estimated Response: 24 Business Hours</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
