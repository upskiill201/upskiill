/**
 * Teyro's own currency and progress marks, the same art the top bar shows:
 * the streak flame, the XP gem, the heart and the Coin. Use this wherever one
 * of those four is meant, never a drawn stand-in or a stock icon.
 */

import Image from 'next/image';

export type MarkKind = 'streak' | 'xp' | 'heart' | 'coin';

const SRC: Record<MarkKind, string> = {
  streak: '/Icons/burn.png',
  xp: '/Icons/gem.png',
  heart: '/Icons/heart.png',
  coin: '/Icons/Coin.png',
};

export function Mark({
  kind,
  size = 18,
  label,
  className,
}: {
  kind: MarkKind;
  size?: number;
  /** Set when the mark stands alone and carries meaning; otherwise it is decorative. */
  label?: string;
  className?: string;
}) {
  return (
    <Image
      src={SRC[kind]}
      alt={label ?? ''}
      aria-hidden={label ? undefined : true}
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: 'contain', flexShrink: 0 }}
    />
  );
}
