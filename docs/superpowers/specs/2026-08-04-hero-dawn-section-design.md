# Hero Dawn Section — Design Spec

**Date:** 2026-08-04  
**Status:** Approved for planning (pending user review of this doc)  
**Source:** `/Users/seancraig/Downloads/velovane-hero-section.html`  
**Stack:** Next.js App Router + React client components + CSS modules

## Goal

Replace the current light “Should I ride today?” hero (and everything between it and Scene A) with the reference cold-open intro + SKIP→WAIT→GO scrub + bridge band. Scene A (“A ride, rewound” + scrolling map) and everything below stay unchanged.

## Decisions locked

| Topic | Choice |
|-------|--------|
| Integration shape | Single client section component + scoped CSS module |
| Nav | One site-wide nav: reference chip + links, keep light/dark tone switching |
| Pricing / Get notified | Both → `#download` (bottom CTA) |
| How it reads | → `#how` on the scrub (move id off Scene A chapter intro) |
| Images | Graded files `velovane-{skip,wait,go}.jpg` via `/assets/…` |
| Intro gating | `localStorage`: play once per visitor; returners skip to SKIP frame |
| Copy / times | Unchanged from reference (6:00 AM push, window 10:30–12:30). Scene A times untouched |
| Brand marks | Real `LogoMark` in nav and in the intro push toast (replace green “V” square) |

## Page composition

`src/app/page.tsx`:

1. `Navbar` (updated)
2. `HeroDawnSection` (new: intro + scrub + bridge)
3. `RideSceneChapterIntro` (keep; remove `id="how"`)
4. `RideMapPanel` and all sections below (untouched)

**Remove from home:** `HeroSection`, `AtmosphericsStrip`.

## Component architecture

### `HeroDawnSection` (`src/components/sections/hero-dawn-section.tsx`)

Client component owning:

1. **Cold-open intro** — fixed overlay, clock 05:59→06:00, push notification, dawn dissolve into SKIP
2. **Scrub** — sticky 360vh section, three sky layers, verdict crossfade, progress rail
3. **Bridge band** — short handoff copy into Scene A
4. **Scroll hint** — fixed “Scroll — read the day”

Behavior must match the reference:

- Intro plays once on first visit; skippable via Skip button, wheel, keydown, or touchmove (after short delay)
- `prefers-reduced-motion`: show clock + push, then cut to SKIP
- Returning visitors (`localStorage` key `velovane-hero-intro-seen`): no intro lock; land on SKIP with nav visible
- Body `overflow: hidden` while intro plays; **always** released on finish, skip, unmount, or reduced-motion path
- Scrub `tick()` on scroll/resize (rAF-throttled): layer opacities/parallax, verdict opacities, progress `on` states, hint hide, nav scrolled class coordination as needed

React hygiene:

- Refs for intro/scrub/layers/verdicts/progress/clock reels (no bare `getElementById` for those nodes)
- Namespace DOM ids: `hero-dawn-intro`, `hero-dawn-scrub`, `hero-dawn-L0`…`L2`, `hero-dawn-V0`…`V2`, `hero-dawn-P0`…`P2`, etc.
- `useEffect` owns timers + listeners; cleanup clears timeouts, cancels rAF, removes listeners, unlocks body

### Styles (`hero-dawn-section.module.css`)

Port reference CSS (intro, scrub, bridge, hint, verdicts, progress). Scope:

- CSS module classes for structure
- CSS variables `--skip`, `--wait`, `--go`, `--go-glow` local to the module
- Layer backgrounds set via module styles or inline `backgroundImage` pointing at `/assets/velovane-skip.jpg`, `…-wait.jpg`, `…-go.jpg`
- Do **not** re-load Geist Mono; inherit site `font-mono` / `--font-geist-mono`
- Avoid global `*` / `body` resets from the reference; only add what the hero needs (e.g. body lock class scoped as `hero-dawn-lock` on `document.body`, or a data attribute)

### Assets

Copy graded files from repo-root `assets/` into `public/assets/`:

- `public/assets/velovane-skip.jpg`
- `public/assets/velovane-wait.jpg`
- `public/assets/velovane-go.jpg`

Serve as static paths `/assets/…`. Do not use inline base64 from the HTML reference. Do not use raw Unsplash originals.

## Navbar changes (`src/components/layout/Navbar.tsx`)

Single nav for the whole site:

- Keep existing `data-nav-tone` light/dark switching for FAQ and other light bands
- Add reference content: wordmark area + **Today · GO 10:30 AM** chip (hide chip on small screens per reference)
- Links:
  - **How it reads** → `#how` (scrub)
  - **Pricing** → `#download`
  - **Get notified** → `#download`
- Visibility: hidden/opacity 0 until intro completes (or immediately if intro already seen / skipped path finished). Preserve scrolled glass treatment on dark sections
- **Logo:** Use the existing `LogoMark` (or full logo mark from `Logo.tsx`) in the nav left cluster — not a plain “velovane” text wordmark alone. Chip and link set otherwise follow the reference

### Push notification logo

In the intro push toast, replace the reference’s green “V” square (`.pic`) with the real VeloVane logo mark (`LogoMark`), sized to fit the 32×32 icon slot (or equivalent). Keep the toast layout, copy, and timing unchanged.

## Anchor / handoff details

- Place `id="how"` on the scrub section (or an in-section anchor) for “How it reads”
- Remove `id="how"` from `RideSceneChapterIntro` to avoid duplicates
- Bridge band sits on dark `#05070A` (or equivalent) and flows into existing Scene A chapter intro without a visual seam
- Do not alter Scene A map copy, times, or components

## Explicit non-goals

- No changes to RideMapPanel, Scene A reveal, Scene B, gallery, FAQ, or CTA internals (except relying on existing `#download`)
- No new pricing page
- No restoring the old hero email Formspree block in this section
- No Framer Motion rewrite of the intro timeline (vanilla timing via effects is fine to keep parity)

## Verification checklist

- [ ] Intro: clock rolls 05:59→06:00, push fires, dawn dissolves into SKIP
- [ ] Intro skippable (button / scroll / key / tap); reduced-motion path works
- [ ] Returning visitor: intro skipped via localStorage; SKIP frame + nav shown
- [ ] Scrub: SKIP→WAIT→GO cross-dissolve; verdicts crossfade; progress rail tracks; graded assets used
- [ ] Bridge flows into Scene A with no seam; map and below unchanged
- [ ] Single fixed nav; body scroll never left locked after intro ends or on unmount
- [ ] Geist Mono not double-loaded
- [ ] Nav and push notification use real `LogoMark`, not a plain “V” / text-only stand-in

## Files expected to change

| Path | Action |
|------|--------|
| `src/app/page.tsx` | Swap hero stack |
| `src/components/sections/hero-dawn-section.tsx` | Add |
| `src/components/sections/hero-dawn-section.module.css` | Add |
| `src/components/layout/Navbar.tsx` | Merge reference nav |
| `src/components/sections/ride-scene-chapter-intro.tsx` | Remove `id="how"` |
| `public/assets/velovane-*.jpg` | Add (copy from `assets/`) |
| `src/components/sections/HeroSection.tsx` | Stop using on home (leave file unless cleanup desired) |
| `src/components/sections/atmospherics-strip.tsx` | Stop using on home |

Optional cleanup (same PR if trivial): delete unused hero imports only; do not delete Scene A assets or map code.
