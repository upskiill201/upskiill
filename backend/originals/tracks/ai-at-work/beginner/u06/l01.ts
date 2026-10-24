import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 1 — from mess to plan. Story: Tolu's notes. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'From mess to plan',
  summary: 'Tolu, Ada\'s new colleague, has to plan the Accra pilot. His notes are three pages of everything at once. AI can turn a mess into a first plan in minutes.',
  minutes: 12,
  outcomes: [
    'Turn messy notes into a first plan with AI',
    'Ask for a plan structure that fits the work',
    'Check a plan for what\'s missing',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tolu\'s three pages',
      beats: [
        { speaker: 'narrator', text: 'Month 4. Tolu started on Monday. By Wednesday he has three pages of notes for the Accra pilot and no idea where to start.' },
        { speaker: 'ada', text: 'Paste the notes in. Ask for a plan, but tell it the shape you want: phases, tasks, owners, dates.' },
        { speaker: 'narrator', text: 'Two minutes later: four phases (Prepare, Recruit shops, Run, Review), 22 tasks, and a list of questions the notes didn\'t answer.' },
        { speaker: 'tey', text: 'The plan isn\'t right yet. But Tolu now has something to react to, instead of a blank page.' },
        { speaker: 'ada', text: 'And the questions list is gold. "Who signs off on the budget?" Nobody knew.' },
      ],
      choice: {
        prompt: 'What should Tolu do with the AI\'s first plan?',
        options: [
          { text: 'Treat it as a draft: fix the tasks, add real owners and dates, and answer the open questions', outcome: 'Yes. A draft to react to, not a finished plan.', best: true },
          { text: 'Send it to Tobi as the final plan', outcome: 'Owners and dates are guesses until people agree them.' },
          { text: 'Start again from a blank page', outcome: 'He\'d lose the structure and the useful questions.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Paste the mess, ask for the shape you need (phases, tasks, owners, dates), and ask "What questions don\'t these notes answer?"',
    },
  ],
  apply: {
    scenario: 'Tolu is turning his notes into a plan.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the biggest value of the AI\'s first plan?',
        options: [
          { text: 'It\'s the final plan', why: 'It\'s a draft.' },
          { text: 'Something to react to, plus the questions nobody had answered' },
          { text: 'It saves Tolu from talking to anyone', why: 'He still needs owners to agree.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the pilot\'s four phases.',
        lines: ['Prepare', 'Recruit shops', 'Run', 'Review'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gives Tolu the most useful first plan?',
        options: [
          { text: 'Make a plan.', why: 'No shape, no context.' },
          { text: 'From these notes, make a plan for a 3-month pilot: phases, tasks, a suggested owner role and rough dates for each. Then list questions the notes don\'t answer.' },
          { text: 'Make it perfect.', why: 'Not something AI can know.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Decide with people, or fine from the AI draft?',
        groups: ['Agree with people', 'Fine from the draft'],
        items: [
          { text: 'Who owns each task', group: 0 },
          { text: 'A sensible order of phases', group: 1 },
          { text: 'The launch date', group: 0 },
          { text: 'A list of open questions', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Tolu sent me a plan already! Is it final?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes, the AI made it.', why: 'Owners and dates need agreeing.' },
          { text: 'Ignore it.', why: 'Explain that it\'s a draft.' },
          { text: 'It\'s a first draft. We\'re confirming owners and dates with the team this week; you\'ll get the agreed version Friday.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the request.',
        template: 'Make a plan with [[1]], tasks, owners and dates. Then list [[2]] the notes don\'t answer.',
        blanks: [['phases'], ['questions']],
        distractors: ['jokes', 'emojis'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the follow-up question.',
        tiles: ['What', 'questions', 'don\'t', 'these', 'notes', 'answer?'],
        distractors: ['perfect'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the AI plan needs a person to confirm it?',
        lines: [
          'Phase 1: Prepare (weeks 1-3)',
          'Task: write the shop sign-up form',
          'Owner: Kwame from the partner bank',
          'Open question: who signs off the budget?',
        ],
        bug: 2,
        fix: 'Owner: (to confirm with the partner bank)',
        explanation: 'The AI invented a named owner. People agree owners.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many tasks were in the AI\'s first plan?',
        answers: ['22', 'twenty-two'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the plan part to who decides it.',
        pairs: [
          ['Phases and task list', 'AI drafts, Tolu edits'],
          ['Owners', 'Agreed with each person'],
          ['Budget sign-off', 'Tobi'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful to paste into the AI, or not needed?',
        groups: ['Paste it', 'Not needed'],
        items: [
          { text: 'The pilot brief', group: 0 },
          { text: 'Tolu\'s meeting notes', group: 0 },
          { text: 'Tolu\'s lunch order', group: 1 },
          { text: 'Ada\'s holiday photos', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask for "a suggested owner role" rather than names?',
        options: [
          { text: 'The AI doesn\'t know your team; roles avoid invented names' },
          { text: 'Names are rude', why: 'The AI just doesn\'t know them.' },
          { text: 'No reason', why: 'It avoids made-up owners.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What messy pile of notes are you sitting on? What shape of plan would help?',
    starters: ['The mess:', 'The shape I need:'],
  },
  deepen: { title: 'Try it today', summary: 'Paste your messiest notes into AI and ask for phases, tasks and open questions. Keep the questions.' },
  notes: 'Tolu is Ada\'s new colleague (narrated). Kwame is a fictional name the AI invented in the scenario.',
};

export default lesson;
