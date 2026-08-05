/** Dashboard recommendation card — matches the in-app GO slot. */
export function GoRecCard({ className }: { className?: string }) {
  return (
    <div
      className={
        className
          ? `max-w-[380px] overflow-hidden rounded-[18px] bg-[#D9E4D1] ${className}`
          : "max-w-[380px] overflow-hidden rounded-[18px] bg-[#D9E4D1]"
      }
    >
      <div className="px-[18px] pt-[18px] pb-3.5">
        <div className="mb-2.5 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3D6B38]">
          <span className="size-1.5 rounded-full bg-[#3D6B38]" aria-hidden />
          GO
        </div>
        <div className="mb-2 font-mono text-[22px] font-medium leading-tight tracking-[-0.02em] text-[#1A1814]">
          Today · 12pm-2pm
        </div>
        <p className="mb-3 font-mono text-[12px] leading-[1.45] text-[#3F4A3C]">
          Best slot based on your preferences. Temp: ~74°F. Wind: steady 10 mph
          out of the N. Rain risk: ~5%.
        </p>
        <p className="text-right font-mono text-[10px] tracking-[0.02em] text-[#5A6B56]">
          Tap for detail ↓
        </p>
      </div>
      <div className="bg-[#C9D6BF] px-[18px] py-3 font-mono text-[11px] leading-[1.4] text-[#2F3D2C]">
        Best is 12pm-2pm. Nothing else qualifies today – next opportunity is
        tomorrow at 2pm-4pm.
      </div>
    </div>
  );
}
