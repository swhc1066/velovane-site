export const FEATURES = [
  {
    time: "6:00 AM",
    title: "Your phone buzzes.",
    description:
      "A morning push notification: Go \u2014 7:00 to 9:30 AM. Steady 12mph from the west, 52\u00B0 on the bike. One sentence, everything you need.",
    mockup: "/mockups/dashboard.webp",
  },
  {
    time: "6:01 AM",
    title: "You open the app.",
    description:
      "One card. Go, wait, or skip. Your best ride window with the rationale. Current conditions, cycling feels-like temperature, wind data. No scrolling, no interpreting.",
    mockup: "/mockups/dashboard.webp",
  },
  {
    time: "6:02 AM",
    title: "You check the wind.",
    description:
      "12mph from the west, steady through the morning. Easy out-and-back planning. Gusts to 18mph, crosswind exposure low. VeloVane scores wind against your ride pattern.",
    mockup: "/mockups/wind-detail.webp",
  },
  {
    time: "6:03 AM",
    title: "You check the temperature.",
    description:
      "54\u00B0F outside, but VeloVane knows you\u2019ll be at 17mph. Cycling feels-like: 47\u00B0 on the bike. Standard apps miss this by 10+ degrees on a windy day.",
    mockup: "/mockups/hourly-forecast.webp",
  },
  {
    time: "6:04 AM",
    title: "You kit up.",
    description:
      "Civil twilight started at 6:12. The dawn overlay confirms daylight for your ride window. Seasonal shifts accounted for automatically. Time to ride.",
    mockup: "/mockups/notification.webp",
  },
];

/* ------------------------------------------------------------------ */
/*  "Without VeloVane" narrative for the ride map panel                */
/* ------------------------------------------------------------------ */

/**
 * Text card content at each scroll phase.
 *
 * Unified timeline: rider starts at 10:00 AM (progress 0.30), ends at 12:00 PM
 * (progress 0.70). Wind holds WSW through 10:30 AM (progress 0.40), fully
 * shifted to ENE by 11:30 AM (progress 0.60). Times match the data card clock.
 */
export const RIDE_NARRATIVE = [
  {
    phase: 1,
    progressRange: [0.30, 0.40] as [number, number],
    time: "10:00 AM",
    title: "You head out.",
    description:
      "Headwind from the southwest. Not ideal, but you expect the payoff — tailwind on the way back.",
  },
  {
    phase: 2,
    progressRange: [0.40, 0.52] as [number, number],
    time: "10:30 AM",
    title: "The wind is shifting.",
    description:
      "Conditions are changing. The tailwind you were counting on may not be there for the return.",
  },
  {
    phase: 3,
    progressRange: [0.52, 0.65] as [number, number],
    time: "11:10 AM",
    title: "Headwind. Again.",
    description:
      "Wind shifted while you were out. The return you planned as easy just became a grind.",
  },
  {
    phase: 4,
    progressRange: [0.65, 0.82] as [number, number],
    time: "11:45 AM",
    title: "Grinding home.",
    description:
      "Power fading, speed dropping. Headwind going out. Headwind coming back.",
  },
  {
    phase: 5,
    progressRange: [0.82, 1.0] as [number, number],
    time: "12:00 PM",
    title: "Without VeloVane.",
    description: "",
  },
];

/** Narrator callouts — floating overlays at specific scroll points */
export const NARRATOR_CALLOUTS = [
  {
    progress: 0.42, // ~10:36 AM — wind just started shifting
    text: "Wind shifting\u2026",
    color: "yellow" as const,
  },
  {
    progress: 0.55, // ~11:15 AM — headwind kicks in on return
    text: "Wind shifted. Headwind on the way back.",
    color: "red" as const,
  },
  {
    progress: 0.67, // ~11:51 AM — grinding home
    text: "Headwind going out. Headwind coming back.",
    color: "red" as const,
  },
];

export const PLATFORM_CARDS = [
  {
    number: "01",
    title: "Intelligence under the hood.",
    description:
      "VeloVane analyzes your preferences against live forecast data to surface the best ride window automatically. No manual interpretation — the recommendation appears the moment you open the app.",
  },
  {
    number: "02",
    title: "Morning intelligence, delivered.",
    description:
      "A daily push notification at the time you choose. One sentence: today's AI recommendation and your best ride window. Tap to open the full dashboard. Suppress on rest days.",
  },
  {
    number: "03",
    title: "It learns how you ride.",
    description:
      "VeloVane passively detects when you ride via GPS patterns and refines its understanding of your preferences over time. No manual logging. The recommendations get sharper the more you use it.",
  },
  {
    number: "04",
    title: "Your best windows, highlighted.",
    description:
      "The hourly forecast highlights time blocks that match your preferences — wind threshold, temperature range, preferred duration, and daylight. Scroll the timeline and see exactly when conditions align.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "How is VeloVane different from a regular weather app?",
    answer:
      "Regular weather apps show generic forecasts for everyone. VeloVane interprets weather data specifically for cycling — factoring in your riding speed for feels-like temperature, scoring wind conditions against your ride pattern, highlighting your best ride windows, and delivering a go/wait/skip recommendation tuned to your preferences.",
  },
  {
    question: "Where does the weather data come from?",
    answer:
      "VeloVane uses Open-Meteo as its primary weather provider, which aggregates data from ECMWF and GFS forecast models. The weather service layer is built with a provider abstraction so accuracy can be improved per-region over time.",
  },
  {
    question: "How does the AI recommendation work?",
    answer:
      "A rules-based engine matches current and forecasted conditions against your preferences — wind threshold, temperature range, preferred ride times, and duration. It scores ride windows using nonlinear wind penalties, crosswind exposure, and wind consistency to deliver a go, wait, or skip recommendation with a specific ride window.",
  },
  {
    question: "What does out-and-back vs. fixed route mean?",
    answer:
      "Most serious cyclists ride out from home and return the same way, choosing direction based on wind. For these riders, wind speed and consistency matter more than direction — you will face the headwind one way and get the tailwind back. Fixed-route riders always ride the same direction, so headwind/tailwind relative to that route is what matters. VeloVane adapts its scoring and display for each pattern.",
  },
  {
    question: "Is my location data private?",
    answer:
      "Your location is used only to fetch local weather forecasts and calculate dawn/dusk times. GPS-based ride detection stays on-device for preference learning. We do not sell location data or share it with third parties.",
  },
  {
    question: "What platforms is VeloVane available on?",
    answer:
      "VeloVane is launching on iOS first, with Android planned for a subsequent release. The app is built with React Native, so cross-platform support is part of the architecture from day one.",
  },
];
