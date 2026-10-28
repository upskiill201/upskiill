import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 6 — a portfolio piece for every career. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'A portfolio for every career',
  summary: 'Clinton\'s meet-up group chat explodes: "What about us? I\'m doing accounting." "I want marketing." "I\'m a nurse." Miracle posts one message with a project idea for every career. Tap each one.',
  minutes: 11,
  outcomes: ['Find a portfolio piece for the career you want', 'Use the same "real problem" rule outside tech', 'Pick a piece you could start this month'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each career in Miracle\'s message',
      text: 'Accounting: build a simple budget and cash book for a club or family business. Marketing: run one month of social posts for a local shop and track what changed. Writing: start a short newsletter for your church, club or class. Nursing and health: make a one-page leaflet answering the questions patients ask most. Teaching: plan and run three lessons for younger students, and record how they did. Design: redesign a real poster or menu, and show before and after. Customer service: write a guide to the five questions customers ask most.',
      hotspots: [
        { phrase: 'build a simple budget and cash book for a club or family business', note: 'Shows bookkeeping, accuracy and honesty with money. Add the result: "the choir trip came in 20,000 francs under budget".' },
        { phrase: 'run one month of social posts for a local shop and track what changed', note: 'The tracking is the key part: followers, messages, sales. A number makes it proof.' },
        { phrase: 'start a short newsletter for your church, club or class', note: 'Three issues is a portfolio. It shows writing, consistency and knowing your readers.' },
        { phrase: 'answering the questions patients ask most', note: 'Shows you listen to patients and explain clearly. Ask a supervisor to check it for accuracy first.' },
        { phrase: 'and record how they did', note: 'A teacher\'s portfolio needs results too: what students could do after the lessons.' },
        { phrase: 'show before and after', note: 'Before and after is the strongest format for design: the reader sees the change instantly.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Same rule in every career: a real problem, real people, and a result you can show.',
    },
  ],
  apply: {
    scenario: 'Miracle answers the group chat.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each career to its portfolio piece.',
        pairs: [
          ['Accounting', 'A cash book for a club'],
          ['Design', 'A poster redesign, before and after'],
          ['Health', 'A leaflet answering common patient questions'],
          ['Teaching', 'Three lessons and how students did'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What turns a month of social posts into a portfolio piece?',
        options: [
          { text: 'Posting a lot', why: 'Volume isn\'t proof. The result is.' },
          { text: 'Tracking what changed: followers, messages, sales' },
          { text: 'Using lots of filters', why: 'Looks don\'t prove impact. Numbers do.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'For my health leaflet, should I just write it myself and hand it out?',
        options: [
          { text: 'Yes, nobody checks leaflets.', why: 'Wrong health information can hurt people. Get it checked.' },
          { text: 'Copy one from the internet.', why: 'Copying isn\'t your work, and it may not fit your patients.' },
          { text: 'Ask a supervisor or doctor to check it first. Health information has to be accurate.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which career is each piece for?',
        groups: ['Marketing', 'Writing', 'Customer service'],
        items: [
          { text: 'A month of posts for a bakery', group: 0 },
          { text: 'Three issues of a club newsletter', group: 1 },
          { text: 'A guide to the five questions customers ask most', group: 2 },
          { text: 'A launch plan for a shop\'s new product', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the piece that\'s missing a result.',
        lines: ['Cash book for the choir: trip came in under budget.', 'Poster redesign: I made it look nicer.', 'Shop posts: messages went from 3 to 20 a week.'],
        bug: 1,
        fix: 'Poster redesign: twice as many people signed up for the event.',
        explanation: '"Nicer" is an opinion. Show what changed.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is "before and after" so strong for design?',
        options: [
          { text: 'The reader sees the change instantly' },
          { text: 'It doubles the number of pictures', why: 'It\'s not about quantity. It shows the change.' },
          { text: 'Recruiters require it', why: 'Not required, just very convincing.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule for every career.',
        template: 'A real [[1]], real people, and a [[2]] you can show.',
        blanks: [['problem'], ['result']],
        distractors: ['client', 'grade', 'price'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Ngum wants an accounting job. Which first piece should she pick?',
        options: [
          { text: 'A list of accounting words', why: 'Not proof of doing the work.' },
          { text: 'A photo of her calculator', why: 'Shows nothing she did.' },
          { text: 'A budget and cash book for her netball club\'s season, with the result' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A newsletter portfolio needs about how many issues? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good portfolio piece, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Three lessons taught, with what students learned', group: 0 },
          { text: '"I like teaching"', group: 1 },
          { text: 'A menu redesign the café now uses', group: 0 },
          { text: 'A screenshot of a course certificate only', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which idea from Miracle\'s message fits the career you want? How would you change it to fit your own life?',
    starters: ['The idea that fits me is...', 'I\'d change it to...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your portfolio idea in one line using Miracle\'s pattern: "[Career]: [what I\'ll make] for [who], and track [result]."',
  },
  notes: 'Ideas follow common careers-service guidance for portfolios outside design (accounting, marketing, writing, health, teaching, customer service). Health leaflet: always reviewed by a qualified person (playbook §9 safety). Ngum is the classmate named in Ch1 l17.',
};

export default lesson;
