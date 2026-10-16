import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Card deck: show the quality bar (rubrics and checklists; Panadero & Jonsson 2013). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Show the bar',
  summary: 'Day 13, 9 a.m. Arjun and Joel sit down to write the review checklist. Arjun thought it would take an hour. It takes twenty minutes, because Joel keeps asking "but what does good look like for that?" Tey deals out the cards.',
  minutes: 11,
  outcomes: [
    'Turn a quality standard into a short checklist',
    'Separate must-haves from nice-to-haves',
    'Share the bar before the work, not after',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>In education, a <strong>rubric</strong> is a list of what good work looks like, often at a few levels. A review of research by Ernesto Panadero and Anders Jonsson (2013) found that sharing rubrics with learners before they work can help them check their own work and perform better. Teams can do the same thing. Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Make it checkable</h3><p>Not \"clean code\". Instead: \"No passwords or keys in the code.\" Every line should be something you can tick yes or no.</p><h3>Card 2: Must-haves first</h3><p>Seven lines Joel must meet before asking for review: tests pass, Hindi and English, error messages, no secrets, works on a cheap phone, follows the handoff format, one clear PR description.</p><h3>Card 3: Nice-to-haves, separately</h3><p>\"Comments explain why, not what\" is great, but not a reason to block a PR. Keep it in a second, shorter list so people know what's essential.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: Add an example of great</h3><p>Link one PR that meets the whole bar. Chapter 1's lesson: examples carry the details words miss.</p><h3>Card 5: Share it before the work</h3><p>A bar shared after the work feels like moving the goalposts. Shared before, it's a target people can aim at and check themselves against.</p><h3>Card 6: Let them check themselves</h3><p>\"Before you ask for review, go through the checklist yourself.\" It catches most problems before Arjun ever sees them, and Joel learns the bar for good.</p>",
    },
    {
      kind: 'check',
      question: 'When should a quality bar be shared?',
      options: ['Before the work starts', 'In the review', 'After launch'],
      answer: 0,
      explanation: 'Shared after, it feels like moving the goalposts.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Make every line checkable. Must-haves first, nice-to-haves separate. Add an example of great. Share it before. Let people check themselves.',
    },
  ],
  apply: {
    scenario: 'Writing the review checklist.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Panadero and Jonsson\'s review find about sharing rubrics?',
        options: [
          { text: 'It makes people lazy', why: 'The opposite.' },
          { text: 'It can help people check their own work and perform better' },
          { text: 'It only helps teachers', why: 'It helps the learners most.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Must-have or nice-to-have?',
        groups: ['Must-have', 'Nice-to-have'],
        items: [
          { text: 'Tests pass', group: 0 },
          { text: 'Comments explain why', group: 1 },
          { text: 'No passwords in the code', group: 0 },
          { text: 'Perfectly tidy file names', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'What does "good error handling" mean, exactly?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Fair question. Let\'s write it checkable: "If the email fails, the customer sees a clear message and we get an alert."' },
          { text: 'You know, good.', why: 'Not checkable.' },
          { text: 'Whatever you think is good.', why: 'Then we\'re back to Joel\'s old standard.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A list of what good work looks like is a ___. (one word)',
        answers: ['rubric', 'Rubric', 'checklist', 'Checklist'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the vague standard to a checkable one.',
        pairs: [
          ['"Clean code"', '"No passwords in the code"'],
          ['"Works on mobile"', '"Works on a cheap Android"'],
          ['"Good errors"', '"Customer sees a clear message"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why keep nice-to-haves on a separate list?',
        options: [
          { text: 'To ignore them', why: 'They still matter, just not as blockers.' },
          { text: 'Because they\'re secret', why: 'Both lists are shared.' },
          { text: 'So people know what\'s essential and what can wait' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'The draft checklist. Which line isn\'t checkable?',
        lines: [
          'Tests pass.',
          'Code is high quality.',
          'Hindi and English both work.',
        ],
        bug: 1,
        fix: 'No passwords or keys in the code.',
        explanation: '"High quality" can\'t be ticked yes or no.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put building a quality bar in order.',
        lines: ['List the must-haves, checkable', 'List the nice-to-haves', 'Add an example of great', 'Share it before work starts'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Every line should be something you can [[1]] yes or [[2]].',
        blanks: [['tick', 'check', 'answer'], ['no']],
        distractors: ['maybe', 'ignore'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the self-check habit.',
        tiles: ['Check', 'the', 'list', 'before', 'review.'],
        distractors: ['after'],
      },
    ],
  },
  reflect: {
    prompt: 'Write a five-line checklist for something you often do or review. Make every line checkable. Which line surprised you?',
    starters: ['1. ...', 'The surprising line was...'],
  },
  deepen: {
    title: 'Share the checklist first',
    summary: 'Next time you ask for work, attach your checklist to the request, not to the review.',
  },
  notes: 'Ernesto Panadero & Anders Jonsson (2013), "The use of scoring rubrics for formative assessment purposes revisited: A review", Educational Research Review 9. Code-review checklists: standard engineering practice. Fictional details.',
};

export default lesson;
