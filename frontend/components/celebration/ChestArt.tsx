'use client';

/**
 * ChestArt — the treasure chest visual for the ChestScene.
 *
 * RIVE SLOT: our animators are producing the Teyro treasure-box Rive file.
 * When it lands: install @rive-app/react-canvas, drop the .riv into /public,
 * and replace the body of this component with a <RiveComponent> driven by a
 * state machine input (idle / shake / burst). Until then we render the static
 * PNG and the scene choreography (shake → beam → dissolve) provides the motion.
 * Keeping this isolated means no scene code changes when Rive arrives.
 */

import React, { forwardRef } from 'react';
import Image from 'next/image';
import styles from './Scene.module.css';

export type ChestVisualState = 'closed' | 'shaking' | 'opening' | 'open';

interface ChestArtProps {
  state: ChestVisualState;
  /** GSAP/framer target — the scene animates this wrapper. */
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const ChestArt = forwardRef<HTMLDivElement, ChestArtProps>(function ChestArt(
  { state, className, style, onClick },
  ref
) {
  return (
    <div
      ref={ref}
      className={[styles.chestArtWrap, className].filter(Boolean).join(' ') || undefined}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? 'Open chest' : undefined}
    >
      <Image
        src="/Tressure box.webp"
        alt="Teyro treasure chest"
        width={200}
        height={180}
        className={styles.chestArt}
        style={{
          opacity: state === 'open' ? 0 : 1,
          transition: 'opacity 0.25s ease',
        }}
        priority
      />
    </div>
  );
});

export default ChestArt;
