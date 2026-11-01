import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Step-by-step: the early draft check (show me the rough version). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'See it early',
  summary: 'Kavya hates showing unfinished work. She disappears for three days and returns with something polished, sometimes in the wrong direction. Arjun wants to see her shipping page when it\'s rough. Tey gives him a way to ask that doesn\'t feel like checking up.',
  minutes: 12,
  outcomes: [
    'Know why early checks save the most time',
    'Ask for rough work without making it feel like inspection',
    'Give feedback on a draft that helps it go further',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The early draft check in five steps',
      steps: [
        { title: '1. Agree it up front', body: 'In the brief: "Show me a rough version at about 30%." Agreed before work starts, it\'s part of the plan, not a surprise inspection.' },
        { title: '2. Say what "rough" means', body: '"Boxes and words are fine. No colours, no polish." People need permission to show something ugly, or they\'ll polish it first.' },
        { title: '3. Ask only big-picture questions', body: 'At 30%, check direction, not details: "Is this the right page? The right steps? Anything missing?" Comments on font size come later.' },
        { title: '4. Say what to keep', body: 'Start with what\'s working, specifically: "The delivery estimate at the top is great." It tells Kavya which direction to keep going in.' },
        { title: '5. One or two changes, max', body: '"Show the shipping cost before the address, not after." Two clear changes at 30% beat twenty at 100%.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Kavya\'s shipping page, two ways',
      before: { label: 'Check at 100%', text: 'Day 15: a polished page. Shipping cost appears only after the customer types their whole address. Mr Rao\'s customers give up there. Two days of polish redone.' },
      after: { label: 'Check at 30%', text: 'Day 13, 4 p.m.: a sketch in boxes. Arjun: "Love the delivery estimate. One change: show the cost before the address." Ten minutes to fix. Polished on Day 15, in the right direction.' },
      notes: ['The same change, found two days earlier.', 'Rough work is cheap to change. Polished work isn\'t.', 'It was agreed up front, so it never felt like checking up.'],
    },
  ],
  apply: {
    scenario: 'The shipping page.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['Agree it up front', 'Say what rough means', 'Ask big-picture questions only', 'Say what to keep', 'One or two changes, max'],
      },
      {
        kind: 'mcq',
        prompt: 'Why check at 30% instead of 100%?',
        options: [
          { text: 'To check up on Kavya', why: 'It\'s agreed in the plan, not an inspection.' },
          { text: 'Arjun is impatient', why: 'It saves Kavya two days.' },
          { text: 'Rough work is cheap to change; polished work isn\'t' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Right question at 30%, or too early?',
        groups: ['Right at 30%', 'Too early'],
        items: [
          { text: '"Are these the right steps?"', group: 0 },
          { text: '"Can the font be 2 pixels bigger?"', group: 1 },
          { text: '"Is anything missing?"', group: 0 },
          { text: '"Change this shade of orange."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'It\'s really ugly right now. Can I show you on Friday instead?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Sure, Friday.', why: 'Then a wrong turn costs two days.' },
          { text: 'Ugly is perfect. I only want to check direction today: boxes and words. Polish is Friday.' },
          { text: 'No, show me now, I need to check.', why: 'True, but it sounds like distrust.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ask to see a rough version at about ___ percent. (a number)',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why start feedback with what to keep?',
        options: [
          { text: 'It tells her which direction to keep going in' },
          { text: 'To soften the criticism', why: 'It\'s directional, not padding.' },
          { text: 'It doesn\'t matter', why: 'At 30%, direction is everything.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s 30% feedback. Which line breaks step 5?',
        lines: [
          'Love the delivery estimate at the top.',
          'Show the cost before the address.',
          'Also: 18 small things on fonts, spacing and colours.',
        ],
        bug: 2,
        fix: 'We\'ll do details on Friday\'s version.',
        explanation: 'Eighteen details at 30% bury the one change that matters.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the line.',
        pairs: [
          ['Agree up front', '"Rough version at 30%."'],
          ['Say what rough means', '"Boxes and words are fine."'],
          ['Say what to keep', '"Love the delivery estimate."'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'At 30%, check [[1]], not [[2]].',
        blanks: [['direction'], ['details', 'polish']],
        distractors: ['people', 'speed'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s permission.',
        tiles: ['Ugly', 'is', 'perfect', 'today.'],
        distractors: ['banned'],
      },
    ],
  },
  reflect: {
    prompt: 'Do you show work early, or wait until it\'s polished? What has waiting cost you? What would make showing early feel safe?',
    starters: ['I usually...', 'It would feel safe if...'],
  },
  deepen: {
    title: 'The 30% check',
    summary: 'In your next brief, add one line: "Show me a rough version at about 30%, boxes and words are fine." Then only comment on direction.',
  },
  notes: 'Early, low-fidelity reviews: standard design and engineering practice (e.g. design critiques of sketches; incremental delivery). Cost of change rising over a project: commonly cited in software engineering (Boehm 1981), hedged. Fictional details.',
};

export default lesson;
