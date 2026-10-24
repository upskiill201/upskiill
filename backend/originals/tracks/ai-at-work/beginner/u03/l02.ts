import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 2 — the reader decides what goes into a summary. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Summarise for a specific person',
  summary: 'The same report gives a different summary for a director, a developer and a client. The reader decides what stays.',
  minutes: 13,
  outcomes: [
    'Describe the reader of a summary in one line',
    'Predict what each reader needs from the same source',
    'Ask for several reader-specific summaries at once',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'One research report, two summaries',
      before: {
        label: 'For the director',
        text: 'Users drop off at the email step of sign-up (most mentioned issue). Fixing it is low cost and could lift sign-ups. Recommend: fix before launch.',
      },
      after: {
        label: 'For the developers',
        text: 'Email field: users miss the error message (p.12), autofill breaks on some phones (p.14), and the "Next" button is below the keyboard (p.15). Repro steps on p.31.',
      },
      notes: [
        'The director gets impact and a recommendation.',
        'The developers get specifics and where to find them.',
        'Same source; the reader decided what stayed.',
      ],
    },
    {
      kind: 'reading',
      title: 'What different readers look for',
      html:
        '<ul>' +
        '<li><strong>Decision-makers:</strong> conclusions, impact (money, time, risk, customers), a recommendation.</li>' +
        '<li><strong>Doers</strong> (developers, designers, operations): specifics, steps, where to find details.</li>' +
        '<li><strong>Clients and outsiders:</strong> what changes for them, in plain words, without internal detail.</li>' +
        '<li><strong>New people:</strong> context and definitions, so the rest makes sense.</li>' +
        '</ul>' +
        '<p>A good summary request names the reader and what they will do with it: <em>"Summarise this for our developers, who will fix the issues this sprint: each problem, where it happens, page number."</em></p>' +
        '<p>Need several? Ask once: <em>"Give me three short summaries of this: one for the director, one for developers, one for our client."</em></p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The reader decides what goes in. Name them every time.',
    },
    {
      kind: 'check',
      question: 'What does a decision-maker usually want from a summary?',
      options: ['Every detail with page numbers', 'Conclusions, impact and a recommendation', 'Definitions of basic terms'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is summarising the same report for different people.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the reader to what they need.',
        pairs: [
          ['Director', 'Impact and a recommendation'],
          ['Developers', 'Specifics and page numbers'],
          ['Client', 'What changes for them, plainly'],
          ['New colleague', 'Context and definitions'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which summary does each line belong in?',
        groups: ['Director', 'Developers'],
        items: [
          { text: 'Recommend fixing before launch', group: 0 },
          { text: 'Autofill breaks on some phones (p.14)', group: 1 },
          { text: 'Low cost, could lift sign-ups', group: 0 },
          { text: 'Repro steps on p.31', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can one summary rarely serve a director and developers?',
        options: [
          { text: 'Directors cannot read bullet points', why: 'They can; they need different content.' },
          { text: 'Developers do not read summaries', why: 'They do, when they are specific.' },
          { text: 'They need different things: impact vs specifics' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the multi-summary request.',
        tiles: ['Give', 'me', 'three', 'summaries:', 'director,', 'developers,', 'client'],
        distractors: ['nobody'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Could you send me a summary of the research I can share with our customers? Nothing internal, please.',
        prompt: 'Which request should Ada give the AI?',
        options: [
          { text: 'Summarise this for customers: what we learned and what we are improving for them, plain words, no internal details or numbers.' },
          { text: 'Summarise this.', why: 'Might include internal details.' },
          { text: 'Forward the full report.', why: 'She asked for nothing internal.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s developer summary request.',
        template: 'Summarise this for our [[1]], who will fix the issues this sprint: each [[2]], where it happens, and the page [[3]].',
        blanks: [['developers'], ['problem', 'issue'], ['number']],
        distractors: ['customers', 'joke', 'colour'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the line that should not go in a summary for customers.',
        lines: ['We heard that sign-up felt slow on phones.', "We're making it faster in the next update.", 'Internal cost estimate: 3 developer weeks.', 'Thanks for helping us improve!'],
        bug: 2,
        explanation: 'Internal costs are not for customers.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who decides what goes into a summary? The ... (one word)',
        answers: ['reader', 'audience'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Grace starts Monday and needs to understand the research. Which request?',
        options: [
          { text: 'Summarise the research.', why: 'No reader: it may skip the context Grace needs.' },
          { text: "Summarise this for a new designer on her first week: the project in 2 lines, then the 5 key findings, with any jargon explained." },
          { text: 'Send Grace the full 40 pages.', why: 'Too much on day one.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps for a reader-specific summary.',
        lines: ['Name the reader', 'Say what they will do with it', 'Pick what to include for them', 'Set the length'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good for a client summary, or keep internal?',
        groups: ['Client summary', 'Keep internal'],
        items: [
          { text: "What we're improving for them", group: 0 },
          { text: 'Which developer caused the bug', group: 1 },
          { text: 'When the improvement arrives', group: 0 },
          { text: 'Our internal budget', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "My CEO and my team both need the research summary today. Two different emails?",
        prompt: 'What should Ada suggest?',
        options: [
          { text: 'One long summary for both.', why: 'Too long for the CEO, too vague for the team.' },
          { text: 'Only send it to the CEO.', why: 'The team needs it too.' },
          { text: 'Yes: ask the AI for two summaries in one go, one for the CEO (impact, recommendation) and one for the team (specifics).' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Doers like developers want ... (one word: specifics or impact?)',
        answers: ['specifics', 'details', 'detail'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the summary line to its reader.',
        pairs: [
          ['"Recommend: fix before launch"', 'Director'],
          ['"Error message is hard to see (p.12)"', 'Developers'],
          ['"Sign-up will be faster soon"', 'Customers'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is the fastest way to get summaries for three readers?',
        options: [
          { text: 'Write them yourself from scratch', why: 'The AI can do the first drafts in one go.' },
          { text: 'Ask for all three in one request, each named' },
          { text: 'Send everyone the same one', why: 'Each reader needs different things.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you summarised recently. Who was it really for, and what did they need that you might have left out?',
    starters: ['It was for...', 'They needed...'],
  },
  deepen: { title: 'Try it today', summary: 'Ask for two summaries of the same thing for two different readers, and compare them.' },
  notes: 'Research findings and page numbers are fictional story details.',
};

export default lesson;
