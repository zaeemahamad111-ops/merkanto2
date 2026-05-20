"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StartupLoader() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check session storage to see if we've already loaded this session on the client
    const hasLoaded = sessionStorage.getItem("merkanto_has_loaded");
    if (hasLoaded === "true") {
      return;
    }

    // Since this is the initial entry, display the loading screen
    setLoading(true);

    // Premium progress loading simulation
    const duration = 2200; // 2.2 seconds loading animation
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("merkanto_has_loaded", "true");
          }, 350);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-[#09090b] flex flex-col items-center justify-center select-none"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -20,
            transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } 
          }}
        >
          {/* Sleek radial glowing background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="flex flex-col items-center space-y-6 relative z-10">
            {/* Branding Text */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col items-center text-center"
            >
              <h1 
                className="text-4xl md:text-5xl font-black tracking-[0.3em] text-white uppercase select-none pl-[0.3em]"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                MERKANTO
              </h1>
              <p 
                className="text-[9px] tracking-[0.5em] uppercase text-primary/70 mt-2 select-none font-bold pl-[0.5em]"
                style={{ fontFamily: "Geist, monospace" }}
              >
                GLOBAL VENTURES
              </p>
            </motion.div>

            {/* Single line loading bar */}
            <div className="w-[160px] md:w-[200px] h-[1px] bg-white/10 rounded-full overflow-hidden relative mt-1">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            
            {/* Percentage count */}
            <motion.span 
              className="text-[9px] tracking-[0.2em] uppercase text-white/30 font-semibold"
              style={{ fontFamily: "Geist, monospace" }}
            >
              {Math.min(100, Math.floor(progress))}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
