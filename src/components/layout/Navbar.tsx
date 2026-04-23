"use client";

import Link from "next/link";
import { LogoMark } from "@/components/ui/Logo";

export function Navbar() {
  return (
    <nav
      className="fixed top-0 right-0 left-0 z-50 border-b border-black/[0.04] bg-white"
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-8 px-6 py-5 md:px-8">
        <Link
          href="/"
          className="flex items-center shrink-0 transition-opacity hover:opacity-80"
          aria-label="VeloVane home"
        >
          <LogoMark size={24} />
        </Link>

        <div className="flex items-center gap-6 md:gap-8">
          <a
            href="#features"
            className="font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-text-secondary transition-colors hover:text-text-primary"
          >
            How it works
          </a>
          <a
            href="#faq"
            className="font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-text-secondary transition-colors hover:text-text-primary"
          >
            FAQ
          </a>
          <a
            href="#notify"
            className="bg-text-primary px-[18px] py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-vv-blue-darker"
          >
            Get notified
          </a>
        </div>
      </div>
    </nav>
  );
}
