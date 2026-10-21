import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 9 — sharing prompts with your team. Story: the shared library. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Sharing prompts with your team',
  summary: 'Ada shares her library with the team. Two weeks later, Tolu has improved one prompt and Arjun has broken another. Sharing needs a little structure.',
  minutes: 12,
  outcomes: [
    'Share a prompt library with a team',
    'Let people improve prompts without chaos',
    'Keep shared prompts safe',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Two weeks later',
      beats: [
        { speaker: 'narrator', text: 'Ada shares her six prompts. Tolu adds "flag anything unclear" to the summary prompt. Results improve for everyone.' },
        { speaker: 'arjun', text: 'I edited the follow-up prompt to be shorter. I removed "only include what we agreed". Cleaner!' },
        { speaker: 'narrator', text: 'Next day, a follow-up goes to Lucía promising a free month nobody agreed.' },
        { speaker: 'ada', text: 'That line was there for a reason. Let\'s add a "why" note next to important lines, and one owner who approves changes.' },
        { speaker: 'tey', text: 'Shared prompts need what shared documents need: an owner, a note on why each rule exists, and a date when changed.' },
      ],
      choice: {
        prompt: 'What should the team change?',
        options: [
          { text: 'One owner approves edits, important lines get a "why", and every change gets a date', outcome: 'Yes. Improvements welcome; accidental breakage caught.', best: true },
          { text: 'Lock the library so nobody can improve it', outcome: 'Then Tolu\'s good change would never have happened.' },
          { text: 'Let everyone edit freely, no notes', outcome: 'That\'s how the follow-up broke.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Shared library: one owner, a "why" next to key rules, dated changes. Anyone can suggest; the owner approves.',
    },
  ],
  apply: {
    scenario: 'Ada sets up the team library.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What went wrong when Arjun shortened the follow-up prompt?',
        options: [
          { text: 'He removed the line that stopped invented promises' },
          { text: 'He made it too long', why: 'He removed a key line.' },
          { text: 'Nothing', why: 'A false promise went out.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good library rule, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'One owner approves changes', group: 0 },
          { text: 'Anyone edits anything, no notes', group: 1 },
          { text: 'A "why" next to key lines', group: 0 },
          { text: 'Locking it forever', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the note Ada adds next to the key line.',
        tiles: ['Why:', 'stops', 'invented', 'promises'],
        distractors: ['optional'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Sorry about the follow-up. I didn\'t know that line mattered.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'My fault for not explaining it. I\'ve added a "why" note. Your shorter version is good otherwise; want to suggest it again?' },
          { text: 'Never touch the library again.', why: 'Improvements are welcome.' },
          { text: 'It doesn\'t matter.', why: 'It caused a false promise.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'One [[1]], a "why" next to key rules, [[2]] changes.',
        blanks: [['owner'], ['dated']],
        distractors: ['lock', 'secret'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the library feature to what it prevents.',
        pairs: [
          ['Owner approves', 'Accidental breakage'],
          ['"Why" notes', 'Removing important lines'],
          ['Dates', 'Confusion over versions'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which shared prompt is unsafe?',
        lines: [
          'Summary: [DOCUMENT] for [READER], page numbers',
          'Follow-up: only include what we agreed',
          'Bank check: log in with ada@ / Pilot2024!',
          'Status: five lines, honest colour',
        ],
        bug: 2,
        fix: 'Remove it, and change that password.',
        explanation: 'Never put credentials in a shared prompt.',
      },
      {
        kind: 'mcq',
        prompt: 'Why welcome suggestions instead of locking the library?',
        options: [
          { text: 'Others find improvements, like Tolu\'s "flag anything unclear"' },
          { text: 'To avoid responsibility', why: 'Improvements help everyone.' },
          { text: 'Locking is always better', why: 'It stops improvements.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how a change gets made.',
        lines: ['Someone suggests a change', 'Owner checks the "why" notes', 'Owner tests it', 'Change is saved with a date'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What did the broken follow-up promise Lucía? (free ...)',
        answers: ['month', 'a free month', 'free month'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe in a shared prompt, or never?',
        groups: ['Safe', 'Never'],
        items: [
          { text: '[CLIENT] placeholder', group: 0 },
          { text: 'A real password', group: 1 },
          { text: 'Quality rules', group: 0 },
          { text: 'A customer\'s ID number', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Tolu add that improved results?',
        options: [
          { text: '"Flag anything unclear"' },
          { text: 'More emojis', why: 'The flag instruction.' },
          { text: 'A password', why: 'Never.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'If your team shared prompts, who would own the library? What "why" notes would you add?',
    starters: ['Owner:', 'Why notes:'],
  },
  deepen: { title: 'Try it today', summary: 'Add a "why" note next to the most important line of one shared prompt.' },
  notes: 'Arjun does contract development for Ada\'s startup (CAST.md). Credentials shown are fictional.',
};

export default lesson;
