"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { MAP_CENTER, MAP_ZOOM } from "@/lib/route-coordinates";

interface MapboxBackgroundProps {
  onMapReady?: (map: mapboxgl.Map) => void;
}

export function MapboxBackground({ onMapReady }: MapboxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!containerRef.current || !token) return;

    mapboxgl.accessToken = token;

    // Zoom out on mobile so the full route fits the narrow portrait viewport
    const isMobile = containerRef.current.offsetWidth < 768;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: isMobile ? [MAP_CENTER[0] - 0.005, MAP_CENTER[1]] as [number, number] : MAP_CENTER,
      zoom: isMobile ? MAP_ZOOM - 0.8 : MAP_ZOOM,
      interactive: false,
      attributionControl: false,
      fadeDuration: 0,
    });

    mapRef.current = map;

    map.on("load", () => {
      // Hide "Wallers" and "Arenberg" town labels — redundant with our SVG labels
      for (const id of ["settlement-subdivision-label", "settlement-minor-label", "settlement-major-label"]) {
        if (map.getLayer(id)) {
          map.setFilter(id, [
            "all",
            ["!", ["in", ["get", "name"], ["literal", ["Wallers", "Arenberg"]]]],
          ]);
        }
      }
      onMapReady?.(map);
    });

    // Keep map sized to container
    const observer = new ResizeObserver(() => {
      map.resize();
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full [&_.mapboxgl-ctrl-bottom-left]:hidden [&_.mapboxgl-ctrl-bottom-right]:hidden"
    />
  );
}
