import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 14 — a wins log, a reference and a recommendation. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Leave with proof',
  summary: 'Whether or not Mr Tamba keeps him, Clinton wants to walk out with proof. Miracle shows him three things to collect while it\'s fresh: a wins log, a reference, and a written recommendation.',
  minutes: 12,
  outcomes: ['Keep a weekly wins log', 'Ask for a reference the right way', 'Make your recommendation easy to write'],
  learn: [
    {
      kind: 'steps',
      title: 'Three kinds of proof',
      steps: [
        { title: '1. A wins log, every Friday', body: 'One line per week: what changed, with a number. "Week 4: one driver confirmed 23 deliveries offline; updates by 2pm." In three months, that\'s twelve CV bullets you don\'t have to remember.' },
        { title: '2. Ask for a reference before you leave', body: 'Ask while your work is fresh: "Would you be comfortable being a reference for graduate developer roles?" "Comfortable" lets them say no politely, which is better than a lukewarm reference.' },
        { title: '3. Make the recommendation easy', body: 'If they agree to write something (on LinkedIn or a letter), send three short reminders: the project, the result, one habit they noticed. Busy people write better recommendations when you jog their memory.' },
        { title: '4. Keep them updated', body: 'When you apply somewhere, tell your referee: the role, the company, what they might ask. Then tell them how it went. Nobody likes a surprise call about someone they half remember.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Log wins weekly. Ask for references while it\'s fresh. Remind them what you did. Warn them before they\'re called.',
    },
  ],
  apply: {
    scenario: 'Clinton collects proof at Kmer.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Keep a wins log every Friday', 'Ask for a reference before you leave', 'Send reminders for the recommendation', 'Keep your referee updated'],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask "Would you be comfortable being a reference?"',
        options: [
          { text: 'It sounds posh', why: 'It gives them an easy, honest way out.' },
          { text: 'It lets them say no politely, better than a lukewarm reference' },
          { text: 'It forces them to say yes', why: 'The opposite: it lets them decline.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good wins-log line, or weak?',
        groups: ['Good', 'Weak'],
        items: [
          { text: '23 deliveries confirmed offline', group: 0 },
          { text: 'Worked hard this week', group: 1 },
          { text: 'Updates by 2pm instead of evening', group: 0 },
          { text: 'Learned stuff', group: 1 },
          { text: 'Three drivers using it daily', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the mistake with references.',
        lines: ['Asks before leaving, while it\'s fresh.', 'Lists Mr Tamba as a referee without asking him.', 'Tells him which roles he\'s applying for.'],
        bug: 1,
        explanation: 'Always ask first. A surprise call can lead to a weak reference.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Mr Tamba agreed to write me a LinkedIn recommendation. Should I just wait?',
        options: [
          { text: 'Yes, he\'ll remember everything.', why: 'He\'s busy. Jog his memory.' },
          { text: 'I\'ll write it for him and tell him to post it.', why: 'Reminders help; writing it yourself goes too far.' },
          { text: 'I\'ll send three short reminders: the project, the result, and one habit he noticed.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each kind of proof to what it gives Clinton.',
        pairs: [
          ['Wins log', 'Ready-made CV bullets'],
          ['Reference', 'Someone employers can call'],
          ['Recommendation', 'Words of praise on his profile'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'When should Clinton write in his wins log?',
        options: [
          { text: 'Every Friday' },
          { text: 'Once, at the end', why: 'He\'ll have forgotten half of it. Weekly.' },
          { text: 'Never, he\'ll remember', why: 'Nobody remembers numbers months later.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the reference ask.',
        template: 'Would you be [[1]] being a [[2]] for graduate developer roles?',
        blanks: [['comfortable'], ['reference', 'referee']],
        distractors: ['forced', 'boss', 'angry'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In three months, how many weekly wins-log lines will Clinton have? (a number)',
        answers: ['12', 'twelve', '13', 'thirteen'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Tell your referee, or not needed?',
        groups: ['Tell them', 'Not needed'],
        items: [
          { text: 'The role you applied for', group: 0 },
          { text: 'What they might be asked', group: 0 },
          { text: 'Your lunch order', group: 1 },
          { text: 'How it went', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Who could be a referee for you today? When did you last update them?',
    starters: ['My referee could be...', 'I last spoke to them...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Start a wins log today. Write one line for this week, with a number. Set a Friday reminder on your phone.',
  },
  notes: 'Reference practice varies by country: in some places references are rarely checked; in others, written letters are expected. Check locally.',
};

export default lesson;
