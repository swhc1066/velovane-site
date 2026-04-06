"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const BARB_COLOR = "#FFFFFF";
const BARB_SPACING = 50;
const BARB_OPACITY_MIN = 0.05;
const BARB_OPACITY_MAX = 0.12;
const BASE_SPEED = 18; // px/sec — particles travel along flow vectors

// Density culling — barbs fade out when neighbours crowd them
const DENSITY_RADIUS = 18;          // px — below Poisson min-dist so initial layout is clean
const DENSITY_RADIUS2 = DENSITY_RADIUS * DENSITY_RADIUS;
const DENSITY_MAX_NEIGHBORS = 3;    // at this count opacity → 0

// Ripple wave config
const WAVE_SPEED = 180;
const WAVE_WIDTH = 38;
const WAVE_MAX_RADIUS = 320;
const WAVE_STRENGTH = 0.65;
const MAX_PULSES = 6;
const PULSE_THROTTLE = 0.07;

interface Particle {
  x: number;
  y: number;
  speedMult: number; // 0.5 – 1.5 per-particle variation
  fadeIn: number;   // 0 = just spawned, 1 = fully visible
}

interface Pulse {
  x: number;
  y: number;
  birth: number;
}

interface PressureCenter {
  x: number;
  y: number;
  radius: number;
  strength: number;
  spiral: number; // + inward (low), − outward (high)
  ccw: 1 | -1;
}

interface WindCanvasProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

function makePrng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = Math.imul(s, 1664525) + 1013904223;
    return (s >>> 0) / 0xffffffff;
  };
}

function wrapDx(x1: number, x2: number, w: number) {
  let d = Math.abs(x1 - x2);
  if (d > w / 2) d = w - d;
  return d;
}

