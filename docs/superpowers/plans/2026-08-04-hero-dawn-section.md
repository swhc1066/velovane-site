# Hero Dawn Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the light marketing hero with the reference cold-open intro + SKIP→WAIT→GO scrub + bridge, using graded sky assets, a single logo-bearing nav, and once-per-visitor intro gating — without touching Scene A or anything below.

**Architecture:** One client `HeroDawnSection` owns intro timeline, scrub scroll logic, and bridge markup with a CSS module. `Navbar` is upgraded in place (LogoMark + Today chip + new links + existing light/dark tone). Graded JPGs live under `public/assets/`. Intro state uses `localStorage` + body lock with guaranteed cleanup.

**Tech Stack:** Next.js 16 App Router, React 19 client components, CSS modules, existing `LogoMark`, Framer Motion unused for this timeline (vanilla timers/rAF to match reference).

## Global Constraints

- Copy and times from the HTML reference stay verbatim (6:00 AM push, GO window 10:30–12:30, Omaha). Do not change Scene A Saturday times.
- Do not modify `RideMapPanel` or any section after `RideSceneChapterIntro`.
- Single site nav only; Pricing + Get notified → `#download`; How it reads → `#how` on scrub.
- Real `LogoMark` in nav and push toast (no green “V” square).
- Graded assets only: `/assets/velovane-skip.jpg`, `/assets/velovane-wait.jpg`, `/assets/velovane-go.jpg`.
- Intro once per visitor via `localStorage` key `velovane-hero-intro-seen`.
- Always release body scroll lock on finish, skip, reduced-motion end, and unmount.
- Reuse Geist Mono already loaded in `layout.tsx`; do not add another font link.
- Commits: only when the user explicitly asks (skip commit steps otherwise).

**Spec:** `docs/superpowers/specs/2026-08-04-hero-dawn-section-design.md`  
**Reference:** `/Users/seancraig/Downloads/velovane-hero-section.html` (also mirrored at `assets/velovane-hero-section.html`)

---

## File map

| File | Responsibility |
|------|----------------|
| `public/assets/velovane-{skip,wait,go}.jpg` | Static graded sky layers for scrub |
| `src/app/globals.css` | `body.hero-dawn-lock` rule only |
| `src/components/sections/hero-dawn-section.module.css` | Scoped intro/scrub/bridge/hint styles |
| `src/components/sections/hero-dawn-section.tsx` | Intro + scrub + bridge + effects |
| `src/components/layout/Navbar.tsx` | LogoMark + chip + links + show/scrolled + tone |
| `src/components/sections/ride-scene-chapter-intro.tsx` | Drop `id="how"` |
| `src/app/page.tsx` | Mount new hero; remove old hero + atmospherics |

---

### Task 1: Assets + body lock CSS

**Files:**
- Create: `public/assets/velovane-skip.jpg`, `public/assets/velovane-wait.jpg`, `public/assets/velovane-go.jpg`
- Modify: `src/app/globals.css` (append lock rule)

**Interfaces:**
- Produces: URLs `/assets/velovane-skip.jpg`, `/assets/velovane-wait.jpg`, `/assets/velovane-go.jpg`; class name `hero-dawn-lock` on `document.body`

- [ ] **Step 1: Copy graded assets into public**

```bash
mkdir -p public/assets
cp assets/velovane-skip.jpg assets/velovane-wait.jpg assets/velovane-go.jpg public/assets/
ls -la public/assets/velovane-*.jpg
```

Expected: three JPG files present under `public/assets/`.

- [ ] **Step 2: Add body lock rule to globals**

Append to `src/app/globals.css`:

```css
/* Hero dawn intro — scroll lock while cold-open plays */
body.hero-dawn-lock {
  overflow: hidden;
  height: 100vh;
}
```

- [ ] **Step 3: Verify assets are served**

Run: `npm run dev` (if not already), then open `http://localhost:3000/assets/velovane-skip.jpg`  
Expected: image loads (not 404).

---

### Task 2: Hero CSS module

**Files:**
- Create: `src/components/sections/hero-dawn-section.module.css`

**Interfaces:**
- Produces: CSS module class names used by Task 3 (`intro`, `dawn`, `gone`, `ioC`, `faded`, `ioLoc`, `ioClock`, `d`, `cl`, `reel`, `col`, `roll`, `ioSub`, `skipb`, `push`, `in`, `out`, `pic`, `ptxt`, `pa`, `pb`, `scrub`, `sticky`, `layer`, `L0`, `L1`, `L2`, `scrim`, `hd`, `verd`, `v`, `lab`, `big`, `sub`, `why2`, `prog`, `pt`, `on`, `s`, `w`, `g`, `shint`, `show`, `hide`, `arw`, `band`, plus CSS variables `--skip`, `--wait`, `--go`, `--go-glow`)

- [ ] **Step 1: Create the module from the reference CSS**

Port styles from the reference `<style>` block with these adaptations:

