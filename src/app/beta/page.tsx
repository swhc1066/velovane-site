import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VeloVane — Beta Access",
  robots: { index: false, follow: false },
};

/** Serves the static beta signup at the clean /beta URL. */
export default function BetaPage() {
  return (
    <iframe
      src="/beta-page/index.html"
      title="VeloVane Beta Access"
      className="fixed inset-0 z-[100] h-dvh w-full border-0 bg-[#0C0C0E]"
    />
  );
}
