import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: Arjun's thank-you and reference note for Kavya, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: the reference',
  summary: 'Day 31. Arjun writes Kavya the reference letter she was hoping for. It\'s short. She reads it three times and sends it to her mother. Tap through to see the whole course in one paragraph.',
  minutes: 11,
  outcomes: [
    'See the whole course in one short note',
    'Write recognition that\'s specific to the expectations met',
    'Be honest about growth, not just praise',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Reference for Kavya, from Arjun',
      text: 'Kavya built every product page for Mr Rao\'s Diwali shop: 600 orders on launch day, all on cheap phones, in Hindi and English. When my brief was unclear, she asked. When a date was at risk, she told me early, with options. She met every item on our quality checklist and showed her work at 30%, which saved us days. She grew fast: by Day 30 she was ready to own design decisions herself. I\'d hire her again tomorrow, and I am.',
      hotspots: [
        { phrase: '600 orders on launch day, all on cheap phones, in Hindi and English', note: 'The definition of done, met, with the impact it made possible.' },
        { phrase: 'When my brief was unclear, she asked.', note: 'Owning his gap, even in a reference. And praising the behaviour he wanted more of.' },
        { phrase: 'When a date was at risk, she told me early, with options.', note: 'The Day 18 lesson, turned into a strength she can be proud of.' },
        { phrase: 'She met every item on our quality checklist', note: 'Recognition tied to the bar, not vague praise.' },
        { phrase: 'showed her work at 30%, which saved us days', note: 'The early-check habit, credited with its impact.' },
        { phrase: 'by Day 30 she was ready to own design decisions herself', note: 'High, honest expectations: the Pygmalion effect, written down.' },
        { phrase: 'I\'d hire her again tomorrow, and I am.', note: 'The unwritten deal (a reference) kept, and a new project offered.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A good reference: what they delivered, with impact; the habits that made it work; how they grew; and what you\'d do next with them.',
    },
  ],
  apply: {
    scenario: 'Line check, the reference.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Kavya read it three times?',
        options: [
          { text: 'It was very long', why: 'It\'s one paragraph.' },
          { text: 'It was confusing', why: 'It was clear.' },
          { text: 'It was specific: real results, real habits, real growth' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the course is it?',
        groups: ['Done and quality', 'Safe to speak up', 'Growth'],
        items: [
          { text: 'Hindi and English, on cheap phones', group: 0 },
          { text: '"When my brief was unclear, she asked."', group: 1 },
          { text: 'Ready to own design decisions', group: 2 },
          { text: 'Every checklist item met', group: 0 },
          { text: '"She told me early, with options."', group: 1 },
          { text: '"I\'d hire her again."', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'You put the Day 18 thing in as a GOOD thing?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'It is a good thing. After Day 18 you told me every risk early. That\'s rarer than speed.' },
          { text: 'I was being nice.', why: 'It\'s true, not just nice.' },
          { text: 'Should I remove it?', why: 'It\'s one of the best lines.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kavya\'s unwritten expectation, finally met: a ___ letter. (one word)',
        answers: ['reference', 'Reference'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why mention "When my brief was unclear"?',
        options: [
          { text: 'To criticise himself publicly', why: 'It\'s to credit her habit honestly.' },
          { text: 'It\'s honest, and it praises the asking he wants more of' },
          { text: 'It\'s a mistake', why: 'It makes the reference believable.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Draft 1 of the reference. Which line is too vague?',
        lines: [
          'Kavya built every product page for the Diwali shop.',
          'She is a hard worker and a great team player.',
          'She showed her work at 30%, which saved us days.',
        ],
        bug: 1,
        fix: 'When a date was at risk, she told me early, with options.',
        explanation: '"Hard worker, great team player" could be about anyone.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a good reference in order.',
        lines: ['What they delivered', 'The impact', 'The habits that made it work', 'How they grew', 'What you\'d do next'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the chapter.',
        pairs: [
          ['"In Hindi and English"', 'Chapter 1: definition of done'],
          ['"Showed her work at 30%"', 'Chapter 3: early checks'],
          ['"Told me early, with options"', 'Chapter 3: no quiet trade-offs'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Specific [[1]], real [[2]], honest growth.',
        blanks: [['results'], ['habits']],
        distractors: ['adjectives', 'excuses'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the last line.',
        tiles: ['I\'d', 'hire', 'her', 'again', 'tomorrow.'],
        distractors: ['never'],
      },
    ],
  },
  reflect: {
    prompt: 'Write a five-sentence reference for someone you\'ve worked or studied with: what they delivered, the impact, their habits, their growth, what you\'d do next.',
    starters: ['They delivered...', 'Their best habit was...'],
  },
  deepen: {
    title: 'Write one unprompted',
    summary: 'Write a short, specific reference or thank-you for someone who\'d never ask for one. Send it.',
  },
  notes: 'Synthesis of the whole course: definition of done, safe questions, quality checklist, early checks, visible trade-offs, recognition tied to expectations, psychological contract kept, Pygmalion-style high expectations. Fictional reference.',
};

export default lesson;
