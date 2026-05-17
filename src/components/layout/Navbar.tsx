"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/trade", label: "Trade" },
  { href: "/academy", label: "Academy" },
  { href: "/automotive", label: "Automotive" },
  { href: "/wedding", label: "Studios" },
  { href: "/events", label: "Events" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <header className="bg-surface/15 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <nav className="flex justify-between items-center w-full px-6 md:px-16 py-2 max-w-[1280px] mx-auto">
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
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-label-sm text-label-sm uppercase tracking-widest font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex items-center gap-4 text-on-surface-variant">
            <button className="hover:text-primary transition-colors" aria-label="Search">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="hover:text-primary transition-colors" aria-label="Notifications">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
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
            className="md:hidden border-t border-white/10 bg-surface-container-low overflow-hidden"
          >
            <div className="flex flex-col py-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-6 py-4 font-label-sm text-label-md uppercase tracking-[0.2em] transition-colors text-center ${
                      isActive ? "text-primary bg-primary/5" : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
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
