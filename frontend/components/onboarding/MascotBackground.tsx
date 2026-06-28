import React from 'react';

// Reusable bubble component with glassy/pearl 3D effect
const Bubble = ({
  size,
  top,
  left,
  right,
  bottom,
  opacity = 0.7,
}: {
  size: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  opacity?: number;
}) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      top,
      left,
      right,
      bottom,
      opacity,
      background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95) 0%, rgba(147,210,255,0.6) 30%, rgba(93,168,250,0.4) 60%, rgba(59,130,246,0.25) 100%)',
      border: '1px solid rgba(147,197,253,0.5)',
      boxShadow: 'inset -2px -2px 6px rgba(59,130,246,0.15), inset 2px 2px 6px rgba(255,255,255,0.8), 0 4px 12px rgba(59,130,246,0.12)',
    }}
  />
);

// Hexagon with subtle glassy fill
const Hex = ({
  size,
  top,
  left,
  right,
  bottom,
  opacity = 0.6,
}: {
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  opacity?: number;
}) => (
  <svg
    className="absolute pointer-events-none"
    style={{ top, left, right, bottom, opacity }}
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <defs>
      <linearGradient id={`hexGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(147,210,255,0.8)" />
        <stop offset="100%" stopColor="rgba(93,168,250,0.5)" />
      </linearGradient>
    </defs>
    <path
      d="M12 2.5L21.5 8v11L12 24.5 2.5 19V8L12 2.5z"
      fill={`url(#hexGrad-${size})`}
      stroke="rgba(147,197,253,0.6)"
      strokeWidth="0.6"
    />
    {/* Gloss highlight */}
    <path
      d="M12 3.5L20.5 8.5v5L12 9z"
      fill="rgba(255,255,255,0.3)"
    />
  </svg>
);

// Tiny dot
const Dot = ({ top, left, right, bottom, size = '4px', opacity = 0.4 }: {
  top?: string; left?: string; right?: string; bottom?: string; size?: string; opacity?: number;
}) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      top,
      left,
      right,
      bottom,
      opacity,
      background: 'rgba(93,168,250,0.6)',
      border: '0.5px solid rgba(147,197,253,0.5)',
    }}
  />
);

// Sparkle cross
const Sparkle = ({ size, top, left, right, bottom, opacity = 0.5 }: {
  size: number; top?: string; left?: string; right?: string; bottom?: string; opacity?: number;
}) => (
  <svg
    className="absolute pointer-events-none"
    style={{ top, left, right, bottom, opacity }}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="rgba(200,230,255,0.9)"
  >
    <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5Z" />
  </svg>
);

export const MascotBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft central glow — very subtle, doesn't overpower */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] rounded-full"
        style={{
          width: '70%',
          height: '70%',
          background: 'radial-gradient(circle, rgba(211,229,253,0.85) 0%, rgba(211,229,253,0.3) 50%, transparent 80%)',
          filter: 'blur(24px)',
        }}
      />

      {/* === LARGE BUBBLES === */}
      {/* Top-right */}
      <Bubble size="52px" top="8%" right="12%" opacity={0.75} />
      {/* Mid-right */}
      <Bubble size="44px" top="38%" right="4%" opacity={0.65} />
      {/* Bottom-right */}
      <Bubble size="38px" bottom="22%" right="18%" opacity={0.65} />
      {/* Mid-left */}
      <Bubble size="36px" top="50%" left="4%" opacity={0.6} />
      {/* Bottom-center */}
      <Bubble size="32px" bottom="12%" left="30%" opacity={0.6} />
      {/* Top-center */}
      <Bubble size="24px" top="6%" left="42%" opacity={0.55} />

      {/* === MEDIUM BUBBLES === */}
      <Bubble size="20px" top="22%" right="8%" opacity={0.5} />
      <Bubble size="18px" top="35%" right="28%" opacity={0.5} />
      <Bubble size="22px" bottom="30%" right="6%" opacity={0.55} />
      <Bubble size="16px" bottom="18%" left="12%" opacity={0.5} />
      <Bubble size="20px" top="70%" left="20%" opacity={0.55} />
      <Bubble size="14px" bottom="8%" left="50%" opacity={0.4} />
      <Bubble size="18px" top="15%" left="20%" opacity={0.45} />

      {/* === SMALL BUBBLES === */}
      <Bubble size="10px" top="28%" left="38%" opacity={0.4} />
      <Bubble size="8px" top="55%" right="22%" opacity={0.4} />
      <Bubble size="12px" bottom="35%" left="35%" opacity={0.4} />
      <Bubble size="10px" top="42%" left="15%" opacity={0.35} />
      <Bubble size="8px" bottom="45%" right="12%" opacity={0.35} />

      {/* === HEXAGONS === */}
      {/* Large hex top-left area */}
      <Hex size={40} top="18%" left="22%" opacity={0.65} />
      {/* Medium hex center */}
      <Hex size={28} top="32%" left="38%" opacity={0.55} />
      {/* Large hex lower-left */}
      <Hex size={44} top="58%" left="12%" opacity={0.65} />
      {/* Small hex top-right */}
      <Hex size={20} top="12%" right="28%" opacity={0.45} />
      {/* Tiny hex bottom-center */}
      <Hex size={18} bottom="25%" left="48%" opacity={0.4} />

      {/* === TINY DOTS === */}
      <Dot top="5%" left="30%" size="5px" opacity={0.4} />
      <Dot top="18%" left="50%" size="4px" opacity={0.35} />
      <Dot top="45%" left="28%" size="5px" opacity={0.3} />
      <Dot top="62%" right="30%" size="4px" opacity={0.3} />
      <Dot bottom="15%" right="35%" size="5px" opacity={0.35} />
      <Dot top="25%" right="18%" size="4px" opacity={0.3} />
      <Dot bottom="38%" left="22%" size="5px" opacity={0.3} />
      <Dot top="75%" right="15%" size="4px" opacity={0.35} />
      <Dot bottom="5%" right="28%" size="5px" opacity={0.3} />

      {/* === SPARKLES === */}
      <Sparkle size={14} top="12%" left="10%" opacity={0.55} />
      <Sparkle size={12} top="22%" right="22%" opacity={0.5} />
      <Sparkle size={16} bottom="32%" right="12%" opacity={0.55} />
      <Sparkle size={10} bottom="20%" left="28%" opacity={0.45} />
      <Sparkle size={12} top="48%" right="8%" opacity={0.4} />
      <Sparkle size={14} top="65%" left="32%" opacity={0.45} />
    </div>
  );
};
