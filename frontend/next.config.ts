import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
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
      {
        // Supabase Storage — legacy thumbnails
        protocol: 'https',
        hostname: 'iobdpmczxikgocvfzouo.supabase.co',
      },
      {
        // AWS CloudFront CDN — course thumbnails + lesson videos/audio
        protocol: 'https',
        hostname: 'dhnydb8s9j6i4.cloudfront.net',
      },
    ],
  },
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://upskiill-backend.onrender.com';

    console.log(`Setting up rewrites. Target Backend: ${backendUrl}`);

    return {
      // beforeFiles: run before filesystem check — nothing here
      beforeFiles: [],

      // afterFiles: run AFTER filesystem is checked.
      // Next.js will serve any existing app/api/* route handlers (like /api/upload/presign)
      // BEFORE reaching these rewrites, so local API routes are always safe.
      afterFiles: [
        {
          // Proxy all /api/* calls to NestJS backend EXCEPT our local Next.js API routes
          // (Next.js serves /api/upload/* from the filesystem first — these rewrites never fire for them)
          source: '/api/:path*',
          destination: `${backendUrl}/:path*`,
        },
      ],

      // fallback: run after dynamic routes
      fallback: [
        {
          source: "/ingest/static/:path*",
          destination: "https://us-assets.i.posthog.com/static/:path*",
        },
        {
          source: "/ingest/:path*",
          destination: "https://us.i.posthog.com/:path*",
        },
        {
          source: "/ingest/decide",
          destination: "https://us.i.posthog.com/decide",
        },
      ],
    };
  },
};

export default nextConfig;
