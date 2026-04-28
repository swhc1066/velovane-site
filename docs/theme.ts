/**
 * VeloVane — Design Tokens
 * ----------------------------------------------------------------
 * Drop-in tokens for the warmer v0.4 redesign.
 *
 * Strategy: ADDITIVE, not destructive. The old palette
 * (vv-blue, n100..n900, go/caution/skip semantic colors) is
 * preserved so existing screens don't break. New "warm" tokens
 * sit alongside them. Migrate screens one at a time:
 *   colors.surface.white  →  colors.surface.cream      (page bg)
 *   colors.text.primary   →  colors.textWarm.primary   (near-black)
 *   colors.go.dark        →  colors.statusWarm.go      (sage)
 *   colors.skip.dark      →  colors.statusWarm.skip    (terracotta)
 *
 * After all screens migrate, you can delete the legacy keys.
 *
 * Caveat: Color hex values were sampled from PNG mockups, not
 * exported from Figma. If you have the source file, override
 * the `statusWarm` and `badgeFill` blocks with exact values.
 */

// ────────────────────────────────────────────────────────────────
// COLORS
// ────────────────────────────────────────────────────────────────

export const colors = {
  // ── Brand ──────────────────────────────────────────────────────
  brand: {
    blue: '#5BA4D4',         // unchanged — keep for splash/onboarding photo screens
    blueLight: '#E8F2FA',
    blueMid: '#8FC1E2',
    blueDark: '#3A7BAD',
  },

  // ── Surfaces ───────────────────────────────────────────────────
  surface: {
    // Legacy whites — keep for migration window
    white: '#FFFFFF',
    light: '#F8F9FA',

    // NEW: warm cream page backgrounds (the v0.4 hero shift)
    // Page is the LIGHTEST layer. Cards are slightly darker so they
    // separate visually without needing heavy borders. This inverts
    // the conventional "cards lighter than page" pattern but pairs
    // better with cream surfaces.
    cream: '#FCF9F1',         // primary app background — lightest
    creamLight: '#F2ECDD',    // card surface — slightly darker than page
    creamSubtle: '#E8E1D0',   // hover/pressed state for cream cards

    // Dark accents — the "NOW" pill, selected pace chip, primary CTA
    nearBlack: '#1A1814',     // warm-shifted near-black (not pure #000)
    nearBlackPressed: '#2A2620',
  },

  // ── Text ───────────────────────────────────────────────────────
  text: {
    // Legacy — neutral grays
    primary: '#000000',
    secondary: '#5C5F66',
    tertiary: '#B2B2B2',
  },

  // NEW: warm-shifted text colors that pair with the cream surface
  textWarm: {
    primary: '#1A1814',      // body & headlines — warm near-black
    secondary: '#6B6358',    // labels, supporting copy
    tertiary: '#9A9082',     // muted hints, placeholder, eyebrow text
    inverse: '#FCF9F1',      // text on dark surfaces (cream-on-black)
  },

  // ── Status semantic (legacy — Material-ish) ────────────────────
  go:      { light: '#E8F5E9', mid: '#4CAF50', dark: '#2E7D32' },
  caution: { light: '#FFF8E1', mid: '#F9A825', dark: '#F57F17' },
  skip:    { light: '#FFEBEE', mid: '#EF5350', dark: '#C62828' },
  info:    { light: '#E8F2FA', mid: '#5BA4D4', dark: '#3A7BAD' },

  // ── Status semantic (NEW — softer, warmer) ─────────────────────
  // Use these for the recommendation card, score badges, day dots,
  // and any status indicator on the redesigned screens.
  statusWarm: {
    // GO — sage green, less neon than Material 500
    go:        '#5C8A52',    // text + dot color for "GO" / "MATCH 92"
    goSurface: '#DCE8D5',    // recommendation card background
    goBorder:  '#C4D6BB',    // optional subtle border on go cards

    // CAUTION / MAYBE — honey yellow (note: low contrast against caution surface,
    // see brand guide section 04 for the contrast tradeoff discussion)
    caution:        '#C8932E',
    cautionSurface: '#F0E4CC',
    cautionBorder:  '#E0CDA8',

    // SKIP / NO — terracotta (less pure red than Material 800)
    skip:        '#B85540',
    skipSurface: '#F5DDD3',  // the "REST DAY" pink box uses this
    skipBorder:  '#E8C2B0',

    // REFINED — used for the "+2° refined" indicator on settings
    refined: '#5C8A52',      // same sage as go, semantically distinct
  },

  // ── Calibration badge fills (the COLD/CRISP/IDEAL/WARM/HOT row) ─
  // Pastel chip backgrounds for the temp range slider in calibration.
  badgeFill: {
    cold:  '#A5C5DD',        // pale blue
    crisp: '#B9D4B0',        // pale green
    ideal: '#D9D2A8',        // pale yellow-cream
    warm:  '#D4A878',        // pale orange-tan
    hot:   '#E5B5AB',        // pale coral
  },

  // ── Calibration wind chip fills (CALM/BREEZY/FIRM/GUSTY) ───────
  windFill: {
    calm:   '#B9D4B0',       // green
    breezy: '#D9D2A8',       // yellow
    firm:   '#D4A878',       // orange
    gusty:  '#E5B5AB',       // coral
  },

  // ── Neutrals (kept for borders, dividers, scrim) ───────────────
  neutral: {
    n50:  '#F8F9FA',
    n100: '#F1F3F5',
    n200: '#E5E5E5',
    n300: '#D4D4D4',
    n400: '#B2B2B2',
    n500: '#8C8C8C',
    n600: '#5C5F66',
    n700: '#373A40',
    n800: '#1A1A1A',
    n900: '#0A0A0A',
  },

  // ── Borders (warm-tinted to pair with cream surfaces) ──────────
  // Slightly heavier than the original v2.0 spec because the lighter
  // cream surfaces need a touch more delineation between page and cards.
  border: {
    subtle: 'rgba(26, 24, 20, 0.10)',  // hairline dividers on cream
    default: 'rgba(26, 24, 20, 0.16)', // card borders on cream
    strong: 'rgba(26, 24, 20, 0.28)',  // input borders, focused states
  },
} as const;

