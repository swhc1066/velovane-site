import { LogoMark } from "../ui/Logo";

export function Footer() {
  return (
    <footer data-nav-tone="dark" className="relative bg-surface-dark">
      <div className="mx-auto max-w-[1200px] px-5 pt-16 pb-8">
        {/* Top border */}
        <div className="mb-12 h-px w-full bg-white/6" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Logo + tagline */}
          <div className="md:col-span-4">
            <div className="mb-4 flex items-center gap-2">
              <LogoMark size={20} />
              <span className="font-mono text-sm text-white">velovane</span>
            </div>
            <p className="text-sm font-light text-n-500">
              Weather intelligence for cyclists.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-2 md:col-start-7">
            <span className="mb-3 block font-mono text-[10px] font-medium uppercase tracking-widest text-n-500">
              Product
            </span>
            <div className="flex flex-col gap-2">
              <a href="#features" className="text-sm text-n-400 transition-colors hover:text-white">
                Features
              </a>
              <a href="#faq" className="text-sm text-n-400 transition-colors hover:text-white">
                FAQ
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <span className="mb-3 block font-mono text-[10px] font-medium uppercase tracking-widest text-n-500">
              Legal
            </span>
            <div className="flex flex-col gap-2">
              <a href="/privacy" className="text-sm text-n-400 transition-colors hover:text-white">
                Privacy
              </a>
              <a href="/terms" className="text-sm text-n-400 transition-colors hover:text-white">
                Terms
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <span className="mb-3 block font-mono text-[10px] font-medium uppercase tracking-widest text-n-500">
              Connect
            </span>
            <div className="flex flex-col gap-2">
              <a
                href="https://x.com/velovane"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-n-400 transition-colors hover:text-white"
              >
                X / Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/6 pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[10px] tracking-widest text-n-600">
            &copy; {new Date().getFullYear()} VeloVane. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
