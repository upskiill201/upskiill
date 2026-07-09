'use client';

import React from 'react';

interface SpeechBubbleShapeProps {
  width: number;
  height: number;
  /** 0–1: fraction from left where the tail base center sits */
  tailAlign?: number;
  /** Border radius for the four corners */
  cornerRadius?: number;
  /** Extra SVG canvas height to accommodate the tail */
  tailHeight?: number;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  shadowId?: string;
}

/**
 * Renders a single continuous SVG path:
 *   - Rounded rectangle body (true arc corners via A commands)
 *   - Organic curved tail built with Q bezier curves
 *   - Soft blue-tinted drop shadow via SVG filter
 *
 * The tail tapers naturally from two points on the bubble base
 * to a single tip below, using quadratic bezier curves for organic curvature.
 */
export const SpeechBubbleShape: React.FC<SpeechBubbleShapeProps> = ({
  width,
  height,
  tailAlign = 0.18,
  cornerRadius = 24,
  tailHeight = 28,
  fillColor = '#FFFFFF',
  strokeColor = '#E5E9F5',
  strokeWidth = 1.5,
  shadowId = 'speech-bubble-shadow',
}) => {
  const r = cornerRadius;
  const tw = tailHeight; // tail height
  const totalHeight = height + tw;

  // Tail base is a spread of ~32px centered on tailAlign fraction
  const tailCenter = width * tailAlign;
  const tailHalfSpread = 18;
  const tailLeft = Math.max(r + 8, tailCenter - tailHalfSpread);
  const tailRight = Math.min(width - r - 8, tailCenter + tailHalfSpread);
  // Tail tip: offset slightly left of center for organic asymmetry
  const tailTipX = tailCenter - 4;
  const tailTipY = totalHeight;

  /**
   * Path:
   *   Start at top-left arc, go clockwise around the bubble body,
   *   then trace the tail using Q bezier on the way down-left,
   *   and back up to close.
   */
  const path = [
    // Top-left corner
    `M ${r} 0`,
    // Top edge
    `L ${width - r} 0`,
    // Top-right corner
    `A ${r} ${r} 0 0 1 ${width} ${r}`,
    // Right edge
    `L ${width} ${height - r}`,
    // Bottom-right corner
    `A ${r} ${r} 0 0 1 ${width - r} ${height}`,
    // Bottom edge to where the tail right-base begins
    `L ${tailRight} ${height}`,
    // Organic right side of tail going to tip (Q bezier)
    `Q ${tailRight - 4} ${height + tw * 0.55} ${tailTipX} ${tailTipY}`,
    // Organic left side of tail coming back up from tip (Q bezier)
    `Q ${tailLeft + 4} ${height + tw * 0.55} ${tailLeft} ${height}`,
    // Bottom edge continuing left
    `L ${r} ${height}`,
    // Bottom-left corner
    `A ${r} ${r} 0 0 1 0 ${height - r}`,
    // Left edge
    `L 0 ${r}`,
    // Top-left corner close
    `A ${r} ${r} 0 0 1 ${r} 0`,
    `Z`,
  ].join(' ');

  return (
    <svg
      width={width}
      height={totalHeight}
      viewBox={`0 0 ${width} ${totalHeight}`}
      overflow="visible"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <defs>
        <filter id={shadowId} x="-8%" y="-8%" width="116%" height="130%">
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="10"
            floodColor="rgba(61, 90, 254, 0.10)"
          />
        </filter>
      </defs>

      <path
        d={path}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        filter={`url(#${shadowId})`}
      />
    </svg>
  );
};
