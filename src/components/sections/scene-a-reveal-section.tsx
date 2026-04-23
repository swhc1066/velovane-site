export function SceneARevealSection() {
  return (
    <section
      data-nav-tone="dark"
      className="bg-map-depth px-6 pb-16 pt-16 text-white md:px-8 md:pb-20 md:pt-[100px]"
      aria-labelledby="scene-a-reveal-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7785]">
          <span className="h-px w-8 shrink-0 bg-caution" aria-hidden />
          <span>Scene A · Reveal</span>
        </div>

        <h2
          id="scene-a-reveal-heading"
          className="mb-6 font-mono text-[clamp(40px,7vw,88px)] font-light leading-none tracking-[-0.035em] text-white"
        >
          This ride was
          <br />
          <span className="font-normal text-caution">avoidable.</span>
        </h2>

        <p className="mb-14 max-w-[560px] font-mono text-base leading-[1.55] text-[#B8BFC7] md:mb-16">
          <strong className="font-medium text-white">
            VeloVane saw the shift coming 18 hours before you turned around.
          </strong>{" "}
          The forecast data was there. Your weather apps just weren&apos;t reading
          it the way a cyclist needs to.
        </p>

        <div className="relative max-w-[760px] border border-map-depth-line bg-map-depth-elev px-5 py-6 md:px-9 md:py-8">
          <div className="absolute left-0 top-0 h-px w-8 bg-vv-blue" aria-hidden />

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-map-depth-line pb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6B7785]">
            <span className="font-semibold text-vv-blue">VeloVane Forecast Read</span>
            <span className="font-semibold text-caution">△ Shift detected · 18 hr lead</span>
          </div>

          <p className="mb-2 font-mono text-lg font-normal leading-snug tracking-[-0.01em] text-white md:text-xl">
            Wind direction, <strong className="font-medium text-vv-blue">WSW to ENE</strong>, with
            shift at 10:32 AM.
          </p>
          <p className="mb-7 font-mono text-xs tracking-[0.04em] text-[#6B7785]">
            Saturday · 10 AM - 12 PM forecast window
          </p>

          <div className="mt-2">
            <div className="relative mb-2 h-7">
              <div
                className="absolute flex flex-col items-center -translate-x-1/2"
                style={{ left: "53%" }}
              >
                <span className="mb-1 whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-caution">
                  △ Shift · 10:32
                </span>
                <span className="h-2 w-px bg-caution" aria-hidden />
              </div>
            </div>

            <div className="flex h-11 overflow-hidden border border-map-depth-line md:h-11">
              <div className="flex w-[50%] items-center justify-center bg-gradient-to-r from-vv-blue-darker to-vv-blue-dark font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white md:text-[11px]">
                WSW 240° · Favorable
              </div>
              <div className="flex w-[6%] items-center justify-center bg-caution font-mono text-[9px] font-bold text-map-depth md:text-[10px]">
                △
              </div>
              <div className="flex w-[44%] items-center justify-center bg-gradient-to-r from-[#6B4500] to-[#8A5E00] font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#FFE89A] md:text-[11px]">
                ENE 060° · Headwind home
              </div>
            </div>

            <div className="flex justify-between pt-2.5 font-mono text-[10px] tracking-[0.08em] text-[#6B7785]">
              <span>10 AM</span>
              <span>10:30</span>
              <span>11 AM</span>
              <span>11:30</span>
              <span>12 PM</span>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap justify-between gap-4 border-t border-dashed border-map-depth-line pt-5 font-mono text-[11px] tracking-[0.04em] text-[#6B7785]">
            <div className="flex min-w-[45%] flex-col gap-1 sm:min-w-0">
              <span className="text-[9px] uppercase tracking-[0.16em] text-[#4A5560]">
                Source
              </span>
              <span className="font-medium text-[#B8BFC7]">Open-Meteo · ECMWF</span>
            </div>
            <div className="flex min-w-[45%] flex-col gap-1 sm:min-w-0">
              <span className="text-[9px] uppercase tracking-[0.16em] text-[#4A5560]">
                Read at
              </span>
              <span className="font-medium text-[#B8BFC7]">Friday 4:32 PM</span>
            </div>
            <div className="flex min-w-[45%] flex-col gap-1 sm:min-w-0">
              <span className="text-[9px] uppercase tracking-[0.16em] text-[#4A5560]">
                Recommendation
              </span>
              <span className="font-medium text-[#B8BFC7]">Window: 7:00 - 9:30 AM</span>
            </div>
            <div className="flex min-w-[45%] flex-col gap-1 sm:min-w-0">
              <span className="text-[9px] uppercase tracking-[0.16em] text-[#4A5560]">
                Confidence
              </span>
              <span className="font-medium text-[#B8BFC7]">High · 0.91</span>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-[1200px] md:mt-20">
          <div className="flex items-center gap-5">
            <div className="h-px flex-1 bg-map-depth-line" aria-hidden />
            <span className="whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-vv-blue">
              Scene B · With VeloVane · DWG VV-001 REV D
            </span>
            <div className="h-px flex-1 bg-map-depth-line" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
