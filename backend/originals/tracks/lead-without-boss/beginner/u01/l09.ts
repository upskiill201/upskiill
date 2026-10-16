import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: Remi's thank-you note after the listening tour, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: Remi\'s thank-you note',
  summary: 'Friday morning. Before the kick-off invite goes out, Remi sends Njeri a short thank-you. She forwards it to her whole warehouse team with one word: "See?" Tap through to see why it worked.',
  minutes: 11,
  outcomes: [
    'See every Chapter 1 tool in one short note',
    'Write a thank-you that builds trust, not just politeness',
    'Turn a conversation into an ally',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Remi to Njeri, Friday 8:40 a.m.',
      text: 'Hi Njeri, thank you for Tuesday. You showed me something nobody in head office knew: returned boxes wait a week for a signature. That one delay is a third of the problem. I don\'t know yet how we fix it, and I\'d rather work it out with you than guess. Would you tell the signature story at Monday\'s 30-minute meeting? If not, I\'ll tell it and say where it came from. Remi',
      hotspots: [
        { phrase: 'thank you for Tuesday', note: 'Closing the loop the same week: step 5 of the listening tour.' },
        { phrase: 'You showed me something nobody in head office knew', note: 'Credit to her expertise. This builds referent power: people like being seen.' },
        { phrase: 'That one delay is a third of the problem.', note: 'Expert and informational power: Remi did the maths and explains it simply.' },
        { phrase: 'I don\'t know yet how we fix it', note: 'Honest about what he doesn\'t know. Credibility, not bluffing.' },
        { phrase: 'I\'d rather work it out with you than guess', note: 'Not the solo trap. She\'s invited into the fix.' },
        { phrase: 'Would you tell the signature story', note: 'Building the coalition: let the person who lives it tell it.' },
        { phrase: 'If not, I\'ll tell it and say where it came from.', note: 'An easy way out, and a promise of credit either way.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A trust-building thank-you: say what you learned from them, why it matters, what you don\'t know, and invite them in.',
    },
  ],
  apply: {
    scenario: 'Line check, Friday.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Njeri forward it to her whole team?',
        options: [
          { text: 'It was funny', why: 'It\'s warm, not funny.' },
          { text: 'Remi asked her to', why: 'He didn\'t.' },
          { text: 'It credited the warehouse\'s knowledge to head office' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 1 tool is it?',
        groups: ['Credibility', 'Listening tour', 'Coalition'],
        items: [
          { text: '"I don\'t know yet"', group: 0 },
          { text: '"Thank you for Tuesday"', group: 1 },
          { text: '"Would you tell the story?"', group: 2 },
          { text: '"A third of the problem"', group: 0 },
          { text: '"You showed me..."', group: 1 },
          { text: '"Rather work it out with you"', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'njeri',
        message: 'Me? Talk in a head-office meeting? I\'ve never done that.',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Two minutes, just the box story, like you told me. I\'ll be right there.' },
          { text: 'You have to, it\'s important.', why: 'Pressure. She doesn\'t report to you.' },
          { text: 'Okay, forget it.', why: 'Give her support before giving up.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Saying "thank you for Tuesday" closes the ___. (one word)',
        answers: ['loop', 'Loop'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why say "I don\'t know yet how we fix it"?',
        options: [
          { text: 'It sounds weak, so it\'s a mistake', why: 'Honesty builds credibility.' },
          { text: 'It\'s honest, and it leaves room for her ideas' },
          { text: 'To make her do the work', why: 'It\'s an invitation, not a hand-off.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Draft 1 of the note. Which line costs trust?',
        lines: [
          'Thank you for Tuesday.',
          'I\'ll present the signature problem as my finding on Monday.',
          'Would you join the 30-minute meeting?',
        ],
        bug: 1,
        fix: 'I\'ll make sure everyone knows it came from the warehouse.',
        explanation: 'Taking credit for her knowledge loses an ally on day five.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the note in order.',
        lines: ['Thank them', 'Say what you learned', 'Say why it matters', 'Invite them in'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the power it builds.',
        pairs: [
          ['"A third of the problem"', 'Expert'],
          ['"You showed me..."', 'Referent'],
          ['"I don\'t know yet"', 'Credibility'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Credit the [[1]]. Admit what you don\'t [[2]]. [[3]] them in.',
        blanks: [['expert', 'person'], ['know'], ['Invite', 'invite']],
        distractors: ['boss', 'Order'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build what Njeri tells her team.',
        tiles: ['Finally,', 'someone', 'asked', 'us.'],
        distractors: ['never'],
      },
    ],
  },
  reflect: {
    prompt: 'Write a short thank-you to someone who helped you understand something this month. Say what you learned and why it mattered.',
    starters: ['Thank you for...', 'It mattered because...'],
  },
  deepen: {
    title: 'Send it',
    summary: 'Send that thank-you today. Specific beats long.',
  },
  notes: 'Synthesis of Chapter 1 tools: closing the loop, expert/referent power (French & Raven), credibility (Kouzes & Posner), guiding coalition (Kotter).',
};

export default lesson;
