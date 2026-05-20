"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const products = [
  {
    title: "Carbon Chrono",
    price: "$1,240",
    desc: "Aerospace titanium enclosure with sapphire crystal.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfydbqSpr6ndYnQGENcpXDXAWUVd3SaR6oo2rKS4EMTpbmAOEXUlsA8a1uBd6bzU9HMKDdZeIhjuvDfvbN2Z4J0Z5U19_H4hsQr7vnk7Yiji48rMlUP6dI4_rIua4LPJX9DkVGndT2LpzKQj7KtI_O3Ty-zQIyorW2mroODMAsn496dRmlbu_bKiGV_eFtAPCZV3vWS-Awx9GI8Ij2gB_hKrQ1lj-uet9FMFTTWuGkMWgQ_T03BDpGt0IT1WLHW4TbPeM8I0_6vz8",
  },
  {
    title: "Bespoke Fob",
    price: "$450",
    desc: "Hand-stitched Alcantara and surgical steel hardware.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnSilJuA1b74RnEsLbjwZdBxpmyT8l4S82cDBRD0nJAMHlrPZpOFNUJqZ6rBKqXnICjiRAgBqn9yfFpl7oUEj-hcRG8GQU448OlyRHGDyleRt8EbInkwHdtwdNPeylRtW00UMFbNzBXMgDbMxhbtHY9k6hJGfAWkbVsB-Uxrhi0XzwZhQjXk0e41j4AyGBATwwQhpgJxZ8pS5xVjRbj9yCgUDajeweOIQJdDO7utSU8rcb_hbjg9oYuA_k4HFKuCZ5IKGD4vGrl_8",
  },
  {
    title: "Grip Series",
    price: "$890",
    desc: "CNC-machined performance pedals with anti-slip texture.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvBBR3-4UoHWbbmAV2EMES3Qg6uwOCIhDGc67G4rSDY5oD78mxxCQeLPkgMEfh-0HTynigxf3nHlvOPdMWBQXqJAugOza2Hh54R_IhzqWyEjLdtm8U4iNvFI9UuQfCbF4sImx5W5lht-H1zPHxrO7Pig-emAmpAKdKfOtVx3Z5kJ__Q58ABnHs-jm1F35trhT1AohFqkOkemlo5ULpAshPH94Wp4xMePDnvuh4ODdduRPKOCWGNOVFbrnroHQHE5UIMqxnxUiMvkE",
  },
  {
    title: "Aero Diffuser",
    price: "$2,800",
    desc: "Dry carbon fiber aerodynamic enhancement system.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtnDF-l73h9Cel1bjYarVIigBQRmBD2LPqxRwbUrgJFKyNIkmx3BgLQ-tRhyD6neXeWhxJSHfCWoa-Kh2uQ0cnx2FBGoE7MCyLWB7KVCZW5qXQ9kx86UyWkLhVPFVJ1afGoO4Qd_f3EozS-EKxU7N6fPukiuahtsHz9Mr5dSUhG4vlwmxqCobEfywpmSjjYntXnU7ilQoBI25sBVIxaDefd74YKAnX1uRvCgJiBSEyVe47_a7WddeGnQqN8H0EBTRQ6CHdEX0mMX8",
  },
];

