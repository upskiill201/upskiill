import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './impulse-buying/beginner/u01';
import u02 from './impulse-buying/beginner/u02';
import u03 from './impulse-buying/beginner/u03';

/**
 * How to Stop Impulse Buying — storyline "Kofi vs the Cart".
 * A SHORT Original (5 chapters × 10 lessons). Course 3 of 3 in the Personal
 * Finance set; picks up after Kofi's laptop is paid for (end of How to Save
 * Money on a Low Income). His beats now sell every week, money comes in for
 * the first time, and his phone is full of ads.
 *
 * Running numbers / story (keep consistent):
 * - Ch1: 2:14 a.m. after the inter-hall final is lost on penalties, a flash
 *   sale: boots "70% off, 3 left, 04:59", GH₵480. Wrong size, no returns. Sold
 *   to a hallmate for GH₵300 (lost GH₵180). Urge log: 11 urges in week 1.
 * - Ch2: triggers = late nights, losses, exam stress, boredom (HALT).
 *   Cliffhanger: six parcels on Yaw's bed in one day.
 * - Ch3: break at home in Accra, helping Mum at her cloth stall in Makola;
 *   Mum's rule "never say 'last two' when you have twenty". Cliffhanger: a
 *   debt-collection message about Yaw reaches Kofi's phone.
 * - Ch4: Yaw owes GH₵2,900 across three pay-later apps; one messaged his
 *   contacts. Kofi helps him build a plan (no lending from savings).
 * - Ch5: Black Friday. Kofi buys only the audio interface he saved for
 *   (list GH₵900, sale GH₵720; he had GH₵900 saved), then the last scene at
 *   Makola. Kofi's beat income ~GH₵600/month (4 × GH₵150).
 * Outline: docs/originals/money-track-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'how-to-stop-impulse-buying',
  title: 'How to Stop Impulse Buying',
  category: 'Personal Finance',
  format: 'short',
  description:
    'Understand why you buy, see the tricks shops and apps use, and spend on purpose: emotional spending, triggers, advertising tricks, social pressure and simple ways to pause.',
  levels: [
    {
      level: 1,
      slug: 'how-to-stop-impulse-buying',
      title: 'How to Stop Impulse Buying',
      thumbnailUrl: '/originals/how-to-stop-impulse-buying.jpg',
      subtitle: 'Kofi vs the Cart: understand why you buy, and spend on purpose',
      shortDescription:
        'Most impulse buys aren\'t about the thing. They\'re about a feeling, a trigger or a trick. Learn what drives your spending, how shops and apps get you to buy, and simple ways to pause so every purchase is one you meant.',
      description:
        "Kofi's laptop is paid for, his beats sell every week, and for the first time in his life money is coming in. Then, at 2:14 a.m. after his hall loses the inter-hall final on penalties, a flash sale shows him football boots: 70% off, three left, four minutes to go. He buys them. They're the wrong size. Follow Kofi as he finds out why he really buys things: the feelings and moments that trigger him, the tricks behind countdown timers and \"was\" prices (seen from behind his mum's cloth stall at Makola Market), the pressure when everyone around him is buying, and a best friend secretly drowning in pay-later debt. By Black Friday, he has a plan. Bring your own spending: every lesson helps you catch your urges and choose on purpose.",
      startingPoint:
        'You sometimes buy things you didn\'t plan to, and regret some of them. No budgeting experience needed (Budgeting for Beginners helps).',
      endOutcome: 'Spot your own spending triggers and use a pause rule to make purchases on purpose.',
      outcomes: [
        'Tell planned buys from impulse buys, and know why impulses happen',
        'Find your own emotional triggers and swap the habit',
        'Spot scarcity, anchoring, decoys and dark patterns in shops and apps',
        'Handle social pressure and understand how "pay later" really works',
        'Use a pause rule, a list and cost per use to spend on purpose',
      ],
      skills: ['Impulse control', 'Money psychology', 'Consumer awareness', 'Spending habits', 'Personal finance'],
      upcomingUnits: 2,
      units: [u01, u02, u03],
    },
  ],
};

export default track;
