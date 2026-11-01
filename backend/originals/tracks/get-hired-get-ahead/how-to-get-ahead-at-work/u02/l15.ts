import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: the first fixed Monday. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: a quiet Monday',
  summary: 'Monday, 9:20am. No message from finance. The payout report ran on its own. Someone in finance posts a single thumbs-up in the chat. Clinton grins at his screen. Then Miracle quizzes him. Unowned problems, compounding skills, helping others, the impact record.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Take ownership of an unowned problem well', 'Build compounding skills', 'Record impact, including helping others'],
  learn: [
    {
      kind: 'story',
      title: '9:20am',
      beats: [
        { speaker: 'narrator', text: 'Monday, 9:20am. Silence from finance. The report ran by itself. A thumbs-up in the chat.' },
        { speaker: 'miracle', text: 'A quiet Monday is a loud result. Log it. Then quiz.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: a quiet Monday.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the pitch for an unowned problem in order.',
        lines: ['What\'s happening', 'Why it happens', 'Your offer to own a fix', 'How much time you\'d spend'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Compounds, or might fade?',
        groups: ['Compounds', 'Might fade'],
        items: [
          { text: 'Clear writing', group: 0 },
          { text: 'One tool\'s shortcuts', group: 1 },
          { text: 'Knowing the business', group: 0 },
          { text: 'A trendy framework version', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is onboarding Kemi real value?',
        options: [
          { text: 'It isn\'t', why: 'Multipliers are valuable.' },
          { text: 'It makes the whole team faster' },
          { text: 'It only helps Kemi', why: 'It helps the whole team.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the ownership mistake.',
        lines: ['Agreed two weeks with Ngozi.', 'Changed finance\'s system without telling them.', 'Paired with someone in finance.'],
        bug: 1,
        explanation: 'Work with the other team, openly.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best impact entry for today.',
        from: 'miracle',
        message: 'What will you write in your impact record?',
        options: [
          { text: '"Did some report stuff."', why: 'What, who, a number.' },
          { text: '"Finance finally stopped complaining."', why: 'Focus on the result for drivers.' },
          { text: '"Payout report fixed with finance: first unbroken Monday in five weeks. Drivers paid on time."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each habit to its purpose.',
        pairs: [
          ['Answer in a shared channel', 'Others learn too'],
          ['Save thank-you messages', 'Evidence for reviews'],
          ['Monthly three-line summary', 'Keeps the manager informed'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Should Clinton fix Kemi\'s bugs for her?',
        options: [
          { text: 'Usually not: pair with her while she drives' },
          { text: 'Yes, always', why: 'She won\'t learn.' },
          { text: 'Ignore her', why: 'Help, but let her drive.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s line.',
        template: 'A quiet Monday is a [[1]] result. [[2]] it.',
        blanks: [['loud'], ['Log']],
        distractors: ['small', 'Hide', 'Forget'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many weeks since the last unbroken Monday? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Impact record section?',
        groups: ['Goals', 'Making others better'],
        items: [
          { text: 'Crashes on 2 GB phones down', group: 0 },
          { text: 'Onboarded Kemi', group: 1 },
          { text: 'Failed confirmations down', group: 0 },
          { text: 'Updated the onboarding doc', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do unowned problems repeat?',
        options: [
          { text: 'They can\'t be fixed', why: 'They can; nobody owns them.' },
          { text: 'Luck', why: 'Nobody owns them.' },
          { text: 'Nobody owns them' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s a "quiet Monday" you could create: a repeated problem that could simply stop happening?',
    starters: ['The problem...', 'It could stop if...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write this week\'s impact line, including any help you gave someone else.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14.',
};

export default lesson;