export default function AutomotivePage() {
  return (
    <div className="bg-background min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative h-[90vh] min-h-[500px] md:min-h-[700px] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-60"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAohpsVZiOi2oxIp0hMFAGZ8u0nfYCZW38e2YoSFLNfdN6Xxpe44A-EMMxQLHdo67R7njV7jweqhHFT8trKp_HjdmZSDrwOvk_2wBPPVYlkiDSybZWMkiXYRKwIYj75eNpky7KOOpRenXNhjyHW2UYUmf6SxLlTB5Ub7o6kwo6RByFsoX1fvxzPiCnrSCR21M3LF4QPwwanIaVGYfzFC2QlrN9P_m82XzzjH5qnCL38kEYBBUmFWmMbGpmuPLi-Gb9TOg9Z_8M9Q28"
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
            Precision Craftsmanship
          </div>
          <h1 className="mb-6 max-w-4xl mx-auto uppercase tracking-tighter" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(32px, 8vw, 72px)", fontWeight: 600, lineHeight: 1.0 }}>
            The Art of <span className="text-primary">Automotive</span> Excellence
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-10 text-base md:text-[18px]" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
            Bespoke interior reimagining, imported technical enhancements, and cinematic detailing for the discerning collector.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="w-full sm:w-auto bg-primary text-on-primary px-10 py-4 uppercase tracking-widest hover:brightness-110 transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
              Explore Portfolio
            </button>
            <button className="w-full sm:w-auto border border-outline-variant text-on-surface px-10 py-4 uppercase tracking-widest hover:bg-white/5 transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
              Request Consultation
            </button>
          </div>
        </motion.div>
      </section>

      {/* ─── CURATED VERTICALS ─── */}
      <section className="py-[60px] md:py-[120px] px-6 md:px-16 max-w-[1280px] mx-auto">
        <motion.div className="mb-12 md:mb-16 text-center md:text-left" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="mb-4" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
            Curated Verticals
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOIqCYZaBFcIE9TgESEzShp1zX48vblh9igtli4YaBIyPyHJfGg8_YkDDvXvWR2RRyHmXnW44tL0mgk2BnDx4-x9ywHjTj-e06txKFFOblbKuluhZfe9C66eX306JfxYKAA9obGP5km90BMenA5fdR8TWPuOXGaL_fFmvBCdOA6P11WEUCbVDAZoESaF4Rmw8bYMrV-PYHYcfn0fYXDkK6xtAzByIU5VXGAfg0o-6a-7W_eHTrZWqsVKKM82eTq8LRUBt9kQicChQ"
              alt="Luxury automotive interior"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-md">
              <span className="text-primary uppercase tracking-widest mb-4 block text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>Bespoke Design</span>
              <h3 className="mb-4 uppercase text-2xl md:text-[28px] font-medium" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>Interior Reimagining</h3>
              <p className="text-on-surface-variant mb-6 text-sm md:text-base" style={{ fontFamily: "Inter, sans-serif" }}>
                Signature cabin atmospheres blending heritage leathercraft with cutting-edge integrated electronics.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-primary uppercase tracking-widest hover:gap-4 transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
                View Details <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
              </a>
            </div>
          </motion.div>

          {/* Detailing */}
          <motion.div
            className="md:col-span-4 group relative overflow-hidden glass-card h-[350px] md:h-[550px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3nnwLX7oCDsOoEHdgkS2lJ4whk6ctbg5EHfGgdamh_1uzJjmyOIU6EMBIZ8jp-4RpvwASp3M9Uko5rmFs8gfOK_xvPemgxeVBfFLvWU1amCmqggGjVayO6Gsob_kVazc2ObfclkDh8L9qePMGDk3JFn9a222TFOcc_nYuZPy9l3txPRR4caqHuJIOlBidb344xb3NsFmScqpBUuwyc3qZGVc-GsnUm8tYVdqNQ2DR1FECmYyhYSIZAF0Lqoa6K15NKCg26RwzAuE"
              alt="Automotive detailing"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="mb-2 uppercase text-xl md:text-2xl" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>Advanced Detailing</h3>
              <p className="text-on-surface-variant text-sm" style={{ fontFamily: "Inter, sans-serif" }}>Multi-stage correction and glass-ceramic protection.</p>
            </div>
          </motion.div>

          {/* Lower row */}
          {[
            { title: "Forged Dynamics", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdNatPKTepQMbDiL-3C3MKZFcSM_rdnm56jtCfk2UTJ26VRSXZrt50xRiOD8kB0hVJqw9ftgY4Ete-jFaqRV9zI4TRrM5E6myOM3rMcMo59yl1YVronV_QKO1SU58j4EM3x7tDyPiUC6_9chyTP3D6ZEtpo11M-UddMYK66ZZ4VSSSqoV-whWTTp7oGsfX-kLGDqkQfx8BxW6ORynkvikQV4_XuQgxa2vdYAl4US7Mv2IWZo24lDSAQmVPqvS-cb95SAY1xWdiLYEE" },
            { title: "Lumina Signature", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKrtrAntjc1HbBR8TKStV1u6oG5P2padfHg1IJJG1b303b9O1nIpwu75C46ovtHrirKa4X4BlRjpHeNHA20ihkmC8SlSC7yJcqtsk6E6TqT8DTJjPtHBxTsUHS3acOlgk6o8J1thF2vFQkdg063o4T-oAspWJ6tZW086CtB5rDwrqWcGEC8T3ggVuB0Blqv7i8TbanIo3zj3VBINWnwWLxgGEwNCb9uXJxwfDZjH3-1iQ0JnI2qA1U4yqsyn22qys0VtGP3ZK2tvc" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="md:col-span-4 group relative overflow-hidden glass-card h-[350px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
            >
              <img className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" src={item.img} alt={item.title} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
              <div className="absolute bottom-0 p-8">
                <h3 className="font-bold uppercase tracking-[0.2em]" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>{item.title}</h3>
              </div>
            </motion.div>
          ))}

          {/* Global Sourcing — green fill */}
          <motion.div
            className="md:col-span-4 group relative overflow-hidden bg-primary/90 h-[300px] md:h-[350px] flex flex-col justify-center items-center p-8 md:p-12 text-center text-on-primary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <span className="material-symbols-outlined mb-4 md:mb-6 text-[40px] md:text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>language</span>
            <h3 className="mb-4 uppercase leading-tight text-2xl md:text-[28px] font-medium" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>Global Sourcing</h3>
            <p className="text-sm md:text-base opacity-90" style={{ fontFamily: "Inter, sans-serif" }}>
              Rare components and proprietary accessories imported from the world's most exclusive manufacturers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── ACCESSORY VAULT ─── */}
      <section className="bg-surface-container-low py-[60px] md:py-[120px]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <motion.div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-6 text-center md:text-left" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div>
              <h2 className="mb-2 uppercase tracking-tighter" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600 }}>
                The Accessory Vault
              </h2>
              <p className="text-on-surface-variant text-sm md:text-lg" style={{ fontFamily: "Inter, sans-serif" }}>Technological artifacts for the modern cockpit.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p.title}
                className="glass-card inner-glow group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="aspect-square overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={p.img} alt={p.title} />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="uppercase" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "20px" }}>{p.title}</h4>
                    <span className="text-primary" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>{p.price}</span>
                  </div>
                  <p className="text-on-surface-variant mb-6" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px" }}>{p.desc}</p>
                  <button className="w-full py-3 border border-outline-variant uppercase tracking-widest hover:bg-primary hover:text-on-primary hover:border-primary transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUALITY COMMITMENT ─── */}
      <section className="py-[60px] md:py-[120px]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-20">
          <motion.div className="relative" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <img
              className="w-full object-cover"
              style={{ aspectRatio: "4/5" }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz0Jaro-qakB2FiqxMyi0CF0oeg3ntaQ-9AnH0ZBbBHwo01ln16xhk8uHbouOahXZImMO4p-rYPile1hRi8pnoWHKiYs8R4cRLxgPP1Gxcv9mBuzCvx1zty16Zyni40SqrcvQlt2Kt0KNz8ouma63VCnRd_DIN3dnxgidyueDqquahNs3QBcrRgfDorAaCFIXwK0lAgnXkGBBh9fIYGIB0hrtIDjA5hYOLzUK1HMaqbX67X-ymwLxmVxfXNIVNjoc9JDuxP9O8pM4"
              alt="Technician working on engine"
            />
            <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-32 h-32 md:w-44 md:h-44 bg-primary/20 backdrop-blur-2xl p-4 md:p-6 flex flex-col justify-end">
              <span className="text-primary font-bold leading-none mb-1 md:mb-0 text-[28px] md:text-[36px]" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>12+</span>
              <span className="uppercase tracking-widest leading-tight text-[9px] md:text-[11px]" style={{ fontFamily: "Geist, monospace" }}>Years of Global Sourcing</span>
            </div>
          </motion.div>

          <motion.div className="text-center md:text-left" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="text-primary uppercase tracking-widest block mb-6 text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>Uncompromising Quality</span>
            <h2 className="mb-8 uppercase tracking-tight" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600 }}>
              Technical Precision for the Global Elite
            </h2>
            <p className="text-on-surface-variant mb-10 text-sm md:text-lg" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
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
                    <p className="text-on-surface-variant text-sm md:text-base" style={{ fontFamily: "Inter, sans-serif" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-12 bg-on-surface text-background px-10 py-4 uppercase tracking-widest hover:bg-primary transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
              Learn Our Process
            </button>
          </motion.div>
        </div>
      </section>

      {/* ─── NEWSLETTER CTA ─── */}
      <section className="py-[60px] md:py-[120px] px-6 md:px-16">
        <motion.div
          className="max-w-4xl mx-auto glass-card p-10 md:p-20 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-6 uppercase tracking-tighter relative z-10" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(24px, 4vw, 48px)", fontWeight: 600 }}>
            Join the Inner Circle
          </h2>
          <p className="text-on-surface-variant mb-10 relative z-10 text-sm md:text-lg" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
            Receive exclusive early access to our limited-run imports and private collection events.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 relative z-10">
            <input
              className="flex-grow bg-transparent border-b-2 border-outline-variant focus:border-primary text-on-surface py-4 outline-none placeholder:text-on-surface-variant/50 uppercase tracking-widest"
              placeholder="ENTER YOUR EMAIL"
              type="email"
              style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}
            />
            <button className="bg-primary text-on-primary px-12 py-4 uppercase tracking-widest hover:brightness-110 transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
