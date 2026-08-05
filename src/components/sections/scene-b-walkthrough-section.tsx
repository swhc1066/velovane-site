import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { GoRecCard } from "@/components/ui/go-rec-card";
import { HourlyGoStrip } from "@/components/ui/hourly-go-strip";
import { PushNotification } from "@/components/ui/push-notification";
import { TempPanel } from "@/components/ui/temp-panel";
import { WindPanel } from "@/components/ui/wind-panel";

const sceneBTokens: CSSProperties = {
  // Brand guide v2.0 (docs/velovane-brand-guide-v2.html)
  "--scene-b-bg": "#FCF9F1",
  "--scene-b-card": "#F2ECDD",
  "--scene-b-card-pressed": "#E8E1D0",
  "--scene-b-text-primary": "#1A1814",
  "--scene-b-text-secondary": "#6B6358",
  "--scene-b-text-tertiary": "#9A9082",
  "--scene-b-border": "rgba(26, 24, 20, 0.16)",
  "--scene-b-border-subtle": "rgba(26, 24, 20, 0.10)",
  "--scene-b-status-go": "#5C8A52",
} as CSSProperties;

type SceneBBeat = {
  time: string;
  title: string;
  body: ReactNode;
  extra: ReactNode;
};

function WalkthroughIntro() {
  return (
    <div className="mb-16 max-w-[760px] md:mb-20">
      <h2 className="mb-5 font-mono text-[clamp(28px,4.2vw,52px)] font-normal leading-[1.05] tracking-[-0.025em] text-[color:var(--scene-b-text-primary)]">
        Five minutes
        <br />
        from waking
        <br />
        to <span className="text-[color:var(--scene-b-status-go)]">rolling out.</span>
      </h2>
      <p className="max-w-[620px] font-mono text-base leading-[1.55] text-[color:var(--scene-b-text-secondary)]">
        VeloVane saw the shift coming. It would have told you the night before, and
        again at breakfast, exactly when to ride. Here&apos;s what your Saturday morning
        would have looked like instead.
      </p>
    </div>
  );
}


