"use client";

import { useEffect, useState } from "react";
import { LogoNav } from "../ui/Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 right-0 left-0 z-40 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(12,12,14,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
        opacity: scrolled ? 1 : 0,
        pointerEvents: scrolled ? "auto" : "none",
      }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3">
        <LogoNav />
        <a
          href="#download"
          className="rounded-lg bg-white px-4 py-2 font-mono text-xs font-medium tracking-wide text-surface-dark transition-colors hover:bg-n-200"
        >
          DOWNLOAD
        </a>
      </div>
    </nav>
  );
}
