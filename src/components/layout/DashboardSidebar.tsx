"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const adminLinks = [
  { href: "/dashboard/admin", icon: "dashboard", label: "Command Center" },
  { href: "/trade", icon: "language", label: "Trade Operations" },
  { href: "/dashboard/admin/students", icon: "group", label: "Students" },
  { href: "/academy", icon: "school", label: "Academy Hub" },
  { href: "/automotive", icon: "directions_car", label: "Automotive" },
  { href: "/events", icon: "event", label: "Events" },
];

const studentLinks = [
  { href: "/dashboard/student", icon: "dashboard", label: "My Dashboard" },
  { href: "/dashboard/student?tab=0", icon: "play_lesson", label: "My Learning" },
  { href: "/dashboard/student?tab=1", icon: "library_books", label: "Course Library" },
  { href: "/dashboard/student?tab=2", icon: "folder_open", label: "Resources" },
  { href: "/academy", icon: "school", label: "Academy Info" },
];

interface DashboardSidebarProps {
  activeIndex?: number;
  brandLabel?: string;
  role?: "admin" | "student";
  onNewVenture?: () => void;
}

export default function DashboardSidebar({
  activeIndex = 0,
  brandLabel = "Global Operations",
  role = "admin",
  onNewVenture,
}: DashboardSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = role === "student" ? studentLinks : adminLinks;

  const handleSignOut = () => {
    localStorage.removeItem("merkanto_role");
    localStorage.removeItem("merkanto_user");
    router.push("/login");
  };

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div className="px-6 mb-10">
        <Link href="/" className="block mb-2 hover:opacity-80 transition-opacity" onClick={() => setMobileOpen(false)}>
          <Image src="/images/merkanto_logo_new.png" alt="Merkanto Logo" width={280} height={80} className="h-14 w-auto object-contain" />
        </Link>
        <div className="text-on-surface-variant uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>{brandLabel}</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {links.map((link, i) => {
          const isActive = i === activeIndex || pathname === link.href;
          return (
            <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 ${isActive ? "bg-secondary-container/30 text-primary border-r-2 border-primary" : "text-on-surface-variant hover:bg-surface-container-highest/50 hover:text-on-surface"}`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{link.icon}</span>
              <span style={{ fontFamily: "Geist, monospace", fontSize: "12px", letterSpacing: "0.05em" }}>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* New Venture / Enroll CTA */}
      <div className="px-6 mt-6">
        <button
          onClick={() => { onNewVenture?.(); setMobileOpen(false); }}
          className="w-full bg-primary text-on-primary font-bold px-4 py-3 flex items-center justify-center gap-2 mb-4 hover:brightness-110 transition-all"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "20px", fontVariationSettings: "'FILL' 1" }}>add</span>
          <span style={{ fontFamily: "Geist, monospace", fontSize: "12px", letterSpacing: "0.05em" }}>
            {role === "admin" ? "New Venture" : "Explore Courses"}
          </span>
        </button>
      </div>

      {/* Footer */}
      <div className="border-t border-outline-variant/10 pt-4 mt-2">
        <button
          onClick={() => window.open("mailto:support@merkanto.global", "_blank")}
          className="flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:text-on-surface transition-colors w-full text-left"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>help</span>
          <span className="uppercase" style={{ fontFamily: "Geist, monospace", fontSize: "12px", letterSpacing: "0.05em" }}>Support</span>
        </button>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:text-red-400 transition-colors w-full text-left"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>logout</span>
          <span className="uppercase" style={{ fontFamily: "Geist, monospace", fontSize: "12px", letterSpacing: "0.05em" }}>Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-surface-container border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
        aria-label="Open navigation"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40" />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="md:hidden fixed left-0 top-0 h-full w-72 bg-surface-container-lowest border-r border-outline-variant/20 z-50 flex flex-col py-8 overflow-hidden"
            >
              <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col h-screen w-64 bg-surface-container-lowest border-r border-outline-variant/20 sticky top-0 z-50 py-8 shrink-0">
        <SidebarContent />
      </aside>
    </>
  );
}
