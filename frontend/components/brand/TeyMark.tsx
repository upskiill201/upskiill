import Image from 'next/image';

/**
 * The Teyro logo: Tey on the blue app tile, the same art as the Home Screen
 * icon (public/Tey Logo and icons/, built by scripts/gen-app-icons.mjs).
 *
 * Used on its own, never paired with a "TEYRO" wordmark — on a phone the app
 * name already sits under the icon.
 */
export function TeyMark({ size = 40, className, priority = false }: { size?: number; className?: string; priority?: boolean }) {
  return (
    <Image
      src={size > 96 ? '/Icons/icon-512.png' : '/Icons/icon-192.png'}
      alt="Teyro"
      width={size}
      height={size}
      priority={priority}
      className={className}
    />
  );
}

export default TeyMark;
