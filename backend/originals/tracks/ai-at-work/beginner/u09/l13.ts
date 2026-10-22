import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 13 — writing to a client who's unhappy. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Writing to a client who\'s unhappy',
  summary: 'Ada writes the formal apology to Carmen\'s company. Research on apologies shows which parts matter most. AI drafts; Ada makes sure it means something.',
  minutes: 12,
  outcomes: [
    'Know what makes an apology work',
    'Write a client apology with AI\'s help',
    'Avoid apologies that sound empty',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two apology emails',
      before: {
        label: 'Empty apology',
        text: '"We apologise for any inconvenience caused. We value your business and are committed to excellence. Please do not hesitate to reach out."',
      },
      after: {
        label: 'Apology that works',
        text: '"On Monday, our app stopped your shops taking payments for two hours. That was our responsibility, and I\'m sorry. We\'ve fixed the connection and added an alert that warns us within minutes. Every affected shop gets that day\'s fees refunded, and Tolu is visiting each one this week. I\'ll update you Thursday at 4pm."',
      },
      notes: [
        'It names exactly what happened and its impact.',
        'It takes responsibility in plain words.',
        'It offers repair and says what changes, which research suggests matter most.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Say what happened, take responsibility, say sorry, offer repair, say what changes, give the next step. No "any inconvenience".',
    },
  ],
  apply: {
    scenario: 'Ada writes the formal apology.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s wrong with "We apologise for any inconvenience caused"?',
        options: [
          { text: 'It\'s too long', why: 'It\'s empty, not long.' },
          { text: 'It doesn\'t say what happened or take responsibility' },
          { text: 'Nothing', why: 'It says nothing specific.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the apology.',
        lines: ['What happened', 'Take responsibility', 'Say sorry', 'Offer repair', 'What changes', 'Next step'],
      },
      {
        kind: 'mcq',
        prompt: 'In a 2016 study, which apology parts did people value most?',
        options: [
          { text: 'Explaining whose fault it was', why: 'Responsibility and repair mattered most.' },
          { text: 'Long expressions of regret', why: 'Responsibility and repair mattered most.' },
          { text: 'Taking responsibility and offering repair' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request drafts the best apology?',
        options: [
          { text: 'Write a professional apology.', why: 'Often produces empty phrases.' },
          { text: 'Draft a client apology: what happened and its impact, our responsibility, sorry, the repair (refunds, visits), what changes (alert), next update. Plain words, no "any inconvenience".' },
          { text: 'Make it sound legal.', why: 'Cold and vague.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Meaningful, or empty?',
        groups: ['Meaningful', 'Empty'],
        items: [
          { text: '"That was our responsibility"', group: 0 },
          { text: '"We value your business"', group: 1 },
          { text: '"Every affected shop gets fees refunded"', group: 0 },
          { text: '"Committed to excellence"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Carmen says your apology was the first one she\'s ever believed. Why do you think?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'It said exactly what happened, owned it, and listed real fixes with dates, not just nice words.' },
          { text: 'The AI wrote it well.', why: 'Ada made it specific.' },
          { text: 'Luck.', why: 'It was the content.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Offer [[1]] and say what [[2]].',
        blanks: [['repair'], ['changes']],
        distractors: ['excuses', 'happened'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the AI draft should go?',
        lines: [
          'On Monday, our app stopped shops taking payments for two hours.',
          'That was our responsibility, and I\'m sorry.',
          'We apologise for any inconvenience this may have caused.',
          'Every affected shop gets that day\'s fees refunded.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'An empty phrase that weakens the specific apology.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to Ada\'s line.',
        pairs: [
          ['Responsibility', 'That was our responsibility'],
          ['Repair', 'Fees refunded, shop visits'],
          ['What changes', 'An alert that warns us within minutes'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s responsibility line.',
        tiles: ['That', 'was', 'our', 'responsibility'],
        distractors: ['bank\'s'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many hours were shops unable to take payments?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why say what changes, not just sorry?',
        options: [
          { text: 'To sound busy', why: 'It\'s about prevention.' },
          { text: 'Sorry is enough', why: 'Change rebuilds trust.' },
          { text: 'It shows it\'s less likely to happen again' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Find an apology you sent or received. Which of the six parts did it have?',
    starters: ['It had...', 'It was missing...'],
  },
  deepen: { title: 'Try it today', summary: 'Search your sent emails for "any inconvenience". Rewrite one with the six parts.' },
  notes: 'Lewicki, Polin & Lount (2016), Negotiation and Conflict Management Research: acknowledgment of responsibility and offer of repair were rated the most important apology components.',
};

export default lesson;
