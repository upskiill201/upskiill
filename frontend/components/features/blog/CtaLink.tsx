'use client';

import Link from 'next/link';
import { captureEvent } from '@/lib/analytics';
import { rememberSignupSource } from '@/lib/signupSource';

/**
 * The blog CTA button. A click remembers which post sent the reader, so the
 * notify-me form can record it with the email, and fires a PostHog event.
 * Everything else about the link is the plain server-rendered one.
 */
export default function CtaLink({
  href,
  className,
  source,
  children,
}: {
  href: string;
  className?: string;
  source: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        rememberSignupSource(source);
        captureEvent('blog_cta_click', { post: source, to: href });
      }}
    >
      {children}
    </Link>
  );
}
