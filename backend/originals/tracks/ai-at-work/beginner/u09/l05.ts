import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 5 — Checkpoint 1. Preparation, agendas, follow-ups, notes into actions. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: before, during, after',
  summary: 'Preparation, agendas, follow-ups and actions. Show you can run a meeting that ends with a plan.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can prepare and structure a meeting', 'Show you can turn a meeting into owned actions'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 9, first Checkpoint. The outage call, start to finish.', replies: ['Ready'] },
        { tey: 'Warm-up: three things before any meeting?', replies: ['Goal, facts, questions'] },
        { tey: 'Exactly. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the outage call.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the preparation.',
        lines: ['Goal', 'Facts', 'Likely questions', 'Answers to the hardest'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good agenda item, or vague?',
        groups: ['Good', 'Vague'],
        items: [
          { text: 'Offer for shops: decide (all, 10 min)', group: 0 },
          { text: 'Next steps', group: 1 },
          { text: 'What happened (Ada, 5 min)', group: 0 },
          { text: 'AOB', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prep request is best?',
        options: [
          { text: 'Help with my meeting.', why: 'No goal or facts.' },
          { text: 'Here are the notes. Goal: keep the client\'s trust. Summarise the facts in five lines and list her 8 likely questions, hardest first.' },
          { text: 'Write my defence.', why: 'Wrong goal.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which follow-up line wasn\'t agreed?',
        lines: ['Refund fees for Monday', 'Visits by Friday (Tolu)', 'Free service for a year', 'Update Thursday 4pm'],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Only send what was agreed.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the follow-up.',
        lines: ['Thanks and summary', 'Decisions', 'Actions', 'Open questions', 'Next contact'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the note to what it is.',
        pairs: [
          ['"agreed"', 'Decision'],
          ['"T to do"', 'Action for Tolu'],
          ['"C to think"', 'Open question'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Your agenda has no "AOB". Is that on purpose?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'I forgot it.', why: 'It was deliberate.' },
          { text: 'Yes: with 30 minutes, every item has a purpose. Anything new goes in the follow-up.' },
          { text: 'AOB is required.', why: 'It isn\'t.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Goal on [[1]]. Send the follow-up within the [[2]].',
        blanks: [['top'], ['hour']],
        distractors: ['bottom', 'week'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build an owned action.',
        tiles: ['Tolu:', 'visits', 'by', 'Friday'],
        distractors: ['someone'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear action, or vague?',
        groups: ['Clear', 'Vague'],
        items: [
          { text: 'Ada: bank alert by Wednesday', group: 0 },
          { text: 'We\'ll look into it', group: 1 },
          { text: 'Tolu: call 6 shops by Thursday', group: 0 },
          { text: 'Someone will follow up', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Agenda items of 5, 10, 10, 5 minutes. Total?',
        answers: ['30'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which item did AI misread from the notes?',
        lines: ['Decision: refund fees', 'Action: Tolu visits (no date)', 'Decision: send all shops a text', 'Open: bank alert options'],
        bug: 2,
        fix: 'Open question: text to shops (Carmen to decide).',
        explanation: 'It was a "maybe".',
      },
      {
        kind: 'mcq',
        prompt: 'Why give an upset client\'s concerns time early?',
        options: [
          { text: 'To fill the agenda', why: 'It helps the call work.' },
          { text: 'It\'s a legal rule', why: 'It\'s good practice.' },
          { text: 'People need to feel heard before discussing solutions' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What must Ada check before sending an AI-drafted follow-up?',
        options: [
          { text: 'Every promise was really agreed' },
          { text: 'The greeting', why: 'The promises.' },
          { text: 'Nothing', why: 'Drafts can add things.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which part of meetings do you most often skip: preparing, the agenda, or the follow-up?',
    starters: ['I skip...', 'Next meeting I\'ll...'],
  },
  notes: 'Checkpoint for Unit 9 lessons 1-4.',
};

export default lesson;
