import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 3 — long documents: section by section, then combine, keeping references. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Long documents, piece by piece',
  summary: 'Feed a 100-page document in one go and details get skimmed. Go section by section and nothing important slips.',
  minutes: 14,
  outcomes: [
    'Explain why very long documents get summarised badly',
    'Summarise section by section, then combine',
    'Keep section or page references so you can check',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The section-by-section method',
      steps: [
        {
          title: 'Get the map first',
          body: 'Ask for the structure before the content.',
          code: 'List the sections of this document with page numbers, and one line on what each covers.',
          language: 'plaintext',
        },
        {
          title: 'Pick the sections that matter to you',
          body: 'For an action summary for design, you might skip the methodology and the appendix.',
        },
        {
          title: 'Summarise each chosen section',
          body: 'One section at a time, with the same purpose and reader each time.',
          code: 'Summarise section 4 (pages 12-18) for a designer: findings, and what we should change. Keep page numbers.',
          language: 'plaintext',
        },
        {
          title: 'Combine and rank',
          body: 'Paste your section summaries back and ask for one ranked summary.',
          code: 'Combine these section summaries into one action list for a designer, most important first. Keep the page numbers.',
          language: 'plaintext',
        },
      ],
    },
    {
      kind: 'reading',
      title: 'Why long documents go wrong',
      html:
        '<p>AI tools can only take in a certain amount of text at once. Very long documents may not fit at all, or may get cut off without warning. Even when they do fit, a summary of 100 pages in one go has to compress hard, so details from the middle are the most likely to be squeezed out.</p>' +
        '<p>The fix is what a careful human reader does anyway: look at the contents, pick the parts that matter, read them properly, then pull it together. Asking for <strong>page or section numbers</strong> at every step means you can check any point in seconds.</p>' +
        '<p>One more thing: if a file is a scan or a photo, the AI may not be able to read all of it. If a summary seems to miss a whole section, ask: "Which pages could you read?"</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Map first, then pieces, then combine. And keep the page numbers all the way through.',
    },
    {
      kind: 'check',
      question: 'Which part of a long document is most likely to get squeezed out of a one-shot summary?',
      options: ['The title', 'Details from the middle', 'The first page'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is working through a 90-page research report.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the section-by-section method.',
        lines: ['Get the map of sections', 'Pick the sections that matter', 'Summarise each one', 'Combine and rank'],
      },
      {
        kind: 'mcq',
        prompt: 'Why can a one-shot summary of a very long document go wrong?',
        options: [
          { text: 'It may not all fit, and heavy compression squeezes out details' },
          { text: 'AI tools refuse long documents', why: 'They may try; the result is just thinner.' },
          { text: 'Long documents have no details', why: 'They have lots; that is the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the "map first" request.',
        tiles: ['List', 'the', 'sections', 'with', 'page', 'numbers'],
        distractors: ['skip', 'everything'],
      },
      {
        kind: 'sortGroups',
        prompt: 'For a design action summary, read closely or skip?',
        groups: ['Read closely', 'Skip for now'],
        items: [
          { text: 'Usability findings', group: 0 },
          { text: 'Research method details', group: 1 },
          { text: 'User quotes about sign-up', group: 0 },
          { text: 'Appendix: raw survey data', group: 1 },
          { text: 'Recommendations', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "I uploaded a 120-page contract and the AI's summary never mentions the termination section. Weird?",
        prompt: 'What should Ada suggest?',
        options: [
          { text: "There's probably no termination section.", why: 'Do not assume; long documents lose sections.' },
          { text: "Ask which pages it could read, then summarise the termination section on its own, with page numbers." },
          { text: 'Trust the summary.', why: 'A missing section is a red flag.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the section request.',
        template: 'Summarise section [[1]] (pages 12-18) for a [[2]]. Keep page [[3]].',
        blanks: [['4', 'four'], ['designer'], ['numbers']],
        distractors: ['900', 'magician', 'secret'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the step that makes checking impossible.',
        lines: ['List the sections with page numbers.', 'Summarise each key section.', 'Combine them, and remove all page numbers.', 'Rank by importance.'],
        bug: 2,
        fix: 'Combine them, keeping the page numbers.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Before the content, ask for the document\'s ... (one word)',
        answers: ['map', 'structure', 'sections', 'outline', 'contents'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request is best for the combine step?',
        options: [
          { text: 'Make one summary.', why: 'No reader, no ranking, no references.' },
          { text: 'Combine these section summaries into one action list for a designer, most important first, keeping page numbers.' },
          { text: 'Rewrite the whole report shorter.', why: 'Starts over instead of combining.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to the fix.',
        pairs: [
          ['Too long to fit', 'Go section by section'],
          ['A section seems missing', '"Which pages could you read?"'],
          ['Cannot check a claim', 'Keep page numbers'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'One-shot summary is fine, or go section by section?',
        groups: ['One shot is fine', 'Section by section'],
        items: [
          { text: 'A 2-page memo', group: 0 },
          { text: 'A 90-page research report', group: 1 },
          { text: 'A one-page email', group: 0 },
          { text: 'A 120-page contract', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Your summary says 'users want dark mode (p.44)'. I checked page 44 and it's about pricing!",
        prompt: 'What should Ada do?',
        options: [
          { text: 'Insist it is on page 44.', why: 'She checked. Look again.' },
          { text: 'Remove all page numbers.', why: 'Page numbers are how she caught it. Keep them, fix this one.' },
          { text: "Thank Lucía, find the real page (or remove the claim if it isn't in the report), and check other references too." },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If a file is a scan or photo, the AI may not be able to ... all of it (one word)',
        answers: ['read', 'see'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to its request.',
        pairs: [
          ['Map', '"List the sections with page numbers"'],
          ['Pieces', '"Summarise section 4 for a designer"'],
          ['Combine', '"One ranked list, keep page numbers"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What do page numbers give you at every step?',
        options: [
          { text: 'A longer summary', why: 'They are for checking, not length.' },
          { text: 'A way to check any point in seconds' },
          { text: 'Nothing useful', why: 'They are how you catch mistakes.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What is the longest document you have to deal with at work? Which sections actually matter to you?',
    starters: ['The document is...', 'The sections that matter are...'],
  },
  deepen: { title: 'Try it today', summary: 'Ask an AI tool for the section map of a long document before asking for any summary.' },
  notes: 'Context-length limits and lossy compression of long inputs described generally, without product-specific numbers.',
};

export default lesson;
