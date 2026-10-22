import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 14 — status updates in two minutes. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Status updates in two minutes',
  summary: 'Every Friday, Tobi wants a pilot update. Tolu spends an hour on it. With a fixed format and AI, it takes two minutes and says more.',
  minutes: 12,
  outcomes: [
    'Write a status update in a fixed format',
    'Use AI to draft it from your notes',
    'Use red, amber, green honestly',
  ],
  learn: [
    {
      kind: 'text',
      html:
        '<p>Tolu\'s Friday update, five lines:</p>' +
        '<table><tr><th>Line</th><th>Example</th></tr>' +
        '<tr><td><strong>Status</strong></td><td>Amber: sign-ups on track, one bank issue.</td></tr>' +
        '<tr><td><strong>Done this week</strong></td><td>32 of 50 shops signed up with test payments.</td></tr>' +
        '<tr><td><strong>Next week</strong></td><td>Sign up the last 18; train shops on refunds.</td></tr>' +
        '<tr><td><strong>Problems</strong></td><td>Bank settlement takes 2 days, not 1. Ada is raising it Monday.</td></tr>' +
        '<tr><td><strong>Help needed</strong></td><td>Tobi: can you join Monday\'s bank call?</td></tr></table>' +
        '<p><strong>Green</strong> = on track. <strong>Amber</strong> = a problem, being handled. <strong>Red</strong> = off track, needs a decision. Saying "amber" early is far better than "green" until it\'s suddenly red.</p>' +
        '<p>Ask AI: <em>"From these notes, write my Friday update in these five lines. Don\'t add anything that isn\'t in the notes."</em></p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Status, done, next, problems, help needed. Honest colours: amber early beats green until it\'s red.',
    },
  ],
  apply: {
    scenario: 'Friday afternoon. Tolu writes his update.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five lines.',
        lines: ['Status', 'Done this week', 'Next week', 'Problems', 'Help needed'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the colour to its meaning.',
        pairs: [
          ['Green', 'On track'],
          ['Amber', 'A problem, being handled'],
          ['Red', 'Off track, needs a decision'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Settlement is slower than promised, and Ada is raising it Monday. What colour?',
        options: [
          { text: 'Green', why: 'There\'s a real problem.' },
          { text: 'Amber' },
          { text: 'Red', why: 'It\'s being handled; no decision needed yet.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request drafts the update best?',
        options: [
          { text: 'Write a status update.', why: 'No notes or format.' },
          { text: 'From these notes, write my Friday update as: status (green/amber/red), done, next, problems, help needed. Don\'t add anything that isn\'t in the notes.' },
          { text: 'Make it sound great.', why: 'Spin hides problems.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Why is the pilot amber? Is something wrong?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'It\'s nothing, really green.', why: 'Don\'t downplay a real issue.' },
          { text: 'Everything is wrong.', why: 'Overreaction.' },
          { text: 'Sign-ups are on track. Settlement takes 2 days instead of 1; we\'re raising it with the bank Monday. Amber means it\'s handled, not a crisis.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: '[[1]] early beats green until it\'s [[2]].',
        blanks: [['Amber'], ['red']],
        distractors: ['Blue', 'gone'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Tolu\'s update is unclear?',
        lines: [
          'Status: amber',
          'Done: 32 of 50 shops signed up',
          'Next: various things',
          'Help: Tobi to join Monday\'s bank call',
        ],
        bug: 2,
        fix: 'Next: sign up the last 18 shops; train shops on refunds.',
        explanation: '"Various things" tells Tobi nothing.',
      },
      {
        kind: 'typeAnswer',
        prompt: '32 of 50 shops are signed up. How many are left?',
        answers: ['18', 'eighteen'],
        placeholder: 'A number',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tolu\'s "help needed" line.',
        tiles: ['Tobi:', 'can', 'you', 'join', 'Monday\'s', 'bank', 'call?'],
        distractors: ['maybe'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which line does this belong in?',
        groups: ['Problems', 'Help needed'],
        items: [
          { text: 'Settlement takes 2 days, not 1', group: 0 },
          { text: 'Tobi to approve 5 extra flyers', group: 1 },
          { text: 'Two shops dropped out', group: 0 },
          { text: 'Ada to review the refund guide', group: 1 },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest update or spin?',
        groups: ['Honest', 'Spin'],
        items: [
          { text: '"Amber: one bank issue, being handled"', group: 0 },
          { text: '"Green! Everything amazing!" (with a problem)', group: 1 },
          { text: '"32 of 50 done"', group: 0 },
          { text: '"Great progress across workstreams"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why always include "help needed"?',
        options: [
          { text: 'It turns the update into action, not just information' },
          { text: 'To look busy', why: 'It gets you real help.' },
          { text: 'It\'s optional filler', why: 'It\'s often the most useful line.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write this week\'s status for your own work in the five lines. What colour is it, honestly?',
    starters: ['Status:', 'Help needed:'],
  },
  deepen: { title: 'Try it today', summary: 'Save the five-line format as a template and let AI fill it from your notes every Friday.' },
  notes: 'Red/amber/green (RAG) status is common project practice. Figures fictional.',
};

export default lesson;
