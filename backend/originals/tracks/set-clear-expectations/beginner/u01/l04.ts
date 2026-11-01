import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Side by side: what does "done" mean? (Definition of done.) */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'What does "done" mean?',
  summary: 'Day 2, 4 p.m. Kavya messages: "Product page done!" Arjun opens it on his phone. The layout breaks, there\'s no Hindi, and the "Add to cart" button does nothing. To Kavya, it IS done. Two definitions of done, side by side.',
  minutes: 11,
  outcomes: [
    'See why "done" means different things to different people',
    'Write a clear definition of done',
    'Agree it before the work starts, not after',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Kavya\'s "done" vs Arjun\'s "done"',
      before: { label: 'Kavya\'s done', text: 'The page looks right on my laptop. Product photo, title, price, button. Done!' },
      after: { label: 'Arjun\'s done', text: 'Works on a cheap Android phone. English and Hindi. Size options. "Add to cart" really adds to the cart. Loads in under 3 seconds on 4G. Reviewed by me.' },
      notes: [
        'Kavya wasn\'t lazy. She finished HER definition.',
        'Arjun\'s definition existed, but only in his head.',
        'A written definition of done turns an argument into a checklist.',
      ],
    },
    {
      kind: 'text',
      html: "<p>Software teams that use Scrum, a popular way of organising work, keep a written <strong>definition of done</strong>: a short, shared checklist that every piece of work must meet before anyone calls it finished. The idea works for any kind of work: a report, an event, a design. Write the checklist <strong>before</strong> the work starts. Then \"done\" means the same thing to everyone, and nobody has to argue about it on a Friday afternoon.</p>",
    },
    {
      kind: 'check',
      question: 'When should a definition of done be agreed?',
      options: ['Before the work starts', 'When someone says "done"', 'At the end of the project'],
      answer: 0,
      explanation: 'Agreed afterwards, it feels like moving the goalposts.',
    },
  ],
  apply: {
    scenario: 'Day 2, 4 p.m.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Kavya\'s done or Arjun\'s done?',
        groups: ['Kavya\'s', 'Arjun\'s'],
        items: [
          { text: 'Looks right on my laptop', group: 0 },
          { text: 'Works on a cheap Android phone', group: 1 },
          { text: 'Has a button', group: 0 },
          { text: 'The button really adds to the cart', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Was Kavya lazy?',
        options: [
          { text: 'Yes, she skipped half the work', why: 'She didn\'t know about that half.' },
          { text: 'No. She finished her own definition of done, because she never saw his' },
          { text: 'Yes, she should have known', why: 'How? It was in Arjun\'s head.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Product page done!',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'This is not done.', why: 'True to him, and unfair to her: she never saw his definition.' },
          { text: 'Great, thanks!', why: 'Then it ships broken.' },
          { text: 'Looks great on desktop! That\'s my fault: I never wrote down what "done" means. Here\'s the checklist. Which bits are easy to add?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A shared checklist for finished work is a definition of ___. (one word)',
        answers: ['done', 'Done'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the vague "done" to a clear one.',
        pairs: [
          ['"Looks right"', '"Works on a cheap Android phone"'],
          ['"Has a button"', '"The button adds to the cart"'],
          ['"Fast enough"', '"Under 3 seconds on 4G"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why write the checklist before the work starts?',
        options: [
          { text: 'Afterwards, it feels like moving the goalposts' },
          { text: 'It\'s faster to write', why: 'It\'s about fairness and clarity.' },
          { text: 'Scrum requires it', why: 'It helps whether or not you use Scrum.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s definition of done. Which line is still vague?',
        lines: [
          'Works on a cheap Android phone.',
          'Looks professional.',
          'English and Hindi.',
        ],
        bug: 1,
        fix: 'Uses the shop\'s colours and fonts from the design file.',
        explanation: '"Professional" means something different to everyone. Say what it looks like.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put using a definition of done in order.',
        lines: ['Write the checklist', 'Share it before work starts', 'Check work against it', 'Call it done when every box is ticked'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'A written definition of done turns an [[1]] into a [[2]].',
        blanks: [['argument'], ['checklist']],
        distractors: ['email', 'meeting'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s apology.',
        tiles: ['I', 'never', 'wrote', 'down', 'what', 'done', 'means.'],
        distractors: ['you'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you\'ve handed over or received recently. What would a five-line definition of done have said?',
    starters: ['The task was...', 'Done means: ...'],
  },
  deepen: {
    title: 'Five boxes',
    summary: 'For your next task, write a five-box definition of done before you start. Share it with whoever will check it.',
  },
  notes: 'Definition of Done: Ken Schwaber & Jeff Sutherland, The Scrum Guide (2020): a formal description of the state of the Increment when it meets the quality measures required. Applied here to general work. Fictional details.',
};

export default lesson;