// ────────────────────────────────────────────────────────────────
// TYPOGRAPHY
// ────────────────────────────────────────────────────────────────

/**
 * Type ramp sized for iPhone 14/15 Pro viewports (~390px wide).
 * All sizes are in pixels (RN treats these as density-independent).
 *
 * Naming follows display → heading → body → label → caption,
 * not Material's H1/H2/H3 since the visual hierarchy in this
 * design is more about size jumps than semantic levels.
 */

export const fonts = {
  mono: 'Geist Mono',          // RN: load via expo-font
  monoFallback: 'Menlo',       // iOS system mono fallback
} as const;

export const typography = {
  // Display — the giant "54°", "59°" temperature numbers
  display: {
    fontFamily: fonts.mono,
    fontSize: 64,
    fontWeight: '400' as const,
    lineHeight: 68,
    letterSpacing: -1.5,       // tighten optically at large sizes
  },

  // Display small — section heroes like "8:00 AM · Monday", "Sam · road · endurance"
  displaySm: {
    fontFamily: fonts.mono,
    fontSize: 32,
    fontWeight: '400' as const,
    lineHeight: 38,
    letterSpacing: -0.5,
  },

  // Headline — recommendation card time range "7:00 – 9:30 AM"
  headline: {
    fontFamily: fonts.mono,
    fontSize: 24,
    fontWeight: '500' as const,
    lineHeight: 30,
    letterSpacing: -0.2,
  },

  // Body large — the recommendation reason ("Morning's yours — tailwind out...")
  bodyLg: {
    fontFamily: fonts.mono,
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
    letterSpacing: 0,
  },

  // Body — most descriptive text, settings rows, hints
  body: {
    fontFamily: fonts.mono,
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 19,
    letterSpacing: 0,
  },

  // Body small — supporting/secondary detail
  bodySm: {
    fontFamily: fonts.mono,
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 17,
    letterSpacing: 0,
  },

  // Label — the all-caps eyebrows: "NOW", "WIND", "RIDE WINDOW", "MATCH 92"
  // Letter-spacing is what gives them the technical/instrument feel.
  label: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: '500' as const,
    lineHeight: 14,
    letterSpacing: 1.4,        // ~0.13em at this size
    textTransform: 'uppercase' as const,
  },

  // Label small — the tiny "TAP FOR DETAIL", "/ 100" annotations
  labelSm: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: '500' as const,
    lineHeight: 13,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
  },

  // Numeric — the badge labels like "IDEAL", "LIGHT", "MODERATE"
  badgeLabel: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: '500' as const,
    lineHeight: 12,
    letterSpacing: 1.0,
    textTransform: 'uppercase' as const,
  },
} as const;

// ────────────────────────────────────────────────────────────────
// SPACING — 4px base scale
// ────────────────────────────────────────────────────────────────

export const spacing = {
  px: 1,
  0: 0,
  1: 4,    // tight intra-component (icon ↔ text)
  2: 8,    // default intra-component padding
  3: 12,   // card internal padding (compact)
  4: 16,   // card internal padding (default), gutter between siblings
  5: 20,
  6: 24,   // page horizontal padding, section gap
  7: 28,
  8: 32,   // major section break
  10: 40,
  12: 48,  // hero/display block padding
  16: 64,
} as const;

// ────────────────────────────────────────────────────────────────
// RADII
// ────────────────────────────────────────────────────────────────

export const radius = {
  none: 0,
  sm: 4,    // input fields, small chips
  md: 8,    // buttons, pace selector chips
  lg: 12,   // cards (the default for the redesign)
  xl: 16,   // hero cards (recommendation card)
  pill: 999, // round pill buttons, the "NOW" highlight
} as const;

// ────────────────────────────────────────────────────────────────
// ELEVATION (kept minimal — the design relies on borders, not shadows)
// ────────────────────────────────────────────────────────────────

export const elevation = {
  none: {},
  // Only the recommendation card gets a soft shadow. Everything else
  // uses borders or surface color shifts to define hierarchy.
  card: {
    shadowColor: '#1A1814',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,            // Android
  },
} as const;

// ────────────────────────────────────────────────────────────────
// MOTION — keep transitions snappy and consistent
// ────────────────────────────────────────────────────────────────

export const motion = {
  duration: {
    fast: 150,    // press feedback, toggles
    base: 250,    // most transitions
    slow: 400,    // screen transitions, expansions
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',  // default for most motion
    decelerate: 'cubic-bezier(0, 0, 0, 1)',  // entering content
    accelerate: 'cubic-bezier(0.3, 0, 1, 1)', // exiting content
  },
} as const;

// ────────────────────────────────────────────────────────────────
// EXPORT — single theme object for convenience
// ────────────────────────────────────────────────────────────────

export const theme = {
  colors,
  fonts,
  typography,
  spacing,
  radius,
  elevation,
  motion,
} as const;

export type Theme = typeof theme;
export default theme;
