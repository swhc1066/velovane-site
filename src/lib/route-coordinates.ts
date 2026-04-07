// Paris-Roubaix: Loop route through Arenberg and Wallers
// Coordinates extracted from Mapbox dark-v11 road vector tiles
// Route: Petite Drève → Jules Guesde → Henri Durre → (connecting) → Jean Jaurès → Ch. de l'Émaillerie → Jacques Bour → Petite Drève

export const MAP_CENTER: [number, number] = [3.408, 50.379];
export const MAP_ZOOM = 13.6;

// Full loop using actual road geometries from Mapbox tiles
export const ROUTE_COORDS: [number, number][] = [
  // === OUTBOUND: Start at Arenberg (E end of Rue de la Petite Drève) ===
  [3.41944, 50.38208],
  [3.40865, 50.38079],
  [3.40852, 50.38072],
  [3.40848, 50.38040],

  // South on Rue Jules Guesde
  [3.40828, 50.38030],
  [3.40726, 50.37943],
  [3.40477, 50.37804],
  [3.40385, 50.37741],
  [3.40153, 50.37564],
  [3.40037, 50.37439],

  // West on Rue Henri Durre
  [3.39973, 50.37419],
  [3.39804, 50.37389],
  [3.39715, 50.37385],
  [3.39420, 50.37349],
  [3.39342, 50.37333],
  [3.39278, 50.37337],

  // === WALLERS: South via unnamed connecting road ===
  [3.39262, 50.37377],
  [3.39178, 50.37496],
  [3.39172, 50.37521],
  [3.39176, 50.37559],

  // === RETURN: North on Rue Jean Jaurès ===
  [3.39264, 50.37733],
  [3.39351, 50.37913],
  [3.39362, 50.38002],
  [3.39420, 50.38186],
  [3.39478, 50.38421],

  // East on Ch. de l'Émaillerie
  [3.39531, 50.38422],
  [3.39686, 50.38444],
  [3.39918, 50.38485],
  [3.40014, 50.38523],
  [3.40187, 50.38543],
  [3.40219, 50.38531],

  // Southeast on Drève Jacques Bour
  [3.40440, 50.38361],
  [3.40483, 50.38334],
  [3.40599, 50.38299],
  [3.40726, 50.38272],
  [3.40762, 50.38260],
  [3.40837, 50.38171],
  [3.40853, 50.38074],

  // === FINISH: East on Rue de la Petite Drève back to start ===
  [3.40865, 50.38079],
  [3.41944, 50.38208],
];

/* ------------------------------------------------------------------ */
/*  Bearing & wind-relation utilities                                  */
/* ------------------------------------------------------------------ */

/** Compute bearing (degrees, 0=N clockwise) from one coordinate to another. */
export function computeBearing(
  [lon1, lat1]: [number, number],
  [lon2, lat2]: [number, number],
): number {
  const toRad = Math.PI / 180;
  const φ1 = lat1 * toRad;
  const φ2 = lat2 * toRad;
  const Δλ = (lon2 - lon1) * toRad;
  const x = Math.sin(Δλ) * Math.cos(φ2);
  const y =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return ((Math.atan2(x, y) * 180) / Math.PI + 360) % 360;
}

/**
 * Precompute rider bearing at evenly-spaced path percentages (0–1).
 * Returns an array of { pct, bearing } sorted by pct.
 */
export function precomputeBearings(
  coords: [number, number][],
): { pct: number; bearing: number }[] {
  // Compute cumulative distances
  const dists: number[] = [0];
  for (let i = 1; i < coords.length; i++) {
    const [lon1, lat1] = coords[i - 1];
    const [lon2, lat2] = coords[i];
    const toRad = Math.PI / 180;
    const dLat = (lat2 - lat1) * toRad;
    const dLon = (lon2 - lon1) * toRad;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * toRad) * Math.cos(lat2 * toRad) * Math.sin(dLon / 2) ** 2;
    const d = 2 * 6_371_000 * Math.asin(Math.sqrt(a));
    dists.push(dists[i - 1] + d);
  }
  const total = dists[dists.length - 1];
  const result: { pct: number; bearing: number }[] = [];
  for (let i = 1; i < coords.length; i++) {
    const seg = dists[i] / total;
    const b = computeBearing(coords[i - 1], coords[i]);
    if (dists[i] - dists[i - 1] > 15) {
      // skip tiny segments
      result.push({ pct: seg, bearing: b });
    }
  }
  return result;
}

/**
 * Get rider bearing at a given path percentage by interpolating precomputed bearings.
 */
export function bearingAtPct(
  bearings: { pct: number; bearing: number }[],
  pct: number,
): number {
  if (bearings.length === 0) return 0;
  if (pct <= bearings[0].pct) return bearings[0].bearing;
  if (pct >= bearings[bearings.length - 1].pct)
    return bearings[bearings.length - 1].bearing;
  for (let i = 1; i < bearings.length; i++) {
    if (pct <= bearings[i].pct) {
      return bearings[i].bearing; // step function — use segment bearing
    }
  }
  return bearings[bearings.length - 1].bearing;
}

/**
 * Returns wind relation: "Headwind" | "Tailwind" | "Crosswind"
 * windFromDeg: direction wind blows FROM (meteorological convention)
 * riderBearing: direction rider is heading (0=N, 90=E, etc.)
 */
export function getWindRelation(
  windFromDeg: number,
  riderBearing: number,
): "Headwind" | "Tailwind" | "Crosswind" {
  const windToward = (windFromDeg + 180) % 360;
  const angle = ((riderBearing - windToward + 540) % 360) - 180; // -180 to 180
  const cosAngle = Math.cos((angle * Math.PI) / 180);
  if (cosAngle > 0.35) return "Tailwind";
  if (cosAngle < -0.35) return "Headwind";
  return "Crosswind";
}

/** Precomputed bearings for the route — computed once at module level. */
export const ROUTE_BEARINGS = precomputeBearings(ROUTE_COORDS);

export const WAYPOINT_COORDS: Record<string, { lngLat: [number, number]; label: string; coord: string }> = {
  ARENBERG: {
    lngLat: [3.41944, 50.38208],
    label: "ARENBERG",
    coord: "50.38N  3.42E",
  },
  WALLERS: {
    lngLat: [3.39176, 50.37559],
    label: "WALLERS",
    coord: "50.38N  3.39E",
  },
  FINISH: {
    lngLat: [3.41944, 50.38208],
    label: "FINISH",
    coord: "50.38N  3.42E",
  },
};
