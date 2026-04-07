"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export function VeloVaneRevealSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const anim = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  const cardAnim = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 32, scale: 0.96 },
        animate: inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 32, scale: 0.96 },
        transition: { duration: 0.9, delay: 0.4, ease: EASE },
      };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#0a0a0c] py-24 md:py-40"
    >
      {/* Architectural grid backdrop */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="finegrid-reveal"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="60"
              y2="0"
              stroke="rgba(255,255,255,0.02)"
              strokeWidth="0.5"
            />
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="60"
              stroke="rgba(255,255,255,0.02)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#finegrid-reveal)" />
        {/* Soft radial highlight behind card */}
        <radialGradient id="reveal-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(59,130,246,0.08)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0)" />
        </radialGradient>
        <rect width="100%" height="100%" fill="url(#reveal-glow)" />
      </svg>

      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        {/* Section label */}
        <motion.div
          {...anim(0)}
          className="mb-5 font-mono text-[10px] tracking-[0.18em] text-vv-blue uppercase md:mb-6 md:text-[11px]"
        >
          · With VeloVane
        </motion.div>

        {/* Headline */}
        <motion.h2
          {...anim(0.1)}
          className="mb-5 font-mono text-3xl font-medium leading-[1.15] text-white md:mb-7 md:text-5xl"
        >
          That ride was avoidable.
        </motion.h2>

        {/* Subhead */}
        <motion.p
          {...anim(0.2)}
          className="mb-12 max-w-2xl font-mono text-sm leading-relaxed text-n-400 md:mb-20 md:text-base"
        >
          VeloVane saw the wind shift coming. It would have told you the
          night before — and again at breakfast — exactly when to ride.
        </motion.p>

        {/* The contrast card */}
        <motion.div
          {...cardAnim}
          className="relative mx-auto max-w-md"
        >
          {/* Glow */}
          <div
            className="pointer-events-none absolute -inset-4 rounded-2xl blur-2xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0) 70%)",
            }}
          />

          <div className="relative rounded-xl border border-[#1e3a5f] bg-[#0d1b2a] p-8 text-center shadow-[0_0_60px_rgba(59,130,246,0.12)] md:p-10">
            {/* VeloVane brand */}
            <div className="mb-6 flex items-center justify-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-vv-blue text-[11px] font-bold text-white">
                V
              </div>
              <span className="font-mono text-[11px] tracking-[0.18em] text-[#94a3b8]">
                VELOVANE
              </span>
            </div>

            {/* Recommendation label */}
            <div className="mb-3 font-mono text-[9px] tracking-[0.15em] text-[#64748b] uppercase md:text-[10px]">
              Recommended ride window
            </div>

            {/* Main time */}
            <div className="mb-1 font-mono text-4xl font-bold tracking-tight text-vv-blue md:text-5xl">
              7:00 AM
            </div>
            <div className="mb-5 font-mono text-[10px] tracking-wider text-[#64748b] md:mb-6 md:text-[11px]">
              2.5 hour window · ends 9:30 AM
            </div>

            {/* Separator */}
            <div className="mx-auto mb-5 h-px w-16 bg-white/10 md:mb-6" />

            {/* Rationale rows */}
            <div className="space-y-2.5 text-left font-mono text-[11px] leading-relaxed text-[#cbd5e1] md:text-[13px]">
              <div className="flex items-start gap-3">
                <span className="text-vv-blue">·</span>
                <span>Wind holds steady westerly through the window.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-vv-blue">·</span>
                <span>Head out into it, tailwind home — the trade you signed up for.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-vv-blue">·</span>
                <span>Shift to ENE arrives around 10:30 AM. You&apos;d be home.</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Closing line */}
        <motion.p
          {...anim(0.6)}
          className="mt-12 text-center font-mono text-[11px] tracking-wider text-n-400 md:mt-16 md:text-xs"
        >
          One card. Open the app, get the answer, close the app.
        </motion.p>
      </div>
    </section>
  );
}
