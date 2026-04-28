function StripDivider() {
  return (
    <span
      className="inline-block h-2.5 w-px shrink-0 bg-n-300"
      aria-hidden
    />
  );
}

export function AtmosphericsStrip() {
  return (
    <div data-nav-tone="light" className="border-t border-n-200 bg-white px-6 py-4 md:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-8 font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <span>S 01 · IDENT</span>
          <StripDivider />
          <span>DWG VV-001 REV D</span>
          <StripDivider />
          <span>37.7749°N / 122.4194°W</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-6 md:gap-8">
          <div className="flex gap-1.5">
            <span className="text-n-400">Wind</span>
            <span className="font-medium text-n-600">NNW 342° · 12.4 kts</span>
          </div>
          <div className="flex gap-1.5">
            <span className="text-n-400">Temp</span>
            <span className="font-medium text-n-600">62.3°F</span>
          </div>
          <div className="flex gap-1.5">
            <span className="text-n-400">Dew</span>
            <span className="font-medium text-n-600">47.2°F</span>
          </div>
          <div className="flex gap-1.5">
            <span className="text-n-400">Hum</span>
            <span className="font-medium text-n-600">67%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
