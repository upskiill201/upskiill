import React from 'react';
import { AbsoluteFill, staticFile } from 'remotion';

/**
 * Scene-wide print grain, like the reference videos' halftone/paper texture.
 * A static tiled noise PNG (public/fx/grain.png), so it costs almost nothing to render.
 * Put it last inside the composition so it sits over everything, Ada included.
 */
export const Grain: React.FC<{ opacity?: number; size?: number }> = ({ opacity = 0.07, size = 256 }) => (
  <AbsoluteFill
    style={{
      backgroundImage: `url(${staticFile('fx/grain.png')})`,
      backgroundSize: `${size}px ${size}px`,
      mixBlendMode: 'multiply',
      opacity,
      pointerEvents: 'none',
    }}
  />
);
