import type mapboxgl from "mapbox-gl";

const SVG_W = 800;
const SVG_H = 500;

/**
 * Project a [lng, lat] to SVG viewBox coordinates (0 0 800 500)
 * accounting for preserveAspectRatio="xMidYMid slice" scaling.
 */
export function projectToSvg(
  map: mapboxgl.Map,
  lngLat: [number, number],
  containerW: number,
  containerH: number,
): { x: number; y: number } {
  const pixel = map.project(lngLat);

  // xMidYMid slice: scale to COVER the viewBox, crop overflow
  const scaleX = SVG_W / containerW;
  const scaleY = SVG_H / containerH;
  const scale = Math.min(scaleX, scaleY); // slice = use the smaller scale (covers)

  const scaledW = containerW * scale;
  const scaledH = containerH * scale;
  const offsetX = (scaledW - SVG_W) / 2;
  const offsetY = (scaledH - SVG_H) / 2;

  return {
    x: pixel.x * scale - offsetX,
    y: pixel.y * scale - offsetY,
  };
}

/**
 * Build an SVG path d-attribute from an array of [lng, lat] coordinates.
 */
export function buildSvgPath(
  coords: [number, number][],
  map: mapboxgl.Map,
  containerW: number,
  containerH: number,
): string {
  if (coords.length === 0) return "";

  const points = coords.map((c) => projectToSvg(map, c, containerW, containerH));
  const [first, ...rest] = points;
  return `M ${first.x.toFixed(1)},${first.y.toFixed(1)} ${rest.map((p) => `L ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}`;
}

/**
 * Project waypoint coordinates to SVG viewBox positions.
 */
export function projectWaypoints(
  waypoints: Record<string, { lngLat: [number, number]; label: string; coord: string }>,
  map: mapboxgl.Map,
  containerW: number,
  containerH: number,
): { label: string; coord: string; x: number; y: number }[] {
  return Object.values(waypoints).map((wp) => {
    const pos = projectToSvg(map, wp.lngLat, containerW, containerH);
    return { label: wp.label, coord: wp.coord, x: pos.x, y: pos.y };
  });
}
