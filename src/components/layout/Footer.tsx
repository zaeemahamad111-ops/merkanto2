"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  if (isDashboard) return null;

  return (
    <footer className="bg-surface border-t border-outline-variant/10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 md:px-16 py-12 max-w-[1280px] mx-auto gap-12 md:gap-8">
        <div className="space-y-6 md:space-y-4">
          <Image 
            src="/images/merkanto_logo_new.png" 
            alt="Merkanto Logo" 
            width={480} 
            height={120} 
            className="h-16 md:h-32 w-auto object-contain"
          />
          <p className="text-on-surface-variant text-body-md max-w-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px" }}>
            Global Trade Academy & Private Limited. Structural intelligence for the global market.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-on-surface font-bold mb-2 uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>
              Ventures
            </span>
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/trade", label: "Trade" },
              { href: "/academy", label: "Academy" },
              { href: "/automotive", label: "Automotive" },
              { href: "/wedding", label: "Studios" },
              { href: "/events", label: "Events" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest"
                style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-on-surface font-bold mb-2 uppercase tracking-widest" style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}>
              Legal
            </span>
            {["Privacy Protocol", "Terms of Excellence", "Strategic Partnerships"].map((item) => (
              <Link
                key={item}
                href="/contact"
                className="text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest"
                style={{ fontFamily: "Geist, monospace", fontSize: "11px" }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-16 py-8 border-t border-white/5 max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-on-surface-variant uppercase tracking-widest opacity-70" style={{ fontFamily: "Geist, monospace", fontSize: "10px" }}>
          © 2024 MERKANTO GLOBAL TRADE ACADEMY & MERKANTO PRIVATE LIMITED. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-6 text-on-surface-variant">
          <button className="hover:text-primary transition-colors" aria-label="Website">
            <span className="material-symbols-outlined">language</span>
          </button>
          <button className="hover:text-primary transition-colors" aria-label="Email">
            <span className="material-symbols-outlined">mail</span>
          </button>
          <button className="hover:text-primary transition-colors" aria-label="Network">
            <span className="material-symbols-outlined">hub</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
