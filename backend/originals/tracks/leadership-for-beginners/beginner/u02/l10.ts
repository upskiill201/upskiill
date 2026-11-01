import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 — Chapter Challenge: Friday's mistake (Lucía's own). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: Friday\'s mistake',
  summary: 'Week 4, Friday. This time the mistake is Lucía\'s: she told Carmen the summer campaign would launch June 1. Nobody asked the team. Sofía says, very quietly, "That\'s... not possible." Everything Lucía preached is about to be tested on her.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 2 tool in one live moment',
    'Own your own mistake in front of your team',
    'Show that speaking up is safe, even when it\'s about the boss',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 4, Friday, the team meeting',
      beats: [
        { speaker: 'lucia', text: 'Good news: I told Carmen we\'d launch the summer campaign June 1.' },
        { speaker: 'sofia', text: '(very quietly) That\'s... not possible. The supplier photos don\'t arrive until June 10.' },
        { speaker: 'narrator', text: 'Silence. Diego looks at Sofía, surprised. She never speaks in meetings. Tomás glances at Lucía. Three weeks ago, Lucía told him: "Thank you for telling me."' },
        { speaker: 'narrator', text: 'Now everyone is watching to see if she meant it. You\'re with Lucía.' },
      ],
    },
  ],
  apply: {
    scenario: 'The team meeting, Friday.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Lucía say first?',
        options: [
          { text: '"Thank you, Sofía. That\'s exactly what I needed to hear. Tell me more."' },
          { text: '"I\'m sure we can make it work."', why: 'Brushing off the one person who spoke up.' },
          { text: '"Why didn\'t you say this earlier?"', why: 'Nobody asked her earlier. That\'s the mistake.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'What does each reaction teach the team?',
        groups: ['Speak up', 'Stay quiet'],
        items: [
          { text: 'Thanking Sofía out loud', group: 0 },
          { text: 'Getting defensive', group: 1 },
          { text: '"I made a mistake. I should have asked you first."', group: 0 },
          { text: 'Changing the subject', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: 'So are we launching June 1 or not?',
        prompt: 'Lucía\'s best answer?',
        options: [
          { text: 'Yes. Find a way.', why: 'Setting the team up to fail.' },
          { text: 'Let\'s see what happens.', why: 'Vague answers make everyone nervous.' },
          { text: 'Not if the photos land June 10. I promised a date without asking you. My mistake. Let\'s work out a real date together.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Lucía goes first and admits her own mistake. That builds psychological ___. (one word)',
        answers: ['safety'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Lucía\'s recovery in order.',
        lines: ['Thank Sofía for speaking up', 'Own the mistake out loud', 'Ask the team for a real date', 'Tell Carmen, with a new plan'],
      },
      {
        kind: 'mcq',
        prompt: 'What made Lucía\'s mistake easy to make? (Blame vs learn)',
        options: [
          { text: 'Sofía didn\'t warn her in advance', why: 'Nobody asked her.' },
          { text: 'Carmen pressured her', why: 'Maybe, but the fix is in Lucía\'s process.' },
          { text: 'She committed to a date without asking the people doing the work' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s message to Carmen. Which line hides the real problem?',
        lines: [
          'I gave you June 1 before checking with the team. That was my mistake.',
          'The team has unfortunately fallen behind.',
          'Realistic date: June 17. From now on I check dates with them first.',
        ],
        bug: 1,
        fix: 'The supplier photos arrive June 10, which I hadn\'t checked.',
        explanation: 'Blaming the team for her own promise would undo everything she\'s built.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Which Chapter 2 tool did Lucía use?',
        pairs: [
          ['Thanking Sofía', 'Psychological safety'],
          ['"Tell me more."', 'Active listening'],
          ['Fixing how dates get set', 'Blameless review'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'After the meeting, Sofía stays behind. What should Lucía do?',
        options: [
          { text: 'Ask her not to embarrass her in meetings', why: 'That would teach her to stay quiet forever.' },
          { text: 'Thank her privately too, and ask what she\'d like to own on the campaign' },
          { text: 'Nothing; it\'s done', why: 'A private thank you makes it stick.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 2, in one line.',
        template: 'Know your [[1]]. Listen to [[2]]. Make it safe to speak up, even about the [[3]].',
        blanks: [['people'], ['understand'], ['boss', 'leader']],
        distractors: ['reply', 'rules'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s words to the team.',
        tiles: ['My', 'mistake.', 'I', 'should', 'have', 'asked', 'you', 'first.'],
        distractors: ['Your'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time a leader admitted a mistake in front of you. How did it change how you felt about speaking up?',
    starters: ['The leader said...', 'After that, I...'],
  },
  deepen: {
    title: 'Next: Day 45',
    summary: 'The team is talking now. Six weeks later, Lucía has a new problem: everyone is busy, nobody is idle, and the summer campaign is still behind. "We\'re working so hard. Why aren\'t we getting anywhere?" Chapter 3: Where are we going?',
  },
  notes: 'Chapter 2 challenge. Leader fallibility and modelling as a driver of psychological safety (Edmondson). Fictional dates (June 1, June 10, June 17).',
};

export default lesson;
