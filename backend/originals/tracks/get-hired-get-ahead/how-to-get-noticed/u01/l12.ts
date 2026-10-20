import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 12 — skills that last as AI changes jobs (WEF Future of Jobs 2025). Card deck. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Skills that last',
  summary: 'Clinton\'s cousin says AI will do every graduate job in five years, so why bother? The world\'s employers have a different view about which skills are growing in value.',
  minutes: 11,
  outcomes: ['Name the skills employers expect to grow in importance', 'Explain why human skills matter more as AI spreads', 'Pick one lasting skill to build next'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Every few years, the World Economic Forum asks employers worldwide which skills matter most, and which are rising.</strong> In the <em>Future of Jobs Report 2025</em>, over 1,000 employers in 55 economies answered.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>The core skills today:</strong> analytical thinking came first, rated essential by about 7 in 10 employers. Then resilience, flexibility and agility; leadership and social influence; creative thinking; and motivation and self-awareness.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>The fastest-growing skills</strong> in the report are technology skills, led by AI and big data, networks and cybersecurity, and technological literacy. Close behind are very human ones: creative thinking, resilience, curiosity and lifelong learning.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>What that means for you:</strong> using technology well and thinking, adapting and working with people are both rising. AI is good at producing a first draft. Employers still need people who can judge it, explain it, lead others and keep learning when the tools change again.</p>',
    },
    {
      kind: 'check',
      question: 'In the WEF Future of Jobs Report 2025, which skill did employers rate most essential?',
      options: ['Typing speed', 'Analytical thinking', 'Memorising facts'],
      answer: 1,
      explanation: 'About 7 in 10 employers rated analytical thinking essential.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'The best combination: one technical skill you keep growing, plus the human skills that let you use it with people.',
    },
  ],
  apply: {
    scenario: 'Clinton answers his cousin.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'In the WEF 2025 list of growing or core skills, or not?',
        groups: ['On the list', 'Not on the list'],
        items: [
          { text: 'Analytical thinking', group: 0 },
          { text: 'Curiosity and lifelong learning', group: 0 },
          { text: 'Memorising exam answers', group: 1 },
          { text: 'Resilience, flexibility and agility', group: 0 },
          { text: 'Working alone and never asking questions', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'My cousin says AI will do all graduate jobs, so skills are pointless. Is he right?',
        options: [
          { text: 'Employers say the opposite: tech skills AND human skills like thinking, resilience and curiosity are rising in value.' },
          { text: 'Yes, give up.', why: 'The world\'s employers don\'t think so. They\'re hiring for exactly these skills.' },
          { text: 'AI will never change anything.', why: 'It is changing jobs. The question is which skills grow in value, and the report answers it.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What does the WEF report say about technology skills?',
        options: [
          { text: 'They\'re becoming less important', why: 'The opposite: AI and big data top the fastest-growing list.' },
          { text: 'AI and big data are among the fastest-growing skills' },
          { text: 'Only programmers need them', why: 'Technological literacy is rising across all kinds of jobs.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each skill to an example from Clinton\'s life.',
        pairs: [
          ['Resilience', 'Kept the meet-up going after losing its sponsor'],
          ['Curiosity and lifelong learning', 'Teaching himself video editing'],
          ['Leadership and social influence', 'Getting five captains to agree on fixtures'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that misreads the report.',
        lines: ['Analytical thinking is the top core skill.', 'Human skills don\'t matter now that there\'s AI.', 'AI and big data skills are growing fastest.'],
        bug: 1,
        explanation: 'Creative thinking, resilience and curiosity are on the growing list too. Human skills are rising, not disappearing.',
      },
      {
        kind: 'mcq',
        prompt: 'What can people do that employers still need, even when AI writes a first draft?',
        options: [
          { text: 'Judge it, explain it, lead others and keep learning' },
          { text: 'Nothing', why: 'Employers say they need people for exactly these things.' },
          { text: 'Type it out again by hand', why: 'That\'s not a skill employers are asking for.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'One [[1]] skill you keep growing, plus the [[2]] skills that let you use it with people.',
        blanks: [['technical'], ['human']],
        distractors: ['secret', 'robot', 'easy'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many employers out of 10 rated analytical thinking essential? (a number)',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Technology skill or human skill?',
        groups: ['Technology', 'Human'],
        items: [
          { text: 'Using AI tools well', group: 0 },
          { text: 'Creative thinking', group: 1 },
          { text: 'Cybersecurity basics', group: 0 },
          { text: 'Motivation and self-awareness', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which skill should Clinton build next, to complement his coding?',
        options: [
          { text: 'Explaining technical ideas to non-technical people, since he already does it at the phone stall' },
          { text: 'A fifth programming language he\'ll never use', why: 'More of the same. Pair his tech with a human skill.' },
          { text: 'Nothing, he\'s ready', why: 'Lifelong learning is literally on the list.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which skill from the WEF list will you build over the next year, and how?',
    starters: ['I\'ll build...', 'I\'ll do it by...'],
  },
  deepen: {
    title: 'Read the source',
    summary: 'Search for "Future of Jobs Report 2025 skills outlook" and look at the fastest-growing skills chart. Which one surprises you?',
  },
  notes: 'WEF Future of Jobs Report 2025 (January 2025), Chapter 3 Skills outlook: core skills led by analytical thinking (~7 in 10 employers), then resilience/flexibility/agility, leadership and social influence, creative thinking, motivation and self-awareness; fastest-growing skills led by AI and big data, networks and cybersecurity, technological literacy, with creative thinking, resilience/flexibility/agility, and curiosity and lifelong learning also rising. Checked 2026-10-20. No AI feature of Teyro is used (Phase One guard).',
};

export default lesson;
