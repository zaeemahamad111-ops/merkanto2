"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import AlternatingText from "@/components/AlternatingText";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function WeddingPage() {
  const { getContent } = useContent();

  return (
    <div className="min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative h-[90vh] min-h-[500px] md:min-h-[700px] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-60"
            src={getContent("wedding.hero.img", "https://lh3.googleusercontent.com/aida-public/AB6AXuClmYFYOhxjTw17KMDLSnD1y6q-h3RHIrf7eFRA1ZwGgtFIkRnV-QlKZSxKC2hFcS7uxqg370wSqMzqlPN7EGnCmI65PDwfAt4vPjYNIrAY4KjkhsgfRTYYK10DJHH1GMsemYjvANUJ0tx6T2pPKSrC5oBS44tvoLZG7J4uwL_yJdaMa1Nf-j7qbWO9AKhfNB9htBc5DCPvFn-fLq_W8QUmgpa1IyG9seOrKu_2ftFJoUv7E0LRV0EW1mPrlWq5np_nVCUL2la4baM")}
            alt="Luxury wedding ceremony set"
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
            {getContent("wedding.hero.badge", "The Cinema of Love")}
          </div>
          <h1 
            className="mb-6 max-w-4xl mx-auto uppercase tracking-tighter" 
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(32px, 8vw, 72px)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
          >
            <AlternatingText
              text={getContent("wedding.hero.title", "ARCHITECTING TIMELESS CELEBRATIONS")}
              highlightIndices={[1, 2]}
            />
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-10 text-base md:text-[18px]" style={{ fontFamily: "Manrope, sans-serif", lineHeight: 1.6 }}>
            {getContent("wedding.hero.description", "From high-production design systems to premier film creation, Merkanto Weddings is the luxury destination for elite unions.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="w-full sm:w-auto bg-primary text-on-primary px-10 py-4 uppercase tracking-widest hover:brightness-110 transition-all text-center flex items-center justify-center animate-pulse" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
              Request Cinema Profile
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── GALLERY BENTO ─── */}
      <section className="py-[60px] md:py-[120px] px-6 md:px-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-12 gap-6">
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
              src={getContent("wedding.ceremony.img", "https://lh3.googleusercontent.com/aida-public/AB6AXuBtMbvWo63uTL2DEg37q8poy27yzL7vpCgrqgqRD2AWWGQoAepwdz3o-kIy50C1coV-oWsU0LBHfitDk_qHTFP_FcOHT7B68p6hpc7XsyNFmTwsxCtKZFLLRA8NpAF09qHy40hpgTGcUxhujLxu8QIzSFVG3m_ByXOUIi1jTDPFPnSucri6FgL8KNB8Y3ylH3MToqECNsxYM91KSPB38f-ko9OwNP_QbsFAvNqYHbArW_80RvdNTD2RqeeyGosxFtl1rt4cjjSHoNM")}
              alt="The Ceremony - Villa Sola Cabiati"
            />
            <div className="absolute inset-0 bg-black/40 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-end p-6 md:p-10">
              <div>
                <span className="text-primary uppercase tracking-widest text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>
                  {getContent("wedding.ceremony.subtitle", "Lake Como, Italy")}
                </span>
                <h3 className="text-white mt-2 text-xl md:text-[28px] font-medium" style={{ fontFamily: "Outfit, sans-serif" }}>
                  {getContent("wedding.ceremony.title", "The Villa Sola Cabiati Union")}
                </h3>
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
              <h2 className="text-on-surface leading-tight mb-6 animate-pulse-subtle" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(24px, 3vw, 40px)" }}>
                <AlternatingText text="Precision in Sentiment" />
              </h2>
              <p className="text-on-surface-variant text-sm md:text-base" style={{ fontFamily: "Manrope, sans-serif" }}>
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

          {/* Dancing couple */}
          <motion.div
            className="col-span-12 md:col-span-12 h-[300px] md:h-[380px] relative overflow-hidden group"
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
              <Link href="/contact" className="bg-primary text-on-primary px-8 py-3 font-bold uppercase tracking-widest text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>
                View Wedding Film
              </Link>
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
          <blockquote className="text-on-surface mb-6 animate-pulse-subtle" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.3 }}>
            <AlternatingText text="Merkanto transformed our wedding into a work of high art. It wasn't just photography; it was a cinematic experience." />
          </blockquote>
          <cite className="text-primary uppercase tracking-widest not-italic" style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}>
            — The Windsor-Hayes Union, 2023
          </cite>
        </motion.div>
      </section>
    </div>
  );
}
