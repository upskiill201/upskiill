import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 14 — connecting: who to add and how to write a connection note. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Connect with a note',
  summary: 'Clinton has 23 connections, mostly classmates. He wants to connect with Brenda, two Njangi Pay developers and the speakers from his meet-up. Miracle shows him how, and why a blank request often gets ignored.',
  minutes: 12,
  outcomes: ['Decide who to connect with', 'Write a short, personal connection note', 'Grow your network without spamming'],
  learn: [
    {
      kind: 'steps',
      title: 'Connect in four steps',
      steps: [
        { title: '1. Start with people you\'ve met', body: 'Classmates, lecturers, careers staff, people from events, your meet-up speakers, people from your volunteering. These connections say yes, and they\'re the base of your network.' },
        { title: '2. Then people in the field you want', body: 'People who work where you\'d like to work, or do the job you want. Two Njangi Pay developers. A fintech founder who spoke in Douala. Not random strangers: people with a reason to connect.' },
        { title: '3. Always add a short note', body: 'Two lines: how you know them or why you\'re reaching out, and something specific. "Hi Brenda, thanks for your talk at UB last month: your advice to show, not tell, changed my CV. I\'d love to stay in touch." No sales pitch, no "please hire me".' },
        { title: '4. Don\'t ask for a job in the request', body: 'A connection request is a hello, not an application. Ask for nothing at first. If you want advice later, ask then, politely (the next course, How to Get Hired, goes deeper).' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A note that mentions where you met or something they said turns a stranger\'s "who is this?" into "oh, nice".',
    },
  ],
  apply: {
    scenario: 'Clinton grows his network.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the connecting steps in order.',
        lines: ['Start with people you\'ve met', 'Then people in the field you want', 'Always add a short note', 'Don\'t ask for a job in the request'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which connection note to Brenda is best?',
        options: [
          { text: '"Hi Brenda, thanks for your talk at UB: your advice to show, not tell, changed my CV. I\'d love to stay in touch."' },
          { text: '(no note)', why: 'Blank requests are easy to ignore.' },
          { text: '"Please give me a job at Njangi Pay."', why: 'A request is a hello, not an application.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good person to connect with, or not yet?',
        groups: ['Good to connect', 'Not yet'],
        items: [
          { text: 'A speaker from his meet-up', group: 0 },
          { text: 'Mrs Ewane from the careers office', group: 0 },
          { text: 'A random celebrity with no link to his field', group: 1 },
          { text: 'A developer at Njangi Pay, with a note', group: 0 },
          { text: '500 strangers in one evening', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that breaks the rules in this note.',
        lines: ['Hi Tchami, I loved your talk on mobile money at our meet-up.', 'Can you get me an interview at your company tomorrow?', 'I\'d love to stay in touch.'],
        bug: 1,
        explanation: 'Too big an ask in a first hello. Connect first, ask for advice later.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Should I send connection requests to 200 people tonight to grow fast?',
        options: [
          { text: 'No: a few real connections with notes beat 200 strangers. Ten good ones this week.' },
          { text: 'Yes, more is better.', why: 'Mass requests look like spam and many get ignored.' },
          { text: 'Never connect with anyone.', why: 'Connections help him be found and stay in touch.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to a good note opening.',
        pairs: [
          ['Brenda', 'Thanks for your talk at UB'],
          ['A meet-up speaker', 'I loved your session on mobile money'],
          ['A Njangi Pay developer', 'I\'m a CS student who built a savings-group tracker'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is a connection request for?',
        options: [
          { text: 'Saying hello and staying in touch' },
          { text: 'Applying for a job', why: 'Apply through the job process. A request is a hello.' },
          { text: 'Asking for money', why: 'Never.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Clinton\'s note.',
        template: 'Hi Brenda, thanks for your [[1]] at UB. I\'d love to stay in [[2]].',
        blanks: [['talk'], ['touch']],
        distractors: ['job', 'money', 'office'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lines should a connection note be? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good note or bad note?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Mentions where you met', group: 0 },
          { text: 'Asks for a job straight away', group: 1 },
          { text: 'Says something specific they said', group: 0 },
          { text: 'Copy-pasted to 200 people', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Name three people you\'ve met who you could connect with this week. What would your note to each say?',
    starters: ['1. ___: "Hi..."', '2. ___: "Hi..."'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Send five connection requests this week, each with a personal two-line note. Start with people you\'ve actually met.',
  },
  notes: 'Connection-request guidance (personalised note, no immediate ask) follows common networking advice. Free LinkedIn accounts may limit notes per month (platform rules change); the principle holds. Tchami is a named extra (a meet-up speaker). Sets up Level 2, Chapter 1 (networking when you know nobody).',
};

export default lesson;
