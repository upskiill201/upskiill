import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Reading: editing with AI. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Editing with AI',
  summary: 'Felix edits everything with an AI chatbot now. Zanele wants to know: does it help, and what can go wrong? She reads the research.',
  minutes: 12,
  outcomes: [
    'Know what research says about AI and writing',
    'Use AI as an editor, not an author',
    'Check facts and protect private data',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'What the research says',
      html: '<p>In 2023, economists Shakked Noy and Whitney Zhang ran an experiment, published in <em>Science</em>, with 453 college-educated professionals doing realistic writing tasks such as press releases, short reports and emails.</p><ul><li>People given access to ChatGPT finished about <strong>40% faster</strong>.</li><li>Their work was rated about <strong>18% higher</strong> in quality.</li></ul><p>That\'s a real gain. But AI tools can also state wrong facts confidently, and they don\'t know your reader, your numbers or your company. So three rules:</p><ul><li><strong>You own it.</strong> Your name is on the message. Read every line as if you wrote it.</li><li><strong>Check every fact.</strong> Numbers, names, dates. If the tool "improved" 28% into 23%, the email is now wrong.</li><li><strong>Protect private data.</strong> Don\'t paste customer names, salaries or confidential numbers into a tool your company hasn\'t approved.</li></ul><p>Good uses: "Make this shorter", "Find jargon", "Suggest a clearer subject line". Then use your checklist on the result.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'AI can make you faster and clearer. You still own it, check every fact, and keep private data out.',
    },
  ],
  apply: {
    scenario: 'Editing with AI.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'About how much faster did people with ChatGPT finish in Noy and Zhang\'s study? (a percentage)',
        answers: ['40', '40%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'In which journal was the study published?',
        options: [
          { text: 'A company blog', why: 'It was in Science.' },
          { text: 'Science' },
          { text: 'It wasn\'t published', why: 'Science, 2023.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good use of AI, or a risk?',
        groups: ['Good use', 'Risk'],
        items: [
          { text: '"Make this shorter"', group: 0 },
          { text: 'Pasting customer names into an unapproved tool', group: 1 },
          { text: '"Find the jargon in this"', group: 0 },
          { text: 'Sending the result without reading it', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the rule to what it means.',
        pairs: [
          ['You own it', 'Read every line as if you wrote it'],
          ['Check every fact', 'Numbers, names and dates'],
          ['Protect private data', 'Only approved tools for confidential data'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'The AI rewrote my ops report. It sounds great, so I sent it.',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: 'Perfect, AI is always right.', why: 'It can state wrong facts.' },
          { text: 'Never use AI.', why: 'It helps, with checks.' },
          { text: 'Did you check the numbers? Tools can change facts while "improving" the wording. Sounding great isn\'t the same as being right.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rules.',
        template: 'You [[1]] it. Check every [[2]].',
        blanks: [['own'], ['fact']],
        distractors: ['delete', 'adjective'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how much higher was quality rated with ChatGPT? (a percentage)',
        answers: ['18', '18%'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'The AI edited Zanele\'s week 9 email. Which line did it get wrong?',
        lines: [
          'Subject: Saturday pilot, week 9: late deliveries rose to 28%',
          'Two Saturday drivers left for a courier firm.',
          'Late deliveries rose to 23% this week.',
          'I\'ll send week 10 next Tuesday.',
        ],
        bug: 2,
        fix: 'Late deliveries rose to 28% this week.',
        explanation: 'The tool changed the number. Always check facts.',
      },
      {
        kind: 'mcq',
        prompt: 'What should Zanele do after AI edits her draft?',
        options: [
          { text: 'Send it straight away', why: 'Check it first.' },
          { text: 'Run her plain checklist on the result' },
          { text: 'Ask AI if it\'s correct', why: 'She checks the facts herself.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a safe AI edit.',
        lines: ['Write your own draft', 'Ask for a specific edit', 'Read every line', 'Check every fact', 'Run your checklist'],
      },
    ],
  },
  reflect: {
    prompt: 'If you use AI for writing, which of the three rules do you skip most often?',
    starters: ['I usually skip...', 'From now on...'],
  },
  deepen: {
    title: 'Faster isn\'t the goal',
    summary: 'The time saved is real. Spend some of it on the checks: the facts, the reader, the ask. That\'s where your judgement still matters most.',
  },
  notes: 'Noy & Zhang (2023), Science 381(6654), "Experimental evidence on the productivity effects of generative artificial intelligence": 453 college-educated professionals; ChatGPT access cut time ~40% and raised quality ~18%. AI here is an external tool learners may use; Teyro does not run it.',
};

export default lesson;
