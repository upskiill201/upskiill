import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 19 — myths about AI and privacy. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Myths about AI and privacy',
  summary: 'The team has heard everything: "AI forgets everything", "paid tools are always private", "deleting fixes it". Sort the myths from the facts.',
  minutes: 12,
  outcomes: [
    'Correct common myths about AI and privacy',
    'Explain the realistic view to colleagues',
    'Make safer choices by default',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'AI tools forget everything the moment you close the chat.',
          isFact: false,
          explain: 'Depending on the tool and settings, chats may be stored, kept in history or memory, or reviewed.',
        },
        {
          text: 'Paid or business plans often have stronger data protections than free versions.',
          isFact: true,
          explain: 'Business agreements commonly limit training on your data and add admin controls. Check the terms.',
        },
        {
          text: 'Deleting a chat guarantees the data is gone everywhere.',
          isFact: false,
          explain: 'Some copies may be kept for a period. Prevention beats deletion.',
        },
        {
          text: 'Removing names and IDs before pasting greatly reduces the risk.',
          isFact: true,
          explain: 'Placeholders like [CUSTOMER] keep the task working without exposing real people.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Assume what you paste may be kept. Use approved tools, check settings, and remove personal details first.',
    },
  ],
  apply: {
    scenario: 'Ada answers the team\'s privacy questions.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'AI forgets everything when you close it', group: 0 },
          { text: 'Business plans often protect data more', group: 1 },
          { text: 'Deleting guarantees it\'s gone', group: 0 },
          { text: 'Placeholders reduce risk', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the safest assumption about pasted text?',
        options: [
          { text: 'It\'s gone instantly', why: 'Not guaranteed.' },
          { text: 'It may be kept, so only paste what you\'d be OK sharing' },
          { text: 'Nobody could ever see it', why: 'Not guaranteed.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'We pay for our AI tool, so anything goes, right?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes, anything goes.', why: 'Check terms and rules.' },
          { text: 'Paid tools are less safe.', why: 'Often safer; still check.' },
          { text: 'Paid plans often protect data better, but check the terms and settings, and follow company rules on what data can go in.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the callout.',
        template: 'Assume what you paste may be [[1]]. Remove [[2]] details first.',
        blanks: [['kept', 'stored'], ['personal']],
        distractors: ['deleted', 'funny'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request is safest?',
        options: [
          { text: 'Here\'s Ama Mensah\'s complaint with her phone number. Draft a reply.', why: 'Personal data.' },
          { text: '[CUSTOMER] complained that a refund took a week. Draft a short, kind reply that explains our refund timeline.' },
          { text: 'Here\'s the full complaints database.', why: 'Far too much data.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the reality.',
        pairs: [
          ['"It forgets everything"', 'It may be stored'],
          ['"Deleting fixes it"', 'Prevention beats deletion'],
          ['"Paid means anything goes"', 'Check terms and rules'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which belief in the team chat is a myth?',
        lines: [
          'Use placeholders for names',
          'Check the tool\'s settings',
          'Closing the tab wipes all our data',
          'Follow the company AI policy',
        ],
        bug: 2,
        fix: 'Assume pasted data may be kept.',
        explanation: 'Closing a tab doesn\'t delete stored data.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the safe placeholder line.',
        tiles: ['[CUSTOMER]', 'asked', 'about', 'a', 'refund'],
        distractors: ['Ama'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Prevention beats ... (one word)',
        answers: ['deletion', 'deleting'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Safer default, or riskier?',
        groups: ['Safer', 'Riskier'],
        items: [
          { text: 'Approved work tool', group: 0 },
          { text: 'Random free tool found today', group: 1 },
          { text: 'Placeholders for names', group: 0 },
          { text: 'Real IDs "just this once"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the safe default habit.',
        lines: ['Use an approved tool', 'Check settings', 'Replace personal details', 'Then ask'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does removing names keep the task working?',
        options: [
          { text: 'Most tasks need the situation, not who the person is' },
          { text: 'AI can\'t read names', why: 'It can; it just doesn\'t need them.' },
          { text: 'It doesn\'t', why: 'It usually does.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which myth have you believed? What will you do differently?',
    starters: ['I believed...', 'Now I\'ll...'],
  },
  deepen: { title: 'Try it today', summary: 'Rewrite one AI request you\'d normally make with real names, using placeholders instead.' },
  notes: 'Data retention and training practices vary by provider and plan.',
};

export default lesson;
