"use client";

import { useEffect, useRef } from "react";
import { LogoMark } from "@/components/ui/Logo";
import { HERO_INTRO_DONE_EVENT, HERO_INTRO_SEEN_KEY } from "@/lib/hero-intro";
import styles from "./hero-dawn-section.module.css";

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
    let timers: ReturnType<typeof setTimeout>[] = [];
    let raf: number | null = null;
    let done = false;
    let touchStartY: number | null = null;

    function unlock() {
      document.body.classList.remove("hero-dawn-lock");
    }

    function notifyIntroDone() {
      window.dispatchEvent(new Event(HERO_INTRO_DONE_EVENT));
    }

    function markSeen() {
      try {
        localStorage.setItem(HERO_INTRO_SEEN_KEY, "1");
      } catch {
        /* ignore quota / private mode */
      }
    }

    const alreadySeen = (() => {
      try {
        return localStorage.getItem(HERO_INTRO_SEEN_KEY) === "1";
      } catch {
        return false;
      }
    })();

    function rollTo6(snap: boolean = false) {
      [rHRef, rMTRef, rMURef].forEach((ref, i) => {
        if (ref.current) {
          const col = ref.current.querySelector(`.${styles.col}`) as HTMLElement;
          if (col) {
            if (snap) {
              col.style.transition = 'none';
              col.classList.add(styles.roll || "roll");
            } else {
              const timer = setTimeout(() => {
                col.classList.add(styles.roll || "roll");
              }, i * 250);
              timers.push(timer);
            }
          }
        }
      });
    }

    function fadeClock() {
      if (iocRef.current) {
        iocRef.current.classList.add(styles.faded || "faded");
      }
    }

    function fadeStorm() {
      if (introRef.current) {
        introRef.current.classList.add(styles.dawn || "dawn");
        introRef.current.style.pointerEvents = 'none';
      }
      unlock();
    }

    function reveal() {
      fadeClock();
      fadeStorm();
    }

    function endIntro() {
      unlock(); // For safety - ensure unlock if reveal() hasn't run yet
      if (pushRef.current) {
        pushRef.current.classList.remove(styles.in || "in");
        pushRef.current.classList.add(styles.out || "out");
      }
      if (hintRef.current) {
        hintRef.current.classList.add(styles.show || "show");
      }
      const timer = setTimeout(() => {
        if (introRef.current) {
          introRef.current.classList.add(styles.gone || "gone");
        }
      }, 1100);
      timers.push(timer);
      notifyIntroDone();
      markSeen();
    }

    function finish() {
      if (done) return;
      done = true;
      timers.forEach(clearTimeout);
      timers = [];
      rollTo6(true); // Snap roll
      reveal(); // This calls fadeClock() + fadeStorm() which unlocks
      endIntro(); // Immediate, not delayed
    }

    function play() {
      document.body.classList.add("hero-dawn-lock");
      
      const timer1 = setTimeout(() => rollTo6(false), 3000);
      const timer2 = setTimeout(() => {
        if (pushRef.current) {
          pushRef.current.classList.add(styles.in || "in");
        }
      }, 4200);
      const timer3 = setTimeout(fadeClock, 5200);
      const timer4 = setTimeout(fadeStorm, 5900);
      const timer5 = setTimeout(() => {
        if (!done) {
          done = true;
          detachSkipListeners();
          endIntro();
        }
      }, 8800);
      
      timers.push(timer1, timer2, timer3, timer4, timer5);
    }

    function detachSkipListeners() {
      window.removeEventListener("wheel", onWheelSkip);
      window.removeEventListener("keydown", onKeySkip);
      window.removeEventListener("touchstart", onTouchStart, true);
      window.removeEventListener("touchmove", onTouchMoveSkip);
    }

    function onSkip() {
      finish();
      detachSkipListeners();
    }

    // Intentional skip only — ignore trackpad noise / tiny touch jitters.
    // Armed after the push lands so the clock beat can play out.
    function onWheelSkip(e: WheelEvent) {
      if (Math.abs(e.deltaY) < 40 && Math.abs(e.deltaX) < 40) return;
      onSkip();
    }

    function onKeySkip(e: KeyboardEvent) {
      const key = e.key;
      if (
        key !== "Escape" &&
        key !== " " &&
        key !== "Enter" &&
        key !== "ArrowDown" &&
        key !== "PageDown"
      ) {
        return;
      }
      onSkip();
    }

    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0]?.clientY ?? null;
    }

    function onTouchMoveSkip(e: TouchEvent) {
      if (touchStartY == null) return;
      const y = e.touches[0]?.clientY;
      if (y == null || Math.abs(y - touchStartY) < 36) return;
      onSkip();
    }

    // Scrub tick function - exact reference implementation
    function tick() {
      if (!scrubRef.current) return;
      
      const rect = scrubRef.current.getBoundingClientRect();
      const total = scrubRef.current.offsetHeight - window.innerHeight;
      const p = cl(-rect.top / total);
      
      // Hide hint when scrollY > 40
      if (window.scrollY > 40 && hintRef.current) {
        hintRef.current.classList.add(styles.hide || "hide");
      }
      
      // Layer opacities (exact reference math)
      if (L1Ref.current) {
        L1Ref.current.style.opacity = String(ramp(0.26, 0.46, p));
      }
      const l2 = ramp(0.58, 0.80, p);
      if (L2Ref.current) {
        L2Ref.current.style.opacity = String(l2);
      }
      
      // Layer transforms
      if (L0Ref.current) {
        L0Ref.current.style.transform = `scale(1.08) translateY(${p * -2.4}%)`;
      }
      if (L1Ref.current) {
        L1Ref.current.style.transform = `scale(1.08) translateY(${p * -3.6}%)`;
      }
      if (L2Ref.current) {
        L2Ref.current.style.transform = `scale(${1.09 - 0.03 * l2}) translateY(${(p - 0.5) * -3.4}%)`;
      }
      
      // Verdict opacities and transforms
      const o0 = 1 - ramp(0.20, 0.30, p);
      const o1 = cl(Math.min(ramp(0.34, 0.44, p), 1 - ramp(0.56, 0.64, p)));
      const o2 = ramp(0.70, 0.82, p);
      
      if (V0Ref.current) {
        V0Ref.current.style.opacity = String(o0);
        V0Ref.current.style.transform = `translateY(${(1 - o0) * 16}px)`;
      }
      if (V1Ref.current) {
        V1Ref.current.style.opacity = String(o1);
        V1Ref.current.style.transform = `translateY(${(1 - o1) * 16}px)`;
      }
      if (V2Ref.current) {
        V2Ref.current.style.opacity = String(o2);
        V2Ref.current.style.transform = `translateY(${(1 - o2) * 16}px)`;
      }
      
      // Progress indicators
      if (P0Ref.current) {
        P0Ref.current.classList.toggle(styles.on || "on", p < 0.30);
      }
      if (P1Ref.current) {
        P1Ref.current.classList.toggle(styles.on || "on", p >= 0.30 && p < 0.67);
      }
      if (P2Ref.current) {
        P2Ref.current.classList.toggle(styles.on || "on", p >= 0.67);
      }
    }
    
    // Helper functions for exact reference math
    function cl(x: number): number {
      return Math.max(0, Math.min(1, x));
    }
    
    function ramp(a: number, b: number, x: number): number {
      return cl((x - a) / (b - a));
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        tick();
      });
    }

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (alreadySeen) {
      // Returning visitor: no lock, snap clock, intro dawn+gone, skip push, show hint
      rollTo6(true); // Snap
      if (introRef.current) {
        introRef.current.classList.add(styles.dawn || "dawn", styles.gone || "gone");
      }
      if (hintRef.current) {
        hintRef.current.classList.add(styles.show || "show");
      }
      notifyIntroDone();
      markSeen();
    } else if (prefersReducedMotion) {
      // Reduced motion: lock; rollTo6(true); push.in; reveal @2000; at 3600 if !done { done=true; endIntro() }
      document.body.classList.add("hero-dawn-lock");
      rollTo6(true); // Snap roll
      if (pushRef.current) {
        pushRef.current.classList.add(styles.in || "in");
      }
      
      const revealTimer = setTimeout(reveal, 2000);
      const endTimer = setTimeout(() => {
        if (!done) {
          done = true;
          endIntro();
        }
      }, 3600);
      timers.push(revealTimer, endTimer);
    } else {
      // Normal intro
      play();
    }

    if (!alreadySeen) {
      if (skipBtnRef.current) {
        skipBtnRef.current.addEventListener("click", onSkip);
      }

      // Don't arm scroll/key skip until the push notification appears (~4.2s).
      // Earlier arming let trackpad noise kill the clock beat immediately.
      const delayedListenerTimer = setTimeout(() => {
        window.addEventListener("wheel", onWheelSkip, { passive: true });
        window.addEventListener("keydown", onKeySkip);
        window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
        window.addEventListener("touchmove", onTouchMoveSkip, { passive: true });
      }, 4200);
      timers.push(delayedListenerTimer);
    }

    // Always setup scrub listeners
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", tick);
    tick(); // Initial call

    return () => {
      timers.forEach(clearTimeout);
      if (raf !== null) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", tick);
      detachSkipListeners();
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