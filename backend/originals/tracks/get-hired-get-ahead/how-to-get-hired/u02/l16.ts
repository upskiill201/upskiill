import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 16 — portfolio myths. Myth or Fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Portfolio myths',
  summary: 'The group chat has opinions again: "A portfolio needs ten projects." "You need your own website." "Only designers bother." Myth or fact: what\'s true about building proof without a job?',
  minutes: 11,
  outcomes: ['Spot common portfolio myths', 'Explain what actually matters', 'Start now instead of waiting for the "perfect" project'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'You need at least ten projects before you show anyone.', isFact: false, explain: 'Two or three strong pieces are enough. Recruiters usually look at one or two. Start with one.' },
        { text: 'A small project that real people use can beat a big one nobody uses.', isFact: true, explain: 'Real users and a result are proof. Size isn\'t. The Njangi Tracker has 12 users and a clear result.' },
        { text: 'You need to pay for your own website.', isFact: false, explain: 'Free options work: GitHub, a shared folder, a free page builder, LinkedIn\'s Featured section, or a PDF.' },
        { text: 'Portfolios are only for designers and developers.', isFact: false, explain: 'Marketing, writing, accounting, teaching, health and support roles all have portfolio pieces.' },
        { text: 'Unpaid or volunteer work can be real proof.', isFact: true, explain: 'If it had a clear task, real people and a result, it counts. Just agree the scope and the end date.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'The biggest myth of all: "I\'ll start when I have a better idea." Start with a small real one this month. You can always replace it later.',
    },
  ],
  apply: {
    scenario: 'Clinton answers the group chat.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Two or three strong pieces are enough', group: 0 },
          { text: 'You need ten projects first', group: 1 },
          { text: 'Volunteer work can be proof', group: 0 },
          { text: 'Only designers need portfolios', group: 1 },
          { text: 'You must pay for a website', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Someone says I shouldn\'t show my portfolio until I have ten projects. True?',
        options: [
          { text: 'No. Two or three strong pieces are plenty. Lead with the Njangi Tracker now.' },
          { text: 'Yes, wait until ten.', why: 'Recruiters look at one or two. Waiting just delays you.' },
          { text: 'Make ten tiny copies quickly.', why: 'Ten weak pieces bury your best one.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What makes a small project beat a big one?',
        options: [
          { text: 'Real users and a clear result' },
          { text: 'Fewer lines of code', why: 'Size isn\'t the point either way. Users and results are.' },
          { text: 'A nicer logo', why: 'Looks don\'t prove impact.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the myth.',
        lines: ['A shared folder can hold a portfolio.', 'Nurses can\'t have portfolios.', 'A hackathon project counts even if you lost.'],
        bug: 1,
        explanation: 'A checked patient leaflet or a health project is a nursing portfolio piece.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['You need ten projects', 'Two or three strong ones'],
          ['You need a paid website', 'Free options work'],
          ['Unpaid work doesn\'t count', 'Scoped volunteer work is proof'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does Tey call the biggest myth?',
        options: [
          { text: '"I\'ll start when I have a better idea."' },
          { text: '"Portfolios need logos."', why: 'Not even a common myth. The big one is waiting.' },
          { text: '"Recruiters read everything."', why: 'Common, but Tey\'s biggest is waiting to start.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'Start with a small [[1]] one this month. You can always [[2]] it later.',
        blanks: [['real'], ['replace', 'improve']],
        distractors: ['perfect', 'hide', 'buy'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many strong pieces does a first portfolio need? (a number)',
        answers: ['2', '3', 'two', 'three', '2 or 3', 'two or three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Start now, or wait?',
        groups: ['Start now', 'Waiting is the myth'],
        items: [
          { text: 'Build the smallest useful version this month', group: 0 },
          { text: 'Wait for a perfect idea', group: 1 },
          { text: 'Show one strong piece to a mentor', group: 0 },
          { text: 'Wait until you have ten projects', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'My blood drive was volunteering. Does it really count?',
        options: [
          { text: 'Yes: a clear task, real people and a result (60 donors). That\'s proof.' },
          { text: 'No, only paid work counts.', why: 'That\'s the myth. Results count wherever you got them.' },
          { text: 'Only if you got a certificate.', why: 'The result is the proof, certificate or not.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which myth has been stopping you from starting a portfolio? What will you tell yourself instead?',
    starters: ['The myth that stopped me was...', 'Now I\'ll tell myself...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Set a date this month for your first portfolio piece to be finished, even if it\'s small. Tell one friend, so someone asks you about it.',
  },
  notes: 'Myths reflect common careers-service and recruiter guidance. David\'s blood drive (60 donors) is from Ch1 l10.',
};

export default lesson;
