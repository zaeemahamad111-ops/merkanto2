"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ventureLinks = [
  { href: "/trade", label: "Trade", desc: "Global Trade Intelligence", icon: "hub" },
  { href: "/academy", label: "Academy", desc: "Real Operations Training", icon: "school" },
  { href: "/automotive", label: "Automotive", desc: "Luxury Vehicle Customization", icon: "precision_manufacturing" },
  { href: "/wedding", label: "Studios", desc: "Cinematic Artistry & Filmography", icon: "movie" },
  { href: "/events", label: "Events", desc: "Curated Global Production", icon: "event" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  // Security: Auto-logout when user leaves the dashboard and returns to the public website
  useEffect(() => {
    if (typeof window !== "undefined" && pathname && !pathname.startsWith("/dashboard") && pathname !== "/login" && pathname !== "/reset-password") {
      localStorage.removeItem("merkanto_role");
      localStorage.removeItem("merkanto_user");
      localStorage.removeItem("merkanto_student_id");
    }
  }, [pathname]);

  const isDashboard = pathname?.startsWith("/dashboard");
  if (isDashboard) return null;

  const isVenturesActive = ventureLinks.some((link) => link.href === pathname);

  return (
    <header className="bg-surface/50 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-50">
      {/* Subtle bottom gradient glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <nav className="relative flex justify-between items-center w-full px-6 md:px-16 py-2 max-w-[1280px] mx-auto z-10">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
          <Image 
            src="/images/merkanto_logo_new.png" 
            alt="Merkanto Logo" 
            width={400} 
            height={100} 
            className="h-12 md:h-24 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`font-label-sm text-label-sm uppercase tracking-widest font-medium transition-colors duration-300 ${
              pathname === "/"
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`font-label-sm text-label-sm uppercase tracking-widest font-medium transition-colors duration-300 ${
              pathname === "/about"
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            About
          </Link>

          {/* Ventures Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDesktopDropdownOpen(true)}
            onMouseLeave={() => setDesktopDropdownOpen(false)}
          >
            <button
              className={`flex items-center gap-1 font-label-sm text-label-sm uppercase tracking-widest font-medium transition-colors duration-300 cursor-pointer ${
                isVenturesActive
                  ? "text-primary pb-1"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              Ventures
              <span className={`material-symbols-outlined transition-transform duration-300 text-[18px] ${
                desktopDropdownOpen ? "rotate-180 text-primary" : ""
              }`}>
                keyboard_arrow_down
              </span>
            </button>

            <AnimatePresence>
              {desktopDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50 pointer-events-auto"
                >
                  <div className="bg-surface/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 rounded-2xl w-[560px] grid grid-cols-2 gap-4">
                    {/* Background glow inside dropdown */}
                    <div className="absolute inset-0 bg-primary/2 rounded-2xl pointer-events-none" />
                    
                    {ventureLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDesktopDropdownOpen(false)}
                        className={`group/item relative p-4 flex gap-4 rounded-xl border transition-all ${
                          pathname === item.href
                            ? "bg-primary/5 border-primary/20"
                            : "bg-white/[0.02] border-white/5 hover:border-primary/10 hover:bg-primary/[0.03]"
                        }`}
                      >
                        <div className={`w-10 h-10 shrink-0 border rounded-lg flex items-center justify-center transition-all ${
                          pathname === item.href
                            ? "bg-primary border-primary text-background"
                            : "bg-primary/10 border-primary/20 text-primary group-hover/item:bg-primary group-hover/item:text-background"
                        }`}>
                          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{item.icon}</span>
                        </div>
                        <div>
                          <div className={`font-bold uppercase tracking-wider text-[11px] font-mono transition-colors ${
                            pathname === item.href ? "text-primary" : "text-white group-hover/item:text-primary"
                          }`}>
                            {item.label}
                          </div>
                          <p className="text-on-surface-variant text-[11px] mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/contact"
            className={`font-label-sm text-label-sm uppercase tracking-widest font-medium transition-colors duration-300 ${
              pathname === "/contact"
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/login"
            className="bg-primary text-on-primary px-4 md:px-6 py-2 font-label-sm text-label-sm font-bold tracking-widest uppercase text-[10px] hover:brightness-110 active:scale-[0.99] transition-all"
          >
            LOGIN
          </Link>
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-on-surface-variant hover:text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full border-t border-white/5 bg-surface/95 backdrop-blur-2xl shadow-2xl overflow-hidden z-50"
          >
            <div className="flex flex-col py-4 max-h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
              {/* Home */}
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={`px-6 py-4 font-label-sm text-label-md uppercase tracking-[0.2em] transition-colors text-center ${
                  pathname === "/" ? "text-primary bg-primary/5" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Home
              </Link>

              {/* About */}
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className={`px-6 py-4 font-label-sm text-label-md uppercase tracking-[0.2em] transition-colors text-center ${
                  pathname === "/about" ? "text-primary bg-primary/5" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                About
              </Link>

              {/* Ventures Accordion */}
              <div className="flex flex-col">
                <button
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  className={`px-6 py-4 font-label-sm text-label-md uppercase tracking-[0.2em] transition-colors text-center flex items-center justify-center gap-2 ${
                    isVenturesActive ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Ventures
                  <span className={`material-symbols-outlined transition-transform duration-200 text-[18px] ${
                    mobileDropdownOpen ? "rotate-180" : ""
                  }`}>
                    keyboard_arrow_down
                  </span>
                </button>
                
                <AnimatePresence>
                  {mobileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white/[0.02] border-y border-white/5 overflow-hidden flex flex-col"
                    >
                      {ventureLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileDropdownOpen(false);
                          }}
                          className={`px-8 py-3 text-sm uppercase tracking-wider transition-colors text-center flex items-center justify-center gap-3 ${
                            pathname === item.href ? "text-primary font-bold bg-primary/5" : "text-on-surface-variant hover:text-on-surface"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px] opacity-70">{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact */}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={`px-6 py-4 font-label-sm text-label-md uppercase tracking-[0.2em] transition-colors text-center ${
                  pathname === "/contact" ? "text-primary bg-primary/5" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Contact
              </Link>

              <div className="px-6 py-6 border-t border-white/5 mt-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center bg-primary text-on-primary px-6 py-4 font-label-sm text-label-sm font-bold tracking-[0.3em] uppercase text-[10px]"
                >
                  LOGIN
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
