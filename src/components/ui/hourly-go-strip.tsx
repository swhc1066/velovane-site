type HourCol = {
  time: string;
  temp: string;
  wind: string;
  precip: string;
  go?: boolean;
  now?: boolean;
};

const HOURS: HourCol[] = [
  { time: "10 AM", temp: "74°F", wind: "10 mph", precip: "6%" },
  { time: "NOW", temp: "74°F", wind: "10 mph", precip: "6%", now: true },
  { time: "12 PM", temp: "74°F", wind: "10 mph", precip: "5%", go: true },
  { time: "1 PM", temp: "75°F", wind: "10 mph", precip: "4%", go: true },
  { time: "2 PM", temp: "76°F", wind: "11 mph", precip: "4%", go: true },
  { time: "3 PM", temp: "77°F", wind: "12 mph", precip: "5%" },
];

/** Dashboard hourly strip — green GO bars mark the ride window. */
export function HourlyGoStrip({ className }: { className?: string }) {
  return (
    <div
      className={
        className
          ? `max-w-[520px] max-[900px]:max-w-full ${className}`
          : "max-w-[520px] max-[900px]:max-w-full"
      }
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B6358]">
          Hourly · Next 15 hr
        </span>
        <span className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[#6B6358]">
          <span className="h-[3px] w-4 rounded-full bg-[#5C8A52]" aria-hidden />
          Go hrs
        </span>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {HOURS.map((h) => (
          <div key={h.time} className="flex w-[68px] shrink-0 flex-col items-stretch sm:w-[72px]">
            <div
              className={`mb-1.5 h-[3px] rounded-full ${h.go ? "bg-[#5C8A52]" : "bg-transparent"}`}
              aria-hidden
            />
            <div
              className={
                h.now
                  ? "flex flex-col items-center rounded-[14px] bg-[#1A1814] px-1.5 py-3 text-white"
                  : "flex flex-col items-center rounded-[14px] px-1.5 py-3 text-[#1A1814]"
              }
            >
              <span
                className={`mb-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.06em] ${
                  h.now ? "text-white/70" : "text-[#6B6358]"
                }`}
              >
                {h.time}
              </span>
              <span className="mb-2 font-mono text-[13px] font-medium leading-none tracking-[-0.01em]">
                {h.temp}
              </span>
              <span
                className={`mb-1 text-[12px] leading-none ${h.now ? "text-white/80" : "text-[#6B6358]"}`}
                aria-hidden
              >
                ↓
              </span>
              <span
                className={`mb-2.5 font-mono text-[11px] leading-none ${
                  h.now ? "text-white/80" : "text-[#6B6358]"
                }`}
              >
                {h.wind}
              </span>
              <span className="font-mono text-[11px] leading-none text-[#5B8FB9]">
                {h.precip}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
