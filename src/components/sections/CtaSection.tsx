import { ScrollReveal } from "../ui/ScrollReveal";
import { LogoLockup } from "../ui/Logo";

export function CtaSection() {
  return (
    <section
      data-nav-tone="dark"
      className="relative overflow-hidden bg-surface-dark"
      id="download"
    >
      {/* Sunshine road background — the narrative payoff */}
      <img
        src="/hero-mobile.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover md:hidden"
      />
      <img
        src="/hero-desktop.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover md:block"
      />

      {/* Lighter overlay — let the sunshine through */}
      <div className="pointer-events-none absolute inset-0 bg-black/40" />

      {/* Top vignette for transition from previous section */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12,12,14,1) 0%, rgba(12,12,14,0.6) 20%, transparent 40%, transparent 70%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 py-32 md:py-48">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            {/* Brand-compliant logo lockup */}
            <LogoLockup variant="dark" />

            <h2 className="mt-10 mb-4 font-mono text-3xl font-light leading-tight text-white md:text-5xl">
              Start riding smarter.
            </h2>

            <p className="mb-10 max-w-md font-mono text-sm font-light text-white/70">
              Weather intelligence that knows you&apos;re a cyclist, not a
              pedestrian. Available on iOS.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-mono text-sm font-medium text-surface-dark transition-colors hover:bg-n-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 18 19"
                  className="h-4 w-4"
                >
                  <path
                    fill="currentColor"
                    d="M12.063 4.091c-.401-.002-.8.064-1.18.196-.337.112-.669.24-.995.382-.296.131-.556.197-.779.197-.231 0-.491-.062-.779-.186a14 14 0 0 0-.909-.36 2.9 2.9 0 0 0-1.038-.185c-.693 0-1.363.192-2.013.578-.641.379-1.168.943-1.579 1.691-.412.742-.617 1.662-.617 2.764 0 1.025.17 2.044.51 3.055.346 1.003.76 1.854 1.244 2.553.373.532.781 1.039 1.222 1.516.398.422.859.632 1.385.632.346 0 .646-.058.898-.175.26-.116.53-.232.812-.348.288-.117.645-.176 1.07-.176.44 0 .79.059 1.049.175.26.109.513.221.758.338.245.109.559.164.941.164.57 0 1.057-.218 1.46-.655.412-.436.794-.913 1.147-1.429.404-.596.692-1.138.866-1.625.18-.488.274-.746.28-.776l-.367-.196c-.224-.124-.484-.317-.779-.578-.29-.27-.546-.622-.77-1.058-.215-.436-.323-.967-.323-1.593 0-.545.086-1.015.26-1.408.172-.4.375-.727.605-.982.23-.262.44-.459.627-.59.187-.137.292-.217.314-.24a3.2 3.2 0 0 0-1.255-1.166 4 4 0 0 0-1.254-.437 4 4 0 0 0-.812-.076M11.468 2.705c.265-.33.48-.698.638-1.09.166-.415.249-.84.249-1.278 0-.13-.01-.244-.033-.338-.418.015-.858.142-1.32.381a3.4 3.4 0 0 0-1.146.906c-.239.269-.451.61-.638 1.026-.186.396-.282.828-.282 1.265 0 .065.004.127.012.185.004.04.011.08.022.12.072.014.148.021.227.021.382 0 .786-.112 1.211-.338.426-.232.779-.52 1.06-.862"
                  />
                </svg>
                Download for iOS
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-mono text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/10"
              >
                Learn more
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
