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
  // Disable image optimization for videos
  images: {
    unoptimized: true,
  },
  // Ensure static files are included in build
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
};

export default nextConfig;
