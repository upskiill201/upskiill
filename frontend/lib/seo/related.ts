import { getFeatureBySlug } from '@/lib/features/posts';
import { getUseCaseBySlug } from '@/lib/use-cases/posts';
import { getPostBySlug } from '@/lib/blog/posts';
import { PERSONA_BY_SLUG } from './personas';
import { competitorPageDescription, competitorPageTitle, resolveCompetitorSlug } from './competitors';
import type { LinkCardItem } from '@/components/seo/Blocks';

/**
 * Turns internal paths into link cards — the internal-linking mesh between
 * features, use cases, comparisons and the blog. Unknown paths are dropped,
 * so a renamed page can never render a dead card.
 */
export function resolveLink(path: string): LinkCardItem | null {
  const [, section, slug] = path.split('/');
  if (!slug) return null;

  switch (section) {
    case 'features': {
      const p = getFeatureBySlug(slug);
      return p ? { href: path, kicker: 'Feature', title: p.frontmatter.keyword, text: p.frontmatter.meta_description } : null;
    }
    case 'for': {
      const persona = PERSONA_BY_SLUG.get(slug);
      if (persona) return { href: path, kicker: `For ${persona.who}`, title: persona.title, text: persona.description };
      const p = getUseCaseBySlug(slug);
      return p ? { href: path, kicker: 'Use case', title: p.frontmatter.title, text: p.frontmatter.meta_description } : null;
    }
    case 'alternatives': {
      const hit = resolveCompetitorSlug(slug);
      if (!hit) return null;
      return {
        href: path,
        kicker: hit.kind === 'vs' ? 'Comparison' : 'Alternatives',
        title: competitorPageTitle(hit.kind, hit.competitor),
        text: competitorPageDescription(hit.kind, hit.competitor),
      };
    }
    case 'blog': {
      const post = getPostBySlug(slug);
      return post ? { href: path, kicker: 'Guide', title: post.frontmatter.title, text: post.frontmatter.description } : null;
    }
    default:
      return null;
  }
}

export function relatedCards(paths: string[], exclude: string, limit = 3): LinkCardItem[] {
  const seen = new Set<string>([exclude]);
  const out: LinkCardItem[] = [];
  for (const path of paths) {
    if (seen.has(path)) continue;
    seen.add(path);
    const card = resolveLink(path);
    if (card) out.push(card);
    if (out.length === limit) break;
  }
  return out;
}
