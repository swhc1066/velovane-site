import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/ui/Logo";

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

function MiniNotif() {
  return (
    <div className="max-w-[380px] rounded-sm border-[0.5px] border-[color:var(--scene-b-border)] bg-[color:var(--scene-b-card)] px-[18px] py-3.5">
      <div className="mb-2.5 flex items-center gap-2.5">
        <span className="flex size-5 shrink-0 items-center justify-center bg-vv-blue">
          <LogoMark size={14} />
        </span>
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--scene-b-text-primary)]">
          VeloVane
        </span>
        <span className="ml-auto font-mono text-[10px] tracking-[0.05em] text-[color:var(--scene-b-text-tertiary)]">
          NOW
        </span>
      </div>
      <p className="font-mono text-[13px] leading-normal text-[color:var(--scene-b-text-primary)]">
        <strong className="font-semibold text-[color:var(--scene-b-status-go)]">GO</strong>: 7:00 -
        9:30 AM. Steady 12 mph W, 52° on the bike. Tailwind home.
      </p>
    </div>
  );
}

function BeatEmbedCard() {
  return (
    <div className="max-w-[340px] border-[0.5px] border-[#C4D6BB] bg-[#DCE8D5] px-[22px] py-5">
      <div className="mb-3.5 flex items-center gap-2.5 border-b border-[#C4D6BB] pb-3">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5C8A52]">
          <span className="size-1.5 rounded-full bg-[#5C8A52]" aria-hidden />
          Go
        </span>
        <span className="font-mono text-[10px] tracking-[0.1em] text-[color:var(--scene-b-text-secondary)]">
          TODAY
        </span>
      </div>
      <div className="mb-1 font-mono text-2xl font-normal leading-tight tracking-[-0.01em] text-[color:var(--scene-b-text-primary)]">
        7:00 - 9:30 AM
      </div>
      <p className="mb-3.5 font-mono text-[11px] text-[color:var(--scene-b-text-secondary)]">
        2.5 hour window · tailwind home
      </p>
      <div className="grid grid-cols-3 gap-px bg-[#C4D6BB]">
        {[
          { label: "On bike", value: "52°F" },
          { label: "Wind", value: "12 W" },
          { label: "Precip", value: "4%" },
        ].map((m) => (
          <div key={m.label} className="bg-[#DCE8D5] p-2.5">
            <div className="mb-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-[color:var(--scene-b-text-secondary)]">
              {m.label}
            </div>
            <div className="font-mono text-sm font-medium text-[color:var(--scene-b-text-primary)]">
              {m.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WindViz() {
  return (
    <div className="flex max-w-[440px] flex-col gap-6 border-[0.5px] border-[color:var(--scene-b-border)] bg-[color:var(--scene-b-card)] p-6 max-[900px]:max-w-full md:flex-row md:items-center md:gap-7 md:p-7">
      <div className="relative mx-auto size-24 shrink-0 rounded-full border border-[color:var(--scene-b-border)] md:mx-0">
        {(["N", "E", "S", "W"] as const).map((d, i) => (
          <span
            key={d}
            className={`absolute font-mono text-[9px] font-medium text-[color:var(--scene-b-border)] ${
              d === "N"
                ? "top-1 left-1/2 -translate-x-1/2"
                : d === "E"
                  ? "top-1/2 right-1 -translate-y-1/2"
                  : d === "S"
                    ? "bottom-1 left-1/2 -translate-x-1/2"
                    : "top-1/2 left-1 -translate-y-1/2"
            }`}
          >
            {d}
          </span>
        ))}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: "rotate(240deg)" }}
          aria-hidden
        >
          <svg className="size-[50px]" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3 L12 19 M12 3 L7 9 M12 3 L17 9"
              stroke="#5BA4D4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="grid flex-1 gap-3 font-mono">
        {[
          { label: "Direction", value: "WSW 240°" },
          { label: "Speed", value: "12 mph" },
          { label: "Gusts", value: "18 mph" },
          { label: "Crosswind", value: "Low" },
        ].map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-3">
            <span className="text-[9px] uppercase tracking-[0.1em] text-[color:var(--scene-b-text-secondary)]">
              {row.label}
            </span>
            <span className="text-[13px] font-medium text-[color:var(--scene-b-text-primary)]">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TempViz() {
  return (
    <div className="flex max-w-[420px] border-[0.5px] border-[color:var(--scene-b-border)] max-[900px]:max-w-full">
      <div className="flex-1 bg-[color:var(--scene-b-card)] px-7 py-5">
        <div className="mb-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[color:var(--scene-b-text-secondary)]">
          Standard
        </div>
        <div className="font-mono text-[40px] font-light leading-none tracking-[-0.025em] text-[color:var(--scene-b-text-primary)]">
          54°
        </div>
        <div className="mt-2 font-mono text-[10px] tracking-[0.06em] text-[color:var(--scene-b-text-secondary)]">
          AMBIENT
        </div>
      </div>
      <div className="flex-1 bg-vv-blue-light px-7 py-5">
        <div className="mb-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-vv-blue-darker">
          On the bike
        </div>
        <div className="font-mono text-[40px] font-medium leading-none tracking-[-0.025em] text-vv-blue-darker">
          47°
        </div>
        <div className="mt-2 font-mono text-[10px] tracking-[0.06em] text-[color:var(--scene-b-text-secondary)]">
          AT 17 MPH
        </div>
      </div>
    </div>
  );
}

function DaylightViz() {
  return (
    <div className="max-w-[460px] max-[900px]:max-w-full">
      <div
        className="relative mt-6 mb-2.5 h-9 border border-[color:var(--scene-b-border)]"
        style={{
          background:
            "linear-gradient(90deg, #1A2332 0%, #3A4A5C 8%, #8FC1E2 14%, #E8F2FA 22%, #FFF4D4 45%, #FFF4D4 60%, #E8F2FA 82%, #3A4A5C 94%, #1A2332 100%)",
        }}
      >
        <div className="absolute -top-[5px] -bottom-[5px] left-[19%] w-[22%] border-2 border-vv-blue bg-vv-blue/10">
          <span className="absolute -top-[22px] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-vv-blue-darker">
            RIDE WINDOW
          </span>
        </div>
      </div>
      <div className="flex justify-between px-0.5 font-mono text-[9px] tracking-[0.08em] text-[color:var(--scene-b-text-tertiary)]">
        {["5 AM", "7 AM", "9 AM", "11 AM", "1 PM"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <p className="mt-2.5 font-mono text-[11px] tracking-[0.02em] text-[color:var(--scene-b-text-secondary)]">
        Dawn, ride window, midday shift arriving ~10:30
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
      extra: <MiniNotif />,
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
      extra: <BeatEmbedCard />,
    },
    {
      time: "6:02 AM",
      title: "You check the wind.",
      body: (
        <>
          <strong className="font-medium text-[color:var(--scene-b-text-primary)]">
            12 mph from the west, steady.
          </strong>{" "}
          Gusts to 18, crosswind exposure low. VeloVane scores wind against your ride pattern, not
          just raw speed, but how it&apos;ll feel on the bike you actually ride.
        </>
      ),
      extra: <WindViz />,
    },
    {
      time: "6:03 AM",
      title: "You check the temperature.",
      body: (
        <>
          <strong className="font-medium text-[color:var(--scene-b-text-primary)]">
            54° outside. 47° on the bike.
          </strong>{" "}
          VeloVane knows you&apos;ll be moving at 17 mph. Standard apps miss this by ten degrees on a
          windy day, which is the difference between the right kit and a cold, miserable first hour.
        </>
      ),
      extra: <TempViz />,
    },
    {
      time: "6:04 AM",
      title: "You kit up.",
      body: (
        <>
          Civil twilight at 6:12. The daylight bar confirms full light through the window. Seasonal
          shifts accounted for automatically.{" "}
          <strong className="font-medium text-[color:var(--scene-b-text-primary)]">
            You&apos;re dressed for the ride you&apos;re actually taking
          </strong>
          , and the door is already open.
        </>
      ),
      extra: <DaylightViz />,
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
