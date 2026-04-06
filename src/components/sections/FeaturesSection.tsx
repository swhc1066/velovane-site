"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FEATURES } from "@/lib/constants";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

/** Counts from 0 to target when in view */
function CountUp({ target, duration = 1.2 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) { setValue(target); return; }
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration, prefersReduced]);

  return <span ref={ref}>{value}</span>;
}

/* ─── Panel 0: Notification — drops in from top ─── */
function NotificationPanel() {
  const f = FEATURES[0];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 md:py-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease }}
        >
          <div className="mb-12 flex items-center gap-3">
            <div className="h-px w-6 bg-vv-blue/30" />
            <span className="font-mono text-[10px] font-light uppercase tracking-widest text-vv-blue/60">
              A morning with VeloVane
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="h-1 w-px bg-n-600" />
                <span className="font-mono text-[13px] font-medium tracking-wider text-vv-blue">{f.time}</span>
              </div>
              <h3 className="mb-6 font-mono text-3xl font-medium leading-tight text-white md:text-5xl">{f.title}</h3>
              <p className="max-w-lg text-base font-light leading-relaxed text-n-400">{f.description}</p>
            </motion.div>
          </div>

          {/* Notification slides down from top like an iOS notification */}
          <div className="md:col-span-5 md:col-start-8">
            <motion.div
              initial={{ opacity: 0, y: -60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="relative rounded-2xl border border-white/10 bg-surface-card p-6 shadow-[0_0_60px_rgba(76,175,80,0.08)]">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-vv-blue/20">
                    <span className="font-mono text-xs font-medium text-vv-blue">V</span>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-n-400">VeloVane</div>
                    <div className="font-mono text-[10px] text-n-600">now</div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6, ease }}
                >
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-go/15 px-3 py-1">
                    <span className="h-2 w-2 rounded-full bg-go" />
                    <span className="font-mono text-xs font-medium text-go">GO — RIDE WINDOW</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.75, ease }}
                >
                  <div className="mb-4 font-mono text-2xl font-medium text-white">7:00 – 9:30 AM</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.9, ease }}
                >
                  <div className="flex gap-6 border-t border-white/6 pt-4">
                    <div>
                      <div className="font-mono text-[10px] uppercase text-n-600">Temp</div>
                      <div className="font-mono text-sm text-n-300">52° on bike</div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase text-n-600">Wind</div>
                      <div className="font-mono text-sm text-n-300">12mph W</div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase text-n-600">Precip</div>
                      <div className="font-mono text-sm text-n-300">4%</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Panel 1: Phone left, copy right — reversed layout ─── */
function PhonePanel() {
  const f = FEATURES[1];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative flex min-h-screen items-center">
      <div className="absolute top-0 right-0 left-0 mx-auto max-w-[1200px] px-5">
        <div className="h-px bg-white/6" />
      </div>
      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 md:py-0">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
          {/* Phone — left side on desktop */}
          <div className="flex justify-center md:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: -40 }}
              animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease }}
            >
              <div
                className="relative overflow-hidden rounded-[40px] border border-white/10 bg-surface-card shadow-[0_0_100px_rgba(91,164,212,0.1)]"
                style={{ width: 280, height: 607 }}
              >
                <div className="absolute top-0 left-1/2 z-10 h-7 w-28 -translate-x-1/2 rounded-b-2xl bg-surface-dark" />
                <img
                  src="/mockups/dashboard.png"
                  alt="VeloVane dashboard showing Go recommendation and ride window"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </motion.div>
          </div>

          {/* Copy — right side on desktop */}
          <div className="md:col-span-6 md:col-start-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="h-1 w-px bg-n-600" />
                <span className="font-mono text-[13px] font-medium tracking-wider text-vv-blue">{f.time}</span>
              </div>
              <h3 className="mb-6 font-mono text-3xl font-medium leading-tight text-white md:text-5xl">{f.title}</h3>
              <p className="max-w-lg text-base font-light leading-relaxed text-n-400">{f.description}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Panel 2: Wind — number counts up, arrow slides in ─── */
function WindPanel() {
  const f = FEATURES[2];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative flex min-h-screen items-center">
      <div className="absolute top-0 right-0 left-0 mx-auto max-w-[1200px] px-5">
        <div className="h-px bg-white/6" />
      </div>
      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 md:py-0">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="h-1 w-px bg-n-600" />
                <span className="font-mono text-[13px] font-medium tracking-wider text-vv-blue">{f.time}</span>
              </div>
              <h3 className="mb-6 font-mono text-3xl font-medium leading-tight text-white md:text-5xl">{f.title}</h3>
              <p className="max-w-md text-base font-light leading-relaxed text-n-400">{f.description}</p>
            </motion.div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="flex flex-col items-center gap-6 md:items-end">
              {/* Number counts up */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.2, ease }}
                className="flex items-baseline gap-3"
              >
                <span className="font-mono text-8xl font-light tracking-tight text-white md:text-[140px]">
                  <CountUp target={12} duration={1.2} />
                </span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.8, ease }}
                  className="font-mono text-2xl font-light text-n-500 md:text-3xl"
                >
                  mph
                </motion.span>
              </motion.div>

              {/* Arrow slides in from right */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9, ease }}
                className="flex items-center gap-4"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-vv-blue">
                  <path d="M24 16H8M8 16L14 10M8 16L14 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-mono text-2xl font-medium text-white">W</span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.2, ease }}
                  className="rounded-full border border-go/30 bg-go/10 px-3 py-1 font-mono text-xs font-medium text-go"
                >
                  Steady
                </motion.span>
              </motion.div>

              {/* Sub-details */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.4, ease }}
                className="flex gap-6 font-mono text-sm text-n-500"
              >
                <span>Gusts to 18mph</span>
                <span className="text-n-600">·</span>
                <span>Crosswind: low</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Panel 3: Temperature — cascading reveal top to bottom ─── */
