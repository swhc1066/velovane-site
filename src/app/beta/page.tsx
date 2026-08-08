import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VeloVane — Beta Access",
  robots: { index: false, follow: false },
};

// Read at build time and embed — Vercel does not serve standalone .html from /public.
const betaHtml = readFileSync(join(process.cwd(), "content/beta.html"), "utf8");

export default function BetaPage() {
  return (
    <iframe
      title="VeloVane Beta Access"
      srcDoc={betaHtml}
      className="fixed inset-0 z-[100] h-dvh w-full border-0 bg-[#0C0C0E]"
    />
  );
}
