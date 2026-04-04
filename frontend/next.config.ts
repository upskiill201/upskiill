import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 
      (isVercel ? 'https://upskiill-backend.onrender.com' : 'http://localhost:3001');

    console.log(`Setting up rewrites. Target Backend: ${backendUrl}`);

    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
