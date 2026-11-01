import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Step-by-step: the "look closer" family, and what a deep dive actually has to deliver. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Deep dive, drill down, double-click',
  summary: 'Brian asks Remi for a "deep dive" on three suppliers. Remi\'s literal brain imagines scuba gear. Here is what a deep dive really is, and how to deliver one.',
  minutes: 13,
  outcomes: [
    'Decode the "look closer" family: deep dive, drill down, double-click, unpack',
    'Deliver a deep dive in five steps',
    'Lead with the answer, not with everything you found',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'How Remi does his first deep dive',
      steps: [
        {
          title: 'Decode the request',
          body: '"Deep dive", "drill down", "double-click on" and "unpack" all mean the same thing: look at this one topic in detail. Brian wants a closer look at three suppliers Remi wasn\'t sure about.',
        },
        {
          title: 'Find the question',
          body: 'Every deep dive answers ONE question. Remi asks Brian: "What do you want to know about them?" Answer: "Should we keep using them?" Now Remi knows what he\'s looking for.',
        },
        {
          title: 'Agree the size',
          body: 'A deep dive can take an afternoon or a month. Remi asks: "How much time should I spend, and when do you need it?" Answer: "A couple of hours, by Thursday."',
        },
        {
          title: 'Dig, then find the "so what"',
          body: 'Remi checks orders, prices and delivery times. Then he asks himself: so what? What does all this mean for Brian\'s question? Answer: keep two, replace one.',
        },
        {
          title: 'Answer first, details after',
          body: 'His message starts with the answer: "Keep Kiprono Packaging and Lakeside Paper. Replace Swift Freight: late on 9 of its last 12 deliveries." The details go underneath for anyone who wants them.',
        },
      ],
    },
    {
      kind: 'text',
      html: "<p>The \"look closer\" family:</p><ul><li><strong>Deep dive:</strong> a detailed look at one topic. \"Can you do a deep dive on...\"</li><li><strong>Drill down:</strong> go from the big picture into the details. \"Let's drill down into the Mombasa numbers.\"</li><li><strong>Double-click on:</strong> borrowed from computers: open it up and look inside. \"Can we double-click on that point?\"</li><li><strong>Unpack:</strong> explain something in more detail. \"Can you unpack what you mean?\"</li></ul>",
    },
    {
      kind: 'check',
      question: 'What should the FIRST line of a deep dive be?',
      options: ['Everything you found, in the order you found it', 'The answer to the question', 'How hard you worked'],
      answer: 1,
      explanation: 'Busy people read the first line. Make it the answer.',
    },
  ],
  apply: {
    scenario: 'Thursday morning. Remi\'s deep dive is due.',
    items: [
      {
        kind: 'mcq',
        prompt: '"Can we double-click on that?" What does the speaker want?',
        options: [
          { text: 'To open a file on the computer', why: 'It borrows the computer picture, but means: open the idea up.' },
          { text: 'To say it twice', why: 'Double-click means look inside, not repeat.' },
          { text: 'To look at that point in more detail' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'They all mean "look closer". Match each to how you\'d hear it.',
        pairs: [
          ['Deep dive', '"Can you do a ... on churn?"'],
          ['Drill down', '"Let\'s ... into the Mombasa numbers."'],
          ['Unpack', '"Can you ... what you mean?"'],
          ['Double-click', '"Can we ... on that point?"'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s deep-dive steps in order.',
        lines: ['Decode the request', 'Find the one question', 'Agree the size and deadline', 'Dig, then find the "so what"', 'Send the answer first, details after'],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Can you deep-dive our courier costs?',
        prompt: 'Which reply makes the deep dive easiest to get right?',
        options: [
          { text: 'On it!', why: 'Without knowing the question and the size, Remi could spend a week on the wrong thing.' },
          { text: 'How deep?', why: 'Fair, but vague. Ask about the question and the time.' },
          { text: 'Sure! What\'s the main question: are we paying too much, or something else? And how long should I spend on it?' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which opening line is best for Remi\'s deep dive?',
        options: [
          { text: 'First I opened the order system, then I exported the data...', why: 'The story of the work can come later, or not at all. Lead with the answer.' },
          { text: 'Keep Kiprono and Lakeside. Replace Swift Freight: late on 9 of its last 12 deliveries.' },
          { text: 'This was a very interesting deep dive.', why: 'Brian wants the result, not a review of the task.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'After digging, you ask yourself "so ...?" to find what it all means. (one word)',
        answers: ['what'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s deep-dive message. Which line should come first?',
        lines: [
          'I looked at six months of courier invoices.',
          'Prices went up 15% in June.',
          'Answer: we should ask two other couriers for quotes.',
        ],
        bug: 2,
        fix: 'Move "Answer: we should ask two other couriers for quotes." to the top.',
        explanation: 'Her answer is buried at the bottom. Busy readers may never reach it.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Brian\'s request in plain English.',
        template: '"Let\'s drill down into sales" = "Let\'s look at sales in more [[1]]."',
        blanks: [['detail']],
        distractors: ['offline', 'later'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good deep-dive habit, or a trap?',
        groups: ['Good habit', 'Trap'],
        items: [
          { text: 'Ask what question it should answer', group: 0 },
          { text: 'Spend two weeks on it without asking', group: 1 },
          { text: 'Put the answer first', group: 0 },
          { text: 'Include every number you found', group: 1 },
          { text: 'Agree a deadline', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In a meeting someone says, "Can you unpack that?" What do you do?',
        options: [
          { text: 'Explain what you just said in more detail, with an example' },
          { text: 'Open your bag', why: 'Nothing to unpack except your idea.' },
          { text: 'Repeat it word for word', why: 'They want MORE detail, not the same words again.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Pick something you\'d like to understand better at work, school or home. What\'s the ONE question your deep dive would answer?',
    starters: ['My deep dive would be on...', 'The one question is...'],
  },
  deepen: {
    title: 'The one-line test',
    summary: 'Next time you finish a piece of research or a report, write its answer in one line before anything else. If you can\'t, you haven\'t found the "so what" yet.',
  },
  notes: 'Meanings: "deep dive" (Collins), "drill down" (Cambridge: examine in more detail), "double-click on" (newer business jargon borrowed from computing: examine more closely; widely documented in business-jargon lists, no dictionary claim made in the lesson), "unpack" (Cambridge: examine and explain). Supplier names are fictional.',
};

export default lesson;
