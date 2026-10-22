import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9. Story beat: Mrs Ewane checks in. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: Mrs Ewane checks in',
  summary: 'Mrs Ewane asks every student with a placement to come in for ten minutes. "So, Mr Clinton. Are you useful, or just present?" Then the quiz. Briefs, questions, updates, and busy versus useful.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Read a brief and agree what "done" means', 'Ask good questions and give clear updates', 'Show what changed, not how busy you were'],
  learn: [
    {
      kind: 'story',
      title: 'Ten minutes',
      beats: [
        { speaker: 'narrator', text: 'The careers office. Mrs Ewane has a list of every student with a placement, and a pen.' },
        { speaker: 'ewane', text: 'So, Mr Clinton. Are you useful, or just present?' },
        { speaker: 'clinton', text: 'One driver confirmed 23 deliveries with no data last Saturday.' },
        { speaker: 'ewane', text: 'Useful, then. Let us make sure you know why.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: Mrs Ewane\'s quiz.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the parts of a brief in order.',
        lines: ['The goal', 'Who it\'s for', 'Why it matters', 'The limits', 'What "done" means'],
      },
      {
        kind: 'mcq',
        prompt: 'Clinton is stuck. When should he ask for help?',
        options: [
          { text: 'Never', why: 'Silence costs more than a question.' },
          { text: 'After trying for a set time, with what he tried' },
          { text: 'Every five minutes', why: 'Try first, then ask; batch small ones.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Result or activity?',
        groups: ['Result', 'Activity'],
        items: [
          { text: 'Updates now arrive by 2pm', group: 0 },
          { text: 'I was busy all week', group: 1 },
          { text: 'Three drivers use it', group: 0 },
          { text: 'I opened lots of tabs', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to Mrs Ewane.',
        from: 'ewane',
        message: 'Give me your Friday update in four parts.',
        options: [
          { text: 'Everything I did, in order.', why: 'That\'s Samuel\'s ten-minute version.' },
          { text: 'Just "fine".', why: 'Too little. Four short parts.' },
          { text: 'Done, next, stuck or at risk, and one question.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak question.',
        lines: ['I tried localStorage; it clears on restart.', 'Nothing works, help.', 'Is IndexedDB the right direction?'],
        bug: 1,
        explanation: 'Say what you tried, what happened and your guess.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to its rule.',
        pairs: [
          ['Small questions', 'Batch them for the check-in'],
          ['A risk', 'Say it early'],
          ['"What changed?"', 'Answer with a number'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What does "done" mean for Clinton\'s project?',
        options: [
          { text: 'Three drivers using it for a full week' },
          { text: 'Code finished', why: 'Done means real use.' },
          { text: 'Mr Tamba smiles', why: 'Three drivers, one week.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Mrs Ewane\'s board.',
        template: 'Read the [[1]]. Try, then [[2]]. Show what [[3]].',
        blanks: [['brief'], ['ask'], ['changed']],
        distractors: ['news', 'hide', 'cost'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many seconds does Clinton\'s update take? (a number)',
        answers: ['90', 'ninety'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Ask now or save for Friday?',
        groups: ['Ask now', 'Save for Friday'],
        items: [
          { text: 'Completely blocked', group: 0 },
          { text: 'Button colour', group: 1 },
          { text: 'Might have deleted real data', group: 0 },
          { text: 'A naming question', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Nadia redesigned the logo instead of her project. What\'s the lesson?',
        options: [
          { text: 'Never do anything extra', why: 'Extra is fine later.' },
          { text: 'Logos matter most', why: 'The main problem matters most.' },
          { text: 'Do the main job well first; extra work comes after' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Are you useful or just present in your current role, course or project? What\'s your evidence?',
    starters: ['I think I\'m...', 'My evidence:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write this week\'s "What changed?" answer in one sentence with a number. Keep a running list; you\'ll need it in lesson 14.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09.',
};

export default lesson;
