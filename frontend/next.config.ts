import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Required for next-mdx-remote under Turbopack (blog MDX pipeline)
  transpilePackages: ['next-mdx-remote'],
  // Guarantee the OG-image fonts ship with the server bundle. /teach's
  // opengraph-image reuses the blog's committed Plus Jakarta Sans TTFs
  // rather than duplicating font files for a second route.
  outputFileTracingIncludes: {
    '/blog': ['./app/blog/_fonts/**'],
    '/blog/[slug]': ['./app/blog/_fonts/**'],
    '/teach': ['./app/blog/_fonts/**'],
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
  env: {
    // Versions the service worker. public/sw.js is a static file and cannot
    // read env at runtime, so the registrar appends this as `?v=` — a
    // byte-different script URL is a different worker, which is what makes a
    // deploy install a new SW and drop the previous build's caches. Without it
    // the version was a hardcoded constant that no build step touched, so the
    // static cache accumulated every build's chunks and served them
    // cache-first forever.
    NEXT_PUBLIC_BUILD_ID:
      process.env.VERCEL_GIT_COMMIT_SHA ??
      process.env.NEXT_PUBLIC_BUILD_ID ??
      'dev',
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
        // Cloudflare R2 public dev URL — course thumbnails + lesson videos/audio
        protocol: 'https',
        hostname: 'pub-d1eea6d3cd36417ea274a8c49e11c316.r2.dev',
      },
    ],
  },
  /**
   * Retired URLs.
   *
   * /join was the Tally waitlist, the conversion path while Teyro was
   * pre-launch. The product is live now, so the form is gone — but the URL is
   * out in social bios, emails and ads, so it redirects instead of 404ing.
   *
   * This lives in config rather than as a page calling redirect(): by the time
   * a page body throws, the root layout has already begun streaming, so Next
   * can only finish the response as a 200 carrying a client-side redirect.
   * A config redirect answers with a real 308 before any render, which is what
   * search engines need to move the URL's link equity to /start.
   */
  async redirects() {
    return [
      {
        source: '/join',
        destination: '/start',
        permanent: true,
      },
    ];
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
