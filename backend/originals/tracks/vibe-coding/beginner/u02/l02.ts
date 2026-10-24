import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Card deck: the brief (goal, context, limits, done when). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The brief',
  summary: 'Ruth sticks a yellow note on Hazel\'s laptop with four words on it: Goal. Context. Limits. Done when. It becomes Hazel\'s brief card, and it fixes most bad prompts.',
  minutes: 12,
  outcomes: [
    'Write a brief with a goal, context, limits and a "done when"',
    'Spot which part a weak brief is missing',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>A <strong>brief</strong> is a prompt for a real job. It has four parts:</p><ul><li><strong>Goal:</strong> what to build, in one sentence.</li><li><strong>Context:</strong> what it needs to know that it can\'t guess (who uses it, real numbers, what already exists).</li><li><strong>Limits:</strong> what not to do or touch.</li><li><strong>Done when:</strong> how you\'ll both know it\'s finished.</li></ul>',
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'Goal: a page called thermometer.html where Ruth types each pledge and sees the total toward our $18,000 goal.\nContext: Ruth is the only user, on her laptop. Pledges are whole dollars. Our colours are gold and black.\nLimits: one file, no frameworks, don\'t change index.html.\nDone when: I can add three pledges and the total and the "still to go" number are right.',
      caption: 'Hazel\'s brief card, v1.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: '"Done when" is the part beginners skip, and the one that matters most. Without it, the AI decides when it\'s done.',
    },
    {
      kind: 'check',
      question: '"Don\'t change index.html" is which part of the brief?',
      options: ['Goal', 'Limits', 'Done when'],
      answer: 1,
      explanation: 'It says what not to touch: a limit.',
    },
  ],
  apply: {
    scenario: 'Hazel\'s brief card.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its part of the brief.',
        pairs: [
          ['A page showing the total toward $18,000', 'Goal'],
          ['Ruth is the only user', 'Context'],
          ['Don\'t change index.html', 'Limits'],
          ['Three pledges add up correctly', 'Done when'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which brief is missing a "done when"?',
        options: [
          { text: 'Goal: pledge total page. Context: Ruth uses it. Limits: one file.' },
          { text: 'Goal: pledge total page. Done when: three pledges add up right.', why: 'This one has it (it\'s missing context and limits).' },
          { text: 'Done when: the total is right. Limits: one file.', why: 'This has a done when (but no goal).' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Context the AI needs, or something it can decide?',
        groups: ['Context to give', 'It can decide'],
        items: [
          { text: 'The goal is $18,000', group: 0 },
          { text: 'Pledges are whole dollars', group: 0 },
          { text: 'What to name the variables', group: 1 },
          { text: 'Our colours are gold and black', group: 0 },
          { text: 'How to structure the HTML', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The four parts.',
        template: 'Goal. [[1]]. Limits. [[2]] when.',
        blanks: [['Context'], ['Done']],
        distractors: ['Vibes', 'Maybe'],
      },
      {
        kind: 'findBug',
        prompt: 'Which "done when" can\'t actually be checked?',
        lines: [
          'Done when: three pledges add up to the right total.',
          'Done when: it feels finished.',
          'Done when: "still to go" shows $18,000 minus the total.',
        ],
        bug: 1,
        fix: 'Name something you can test, like a number on screen.',
        explanation: '"Feels finished" can\'t be checked, so it isn\'t a finish line.',
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Four parts is so long. Can\'t you just say "pledge page"?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Fine, "pledge page".', why: 'Then the AI guesses three of the four parts.' },
          { text: 'Four short lines take one minute. Fixing a wrong guess takes an hour.' },
          { text: 'Briefs should be ten pages.', why: 'Short and clear beats long.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a "done when" Ruth could test.',
        tiles: ['Done when:', 'I add three pledges', 'and the total is right'],
        distractors: ['it looks nice', 'the AI says so'],
      },
      {
        kind: 'mcq',
        prompt: 'Why tell it "Ruth is the only user, on her laptop"?',
        options: [
          { text: 'So it stays simple: no logins or phone layouts needed yet' },
          { text: 'To be polite', why: 'It\'s about what to build, not manners.' },
          { text: 'It doesn\'t matter', why: 'Who uses it changes what it builds.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The part of the brief beginners skip most often. (Two words.)',
        answers: ['done when'],
        placeholder: '.... ....',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which is the best brief?',
        options: [
          { text: 'Make a pledge tracker. Make it good.', why: 'No context, limits or finish line.' },
          { text: 'Pledge tracker for the band, with logins, a shop and a calendar.', why: 'Scope creep is back.' },
          { text: 'Pledge tracker so we can raise money.', why: 'A goal, nothing else.' },
          { text: 'Goal: thermometer.html showing pledges toward $18,000. Context: Ruth only, whole dollars. Limits: one file. Done when: three pledges total correctly.' },
        ],
        answer: 3,
      },
    ],
  },
  reflect: {
    prompt: 'Write a four-line brief for the first piece of your real project: Goal, Context, Limits, Done when.',
    starters: ['Goal:', 'Context:', 'Limits:', 'Done when:'],
  },
  deepen: {
    title: 'Your brief card',
    summary: 'Write your four-line brief on a sticky note or in a file called brief.md in your project folder. You\'ll paste it into Claude Code in lesson 4.',
  },
  notes: 'Brief structure (goal, context, constraints, acceptance criteria) is standard practice for prompting coding agents; no tool facts.',
};

export default lesson;
