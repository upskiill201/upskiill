import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Chat with Tey: "but everyone expects it". */
const lesson: OriginalLesson = {
  key: 'l07',
  title: '"But everyone expects it"',
  summary: 'Office birthday contributions, a colleague\'s send-forth, church harvest, the group trip. Ada feels expected to spend everywhere. Tey helps her sort real obligations from assumed ones.',
  minutes: 11,
  outcomes: [
    'Tell real obligations from assumed expectations',
    'Honour the obligations that match your values',
    'Say no to expectations that don\'t',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Ada\'s list of "expected" spending this month: office birthday collection ₦5,000, a colleague\'s send-forth ₦15,000, church harvest ₦20,000, the team\'s weekend trip ₦60,000. Which are real obligations?', replies: ['Aren\'t they all?'] },
        { tey: 'Let\'s test. A real obligation is one where not paying would genuinely hurt a relationship you care about, or break a promise you made. An assumed expectation is one you think people expect, but nobody would really mind.', replies: ['How do I tell?'] },
        { tey: 'Ask: who would actually notice, and would they actually mind? The office birthday: everyone gives something small; ₦2,000 is normal. The send-forth: she\'s close to this colleague. Harvest: giving is one of her values. The team trip: ten people, three already said no.', replies: ['So the trip is assumed?'] },
        { tey: 'Mostly. A warm "I\'m saving for Mexico City this year, but have fun!" costs her nothing with the team. It saves ₦60,000.', replies: ['And the others?'] },
        { tey: 'She keeps the send-forth and harvest because they match her values: connection and giving. She gives ₦2,000 for the birthday, like most people. Values decide, not pressure.', replies: ['What if someone does mind?'] },
        { tey: 'Then she has a real conversation, which is usually better than quietly overspending. Most people respect "I\'m saving for something big" more than you\'d think.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Ask: who would actually notice, and would they actually mind? Honour real obligations that match your values. Let assumed expectations go, warmly.',
    },
  ],
  apply: {
    scenario: 'Ada\'s "expected" spending.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Real obligation (matches her values) or assumed expectation?',
        groups: ['Real obligation', 'Assumed expectation'],
        items: [
          { text: 'A close colleague\'s send-forth', group: 0 },
          { text: 'A team trip where three already said no', group: 1 },
          { text: 'Church harvest giving', group: 0 },
          { text: '₦5,000 for an office birthday when most give ₦2,000', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada says no to the ₦60,000 trip and gives ₦2,000 instead of ₦5,000 for the birthday. How much does she save?',
        answers: ['63000', '63,000', '₦63,000', '₦63000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the test for a real obligation?',
        options: [
          { text: 'Someone asked', why: 'Being asked isn\'t the same as an obligation.' },
          { text: 'It\'s in a group chat', why: 'Group chats create lots of assumed expectations.' },
          { text: 'Not paying would genuinely hurt a relationship you care about, or break a promise' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'The team will think I\'m cheap if I skip the trip.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Three of them already said no. "I\'m saving for Mexico City this year, but have fun!" Most people respect that.' },
          { text: 'Go, to be safe.', why: '₦60,000 for an assumed expectation.' },
          { text: 'Tell them they\'re wasting money.', why: 'Judging them isn\'t needed.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The two questions.',
        template: 'Who would actually [[1]], and would they actually [[2]]?',
        blanks: [['notice'], ['mind']],
        distractors: ['pay', 'care'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each item to Ada\'s decision.',
        pairs: [
          ['Send-forth', 'Keep: connection'],
          ['Church harvest', 'Keep: giving'],
          ['Team trip', 'Warm no: saving for Mexico'],
          ['Office birthday', '₦2,000, like most'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which decision is pressure, not values?',
        lines: [
          'Give at harvest; giving matters to me.',
          'Go to the send-forth; she\'s a close friend.',
          'Go on the trip because I\'m scared of what they\'ll think.',
        ],
        bug: 2,
        fix: 'A warm no, because the trip doesn\'t match my values this year.',
        explanation: 'Fear of judgement isn\'t a value.',
      },
      {
        kind: 'mcq',
        prompt: 'What if someone genuinely minds?',
        options: [
          { text: 'Pay anyway', why: 'A conversation often solves it.' },
          { text: 'Never speak to them again', why: 'Too drastic.' },
          { text: 'Have a real conversation; it\'s usually better than quietly overspending' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The send-forth ₦15,000 + harvest ₦20,000 + birthday ₦2,000. What does Ada spend on obligations she keeps?',
        answers: ['37000', '37,000', '₦37,000', '₦37000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to handle an expected expense.',
        lines: ['Ask who would notice', 'Ask if they\'d really mind', 'Check it against your values', 'Keep it, or say a warm no'],
      },
    ],
  },
  reflect: {
    prompt: 'List the "expected" spending in your month. Which are real obligations, and which are assumed?',
    starters: ['Real:...', 'Assumed:...'],
  },
  deepen: {
    title: 'Pluralistic ignorance',
    summary: 'Psychologists describe a pattern where most people in a group privately disagree with something but assume everyone else agrees, so nobody speaks. Group spending often works like this: one person saying "I\'m out" frees others to say it too.',
  },
  notes: 'Pluralistic ignorance (Prentice & Miller 1993). Fictional amounts. The ₦63,000 saved this month offsets the aso-ebi (₦55,000) in story terms; not part of the recurring monthly saving.',
};

export default lesson;
