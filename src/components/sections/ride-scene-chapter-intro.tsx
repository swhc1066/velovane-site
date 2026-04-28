export function RideSceneChapterIntro() {
  return (
    <section id="how" data-nav-tone="dark" className="bg-map-depth text-white">
      <div className="mx-auto max-w-[1200px] px-6 pb-12 pt-16 md:px-8 md:pb-[60px] md:pt-[100px]">
        <header className="mb-10 flex flex-col gap-2 border-b border-map-depth-line pb-8 md:mb-12 md:flex-row md:items-baseline md:gap-7">
          <span className="shrink-0 font-mono text-[clamp(40px,8vw,56px)] font-light leading-none tracking-[-0.03em] text-vv-blue md:text-[56px]">
            02
          </span>
          <div className="min-w-0 flex-1">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7785]">
              S 02 · TWO RIDES
            </p>
            <p className="font-mono text-xl font-normal tracking-[-0.01em] text-white md:text-[22px]">
              A ride, rewound.
            </p>
          </div>
        </header>

        <div className="max-w-[720px]">
          <div className="mb-6 flex flex-wrap gap-x-3.5 gap-y-2 border-b border-dashed border-map-depth-line pb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#4A5560]">
            <span className="font-semibold tracking-[0.18em] text-[#B8BFC7]">
              SCENE A
            </span>
            <span>· WITHOUT VELOVANE</span>
            <span>· DWG VV-006 REV A</span>
          </div>
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
