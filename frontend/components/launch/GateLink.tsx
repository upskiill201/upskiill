import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';
import { gateHref } from '@/lib/launch';

/**
 * <a> override for blog MDX. Posts hard-code links into the app; while it is
 * closed (lib/launch.ts) they resolve to the notify-me form, and when it opens
 * they go back on their own — no post is edited.
 */
export function GateLink({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const to = gateHref(href);
  if (to && (to.startsWith('/') || to.startsWith('#'))) {
    return (
      <Link href={to} {...(rest as Record<string, unknown>)}>
        {children}
      </Link>
    );
  }
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  );
}
