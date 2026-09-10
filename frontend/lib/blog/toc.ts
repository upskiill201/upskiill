import GithubSlugger from 'github-slugger';
import type { TocItem } from './types';

// Extracts H2/H3 headings for the table of contents.
// Uses a single sequential GithubSlugger so generated ids match what
// rehype-slug produces during MDX compilation — that parity is what makes
// anchor links + scroll-spy work.

const FENCE_RE = /^(```|~~~)/;
const HEADING_RE = /^(#{2,3})\s+(.+)$/;

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1') // images → alt text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links → label
    .replace(/[*_`~]/g, '') // emphasis/code markers
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;

  for (const rawLine of markdown.split('\n')) {
    const line = rawLine.trimEnd();

    if (FENCE_RE.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = HEADING_RE.exec(line);
    if (!match) continue;

    const text = stripInlineMarkdown(match[2]);
    if (!text) continue;

    items.push({
      id: slugger.slug(text),
      text,
      level: match[1].length === 2 ? 2 : 3,
    });
  }

  return items;
}
