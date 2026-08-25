'use client';

import React from 'react';
import Image from 'next/image';
import shared from './community.module.css';

/**
 * Tey mascot sticker for empty states. The source asset ships with a baked-in
 * dark background, so it lives inside a contained dark tile that reads as an
 * intentional sticker chip rather than floating pastel art.
 */
export default function TeyMascot({ size = 84 }: { size?: number }) {
  return (
    <div className={shared.teyTile} style={{ width: size, height: size }} aria-hidden>
      <Image
        src="/dashboard tey.png"
        alt=""
        width={size}
        height={size}
        style={{ width: '82%', height: '82%', objectFit: 'contain' }}
      />
    </div>
  );
}
