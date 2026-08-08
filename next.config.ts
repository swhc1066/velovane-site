import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Local `next dev` only — static export ignores these; Vercel uses vercel.json.
  async redirects() {
    return [
      { source: "/beta", destination: "/beta.html", permanent: false },
      { source: "/beta/", destination: "/beta.html", permanent: false },
    ];
  },
};

export default nextConfig;
