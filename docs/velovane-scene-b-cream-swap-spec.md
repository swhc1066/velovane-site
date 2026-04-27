# Scene B — Cream Surface Swap Spec

**Status:** Phase 1 of the marketing site redesign refinements
**Goal:** Swap Scene B's pure-white surface to the app's canonical cream so the site/app warmth aligns. Token-level changes only — no structural or copy changes.
**Source of truth for cream values:** `theme.ts` in the app codebase

---

## Context

Scene B (the 6:00–6:04 AM walkthrough timeline) currently uses `#FFFFFF` as its background, which makes it the brightest section of the marketing site. The app uses a warm cream (`#F2EDE2`) for its primary background. After this swap, Scene B will tonally match the app and flow into the cream App Gallery section that follows it.

This is the highest-ROI refinement on the site — a CSS-only change that does roughly 70% of the "warmth alignment" work.

---

## Important: cream value drift

The gallery preview file (`velovane-app-gallery-preview.html`) currently uses `#F5F1E8` and claims in a comment to match the app. It does not — the app uses `#F2EDE2`. About 3 hex points apart. Imperceptible alone but visible at a Scene B → Gallery boundary.

**This spec uses the app canonical `#F2EDE2`.** The gallery is flagged for separate cleanup at the bottom of this doc.

---

## 1. Surface tokens (add or update in CSS)

| Token | Value | Use |
|---|---|---|
| `--scene-b-bg` | `#F2EDE2` | Page background for Scene B section |
| `--scene-b-card` | `#F7F2E8` | Card surfaces (slightly lighter than page) |
| `--scene-b-card-pressed` | `#EBE5D8` | Hover/pressed state if any |
| `--scene-b-text-primary` | `#1A1814` | Headlines and body (warm near-black, not `#000`) |
| `--scene-b-text-secondary` | `#5C5854` | Muted body — derive warmer than current gray |
| `--scene-b-border` | `rgba(26, 24, 20, 0.14)` | Card borders, primary lines |
| `--scene-b-border-subtle` | `rgba(26, 24, 20, 0.08)` | Hairline dividers |

---

## 2. Element-by-element swap

| Element | Before | After |
|---|---|---|
| Section background | `#FFFFFF` | `#F2EDE2` |
| All cards | `#FFFFFF` (or implicit white) | `#F7F2E8` + `0.5px solid var(--scene-b-border)` |
| Card shadows | any `box-shadow` | **Remove.** Borders define cards on cream, not shadows. |
| Body text | `#000` or `#111` | `#1A1814` |
| Secondary text | gray (`#666`/`#888`) | `#5C5854` |
| Timeline spine | current color | `var(--scene-b-border)` (warm gray hairline) |
| Eyebrow labels (`S 02 ·`, `6:00 AM`, etc.) | current blue or gray | Brand blue `#5BA4D4` for emphasis moments, `#5C5854` for time labels |
| `→` CTA link color | current | Brand blue stays |
| Recommendation card embed | white + brand blue "GO" | `#DCE8D5` surface, `#5C8A52` for "Go" text — see edge case #2 |

---

## 3. Edge cases

### 3.1 Mini iPhone-style notification (6:00 AM beat)

Keep this near-white at `#F7F2E8` (creamLight) — should still read as an iOS notification surface. The contrast against the page cream is enough. Don't drop it to cream-cream or it'll lose the "this is a notification" affordance.

### 3.2 Recommendation card embed (6:01 AM beat — "Go · 7:00–9:30 AM")

This must match the app dashboard exactly:

- Surface: `#DCE8D5`
- "Go" text and accent dot: `#5C8A52`
- Time and metric values: warm near-black `#1A1814`

This is the moment site/app cohesion is most testable — visitors see the same card on the site and the app. Get this right and the rest is decoration.

### 3.3 Wind compass (6:02 AM beat)

Replace gray compass strokes with:

- Primary marks (N/E/S/W ticks, outer circle): `var(--scene-b-border)`
- Minor ticks: `var(--scene-b-border-subtle)`
- Wind direction arrow: stays its current color (likely brand blue, which works on cream)

### 3.4 Daylight bar (6:04 AM beat)

**Do not touch the gradient** — it's representational of actual sky colors (dawn → midday → dusk) and changing it breaks the meaning. Only update the surrounding container if there is one.

### 3.5 `<strong>` emphasis in beat copy

No change needed — bold warm near-black on cream reads correctly.

### 3.6 Closing card ("By 6:05 you're out the door…")

Apply card tokens per the swap table. The `cta-text` "Get notified at launch →" — brand blue stays.

---

## 4. Verification checklist

After the swap, scroll through Scene B and confirm:

- [ ] No element is `#FFFFFF` anywhere in the section (except the rec card's "Match 92" pill if there is one — that one's intentional)
- [ ] Recommendation card "Go" pill is sage `#5C8A52`, not bright Material green or brand blue
- [ ] All cards have visible thin borders, no drop shadows
- [ ] Text reads warm — if you put the page next to a `#000`-on-`#FFF` reference, the difference is obvious
- [ ] Mini notification still feels like a notification (lighter than surrounding cards)
- [ ] Scene B → next section (currently Platform, soon Gallery) transitions without a perceptible color shift

---

## 5. Separate cleanup flagged

Update `--cream-100` in the gallery preview file from `#F5F1E8` → `#F2EDE2` so the gallery matches both the app and Scene B. The comment in that file already claims it matches the app — make it true.

If the gallery is already integrated into production, do this cleanup at the same time as the Scene B swap so the two land together.

---

## 6. Reference: full warm token block from theme.ts

For consistency, these are the canonical app tokens that Scene B is aligning to. Anything new added to the site CSS should use these values.

```
surface.cream:        #F2EDE2   // primary background
surface.creamLight:   #F7F2E8   // card surfaces
surface.creamSubtle:  #EBE5D8   // hover/pressed
surface.nearBlack:    #1A1814   // warm-shifted near-black

textWarm.primary:     #1A1814
textWarm.inverse:     #F2EDE2

statusWarm.go:        #5C8A52   // GO text + dot
statusWarm.goSurface: #DCE8D5   // GO card background
statusWarm.goBorder:  #C4D6BB   // optional GO card border

borders.subtle:       rgba(26, 24, 20, 0.08)   // hairlines
borders.default:      rgba(26, 24, 20, 0.14)   // card borders
```
