import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 18 — one-to-ones with your manager. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'One-to-ones with your manager',
  summary: 'Ada\'s weekly one-to-one with Tobi often drifts into small talk. After the outage week, she wants to use it well. Tey shows her a ten-minute prep with AI.',
  minutes: 12,
  outcomes: [
    'Prepare for a one-to-one in ten minutes',
    'Bring wins, problems and asks',
    'Use the meeting for your growth, not just updates',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'A one-to-one is your meeting, not Tobi\'s. Bring three things: wins, problems, and asks.', replies: ['What counts as a win?'] },
        { tey: 'Things that went well, with a result: "The outage apology: Carmen said it was the first she believed." Managers often don\'t see these unless you say them.', replies: ['And problems?'] },
        { tey: 'With what you\'ve tried: "Bank alerts: I\'ve asked twice; can you escalate?" Then one growth question: "What should I get better at this quarter?"', replies: ['How does AI help?'] },
        { tey: 'Paste your week\'s notes: "Pull out my wins, problems and possible asks for a one-to-one." Then pick the top two of each. Ten minutes.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Wins with results, problems with what you\'ve tried, asks, and one growth question. AI pulls them from your notes; you pick the top two.',
    },
  ],
  apply: {
    scenario: 'Ada prepares for her one-to-one with Tobi.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s one-to-one.',
        lines: ['Wins', 'Problems and what she\'s tried', 'Asks', 'One growth question'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Win, or problem?',
        groups: ['Win', 'Problem'],
        items: [
          { text: 'Carmen trusted the apology', group: 0 },
          { text: 'The bank hasn\'t set up alerts', group: 1 },
          { text: 'The founders approved a second market', group: 0 },
          { text: 'The week 8 review slipped two days', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request preps best?',
        options: [
          { text: 'What should I say to my manager?', why: 'No notes.' },
          { text: 'From these notes on my week, pull out wins with results, problems with what I tried, and possible asks for my one-to-one.' },
          { text: 'Make me sound impressive.', why: 'Honesty works better.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why mention wins in a one-to-one?',
        options: [
          { text: 'Managers often don\'t see them unless you say so' },
          { text: 'To show off', why: 'It\'s information they need.' },
          { text: 'Wins don\'t matter', why: 'They do, for reviews and trust.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Do you prepare for meetings with your own manager?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Ten minutes every week: two wins, two problems with what I\'ve tried, one ask and one growth question.' },
          { text: 'No, we just chat.', why: 'She prepares now.' },
          { text: 'Tobi prepares it all.', why: 'It\'s her meeting.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Problems with what you\'ve [[1]], and one [[2]] question.',
        blanks: [['tried'], ['growth']],
        distractors: ['hidden', 'silly'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s prep is weakest?',
        lines: [
          'Win: Carmen trusted the apology',
          'Problem: bank alerts; asked twice; can you escalate?',
          'Problem: things are hard',
          'Growth: what should I improve this quarter?',
        ],
        bug: 2,
        fix: 'Problem: the week 8 review slipped; I\'ve moved it to Friday.',
        explanation: '"Things are hard" gives Tobi nothing to help with.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the item to its example.',
        pairs: [
          ['Win', 'Founders approved a second market'],
          ['Ask', 'Can you escalate the bank alert?'],
          ['Growth question', 'What should I get better at?'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s growth question.',
        tiles: ['What', 'should', 'I', 'get', 'better', 'at?'],
        distractors: ['never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes does the prep take?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good use of a one-to-one, or a waste?',
        groups: ['Good use', 'Waste'],
        items: [
          { text: 'Asking for help with a blocker', group: 0 },
          { text: 'Reading out every task done', group: 1 },
          { text: 'Asking for growth feedback', group: 0 },
          { text: '30 minutes of small talk', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Whose meeting is a one-to-one, mainly?',
        options: [
          { text: 'Ada\'s: it\'s for her work and growth' },
          { text: 'Tobi\'s only', why: 'It\'s mainly hers.' },
          { text: 'Nobody\'s', why: 'It\'s hers to use.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Prepare for your next meeting with your manager: two wins, one problem, one ask.',
    starters: ['Wins:', 'Ask:'],
  },
  deepen: { title: 'Try it today', summary: 'Paste your week\'s notes into AI and ask for wins, problems and asks. Pick the top two of each.' },
  notes: 'General management practice.',
};

export default lesson;
