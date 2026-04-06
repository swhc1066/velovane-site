import { ScrollReveal } from "../ui/ScrollReveal";

export function ProblemSection() {
  return (
    <section className="relative bg-white" id="problem">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="grid grid-cols-1 gap-24 py-24 md:grid-cols-12 md:gap-0 md:py-40">
          {/* Point 01 */}
          <div className="md:col-span-5">
            <ScrollReveal>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-1 w-px bg-n-400" />
                <span className="font-mono text-[10px] font-light uppercase tracking-widest text-vv-blue">
                  01
                </span>
              </div>
              <h2 className="mb-6 font-mono text-2xl font-light leading-snug text-n-800 md:text-3xl">
                Every weather app fails cyclists.
              </h2>
              <p className="max-w-md text-sm font-light leading-relaxed text-n-600">
                You check three apps, cross-reference wind speeds, try to guess
                how 48&deg;F will actually feel at 17mph, and wonder if that
                &ldquo;light breeze&rdquo; at 6am will become a 20mph headwind
                by the time you turn around. It&apos;s a daily ritual that
                wastes time and still gets it wrong.
              </p>
            </ScrollReveal>
          </div>

          {/* Spacer */}
          <div className="hidden md:col-span-2 md:block" />

          {/* Point 02 */}
          <div className="md:col-span-5 md:pt-32">
            <ScrollReveal delay={0.15}>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-1 w-px bg-n-400" />
                <span className="font-mono text-[10px] font-light uppercase tracking-widest text-vv-blue">
                  02
                </span>
              </div>
              <h2 className="mb-6 font-mono text-2xl font-light leading-snug text-n-800 md:text-3xl">
                One answer. Under five seconds.
              </h2>
              <p className="max-w-md text-sm font-light leading-relaxed text-n-600">
                VeloVane is a weather app built specifically for cyclists. It
                interprets forecast data against your riding preferences and
                tells you whether to go, wait, or skip — with the rationale and
                the best ride window. Open the app, get the answer, close the
                app.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="h-px bg-n-200" />
      </div>
    </section>
  );
}
