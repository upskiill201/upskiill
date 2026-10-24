import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Before/After: Ada's spending, before and after values. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Spending that sounds like Ada',
  summary: 'Ada\'s month before the values exercise, and her plan after. The second one saves more, and, she says, "finally sounds like me". Side by side.',
  minutes: 11,
  outcomes: [
    'Rebuild a month of spending around your values',
    'Move money from low-joy to high-joy lines',
    'See how values-based plans save and satisfy',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Ada\'s other spending, before and after values',
      before: {
        label: 'Before: spending by default',
        text: 'Online shopping: ₦35,000 (scored 2)\nClothes and beauty: ₦45,000 (scored 5)\nFriday dinners: ₦32,000 (scored 9)\nChurch and giving: ₦20,000 (scored 8)\nPersonal care: ₦20,000 (scored 6)\nFamily support: ₦40,000 (scored 10)',
      },
      after: {
        label: 'After: spending by values',
        text: 'Online shopping: ₦10,000 (one thing a month, chosen)\nClothes and beauty: ₦30,000 (what she\'ll wear, not trends)\nFriday dinners: ₦32,000 (protected)\nChurch and giving: ₦20,000 (protected)\nPersonal care: ₦20,000 (unchanged)\nFamily support: ₦40,000 (protected)\nSaved: ₦40,000 a month',
      },
      notes: [
        'The lowest score (online shopping) got the biggest cut: ₦25,000.',
        'Clothes and beauty, a middle score, got a trim, not a ban.',
        'Every high score stayed exactly the same: family, giving, Friday dinners.',
        'Total: ₦40,000 more saved a month, and nothing she loves is gone.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Biggest cuts to the lowest scores, trims to the middle, and leave the top scores alone. That\'s a plan you\'ll keep.',
    },
  ],
  apply: {
    scenario: 'Rebuilding Ada\'s month.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Online shopping ₦35,000 → ₦10,000, clothes ₦45,000 → ₦30,000. Total saved?',
        answers: ['40000', '40,000', '₦40,000', '₦40000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada was saving ₦85,000. Add ₦40,000. What\'s her new monthly saving?',
        answers: ['125000', '125,000', '₦125,000', '₦125000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Big cut, trim, or protected?',
        groups: ['Big cut', 'Trim', 'Protected'],
        items: [
          { text: 'Online shopping (scored 2)', group: 0 },
          { text: 'Clothes and beauty (scored 5)', group: 1 },
          { text: 'Family support (scored 10)', group: 2 },
          { text: 'Friday dinners (scored 9)', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why trim clothes instead of banning them?',
        options: [
          { text: 'Clothes are a must-have', why: 'Some are; trends aren\'t.' },
          { text: 'It\'s a middle score: some value, some waste' },
          { text: 'She forgot', why: 'It was deliberate.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Ngozi says you can\'t really be saving if you kept Friday dinners and giving. What do you tell her?',
        prompt: 'Ada\'s best answer?',
        options: [
          { text: 'You\'re right, I\'ll cut them.', why: 'They score 8 and 9.' },
          { text: 'I\'m not saving any more.', why: 'She\'s saving more than ever.' },
          { text: 'I am. ₦40,000 more a month, from the things I don\'t care about. The things I love stay.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The pattern.',
        template: 'Biggest cuts to the [[1]] scores, trims to the [[2]], top scores [[3]].',
        blanks: [['lowest'], ['middle'], ['protected', 'alone']],
        distractors: ['highest', 'gone'],
      },
      {
        kind: 'findBug',
        prompt: 'Which change doesn\'t follow the pattern?',
        lines: [
          'Online shopping cut from ₦35,000 to ₦10,000.',
          'Clothes trimmed from ₦45,000 to ₦30,000.',
          'Church and giving cut to ₦0.',
        ],
        bug: 2,
        fix: 'Church and giving: protected at ₦20,000 (scored 8).',
        explanation: 'A high score stays. Cutting it would go against her values.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what happened.',
        pairs: [
          ['Online shopping', '−₦25,000'],
          ['Clothes and beauty', '−₦15,000'],
          ['Friday dinners', 'No change'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Ada say the new plan "sounds like me"?',
        options: [
          { text: 'It has her name on it', why: 'It\'s about her values, not a label.' },
          { text: 'Her money now goes mostly to what she values' },
          { text: 'It\'s cheaper', why: 'It\'s about alignment, not just cost.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Target ₦150,000 a month. Saving ₦125,000. How much is still to find?',
        answers: ['25000', '25,000', '₦25,000', '₦25000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Rebuild one month of your spending around your scores. How much does it save, and does it sound like you?',
    starters: ['Big cut:...', 'Trim:...', 'Protected:...', 'Saved:...'],
  },
  deepen: {
    title: 'One chosen thing',
    summary: 'Ada kept ₦10,000 a month for online shopping: one thing she chooses on purpose. Leaving a small, deliberate allowance for a habit you\'re cutting makes the cut much easier to keep.',
  },
  notes: 'Ada\'s other categories (fictional): online 35 → 10, clothes/beauty 45 → 30, Friday dinners 32, church/giving 20, personal care 20, family 40. Saving 85,000 → 125,000. Still to find 25,000 (Ch4).',
};

export default lesson;
