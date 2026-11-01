import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Step-by-step: headings that say something. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Headings that say something',
  summary: 'Zanele\'s headings are "Introduction", "Method", "Results", "Discussion". A reader of headings only learns that it\'s a report. Mrs Achieng shows her message headings.',
  minutes: 12,
  outcomes: [
    'Write headings that carry the message',
    'Tell label headings from message headings',
    'Check a document by reading only its headings',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to message headings',
      steps: [
        { title: '1. Spot label headings', body: '"Results", "Discussion", "Costs". They name a topic but say nothing about it.' },
        { title: '2. Ask "so what?" for each section', body: '"Results" so what? Late deliveries fell from 34% to 21%.' },
        { title: '3. Turn the answer into the heading', body: '"Late deliveries fell from 34% to 21% in two months."' },
        { title: '4. Keep headings short and specific', body: '"Saturday crews cost KES 120,000 a month per depot." Numbers make headings useful.' },
        { title: '5. Read only the headings', body: 'Do they tell the whole story in order? If yes, the layer-cake reader gets it all.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Replace label headings with message headings: ask "so what?" and make the answer the heading.',
    },
  ],
  apply: {
    scenario: 'Message headings.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Spot label headings', 'Ask "so what?"', 'Turn the answer into the heading', 'Keep it short and specific', 'Read only the headings'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Label heading or message heading?',
        groups: ['Label', 'Message'],
        items: [
          { text: '"Results"', group: 0 },
          { text: '"Late deliveries fell from 34% to 21%"', group: 1 },
          { text: '"Costs"', group: 0 },
          { text: '"Saturday crews cost KES 120,000 a month"', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the label heading to a message heading.',
        pairs: [
          ['"Results"', '"Late deliveries fell to 21%"'],
          ['"Costs"', '"KES 120,000 a month per depot"'],
          ['"Risks"', '"Main risk: Saturday driver supply"'],
          ['"Recommendation"', '"Roll out to all three depots"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What question turns a label into a message heading?',
        options: [
          { text: '"Who wrote it?"', why: 'Ask "so what?".' },
          { text: '"How long is it?"', why: 'Ask "so what?".' },
          { text: '"So what?"' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Isn\'t "Introduction, Method, Results" the professional format?',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: 'Yes, always use it.', why: 'It suits some readers, not busy boards.' },
          { text: 'It\'s fine for academic papers. For a board deciding in 90 seconds, headings that state the findings work better.' },
          { text: 'Headings are pointless.', why: 'They\'re what scanners read.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The test.',
        template: 'Read only the [[1]]. Do they tell the whole [[2]]?',
        blanks: [['headings'], ['story']],
        distractors: ['footnotes', 'joke'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many depots does the recommendation heading mention?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why add numbers to headings?',
        options: [
          { text: 'To look technical', why: 'For specificity.' },
          { text: 'Numbers don\'t belong in headings', why: 'They help.' },
          { text: 'They make the message specific and memorable' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which heading in this list is still a label?',
        lines: [
          'Late deliveries fell from 34% to 21%',
          'Refunds fell by a third',
          'Discussion',
          'Roll out Saturdays to all depots',
        ],
        bug: 2,
        fix: 'Main risk: finding Saturday drivers',
        explanation: '"Discussion" says nothing.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific or vague heading?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: '"Refunds fell by a third"', group: 0 },
          { text: '"Some findings"', group: 1 },
          { text: '"Lagos could save 140 late orders a month"', group: 0 },
          { text: '"Other things"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite the headings of a document you wrote as message headings.',
    starters: ['Before:...', 'After:...'],
  },
  deepen: {
    title: 'Headlines, not labels',
    summary: 'Newspapers write headlines that tell the story. Message headings borrow the idea: a reader who sees only the headings still gets the news.',
  },
  notes: 'Message vs topic headings: common technical-writing and consulting practice (also Minto, The Pyramid Principle). Fictional figures.',
};

export default lesson;
