import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Before/After: a generic vs a researched "why us?" */
const lesson: OriginalLesson = {
  key: 'l03',
  title: '"Why us?"',
  summary: 'Remi\'s old answer to "why do you want to work here?" could fit any company in Nairobi. His new one could only fit Mtaa Labs.',
  minutes: 11,
  outcomes: [
    'Write a specific answer to "why us?"',
    'Link the company\'s work to your own interests',
    'Avoid answers about what you\'ll get',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Generic vs researched',
      before: {
        label: 'Generic',
        text: '"You\'re a growing startup with a great culture, and I want to learn and gain experience. It would be a good opportunity for my career."\nTrue of almost any company.\nAll about what Remi gets.',
      },
      after: {
        label: 'Researched',
        text: '"I used your app last night and liked how light it is on a slow phone. I read Wanjiru\'s post on that. I grew up helping in my uncle\'s shop, so building for 3,000 shop owners is exactly the kind of problem I want to work on, especially as you grow into Mombasa."',
      },
      notes: [
        'A strong "why us?" is specific: only true of this company.',
        'It connects their work to something real about you.',
        'It talks about what you want to build or solve, not just what you\'ll get.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A good "why us?" could only be said about this company, and connects their work to something true about you.',
    },
  ],
  apply: {
    scenario: 'Why Mtaa Labs?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Specific to Mtaa Labs, or generic?',
        groups: ['Specific', 'Generic'],
        items: [
          { text: '"Light on a slow phone"', group: 0 },
          { text: '"A great culture"', group: 1 },
          { text: '"Growing into Mombasa"', group: 0 },
          { text: '"A good opportunity for my career"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the main problem with the generic answer?',
        options: [
          { text: 'It\'s too long', why: 'It\'s too generic.' },
          { text: 'It could fit any company and it\'s all about what Remi gets' },
          { text: 'It\'s rude', why: 'Polite, but empty.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the researched answer to its job.',
        pairs: [
          ['"I used your app last night"', 'Shows real interest'],
          ['"My uncle\'s shop"', 'Connects to his own story'],
          ['"3,000 shop owners"', 'Shows he read the ad'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Is it bad to say I want to learn?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Learning is fine, but lead with what you want to build or solve for them. Then add what you\'ll learn.' },
          { text: 'Yes, never mention learning.', why: 'It\'s fine as a second point.' },
          { text: 'Only talk about learning.', why: 'Lead with their work.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The test.',
        template: 'A good "why us?" could only be said about [[1]] company, and connects to something [[2]] about you.',
        blanks: [['this'], ['true', 'real']],
        distractors: ['any', 'invented'],
      },
      {
        kind: 'mcq',
        prompt: 'Why mention the uncle\'s shop?',
        options: [
          { text: 'To make them feel sorry for him', why: 'It shows genuine connection.' },
          { text: 'It\'s a true link between his life and their customers' },
          { text: 'It\'s irrelevant', why: 'It connects him to small shop owners.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this "why us?" is generic?',
        lines: [
          'I used your app and liked how light it is.',
          'I grew up helping in my uncle\'s shop.',
          'And you seem like a really great company.',
          'Building for 3,000 shop owners is the problem I want.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It could be said about anyone.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which city is Mtaa Labs expanding into?',
        answers: ['Mombasa', 'mombasa'],
        placeholder: 'A city',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a strong "why us?"',
        lines: ['Something specific you noticed', 'A true link to you', 'What you want to build or solve for them'],
      },
      {
        kind: 'sortGroups',
        prompt: 'About what they do, or about what you get?',
        groups: ['What they do', 'What I get'],
        items: [
          { text: '"Helping small shops track deliveries"', group: 0 },
          { text: '"Good experience for my CV"', group: 1 },
          { text: '"Building for slow phones"', group: 0 },
          { text: '"A stepping stone"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write a "why us?" answer for a company you like that could only be about them.',
    starters: ['I noticed...', 'That connects to me because...'],
  },
  deepen: {
    title: 'Motivation matters',
    summary: 'Interviewers look for genuine interest because motivated hires tend to stay and learn. A specific "why us?" is the clearest proof of it.',
  },
  notes: 'Fictional answers built on Lesson 2 research.',
};

export default lesson;
