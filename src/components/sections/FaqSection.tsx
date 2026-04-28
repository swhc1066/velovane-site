import { ScrollReveal } from "../ui/ScrollReveal";
import { FaqAccordion } from "../ui/FaqAccordion";
import { FAQ_ITEMS } from "@/lib/constants";

export function FaqSection() {
  return (
    <section data-nav-tone="light" className="section-rounded-b relative bg-white" id="faq">
      <div className="mx-auto max-w-[1200px] px-5 py-20 md:py-32">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-0">
          {/* Left heading */}
          <div className="md:col-span-4">
            <ScrollReveal>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-1 w-px bg-n-400" />
                <span className="font-mono text-[10px] font-light uppercase tracking-widest text-vv-blue">
                  FAQ
                </span>
              </div>
              <h2 className="font-mono text-2xl font-light leading-snug text-n-800 md:text-3xl">
                Your ride questions, answered.
              </h2>
            </ScrollReveal>
          </div>

          {/* Right accordion */}
          <div className="md:col-span-7 md:col-start-6">
            <ScrollReveal delay={0.1}>
              {FAQ_ITEMS.map((item, i) => (
                <FaqAccordion
                  key={i}
                  question={item.question}
                  answer={item.answer}
                  number={i + 1}
                  defaultOpen={i === 0}
                />
              ))}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
