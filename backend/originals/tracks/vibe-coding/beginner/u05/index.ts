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

/**
 * Chapter 5 — 4 weeks to go. "The Real App". Thirty parents each see only
 * their own sign-up: a page can't share. Front end / back end / database,
 * the stack (HTML/CSS/JS + Vite, Supabase, Vercel), a Supabase project and
 * .env.local, table design, email-link login, layers, public vs secret keys.
 * Learner build: an app with data and login, running locally.
 */
const unit: OriginalUnit = {
  key: 'u05',
  title: 'The Real App',
  marker: '4 weeks to go',
  story: 'Thirty parents sign up to drive. Each one sees only their own name. A page can\'t share.',
  goal: 'Build an app with a database and email login, one layer at a time.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10],
};

export default unit;
