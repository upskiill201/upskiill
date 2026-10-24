import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 17 — when a habit stops working. Story: the update. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'When a habit stops working',
  summary: 'After a tool update, Ada\'s trusted summary template starts giving long, rambling answers. Habits need maintenance too.',
  minutes: 12,
  outcomes: [
    'Notice when a prompt or habit stops working',
    'Fix a prompt after a tool changes',
    'Retire habits that no longer help',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The update',
      beats: [
        { speaker: 'narrator', text: 'Monday. The AI tool updated over the weekend. Ada\'s summary template now returns 600-word answers instead of 5 bullets.' },
        { speaker: 'ada', text: 'Same prompt, different result. Did I break something?' },
        { speaker: 'tey', text: 'No. Tools change. A prompt that relied on the old behaviour may need to be more explicit now.' },
        { speaker: 'narrator', text: 'Ada adds: "Exactly 5 bullets, under 15 words each. No introduction." The answers snap back. She updates the library entry and its date.' },
        { speaker: 'ada', text: 'And I\'m retiring the old "inbox sort" prompt. I haven\'t used it since we got the new email filters.' },
      ],
      choice: {
        prompt: 'What should Ada do when a saved prompt stops working?',
        options: [
          { text: 'Make the instructions more explicit, test it, and update the library with a date', outcome: 'Yes. Fix, test, update the shared version.', best: true },
          { text: 'Stop using AI for summaries', outcome: 'One clearer line fixed it.' },
          { text: 'Keep using it and ignore the long answers', outcome: 'That wastes everyone\'s time.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Tools change. If a prompt drifts, make it more explicit, test it, update the library. Retire prompts nobody uses.',
    },
  ],
  apply: {
    scenario: 'Ada maintains her playbook.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Ada\'s template suddenly give long answers?',
        options: [
          { text: 'Ada typed it wrong', why: 'Same prompt; the tool changed.' },
          { text: 'The tool was updated and behaves differently' },
          { text: 'The report was longer', why: 'The tool changed.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line Ada added.',
        tiles: ['Exactly', '5', 'bullets,', 'no', 'introduction'],
        distractors: ['about'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the fix.',
        lines: ['Notice the change', 'Make instructions more explicit', 'Test it', 'Update the library with a date'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Fix it, or retire it?',
        groups: ['Fix', 'Retire'],
        items: [
          { text: 'Summary template now too long', group: 0 },
          { text: 'Inbox prompt unused since new filters', group: 1 },
          { text: 'Follow-up prompt missing a new rule', group: 0 },
          { text: 'A prompt for a tool you no longer use', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Your summary template stopped working for my team this week!',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'It works for me.', why: 'Fix the shared version.' },
          { text: 'Stop using it.', why: 'It\'s fixable.' },
          { text: 'The tool updated. I\'ve added "exactly 5 bullets, no introduction" and updated the shared version today. Try that one.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'If a prompt drifts, make it more [[1]]. Retire prompts nobody [[2]].',
        blanks: [['explicit'], ['uses']],
        distractors: ['vague', 'likes'],
      },
      {
        kind: 'findBug',
        prompt: 'Which library habit causes problems later?',
        lines: [
          'Date every change',
          'Test after tool updates',
          'Keep every old prompt forever, even unused ones',
          'Note why key lines exist',
        ],
        bug: 2,
        fix: 'Retire unused prompts.',
        explanation: 'Clutter makes the useful ones hard to find.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the sign to the action.',
        pairs: [
          ['Answers suddenly longer', 'Add explicit length rules'],
          ['Nobody uses it', 'Retire it'],
          ['A rule keeps being missed', 'Add it to the prompt'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many words were the long answers after the update?',
        answers: ['600'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt is most robust to tool changes?',
        options: [
          { text: 'Summarise this.', why: 'Relies on default behaviour.' },
          { text: 'Summarise this in exactly 5 bullets, under 15 words each, no introduction, with page numbers.' },
          { text: 'Summarise this like before.', why: 'The tool doesn\'t know "before".' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good maintenance habit, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Test key prompts after updates', group: 0 },
          { text: 'Ignore odd results', group: 1 },
          { text: 'Update the date when you change it', group: 0 },
          { text: 'Fix only your own copy', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do explicit instructions survive updates better?',
        options: [
          { text: 'They don\'t depend on the tool\'s default habits' },
          { text: 'They\'re longer', why: 'They\'re clearer.' },
          { text: 'They don\'t', why: 'They usually do.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of your AI habits might have stopped helping? Fix it or retire it?',
    starters: ['The habit:', 'Fix or retire:'],
  },
  deepen: { title: 'Try it today', summary: 'Retest your two most-used prompts. Add explicit length and format rules if needed.' },
  notes: 'AI tools update frequently; behaviour can change between versions.',
};

export default lesson;
