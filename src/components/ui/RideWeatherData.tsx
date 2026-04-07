"use client";

import { type MotionValue, motion, useTransform } from "framer-motion";
import {
  ROUTE_COORDS,
  ROUTE_BEARINGS,
  bearingAtPct,
  getWindRelation,
} from "@/lib/route-coordinates";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const COMPASS = [
  "N","NNE","NE","ENE","E","ESE","SE","SSE",
  "S","SSW","SW","WSW","W","WNW","NW","NNW",
] as const;

function degToCompass(deg: number): string {
  const idx = Math.round(((deg % 360) + 360) % 360 / 22.5) % 16;
  return COMPASS[idx];
}

function fmtTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = Math.round(totalMinutes % 60);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

function fmtElapsed(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = Math.round(totalMinutes % 60);
  return `${h}:${String(m).padStart(2, "0")}`;
}

/* ------------------------------------------------------------------ */
/*  Color helpers                                                      */
/* ------------------------------------------------------------------ */

/** Hex color interpolation for the accent border */
function lerpColor(a: string, b: string, t: number): string {
  const parse = (hex: string) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
  const [r1, g1, b1] = parse(a);
  const [r2, g2, b2] = parse(b);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const bl = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r},${g},${bl})`;
}

const BLUE = "#3b82f6";
const YELLOW = "#eab308";
const RED = "#ef4444";
const GREEN = "#22c55e";
const ORANGE = "#f97316";

/* ------------------------------------------------------------------ */
/*  Card datum row                                                     */
/* ------------------------------------------------------------------ */

function DatumRow({
  label,
  value,
  valueColor,
  className = "",
}: {
  label: string;
  value: MotionValue<string>;
  valueColor?: MotionValue<string>;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline justify-between gap-2 md:gap-3 xl:gap-4 ${className}`}>
      <span className="text-[8px] tracking-[0.1em] text-white/30 uppercase md:text-[10px] xl:text-[12px]">
        {label}
      </span>
      <motion.span
        className="text-[9px] tabular-nums tracking-wider md:text-[11px] xl:text-[14px]"
        style={{ color: valueColor ?? "rgba(255,255,255,0.7)" }}
      >
        {value}
      </motion.span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function RideWeatherData({
  progress,
}: {
  progress: MotionValue<number>;
  /** Kept for backward-compatibility with callers — no longer used internally. */
  reducedMotion?: boolean;
}) {
  // ── UNIFIED TIMELINE ──
  // Ride starts 10:00 AM (30 min after VeloVane's window closed at 9:30 AM).
  // Wind holds WSW through 10:30 AM, shifts to ENE by 11:30 AM.
  // Ride takes 120 min, ends at 12:00 PM.
  // Progress 0.30 = 10:00 AM, 0.40 = 10:30 AM, 0.50 = 11:00 AM,
  //          0.60 = 11:30 AM, 0.70 = 12:00 PM.

  // ── Wind direction: WSW (240°) → S (180°) → ENE (60°) ──
  const windDirDeg = useTransform(
    progress,
    [0.30, 0.40, 0.50, 0.60, 0.70],
    [240, 240, 180, 60, 60],
  );
  const windDirStr = useTransform(windDirDeg, (deg) => {
    const d = ((deg % 360) + 360) % 360;
    return `${degToCompass(d)} ${Math.round(d)}\u00B0`;
  });

  // ── Wind speed — picks up slightly during shift ──
  const windSpdRaw = useTransform(progress, [0.30, 0.40, 0.55, 0.70], [12, 12, 16, 14]);
  const windSpdStr = useTransform(windSpdRaw, (v) => `${v.toFixed(0)} mph`);

  // ── Gust ──
  const gustRaw = useTransform(progress, [0.30, 0.50, 0.70], [18, 22, 20]);
  const gustStr = useTransform(gustRaw, (v) => `${Math.round(v)} mph`);

  // ── Temperature ──
  const tempRaw = useTransform(progress, [0.30, 0.70], [58, 64]);
  const tempStr = useTransform(tempRaw, (v) => `${v.toFixed(1)}\u00B0F`);

  // ── Feels like ──
  const feelsRaw = useTransform(progress, [0.30, 0.50, 0.70], [52, 55, 58]);
  const feelsStr = useTransform(feelsRaw, (v) => `${v.toFixed(1)}\u00B0F`);

  // ── Distance ──
  const distRaw = useTransform(progress, [0.30, 0.70], [0, 20.8]);
  const distStr = useTransform(distRaw, (v) => `${v.toFixed(1)} mi`);

  // ── Elapsed — 120 min ride (2 hours) ──
  const elapsedRaw = useTransform(progress, [0.30, 0.70], [0, 120]);
  const elapsedStr = useTransform(elapsedRaw, (v) => fmtElapsed(v));

  // ── Time (starts at 10:00 AM = 600 minutes, ends at 12:00 PM = 720) ──
  const timeRaw = useTransform(progress, [0.30, 0.70], [600, 720]);
  const timeStr = useTransform(timeRaw, (v) => fmtTime(v));

  // ── Power (watts) ──
  // Steady into headwind → spikes fighting shifting wind → fades as rider tires
  const powerRaw = useTransform(
    progress,
    [0.30, 0.40, 0.50, 0.60, 0.70],
    [185, 190, 212, 180, 148],
  );
  const powerStr = useTransform(powerRaw, (v) => `${Math.round(v)} w`);

  // ── Speed (rider speed) ──
  // Outbound headwind (13-13.5) → turn north near Wallers, brief tailwind spike (16.5)
  // → wind shifts, return headwind (13 → 10.5) → grinding home cooked (9)
  const speedRaw = useTransform(
    progress,
    [0.30, 0.40, 0.45, 0.50, 0.60, 0.70],
    [13.0, 13.5, 16.5, 13.0, 10.5, 9.0],
  );
  const speedStr = useTransform(speedRaw, (v) => `${v.toFixed(1)} mph`);

  // ── Effort indicator ──
  const effortStr = useTransform(progress, (p) => {
    if (p < 0.40) return "Steady";    // 10:00-10:30, outbound into headwind
    if (p < 0.50) return "Moderate";  // 10:30-11:00, wind shifting
    if (p < 0.62) return "Hard";      // 11:00-11:36, headwind return
    return "Maxed";                    // 11:36-12:00, grinding home
  });
  const effortColor = useTransform(progress, (p) => {
    if (p < 0.40) return GREEN;
    if (p < 0.50) return YELLOW;
    if (p < 0.62) return ORANGE;
    return RED;
  });

  // ── NEW: Headwind/Tailwind/Crosswind label ──
  const windRelStr = useTransform(
    [progress, windDirDeg] as [MotionValue<number>, MotionValue<number>],
    ([p, windDeg]) => {
      // Map scroll progress to path percentage (0.30→0.70 maps to 0→1)
      const pathPct = Math.max(0, Math.min(1, (p - 0.3) / 0.4));
      const riderBearing = bearingAtPct(ROUTE_BEARINGS, pathPct);
      return getWindRelation(windDeg, riderBearing);
    },
  );
  const windRelColor = useTransform(windRelStr, (rel) => {
    if (rel === "Tailwind") return GREEN;
    if (rel === "Crosswind") return YELLOW;
    return RED;
  });

  // ── Accent color for card border ──
  // Blue (steady, 0.30-0.40) → Yellow (shifting, 0.40-0.50) → Red (headwind return, 0.50+)
  const accentColor = useTransform(progress, (p) => {
    if (p < 0.40) return BLUE;
    if (p < 0.48) return lerpColor(BLUE, YELLOW, (p - 0.40) / 0.08);
    if (p < 0.52) return YELLOW;
    return lerpColor(YELLOW, RED, Math.min(1, (p - 0.52) / 0.08));
  });

  // ── Value colors for degrading metrics ──
  // Speed drops after wind shift (progress > 0.50)
  const speedColor = useTransform(progress, (p) => {
    if (p < 0.50) return "rgba(255,255,255,0.7)";
    if (p < 0.58) return lerpColor("#ffffff", RED, (p - 0.50) / 0.08);
    return RED;
  });
  // Power spikes, then fades as rider gets cooked (progress > 0.55)
  const powerColor = useTransform(progress, (p) => {
    if (p < 0.55) return "rgba(255,255,255,0.7)";
    if (p < 0.62) return lerpColor("#ffffff", RED, (p - 0.55) / 0.07);
    return RED;
  });

  // Single card body — parent controls positioning and width.
  // Mobile: compact 2-column layout (weather | performance)
  // Desktop: vertical single-column layout with dividers
  return (
    <motion.div
      className="w-full rounded-xl border border-white/10 bg-surface-card/80 p-3 font-mono shadow-lg backdrop-blur-sm md:order-2 md:h-full md:p-4 xl:h-auto xl:rounded-2xl xl:p-5 xl:order-none"
      style={{ borderTopColor: accentColor, borderTopWidth: "2px" }}
    >
      {/* Header */}
      <div className="mb-2 flex items-baseline justify-between border-b border-white/6 pb-1.5 md:mb-3 md:pb-2 xl:mb-4 xl:pb-2.5">
        <span className="text-[8px] tracking-[0.12em] text-white/25 uppercase md:text-[10px] xl:text-[11px]">Ride Data</span>
        <motion.span className="text-[10px] tabular-nums md:text-[12px] xl:text-[13px]" style={{ color: accentColor }}>
          {timeStr}
        </motion.span>
      </div>

      {/* Mobile, Tablet, and mid-desktop: compact 2-column layout */}
      <div className="flex gap-x-4 md:gap-x-6 xl:hidden">
        {/* Weather column */}
        <div className="flex-1 space-y-1 md:space-y-1.5">
          <DatumRow label="Wind" value={windDirStr} />
          <DatumRow label="W.Spd" value={windSpdStr} />
          <DatumRow label="Gust" value={gustStr} />
          <DatumRow label="Temp" value={tempStr} />
        </div>
        {/* Performance column */}
        <div className="flex-1 space-y-1 md:space-y-1.5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[8px] tracking-[0.1em] text-white/30 uppercase md:text-[10px]">Wind</span>
            <motion.span
              className="text-[9px] font-semibold tabular-nums tracking-wider md:text-[11px]"
              style={{ color: windRelColor }}
            >
              {windRelStr}
            </motion.span>
          </div>
          <DatumRow label="Speed" value={speedStr} valueColor={speedColor} />
          <DatumRow label="Power" value={powerStr} valueColor={powerColor} />
          <DatumRow label="Effort" value={effortStr} valueColor={effortColor} />
        </div>
      </div>

      {/* Wide desktop (≥1350px): vertical single-column layout */}
      <div className="hidden xl:block">
        {/* Weather */}
        <div className="mb-4 space-y-2">
          <DatumRow label="Wind" value={windDirStr} />
          <DatumRow label="W.Spd" value={windSpdStr} />
          <DatumRow label="Gust" value={gustStr} />
          <DatumRow label="Temp" value={tempStr} />
          <DatumRow label="Feels" value={feelsStr} />
        </div>

        {/* Divider */}
        <div className="mb-4 h-px bg-white/6" />

        {/* Ride performance */}
        <div className="mb-4 space-y-2">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[12px] tracking-[0.1em] text-white/30 uppercase">Wind</span>
            <motion.span
              className="text-[14px] font-semibold tabular-nums tracking-wider"
              style={{ color: windRelColor }}
            >
              {windRelStr}
            </motion.span>
          </div>
          <DatumRow label="Speed" value={speedStr} valueColor={speedColor} />
          <DatumRow label="Power" value={powerStr} valueColor={powerColor} />
          <DatumRow label="Effort" value={effortStr} valueColor={effortColor} />
        </div>

        {/* Divider */}
        <div className="mb-4 h-px bg-white/6" />

        {/* Distance & time */}
        <div className="space-y-2">
          <DatumRow label="Distance" value={distStr} />
          <DatumRow label="Elapsed" value={elapsedStr} />
        </div>
      </div>
    </motion.div>
  );
}