1. Drop global `*`, `html`, and `body { font-family… background… }` resets (site already has those).
2. Keep intro/push/scrub/verdict/progress/hint/band rules; convert selectors to camelCase CSS-module classes (e.g. `.io-c` → `.ioC`, `.io-clock` → `.ioClock`).
3. Nest or compose child selectors under parents where needed so `:global` is unnecessary for reels:

```css
.ioClock .reel { … }
.ioClock .col.roll { transform: translateY(-1em); }
```

4. Layer backgrounds (no base64):

```css
.L0 {
  opacity: 1;
  background-image: url("/assets/velovane-skip.jpg");
}
.L1 {
  opacity: 0;
  background-image: url("/assets/velovane-wait.jpg");
}
.L2 {
  opacity: 0;
  background-image: url("/assets/velovane-go.jpg");
}
```

5. Scope tokens at module root:

```css
.scrub,
.intro,
.push,
.shint,
.band {
  --skip: #ef5350;
  --wait: #f9a825;
  --go: #35c46a;
  --go-glow: rgba(53, 196, 106, 0.55);
  font-family: var(--font-mono);
}
```

6. `.pic` becomes a flex centering slot for `LogoMark` (no solid green fill required; use a subtle dark/neutral plate so the blue mark reads):

```css
.pic {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

7. Keep `@media (max-width: 700px)` rules for padding / hide `.today` (today chip lives in Navbar Task 4 — if chip class is in Navbar Tailwind, the media hide is there instead; do not leave a dead `.today` rule in the hero module).

8. Verdict color rules target module classes `.V0`, `.V1`, `.V2` (not raw `#V0` ids).

- [ ] **Step 2: Sanity-check module has no data: URLs**

```bash
rg -n "data:image|fonts.googleapis|Geist Mono" src/components/sections/hero-dawn-section.module.css
```

Expected: no matches (font comes from the site; images are `/assets/…` paths).

---

### Task 3: `HeroDawnSection` component + effects

**Files:**
- Create: `src/components/sections/hero-dawn-section.tsx`

**Interfaces:**
- Consumes: CSS module from Task 2; `LogoMark` from `@/components/ui/Logo`; asset URLs from Task 1
- Produces: `export function HeroDawnSection()`; dispatches `window` event `velovane:hero-intro-done` when intro finishes/skips/already-seen so Navbar can show; sets `localStorage['velovane-hero-intro-seen'] = '1'`

- [ ] **Step 1: Scaffold markup with namespaced ids + LogoMark in push**

Create `hero-dawn-section.tsx` as `"use client"`. Structure (classNames from the CSS module):

```tsx
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

  // effects in Step 2…

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
                <span className={styles.dot} />
                6:00 AM · dawn
              </div>
              <div className={styles.big}>SKIP</div>
              <div className={styles.sub}>Not this window.</div>
              <div className={styles.why2}>
                A line of storms, gusting 38. Crosswind on every exposed mile — it
                costs more than it gives.
              </div>
            </div>
            {/* V1 WAIT + V2 GO: same copy as reference */}
          </div>
          <div className={styles.prog}>
            <div className={`${styles.pt} ${styles.s}`} id="hero-dawn-P0" ref={P0Ref}>
              <span>
                Skip <em>6:00</em>
              </span>
              <i />
            </div>
            {/* P1 Wait 9:00, P2 Go 10:30 */}
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
```

Fill in V1/V2/P1/P2 markup exactly from the reference (copy unchanged). Use a `.dot` class for the verdict status disc (mapped from reference `.v .d` to avoid clashing with clock `.d`).

- [ ] **Step 2: Port intro + scrub effects with cleanup**

Inside `useEffect` (empty deps), port the reference script with these rules:

```ts
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
```

Timeline parity with reference:

- `rollTo6`, `fadeClock`, `fadeStorm` (calls `unlock()`), `reveal`, `endIntro` (push out, hint show, intro `gone`, `notifyIntroDone`, `markSeen`)
- `finish()`: guard with `done`, clear timers, snap roll, reveal, endIntro
- `play()`: add `hero-dawn-lock`, same timeouts 3000 / 4200 / 5200 / 5900 / 8800
- Skip button + delayed once listeners for `wheel` / `keydown` / `touchmove`
- Reduced motion: lock → snap roll → push in → reveal at 2000 → endIntro at 3600
- **Returning visitor (`alreadySeen`):** do not lock; snap clock to 6; add intro `dawn` + `gone`; skip push animation; show hint; `notifyIntroDone()` immediately; still run scrub `tick` listeners

Scrub `tick()`: same math as reference (`ramp`, layer opacity/transform, verdict opacity/transform, progress `on` classes). Do **not** toggle nav scrolled here if Navbar owns that (Task 4).

Cleanup return:

```ts
return () => {
  timers.forEach(clearTimeout);
  if (raf) cancelAnimationFrame(raf);
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", tick);
  // remove skip + once finish listeners if still attached
  unlock();
};
```

- [ ] **Step 3: Typecheck the new file**

Run: `npx tsc --noEmit`  
Expected: no errors in `hero-dawn-section.tsx`.

