"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const COMPASS = [
  "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
] as const;

function degToCompass(deg: number): string {
  const idx = Math.round(((deg % 360) + 360) % 360 / 22.5) % 16;
  return COMPASS[idx];
}

function fmtNum(n: number, decimals: number): string {
  return n.toFixed(decimals);
}

/* ------------------------------------------------------------------ */
/*  useAnimatedNumber — RAF-based smooth tweening                      */
/* ------------------------------------------------------------------ */

function useAnimatedNumber(
  initial: number,
  range: number,
  intervalMs: number,
  decimals: number,
  disabled: boolean,
) {
  const [display, setDisplay] = useState(initial);
  const target = useRef(initial);
  const current = useRef(initial);
  const raf = useRef<number>(0);
  const lastT = useRef(0);

  // Pick a new random target on an interval
  useEffect(() => {
    if (disabled) return;
    const id = setInterval(() => {
      target.current = initial + (Math.random() - 0.5) * 2 * range;
    }, intervalMs);
    return () => clearInterval(id);
  }, [initial, range, intervalMs, disabled]);

  // Smoothly interpolate towards target
  useEffect(() => {
    if (disabled) return;
    const step = (t: number) => {
      if (!lastT.current) lastT.current = t;
      const dt = Math.min((t - lastT.current) / 1000, 0.1);
      lastT.current = t;

      const lerp = 1 - Math.pow(0.08, dt); // exponential ease
      current.current += (target.current - current.current) * lerp;
      setDisplay(Number(current.current.toFixed(decimals)));
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [decimals, disabled]);

  return display;
}

/* ------------------------------------------------------------------ */
/*  Data configuration                                                 */
/* ------------------------------------------------------------------ */

interface DatumConfig {
  label: string;
  initial: number;
  range: number;
  intervalMs: number;
  decimals: number;
  unit: string;
  format?: "compass" | "lat" | "lon" | "number";
  position: React.CSSProperties;
  delay: number;
}

const DATA: DatumConfig[] = [
  // ── S 03 · WIND (V4 column, right data zone) ──
  {
    label: "WIND DIR",
    initial: 342,
    range: 15,
    intervalMs: 4000,
    decimals: 0,
    unit: "°",
    format: "compass",
    position: { top: "9.5%", left: "83%" },       // cell [V4-V5, H2-H3] — logo row
    delay: 0.7,
  },
  {
    label: "WIND SPD",
    initial: 12.4,
    range: 1.5,
    intervalMs: 2000,
    decimals: 1,
    unit: " kts",
    position: { top: "17%", left: "83%" },       // cell [V4-V5, H3-H4]
    delay: 0.8,
  },
  {
    label: "GUST",
    initial: 18.7,
    range: 4,
    intervalMs: 3000,
    decimals: 1,
    unit: " kts",
    position: { top: "41%", left: "83%" },       // cell [V4-V5, H5-H6]
    delay: 0.85,
  },
  // ── S 02 · ATMOSPHERIC (V2 column, mid data zone) ──
  {
    label: "TEMP",
    initial: 62.3,
    range: 0.4,
    intervalMs: 5000,
    decimals: 1,
    unit: "°F",
    position: { top: "9.5%", left: "44%" },       // cell [V2-V3, H2-H3] — logo row
    delay: 0.9,
  },
  {
    label: "FEELS LIKE",
    initial: 58.1,
    range: 0.5,
    intervalMs: 5500,
    decimals: 1,
    unit: "°F",
    position: { top: "17%", left: "44%" },       // cell [V2-V3, H3-H4]
    delay: 0.95,
  },
  // ── S 05 · THERMAL (V2 column, footer zone) ──
  {
    label: "DEW POINT",
    initial: 47.2,
    range: 0.3,
    intervalMs: 7000,
    decimals: 1,
    unit: "°F",
    position: { top: "86%", left: "44%" },       // cell [V2-V3, H8-H9]
    delay: 1.0,
  },
  // ── S 04 · POSITION (V1 column, footer zone) ──
  {
    label: "LAT",
    initial: 37.7749,
    range: 0.002,
    intervalMs: 3000,
    decimals: 4,
    unit: "°N",
    format: "lat",
    position: { top: "17%", left: "5%" },         // cell [V1-V2, H3-H4] — below logo
    delay: 1.1,
  },
  {
    label: "LON",
    initial: -122.4194,
    range: 0.002,
    intervalMs: 3200,
    decimals: 4,
    unit: "°W",
    format: "lon",
    position: { top: "21%", left: "5%" },        // below LAT in same cell
    delay: 1.15,
  },
  // ── ELEV (V4 column, footer zone) ──
  {
    label: "ELEV",
    initial: 52,
    range: 1,
    intervalMs: 10000,
    decimals: 0,
    unit: "m ASL",
    position: { top: "86%", left: "83%" },       // cell [V4-V5, H8-H9]
    delay: 1.2,
  },
  // ── HUMIDITY (V3 column, mid zone) ──
  {
    label: "HUMIDITY",
    initial: 67,
    range: 2,
    intervalMs: 6000,
    decimals: 0,
    unit: "%",
    position: { top: "41%", left: "63%" },       // cell [V3-V4, H5-H6]
    delay: 1.05,
  },
  // ── BEARING (V2 column, footer zone) ──
  {
    label: "BEARING",
    initial: 248,
    range: 10,
    intervalMs: 4000,
    decimals: 0,
    unit: "°",
    format: "compass",
    position: { top: "90%", left: "44%" },       // below DEW POINT in same cell
    delay: 1.25,
  },
];

/* ------------------------------------------------------------------ */
/*  WeatherDatum — single animated label                               */
/* ------------------------------------------------------------------ */

function WeatherDatum({
  config,
  reducedMotion,
}: {
  config: DatumConfig;
  reducedMotion: boolean;
}) {
  const value = useAnimatedNumber(
    config.initial,
    config.range,
    config.intervalMs,
    config.decimals,
    reducedMotion,
  );

  let displayValue: string;
  if (config.format === "compass") {
    const deg = ((value % 360) + 360) % 360;
    displayValue = `${degToCompass(deg)} ${fmtNum(deg, 0)}${config.unit}`;
  } else if (config.format === "lon") {
    displayValue = `${fmtNum(Math.abs(value), config.decimals)}${config.unit}`;
  } else if (config.format === "lat") {
    displayValue = `${fmtNum(Math.abs(value), config.decimals)}${config.unit}`;
  } else {
    displayValue = `${fmtNum(value, config.decimals)}${config.unit}`;
  }

  const entrance = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.8,
          delay: config.delay,
          ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
      };

  return (
    <motion.div
      {...entrance}
      className="absolute font-mono leading-tight"
      style={config.position}
    >
      <div className="text-[11px] tracking-[0.08em] text-white/15">
        {config.label}
      </div>
      <div className="text-[11px] tabular-nums tracking-wider text-white/20">
        {displayValue}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  WeatherDataOverlay — container for all data labels                 */
/* ------------------------------------------------------------------ */

export function WeatherDataOverlay() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] hidden md:block"
    >
      {DATA.map((config) => (
        <WeatherDatum
          key={config.label}
          config={config}
          reducedMotion={shouldReduceMotion}
        />
      ))}
    </div>
  );
}
