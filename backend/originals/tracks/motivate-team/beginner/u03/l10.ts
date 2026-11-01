import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 — Chapter Challenge: Chidi's fix fails in front of a clinic. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the failed demo',
  summary: 'Week 5, Tuesday. Chidi demos his power-cut fix to a clinic in Kaduna, live, on a video call with Folake watching. The power goes off on cue. The app crashes. The nurse laughs, kindly. Folake doesn\'t. Chidi turns his camera off.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 3 tool in one live moment',
    'Protect someone\'s motivation after a public failure',
    'Turn a failure into learning without pretending it didn\'t happen',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 5, Tuesday, 11:20 a.m.',
      beats: [
        { speaker: 'narrator', text: 'The power cuts out in Kaduna, exactly as planned for the test. The app freezes, then crashes. The nurse laughs: "Ah, welcome to Kaduna." Folake, on the call, says: "So it doesn\'t work."' },
        { speaker: 'narrator', text: 'Chidi turns his camera off. Five weeks ago he was bored. Three weeks ago he found a problem worth solving. This is the moment that decides whether he tries again, or goes back to his bank offer.' },
        { speaker: 'folake', text: '(private message to Miracle) Should we just drop the northern clinics?' },
        { speaker: 'narrator', text: 'You\'re with Miracle.' },
      ],
    },
  ],
  apply: {
    scenario: 'Tuesday, 11:20 a.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Miracle say to Chidi first, privately?',
        options: [
          { text: '"That was brave, testing it live. What did the crash show you?"' },
          { text: '"That was embarrassing."', why: 'A toxin, on the worst possible day.' },
          { text: '"Don\'t worry, I\'ll explain to Folake that you tried."', why: 'Kind, but it takes the problem away from him.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 3 tool helps?',
        groups: ['Mastery', 'Progress', 'Autonomy'],
        items: [
          { text: 'A learning goal: why did it crash?', group: 0 },
          { text: 'Name what DID work: offline caching', group: 1 },
          { text: 'It\'s still his problem to solve', group: 2 },
          { text: 'Write what we learned', group: 0 },
          { text: 'Clear one inhibitor for him', group: 1 },
          { text: 'He chooses the next test', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'That was humiliating. Maybe I should just take the bank job.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Maybe you should.', why: 'Agreeing with the worst version of the moment.' },
          { text: 'It wasn\'t that bad.', why: 'It felt bad. Don\'t pretend it didn\'t.' },
          { text: 'It felt awful, I know. But caching worked for four minutes before the crash. That\'s more than anyone has managed in a year. What do you think broke?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Amabile\'s terms, learning from a failure is a ___. (one word)',
        answers: ['catalyst', 'Catalyst'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s next hour in order.',
        lines: ['Name the courage, privately', 'Ask what the crash showed', 'Point out what did work', 'Reply to Folake with the learning'],
      },
      {
        kind: 'mcq',
        prompt: 'What should Miracle reply to Folake?',
        options: [
          { text: '"Yes, let\'s drop it."', why: 'Drops the problem and Chidi\'s reason to stay.' },
          { text: '"It wasn\'t his fault."', why: 'Defensive, and it doesn\'t answer her question.' },
          { text: '"Caching worked; the crash is one bug Chidi already suspects. Give him a week and a second test?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s message to the team. Which line breaks Chapter 3?',
        lines: [
          'Chidi tested his fix live in Kaduna today: brave.',
          'From now on, I\'ll review every test before anyone demos it.',
          'Caching held for four minutes. We\'re close.',
        ],
        bug: 1,
        fix: 'What we learned: the crash happens on reconnect.',
        explanation: 'Taking control after one failure tells everyone that trying is risky.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the tool.',
        pairs: [
          ['"That was brave."', 'Nourisher'],
          ['"What did the crash show you?"', 'Learning goal'],
          ['"Caching held four minutes."', 'Progress'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Chidi says: "It\'s the reconnect. I think I know how to fix it." What now?',
        options: [
          { text: 'Ask a developer to take over', why: 'Takes the problem, and the motivation, away.' },
          { text: 'Ask what he needs, set the next agreed check-in, and let him run' },
          { text: 'Set a hard deadline for Friday', why: 'Learning goal first, then the target.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 3, in one line.',
        template: 'Give [[1]] with guardrails, help people [[2]], and make it safe to [[3]].',
        blanks: [['freedom', 'autonomy'], ['grow', 'progress'], ['fail', 'try']],
        distractors: ['orders', 'hide'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s first words to Chidi.',
        tiles: ['That', 'was', 'brave.'],
        distractors: ['bad.'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you failed at something in front of others. What did someone say (or not say) that changed whether you tried again?',
    starters: ['I failed at...', 'What helped (or didn\'t) was...'],
  },
  deepen: {
    title: 'Next: Week 6',
    summary: 'Chidi fixes the reconnect bug by Friday. The northern clinics start staying online. Then Miracle notices a different problem: Bisi is doing twice the work of anyone else, and Emmanuel got exactly the same "great job" at stand-up. Bisi has noticed too. Chapter 4: Fair and seen.',
  },
  notes: 'Chapter 3 challenge. Psychological safety after failure, learning goals, progress framing, preserving autonomy and competence. Fictional events.',
};

export default lesson;
