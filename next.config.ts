import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "portfolio-2026-theta-three.vercel.app" }],
        destination: "https://www.dsn7.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
