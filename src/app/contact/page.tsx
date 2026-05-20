"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AlternatingText from "@/components/AlternatingText";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "Strategic Trade Partnership",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setStatusMessage("Please populate all fields before dispatching.");
      return;
    }
    setStatus("submitting");
    try {
      const formFields = new FormData();
      // Using public access key directly on the client side as designed by Web3Forms
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "deaac10c-d556-4907-9fa2-b1a157306ab2";
      
      formFields.append("access_key", accessKey);
      formFields.append("name", formData.name);
      formFields.append("email", formData.email);
      formFields.append("subject", `[MERKANTO INQUIRY] ${formData.type} - ${formData.name}`);
      formFields.append("message", `Inquiry Type: ${formData.type}\n\nMessage: ${formData.message}`);
      formFields.append("from_name", "Merkanto Website Contact Desk");
      formFields.append("replyto", formData.email);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formFields
      });

      let data: any = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }

      if (response.ok && data.success) {
        setStatus("success");
        setStatusMessage("Your inquiry has been successfully dispatched to our desk.");
        setFormData({ name: "", email: "", type: "Strategic Trade Partnership", message: "" });
      } else {
        setStatus("error");
        setStatusMessage(data.message || "Failed to dispatch message. Please retry.");
      }
    } catch (err) {
      setStatus("error");
      setStatusMessage("Network error. Please verify your connection.");
    }
  };

  const whatsappUrl = "https://wa.me/919746957077?text=Hello%2C%20I'm%20interested%20in%20arranging%20a%20priority%20consultation%20with%20Merkanto.";

  return (
    <div className="min-h-screen">
      {/* ─── HERO HEADER ─── */}
      <section className="relative pt-32 md:pt-24 pb-12 md:pb-16 hero-gradient">
        <motion.div
          className="max-w-[1280px] mx-auto px-6 md:px-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block px-3 py-1 bg-surface-container-highest/30 border border-primary/30 mb-6" style={{ borderRadius: "9999px" }}>
            <span className="text-primary uppercase tracking-[0.2em] text-[10px] md:text-[12px]" style={{ fontFamily: "Geist, monospace" }}>Contact Excellence</span>
          </div>
          <h1 className="mb-4" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(36px, 8vw, 72px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            <AlternatingText text="Establish Connection" />
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-sm md:text-lg" style={{ fontFamily: "Manrope, sans-serif", lineHeight: 1.6 }}>
            Engage with our global trade advisory. Whether you are scaling operations or entering new markets, your journey begins here.
          </p>
        </motion.div>
      </section>

      {/* ─── MAIN GRID ─── */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-16 pb-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inquiry Form */}
          <motion.div
            className="lg:col-span-7 glass-card p-8 md:p-14 relative overflow-hidden group"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16" />
            <h2 className="mb-10 text-center md:text-left" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(24px, 3vw, 48px)", letterSpacing: "-0.02em" }}>
              <AlternatingText text="Direct Inquiry" />
            </h2>

            {status !== "idle" && (
              <div className={`mb-8 p-4 border text-sm uppercase tracking-wider ${
                status === "success" ? "bg-primary/10 border-primary text-primary" :
                status === "error" ? "bg-error/10 border-error text-error" : "bg-surface-container border-outline/30 text-on-surface-variant"
              }`} style={{ fontFamily: "Geist, monospace" }}>
                {statusMessage || "Processing inquiry..."}
              </div>
            )}

            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-on-surface-variant uppercase tracking-widest text-[10px] md:text-[11px]" style={{ fontFamily: "Geist, monospace" }}>Full Name</label>
                  <input
                    className="bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-primary transition-colors text-on-surface text-sm md:text-base"
                    placeholder="Alexander Sterling"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-on-surface-variant uppercase tracking-widest text-[10px] md:text-[11px]" style={{ fontFamily: "Geist, monospace" }}>Corporate Email</label>
                  <input
                    className="bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-primary transition-colors text-on-surface text-sm md:text-base"
                    placeholder="as@merkanto.global"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-on-surface-variant uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Inquiry Type</label>
                <select
                  className="bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-primary transition-colors text-on-surface appearance-none"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  <option className="bg-surface">Strategic Trade Partnership</option>
                  <option className="bg-surface">Institutional Academy Enrollment</option>
                  <option className="bg-surface">Automotive Logistics</option>
                  <option className="bg-surface">Wedding Cinema Commission</option>
                  <option className="bg-surface">Event Management</option>
                  <option className="bg-surface">Private Portfolio Advisory</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-on-surface-variant uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Message</label>
                <textarea
                  className="bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-primary transition-colors text-on-surface resize-none"
                  placeholder="Describe the scope of your vision..."
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ fontFamily: "Manrope, sans-serif" }}
                />
              </div>

              <div className="pt-4">
                <button
                  className="w-full bg-primary text-on-primary py-5 font-bold uppercase tracking-[0.3em] hover:brightness-110 active:scale-[0.99] transition-all shadow-xl shadow-primary/10 disabled:opacity-50"
                  type="submit"
                  disabled={status === "submitting"}
                  style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}
                >
                  {status === "submitting" ? "Dispatching..." : "Dispatch Message"}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {/* WhatsApp */}
             <div className="bg-surface-container-low border border-outline-variant/20 p-8 flex flex-col justify-between min-h-[200px] md:min-h-[240px] text-center md:text-left">
               <div>
                 <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                   <span className="material-symbols-outlined text-primary text-[32px] md:text-[40px]">chat_bubble</span>
                   <h3 className="text-2xl md:text-[28px] font-medium animate-pulse-subtle" style={{ fontFamily: "Outfit, sans-serif" }}>
                     <AlternatingText text="Instant Priority" />
                   </h3>
                 </div>
                 <p className="text-on-surface-variant mb-8 text-sm md:text-base" style={{ fontFamily: "Manrope, sans-serif" }}>
                   Connect with our concierge desk via encrypted WhatsApp for immediate institutional support.
                 </p>
               </div>
               <a
                 className="inline-flex items-center justify-center md:justify-start gap-4 text-primary uppercase tracking-widest border border-primary px-8 py-4 hover:bg-primary hover:text-on-primary transition-all self-center md:self-start w-full md:w-auto"
                 href={whatsappUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 style={{ fontFamily: "Geist, monospace", fontSize: "12px" }}
               >
                 Connect on WhatsApp
                 <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_outward</span>
               </a>
             </div>

            {/* Office Info */}
            <div className="glass-card p-8">
              <div className="space-y-8">
                 <div className="flex gap-6">
                   <div className="w-12 h-12 shrink-0 bg-primary-container/20 flex items-center justify-center">
                     <span className="material-symbols-outlined text-primary">location_on</span>
                   </div>
                   <div>
                     <h4 className="text-on-surface-variant uppercase tracking-widest mb-1" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Corporate Headquarters</h4>
                     <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", lineHeight: "1.6" }}>
                       1003, T1, Business Park<br />
                       HiLITE City, National Highway 66,<br />
                       Bypass, Thondayad,<br />
                       Kozhikode, Kerala 673014
                     </p>
                     <a 
                       href="https://www.google.com/maps/place/HiLITE+Business+Park+,/data=!4m2!3m1!1s0x0:0xbb7abc23c1ea8a?sa=X&ved=1t:2428&ictx=111"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="text-primary hover:underline text-xs uppercase tracking-widest font-mono mt-2 inline-flex items-center gap-1.5 font-bold"
                     >
                       View on Google Maps
                       <span className="material-symbols-outlined text-[12px]">arrow_outward</span>
                     </a>
                   </div>
                 </div>
                 <div className="flex gap-6">
                   <div className="w-12 h-12 shrink-0 bg-primary-container/20 flex items-center justify-center">
                     <span className="material-symbols-outlined text-primary">schedule</span>
                   </div>
                   <div>
                     <h4 className="text-on-surface-variant uppercase tracking-widest mb-1" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Operations Hours</h4>
                     <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", lineHeight: "1.6" }}>
                       Monday — Saturday: 10:00 AM - 06:00 PM<br />
                       Sunday: Off
                     </p>
                   </div>
                 </div>
                 <div className="flex gap-6">
                   <div className="w-12 h-12 shrink-0 bg-primary-container/20 flex items-center justify-center">
                     <span className="material-symbols-outlined text-primary">mail</span>
                   </div>
                   <div>
                     <h4 className="text-on-surface-variant uppercase tracking-widest mb-1" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>Support Desk</h4>
                     <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", lineHeight: "1.6" }}>
                       merkantopvtltd@gmail.com<br />
                       +91 9746957077
                     </p>
                   </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── MAP SECTION ─── */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-16 pb-[60px] md:pb-[120px]">
        <motion.div
          className="relative h-[350px] md:h-[500px] w-full overflow-hidden border border-white/10 rounded-lg transition-all duration-500 hover:border-primary/40 group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <iframe
            src="https://maps.google.com/maps?q=HiLITE%20Business%20Park,%20Thondayad,%20Kozhikode,%20Kerala&t=m&z=15&output=embed&iwloc=near"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/60 pointer-events-none transition-colors duration-700 group-hover:bg-black/10 mix-blend-multiply" />
        </motion.div>
      </section>
    </div>
  );
}
