import type { CSSProperties } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { APP_GALLERY_ITEMS } from "@/lib/constants";

const galleryTokens: CSSProperties = {
  "--scene-b-bg": "#FCF9F1",
  "--scene-b-text-primary": "#1A1814",
  "--scene-b-text-secondary": "#6B6358",
  "--scene-b-text-tertiary": "#9A9082",
  "--scene-b-border": "rgba(26, 24, 20, 0.16)",
} as CSSProperties;

export function AppGallerySection() {
  return (
    <section
      id="the-app"
      data-nav-tone="light"
      style={galleryTokens}
      className="relative bg-[color:var(--scene-b-bg)] px-5 py-[72px] text-[color:var(--scene-b-text-primary)] md:px-8 md:py-[100px] lg:py-[120px]"
    >
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-16 max-w-[720px] md:mb-20">
          <ScrollReveal>
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-[10px] font-normal uppercase tracking-[0.14em] text-[color:var(--scene-b-text-tertiary)]">
                03
              </span>
              <div className="h-px w-10 bg-vv-blue-dark/40" aria-hidden />
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-vv-blue-dark">
                The app
              </span>
            </div>
            <h2 className="mb-[18px] font-mono text-[clamp(28px,3.4vw,44px)] font-light leading-[1.15] tracking-[-0.015em] text-[color:var(--scene-b-text-primary)]">
              Four screens.{" "}
              <span className="font-normal text-vv-blue-dark">One question answered.</span>
            </h2>
            <p className="max-w-[580px] font-mono text-sm font-light leading-[1.7] text-[color:var(--scene-b-text-secondary)]">
              VeloVane replaces the morning weather-app tabbing, forecast, wind map, radar,
              feels-like math, with a single, clear call. Here&apos;s what that looks like on a
              phone.
            </p>
          </ScrollReveal>
        </header>

        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-10">
          {APP_GALLERY_ITEMS.map((item, i) => (
            <ScrollReveal key={item.stamp} delay={i * 0.06}>
              <figure className="group flex flex-col">
                <div className="relative mb-6 flex justify-center">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={280}
                    height={560}
                    className="h-auto w-full max-w-[280px] transition-[transform,filter] duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] [filter:drop-shadow(0_2px_4px_rgba(26,24,20,0.04))_drop-shadow(0_12px_28px_rgba(26,24,20,0.08))_drop-shadow(0_24px_48px_rgba(26,24,20,0.06))] group-hover:-translate-y-1.5 group-hover:[filter:drop-shadow(0_2px_4px_rgba(26,24,20,0.04))_drop-shadow(0_18px_36px_rgba(26,24,20,0.12))_drop-shadow(0_32px_56px_rgba(26,24,20,0.08))] sm:max-w-[300px] lg:max-w-[280px]"
                  />
                </div>
                <figcaption className="px-1">
                  <div className="mb-2.5 font-mono text-[9px] font-normal uppercase tracking-[0.16em] text-[color:var(--scene-b-text-tertiary)]">
                    {item.stamp}
                  </div>
                  <div className="mb-2.5 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-vv-blue-dark">
                    <span className="size-[5px] shrink-0 rounded-full bg-vv-blue" aria-hidden />
                    {item.label}
                  </div>
                  <p className="font-mono text-sm font-normal leading-normal tracking-[-0.005em] text-[color:var(--scene-b-text-primary)]">
                    {item.text}
                  </p>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[color:var(--scene-b-border)] pt-8 font-mono text-[10px] font-normal uppercase tracking-[0.14em] text-[color:var(--scene-b-text-tertiary)] sm:mt-20 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <div className="flex items-center gap-2.5">
            <span className="size-[5px] shrink-0 rounded-full bg-[#5C8A52]" aria-hidden />
            <span>iOS · Android to follow</span>
          </div>
          <div>v0.4 · CALIBRATING</div>
        </div>
      </div>
    </section>
  );
}
