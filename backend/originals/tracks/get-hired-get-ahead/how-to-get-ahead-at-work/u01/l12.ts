import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 12 — the unwritten rules of a workplace. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'The unwritten rules',
  summary: 'Nobody told Clinton that "quick call?" means "now", that Friday deploys are frowned on, or that the support lead hates being cc\'d. Every workplace has unwritten rules. Here\'s how to find them before you break them.',
  minutes: 11,
  outcomes: ['Notice unwritten rules early', 'Ask about them safely', 'Adapt without losing yourself'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>1. Communication.</strong> Which channel for what (chat for quick things, email for decisions), how fast people expect replies, and whether "quick call?" means now or later. Watch what experienced people do.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>2. Meetings.</strong> Do people arrive on time or five minutes late? Are cameras on? Does anyone speak before the most senior person? Clinton notices Ngozi always asks the newest person first. That\'s a signal she wants to hear from him.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>3. How decisions get made.</strong> Who really decides, who needs to be consulted, and what "let me think about it" means. At Njangi Pay, anything touching payments needs Paul\'s review, even if that\'s not written anywhere.</p>',
    },
    {
      kind: 'check',
      question: 'Clinton isn\'t sure whether it\'s OK to deploy on a Friday afternoon. What should he do?',
      options: ['Just deploy', 'Ask a teammate how the team usually handles it', 'Never deploy again'],
      answer: 1,
      explanation: 'Asking about norms is normal, and much better than guessing.',
    },
    {
      kind: 'text',
      html: '<p><strong>4. Time and presence.</strong> When people really start and finish, whether lunch is together or alone, how leave is requested. These vary a lot by company and country.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>5. How to find them.</strong> Watch for two weeks. Ask a friendly teammate: "Is there anything people usually learn the hard way here?" It\'s one of the most useful questions a new person can ask.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Watch, then ask: "Is there anything people usually learn the hard way here?"',
    },
  ],
  apply: {
    scenario: 'Clinton learns the unwritten rules.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which kind of unwritten rule?',
        groups: ['Communication', 'Decisions'],
        items: [
          { text: '"Quick call?" means now', group: 0 },
          { text: 'Payments changes need Paul\'s review', group: 1 },
          { text: 'Email for decisions, chat for quick things', group: 0 },
          { text: 'Ngozi decides priorities on Mondays', group: 1 },
          { text: 'Reply to chat the same morning', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the most useful question for finding unwritten rules?',
        options: [
          { text: '"Are there any rules?"', why: 'Too vague. Ask what people learn the hard way.' },
          { text: '"Is there anything people usually learn the hard way here?"' },
          { text: '"Who\'s the boss?"', why: 'Ask what people learn the hard way.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each rule to what Clinton noticed.',
        pairs: [
          ['Ngozi asks the newest first', 'She wants to hear from him'],
          ['Friday deploys frowned on', 'Ask before deploying late in the week'],
          ['Support lead hates cc', 'Message her directly instead'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I accidentally cc\'d the whole team on a tiny question. Disaster?',
        options: [
          { text: 'Yes, I should resign.', why: 'Small mistakes are how everyone learns norms.' },
          { text: 'Do it again to show I don\'t care.', why: 'Adapt to the norm.' },
          { text: 'Not a disaster. I\'ll note the norm, ask a teammate how they handle it, and do better next time.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the risky assumption.',
        lines: ['I\'ll watch how others do it for two weeks.', 'My last job did it this way, so it must be the same here.', 'I\'ll ask a teammate.'],
        bug: 1,
        explanation: 'Every workplace differs. Watch and ask.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s approach in order.',
        lines: ['Watch for two weeks', 'Note what surprises him', 'Ask a friendly teammate', 'Adapt, without losing himself'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why might norms about time and leave differ?',
        options: [
          { text: 'They vary a lot by company and country' },
          { text: 'They\'re the same everywhere', why: 'They vary a lot.' },
          { text: 'They don\'t matter', why: 'They matter day to day.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: '[[1]], then ask what people learn the [[2]] way.',
        blanks: [['Watch'], ['hard']],
        distractors: ['Guess', 'easy', 'fast'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'For how many weeks should Clinton watch before assuming? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Written rule, or unwritten?',
        groups: ['Written', 'Unwritten'],
        items: [
          { text: 'The leave policy document', group: 0 },
          { text: 'Nobody speaks before Ngozi in planning', group: 1 },
          { text: 'The security policy', group: 0 },
          { text: 'Cameras usually on in team calls', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What unwritten rule did you learn the hard way somewhere (school, work, a family event)?',
    starters: ['I learned the hard way that...', 'If someone had told me...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask one person where you work or study: "Is there anything people usually learn the hard way here?" Write down the answer.',
  },
  notes: 'Workplace norms vary by organisation and culture; the lesson teaches how to discover them, not specific rules.',
};

export default lesson;
