import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: talk card v4. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Talk card v4',
  summary: 'Lucía adds five delivery checks to her card. Tap each one.',
  minutes: 11,
  outcomes: [
    'Add delivery checks to your talk card',
    'Link each check to a lesson',
    'Use them in your next rehearsal',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Lucía\'s talk card v4',
      text: 'Checks 1 to 15, plus: 16. Recorded and self-checked, with one or two fixes? 17. Around 130 to 160 words a minute, with pauses at the message and signposts? 18. "I am excited", then my first line? 19. Glance at the slide, turn back, one thought to one person? 20. Natural hands, still on the message, move on signposts?',
      hotspots: [
        { phrase: 'Recorded and self-checked', note: 'Lessons 1 and 2: the recording and the self-check.' },
        { phrase: 'pauses at the message', note: 'Lesson 3: pace and pauses.' },
        { phrase: '"I am excited"', note: 'Lesson 4: Brooks (2014).' },
        { phrase: 'one thought to one person', note: 'Lesson 6: eyes on people.' },
        { phrase: 'Natural hands', note: 'Lesson 7: hands, posture and power poses.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'v4 adds: self-check, pace and pauses, "I am excited", eyes on people, natural movement.',
    },
  ],
  apply: {
    scenario: 'Talk card v4.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the check to the lesson.',
        pairs: [
          ['Self-checked', 'The self-check'],
          ['Pauses at signposts', 'Pace and pauses'],
          ['"I am excited"', 'Brooks (2014)'],
          ['One thought, one person', 'Eyes on people'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many checks are on talk card v4 in total?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the new checks as written.',
        lines: ['Self-check', 'Pace and pauses', '"I am excited"', 'Eyes on people', 'Natural movement'],
      },
      {
        kind: 'mcq',
        prompt: 'Which check is new on v4?',
        options: [
          { text: 'Glance at the slide, turn back' },
          { text: 'One message, short enough to repeat', why: 'That was v3.' },
          { text: 'Recommendation, not report', why: 'That was v2.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Passes v4 or fails?',
        groups: ['Passes', 'Fails'],
        items: [
          { text: '150 words a minute', group: 0 },
          { text: '190 words a minute, no pauses', group: 1 },
          { text: 'Pointing, then turning back', group: 0 },
          { text: 'Reading the slide to the screen', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'sofia',
        message: 'I always look at the floor when I present.',
        prompt: "Lucía\'s best reply?",
        options: [
          { text: 'Look at the ceiling instead.', why: 'Look at people.' },
          { text: 'It doesn\'t matter.', why: 'Eye contact helps people feel spoken to.' },
          { text: 'Try check 19: pick three people around the room and give each one a thought. Record it and see the difference.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Check 18.',
        template: '"I am [[1]]", then my first [[2]].',
        blanks: [['excited'], ['line']],
        distractors: ['calm', 'slide'],
      },
      {
        kind: 'findBug',
        prompt: 'Tomás\'s rehearsal fails which check?',
        lines: [
          'Recorded it and picked two fixes.',
          'Pace: about 150 words a minute.',
          'Read every slide aloud facing the screen.',
          'Stood still on the message.',
        ],
        bug: 2,
        fix: 'Glance, turn back, one thought to one person.',
        explanation: 'Check 19: talk to people, not the screen.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which check number is about eye contact?',
        answers: ['19', 'nineteen'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'When should you move on stage, according to check 20?',
        options: [
          { text: 'All the time', why: 'On signposts.' },
          { text: 'On signposts' },
          { text: 'Never', why: 'On signposts.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Use checks 16 to 20 in your next rehearsal. Which one made the biggest difference?',
    starters: ['The biggest difference was...'],
  },
  deepen: {
    title: 'Delivery is practice',
    summary: 'You can\'t think about five delivery checks while talking. Practise them one at a time until they\'re habits, so on the day you can think about the audience.',
  },
  notes: 'Talk card v4 (checks 16 to 20).',
};

export default lesson;
