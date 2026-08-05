export function RideSceneChapterIntro() {
  return (
    <section
      data-nav-tone="dark"
      className="bg-map-depth px-6 text-white md:px-8"
    >
      <div className="mx-auto max-w-[1200px] py-section-y md:py-section-y-md">
        <div className="mb-6 flex flex-wrap gap-x-3.5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#4A5560]">
          <span className="font-semibold tracking-[0.18em] text-[#B8BFC7]">
            SCENE A
          </span>
          <span>· WITHOUT VELOVANE</span>
          <span>· DWG VV-006 REV A</span>
        </div>

        <header className="mb-10 flex flex-col gap-2 border-b border-map-depth-line pb-8 md:mb-12 md:flex-row md:items-baseline md:gap-7">
          <span className="shrink-0 font-mono text-[clamp(40px,8vw,56px)] font-light leading-none tracking-[-0.03em] text-vv-blue md:text-[56px]">
            02
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-xl font-normal tracking-[-0.01em] text-white md:text-[22px]">
              A ride, rewound.
            </p>
          </div>
        </header>

        <div className="max-w-[720px]">
          <h2 className="mb-5 font-mono text-[clamp(32px,4.8vw,56px)] font-normal leading-[1.05] tracking-[-0.025em] text-white">
            The ride you took.
          </h2>
          <p className="max-w-[580px] font-mono text-base leading-relaxed text-[#B8BFC7]">
            A Saturday out-and-back. The forecast looked fine. You headed into a
            steady headwind, expecting the payoff on the way home.{" "}
            <strong className="font-medium text-white">The wind had other plans.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
