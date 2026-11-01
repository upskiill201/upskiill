import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Art } from '@/components/art/Art';
import { Glyph, type GlyphName } from '@/components/art/Glyph';
import s from './not-found.module.css';

/**
 * The 404: Tey searching where the "0" would be, Teyro's own drawings around
 * him, two ways forward and a few places people usually mean. The site's Tey
 * header and footer come from the root layout.
 */

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

const LINKS: { href: string; label: string; glyph: GlyphName }[] = [
  { href: '/courses', label: 'All courses', glyph: 'book' },
  { href: '/learn-coding', label: 'Learn coding', glyph: 'code' },
  { href: '/learn-ai', label: 'Learn AI', glyph: 'sparkle' },
  { href: '/teach', label: 'Teach on Teyro', glyph: 'cap' },
  { href: '/blog', label: 'Blog', glyph: 'doc' },
];

export default function NotFound() {
  return (
    <main className={s.page}>
      <div className={s.stage} aria-hidden="true">
        <Art name="signpost" size={84} className={`${s.float} ${s.floatLeft}`} />
        <Art name="map" size={76} className={`${s.float} ${s.floatRight}`} />
        <span className={s.digit}>4</span>
        <span className={s.tey}>
          <Image src="/User onbarding Assets/tey/searching.webp" alt="" width={168} height={168} priority />
        </span>
        <span className={s.digit}>4</span>
      </div>

      <h1 className={s.title}>This page wandered off.</h1>
      <p className={s.sub}>Tey looked everywhere. The link may be old, or the page has moved.</p>

      <div className={s.actions}>
        <Link href="/" className={s.primary}>
          <Glyph name="house" size={20} strokeWidth={2.8} /> Back to home
        </Link>
        <Link href="/courses" className={s.secondary}>
          <Glyph name="search" size={20} strokeWidth={2.8} /> Browse courses
        </Link>
      </div>

      <nav className={s.links} aria-label="Popular pages">
        <span className={s.linksLabel}>Or try one of these</span>
        <ul>
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={s.chip}>
                <Glyph name={l.glyph} size={16} strokeWidth={2.6} />
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
