import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Card deck: numbers that prove it (traction, honesty, comparisons). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Numbers that prove it',
  summary: 'Ada worries her numbers are too small. "Three groups. 110 members. The other finalists have thousands of users!" Arjun: "Small and real beats big and vague. Let\'s make your numbers work."',
  minutes: 11,
  outcomes: [
    'Choose the one or two numbers that prove your point',
    'Present small numbers honestly and powerfully',
    'Make numbers easy to picture',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Stories make people care. Numbers make them believe. Here's how to choose and say them.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: One or two numbers, not ten</h3><p>A pitch with ten numbers is a spreadsheet. Pick the one or two that best prove your point. For Ada: <strong>110 members</strong> and <strong>zero arguments</strong>.</p><h3>Card 2: Show growth</h3><p>Small numbers growing fast are exciting. \"One group in June. Three groups now. Two more on the waiting list.\" The direction often matters more than the size.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 3: Make it picturable</h3><p>\"₦2 million tracked a month\" is good. \"That's about the price of a small car, every single month, with no arguments\" is easier to feel. Round numbers and familiar comparisons help.</p><h3>Card 4: Never inflate</h3><p>Don't round 110 up to \"hundreds\". Don't call 3 groups \"many organisations\". Judges, recruiters and investors check, and one exaggeration can cost all your trust.</p>",
    },
    {
      kind: 'check',
      question: 'Ada has 3 groups and 110 members. What\'s the best way to say it?',
      options: ['"Three groups, 110 members, and two more groups waiting"', '"Hundreds of organisations use it"', '"Lots of people, basically"'],
      answer: 0,
      explanation: 'Exact, honest and showing growth. Inflating loses trust; vague loses interest.',
    },
    {
      kind: 'text',
      html: "<h3>Card 5: Pair it with the story</h3><p>The best order: story first, then the number that shows it isn't a one-off. \"Tunde swore he'd paid... (story). Now 110 people across three groups trust the app with their money (number).\"</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'One or two numbers. Show growth. Make them picturable. Never inflate. Story first, then the number.',
    },
  ],
  apply: {
    scenario: 'Arjun: "Small and real beats big and vague."',
    items: [
      {
        kind: 'mcq',
        prompt: 'How many numbers should a 60-second pitch usually have?',
        options: [
          { text: 'One or two strong ones' },
          { text: 'At least ten', why: 'That\'s a spreadsheet.' },
          { text: 'None', why: 'Numbers make people believe.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest, or inflated?',
        groups: ['Honest', 'Inflated'],
        items: [
          { text: '"Three groups, 110 members"', group: 0 },
          { text: '"Hundreds of organisations"', group: 1 },
          { text: '"Two more groups on the waiting list"', group: 0 },
          { text: '"Used all over Africa"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Other finalists have 5,000 users. My 110 sounds tiny.',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Say 5,001 to beat them.', why: 'Never inflate.' },
          { text: 'Show the growth and the depth: one group to three in four months, zero arguments, people trusting it with real money.' },
          { text: 'Don\'t mention numbers.', why: 'Your numbers are real and growing. Use them.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The golden rule about numbers: never ___. (one word)',
        answers: ['inflate', 'exaggerate', 'lie'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the story and numbers in the best order.',
        lines: ['Tunde swore he\'d paid in March.', 'So I built an app that records every payment.', 'Now 110 people across three groups trust it.', 'Two more groups are waiting.'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number to a picturable version.',
        pairs: [
          ['₦2 million a month', 'About the price of a small car, every month'],
          ['110 members', 'Three groups, from an office to a church'],
          ['Two seconds', 'The time to see who\'s paid'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s numbers line. Which part breaks the rules?',
        lines: [
          'One group in June.',
          'Three groups now, with 110 members.',
          'Basically millions of people will use it soon.',
        ],
        bug: 2,
        fix: 'Two more groups are on the waiting list.',
        explanation: 'A wild prediction sounds like inflation. Stick to real, growing numbers.',
      },
      {
        kind: 'mcq',
        prompt: 'Why can growth matter more than size?',
        options: [
          { text: 'Judges can\'t count big numbers', why: 'They can.' },
          { text: 'It doesn\'t; only size matters', why: 'Direction often matters more.' },
          { text: 'Fast growth from a small start shows something is working' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Ada\'s growth line.',
        template: 'One group in [[1]]. Three groups [[2]]. Two more on the waiting [[3]].',
        blanks: [['June'], ['now', 'today'], ['list']],
        distractors: ['millions', 'hundreds'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s proof.',
        tiles: ['110', 'members.', 'Zero', 'arguments.'],
        distractors: ['millions'],
      },
    ],
  },
  reflect: {
    prompt: 'What are the one or two numbers that best prove your pitch? (Results, growth, time saved, people helped.) Write them in a way people can picture.',
    starters: ['Number 1: ...', 'Picturable version: ...'],
  },
  deepen: {
    title: 'Check your numbers',
    summary: 'For every number in your pitch, CV or bio, ask: "Could I prove this if someone asked?" If not, change it to one you can.',
  },
  notes: 'Proof via traction, growth framing and honest numbers is standard pitch and investor-communication guidance; links to Chapter 3 L3 (story) and the Make People Listen course (numbers people can feel). Ada\'s figures are fictional and internally consistent (3 groups, 110 members).',
};

export default lesson;
