import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Required for next-mdx-remote under Turbopack (blog MDX pipeline)
  transpilePackages: ['next-mdx-remote'],
  // Guarantee the blog OG-image fonts ship with the server bundle
  outputFileTracingIncludes: {
    '/blog': ['./app/blog/_fonts/**'],
    '/blog/[slug]': ['./app/blog/_fonts/**'],
  },
  // Tree-shakes per-icon imports from these packages instead of pulling the
  // whole barrel file into every route's bundle. lucide-react (218 import
  // sites) and react-icons/fa (26) are the two approved icon libraries
  // (see frontend/CLAUDE.md); framer-motion ships on every route via the
  // root layout's provider tree, so its submodule imports benefit too.
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', 'framer-motion'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  images: {
    // AVIF/WebP first — the browser picks whichever it supports; falls
    // back to the original format for anything that supports neither.
    formats: ['image/avif', 'image/webp'],
    // First-party SVG icon assets (e.g. /Icons/snowflake.svg for the
    // streak-freeze celebration currency) must be servable through next/image.
    // All SVGs under /public are repo-authored — no user-uploaded SVGs.
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
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

      // afterFiles: run AFTER static filesystem check but BEFORE dynamic
      // routes. Must stay empty: an `/api/:path*` catch-all here would
      // shadow every dynamic app/api/**/[param] route handler.
      afterFiles: [],

      // fallback: run after ALL filesystem routes (static AND dynamic).
      // Anything that wasn't handled locally proxies through to NestJS,
      // e.g. legacy /api/social/* paths with no local route handler.
      fallback: [
        {
          // Proxy remaining /api/* calls to the NestJS backend.
          source: '/api/:path*',
          destination: `${backendUrl}/:path*`,
        },
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
