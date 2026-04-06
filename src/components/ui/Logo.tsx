export function LogoMark({ size = 27 }: { size?: number }) {
  const h = (size / 27) * 28;
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 27 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 8.40756V0.784399C0 0.354434 0.348624 0 0.784399 0H7.01308C7.29197 0 7.55345 0.151068 7.6929 0.389291L18.5524 19.2032C18.6221 19.3194 18.657 19.4588 18.657 19.5925V27.2156C18.657 27.6456 18.3084 28 17.8726 28H11.6439C11.365 28 11.1035 27.8489 10.9641 27.6107L0.104599 8.79685C0.0348755 8.68064 0 8.54119 0 8.40756Z"
        fill="#5BA4D4"
      />
      <path
        d="M18.9185 2.00462L22.12 0.156941C22.2827 0.0639758 22.486 0.0639758 22.6487 0.156941L25.8502 2.00462C26.0129 2.09759 26.1175 2.2719 26.1175 2.46365V10.4703C26.1175 10.662 26.0187 10.8363 25.8502 10.9293L19.4472 14.6247C19.0928 14.828 18.6512 14.5724 18.6512 14.1657V2.46365C18.6512 2.2719 18.75 2.09759 18.9185 2.00462Z"
        fill="#5BA4D4"
      />
    </svg>
  );
}

/**
 * Brand-compliant vertical logo lockup.
 * Mark: 54x56px, Wordmark: 32px Geist Mono weight 400, Gap: 12px.
 * On dark: wordmark white. On light: wordmark #4A4A4A.
 * Mark color is always #5BA4D4 — never changes.
 */
export function LogoLockup({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <LogoMark size={54} />
      <span
        className="font-mono text-[32px] font-normal"
        style={{ color: variant === "dark" ? "#FFFFFF" : "#4A4A4A" }}
      >
        velovane
      </span>
    </div>
  );
}

/** Horizontal logo for nav — smaller, inline */
export function LogoNav() {
  return (
    <div className="flex items-center gap-2">
      <LogoMark size={20} />
      <span className="font-mono text-sm font-normal text-white">
        velovane
      </span>
    </div>
  );
}

/** Light surface horizontal logo */
export function Logo({ size = 27 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <LogoMark size={size} />
      <span
        className="font-mono text-lg font-normal tracking-tight"
        style={{ color: "#4A4A4A" }}
      >
        velovane
      </span>
    </div>
  );
}
