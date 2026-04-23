import { ScrollReveal } from "../ui/ScrollReveal";
import { BracketCard } from "../ui/BracketCard";
import { PLATFORM_CARDS } from "@/lib/constants";

export function PlatformSection() {
  return (
    <section data-nav-tone="light" className="relative bg-surface-light" id="platform">
      <div className="mx-auto max-w-[1200px] px-5 py-20 md:py-32">
        {/* Header */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <ScrollReveal>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-1 w-px bg-n-400" />
                <span className="font-mono text-[10px] font-light uppercase tracking-widest text-vv-blue">
                  Platform
                </span>
              </div>
              <h2 className="font-mono text-2xl font-light leading-snug text-n-800 md:text-3xl">
                Intelligence that rides with you.
              </h2>
            </ScrollReveal>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-8">
            <ScrollReveal delay={0.1}>
              <p className="font-mono text-base font-light leading-relaxed text-n-600">
                Beyond the dashboard, VeloVane wraps cycling intelligence around
                your daily routine — from morning notifications to AI-powered
                ride planning.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {PLATFORM_CARDS.map((card, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <BracketCard className="h-full border border-n-200">
                <div className="relative">
                  <span className="font-mono text-[10px] text-n-400">
                    {card.number}
                  </span>
                  <h4 className="mt-2 mb-3 font-mono text-lg font-medium leading-snug text-n-800">
                    {card.title}
                  </h4>
                  <p className="text-sm font-light leading-relaxed text-n-600">
                    {card.description}
                  </p>
                </div>
              </BracketCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
