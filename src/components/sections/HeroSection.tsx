"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { LogoMark } from "../ui/Logo";
import heroBackground from "../../../hero-images/polina-kuzovkova-8ndjGq5tO1A-unsplash.jpg";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [submitLabel, setSubmitLabel] = useState("Notify me");

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
    <section
      ref={sectionRef}
      data-nav-tone="light"
      className="section-rounded-b relative isolate min-h-dvh overflow-hidden bg-transparent text-text-primary"
    >
      {/* Same stack as cloud video: cool wash + low-opacity media (multiply) + white ramp */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-0 min-h-dvh w-screen max-w-[100dvw] -translate-x-1/2 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(232, 242, 250, 0.6) 0%, rgba(232, 242, 250, 0.15) 40%, rgba(255, 255, 255, 1) 85%)",
        }}
      >
        <Image
          src={heroBackground}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 size-full object-cover object-top opacity-[0.32] mix-blend-multiply"
          aria-hidden
        />
        <div
          className="absolute inset-0 size-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.9) 90%, rgba(255,255,255,1) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid min-h-dvh max-w-[1400px] grid-cols-1 items-center gap-12 px-6 pb-10 pt-[100px] max-[900px]:min-h-0 min-[901px]:grid-cols-[1.1fr_0.9fr] min-[901px]:gap-16 min-[901px]:px-8 min-[901px]:pb-12 min-[901px]:pt-[120px]">
        {/* Left column */}
        <div className="relative">
          <motion.div {...anim(0)} className="mb-10 flex items-center gap-2.5">
            <span
              className="h-px w-5 shrink-0 bg-vv-blue"
              aria-hidden
            />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-secondary">
              Weather intelligence for cyclists
            </span>
          </motion.div>

          <motion.h1
            {...anim(0.08)}
            className="mb-7 max-w-[20ch] font-mono text-[clamp(40px,9vw,56px)] font-normal leading-[0.98] tracking-[-0.035em] text-text-primary min-[901px]:max-w-none min-[901px]:text-[clamp(48px,6.5vw,88px)]"
          >
            Should I
            <br />
            ride today?
          </motion.h1>

          <motion.p
            {...anim(0.16)}
            className="mb-12 max-w-[520px] text-lg font-normal leading-[1.55] text-text-secondary"
          >
            One answer in five seconds:{" "}
            <strong className="font-medium text-text-primary">go, wait, or skip</strong>, with your
            best ride window and why. The cycling weather app that replaces the three you&apos;re
            using now.
          </motion.p>

          <motion.form
            {...anim(0.24)}
            id="notify"
            className="mb-5 flex max-w-[480px] flex-col border border-n-300 bg-white transition-[border-color] duration-200 focus-within:border-text-primary sm:flex-row sm:items-stretch"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitLabel("✓ On the list");
            }}
          >
            <label htmlFor="hero-email" className="sr-only">
              Email for launch notification
            </label>
            <input
              id="hero-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@email.com"
              className="min-w-0 flex-1 border-0 bg-transparent px-[18px] py-4 font-mono text-sm text-text-primary outline-none placeholder:text-n-400"
            />
            <button
              type="submit"
              className="shrink-0 border-0 bg-text-primary px-6 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-vv-blue-darker sm:py-0"
            >
              {submitLabel}
            </button>
          </motion.form>

          <motion.p
            {...anim(0.28)}
            className="mb-10 text-xs tracking-[0.04em] text-text-tertiary"
          >
            Launching iOS 2026. &nbsp;·&nbsp;{" "}
            <a
              href="#how"
              className="text-text-secondary underline decoration-1 underline-offset-[3px] transition-colors hover:text-text-primary"
            >
              See how it works →
            </a>
          </motion.p>

          <motion.div
            {...anim(0.32)}
            className="max-w-[480px] border-t border-n-200 pt-8 text-[13px] leading-[1.55] text-text-secondary"
          >
            <strong className="font-medium text-text-primary">
              Built by a cyclist who got tired of guessing.
            </strong>{" "}
            Started as a static wind tracker for one rider. Now it&apos;s a weather app that thinks
            like a cyclist, because it was made by one.
          </motion.div>
        </div>

        {/* Right column: recommendation card */}
        <motion.div
          {...anim(0.12)}
          className="relative flex min-h-[420px] items-center justify-center max-[900px]:min-h-0 min-[901px]:min-h-[540px]"
        >
          <div className="relative w-full max-w-[420px]">
            <div className="absolute -top-[26px] right-0 left-0 flex justify-between text-[9px] uppercase tracking-[0.16em] text-text-tertiary">
              <span>DWG VV-001 REV D</span>
              <span>RECO · PRIMARY</span>
            </div>
            <div
              className="pointer-events-none absolute -top-3 -left-3 size-4 border-l border-t border-vv-blue/60"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-3 -bottom-3 size-4 border-r border-b border-vv-blue/60"
              aria-hidden
            />

            <div
              className="border border-n-200 bg-white px-7 pb-6 pt-7 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_20px_60px_-20px_rgba(38,90,130,0.18)]"
            >
              <div className="mb-5 flex items-center justify-between border-b border-n-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex shrink-0 items-center" aria-hidden>
                    <LogoMark size={22} />
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-text-primary">
                    VeloVane
                  </span>
                </div>
                <span className="text-[10px] tracking-[0.12em] text-text-tertiary">
                  NOW · 6:01 AM
                </span>
              </div>

              <div className="mb-3.5 flex items-center gap-3">
                <div className="inline-flex items-center gap-1.5 bg-go-light px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-go-dark">
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-go-mid hero-verdict-pulse"
                    aria-hidden
                  />
                  Go
                </div>
                <span className="text-[10px] uppercase tracking-[0.14em] text-text-tertiary">
                  Today&apos;s recommendation
                </span>
              </div>

              <div className="mb-6">
                <div className="mb-1 font-mono text-4xl font-normal leading-none tracking-[-0.02em] text-text-primary">
                  7:00 - 9:30 AM
                </div>
                <div className="text-xs tracking-[0.02em] text-text-secondary">
                  2.5 hour window - starts in 59 min
                </div>
              </div>

              <div className="mb-5 grid grid-cols-3 gap-px bg-n-200">
                {[
                  { label: "On bike", value: "52", unit: "°F" },
                  { label: "Wind", value: "12", unit: "mph W" },
                  { label: "Precip", value: "4", unit: "%" },
                ].map((m) => (
                  <div key={m.label} className="bg-white px-2.5 py-3">
                    <div className="mb-1 text-[9px] uppercase tracking-[0.14em] text-text-tertiary">
                      {m.label}
                    </div>
                    <div className="font-mono text-lg font-medium tracking-[-0.01em] text-text-primary">
                      {m.value}
                      <span className="ml-0.5 text-[11px] font-normal text-text-secondary">
                        {m.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="border-t border-n-100 pt-[18px] text-[13px] leading-[1.55] text-text-secondary">
                <strong className="font-medium text-text-primary">
                  Steady westerly through the window.
                </strong>{" "}
                Head out into it, tailwind home: the trade you signed up for. Shift arrives around
                10:30 AM. You&apos;ll be back.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
