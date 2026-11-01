import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. "Line Check" (Tap to explore): Clinton's three-minute voice note. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Line Check: Clinton\'s voice note',
  summary: 'The producer cues up one of Clinton\'s famous voice notes: three minutes and four seconds. Tey reads the transcript on air. Somewhere in it is the actual message. Can you find it?',
  minutes: 11,
  outcomes: [
    'Spot the habits that bury a message: warm-ups, tangents, fillers',
    'Put the point first in voice notes and speech',
    'Keep spoken messages short enough to hear in one go',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Clinton\'s voice note (transcript, 3:04)',
      text: 'Okay so, hi guys, it\'s me, so basically, um, you know how the lecturer was saying stuff about the exam, which by the way the slides were so weird, anyway, I was thinking, and this is just an idea, maybe we could, like, study together, Sunday, library, four, if people want, but no pressure, okay that\'s all, oh wait, also my playlist, okay bye.',
      hotspots: [
        { phrase: 'Okay so, hi guys, it\'s me, so basically', note: 'The warm-up. Eleven words before anything happens. Listeners decide in the first seconds whether to keep listening.' },
        { phrase: 'um, you know', note: 'Fillers. A few are normal and human. A lot of them make people stop listening for the point.' },
        { phrase: 'which by the way the slides were so weird', note: 'A tangent. Interesting to Clinton, a detour for everyone else.' },
        { phrase: 'this is just an idea, maybe', note: 'Softeners that shrink the point. "Just an idea, maybe, like" tells people it\'s optional before they\'ve heard it.' },
        { phrase: 'study together, Sunday, library, four', note: 'THE MESSAGE. Fifty-odd words in. Most listeners have stopped listening by now.' },
        { phrase: 'oh wait, also my playlist', note: 'The bonus topic after the ending. It makes the real point fade even more.' },
      ],
    },
    {
      kind: 'compare',
      title: 'The same voice note, 12 seconds long',
      before: {
        label: '3:04',
        text: 'Okay so, hi guys, it\'s me, so basically, um... (the whole transcript above)',
      },
      after: {
        label: '0:12',
        text: 'Hi all, quick one. Study session Sunday at 4 in the library. Reply with what you\'re stuck on and I\'ll plan around it. See you there.',
      },
      notes: [
        'Point first: what, when, where in the first sentence.',
        'One clear request, then a friendly close.',
        'Under 15 seconds, so people actually play it to the end.',
      ],
    },
  ],
  apply: {
    scenario: 'Tey FM, Line Check.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where is the actual message in Clinton\'s voice note?',
        options: [
          { text: 'Buried in the middle, after the warm-up, fillers and a tangent' },
          { text: 'At the very start', why: 'If only.' },
          { text: 'There isn\'t one', why: 'There is: Sunday, library, four. It\'s just hidden.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which habit is it?',
        groups: ['Warm-up', 'Tangent', 'Softener'],
        items: [
          { text: 'Okay so, hi guys, it\'s me, so basically', group: 0 },
          { text: 'the slides were so weird', group: 1 },
          { text: 'this is just an idea, maybe', group: 2 },
          { text: 'also my playlist', group: 1 },
          { text: 'but no pressure', group: 2 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the 12-second voice note in order.',
        lines: ['Hi all, quick one.', 'Study session Sunday at 4 in the library.', 'Reply with what you\'re stuck on.', 'See you there.'],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'But if I don\'t say "this is just an idea, no pressure", won\'t I sound bossy?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Yes, add more softeners.', why: 'They shrink the message.' },
          { text: 'Asking what they\'re stuck on keeps it friendly. "Just an idea, maybe" only makes it sound unimportant.' },
          { text: 'Bossy is good.', why: 'Clear and friendly beats bossy.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In speech and voice notes, put the ___ first. (one word)',
        answers: ['point', 'message'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Clinton\'s new voice note. Which line should go?',
        lines: [
          'Hi all, quick one: study session Sunday at 4, library.',
          'Reply with what you\'re stuck on.',
          'Oh wait, also, has anyone heard my new playlist?',
        ],
        bug: 2,
        fix: 'See you there!',
        explanation: 'A bonus topic after the ending makes the main point fade. Save it for another message.',
      },
      {
        kind: 'mcq',
        prompt: 'Are all fillers ("um", "you know") bad?',
        options: [
          { text: 'Yes, never say "um"', why: 'Everyone does sometimes. Don\'t panic about a few.' },
          { text: 'They make you sound smarter', why: 'Not really.' },
          { text: 'No: a few are normal and human. A lot of them bury the point' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Send once, then listen', 'The message rule'],
          ['Useful follow-up', 'Adds new information'],
          ['Find your one point', 'The Studio Whiteboard'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Clinton\'s 12-second voice note.',
        template: 'Hi all, [[1]] one. Study session [[2]] at 4 in the [[3]].',
        blanks: [['quick'], ['Sunday'], ['library']],
        distractors: ['basically', 'playlist'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a point-first opening.',
        tiles: ['Hi', 'all,', 'quick', 'one:', 'study', 'session', 'Sunday', 'at', '4.'],
        distractors: ['basically', 'um'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of your last long voice note or spoken update. Where was the point? Rewrite it in under 15 seconds, point first.',
    starters: ['My point was...', 'In 15 seconds: ...'],
  },
  deepen: {
    title: 'Record it twice',
    summary: 'Next time you record a voice note, listen back once. If the point isn\'t in the first sentence, record it again. The second version is almost always better, and shorter.',
  },
  notes: 'Point-first spoken messages and filler moderation are standard speaking advice; fillers are normal in natural speech (no claim they are always harmful).',
};

export default lesson;
