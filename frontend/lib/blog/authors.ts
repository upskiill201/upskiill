import type { Author } from './types';

// Author registry — E-E-A-T signal for Google and AI answer engines.
// Add named contributors here as the blog grows; every post's frontmatter
// references an author by slug (defaults to 'teyro-team').

export const AUTHORS: Author[] = [
  {
    slug: 'teyro-team',
    name: 'The Teyro Team',
    role: 'Learning Team at Teyro',
    bio: 'We build Teyro — an AI-powered learning platform that turns skill-building into a daily habit through bite-sized, gamified lessons. We write about the learning science and study strategies that shape our product.',
    avatarUrl: '/dashboard tey.png',
  },
];

export function getAuthor(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}

export function getAuthorOrDefault(slug: string | undefined): Author {
  return (slug && getAuthor(slug)) || AUTHORS[0];
}
