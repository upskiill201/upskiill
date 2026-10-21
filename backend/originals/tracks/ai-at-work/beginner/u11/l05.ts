import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 5 — Checkpoint 1. Saving, library, templates, custom instructions. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: prompts that last',
  summary: 'Which prompts to save, a findable library, templates with blanks and custom instructions. Show you can stop starting from scratch.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can build a reusable prompt library', 'Show you can make templates and set instructions'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 11, first Checkpoint. The first page of Ada\'s playbook.', replies: ['Ready'] },
        { tey: 'Warm-up: which prompts are worth saving?', replies: ['Frequent and reliable ones'] },
        { tey: 'And the ones you keep rewriting. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: building the playbook.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Worth saving, or not?',
        groups: ['Save', 'Don\'t'],
        items: [
          { text: 'Weekly follow-up prompt', group: 0 },
          { text: 'A one-off holiday question', group: 1 },
          { text: 'Daily pre-send check', group: 0 },
          { text: 'A prompt that failed', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a library entry.',
        lines: ['Name', 'When to use it', 'The prompt', 'What to check', 'Last updated'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Blank or fixed in a template?',
        groups: ['Blank', 'Fixed'],
        items: [
          { text: 'Reader', group: 0 },
          { text: '"Use only the document"', group: 1 },
          { text: 'Document', group: 0 },
          { text: '"With page numbers"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which is the best template?',
        options: [
          { text: 'Summarise this.', why: 'No blanks or rules.' },
          { text: 'Summarise [DOCUMENT] for [READER, ROLE] in [NUMBER] bullets. Use only the document, with page numbers.' },
          { text: 'Summarise the pilot report for Lucía.', why: 'One-off.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line must leave the custom instructions?',
        lines: ['I\'m a product designer in Lagos.', 'Plain British English.', 'Client budget: 40,000 USD.', 'Never invent figures.'],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Confidential details shouldn\'t be stored.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to what it solves.',
        pairs: [
          ['Saved prompt', 'Rewriting from scratch'],
          ['Template', 'Small changes each time'],
          ['Custom instructions', 'Retyping your role and style'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'My team\'s prompts are all over the place. Where should they go?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'One shared library, an entry per prompt: name, when, prompt, checks, date.' },
          { text: 'Leave them in chats.', why: 'Hard to find.' },
          { text: 'Email them around.', why: 'They get lost.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Blanks for what [[1]]. Fixed text for your [[2]] rules.',
        blanks: [['changes'], ['quality']],
        distractors: ['stays', 'secret'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the template start.',
        tiles: ['Summarise', '[DOCUMENT]', 'for', '[READER]'],
        distractors: ['Tobi'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many prompts should Ada start her library with? (a small number)',
        answers: ['6', 'six', '5', 'five', '5-6', '5 or 6'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Custom instructions, or keep out?',
        groups: ['In', 'Out'],
        items: [
          { text: 'Ask questions if unclear', group: 0 },
          { text: 'A password', group: 1 },
          { text: 'Short sentences', group: 0 },
          { text: 'Client names', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which entry name is hard to find?',
        lines: ['Meeting follow-up', 'Friday status update', 'Prompt 12 (new)', 'Pre-send check'],
        bug: 2,
        fix: 'Research brief',
        explanation: 'Name it by the task.',
      },
      {
        kind: 'mcq',
        prompt: 'When is a template ready to share?',
        options: [
          { text: 'After it works on a new case' },
          { text: 'As soon as it\'s written', why: 'Test first.' },
          { text: 'Never', why: 'After testing.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why add a "last updated" date?',
        options: [
          { text: 'So people know which version is current' },
          { text: 'For decoration', why: 'For currency.' },
          { text: 'No reason', why: 'Prompts improve.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of the four would save you the most time this week?',
    starters: ['The one:', 'Because...'],
  },
  notes: 'Checkpoint for Unit 11 lessons 1-4.',
};

export default lesson;
