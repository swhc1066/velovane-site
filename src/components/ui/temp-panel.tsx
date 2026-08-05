/** Dashboard / hour-detail temperature readout — matches in-app UI. */
export function TempPanel({ className }: { className?: string }) {
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
          Temperature
        </span>
        <span className="rounded-full border border-[rgba(26,24,20,0.16)] px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-[#1A1814]">
          Ideal
        </span>
      </div>

      <div className="mb-3 font-mono text-[44px] font-medium leading-none tracking-[-0.03em] text-[#1A1814]">
        74°F
      </div>

      <p className="mb-1.5 font-mono text-[12px] leading-[1.45] text-[#6B6358]">
        Feels like 77°F
      </p>
      <p className="font-mono text-[12px] leading-[1.45] text-[#6B6358]">
        High 77°F / Low 62°F
      </p>
    </div>
  );
}