function TempPanel() {
  const f = FEATURES[3];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative flex min-h-screen items-center">
      <div className="absolute top-0 right-0 left-0 mx-auto max-w-[1200px] px-5">
        <div className="h-px bg-white/6" />
      </div>
      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 md:py-0">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16 md:[direction:rtl]">
          <div className="md:col-span-5 md:[direction:ltr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="h-1 w-px bg-n-600" />
                <span className="font-mono text-[13px] font-medium tracking-wider text-vv-blue">{f.time}</span>
              </div>
              <h3 className="mb-6 font-mono text-3xl font-medium leading-tight text-white md:text-5xl">{f.title}</h3>
              <p className="max-w-md text-base font-light leading-relaxed text-n-400">{f.description}</p>
            </motion.div>
          </div>

          <div className="md:col-span-6 md:[direction:ltr]">
            <div className="flex flex-col items-center gap-2">
              {/* 54° appears first */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease }}
                className="text-center"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-n-600">Standard</div>
                <span className="font-mono text-8xl font-normal tracking-tight md:text-[120px]" style={{ color: "rgba(249,168,37,0.7)" }}>
                  54°
                </span>
              </motion.div>

              {/* Arrow animates down */}
              <motion.svg
                width="24" height="40" viewBox="0 0 24 40" fill="none"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={inView ? { opacity: 1, scaleY: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7, ease }}
                style={{ transformOrigin: "top" }}
                className="text-n-600"
              >
                <path d="M12 4V36M12 36L6 30M12 36L18 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>

              {/* 47° reveals after arrow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0, ease }}
                className="text-center"
              >
                <span className="font-mono text-8xl font-normal tracking-tight md:text-[120px]" style={{ color: "rgba(91,164,212,0.8)" }}>
                  47°
                </span>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-vv-blue/60">On the bike</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Panel 4: Timeline — bar draws across, window fills in ─── */
function TimelinePanel() {
  const f = FEATURES[4];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative flex min-h-[70vh] items-center">
      <div className="absolute top-0 right-0 left-0 mx-auto max-w-[1200px] px-5">
        <div className="h-px bg-white/6" />
      </div>
      <div className="mx-auto w-full max-w-[800px] px-5 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-1 w-px bg-n-600" />
            <span className="font-mono text-[13px] font-medium tracking-wider text-vv-blue">{f.time}</span>
          </div>
          <h3 className="mb-6 font-mono text-3xl font-medium leading-tight text-white md:text-5xl">{f.title}</h3>
          <p className="mx-auto mb-12 max-w-lg text-base font-light leading-relaxed text-n-400">{f.description}</p>
        </motion.div>

        <div className="mx-auto max-w-lg">
          {/* Time labels fade in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.4, ease }}
            className="mb-2 flex justify-between font-mono text-[10px] text-n-600"
          >
            <span>5 AM</span><span>7 AM</span><span>9 AM</span><span>11 AM</span><span>1 PM</span>
          </motion.div>

          {/* Bar track appears */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            style={{ transformOrigin: "left" }}
            className="relative h-3 w-full overflow-hidden rounded-full bg-surface-card"
          >
            {/* Dawn marker drops in */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.3, delay: 1.1, ease }}
              className="absolute top-0 bottom-0 w-px bg-caution/40"
              style={{ left: "15%", transformOrigin: "top" }}
            />
            {/* Ride window fills */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.3, ease }}
              className="absolute top-0 bottom-0 rounded-full bg-go/30"
              style={{ left: "25%", width: "31%", transformOrigin: "left" }}
            />
            {/* Dusk marker */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.3, delay: 1.1, ease }}
              className="absolute top-0 bottom-0 w-px bg-caution/40"
              style={{ left: "88%", transformOrigin: "top" }}
            />
          </motion.div>

          {/* Labels appear last */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.6, ease }}
            className="mt-2 flex font-mono text-[10px]"
          >
            <div className="text-caution/60" style={{ marginLeft: "13%" }}>Dawn</div>
            <div className="text-center text-go/60" style={{ marginLeft: "10%", width: "31%" }}>Ride Window</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export function FeaturesSection() {
  return (
    <section className="section-rounded-t section-rounded-b relative bg-surface-dark" id="features">
      <div className="pointer-events-none absolute inset-0 hidden opacity-10 md:block"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="relative">
        <NotificationPanel />
        <PhonePanel />
        <WindPanel />
        <TempPanel />
        <TimelinePanel />
      </div>
    </section>
  );
}
