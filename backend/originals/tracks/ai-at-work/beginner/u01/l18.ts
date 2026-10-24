import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 18 — five everyday requests, one card each. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Five prompts for every workday',
  summary: 'Reply, summarise, tighten, get options, find the gaps. Five requests that cover most of a working day.',
  minutes: 12,
  outcomes: [
    'Use five ready-made requests for everyday work',
    'Adapt each one with the right reader, facts and length',
    'Know which one fits which moment',
  ],
  learn: [
    {
      kind: 'text',
      html: '<h3>1. Reply to this</h3><p>For any message you need to answer. Paste the message, then:</p>',
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'Reply to this for me. [Tone], under [N] lines.\nSay: [your answer and the facts].\nEnd with: [the question or next step].',
      caption: 'Ada uses this one most.',
    },
    {
      kind: 'text',
      html: '<h3>2. Summarise this for someone</h3><p>For long emails, notes or documents. Always say who the summary is for.</p>',
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'Summarise this for [reader] in [N] bullets:\ndecisions, who owns what, deadlines.\nOnly use what is in the text.',
    },
    {
      kind: 'text',
      html: '<h3>3. Make this clearer</h3><p>For your own drafts. Protect what must stay.</p>',
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'Make this clearer and about half the length.\nKeep all the facts and my tone.\nShow me what you changed.',
    },
    {
      kind: 'text',
      html: '<h3>4. Give me options</h3><p>For anything with a "best way to say it": subject lines, openings, titles.</p>',
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'Give me 3 versions of [thing] for [reader],\neach in a different style: [style 1], [style 2], [style 3].\nWhich would you pick, and why?',
    },
    {
      kind: 'text',
      html: '<h3>5. What am I missing?</h3><p>Before sending anything important. Ask it to read like the reader.</p>',
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'Read this as [reader] would.\nWhat is unclear, missing, or likely to cause a question?\nList up to 3 things, most important first.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Save all five in your phone note from Lesson 17. Together they cover most of a working day.',
    },
    {
      kind: 'check',
      question: 'Ada wants to check her proposal before sending it to her manager. Which prompt?',
      options: ['Reply to this', 'Give me options', 'What am I missing?'],
      answer: 2,
    },
  ],
  apply: {
    scenario: "A normal Wednesday in Ada's job.",
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the prompt.',
        pairs: [
          ['A message to answer', 'Reply to this'],
          ['A long email thread', 'Summarise this for someone'],
          ['Your own messy draft', 'Make this clearer'],
          ['Need a subject line', 'Give me options'],
          ['About to send something big', 'What am I missing?'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What must a "summarise this" request always include?',
        options: [{ text: 'Who the summary is for' }, { text: 'An emoji', why: 'Never needed.' }, { text: 'The word "please"', why: 'Fine, but not what makes it work.' }],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the "what am I missing" request.',
        tiles: ['Read', 'this', 'as', 'my', 'manager', 'would'],
        distractors: ['ignore', 'never'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which prompt fits?',
        groups: ['Reply to this', 'Summarise this', 'Make this clearer'],
        items: [
          { text: 'Lucía asked if Thursday works', group: 0 },
          { text: 'A 40-message email thread you missed', group: 1 },
          { text: 'Your own update, which feels long', group: 2 },
          { text: 'A colleague asks for the files', group: 0 },
          { text: 'A 10-page report before a meeting', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "I'm sending you our 12-page brand guide. Could you tell me the 3 things your designers must know?",
        prompt: 'Which request should Ada give the AI (with the guide attached or pasted)?',
        options: [
          { text: 'Summarise this.', why: 'For whom? How many points? What matters?' },
          { text: 'Summarise this brand guide for our designers in 3 bullets: the rules they must follow. Only use what is in the guide.' },
          { text: 'Write a new brand guide.', why: 'She asked for a summary of hers.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the "make this clearer" request.',
        template: 'Make this clearer and about [[1]] the length. Keep all the [[2]] and my [[3]].',
        blanks: [['half'], ['facts'], ['tone']],
        distractors: ['double', 'typos'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Name the prompt you use before sending something important: "What am I ...?"',
        answers: ['missing'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Spot the line that could add invented facts to a summary.',
        lines: ['Summarise this thread for my manager.', 'In 4 bullets: decisions, owners, deadlines.', 'Add any other details you think are likely.'],
        bug: 2,
        fix: 'Only use what is in the thread.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which "give me options" request is best for a meeting invite title?',
        options: [
          { text: 'Give me options.', why: 'Options for what, for whom?' },
          { text: 'Give me 3 titles for a 30-minute meeting invite to the design team about the new colours: one plain, one curious, one short. Which would you pick?' },
          { text: 'Give me 30 titles.', why: 'Too many, probably similar.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: "Order Ada's morning using the five prompts.",
        lines: [
          'Summarise the overnight email thread',
          'Reply to Lucía\'s question',
          'Make her own update clearer',
          'Check it with "what am I missing?"',
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good use, or wrong prompt for the job?',
        groups: ['Good use', 'Wrong prompt'],
        items: [
          { text: '"Give me options" for a subject line', group: 0 },
          { text: '"Reply to this" for a 10-page report', group: 1 },
          { text: '"What am I missing?" before a big proposal', group: 0 },
          { text: '"Make this clearer" for a message you have not written yet', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Before you send the launch plan to my boss, can you make sure nothing obvious is missing?',
        prompt: 'Which request should Ada use?',
        options: [
          { text: 'Is this plan good?', why: 'It will probably just say yes.' },
          { text: 'Rewrite the whole plan.', why: 'She asked for a check, not a rewrite.' },
          { text: "Read this plan as a busy marketing director would. What is unclear or missing? Up to 3 things." },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many everyday prompts did you just learn? (number)',
        answers: ['5', 'five'],
        placeholder: 'Number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each prompt to its key protection.',
        pairs: [
          ['Summarise this', '"Only use what is in the text"'],
          ['Make this clearer', '"Keep all the facts"'],
          ['What am I missing?', '"Up to 3 things"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask "show me what you changed" when making a draft clearer?',
        options: [
          { text: 'So you can spot if it changed a fact or the meaning' },
          { text: 'To make the answer longer', why: 'It is about checking, not length.' },
          { text: 'Because it is polite', why: 'It is about catching unwanted changes.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of the five prompts will you use first tomorrow, and for what?',
    starters: ['Tomorrow I will use...', 'For...'],
  },
  deepen: { title: 'Do it now', summary: 'Add the five prompts to your saved note. Try each one at least once this week.' },
  notes: 'Prompt templates are Teyro-authored. "Attached or pasted" kept generic since file upload varies by tool.',
};

export default lesson;
