import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog/posts';
import { CATEGORIES } from '@/lib/blog/categories';
import { AUTHORS } from '@/lib/blog/authors';

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
  ];
}
