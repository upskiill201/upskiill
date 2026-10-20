import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 19 — the learner's offer checklist (kit piece 5). Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your offer checklist',
  summary: 'Your turn. The last piece of your job-search kit: a one-page checklist you can pull out the moment any offer arrives.',
  minutes: 12,
  outcomes: ['Write a one-page offer checklist', 'Prepare your numbers before an offer arrives', 'Be ready to accept or decline well'],
  learn: [
    {
      kind: 'steps',
      title: 'Kit piece 5: your offer checklist',
      steps: [
        { title: '1. On the call', body: 'Thank them, show enthusiasm, ask for it in writing, agree when you\'ll reply. Don\'t decide on the phone.' },
        { title: '2. Read every line', body: 'Pay (gross or net?), benefits, contract, probation, notice, the work, growth, dates. Note what to clarify; check local rules.' },
        { title: '3. Your numbers', body: 'A researched range, a target with a reason, a walk-away point based on your real alternatives. Never invented ones.' },
        { title: '4. Your ask', body: 'Enthusiasm, reason, one clear ask, silence, listen. One or two non-salary asks ready if pay is fixed.' },
        { title: '5. Decide and close', body: 'Top three priorities, scores, gut check, one or two people. Accept in writing with the terms. Decline by call, with thanks.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Call, read, numbers, ask, decide. One page, ready before the offer arrives.',
    },
  ],
  apply: {
    scenario: 'You write your offer checklist.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the checklist in order.',
        lines: ['On the call', 'Read every line', 'Your numbers', 'Your ask', 'Decide and close'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the checklist?',
        groups: ['Your numbers', 'Decide and close'],
        items: [
          { text: 'Walk-away point', group: 0 },
          { text: 'Gut check', group: 1 },
          { text: 'Researched range', group: 0 },
          { text: 'Accept in writing', group: 1 },
          { text: 'Target with a reason', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why prepare your numbers before an offer arrives?',
        options: [
          { text: 'So you\'re calm and grounded when it does' },
          { text: 'To demand more', why: 'To be calm and grounded.' },
          { text: 'No reason', why: 'It stops you deciding in a rush.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'A learner says they\'re nowhere near an offer yet. Should they still do this?',
        options: [
          { text: 'Yes: the research and priorities help you choose which jobs to apply for, too.' },
          { text: 'No, wait.', why: 'Preparing early helps everything.' },
          { text: 'Only after three offers.', why: 'Prepare now.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the step that\'s wrong.',
        lines: ['Ask for the offer in writing.', 'Accept immediately on the phone.', 'Confirm the agreed terms in the acceptance.'],
        bug: 1,
        explanation: 'Don\'t decide on the phone.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the action.',
        pairs: [
          ['The offer call', 'Ask for it in writing'],
          ['After you ask', 'Stay silent and listen'],
          ['Saying no', 'Call, with thanks'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which walk-away point is grounded?',
        options: [
          { text: 'Below my real alternative\'s whole offer' },
          { text: 'Below whatever my uncle says', why: 'Base it on real alternatives.' },
          { text: 'Below an invented offer', why: 'Never invented.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the checklist.',
        template: 'Call, [[1]], numbers, ask, [[2]].',
        blanks: [['read'], ['decide']],
        distractors: ['panic', 'wait', 'lie'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many parts does the checklist have? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'On the checklist, or not?',
        groups: ['On it', 'Not on it'],
        items: [
          { text: 'Check local rules', group: 0 },
          { text: 'Invent a competing offer', group: 1 },
          { text: 'One or two non-salary asks', group: 0 },
          { text: 'Ultimatums', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own range, target and walk-away point for a role you want, even if they\'re rough.',
    starters: ['Range:', 'Walk-away:'],
  },
  deepen: {
    title: 'Your kit, piece 5',
    summary: 'Finish your one-page offer checklist. Keep it with your story bank and resilience plan.',
  },
  notes: 'Kit piece 5, the final piece of How to Get Hired.',
};

export default lesson;
