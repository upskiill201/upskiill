/**
 * Learn, as a stack of short cards instead of one long page.
 *
 *   intro  — the lesson's title and "you'll learn to" (when the creator wrote it)
 *   video  — the lesson video (gated: watch to the end)
 *   audio  — the lesson audio
 *   text…  — the creator's reading, split into bite-sized cards
 *   notes  — the long lesson description, last
 *
 * How the reading is split: a heading always starts a new card (it's the
 * creator saying "new idea"); otherwise blocks are gathered until a card holds
 * about WORDS_PER_CARD words. A block — a paragraph, list, image, quote, code
 * sample — is never cut in half, so a card never ends mid-thought.
 */

import type { LessonContent } from './content';
import { clipRange, type CodeLanguage } from './blocks';

export const WORDS_PER_CARD = 70;

export type LearnCard =
  | { kind: 'intro' }
  | { kind: 'video'; url: string; caption?: string; startSec?: number; endSec?: number }
  | { kind: 'audio'; url: string; caption?: string; startSec?: number; endSec?: number }
  | { kind: 'text'; html: string; heading: string | null }
  | { kind: 'code'; language: CodeLanguage; code: string; caption?: string }
  | { kind: 'image'; url: string; alt: string; caption?: string }
  | { kind: 'callout'; tone: 'tip' | 'warning' | 'remember'; text: string }
  | { kind: 'check'; id: string; question: string; options: string[]; correctIndex: number; explanation?: string }
  | { kind: 'notes'; paragraphs: string[] }
  | { kind: 'empty' };

const HEADING = /^H[1-6]$/;

function words(text: string): number {
  return text.replace(/ /g, ' ').trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Splits creator HTML into card-sized chunks at block boundaries.
 * Needs a DOM (browser, or jsdom in tests); without one the text stays whole.
 */
export function splitReading(html: string, perCard = WORDS_PER_CARD): { html: string; heading: string | null }[] {
  if (!html.trim()) return [];
  if (typeof DOMParser === 'undefined') return [{ html, heading: null }];

  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
  const root = doc.body.firstElementChild;
  if (!root) return [{ html, heading: null }];

  const cards: { parts: string[]; words: number; heading: string | null }[] = [];
  let current: (typeof cards)[number] | null = null;

  for (const node of Array.from(root.childNodes)) {
    const isEl = node.nodeType === 1;
    const el = node as Element;
    const text = node.textContent ?? '';
    const markup = isEl ? el.outerHTML : text.trim() ? `<p>${text}</p>` : '';
    if (!markup) continue;
    // An empty editor paragraph ("<p><br></p>") is spacing, not content.
    if (isEl && el.tagName === 'P' && !text.trim() && !el.querySelector('img')) continue;

    const isHeading = isEl && HEADING.test(el.tagName);
    const n = words(text);
    const full = current && current.words >= perCard;
    // A heading opens a card; so does a full card, or a block that would
    // push a partly-filled card well past the limit.
    if (!current || isHeading || full || (current.words > 0 && current.words + n > perCard * 1.4)) {
      // A card that is only a heading keeps collecting.
      if (!(current && current.words === 0 && current.parts.length > 0 && !isHeading)) {
        current = { parts: [], words: 0, heading: isHeading ? text.trim() : null };
        cards.push(current);
      }
    }
    current.parts.push(markup);
    if (!isHeading) current.words += n;
  }

  return cards
    .filter((c) => c.parts.length > 0)
    .map((c) => ({ html: c.parts.join(''), heading: c.heading }));
}

export function learnCards(learn: LessonContent['learn']): LearnCard[] {
  const cards: LearnCard[] = [];
  if (learn.whatYouWillLearn.length > 0) cards.push({ kind: 'intro' });

  // v2: the creator's own deck, in their order. A long explanation card is
  // still split at block boundaries so it never becomes a wall of text.
  if (learn.cards) {
    for (const c of learn.cards) {
      switch (c.kind) {
        case 'text':
          for (const chunk of splitReading(c.html)) cards.push({ kind: 'text', ...chunk });
          break;
        case 'code':
          cards.push({ kind: 'code', language: c.language, code: c.code, caption: c.caption });
          break;
        case 'video':
          cards.push({ kind: 'video', url: c.url, caption: c.caption, ...clipRange(c) });
          break;
        case 'audio':
          cards.push({ kind: 'audio', url: c.url, caption: c.caption, ...clipRange(c) });
          break;
        case 'image':
          cards.push({ kind: 'image', url: c.url, alt: c.alt, caption: c.caption });
          break;
        case 'callout':
          cards.push({ kind: 'callout', tone: c.tone, text: c.text });
          break;
        case 'check':
          cards.push({ kind: 'check', id: c.id, question: c.question, options: c.options, correctIndex: c.correctIndex, explanation: c.explanation });
          break;
      }
    }
    return cards.length > 0 ? cards : [{ kind: 'empty' }];
  }

  if (learn.videoUrl) cards.push({ kind: 'video', url: learn.videoUrl });
  if (learn.audioUrl) cards.push({ kind: 'audio', url: learn.audioUrl });
  for (const chunk of splitReading(learn.textHtml)) cards.push({ kind: 'text', ...chunk });
  if (learn.description) {
    const paragraphs = learn.description
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (paragraphs.length) cards.push({ kind: 'notes', paragraphs });
  }
  return cards.length > 0 ? cards : [{ kind: 'empty' }];
}
