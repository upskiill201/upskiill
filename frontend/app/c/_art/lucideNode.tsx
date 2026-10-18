import { createElement, type ReactNode } from 'react';
import { __iconNode as bookOpen } from 'lucide-react/dist/esm/icons/book-open.js';
import { __iconNode as check } from 'lucide-react/dist/esm/icons/check.js';
import { __iconNode as layers } from 'lucide-react/dist/esm/icons/layers.js';
import { __iconNode as lightbulb } from 'lucide-react/dist/esm/icons/lightbulb.js';
import { __iconNode as sparkle } from 'lucide-react/dist/esm/icons/sparkle.js';
import { __iconNode as target } from 'lucide-react/dist/esm/icons/target.js';

/**
 * Lucide icons for satori. lucide-react's components are client components,
 * which a server-rendered image can't call — so this draws the same icons
 * from each one's published `__iconNode` shape data instead.
 */

export const ICONS = { bookOpen, check, layers, lightbulb, sparkle, target } as const;
export type IconName = keyof typeof ICONS;

export function LucideIcon({
  name,
  size,
  color,
  strokeWidth = 2,
  fill = 'none',
}: {
  name: IconName;
  size: number;
  color: string;
  strokeWidth?: number;
  fill?: string;
}): ReactNode {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name].map(([tag, { key, ...attrs }]) => createElement(tag, { key, ...attrs }))}
    </svg>
  );
}
