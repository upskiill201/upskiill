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
 * Chapter 4 — "Is my order ready?" (v0.4). Forty people asking the same
 * question through the window. Lists from arrays with map, FlatList and keys,
 * key myths, order rows with status pills, filtered and counted lists, updating
 * a list in state, then screens: a one-file navigator, passing an id, Expo
 * Router's app/ folder, Link and params, a board and a kitchen tab, Ray's
 * "Ready" buttons, "Find my order" search, a review on keys and one source of
 * truth, and the ready board. Challenge: the order board at the Thursday night
 * market. Cliffhanger: the phone restarts and every order is gone (Chapter 5).
 */
const unit: OriginalUnit = {
  key: 'u04',
  title: '"Is my order ready?"',
  marker: 'v0.4',
  story: 'Forty people asking the same question through the window. The app needs a list, and more than one screen.',
  goal: 'Show lists with FlatList and keys, update them in state, and move between screens with an id.',
  lessons: [l01, l02, l03, l04, l05, l06, l07, l08, l09, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20],
};

export default unit;
