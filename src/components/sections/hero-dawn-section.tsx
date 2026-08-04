"use client";

import { useEffect, useRef } from "react";
import { LogoMark } from "@/components/ui/Logo";
import styles from "./hero-dawn-section.module.css";

const INTRO_SEEN_KEY = "velovane-hero-intro-seen";

export function HeroDawnSection() {
  const introRef = useRef<HTMLDivElement>(null);
  const iocRef = useRef<HTMLDivElement>(null);
  const pushRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const rHRef = useRef<HTMLSpanElement>(null);
  const rMTRef = useRef<HTMLSpanElement>(null);
  const rMURef = useRef<HTMLSpanElement>(null);
  const L0Ref = useRef<HTMLDivElement>(null);
  const L1Ref = useRef<HTMLDivElement>(null);
  const L2Ref = useRef<HTMLDivElement>(null);
  const V0Ref = useRef<HTMLDivElement>(null);
  const V1Ref = useRef<HTMLDivElement>(null);
  const V2Ref = useRef<HTMLDivElement>(null);
  const P0Ref = useRef<HTMLDivElement>(null);
  const P1Ref = useRef<HTMLDivElement>(null);
  const P2Ref = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];
    let raf: number | null = null;
    let done = false;

    function unlock() {
      document.body.classList.remove("hero-dawn-lock");
    }

    function notifyIntroDone() {
      window.dispatchEvent(new Event("velovane:hero-intro-done"));
    }

    function markSeen() {
      try {
        localStorage.setItem(INTRO_SEEN_KEY, "1");
      } catch {
        /* ignore quota / private mode */
      }
    }

    const alreadySeen = (() => {
      try {
        return localStorage.getItem(INTRO_SEEN_KEY) === "1";
      } catch {
        return false;
      }
    })();

    function rollTo6() {
      if (rHRef.current) {
        const col = rHRef.current.querySelector(`.${styles.col}`);
        col?.classList.add(styles.roll || "roll");
      }
      if (rMTRef.current) {
        const col = rMTRef.current.querySelector(`.${styles.col}`);
        col?.classList.add(styles.roll || "roll");
      }
      if (rMURef.current) {
        const col = rMURef.current.querySelector(`.${styles.col}`);
        col?.classList.add(styles.roll || "roll");
      }
    }

    function fadeClock() {
      if (iocRef.current) {
        iocRef.current.classList.add(styles.faded || "faded");
      }
    }

    function fadeStorm() {
      if (introRef.current) {
        introRef.current.classList.add(styles.dawn || "dawn");
      }
      unlock();
    }

    function reveal() {
      if (pushRef.current) {
        pushRef.current.classList.add(styles.in || "in");
      }
    }

    function endIntro() {
      if (pushRef.current) {
        pushRef.current.classList.remove(styles.in || "in");
        pushRef.current.classList.add(styles.out || "out");
      }
      if (hintRef.current) {
        hintRef.current.classList.add(styles.show || "show");
      }
      if (introRef.current) {
        introRef.current.classList.add(styles.gone || "gone");
      }
      notifyIntroDone();
      markSeen();
    }

    function finish() {
      if (done) return;
      done = true;
      timers.forEach(clearTimeout);
      timers = [];
      
      // Snap roll
      rollTo6();
      
      // Reveal and end
      reveal();
      const endTimer = setTimeout(endIntro, 1600);
      timers.push(endTimer);
    }

    function play() {
      document.body.classList.add("hero-dawn-lock");
      
      const timer1 = setTimeout(rollTo6, 3000);
      const timer2 = setTimeout(fadeClock, 4200);
      const timer3 = setTimeout(fadeStorm, 5200);
      const timer4 = setTimeout(reveal, 5900);
      const timer5 = setTimeout(endIntro, 8800);
      
      timers.push(timer1, timer2, timer3, timer4, timer5);
    }

    // Skip button handler
    function onSkip() {
      finish();
    }

    // Once event handlers for user interaction
    function onceFinish() {
      finish();
      // Remove listeners
      window.removeEventListener("wheel", onceFinish);
      window.removeEventListener("keydown", onceFinish);
      window.removeEventListener("touchmove", onceFinish);
    }

    // Scrub tick function
    function tick() {
      if (!scrubRef.current) return;
      
      const rect = scrubRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - viewHeight)));
      const ramp = Math.pow(progress, 0.8);
      
      // Layer transitions
      if (L0Ref.current && L1Ref.current && L2Ref.current) {
        if (ramp < 0.33) {
          L0Ref.current.style.opacity = "1";
          L1Ref.current.style.opacity = "0";
          L2Ref.current.style.opacity = "0";
        } else if (ramp < 0.66) {
          const fade = (ramp - 0.33) / 0.33;
          L0Ref.current.style.opacity = String(1 - fade);
          L1Ref.current.style.opacity = String(fade);
          L2Ref.current.style.opacity = "0";
        } else {
          const fade = (ramp - 0.66) / 0.34;
          L0Ref.current.style.opacity = "0";
          L1Ref.current.style.opacity = String(1 - fade);
          L2Ref.current.style.opacity = String(fade);
        }
      }

      // Verdict transitions
      [V0Ref, V1Ref, V2Ref].forEach((ref, i) => {
        if (!ref.current) return;
        const start = i * 0.33;
        const end = start + 0.33;
        
        if (ramp >= start && ramp <= end) {
          const localProgress = (ramp - start) / 0.33;
          ref.current.style.opacity = String(Math.min(1, localProgress * 2));
          ref.current.style.transform = `translateY(${20 * (1 - localProgress)}px)`;
        } else {
          ref.current.style.opacity = "0";
          ref.current.style.transform = "translateY(20px)";
        }
      });

      // Progress indicators
      [P0Ref, P1Ref, P2Ref].forEach((ref, i) => {
        if (!ref.current) return;
        const start = i * 0.33;
        const isActive = ramp >= start;
        
        if (isActive) {
          ref.current.classList.add(styles.on || "on");
        } else {
          ref.current.classList.remove(styles.on || "on");
        }
      });
    }

    function onScroll() {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    }

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (alreadySeen) {
      // Returning visitor: skip intro but setup scrub
      rollTo6();
      if (introRef.current) {
        introRef.current.classList.add(styles.dawn || "dawn", styles.gone || "gone");
      }
      if (hintRef.current) {
        hintRef.current.classList.add(styles.show || "show");
      }
      notifyIntroDone();
    } else if (prefersReducedMotion) {
      // Reduced motion: quick sequence
      document.body.classList.add("hero-dawn-lock");
      rollTo6();
      if (pushRef.current) {
        pushRef.current.classList.add(styles.in || "in");
      }
      
      const revealTimer = setTimeout(reveal, 2000);
      const endTimer = setTimeout(endIntro, 3600);
      timers.push(revealTimer, endTimer);
    } else {
      // Normal intro
      play();
      
      // Setup skip button
      if (skipBtnRef.current) {
        skipBtnRef.current.addEventListener("click", onSkip);
      }
      
      // Setup once finish listeners (delayed)
      const delayedListenerTimer = setTimeout(() => {
        window.addEventListener("wheel", onceFinish, { once: true });
        window.addEventListener("keydown", onceFinish, { once: true });
        window.addEventListener("touchmove", onceFinish, { once: true });
      }, 4000);
      timers.push(delayedListenerTimer);
    }

    // Always setup scrub listeners
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", tick);
    tick(); // Initial call

    return () => {
      timers.forEach(clearTimeout);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", tick);
      window.removeEventListener("wheel", onceFinish);
      window.removeEventListener("keydown", onceFinish);
      window.removeEventListener("touchmove", onceFinish);
      if (skipBtnRef.current) {
        skipBtnRef.current.removeEventListener("click", onSkip);
      }
      unlock();
    };
  }, []);

  return (
    <>
      <div
        className={styles.intro}
        id="hero-dawn-intro"
        ref={introRef}
        data-nav-tone="dark"
      >
        <div className={styles.ioC} id="hero-dawn-ioc" ref={iocRef}>
          <div className={styles.ioLoc}>OMAHA, NE</div>
          <div className={styles.ioClock} id="hero-dawn-clock">
            <span className={styles.d}>0</span>
            <span className={styles.reel} id="hero-dawn-rH" ref={rHRef}>
              <span className={styles.col}>
                <span>5</span>
                <span>6</span>
              </span>
            </span>
            <span className={styles.cl}>:</span>
            <span className={styles.reel} id="hero-dawn-rMT" ref={rMTRef}>
              <span className={styles.col}>
                <span>5</span>
                <span>0</span>
              </span>
            </span>
            <span className={styles.reel} id="hero-dawn-rMU" ref={rMURef}>
              <span className={styles.col}>
                <span>9</span>
                <span>0</span>
              </span>
            </span>
          </div>
          <div className={styles.ioSub}>your morning window</div>
        </div>
        <button
          className={styles.skipb}
          id="hero-dawn-skipb"
          type="button"
          ref={skipBtnRef}
        >
          Skip intro
        </button>
      </div>

      <div className={styles.push} id="hero-dawn-push" ref={pushRef}>
        <div className={styles.pic} aria-hidden>
          <LogoMark size={22} />
        </div>
        <div className={styles.ptxt}>
          <div className={styles.pa}>VeloVane · now</div>
          <div className={styles.pb}>
            <b>Your window today — 10:30 AM.</b> Storms at dawn. Hold for it.
          </div>
        </div>
      </div>

      <section
        className={styles.scrub}
        id="how"
        ref={scrubRef}
        data-nav-tone="dark"
        aria-label="One morning, resolving"
      >
        <div className={styles.sticky}>
          <div className={`${styles.layer} ${styles.L0}`} id="hero-dawn-L0" ref={L0Ref} />
          <div className={`${styles.layer} ${styles.L1}`} id="hero-dawn-L1" ref={L1Ref} />
          <div className={`${styles.layer} ${styles.L2}`} id="hero-dawn-L2" ref={L2Ref} />
          <div className={styles.scrim} />
          <div className={styles.hd}>DWG VV-002 · One morning, resolving</div>
          <div className={styles.verd}>
            <div className={`${styles.v} ${styles.V0}`} id="hero-dawn-V0" ref={V0Ref}>
              <div className={styles.lab}>
                <span className={styles.d} />
                6:00 AM · dawn
              </div>
              <div className={styles.big}>SKIP</div>
              <div className={styles.sub}>Not this window.</div>
              <div className={styles.why2}>
                A line of storms, gusting 38. Crosswind on every exposed mile — it
                costs more than it gives.
              </div>
            </div>
            <div className={`${styles.v} ${styles.V1}`} id="hero-dawn-V1" ref={V1Ref}>
              <div className={styles.lab}>
                <span className={styles.d} />
                9:00 AM · clearing
              </div>
              <div className={styles.big}>WAIT</div>
              <div className={styles.sub}>Almost. Hold for it.</div>
              <div className={styles.why2}>
                The front&apos;s pushing east and the roads are still wet. Give it an hour — you&apos;re close.
              </div>
            </div>
            <div className={`${styles.v} ${styles.V2}`} id="hero-dawn-V2" ref={V2Ref}>
              <div className={styles.lab}>
                <span className={styles.d} />
                10:30 AM · your window
              </div>
              <div className={styles.big}>GO</div>
              <div className={styles.sub}>10:30 – 12:30.</div>
              <div className={styles.why2}>
                Cleared out. Steady 12 mph W — ride into it, tailwind home.
              </div>
            </div>
          </div>
          <div className={styles.prog}>
            <div className={`${styles.pt} ${styles.s}`} id="hero-dawn-P0" ref={P0Ref}>
              <span>
                Skip <em>6:00</em>
              </span>
              <i />
            </div>
            <div className={`${styles.pt} ${styles.w}`} id="hero-dawn-P1" ref={P1Ref}>
              <span>
                Wait <em>9:00</em>
              </span>
              <i />
            </div>
            <div className={`${styles.pt} ${styles.g}`} id="hero-dawn-P2" ref={P2Ref}>
              <span>
                Go <em>10:30</em>
              </span>
              <i />
            </div>
          </div>
        </div>
      </section>

      <div className={styles.shint} id="hero-dawn-hint" ref={hintRef}>
        <span>Scroll — read the day</span>
        <div className={styles.arw} />
      </div>

      <div className={styles.band} data-nav-tone="dark">
        <p>That&apos;s the morning VeloVane hands you. Now — the one it saves you from.</p>
      </div>
    </>
  );
}