export function WindCanvas({ sectionRef }: WindCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];

    function generateParticles(w: number, h: number) {
      const rng = makePrng(42);
      particles = [];
      const target = Math.ceil((w * h) / (BARB_SPACING * BARB_SPACING));
      const minDist = BARB_SPACING * 0.52;
      const minDist2 = minDist * minDist;
      const maxAttempts = target * 35;
      let attempts = 0;
      while (particles.length < target && attempts < maxAttempts) {
        attempts++;
        const x = rng() * w;
        const y = rng() * h;
        let ok = true;
        for (const p of particles) {
          const ddx = wrapDx(x, p.x, w);
          const ddy = y - p.y;
          if (ddx * ddx + ddy * ddy < minDist2) { ok = false; break; }
        }
        if (ok) particles.push({ x, y, speedMult: 0.5 + rng(), fadeIn: 1 });
      }
    }

    function resize() {
      const section = sectionRef.current ?? canvas!.parentElement;
      const rect = section
        ? section.getBoundingClientRect()
        : { width: window.innerWidth, height: window.innerHeight };
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      generateParticles(width, height);
    }

    resize();
    const ro = new ResizeObserver(resize);
    if (sectionRef.current) ro.observe(sectionRef.current);

    // ── Mouse → ripple pulses ─────────────────────────────────────────────
    const epoch = performance.now();
    const nowT = () => (performance.now() - epoch) / 1000;

    let mouseActive = false;
    let lastPulseTime = -999;
    const pulses: Pulse[] = [];

    function onMouseMove(e: MouseEvent) {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      mouseActive = true;
      const t = nowT();
      if (t - lastPulseTime > PULSE_THROTTLE) {
        pulses.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, birth: t });
        if (pulses.length > MAX_PULSES) pulses.shift();
        lastPulseTime = t;
      }
    }

    function onMouseLeave() { mouseActive = false; }

    const target = sectionRef.current ?? canvas.parentElement;
    if (!shouldReduceMotion) {
      target?.addEventListener("mousemove", onMouseMove);
      target?.addEventListener("mouseleave", onMouseLeave);
    }

    // ── Pressure system flow field ────────────────────────────────────────
    function getCenters(t: number): PressureCenter[] {
      const r = Math.min(width, height);
      return [
        {
          x: width * 0.32 + Math.cos(t * 0.048) * width * 0.13,
          y: height * 0.42 + Math.sin(t * 0.038) * height * 0.20,
          radius: r * 0.55,
          strength: 1.6,
          spiral: 0.08,  // near-pure rotation — prevents convergence sink
          ccw: 1,
        },
        {
          x: width * 0.74 + Math.cos(t * 0.036 + 2.0) * width * 0.11,
          y: height * 0.52 + Math.sin(t * 0.030 + 1.4) * height * 0.16,
          radius: r * 0.45,
          strength: 1.2,
          spiral: -0.08,  // near-pure rotation
          ccw: -1,
        },
      ];
    }

    // Returns a normalised direction vector [nx, ny] from the combined field
    function getFlowDir(
      x: number,
      y: number,
      t: number,
      centers: PressureCenter[],
    ): [number, number] {
      // Background: steady westerly (left→right) drift
      let vx = 0.6;
      let vy = 0.06 * Math.sin(y * 0.003 + t * 0.08);

      for (const c of centers) {
        const dx = x - c.x;
        const dy = y - c.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1) continue;

        const w = Math.exp(-(dist * dist) / (2 * c.radius * c.radius));

        // Tangential (rotation)
        const tx = (-dy / dist) * c.ccw;
        const ty = (dx / dist) * c.ccw;

        // Radial (inward / outward spiral)
        const rx = (-dx / dist) * c.spiral;
        const ry = (-dy / dist) * c.spiral;

        vx += (tx + rx) * c.strength * w * 2.2;
        vy += (ty + ry) * c.strength * w * 2.2;
      }

      const len = Math.sqrt(vx * vx + vy * vy) || 1;
      return [vx / len, vy / len];
    }

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

    function getRippleOffset(x: number, y: number, t: number): number {
      let offset = 0;
      for (const pulse of pulses) {
        const age = t - pulse.birth;
        if (age < 0) continue;
        const ringRadius = age * WAVE_SPEED;
        if (ringRadius > WAVE_MAX_RADIUS) continue;
        const dx = x - pulse.x;
        const dy = y - pulse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const distFromRing = Math.abs(dist - ringRadius);
        if (distFromRing > WAVE_WIDTH) continue;
        const envelope =
          Math.exp(-distFromRing * distFromRing / (WAVE_WIDTH * WAVE_WIDTH * 0.35))
          * (1 - ringRadius / WAVE_MAX_RADIUS);
        offset += envelope * WAVE_STRENGTH;
      }
      return offset;
    }

    // ── Barb drawing ──────────────────────────────────────────────────────
    function drawBarb(cx: number, cy: number, angle: number, opacity: number) {
      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.rotate(angle);
      ctx!.globalAlpha = opacity;
      ctx!.strokeStyle = BARB_COLOR;
      ctx!.lineWidth = 0.9;
      ctx!.lineCap = "round";
      ctx!.beginPath();
      ctx!.moveTo(-8, 0); ctx!.lineTo(8, 0);
      ctx!.moveTo(-4, 0); ctx!.lineTo(-1, -5);
      ctx!.moveTo(1, 0);  ctx!.lineTo(4, -5);
      ctx!.stroke();
      ctx!.restore();
    }

    // ── Render loop ───────────────────────────────────────────────────────
    let rafId: number;
    let prevT = -1;

    function render(timestamp: number) {
      const t = (timestamp - epoch) / 1000;
      const dt = prevT < 0 ? 0 : Math.min(t - prevT, 0.05);
      prevT = t;

      const maxAge = WAVE_MAX_RADIUS / WAVE_SPEED;
      while (pulses.length > 0 && t - pulses[0].birth > maxAge) pulses.shift();

      ctx!.clearRect(0, 0, width, height);

      const centers = getCenters(t);
      const margin = 16;

      // Spawn a particle just outside a random screen edge so it drifts in naturally
      function spawnAtPerimeter(): { x: number; y: number } {
        const edge = Math.floor(Math.random() * 4);
        switch (edge) {
          case 0: return { x: Math.random() * width, y: -margin };          // top
          case 1: return { x: width + margin, y: Math.random() * height };  // right
          case 2: return { x: Math.random() * width, y: height + margin };  // bottom
          default: return { x: -margin, y: Math.random() * height };        // left
        }
      }

      // ── Pass 1: advect all positions + tick fadeIn ────────────────────
      for (const p of particles) {
        const [nx, ny] = getFlowDir(p.x, p.y, t, centers);
        p.x += nx * p.speedMult * BASE_SPEED * dt;
        p.y += ny * p.speedMult * BASE_SPEED * dt;
        if (p.x < -margin) p.x = width + margin;
        else if (p.x > width + margin) p.x = -margin;
        if (p.y < -margin) p.y = height + margin;
        else if (p.y > height + margin) p.y = -margin;
        // Fade newly spawned particles in over ~0.8s
        if (p.fadeIn < 1) p.fadeIn = Math.min(1, p.fadeIn + dt * 1.25);
      }

      // ── Pass 2: draw with density-based fade ─────────────────────────
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Count nearby neighbours — early-exit once we hit the max
        let neighbors = 0;
        for (let j = 0; j < particles.length; j++) {
          if (j === i) continue;
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          if (dx * dx + dy * dy < DENSITY_RADIUS2) {
            if (++neighbors >= DENSITY_MAX_NEIGHBORS) break;
          }
        }

        // When too crowded, eject to perimeter so a fresh barb drifts back in
        if (neighbors >= DENSITY_MAX_NEIGHBORS) {
          const pos = spawnAtPerimeter();
          p.x = pos.x;
          p.y = pos.y;
          p.fadeIn = 0; // fade in from invisible
          continue;
        }
        const densityMult = 1 - neighbors / DENSITY_MAX_NEIGHBORS;

        const [nx, ny] = getFlowDir(p.x, p.y, t, centers);
        const angle = Math.atan2(ny, nx)
          + (mouseActive ? getRippleOffset(p.x, p.y, t) : 0);

        const opacityNoise = (Math.sin(p.x * 0.011 + p.y * 0.013 + t * 0.07) + 1) / 2;
        const opacity = lerp(BARB_OPACITY_MIN, BARB_OPACITY_MAX, opacityNoise) * densityMult * p.fadeIn;

        drawBarb(p.x, p.y, angle, opacity);
      }

      if (!shouldReduceMotion) rafId = requestAnimationFrame(render);
    }

    if (shouldReduceMotion) {
      render(performance.now());
    } else {
      rafId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      target?.removeEventListener("mousemove", onMouseMove);
      target?.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [shouldReduceMotion, sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[3]"
      style={{ display: "block" }}
    />
  );
}
