import { buildCanonical, SITE_URL } from '@/lib/blog/site';

/**
 * JSON-LD for the SEO sections, built from page data — never pasted into
 * frontmatter. Hand-written blobs drifted (wrong URLs, an unrelated YouTube
 * video, a wrapped object) and the FAQ answers stopped matching the page.
 */

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.path === '/' ? SITE_URL : buildCanonical(c.path),
    })),
  };
}

export function articleSchema(opts: {
  path: string;
  title: string;
  description: string;
  dateModified: string;
}) {
  const url = buildCanonical(opts.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    dateModified: opts.dateModified,
    author: { '@type': 'Organization', name: 'Teyro', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Teyro',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/teyro-logo-blue.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  if (items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function itemListSchema(name: string, items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url ? { url: buildCanonical(item.url) } : {}),
    })),
  };
}

export function collectionSchema(opts: { name: string; path: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: opts.name,
    url: buildCanonical(opts.path),
    description: opts.description,
    isPartOf: { '@type': 'WebSite', name: 'Teyro', url: SITE_URL },
  };
}

/** Drops nulls so pages can pass optional schemas inline. */
export function schemas(...items: (Record<string, unknown> | null)[]) {
  return items.filter((s): s is Record<string, unknown> => s !== null);
}
