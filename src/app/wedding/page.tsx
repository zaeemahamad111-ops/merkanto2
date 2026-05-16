"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const processSteps = [
  {
    num: "01",
    title: "Curatorial Session",
    desc: "We align our visual language with your personal aesthetic, ensuring every shot serves the grand narrative of your union.",
  },
  {
    num: "02",
    title: "Global Deployment",
    desc: "Our team travels globally, equipped with cinema-grade optics to capture your wedding in any corner of the world.",
  },
  {
    num: "03",
    title: "The Editorial Archive",
    desc: "Your wedding is delivered as a bespoke digital archive and a hand-crafted leather-bound heirloom volume.",
  },
];

export default function WeddingPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Grain overlay */}
      <div className="fixed inset-0 grain-overlay z-50 pointer-events-none" />

      {/* ─── HERO ─── */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover brightness-50"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0wH35p1GxmtACgOpw830FKlkO97pgBsMHfZOMAz8-7MSc-fC2ooXEAxs8zq_166fcCTUsY4fPbcE57ZfPdoxlwqh9elhy0nnPFgnXQGweZkWcrtCLOhSsB2OjFquYrlIYVCEVZXHJOsz-PduoqB2G2SewJhO-JxmDTx1GMylaLFDW1et7Krt3R-tC-wqqFP1go7QrpzCrIv_Rl1mWs_58p-LdYHCO-A-NdhytKPMuNDOYLkZ6SdS-dwM8MKK2donMqXw1bPlkwz4"
            alt="Cinematic wedding couple at architectural setting"
          />
        </div>
        <div className="absolute inset-0 spotlight" />

        <motion.div
          className="relative z-10 text-center px-6 pt-20 md:pt-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h1
            className="text-on-surface mb-6 max-w-4xl mx-auto"
            style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(36px, 8vw, 72px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            Archiving the <span className="text-primary italic">Eternal</span>
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-10 md:mb-12 text-base md:text-[18px]" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
            Elite wedding photography for those who view life through a cinematic lens. Precision-crafted imagery for the global aesthetic elite.
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center">
            <button className="w-full md:w-auto bg-primary text-on-primary px-10 py-4 font-bold uppercase tracking-[0.2em] active:scale-95 transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
              Book the Session
            </button>
            <button className="w-full md:w-auto border border-on-surface/30 text-on-surface px-10 py-4 uppercase tracking-[0.2em] hover:bg-on-surface hover:text-background transition-all" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
              View Filmography
            </button>
          </div>
        </motion.div>

        {/* Scroll line */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-on-surface-variant uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-primary/50" />
        </div>
      </section>

      {/* ─── GALLERY BENTO ─── */}
      <section className="py-[60px] md:py-[120px] px-6 md:px-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Large ceremony shot */}
          <motion.div
            className="col-span-12 md:col-span-8 h-[350px] md:h-[550px] relative group overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtMbvWo63uTL2DEg37q8poy27yzL7vpCgrqgqRD2AWWGQoAepwdz3o-kIy50C1coV-oWsU0LBHfitDk_qHTFP_FcOHT7B68p6hpc7XsyNFmTwsxCtKZFLLRA8NpAF09qHy40hpgTGcUxhujLxu8QIzSFVG3m_ByXOUIi1jTDPFPnSucri6FgL8KNB8Y3ylH3MToqECNsxYM91KSPB38f-ko9OwNP_QbsFAvNqYHbArW_80RvdNTD2RqeeyGosxFtl1rt4cjjSHoNM"
              alt="The Ceremony - Villa Sola Cabiati"
            />
            <div className="absolute inset-0 bg-black/40 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-end p-6 md:p-10">
              <div>
                <span className="text-primary uppercase tracking-widest text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>Lake Como, Italy</span>
                <h3 className="text-white mt-2 text-xl md:text-[28px] font-medium" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>The Villa Sola Cabiati Union</h3>
              </div>
            </div>
          </motion.div>

          {/* Philosophy card + detail */}
          <motion.div
            className="col-span-12 md:col-span-4 h-auto md:h-[550px] flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex-1 glass-card p-8 md:p-10 flex flex-col justify-center text-center md:text-left">
              <span className="text-primary uppercase tracking-widest mb-4 text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>Philosophy</span>
              <h2 className="text-on-surface leading-tight mb-6" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 600 }}>
                Precision in <br />Sentiment
              </h2>
              <p className="text-on-surface-variant text-sm md:text-base" style={{ fontFamily: "Inter, sans-serif" }}>
                We don't capture events; we curate legacies. Every frame is a deliberate composition of light, shadow, and unscripted emotion.
              </p>
            </div>
            <div className="h-[200px] relative overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEt1v10ir4ukMiI6TKDkuMriM897eSvp0DZzIJoNm6Vh5cAVCwcI9m1KEjpAI7jabQkxz9Ov6Q5Z71dCL9drVa0IlgmOYgKWn81-esY0jdWtju9PmPYjMRkGkNyvZyCAp-Eft8XoZ44CbyXqBnbxPzORdgIcRUP84p-WPoIZgp4k7371u6GUCs4db5RKY5Co0zhZUe7dQ-wdUQuKMCWkD1RR_4vW7yCNkjU6Ze2jVoYEcE236eg9gcaU_IA600OKw21chXLwIaBiU"
                alt="Bride veil detail"
              />
            </div>
          </motion.div>

          {/* Groom portrait */}
          <motion.div
            className="col-span-12 md:col-span-4 h-[300px] md:h-[380px] overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5VIeFrKVUWYcMNSotbx3XBnnfgka7NTmnUgstz9lNzWmHzed2tcdxBvvzohNh8HljPPPApWA17s3opz9ySmlDJfEdkjkRoK4VHCkqUpXdJcPe4PZNvQ59X8kR5rTr0fDokkxqZzX5Jqwgpk_MAiYLrssjG_WtKdq9sg1h1e68Ny4H7T_5X_EQsE29wYkFyshaiPktdz8Akfa9nOOP1c9RuCpesIZ5s9Qnc6rIkayfBTbqd0dIDgIR4BT5i0lGfZ-TzhvU2IAITwk" alt="Groom portrait" />
          </motion.div>

          {/* Dancing couple */}
          <motion.div
            className="col-span-12 md:col-span-8 h-[300px] md:h-[380px] relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img
              className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-1000"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJwEX9pZsy4EYE-y3TwW_lUr9GQ96z7jagwj68STZEyysrtz8XNHnl-3qYCGX42f0ouQZeezwh2P13fzAnxMehqx7_Wjzc2m6A_6dbQ-ljBtln3mhvr6id4AI6dLM8k3rhnT1uCqZ6TWXi-eX6pniua0BEdE15mvX2GmY9uQSZfvPeMpIzn2c7o3v5GmSNKYBbmiMl-LI27q2klHaa5VAtIAE-WPoERFyVAef4mrRDJNgc17HIJLE1iyIAWwjSAGwaxYVabutejqQ"
              alt="Wedding reception dancing"
            />
            <div className="absolute inset-0 glass-card md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button className="bg-primary text-on-primary px-8 py-3 font-bold uppercase tracking-widest text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>
                View Wedding Film
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── NARRATIVE ─── */}
      <section className="bg-surface-container-low py-[60px] md:py-[120px] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div className="relative" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="overflow-hidden border border-white/5" style={{ aspectRatio: "3/4" }}>
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsknHLj2YDnBd9CqA5eJp3meCF80iDol4aP-4MWj7icGowKHT42NBUdGiMUu1dG1hw7fEKIkjNLVFuxRUHvhv0D49oFYxjd_6t61m1MG_RxO4dHY9OQfChK7snx4r9E1xaKJmqoTjetpbR_pIa7sk4Q2oKKjjdy-PTxVtMuhayuoe4Y20NqmKi6V95arr4ABm20TzA4qPtRrFvBCwObuxJ8ka6JuoFmrBLi3az3THJFsijBae8X7xc4ULw9n1Hy4wVu4QCYSlrL0k"
                alt="Lead Creative photographer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 glass-card p-8 max-w-xs hidden md:block">
              <p className="text-on-surface italic" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px" }}>
                "The most beautiful moments are often found in the silence between the frames."
              </p>
              <p className="mt-4 text-primary uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>
                Julian Merkanto — Lead Creative
              </p>
            </div>
          </motion.div>
 
          <motion.div className="text-center md:text-left" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="text-primary uppercase tracking-[0.3em] mb-4 block text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>The Process</span>
            <h2 className="text-on-surface mb-8" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Architectural Storytelling
            </h2>
            <div className="space-y-10 md:space-y-12 text-left">
              {processSteps.map((step) => (
                <div key={step.num} className="flex gap-6">
                  <span className="text-on-surface/10 leading-none shrink-0 text-[32px] md:text-[48px] font-semibold" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>
                    {step.num}
                  </span>
                  <div>
                    <h4 className="text-on-surface mb-2 text-2xl md:text-[28px] font-medium" style={{ fontFamily: "Hanken Grotesk, sans-serif" }}>{step.title}</h4>
                    <p className="text-on-surface-variant text-sm md:text-base" style={{ fontFamily: "Inter, sans-serif" }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CINEMATIC QUOTE ─── */}
      <section className="h-[580px] flex items-center justify-center bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVYAml27P-GsRm1uhWWjbeppU1zax7wuo3QtVGHsW1TTXSGsNBu64AG9PC5Pbizh3cLA57oq1m87yB297Zv1FMCR0q4Hma_ogjWBr9TfkthvpptY7PM3cmuFyJ4RTolg5dko05KBjlgMQQJhj6yOAJ-byZxcGNO_fPWfhQW81vNjTPoKEI1iQ85IjirU8-A2Gt4-E74AsSh3U7FvYu-Mnu4CD8jQwGqnQ9XVL-FMXPzXrQYKWrmKvyZ15lBr350CXpC1oQL403adc"
            alt="Twilight villa atmosphere"
          />
        </div>
        <motion.div
          className="relative z-10 text-center max-w-4xl px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="material-symbols-outlined text-primary mb-8 block" style={{ fontSize: "56px" }}>auto_awesome</span>
          <blockquote className="text-on-surface mb-6" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 600, lineHeight: 1.3 }}>
            "Merkanto transformed our wedding into a work of high art. It wasn't just photography; it was a cinematic experience."
          </blockquote>
          <cite className="text-primary uppercase tracking-widest not-italic" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
            — The Windsor-Hayes Union, 2023
          </cite>
        </motion.div>
      </section>
    </div>
  );
}
