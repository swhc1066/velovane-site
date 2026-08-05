/** Dashboard / hour-detail wind readout — no gauge, matches in-app UI. */
export function WindPanel({ className }: { className?: string }) {
  return (
    <div
      className={
        className
          ? `max-w-[340px] rounded-[18px] border border-[rgba(26,24,20,0.10)] bg-[#F2ECDD] px-[22px] py-5 ${className}`
          : "max-w-[340px] rounded-[18px] border border-[rgba(26,24,20,0.10)] bg-[#F2ECDD] px-[22px] py-5"
      }
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B6358]">
          Wind
        </span>
        <span className="rounded-full border border-[rgba(26,24,20,0.16)] px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-[#1A1814]">
          Light
        </span>
      </div>

      <div className="mb-3 flex items-end justify-between gap-4">
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-[44px] font-medium leading-none tracking-[-0.03em] text-[#1A1814]">
            10
          </span>
          <span className="font-mono text-[15px] font-medium text-[#1A1814]">mph</span>
        </div>
        <div
          className="flex items-center gap-1.5 pb-1 font-mono text-[18px] font-medium text-[#1A1814]"
          aria-label="From the north"
        >
          <span aria-hidden className="text-[20px] leading-none">
            ↓
          </span>
          <span>N</span>
        </div>
      </div>

      <p className="mb-1.5 font-mono text-[12px] leading-[1.45] text-[#6B6358]">
        Shifting wind across the forecast.
      </p>
      <p className="font-mono text-[12px] leading-[1.45] text-[#6B6358]">
        Gusts up to 14 mph
      </p>
    </div>
  );
}
