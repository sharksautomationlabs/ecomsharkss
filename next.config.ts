import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Ensure static files are properly served
  trailingSlash: false,
  // Optimize for static export if needed
  output: 'standalone',
};

export default nextConfig;
