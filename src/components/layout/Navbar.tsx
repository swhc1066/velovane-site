"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { LogoMark } from "@/components/ui/Logo";

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

/** Snapshot for useSyncExternalStore: `1` = dark bar, `0` + blend = light bar with white fade. */
function getNavSnapshot(): string {
  if (typeof document === "undefined") return "0:0.000";
  if (readNavIsDark()) return "dark";
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
  const isDark = snap === "dark";
  const lightSurface =
    snap.startsWith("light:") ? Number.parseFloat(snap.slice(6)) || 0 : 0;

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

  return (
    <nav
      id="site-nav"
      className={`fixed top-0 right-0 left-0 z-50 border-b border-solid transition-[background-color,border-color,backdrop-filter] duration-200 ease-out ${
        isDark
          ? "border-white/10 bg-map-depth/90 text-white backdrop-blur-md supports-[backdrop-filter]:bg-map-depth/80"
          : ""
      }`}
      style={isDark ? undefined : lightNavStyle}
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-8 px-6 py-5 md:px-8">
        <Link
          href="/"
          className={`flex shrink-0 items-center transition-opacity hover:opacity-80 ${
            isDark ? "opacity-95 hover:opacity-100" : ""
          }`}
          aria-label="VeloVane home"
        >
          <LogoMark size={24} />
        </Link>

        <div className="flex items-center gap-6 md:gap-8">
          <a
            href="#how"
            className={`font-mono text-[11px] font-normal uppercase tracking-[0.14em] transition-colors ${
              isDark
                ? "text-white/70 hover:text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            How it works
          </a>
          <a
            href="#faq"
            className={`font-mono text-[11px] font-normal uppercase tracking-[0.14em] transition-colors ${
              isDark
                ? "text-white/70 hover:text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            FAQ
          </a>
          <a
            href="#notify"
            className={`px-[18px] py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
              isDark
                ? "bg-white text-map-depth hover:bg-n-200"
                : "bg-text-primary text-white hover:bg-vv-blue-darker"
            }`}
          >
            Get notified
          </a>
        </div>
      </div>
    </nav>
  );
}
