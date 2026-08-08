"use client";

import Link from "next/link";
import { useSyncExternalStore, useEffect, useState } from "react";
import { LogoMark } from "@/components/ui/Logo";
import { HERO_INTRO_DONE_EVENT } from "@/lib/hero-intro";

function readNavIsDark(): boolean {
  if (typeof document === "undefined") return false;
  const nav = document.getElementById("site-nav");
  const navH = nav?.getBoundingClientRect().height ?? 72;
  const probeY = navH + 6;
  const zones = document.querySelectorAll<HTMLElement>("[data-nav-tone]");
  for (const el of zones) {
    const r = el.getBoundingClientRect();
    if (probeY >= r.top && probeY < r.bottom) {
      return el.dataset.navTone === "dark";
    }
  }
  return false;
}

/** 0 at top of page, 1 after a short scroll while still over light sections (hero / strip). */
function readLightSurfaceProgress(): number {
  if (typeof window === "undefined") return 0;
  if (readNavIsDark()) return 0;
  const fadeEnd = Math.max(1, Math.min(window.innerHeight * 0.28, 240));
  const t = Math.min(1, window.scrollY / fadeEnd);
  return t * t * (3 - 2 * t);
}

/** Snapshot for useSyncExternalStore: `dark:0|1` = dark bar (scrolled bit), `light:*` = light bar with white fade. */
function getNavSnapshot(): string {
  if (typeof document === "undefined") return "light:0.000";
  if (readNavIsDark()) {
    const scrolled = typeof window !== "undefined" && window.scrollY > 60 ? 1 : 0;
    return `dark:${scrolled}`;
  }
  return `light:${readLightSurfaceProgress().toFixed(3)}`;
}

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

export function Navbar() {
  const snap = useSyncExternalStore(subscribe, getNavSnapshot, () => "light:0.000");
  const isDark = snap.startsWith("dark:");
  const darkScrolled = snap === "dark:1";
  const lightSurface =
    snap.startsWith("light:") ? Number.parseFloat(snap.slice(6)) || 0 : 0;

  // Intro visibility state
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    const handleIntroComplete = () => {
      setIntroReady(true);
    };

    window.addEventListener(HERO_INTRO_DONE_EVENT, handleIntroComplete);

    return () => {
      window.removeEventListener(HERO_INTRO_DONE_EVENT, handleIntroComplete);
    };
  }, []);

  const lightNavStyle =
    !isDark
      ? {
          backgroundColor: `rgba(255, 255, 255, ${lightSurface * 0.94})`,
          borderBottomColor: `rgba(0, 0, 0, ${0.06 * lightSurface})`,
          backdropFilter:
            lightSurface > 0.04 ? `saturate(180%) blur(${10 * lightSurface}px)` : "none",
          WebkitBackdropFilter:
            lightSurface > 0.04 ? `saturate(180%) blur(${10 * lightSurface}px)` : "none",
        }
      : undefined;

  const darkNavStyle = isDark && darkScrolled
    ? {
        backgroundColor: "rgba(6, 9, 13, 0.72)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }
    : undefined;

  return (
    <nav
      id="site-nav"
      className={`fixed top-0 right-0 left-0 z-50 border-b border-solid transition-[background-color,border-color,backdrop-filter,opacity] duration-[600ms] ease-out ${
        isDark
          ? "border-white/10 bg-map-depth/90 text-white backdrop-blur-md supports-[backdrop-filter]:bg-map-depth/80"
          : ""
      } ${
        introReady ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={isDark ? darkNavStyle : lightNavStyle}
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-8 px-6 py-5 md:px-8">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={`flex shrink-0 items-center transition-opacity hover:opacity-80 ${
              isDark ? "opacity-95 hover:opacity-100" : ""
            }`}
            aria-label="VeloVane home"
          >
            <LogoMark size={24} />
          </Link>
          
          {/* Optional wordmark */}
          <span className={`font-mono text-sm font-normal ${
            isDark ? "text-white" : "text-text-wordmark"
          }`}>
            velovane
          </span>
          
          {/* Today chip - hidden below ~700px */}
          <div className={`hidden min-[701px]:flex items-center gap-1 text-xs font-mono ${
            isDark ? "text-white/70" : "text-text-secondary"
          }`}>
            <span>Today ·</span>
            <span className="font-medium text-[#35C46A]">
              GO
            </span>
            <span>10:30 AM</span>
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-8">
          <a
            href="#how"
            className={`font-mono text-[11px] font-normal uppercase tracking-[0.14em] transition-colors ${
              isDark
                ? "text-white/70 hover:text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            How it reads
          </a>
          <a
            href="#download"
            className={`font-mono text-[11px] font-normal uppercase tracking-[0.14em] transition-colors ${
              isDark
                ? "text-white/70 hover:text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Pricing
          </a>
          <a
            href="/beta"
            className={`px-[18px] py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
              isDark
                ? "bg-white text-map-depth hover:bg-n-200"
                : "bg-text-primary text-white hover:bg-vv-blue-darker"
            }`}
          >
            Sign up for beta
          </a>
        </div>
      </div>
    </nav>
  );
}
