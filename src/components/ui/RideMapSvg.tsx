"use client";

import { useEffect, useRef, useState } from "react";
import {
  type MotionValue,
  motion,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Route path                                                         */
/* ------------------------------------------------------------------ */

// Paris-Roubaix: Out-and-back from Arenberg to Wallers
// Follows Ch. de l'Émaillerie → main road → Rue Jean Jaurès → Rue Victor Hugo
// Coordinates hand-traced to align with /ride-map-dark.jpg background
const ROUTE_PATH = "M 495,90 L 470,95 L 445,102 L 418,108 L 390,113 L 360,117 L 330,121 L 300,124 L 270,128 L 250,134 L 234,142 L 220,152 L 208,164 L 198,178 L 190,194 L 184,210 L 180,226 L 178,242 L 176,256 L 160,258 L 140,258 L 118,256 L 98,256 L 82,256 L 74,266 L 72,280 L 76,294 L 88,306 L 104,314 L 122,316 L 140,310 L 154,298 L 164,282 L 172,264 L 176,248 L 180,232 L 184,216 L 188,200 L 194,186 L 202,172 L 214,160 L 228,148 L 244,138 L 262,132 L 285,126 L 315,122 L 350,117 L 385,112 L 420,106 L 455,100 L 480,94 L 498,90 L 510,88";

/* ------------------------------------------------------------------ */
/*  Terrain background lines                                           */
/* ------------------------------------------------------------------ */

// No terrain lines needed — real Mapbox map provides geographic context
const TERRAIN_LINES: string[] = [];

/* ------------------------------------------------------------------ */
/*  Wind arrow — single directional indicator near the rider dot       */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Waypoint config                                                    */
/* ------------------------------------------------------------------ */

interface Waypoint {
  label: string;
  coord: string;
  pathPercent: number;
  fadeIn: [number, number];
  offsetX: number;
  offsetY: number;
}

const WAYPOINTS: Waypoint[] = [
  { label: "ARENBERG", coord: "50.38N  3.41E", pathPercent: 0, fadeIn: [0, 0], offsetX: 10, offsetY: -14 },
  {
    label: "WALLERS",
    coord: "50.37N  3.38E",
    pathPercent: 0.5,
    fadeIn: [0.4, 0.48],
    offsetX: -60,
    offsetY: 18,
  },
  {
    label: "FINISH",
    coord: "50.38N  3.41E",
    pathPercent: 1,
    fadeIn: [0.85, 0.92],
    offsetX: 10,
    offsetY: 14,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function RideMapSvg({
  progress,
  reducedMotion,
  projectedPath,
  projectedWaypoints,
  isMobile = false,
}: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
  projectedPath?: string;
  projectedWaypoints?: { label: string; coord: string; x: number; y: number }[];
  isMobile?: boolean;
}) {
  const activePath = projectedPath ?? ROUTE_PATH;

  const pathRef = useRef<SVGPathElement>(null);
  const activePathRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGCircleElement>(null);
  const markerRingRef = useRef<SVGCircleElement>(null);
  const [totalLength, setTotalLength] = useState(0);

  // Wind direction: WSW (240°) → S (180°) → ENE (60°)
  // Unified timeline: wind holds through 10:30 AM (progress 0.40),
  // fully shifted to ENE by 11:30 AM (progress 0.60)
  const windFromDeg = useTransform(
    progress,
    [0.30, 0.40, 0.50, 0.60, 0.70],
    [240, 240, 180, 60, 60],
  );

  // Compute path length after mount and when projected path changes
  useEffect(() => {
    if (pathRef.current) {
      setTotalLength(pathRef.current.getTotalLength());
    }
  }, [activePath]);

  // Refs for imperative dash-offset updates (keeps line + dot in sync)
  const glowPathRef = useRef<SVGPathElement>(null);

  // Track latest totalLength in a ref so the scroll handler always reads the current value
  const totalLengthRef = useRef(0);
  useEffect(() => {
    totalLengthRef.current = totalLength;
  }, [totalLength]);

  // Move marker dot + draw line imperatively (no React re-renders, always in sync)
  useMotionValueEvent(progress, "change", (latest) => {
    const len = totalLengthRef.current;
    if (!pathRef.current || !markerRef.current || !len) return;
    const clampedProgress = Math.max(0, Math.min(1, (latest - 0.3) / 0.4));

    // Update line dash-offset (same calculation for glow + active path)
    const offset = len * (1 - clampedProgress);
    if (activePathRef.current) {
      activePathRef.current.style.strokeDasharray = String(len);
      activePathRef.current.style.strokeDashoffset = String(offset);
    }
    if (glowPathRef.current) {
      glowPathRef.current.style.strokeDasharray = String(len);
      glowPathRef.current.style.strokeDashoffset = String(offset);
    }

    // Move dot along the path
    const point = pathRef.current.getPointAtLength(len * clampedProgress);
    markerRef.current.setAttribute("cx", String(point.x));
    markerRef.current.setAttribute("cy", String(point.y));
    if (markerRingRef.current) {
      markerRingRef.current.setAttribute("cx", String(point.x));
      markerRingRef.current.setAttribute("cy", String(point.y));
    }
  });

  // Waypoint opacities
  const waypointOpacities = WAYPOINTS.map((wp) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(
      progress,
      wp.fadeIn[0] === 0 ? [0, 0.01] : [wp.fadeIn[0], wp.fadeIn[1]],
      wp.fadeIn[0] === 0 ? [1, 1] : [0, 1],
    ),
  );

  // Waypoint positions: use projected positions when available, else compute from path
  const [fallbackPositions, setFallbackPositions] = useState<
    { x: number; y: number }[]
  >([]);
  useEffect(() => {
    if (pathRef.current && totalLength && !projectedWaypoints) {
      setFallbackPositions(
        WAYPOINTS.map((wp) =>
          pathRef.current!.getPointAtLength(totalLength * wp.pathPercent),
        ),
      );
    }
  }, [totalLength, projectedWaypoints]);

  const waypointPositions = projectedWaypoints ?? fallbackPositions;

  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Route gradient: dark-to-bright blue along the path */}
        <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3A7BAD" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#5BA4D4" stopOpacity="0.9" />
        </linearGradient>

        {/* Soft bloom behind the active route line */}
        <filter id="route-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="4" />
        </filter>

        {/* Two-tier marker glow: outer blue halo + tight inner glow */}
        <filter id="marker-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="outerBlur" />
          <feColorMatrix in="outerBlur" type="matrix"
            values="0 0 0 0 0.357  0 0 0 0 0.643  0 0 0 0 0.831  0 0 0 0.3 0"
            result="outerColored" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="innerBlur" />
          <feMerge>
            <feMergeNode in="outerColored" />
            <feMergeNode in="innerBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Terrain lines */}
      {TERRAIN_LINES.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.5"
        />
      ))}

      {/* Ghost path — full route preview (dashed for architectural feel) */}
      <path
        d={activePath}
        fill="none"
        stroke="#5BA4D4"
        strokeWidth="0.75"
        opacity="0.10"
        strokeDasharray="4 8"
      />

      {/* Measurement path (invisible, for getPointAtLength) */}
      <path
        ref={pathRef}
        d={activePath}
        fill="none"
        stroke="none"
      />

      {/* Glow layer behind active path */}
      {totalLength > 0 && (
        <path
          ref={glowPathRef}
          d={activePath}
          fill="none"
          stroke="url(#route-gradient)"
          strokeWidth="7"
          strokeLinecap="round"
          filter="url(#route-glow)"
          opacity={0.18}
          style={
            reducedMotion
              ? { strokeDasharray: totalLength, strokeDashoffset: 0 }
              : { strokeDasharray: totalLength, strokeDashoffset: totalLength }
          }
        />
      )}

      {/* Active drawn path */}
      {totalLength > 0 && (
        <path
          ref={activePathRef}
          d={activePath}
          fill="none"
          stroke="url(#route-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          style={
            reducedMotion
              ? { strokeDasharray: totalLength, strokeDashoffset: 0 }
              : { strokeDasharray: totalLength, strokeDashoffset: totalLength }
          }
        />
      )}

      {/* Marker detection ring */}
      <circle
        ref={markerRingRef}
        cx={reducedMotion ? 400 : 700}
        cy={reducedMotion ? 320 : 140}
        r="10"
        fill="none"
        stroke="#5BA4D4"
        strokeWidth="0.5"
        opacity={totalLength > 0 ? 0.2 : 0}
        className={reducedMotion ? "" : "marker-ring-pulse"}
      />

      {/* Marker dot */}
      <circle
        ref={markerRef}
        cx={reducedMotion ? 400 : 700}
        cy={reducedMotion ? 320 : 140}
        r="4.5"
        fill="#5BA4D4"
        filter="url(#marker-glow)"
        opacity={totalLength > 0 ? 1 : 0}
      />

      {/* Waypoint labels */}
      {waypointPositions.map((pos, i) => {
        const wp = projectedWaypoints ? projectedWaypoints[i] : WAYPOINTS[i];
        if (!wp) return null;
        const label = "label" in wp ? wp.label : "";
        const coord = "coord" in wp ? wp.coord : "";
        const isFinish = label === "FINISH";
        // On mobile: labels go toward screen center (ARENBERG left, WALLERS right)
        // On desktop: ARENBERG right of dot, WALLERS left of dot
        const offsetX = isFinish ? -55
          : label === "ARENBERG" ? (isMobile ? -62 : 12)
          : (isMobile ? 12 : -60);
        const offsetY = isFinish ? 14 : label === "ARENBERG" ? (isMobile ? -12 : 3) : (isMobile ? -1 : 18);
        return (
          <motion.g
            key={label}
            style={{ opacity: reducedMotion ? 1 : waypointOpacities[i] }}
          >
            {/* Pin dot at route connection */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r="1.5"
              fill="rgba(255,255,255,0.2)"
            />
            {/* Dashed connector tick */}
            <line
              x1={pos.x}
              y1={pos.y}
              x2={pos.x + offsetX * 0.4}
              y2={pos.y + offsetY * 0.4}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="0.75"
              strokeDasharray="1.5 2"
            />
            {/* Label */}
            <text
              x={pos.x + offsetX}
              y={pos.y + offsetY}
              fill={isFinish ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.35)"}
              fontSize={isFinish ? "9" : "8"}
              fontFamily="var(--font-mono)"
              letterSpacing="0.08em"
            >
              {label}
            </text>
            {/* FINISH underline accent */}
            {isFinish && (
              <line
                x1={pos.x + offsetX}
                y1={pos.y + offsetY + 3}
                x2={pos.x + offsetX + 42}
                y2={pos.y + offsetY + 3}
                stroke="rgba(91,164,212,0.2)"
                strokeWidth="0.5"
              />
            )}
            {/* Coordinate annotation */}
            <text
              x={pos.x + offsetX}
              y={pos.y + offsetY + (isFinish ? 13 : 10)}
              fill="rgba(255,255,255,0.15)"
              fontSize="5"
              fontFamily="var(--font-mono)"
              letterSpacing="0.06em"
            >
              {coord}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
