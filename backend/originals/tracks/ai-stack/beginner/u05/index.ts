import type { OriginalUnit } from '../../../../../src/originals/originals-authoring.types';
import l01 from './l01';
import l02 from './l02';
import l03 from './l03';
import l04 from './l04';
import l05 from './l05';
import l06 from './l06';
import l07 from './l07';
import l08 from './l08';
import l09 from './l09';
import l10 from './l10';
import l11 from './l11';
import l12 from './l12';
import l13 from './l13';
import l14 from './l14';
import l15 from './l15';
import l16 from './l16';
import l17 from './l17';
import l18 from './l18';
import l19 from './l19';
import l20 from './l20';

/**
 * Chapter 5 — Turning words into numbers. Why keyword search fails, embeddings,
 * similar means close, cosine similarity, embedding the product list, top-k
 * search, vector databases, indexes, metadata filters, hybrid search, when
 * embeddings get it wrong, vector databases you'll meet, the wedding question
 * (meaning alone puts juttis first), common mistakes and reading search results.
 * Climax: Ask Rao v0.5 product search.
 */
const unit: OriginalUnit = {
  key: 'u05',
  title: 'Turning words into numbers',
  marker: 'v0.5',
  story: 'A customer asks for something for a shaadi. Keyword search finds nothing. Joel turns every product into numbers.',
  goal: 'Build product search by meaning with embeddings, cosine similarity, top-k, filters and hybrid search.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20],
};

export default unit;
