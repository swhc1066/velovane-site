"use client";

// Irregular grid positions (percentages) — organic, not mechanical
const LINE_POSITIONS = [
  3, 8, 18, 25, 33, 41, 52, 61, 69, 78, 87, 94,
];

export function GridOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden md:block">
      <div className="mx-auto h-full max-w-[1400px] px-5">
        <div className="relative h-full">
          {LINE_POSITIONS.map((pos, i) => (
            <div
              key={i}
              className="guide-line guide-line-dark"
              style={{ left: `${pos}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
