import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 6 — explaining an idea visually. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Explaining an idea visually',
  summary: 'How does a payment move from a shopper to a shop? Words take a paragraph. One simple visual takes a glance. Tap Ada\'s visual to see how it works.',
  minutes: 12,
  outcomes: [
    'Turn an explanation into a simple visual',
    'Ask AI to suggest the right visual form',
    'Keep visuals simple enough to read in seconds',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s "how a payment works" visual',
      text: 'Three boxes in a row with arrows: Shopper scans code, App sends payment, Shop gets money. Under the last arrow: "next morning (settlement)". One box is highlighted in orange: App sends payment.',
      hotspots: [
        { phrase: 'Three boxes in a row', note: 'A process is best shown as steps left to right. Three to five boxes, not twelve.' },
        { phrase: 'with arrows', note: 'Arrows show order and direction. People follow them without being told.' },
        { phrase: 'next morning (settlement)', note: 'A small label adds the detail that matters to founders: when shops get paid.' },
        { phrase: 'highlighted in orange', note: 'Highlight the one step you\'re talking about. Everything else stays plain.' },
        { phrase: 'App sends payment', note: 'Short labels, verb first. A visual is not a paragraph in boxes.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask AI: "What\'s the simplest visual to explain this: steps, a comparison, a cycle or a map?" Then keep it to 3-5 parts with short labels.',
    },
  ],
  apply: {
    scenario: 'Ada designs a visual for the founders.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to the best visual form.',
        pairs: [
          ['How a payment moves', 'Steps with arrows'],
          ['Old way vs new way', 'Side-by-side comparison'],
          ['Weekly review habit', 'A cycle'],
          ['Where the pilot shops are', 'A map'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How many boxes should a simple process visual have?',
        options: [
          { text: 'About 3 to 5' },
          { text: '12 or more', why: 'Too many to read in seconds.' },
          { text: 'Just 1', why: 'A process needs steps.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the most useful visual idea?',
        options: [
          { text: 'Make a picture.', why: 'No idea to explain.' },
          { text: 'I need founders to understand how a payment moves from shopper to shop in 5 seconds. What\'s the simplest visual: steps, comparison, cycle or map? Suggest 3-5 short labels.' },
          { text: 'Make it colourful.', why: 'Colour isn\'t clarity.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good visual label, or too long?',
        groups: ['Good label', 'Too long'],
        items: [
          { text: 'Shop gets money', group: 0 },
          { text: 'The funds are subsequently transferred to the merchant account', group: 1 },
          { text: 'Shopper scans code', group: 0 },
          { text: 'A QR code is presented by the merchant and scanned by the customer', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can you add every technical step to the payment diagram?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'For founders, three boxes is clearer. I\'ll keep the full technical version as a backup slide in case they ask.' },
          { text: 'Sure, all 14 steps.', why: 'Too much to read in a glance.' },
          { text: 'No diagrams at all.', why: 'A simple one helps a lot.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Keep it to [[1]]-5 parts with [[2]] labels.',
        blanks: [['3', 'three'], ['short']],
        distractors: ['20', 'long'],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of the visual plan is a problem?',
        lines: [
          'Three boxes, left to right',
          'Arrows between them',
          'Every box highlighted in a different bright colour',
          'A small "next morning" label',
        ],
        bug: 2,
        fix: 'Highlight only the step being discussed.',
        explanation: 'If everything is highlighted, nothing stands out.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the three box labels in order.',
        tiles: ['Shopper', 'scans,', 'app', 'sends,', 'shop', 'gets', 'paid'],
        distractors: ['subsequently'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many boxes are in Ada\'s visual?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s visual design.',
        lines: ['Decide what to explain', 'Ask AI for the simplest form', 'Write 3-5 short labels', 'Highlight the key step'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps the visual, or hurts it?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'Arrows showing order', group: 0 },
          { text: 'Clip-art in every corner', group: 1 },
          { text: 'One highlighted step', group: 0 },
          { text: 'Tiny text', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why keep a detailed version as a backup slide?',
        options: [
          { text: 'You can answer technical questions without cluttering the main slide' },
          { text: 'To show off', why: 'It\'s for questions.' },
          { text: 'Founders always want detail', why: 'Only if they ask.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s something at work you explain in a long paragraph? Sketch it as 3-5 boxes.',
    starters: ['The idea:', 'Box 1:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI for the simplest visual form for one thing you explain often. Sketch it on paper first.' },
  notes: 'General visual-communication guidance (signalling and coherence, Mayer).',
};

export default lesson;
