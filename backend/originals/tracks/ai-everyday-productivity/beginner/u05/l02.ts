import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Walkthrough: untangle any problem. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Untangle any problem',
  summary: 'Seven options on the screen and a ringing phone. Walk through the six steps Lucía uses to get from "no venue" to a signed booking by lunchtime, with AI helping at each step.',
  minutes: 13,
  outcomes: [
    'Use a six-step method to solve everyday problems with AI',
    'Compare options with trade-offs',
    'End every session with a first step and a Plan B',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From panic to a plan',
      steps: [
        { title: '1. One sentence', body: '"Our venue for 60 guests on Day 30 in Oaxaca cancelled, and I need a new one booked by tomorrow." If she can\'t say it in one sentence, the AI can\'t help with it either.' },
        { title: '2. Fixed and flexible', body: 'Fixed: Day 30, about 60 guests, near Oaxaca city, about MX$10,000. Flexible: indoor or outdoor, time, type of place.' },
        { title: '3. Many options', body: '"Give me at least 5 options, including unusual ones." Seven come back. Two break a fixed point (postpone; a hotel 2 hours away). Five survive.' },
        { title: '4. Trade-offs', body: '"Compare the five in a table: cost, capacity, rain plan, travel for older guests, what I still need to check." The hacienda wins on capacity and rain; it loses a little on travel.' },
        { title: '5. Decide, then a first step', body: 'She decides: the hacienda. "What should I do in the next hour?" Call the cousin, ask about date, capacity and price, get it in writing, ask about parking and a covered area.' },
        { title: '6. Plan B', body: '"If the hacienda says no, what\'s my next best option and its first step?" The restaurant\'s private room, for 40, with the rest at a second table outside. She writes the number down. She doesn\'t need it.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'One sentence. Fixed and flexible. Many options. Trade-offs. Decide and take a first step. Plan B.',
    },
  ],
  apply: {
    scenario: 'Untangling the venue problem.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the six steps in order.',
        lines: ['Say it in one sentence', 'Split fixed and flexible', 'Ask for many options', 'Compare trade-offs', 'Decide and take a first step', 'Make a Plan B'],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask for "at least 5 options, including unusual ones"?',
        options: [
          { text: 'More options means the best one is more likely to be on the list' },
          { text: 'AI charges per option', why: 'It doesn\'t.' },
          { text: 'To make the chat longer', why: 'It\'s about not missing the hacienda.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does the option survive the fixed points?',
        groups: ['Survives', 'Crossed out'],
        items: [
          { text: 'The cousin\'s hacienda', group: 0 },
          { text: 'Postpone to next month', group: 1 },
          { text: 'A hotel two hours away', group: 1 },
          { text: 'A restaurant\'s private room', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'Why bother with a Plan B if you\'ve already decided?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'I don\'t need one.', why: 'The cousin hadn\'t said yes yet.' },
          { text: 'Because the cousin hadn\'t said yes yet. A Plan B takes two minutes and stops the panic coming back.' },
          { text: 'The AI insisted.', why: 'She asked for it, for a good reason.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Step 5.',
        template: 'Decide, then ask: "What should I do in the next [[1]]?" End with a [[2]] B.',
        blanks: [['hour'], ['Plan', 'plan']],
        distractors: ['year', 'Budget'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to Lucía\'s answer.',
        pairs: [
          ['One sentence', 'Venue for 60 on Day 30 cancelled'],
          ['Fixed', 'Day 30, about 60 guests'],
          ['First step', 'Call the cousin'],
          ['Plan B', 'The restaurant\'s private room'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step did Tomás skip in his version?',
        lines: [
          'Asked for one option and took it.',
          'Checked the option against the fixed points.',
          'Wrote down a first step.',
        ],
        bug: 0,
        fix: 'Ask for at least five options first.',
        explanation: 'With one option, there\'s nothing to compare and no Plan B.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which option did Lucía choose? (One word.)',
        answers: ['hacienda', 'the hacienda', 'Hacienda'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt is step 4?',
        options: [
          { text: 'Compare these 5 options in a table: cost, capacity, rain plan, travel for older guests, and what I still need to check.' },
          { text: 'Pick one.', why: 'That skips the trade-offs.' },
          { text: 'Which is cheapest?', why: 'Cost is one column, not the whole decision.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What does this method work for, besides venues?',
        options: [
          { text: 'Only parties', why: 'Any messy problem.' },
          { text: 'Only work problems', why: 'Any messy problem.' },
          { text: 'Almost any messy problem: a broken laptop before a deadline, a cancelled flight, a clash in the family calendar' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Run your problem from the last lesson through steps 1 to 6. What\'s your first step in the next hour?',
    starters: ['My first step:...', 'My Plan B:...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Use the six steps with an AI tool on one real problem. Don\'t stop at the options: finish with "What should I do in the next hour?" and "What\'s my Plan B?"',
  },
  notes: 'Six-step method synthesised from common problem-solving frameworks (define, constraints, generate options, evaluate, decide/act, contingency).',
};

export default lesson;
