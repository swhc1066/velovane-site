import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "VeloVane — Should I ride today?",
  description:
    "Cycling weather intelligence. VeloVane tells you when to ride in under 5 seconds with AI-powered recommendations built for serious cyclists.",
  openGraph: {
    title: "VeloVane — Should I ride today?",
    description:
      "Cycling weather intelligence. AI-powered ride recommendations for serious cyclists.",
    siteName: "VeloVane",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VeloVane — Should I ride today?",
    description:
      "Cycling weather intelligence. AI-powered ride recommendations for serious cyclists.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistMono.variable} antialiased`}>
      <body className="overflow-x-hidden font-mono">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
