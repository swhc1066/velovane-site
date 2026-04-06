"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LogoMark } from "../ui/Logo";
import { WindCanvas } from "../ui/WindCanvas";
import { WeatherDataOverlay } from "../ui/WeatherDataOverlay";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const anim = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.7,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          },
        };

  return (
    <section ref={sectionRef} className="section-rounded-b relative overflow-hidden bg-surface-dark">
      {/*
        Video background — cloud timelapse, slowed down.
        Drop your video file at: public/hero-clouds.mp4
        The playbackRate is set to 0.5 for slow motion.
        Falls back to the static cloud image if video fails to load.
      */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover"
        poster="/hero-clouds.png"
        onLoadedMetadata={(e) => {
          (e.target as HTMLVideoElement).playbackRate = 0.5;
        }}
      >
        <source src="/hero-clouds.mp4" type="video/mp4" />
      </video>

      {/* Fallback static image (shows if video hasn't loaded yet or isn't available) */}
      <img
        src="/hero-clouds.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-black/40" />

      {/* Bottom vignette for smooth transition to next section */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 30%, transparent 50%, rgba(12,12,14,0.7) 80%, rgba(12,12,14,1) 100%)",
        }}
      />

      {/* Architectural data grid — structured zones for content + weather data */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="finegrid-hero" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(255,255,255,0.016)" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="0" y2="60" stroke="rgba(255,255,255,0.016)" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Fine background grid fill */}
        <rect width="100%" height="100%" fill="url(#finegrid-hero)" />

        {/* Outer border frame */}
        <rect x="2%" y="1.2%" width="96%" height="97.6%" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />

        {/* ── Title block strip (H1–H2): 5% to 8.5% ── */}
        <line x1="2%" y1="5%" x2="98%" y2="5%" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <line x1="2%" y1="8.5%" x2="98%" y2="8.5%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        {/* Title block cell dividers (V1–V5 within strip) */}
        <line x1="4%" y1="5%" x2="4%" y2="8.5%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        <line x1="43%" y1="5%" x2="43%" y2="8.5%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        <line x1="62%" y1="5%" x2="62%" y2="8.5%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        <line x1="82%" y1="5%" x2="82%" y2="8.5%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        <line x1="96%" y1="5%" x2="96%" y2="8.5%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

        {/* ── Section annotations (text in title block) ── */}
        <text x="5%" y="7.4%" fill="rgba(255,255,255,0.06)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.08em">S 01 · IDENT</text>
        <text x="44%" y="7.4%" fill="rgba(255,255,255,0.06)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.08em">S 02 · ATMOSPHERIC</text>
        <text x="83%" y="7.4%" fill="rgba(255,255,255,0.06)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.08em">S 03 · WIND</text>
        <text x="63%" y="7.4%" fill="rgba(255,255,255,0.05)" fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.08em" textAnchor="start">DWG VV-001 REV C</text>

        {/* ── Full-height vertical column lines (H2 to H9) ── */}
        <line x1="4%" y1="8.5%" x2="4%" y2="98.8%" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <line x1="43%" y1="8.5%" x2="43%" y2="98.8%" stroke="rgba(255,255,255,0.055)" strokeWidth="0.5" />
        <line x1="62%" y1="8.5%" x2="62%" y2="98.8%" stroke="rgba(255,255,255,0.035)" strokeWidth="0.5" />
        <line x1="82%" y1="8.5%" x2="82%" y2="98.8%" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        <line x1="96%" y1="8.5%" x2="96%" y2="98.8%" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

        {/* ── Full-width horizontal row lines ── */}
        <line x1="2%" y1="16%" x2="98%" y2="16%" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        <line x1="2%" y1="28%" x2="98%" y2="28%" stroke="rgba(255,255,255,0.045)" strokeWidth="0.5" />
        <line x1="2%" y1="40%" x2="98%" y2="40%" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        <line x1="2%" y1="55%" x2="98%" y2="55%" stroke="rgba(255,255,255,0.035)" strokeWidth="0.5" />
        <line x1="2%" y1="72%" x2="98%" y2="72%" stroke="rgba(255,255,255,0.035)" strokeWidth="0.5" />
        <line x1="2%" y1="85%" x2="98%" y2="85%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

        {/* ── Footer zone section labels ── */}
        <text x="5%" y="84%" fill="rgba(255,255,255,0.05)" fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.08em">S 04 · POSITION</text>
        <text x="44%" y="84%" fill="rgba(255,255,255,0.05)" fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.08em">S 05 · THERMAL</text>

        {/* ── Intersection tick marks at data anchor points ── */}
        {/* TEMP node (V2, H3) */}
        <line x1="42.5%" y1="16%" x2="43.5%" y2="16%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <line x1="43%" y1="15.5%" x2="43%" y2="16.5%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        {/* FEELS LIKE node (V2, H4) */}
        <line x1="42.5%" y1="28%" x2="43.5%" y2="28%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <line x1="43%" y1="27.5%" x2="43%" y2="28.5%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        {/* WIND DIR node (V4, H3) */}
        <line x1="81.5%" y1="16%" x2="82.5%" y2="16%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <line x1="82%" y1="15.5%" x2="82%" y2="16.5%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        {/* WIND SPD node (V4, H4) */}
        <line x1="81.5%" y1="28%" x2="82.5%" y2="28%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <line x1="82%" y1="27.5%" x2="82%" y2="28.5%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        {/* GUST node (V4, H5) */}
        <line x1="81.5%" y1="40%" x2="82.5%" y2="40%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <line x1="82%" y1="39.5%" x2="82%" y2="40.5%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        {/* HUMIDITY node (V3, H5) */}
        <line x1="61.5%" y1="40%" x2="62.5%" y2="40%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <line x1="62%" y1="39.5%" x2="62%" y2="40.5%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        {/* LAT node (V1, H8) */}
        <line x1="3.5%" y1="85%" x2="4.5%" y2="85%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <line x1="4%" y1="84.5%" x2="4%" y2="85.5%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        {/* DEW POINT node (V2, H8) */}
        <line x1="42.5%" y1="85%" x2="43.5%" y2="85%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <line x1="43%" y1="84.5%" x2="43%" y2="85.5%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        {/* ELEV node (V4, H8) */}
        <line x1="81.5%" y1="85%" x2="82.5%" y2="85%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <line x1="82%" y1="84.5%" x2="82%" y2="85.5%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      </svg>

      {/* Wind barb canvas — animated flow field, mouse-interactive */}
      <WindCanvas sectionRef={sectionRef} />

      {/* Scattered weather data HUD — small animated labels */}
      <WeatherDataOverlay />

      <div className="relative z-10 mr-auto flex min-h-dvh w-full max-w-[1200px] flex-col px-5 ml-[max(0px,calc((100vw-1200px)/2-200px))]">
        {/* Logo pinned near top */}
        <motion.div
          {...anim(0)}
          className="flex items-center gap-2.5 pt-[100px]"
        >
          <LogoMark size={24} />
          <span className="font-mono text-lg font-normal text-white">
            velovane
          </span>
        </motion.div>

        {/* Content vertically centered in remaining space */}
        <div className="flex flex-1 items-center pt-[300px]">
          <div className="flex flex-col items-start text-left">
            {/* Status badge */}
          <motion.div
            {...anim(0.15)}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-go opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-go" />
            </span>
            <span className="font-mono text-[10px] tracking-wide text-white/60">
              Launching iOS 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...anim(0.3)}
            className="mb-3 max-w-lg font-mono text-3xl font-light leading-tight tracking-tight text-white md:text-5xl"
          >
            Should I ride today?
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...anim(0.4)}
            className="mb-8 font-mono text-sm font-light text-white/60 md:text-base"
          >
            Answered in under 5 seconds.
          </motion.p>

          {/* CTA */}
          <motion.div {...anim(0.5)}>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-mono text-xs font-medium text-surface-dark transition-colors hover:bg-n-200"
            >
              See how it works
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="mt-px"
              >
                <path
                  d="M8 3L8 13M8 13L13 8M8 13L3 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-vv-blue/30 to-transparent" />

    </section>
  );
}
