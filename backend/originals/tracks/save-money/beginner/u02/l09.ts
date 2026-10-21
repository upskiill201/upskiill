import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: the jar v2, leaks plugged. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The jar v2: leaks plugged',
  summary: 'Week 4. Nine leaks found, most plugged. Kofi updates the jar on his door. Tap through what changed, and see the gap shrink for the first time.',
  minutes: 11,
  outcomes: [
    'Read an updated savings tracker',
    'See how leak savings change the projection',
    'Update your own tracker after a change',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The jar v2 (week 4)',
      text: 'GOAL: GH₵3,500 by week 16. EMERGENCY FUND: GH₵300, untouched. IN THE JAR: GH₵850. LEAKS FOUND: about GH₵300 a month (GH₵70 a week). NEW RATE: GH₵125 a week. BY WEEK 16 AT THIS RATE: GH₵2,350. GAP: GH₵1,150. FUN LINE: still there.',
      hotspots: [
        { phrase: 'EMERGENCY FUND: GH₵300, untouched', note: 'Four weeks, no emergency yet. It stays separate whatever happens.' },
        { phrase: 'IN THE JAR: GH₵850', note: 'GH₵490 at the start, plus four weeks of saving (the leak savings came in gradually), plus Miracle\'s GH₵50 from the bet.' },
        { phrase: 'LEAKS FOUND: about GH₵300 a month', note: 'App GH₵25, night data GH₵30, call credit GH₵25, fees about GH₵30, lab lunches GH₵60, shared market trips GH₵50, water GH₵40, haircuts GH₵25, toiletries GH₵15.' },
        { phrase: 'NEW RATE: GH₵125 a week', note: 'GH₵55 from his budget\'s savings lines, plus GH₵70 a week of leak money moved straight to the jar.' },
        { phrase: 'BY WEEK 16 AT THIS RATE: GH₵2,350', note: '850 + 12 weeks × 125 = 2,350. A thousand cedis better than four weeks ago.' },
        { phrase: 'GAP: GH₵1,150', note: 'Halved. Still real. Chapters 3 to 5 need to protect the rate and close the rest.' },
        { phrase: 'FUN LINE: still there', note: 'Friday kelewele, team drinks and stew nights all survived. Big lines first, joys last.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When you find money, move it to the goal the same week. Found money that sits in your spending account gets spent.',
    },
  ],
  apply: {
    scenario: 'The jar at week 4.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'GH₵55 a week plus GH₵70 a week of leak money. New weekly rate?',
        answers: ['125', 'GH₵125', '125 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: '12 more weeks at GH₵125. How much will he add?',
        answers: ['1500', '1,500', 'GH₵1,500', 'GH₵1500'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'GH₵850 + GH₵1,500 = GH₵2,350. What\'s the gap to GH₵3,500?',
        options: [
          { text: 'GH₵1,150' },
          { text: 'GH₵2,130', why: 'That was the gap in week 0.' },
          { text: 'GH₵350', why: '3,500 − 2,350 = 1,150.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each leak to its monthly saving.',
        pairs: [
          ['Lab lunches', 'GH₵60'],
          ['Shared market trips', 'GH₵50'],
          ['Water', 'GH₵40'],
          ['Music app', 'GH₵25'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Did it change between jar v1 and v2?',
        groups: ['Changed', 'Stayed the same'],
        items: [
          { text: 'Weekly rate', group: 0 },
          { text: 'The goal amount', group: 1 },
          { text: 'The gap', group: 0 },
          { text: 'Emergency fund', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Gap\'s halved! Maybe I can relax a bit now.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Celebrate tonight. Then remember: the rate only holds if you keep moving the money every week. GH₵1,150 is still a lot.' },
          { text: 'Yes, relax, it\'ll work out.', why: 'Relaxing is how the drift happened in Budgeting.' },
          { text: 'Don\'t celebrate anything.', why: 'Progress deserves celebrating. Then back to the plan.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Found money rule.',
        template: 'Move found money to the [[1]] the same [[2]].',
        blanks: [['goal', 'jar'], ['week', 'day']],
        distractors: ['shop', 'year'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on this copy of the jar is wrong?',
        lines: [
          'In the jar: GH₵850.',
          'New rate: GH₵125 a week.',
          'By week 16: GH₵3,350.',
          'Gap: GH₵1,150.',
        ],
        bug: 2,
        fix: 'By week 16: GH₵2,350.',
        explanation: '850 + 12 × 125 = 2,350. And 3,500 − 2,350 = 1,150.',
      },
      {
        kind: 'mcq',
        prompt: 'What does Kofi most need to protect now?',
        options: [
          { text: 'The GH₵125 weekly rate, every single week' },
          { text: 'His fun line, by doubling it', why: 'Fun is protected already, at its size.' },
          { text: 'Nothing; it\'s sorted', why: 'The gap is still GH₵1,150.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the jar update.',
        lines: ['Count what\'s in the jar', 'Write the new weekly rate', 'Project to the goal date', 'Write the new gap'],
      },
    ],
  },
  reflect: {
    prompt: 'Update your own tracker with one leak you\'ve found. How much does it change your projection?',
    starters: ['The leak I found:...', 'It adds... a week', 'New gap:...'],
  },
  deepen: {
    title: 'Every cedi times the weeks',
    summary: 'A leak found early is worth more than the same leak found late, because it saves for more weeks. GH₵70 a week found in week 4 is GH₵840 by week 16. The same leak found in week 12 is GH₵280.',
  },
  notes: 'Jar v2 per running numbers (save-money.ts): week 4 jar 850 (includes Miracle\'s GH₵50); leaks ≈ 300/month = 70/week; rate 125; projection 2,350; gap 1,150.',
};

export default lesson;
