import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Step-by-step: how to rehearse properly. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'How to rehearse properly',
  summary: 'Ada has "rehearsed" 50 times: reading it in her head on the bus. Arjun: "That\'s not rehearsing. That\'s reading. Here\'s how professionals do it."',
  minutes: 12,
  outcomes: [
    'Rehearse out loud, standing, with a timer',
    'Record yourself and review it',
    'Rehearse in front of real people before the real day',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Rehearse in five steps',
      steps: [
        {
          title: '1. Out loud, standing up',
          body: 'Reading in your head is not rehearsing. Your mouth, your breath and your voice need practice too. Stand up, because that\'s how you\'ll do it on the night.',
        },
        {
          title: '2. With a timer',
          body: 'Every time. Aim for about 55 seconds, so you have a few seconds of buffer for pauses, laughs or nerves.',
        },
        {
          title: '3. Record it, then watch it',
          body: 'Uncomfortable, but it works. Watch once for words, once with the sound off (body), once without looking (voice). Fix one thing at a time.',
        },
        {
          title: '4. Practise the hard parts most',
          body: 'Start, transitions and ending. Most people rehearse the middle beautifully and stumble on the first line and the ask. Practise those ten times more.',
        },
        {
          title: '5. Rehearse for real people',
          body: 'A friend, family, colleagues. Practising for people is different from practising alone: you\'ll feel the nerves, and learn to talk through them. Spread it out over days, not all on the last night.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Out loud. Standing. Timed. Recorded. The start and the ask most. In front of people. Over several days.',
    },
  ],
  apply: {
    scenario: 'Arjun\'s rehearsal plan.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why doesn\'t reading the pitch in your head count as rehearsing?',
        options: [
          { text: 'It does count', why: 'Ada\'s 41 seconds says otherwise.' },
          { text: 'Because buses are noisy', why: 'The problem is silence, not noise.' },
          { text: 'Your voice, breath and pace need practice too, and silent reading is faster than speaking' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the rehearsal steps in order.',
        lines: ['Out loud, standing', 'With a timer', 'Record it and watch', 'Drill the start and the ask', 'Rehearse for real people'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Real rehearsal, or not?',
        groups: ['Real rehearsal', 'Not really'],
        items: [
          { text: 'Saying it out loud, standing, with a timer', group: 0 },
          { text: 'Reading it silently on the bus', group: 1 },
          { text: 'Recording yourself and watching it', group: 0 },
          { text: 'Thinking about it in bed', group: 1 },
          { text: 'Pitching to three friends', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Watching myself on video is SO cringe. Do I have to?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'No, skip it.', why: 'It\'s the fastest way to improve.' },
          { text: 'Everyone cringes. Watch it anyway: it shows you what the judges will see. Fix one thing at a time.' },
          { text: 'Watch it 100 times in a row.', why: 'Watch three ways, fix one thing, repeat.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Aim to finish a 60-second pitch in about how many seconds, to leave a buffer? (a number)',
        answers: ['55', 'fifty-five', '50', '52', '54', '56'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which parts should Ada practise most?',
        options: [
          { text: 'The start, the transitions and the ask' },
          { text: 'The middle, which she already knows', why: 'That\'s where most people over-practise.' },
          { text: 'Only the rhyme', why: 'The start and the ask matter more.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s rehearsal schedule. Which part is a mistake?',
        lines: [
          'Monday to Thursday: rehearse out loud twice a day.',
          'Friday: pitch to the office.',
          'Night before pitch night: rehearse 40 times until 3 a.m.',
        ],
        bug: 2,
        fix: 'Night before: one calm run-through, then sleep.',
        explanation: 'Spreading practice over days works better than cramming, and a tired brain blanks more easily.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the way to watch your recording to what it shows.',
        pairs: [
          ['Normal', 'Your words and timing'],
          ['Sound off', 'Your body and face'],
          ['Eyes closed', 'Your voice and pace'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Arjun\'s rule.',
        template: 'Out [[1]]. Standing [[2]]. With a [[3]].',
        blanks: [['loud'], ['up'], ['timer', 'stopwatch']],
        distractors: ['silently', 'phone'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the advice.',
        tiles: ['Practise', 'the', 'start', 'and', 'the', 'ask', 'most.'],
        distractors: ['middle'],
      },
    ],
  },
  reflect: {
    prompt: 'Plan your rehearsal for the next week: when, where, and who you\'ll practise in front of.',
    starters: ['I\'ll rehearse...', 'In front of...'],
  },
  deepen: {
    title: 'Three ways to watch',
    summary: 'Record your pitch once. Watch it normally, then with the sound off, then listen with your eyes closed. Write down one thing to fix from each.',
  },
  notes: 'Rehearsal advice (out loud, timed, recorded, distributed over days, rehearse before an audience) reflects standard presentation coaching and the spacing effect in learning research.',
};

export default lesson;
