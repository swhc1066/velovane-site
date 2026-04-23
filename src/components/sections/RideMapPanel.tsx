"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { RideMapSvg } from "../ui/RideMapSvg";
import { RideWeatherData } from "../ui/RideWeatherData";
import { RIDE_NARRATIVE } from "@/lib/constants";
import { ROUTE_COORDS, WAYPOINT_COORDS } from "@/lib/route-coordinates";
import { buildSvgPath, projectWaypoints } from "@/lib/map-projection";
import type mapboxgl from "mapbox-gl";

const MapboxBackground = dynamic(
  () => import("../ui/MapboxBackground").then((m) => m.MapboxBackground),
  { ssr: false },
);

/* ------------------------------------------------------------------ */
/*  Dynamic text card                                                  */
/* ------------------------------------------------------------------ */

function DynamicTextCard({ progress }: { progress: MotionValue<number> }) {
  const narrativeIndex = useTransform(progress, (p) => {
    for (let i = RIDE_NARRATIVE.length - 1; i >= 0; i--) {
      if (p >= RIDE_NARRATIVE[i].progressRange[0]) return i;
    }
    return 0;
  });

  const time = useTransform(narrativeIndex, (i) => RIDE_NARRATIVE[i]?.time ?? "");
  const title = useTransform(narrativeIndex, (i) => RIDE_NARRATIVE[i]?.title ?? "");
  const description = useTransform(narrativeIndex, (i) => RIDE_NARRATIVE[i]?.description ?? "");

  // Accent color matches the data card progression
  const accentColor = useTransform(progress, (p) => {
    if (p < 0.40) return "#3b82f6";
    if (p < 0.52) return "#eab308";
    return "#ef4444";
  });

  // Single card body — parent controls positioning and width.
  return (
    <motion.div
      className="w-full rounded-xl border border-white/10 bg-surface-card/80 p-4 shadow-lg backdrop-blur-sm md:order-1 md:h-full md:p-5 xl:h-auto xl:rounded-2xl xl:p-6 xl:order-none"
      style={{ borderTopColor: accentColor, borderTopWidth: "2px" }}
    >
      <motion.div
        className="mb-1 font-mono text-[10px] font-medium tracking-wider md:mb-1 md:text-[11px] xl:mb-1.5 xl:text-[13px]"
        style={{ color: accentColor }}
      >
        {time}
      </motion.div>
      <motion.h3 className="mb-1.5 font-mono text-lg font-medium leading-tight text-white md:mb-2 md:text-xl xl:mb-3 xl:text-2xl">
        {title}
      </motion.h3>
      <motion.p className="font-mono text-[10px] font-light leading-relaxed text-n-400 md:text-xs xl:text-sm">
        {description}
      </motion.p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main panel                                                         */
/* ------------------------------------------------------------------ */

export function RideMapPanel() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const progress = useScrollProgress(scrollRef);

  // Projected route data from Mapbox
  const [projectedPath, setProjectedPath] = useState<string | undefined>();
  const [projectedWaypoints, setProjectedWaypoints] = useState<
    { label: string; coord: string; x: number; y: number }[] | undefined
  >();
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);

  const projectRoute = useCallback((map: mapboxgl.Map) => {
    const canvas = map.getCanvas();
    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);
    setProjectedPath(buildSvgPath(ROUTE_COORDS, map, w, h));
    setProjectedWaypoints(projectWaypoints(WAYPOINT_COORDS, map, w, h));
  }, []);

  const handleMapReady = useCallback(
    (map: mapboxgl.Map) => {
      mapInstanceRef.current = map;
      projectRoute(map);

      // Re-project on resize
      map.on("resize", () => projectRoute(map));
    },
    [projectRoute],
  );

  return (
    <>
      {/* Divider */}
      <div className="h-px bg-white/6" />

      {/* Scroll container */}
      <div ref={scrollRef} className="relative" style={{ minHeight: "250vh" }}>
        {/* Sticky viewport */}
        <div className="sticky top-0 relative h-dvh overflow-hidden bg-surface-dark">

          {/* LAYER 0 — Mapbox dark map background */}
          <div className="pointer-events-none absolute inset-0 z-[0] opacity-60">
            <MapboxBackground onMapReady={handleMapReady} />
          </div>

          {/* Vignette overlay — darkens edges to focus on route */}
          <div
            className="pointer-events-none absolute inset-0 z-[0]"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, rgba(12,12,14,0.5) 100%)" }}
          />

          {/* LAYER 1 — Full-bleed route SVG */}
          <div className="absolute inset-0 z-[1]">
            <RideMapSvg
              progress={progress}
              reducedMotion={shouldReduceMotion}
              projectedPath={projectedPath}
              projectedWaypoints={projectedWaypoints}
              isMobile={isMobile}
            />
          </div>

          {/* LAYER 2 — Architectural grid frame */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="finegrid-ride"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(255,255,255,0.016)" strokeWidth="0.5" />
                <line x1="0" y1="0" x2="0" y2="60" stroke="rgba(255,255,255,0.016)" strokeWidth="0.5" />
              </pattern>
              <pattern id="scanlines-ride" width="1" height="2" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="1" y2="0" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              </pattern>
            </defs>

            {/* Fine background grid */}
            <rect width="100%" height="100%" fill="url(#finegrid-ride)" />

            {/* Scan line texture */}
            <rect width="100%" height="100%" fill="url(#scanlines-ride)" />

            {/* Outer border frame */}
            <rect x="2%" y="1.2%" width="96%" height="97.6%" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />

            {/* Title block strip */}
            <line x1="2%" y1="5%" x2="98%" y2="5%" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <line x1="2%" y1="8.5%" x2="98%" y2="8.5%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
            {/* Strip cell dividers */}
            <line x1="4%" y1="5%" x2="4%" y2="8.5%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            <line x1="35%" y1="5%" x2="35%" y2="8.5%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            <line x1="65%" y1="5%" x2="65%" y2="8.5%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            <line x1="96%" y1="5%" x2="96%" y2="8.5%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

            {/* Section annotations */}
            <text x="5%" y="7.4%" fill="rgba(255,255,255,0.14)" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.08em">S 06 · RIDE DATA</text>
            <text x="36%" y="7.4%" fill="rgba(255,255,255,0.10)" fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.08em">PARIS-ROUBAIX · ARENBERG</text>
            <text x="95%" y="7.4%" fill="rgba(255,255,255,0.12)" fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.08em" textAnchor="end">DWG VV-006 REV A</text>

            {/* Full-height column lines */}
            <line x1="4%" y1="8.5%" x2="4%" y2="98.8%" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <line x1="35%" y1="8.5%" x2="35%" y2="98.8%" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <line x1="65%" y1="8.5%" x2="65%" y2="98.8%" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <line x1="96%" y1="8.5%" x2="96%" y2="98.8%" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

            {/* Horizontal row lines */}
            <line x1="2%" y1="16%" x2="98%" y2="16%" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <line x1="2%" y1="40%" x2="98%" y2="40%" stroke="rgba(255,255,255,0.035)" strokeWidth="0.5" />
            <line x1="2%" y1="72%" x2="98%" y2="72%" stroke="rgba(255,255,255,0.035)" strokeWidth="0.5" />
            <line x1="2%" y1="85%" x2="98%" y2="85%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

            {/* Cross-hair markers at grid intersections */}
            <line x1="34%" y1="40%" x2="36%" y2="40%" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <line x1="35%" y1="39%" x2="35%" y2="41%" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <line x1="64%" y1="72%" x2="66%" y2="72%" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <line x1="65%" y1="71%" x2="65%" y2="73%" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <line x1="95%" y1="85%" x2="97%" y2="85%" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <line x1="96%" y1="84%" x2="96%" y2="86%" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          </svg>

          {/* LAYER 3 — Card stack (data card + story card)
              Mobile (<md): data card at top below navbar, story card at bottom of the viewport
                            (map breathes in the middle).
              Tablet (md to lg-1): both cards hug the bottom in a 50/50 row — story left,
                                    data right — with 20px side margins and a 20px gap
                                    (so the right-side stack doesn't cover the ARENBERG label).
              Mid-desktop (lg to 1349px): same bottom row as tablet, but centered with a max
                                          width so the cards don't span the whole screen.
              Wide desktop (≥1350px): both cards stacked on the right side with a 20px gap. */}
          <div className="pointer-events-none absolute inset-x-0 top-24 bottom-6 z-[10] flex flex-col justify-between px-4 md:inset-x-5 md:top-auto md:bottom-5 md:grid md:grid-cols-2 md:items-stretch md:gap-5 md:px-0 lg:max-xl:inset-x-0 lg:max-xl:mx-auto lg:max-xl:max-w-[44rem] xl:inset-x-auto! xl:left-auto! xl:top-32! xl:right-8! xl:bottom-auto! xl:flex! xl:flex-col! xl:w-[17rem] xl:items-stretch xl:justify-start xl:gap-5 xl:px-0">
            <RideWeatherData
              progress={progress}
              reducedMotion={shouldReduceMotion}
            />
            <DynamicTextCard progress={progress} />
          </div>

        </div>
      </div>
    </>
  );
}
