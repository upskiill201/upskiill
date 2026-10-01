import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog/posts';
import { CATEGORIES } from '@/lib/blog/categories';
import { AUTHORS } from '@/lib/blog/authors';
import { getAllFeaturePages } from '@/lib/features/posts';
import { getAllUseCasePages } from '@/lib/use-cases/posts';
import { COMPETITORS, altSlug, vsSlug } from '@/lib/seo/competitors';
import { PERSONAS } from '@/lib/seo/personas';
import { TEACH_SKILLS, TEACH_SOURCES, teachParams } from '@/lib/seo/teach';

// Auto-generated sitemap — adding an .mdx post to content/blog updates this
// on the next build automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: 'https://teyro.app',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      // The install gateway — the entry point into the app itself, and a
      // legitimate landing page for "get the Teyro app" style queries.
      url: 'https://teyro.app/start',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      // The creator landing page.
      url: 'https://teyro.app/teach',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://teyro.app/blog',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...getAllPosts().map((post) => ({
      url: `https://teyro.app/blog/${post.slug}`,
      lastModified: new Date(post.frontmatter.updatedDate ?? post.frontmatter.publishedDate),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...CATEGORIES.map((category) => ({
      url: `https://teyro.app/blog/category/${category.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...AUTHORS.map((author) => ({
      url: `https://teyro.app/blog/author/${author.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...getAllFeaturePages().map((page) => ({
      url: `https://teyro.app/features/${page.slug}`,
      lastModified: new Date(page.frontmatter.updated),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...getAllUseCasePages().map((page) => ({
      url: `https://teyro.app/for/${page.slug}`,
      lastModified: new Date(page.frontmatter.updated),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...PERSONAS.map((persona) => ({
      url: `https://teyro.app/for/${persona.slug}`,
      lastModified: new Date('2026-09-28'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: 'https://teyro.app/teach/how-it-works',
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    // Creator recruitment: /teach/<skill> hubs and one page per place with data.
    ...TEACH_SKILLS.map((skill) => ({
      url: `https://teyro.app/teach/${skill}`,
      lastModified: new Date(TEACH_SOURCES.generatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...teachParams().map(({ skill, place }) => ({
      url: `https://teyro.app/teach/${skill}/${place}`,
      lastModified: new Date(TEACH_SOURCES.generatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    // Comparison pages convert hardest — the reader is already switching.
    ...COMPETITORS.flatMap((c) =>
      [vsSlug(c), altSlug(c)].map((slug) => ({
        url: `https://teyro.app/alternatives/${slug}`,
        lastModified: new Date(c.checked),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
    ),
    {
      url: 'https://teyro.app/features',
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://teyro.app/for',
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://teyro.app/alternatives',
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];
}