export function SceneBWalkthroughSection() {
  const beats: SceneBBeat[] = [
    {
      time: "6:00 AM",
      title: "Your phone buzzes.",
      body: (
        <>
          One notification. One sentence.{" "}
          <strong className="font-medium text-[color:var(--scene-b-text-primary)]">
            Today&apos;s recommendation and your best ride window.
          </strong>{" "}
          Everything you need to decide before you&apos;ve put your feet on the floor.
        </>
      ),
      extra: <PushNotification />,
    },
    {
      time: "6:01 AM",
      title: "You open the app.",
      body: (
        <>
          The full card. Go, wait, or skip, with the rationale, the window, and the numbers that
          actually matter on a bike.{" "}
          <strong className="font-medium text-[color:var(--scene-b-text-primary)]">
            No scrolling, no interpreting.
          </strong>{" "}
          Open the app, get the answer, close the app.
        </>
      ),
      extra: <GoRecCard />,
    },
    {
      time: "6:02 AM",
      title: "You check the wind.",
      body: (
        <>
          <strong className="font-medium text-[color:var(--scene-b-text-primary)]">
            10 mph out of the N.
          </strong>{" "}
          Gusts to 14. Shifting across the forecast — light enough that the out-and-back still
          works. VeloVane scores wind against your ride pattern, not just raw speed.
        </>
      ),
      extra: <WindPanel />,
    },
    {
      time: "6:03 AM",
      title: "You check the temperature.",
      body: (
        <>
          <strong className="font-medium text-[color:var(--scene-b-text-primary)]">
            74°F. Feels like 77°F.
          </strong>{" "}
          High 77 / low 62 — ideal for the window. VeloVane reads the day against your thresholds,
          not a generic comfort chart.
        </>
      ),
      extra: <TempPanel />,
    },
    {
      time: "6:04 AM",
      title: "You kit up.",
      body: (
        <>
          The hourly strip marks your window in green — 12pm to 2pm. Temp, wind, and rain risk
          already scored.{" "}
          <strong className="font-medium text-[color:var(--scene-b-text-primary)]">
            You&apos;re dressed for the ride you&apos;re actually taking
          </strong>
          , and the door is already open.
        </>
      ),
      extra: <HourlyGoStrip />,
    },
  ];

  return (
    <section
      id="features"
      data-nav-tone="light"
      style={sceneBTokens}
      className="bg-[color:var(--scene-b-bg)] px-6 py-16 text-[color:var(--scene-b-text-primary)] md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 md:mb-16">
          <div className="flex items-center gap-5">
            <div className="h-px flex-1 bg-[color:var(--scene-b-border)]" aria-hidden />
            <span className="whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--scene-b-text-tertiary)]">
              Scene B · With VeloVane · DWG VV-001 REV D
            </span>
            <div className="h-px flex-1 bg-[color:var(--scene-b-border)]" aria-hidden />
          </div>
        </div>

        <WalkthroughIntro />

        <div className="mb-16 md:mb-[72px]">
          {beats.map((beat, i) => {
            const isLast = i === beats.length - 1;
            const bodyBlock = (
              <>
                <h3 className="mb-3.5 font-mono text-2xl font-normal leading-snug tracking-[-0.015em] text-[color:var(--scene-b-text-primary)]">
                  {beat.title}
                </h3>
                <p className="mb-7 max-w-[540px] font-mono text-[15px] leading-relaxed text-[color:var(--scene-b-text-secondary)]">
                  {beat.body}
                </p>
                {beat.extra}
              </>
            );
            return (
              <article key={beat.time} className="py-8 md:py-10">
                <div className="relative border-l border-[color:var(--scene-b-border)] pl-6 md:hidden">
                  <span
                    className={`absolute top-2 left-[-4.5px] size-2 rounded-full border-2 border-vv-blue ${
                      isLast ? "bg-vv-blue" : "bg-[color:var(--scene-b-bg)]"
                    }`}
                    aria-hidden
                  />
                  <div className="mb-3 font-mono text-[13px] font-medium tracking-[0.06em] text-[color:var(--scene-b-text-secondary)]">
                    {beat.time}
                  </div>
                  <div className="min-w-0 max-w-[720px]">{bodyBlock}</div>
                </div>

                <div className="relative hidden md:flex md:gap-10 lg:gap-14">
                  <div className="w-[100px] shrink-0 pt-1 font-mono text-[13px] font-medium tracking-[0.06em] text-[color:var(--scene-b-text-secondary)]">
                    {beat.time}
                  </div>
                  <div className="relative flex w-px shrink-0 self-stretch justify-center bg-[color:var(--scene-b-border)]">
                    <span
                      className={`absolute top-2 size-[9px] shrink-0 rounded-full border-2 border-vv-blue ${
                        isLast ? "bg-vv-blue" : "bg-[color:var(--scene-b-bg)]"
                      }`}
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0 max-w-[720px] flex-1">{bodyBlock}</div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-16 max-w-[760px] border-t border-[color:var(--scene-b-border)] pt-12 text-left md:mt-[72px] md:pt-12">
          <p className="mb-8 font-mono text-[clamp(18px,2.4vw,26px)] font-normal leading-snug tracking-[-0.01em] text-[color:var(--scene-b-text-primary)]">
            By <span className="text-vv-blue-darker">6:05</span>, you&apos;re out the door. By{" "}
            <span className="text-vv-blue-darker">9:30</span>, you&apos;re home, with the ride you
            actually wanted. No guessing. No fighting the wind. No regret.
          </p>
          <Link
            href="#notify"
            className="inline-flex items-center gap-3 border-b border-vv-blue pb-1.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-vv-blue transition-[color,border-color,gap] hover:gap-4 hover:border-vv-blue-darker hover:text-vv-blue-darker"
          >
            Get notified at launch
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
