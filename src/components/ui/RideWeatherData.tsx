"use client";

import { type MotionValue, motion, useTransform } from "framer-motion";

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
/*  Card datum row                                                     */
/* ------------------------------------------------------------------ */

function DatumRow({
  label,
  value,
  className = "",
}: {
  label: string;
  value: MotionValue<string>;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline justify-between gap-2 md:gap-4 ${className}`}>
      <span className="text-[8px] tracking-[0.1em] text-white/30 uppercase md:text-[10px]">
        {label}
      </span>
      <motion.span className="text-[9px] tabular-nums tracking-wider text-white/70 md:text-[12px]">
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
  reducedMotion,
  anchorPosition,
}: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
  anchorPosition?: { x: number; y: number };
}) {
  // ── Interpolated motion values ──

  // Wind direction: 270 (W) → sweep through 180 (S) → 90 (E)
  const windDirDeg = useTransform(
    progress,
    [0.30, 0.45, 0.50, 0.55, 0.70],
    [270, 270, 180, 90, 90],
  );
  const windDirStr = useTransform(windDirDeg, (deg) => {
    const d = ((deg % 360) + 360) % 360;
    return `${degToCompass(d)} ${Math.round(d)}\u00B0`;
  });

  // Wind speed
  const windSpdRaw = useTransform(progress, [0, 1], [12, 12]);
  const windSpdStr = useTransform(windSpdRaw, (v) => `${v.toFixed(0)} mph`);

  // Gust
  const gustRaw = useTransform(progress, [0.30, 0.50, 0.70], [18, 16, 14]);
  const gustStr = useTransform(gustRaw, (v) => `${Math.round(v)} mph`);

  // Temperature
  const tempRaw = useTransform(progress, [0.30, 0.70], [52, 58]);
  const tempStr = useTransform(tempRaw, (v) => `${v.toFixed(1)}\u00B0F`);

  // Feels like
  const feelsRaw = useTransform(progress, [0.30, 0.50, 0.70], [47, 50, 55]);
  const feelsStr = useTransform(feelsRaw, (v) => `${v.toFixed(1)}\u00B0F`);

  // Distance
  const distRaw = useTransform(progress, [0.30, 0.70], [0, 20.8]);
  const distStr = useTransform(distRaw, (v) => `${v.toFixed(1)} mi`);

  // Elapsed
  const elapsedRaw = useTransform(progress, [0.30, 0.70], [0, 95]);
  const elapsedStr = useTransform(elapsedRaw, (v) => fmtElapsed(v));

  // Time
  const timeRaw = useTransform(progress, [0.30, 0.70], [420, 515]);
  const timeStr = useTransform(timeRaw, (v) => fmtTime(v));

  // Desktop: anchor below ARENBERG waypoint
  const desktopStyle = anchorPosition
    ? {
        left: `min(${((anchorPosition.x + 12) / 800) * 100}%, calc(100% - 15rem))`,
        top: `${((anchorPosition.y + 16) / 500) * 100}%`,
      }
    : { top: '2.5rem', right: '2.5rem' };

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* ── Mobile: full-width card at the top ── */}
      <div className="absolute inset-x-0 top-0 px-4 pt-19 md:hidden">
        <div className="flex gap-x-4 rounded-lg border border-white/10 border-t-vv-blue/15 bg-surface-card/80 p-2.5 font-mono shadow-lg backdrop-blur-sm">
          {/* Weather column */}
          <div className="flex-1 space-y-0.5">
            <div className="mb-1 flex items-baseline justify-between border-b border-white/6 pb-1">
              <span className="text-[7px] tracking-[0.12em] text-white/25 uppercase">Ride Data</span>
              <motion.span className="text-[8px] tabular-nums text-vv-blue">{timeStr}</motion.span>
            </div>
            <DatumRow label="Temp" value={tempStr} />
            <DatumRow label="Feels" value={feelsStr} />
            <DatumRow label="Wind" value={windDirStr} />
          </div>
          {/* Stats column */}
          <div className="flex-1 space-y-0.5">
            <div className="mb-1 flex items-baseline justify-between border-b border-white/6 pb-1">
              <span className="text-[7px] tracking-[0.12em] text-white/25 uppercase">Ride Stats</span>
            </div>
            <DatumRow label="Speed" value={windSpdStr} />
            <DatumRow label="Gust" value={gustStr} />
            <DatumRow label="Distance" value={distStr} />
            <DatumRow label="Elapsed" value={elapsedStr} />
          </div>
        </div>
      </div>

      {/* ── Desktop: anchored below ARENBERG label ── */}
      <div
        className="absolute hidden w-56 rounded-xl border border-white/10 border-t-vv-blue/15 bg-surface-card/80 p-4 font-mono shadow-lg backdrop-blur-sm md:block"
        style={desktopStyle}
      >
        {/* Header */}
        <div className="mb-2 flex items-baseline justify-between border-b border-white/6 pb-1.5 md:mb-3 md:pb-2">
          <span className="text-[7px] tracking-[0.12em] text-white/25 uppercase md:text-[9px]">Ride Data</span>
          <motion.span className="text-[8px] tabular-nums text-vv-blue md:text-[11px]">{timeStr}</motion.span>
        </div>

        {/* Weather */}
        <div className="mb-2 space-y-1 md:mb-3 md:space-y-1.5">
          <DatumRow label="Temp" value={tempStr} />
          <DatumRow label="Feels" value={feelsStr} />
          <DatumRow label="Wind" value={windDirStr} />
          <DatumRow label="Speed" value={windSpdStr} />
          <DatumRow label="Gust" value={gustStr} />
        </div>

        {/* Divider */}
        <div className="mb-2 h-px bg-white/6 md:mb-3" />

        {/* Ride stats */}
        <div className="space-y-1 md:space-y-1.5">
          <DatumRow label="Distance" value={distStr} />
          <DatumRow label="Elapsed" value={elapsedStr} />
        </div>
      </div>
    </div>
  );
}
