import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog/posts';
import { CATEGORIES } from '@/lib/blog/categories';
import { AUTHORS } from '@/lib/blog/authors';
import { getAllFeaturePages } from '@/lib/features/posts';
import { getAllUseCasePages } from '@/lib/use-cases/posts';
import { COMPETITORS, altSlug, vsSlug } from '@/lib/seo/competitors';
import { PERSONAS } from '@/lib/seo/personas';
import { TEACH_SKILLS, TEACH_SOURCES, teachParams } from '@/lib/seo/teach';
import { LEARN_HUB, allLearnPaths } from '@/lib/seo/learn';
import { fetchPublicCourses } from '@/lib/courses/public';

// Auto-generated sitemap — adding an .mdx post to content/blog updates this
// on the next build automatically.
//
// <lastmod> is only emitted where we know a real date (a post's updated date,
// a competitor's "checked" date, the teach data's generation date). It used
// to be `new Date()` on every build for every other page, which told Google
// that ~1,000 pages changed every deploy; Google learns to ignore a sitemap's
// lastmod when it's wrong, and then stops using it for the pages where it IS
// right. No date is better than a false one.
//
// /start is deliberately absent: it is the app's install gateway (a
// full-bleed client screen with no page content), noindexed on purpose. The
// homepage and /courses are the entry points that should rank.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Published Coding and AI courses (empty if the backend is unreachable —
  // the rest of the sitemap still builds).
  const courses = await fetchPublicCourses();

  return [
    {
      url: 'https://teyro.app',
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      // The creator landing page.
      url: 'https://teyro.app/teach',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://teyro.app/blog',
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
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...AUTHORS.map((author) => ({
      url: `https://teyro.app/blog/author/${author.slug}`,
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
    // The course catalogue and one page per published course.
    {
      url: 'https://teyro.app/courses',
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    ...courses.map((c) => ({
      url: `https://teyro.app/courses/${c.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    // Learner pages: /learn-online, track hubs, topic guides and track × place.
    {
      url: `https://teyro.app${LEARN_HUB}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...allLearnPaths().map(({ path, kind }) => ({
      url: `https://teyro.app${path}`,
      lastModified: new Date(TEACH_SOURCES.generatedAt),
      changeFrequency: 'monthly' as const,
      priority: kind === 'track' ? 0.8 : kind === 'topic' ? 0.7 : 0.6,
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
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://teyro.app/for',
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://teyro.app/alternatives',
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];
}