---

### Task 4: Navbar merge (logo + chip + links + intro reveal)

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

**Interfaces:**
- Consumes: `velovane:hero-intro-done` event; existing `data-nav-tone` zones
- Produces: single fixed nav with `LogoMark`, Today chip, links to `#how` / `#download`

- [ ] **Step 1: Update nav chrome**

Keep tone switching (`useSyncExternalStore` / `data-nav-tone`). Change content:

- Left: `LogoMark` (size ~24) + optional lowercase “velovane” wordmark for dark/light text colors + **Today · GO 10:30 AM** chip (`GO` in go-green `#35C46A` on dark; on light surfaces use the same green for `GO` and secondary text for the rest)
- Hide chip below ~700px (`hidden min-[701px]:block` or equivalent)
- Right links: `How it reads` → `#how`; `Pricing` → `#download`; CTA `Get notified` → `#download`
- Remove FAQ link **or** keep FAQ if product still wants it — **spec says reference link set**; drop FAQ from nav to match reference (FAQ section remains on page, reachable by scroll)

- [ ] **Step 2: Intro visibility**

- State `introReady` default `false`
- On mount, if `localStorage['velovane-hero-intro-seen'] === '1'`, set `introReady` true
- Listen for `velovane:hero-intro-done` → set true; remove listener on unmount
- Apply opacity/visibility: `opacity-0 pointer-events-none` until ready, then `opacity-100` with ~0.6s transition (match reference `.nav.show`)
- Keep scrolled glass: when dark + `scrollY > 60`, denser backdrop (existing or reference `rgba(6,9,13,.72)` blur)

- [ ] **Step 3: Manual check**

Load home: after intro (or with seen flag), nav shows LogoMark + chip; links jump to scrub and `#download`. Over FAQ (light), nav text remains readable via tone switching.

---

### Task 5: Wire page + move `#how` off Scene A

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/sections/ride-scene-chapter-intro.tsx`

**Interfaces:**
- Consumes: `HeroDawnSection`
- Produces: home order Navbar → HeroDawn → RideSceneChapterIntro → RideMapPanel → …

- [ ] **Step 1: Update `page.tsx`**

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroDawnSection } from "@/components/sections/hero-dawn-section";
import { RideSceneChapterIntro } from "@/components/sections/ride-scene-chapter-intro";
import { RideMapPanel } from "@/components/sections/RideMapPanel";
import { SceneARevealSection } from "@/components/sections/scene-a-reveal-section";
import { SceneBWalkthroughSection } from "@/components/sections/scene-b-walkthrough-section";
import { AppGallerySection } from "@/components/sections/app-gallery-section";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroDawnSection />
        <RideSceneChapterIntro />
        <RideMapPanel />
        <SceneARevealSection />
        <SceneBWalkthroughSection />
        <AppGallerySection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Remove `id="how"` from chapter intro**

In `ride-scene-chapter-intro.tsx`, change:

```tsx
<section data-nav-tone="dark" className="bg-map-depth text-white">
```

(no `id="how"`).

- [ ] **Step 3: Build**

Run: `npm run build`  
Expected: success; no missing-module errors for hero assets.

---

### Task 6: End-to-end verification

**Files:** none (manual / browser)

- [ ] **Step 1: First-visit intro**

Clear `localStorage` key `velovane-hero-intro-seen`, hard reload:

1. Body does not scroll during intro
2. Clock rolls 05:59 → 06:00
3. Push shows with **LogoMark** (not green V)
4. Dawn dissolves into SKIP sky
5. Nav appears with **LogoMark** + Today chip
6. Scroll unlocked

- [ ] **Step 2: Skip + reduced motion**

- Click Skip / scroll / key: intro ends; lock released  
- Enable prefers-reduced-motion: clock+push then cut to SKIP

- [ ] **Step 3: Returning visitor**

Reload with key set: no intro lock; SKIP frame + nav visible immediately.

- [ ] **Step 4: Scrub + bridge + map**

Scroll scrub: SKIP→WAIT→GO layers + verdicts + progress rail; graded photos (color treatment visible). Bridge line reads, then Scene A “A ride, rewound” / map unchanged. Only one nav. `#how` and `#download` work.

- [ ] **Step 5: Lock safety**

Navigate away mid-intro (or React fast-refresh): body must not stay `hero-dawn-lock`ed.

---

## Spec coverage check

| Spec requirement | Task |
|------------------|------|
| Port intro/scrub/bridge behavior | 2, 3 |
| Replace old hero through Scene A boundary | 5 |
| Graded assets paths | 1, 2 |
| Single nav + chip + links | 4 |
| LogoMark in nav + push | 3, 4 |
| Refs/effects/cleanup/body unlock | 3 |
| localStorage once-per-visitor | 3, 4 |
| Move `#how` to scrub | 3, 5 |
| Pricing/Get notified → `#download` | 4 |
| No Scene A changes | 5 (explicit non-touch) |
| Geist Mono reuse | 2 (no font import) |
