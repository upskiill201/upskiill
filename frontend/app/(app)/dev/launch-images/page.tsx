'use client';

/**
 * Product Hunt launch gallery bench. Dev-only (never ships in a production
 * build). Each image is a looping motion piece built from separate layers.
 *
 *   /dev/launch-images                 every image, scaled to fit
 *   /dev/launch-images?scene=2-lesson  one image at full size, still=1 for the
 *                                      finished frame the PNG export captures
 */

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LAUNCH_SCENES } from '@/components/launchkit/scenes';

function Bench() {
  const q = useSearchParams();
  const only = q.get('scene');
  const still = q.get('still') === '1';

  if (process.env.NODE_ENV !== 'development') return <p style={{ padding: 24 }}>Dev only.</p>;

  if (only) {
    const sc = LAUNCH_SCENES.find((s) => s.id === only);
    if (!sc) return <p style={{ padding: 24 }}>No such scene.</p>;
    return (
      <>
        {/* the marketing header and any dev badge must not land in the export */}
        <style>{`header, nextjs-portal, [data-nextjs-toast] { display: none !important; } body { margin: 0; }`}</style>
        <div style={{ width: sc.w, height: sc.h, overflow: 'hidden' }} id="capture">
          <sc.C still={still} />
        </div>
      </>
    );
  }

  const scale = 0.62;
  return (
    <div style={{ padding: 24, display: 'grid', gap: 32, justifyItems: 'start' }}>
      {LAUNCH_SCENES.map((sc) => (
        <section key={sc.id}>
          <h3 style={{ margin: '0 0 8px', fontWeight: 800 }}>{sc.title}</h3>
          <div style={{ width: sc.w * scale, height: sc.h * scale, borderRadius: 12, overflow: 'hidden', border: '2px solid #E2E8F0' }}>
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
              <sc.C />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default function LaunchImagesPage() {
  return (
    <Suspense fallback={null}>
      <Bench />
    </Suspense>
  );
}
