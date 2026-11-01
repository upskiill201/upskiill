import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 2 — your prompt library. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Your prompt library',
  summary: 'A prompt library is only useful if you can find things in it. Tap one of Ada\'s entries to see how she organises it.',
  minutes: 12,
  outcomes: [
    'Organise saved prompts so you can find them',
    'Add notes that make prompts usable by others',
    'Keep the library in one place',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'One entry in Ada\'s prompt library',
      text: 'Name: Meeting follow-up. When: after any meeting with decisions. Prompt: "From these notes, draft a follow-up: thanks, decisions, actions with owners and dates, open questions, next contact. Only include what we agreed." Check: every promise was agreed. Last updated: Month 9.',
      hotspots: [
        { phrase: 'Name: Meeting follow-up', note: 'A plain name you\'d search for. Not "Prompt 7".' },
        { phrase: 'When: after any meeting with decisions', note: 'Tells anyone when to use it.' },
        { phrase: 'Only include what we agreed', note: 'The line that stops the AI inventing promises. Keep the lines that learned from mistakes.' },
        { phrase: 'Check: every promise was agreed', note: 'What to check after. Prompts plus checks make it safe to share.' },
        { phrase: 'Last updated', note: 'Prompts improve. A date shows which version is current.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Each entry: name, when to use it, the prompt, what to check, last updated. Keep the library in one shared, easy-to-find place.',
    },
  ],
  apply: {
    scenario: 'Ada builds her prompt library.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the parts of a library entry.',
        lines: ['Name', 'When to use it', 'The prompt', 'What to check', 'Last updated'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good entry name, or hard to find?',
        groups: ['Good name', 'Hard to find'],
        items: [
          { text: 'Meeting follow-up', group: 0 },
          { text: 'Prompt 7', group: 1 },
          { text: 'Friday status update', group: 0 },
          { text: 'Untitled (2)', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why add "what to check" to each entry?',
        options: [
          { text: 'To make it longer', why: 'It\'s about safe use.' },
          { text: 'So anyone using it knows how to make the result safe' },
          { text: 'It\'s optional decoration', why: 'It matters most when sharing.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which saved prompt is most reusable?',
        options: [
          { text: 'Write the follow-up for Tuesday\'s call with Carmen.', why: 'Tied to one meeting.' },
          { text: 'From these notes, draft a follow-up: thanks, decisions, actions with owners and dates, open questions, next contact. Only include what we agreed.' },
          { text: 'Follow-up please.', why: 'Too vague.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Where should my team keep shared prompts?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Everyone in their own chats.', why: 'Hard to share and find.' },
          { text: 'On sticky notes.', why: 'Easy to lose.' },
          { text: 'One shared document or folder everyone can find, with an entry per prompt: name, when, prompt, checks, date.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Name, when to [[1]] it, the prompt, what to [[2]], last updated.',
        blanks: [['use'], ['check']],
        distractors: ['hide', 'delete'],
      },
      {
        kind: 'findBug',
        prompt: 'Which entry is missing something important?',
        lines: [
          'Status update: when Friday; prompt; check figures; updated Month 9',
          'Pre-send check: when before sending; prompt; check names; updated Month 8',
          'Research brief: prompt only',
          'Week plan: when Monday; prompt; check hours; updated Month 9',
        ],
        bug: 2,
        fix: 'Add when to use it, what to check, and the date.',
        explanation: 'Without notes, others can\'t use it well.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the entry part to its job.',
        pairs: [
          ['Name', 'Find it'],
          ['When', 'Know if it fits'],
          ['Check', 'Use it safely'],
          ['Last updated', 'Know it\'s current'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that stops invented promises.',
        tiles: ['Only', 'include', 'what', 'we', 'agreed'],
        distractors: ['everything'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many parts does each library entry have?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good library habit, or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'One shared place', group: 0 },
          { text: 'Prompts in ten different apps', group: 1 },
          { text: 'Dates on each entry', group: 0 },
          { text: 'Old versions with no dates', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why keep the lines that came from past mistakes?',
        options: [
          { text: 'They stop the same mistake happening again' },
          { text: 'For history', why: 'For prevention.' },
          { text: 'They don\'t matter', why: 'They\'re the most valuable.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write one library entry for a prompt you use often: name, when, prompt, check, date.',
    starters: ['Name:', 'Check:'],
  },
  deepen: { title: 'Try it today', summary: 'Create one shared document called "Prompt library" and add your first entry.' },
  notes: 'Content fictional.',
};

export default lesson;
