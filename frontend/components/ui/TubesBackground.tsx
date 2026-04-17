'use client';

/**
 * TubesBackground — anim2 (refined)
 *
 * Uses the real threejs-components tubes1 cursor effect from CDN.
 * The webpackIgnore comment tells webpack to let the browser handle it natively.
 *
 * Refinements over the reference:
 * - Stronger light intensity (280) for more dramatic 3D depth
 * - Teyro brand palette: rich indigo / violet / lavender
 * - Framer-motion fade-in once the CDN module is loaded (no blank flash)
 * - Exposes randomize API on click (same as reference)
 */

import React, { useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const randomColors = (count: number): string[] =>
  Array.from(
    { length: count },
    () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')
  );

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}

// ─── CDN ─────────────────────────────────────────────────────────────────────

const TUBES_CDN =
  'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js';

// ─── Component ────────────────────────────────────────────────────────────────

export function TubesBackground({
  children,
  className,
  enableClickInteraction = true,
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tubesRef  = useRef<unknown>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        // webpackIgnore: browser resolves this natively at runtime
        // @ts-expect-error CDN injection
        const cdnModule = await import(/* webpackIgnore: true */ TUBES_CDN as string);
        const TubesCursor = cdnModule.default;

        if (!mounted) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            // Teyro brand palette — rich indigo / violet / lavender
            colors: ['#6352FF', '#7C3AED', '#C084FC'],
            lights: {
              // Higher intensity = more dramatic 3D depth & glow
              intensity: 280,
              colors: ['#818CF8', '#9333EA', '#A78BFA', '#6D28D9'],
            },
          },
        });

        tubesRef.current = app;

        // Slight delay so the canvas has time to paint before we reveal it
        setTimeout(() => {
          if (mounted) setIsLoaded(true);
        }, 120);

        cleanup = () => {
          // No explicit destroy API in this library version
        };
      } catch (err) {
        console.error('[TubesBackground] CDN load failed:', err);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return;
    tubesRef.current.tubes.setColors(randomColors(3));
    tubesRef.current.tubes.setLightsColors(randomColors(4));
  };

  return (
    <div
      className={cn('relative w-full h-full min-h-[400px] overflow-hidden', className)}
      onClick={handleClick}
    >
      {/* Teyro dark bg visible while CDN loads so there's no white flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#060818',
          zIndex: 0,
        }}
      />

      {/* Wrapping the stable canvas in a div to handle the fade-in cleanly */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          zIndex: 1, 
          opacity: isLoaded ? 0.9 : 0, 
          transition: 'opacity 1.2s ease-out',
          mixBlendMode: 'screen', 
          filter: 'saturate(1.4)'
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ touchAction: 'none' }}
        />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;
