import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Reading: the one-page validation summary. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The one-page summary',
  summary: 'Miracle asks for everything Clinton learned on one page: something David, a lender or a future partner could read in two minutes. Here\'s what he writes.',
  minutes: 12,
  outcomes: [
    'Write a one-page validation summary',
    'Put evidence next to every claim',
    'End with a clear decision and next tests',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'WashDay: validation summary',
      html: '<p><strong>Problem.</strong> In rainy season, hostel students near the University of Buea lose about 3 hours every Saturday to hand-washing, and clothes don\'t dry. <em>Evidence: 9 of 15 interviews raised it unprompted.</em></p><p><strong>Customer.</strong> First- and second-year students in the hostels within 15 minutes of campus. <em>About 2,000 reachable; about 800 already pay for laundry help sometimes.</em></p><p><strong>Today\'s alternatives.</strong> Hand-washing (free, slow), Mama Rose (2,400 FCFA a basket, three days, carry it yourself), buying extra clothes.</p><p><strong>Offer.</strong> Pickup from your room Saturday from 9 a.m., washed by Mama Rose, back Sunday. 1,500 FCFA a bag, paid on Mobile Money.</p><p><strong>Evidence of demand.</strong> 54 paid bags over three weekends (12, 19, 23); 30 customers; 8 of the first 12 came back; 45% "very disappointed" in the survey.</p><p><strong>Risks.</strong> Mama Rose can wash about 25 bags a Saturday. One bicycle can\'t carry them all up the hill. Clinton keeps only 500 FCFA a bag.</p><p><strong>Decision.</strong> Persevere.</p><p><strong>Next tests.</strong> (1) Find a second washer. (2) Test a price that pays Clinton fairly. (3) Track every franc in and out for a month.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Every claim on the page needs evidence next to it. If you can\'t add evidence, it goes under "risks" or "next tests".',
    },
  ],
  apply: {
    scenario: 'One page.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the sections of the summary.',
        lines: ['Problem', 'Customer', 'Today\'s alternatives', 'Offer', 'Evidence of demand', 'Risks', 'Decision and next tests'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does every claim need evidence next to it?',
        options: [
          { text: 'So readers can see what\'s proven and what\'s still a guess' },
          { text: 'To make the page longer', why: 'It should stay one page.' },
          { text: 'Evidence isn\'t needed in a summary', why: 'Without it, it\'s just a pitch.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which section does this line belong in?',
        groups: ['Evidence', 'Risks', 'Next tests'],
        items: [
          { text: '54 paid bags over three weekends', group: 0 },
          { text: 'Mama Rose\'s 25-bag limit', group: 1 },
          { text: 'Find a second washer', group: 2 },
          { text: '45% very disappointed', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the summary claim to its evidence.',
        pairs: [
          ['Students struggle with laundry', '9 of 15 interviews'],
          ['They pay for pickup', '54 paid bags'],
          ['They come back', '8 of the first 12'],
          ['It has real pull', '45% very disappointed'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Should I leave out the risks? The page looks better without them.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Keep them. A summary that admits the 25-bag limit and the thin margin is one people trust, and it tells you what to fix.' },
          { text: 'Yes, hide them.', why: 'Hidden risks don\'t go away.' },
          { text: 'Only write risks.', why: 'Evidence and risks both belong.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The decision line.',
        template: 'Decision: [[1]]. Next tests: a second washer, a fair [[2]], and tracking every franc.',
        blanks: [['Persevere', 'persevere'], ['price']],
        distractors: ['Stop', 'logo'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Over 54 bags, Clinton keeps 500 FCFA each. How much has he kept in total, in FCFA?',
        answers: ['27000', '27,000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of a summary like this has no evidence?',
        lines: [
          'Problem: 9 of 15 interviews raised laundry.',
          'Demand: 54 paid bags over three weekends.',
          'Market: every student in Cameroon will use WashDay.',
          'Return: 8 of the first 12 came back.',
        ],
        bug: 2,
        fix: 'Market: about 800 likely customers near campus (counted).',
        explanation: 'It\'s a wild guess, unlike the counted estimate.',
      },
      {
        kind: 'mcq',
        prompt: 'Who is the one-page summary for?',
        options: [
          { text: 'Anyone who needs the facts fast, including Clinton himself' },
          { text: 'Only investors', why: 'It\'s useful for partners, lenders and himself.' },
          { text: 'Nobody; it\'s a formality', why: 'It\'s how he decides.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs on the page, or not?',
        groups: ['On the page', 'Leave out'],
        items: [
          { text: 'Mama Rose\'s 25-bag limit', group: 0 },
          { text: 'Clinton\'s favourite colour for the bags', group: 1 },
          { text: 'The price and what Clinton keeps', group: 0 },
          { text: 'Forty fire emojis from week one', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Draft your own one-page summary. Which section is still empty or full of guesses?',
    starters: ['My strongest section is...', 'Still a guess:...'],
  },
  deepen: {
    title: 'Not a business plan',
    summary: 'This page isn\'t a 40-page business plan; it\'s the evidence behind one. Many lenders and partners would rather read this page first.',
  },
  notes: 'Summary uses the course\'s fictional data: 2,000 reachable, 800 likely; 54 paid bags (12, 19, 23); 30 customers; 8 of 12 returned; 45% very disappointed; 500 FCFA kept per bag (27,000 FCFA total).',
};

export default lesson;
