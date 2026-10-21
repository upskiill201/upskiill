import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 18 — reviewing your week. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Reviewing your week',
  summary: 'Ten minutes every Friday turns a busy week into lessons for the next one. Ada and Tolu sort the myths about reviews from what actually helps.',
  minutes: 12,
  outcomes: [
    'Run a 10-minute weekly review',
    'Use AI to spot patterns in your week',
    'Turn one lesson into one change',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A weekly review is only useful if the week went badly.',
          isFact: false,
          explain: 'Good weeks teach you what to repeat. Reviewing both is how habits improve.',
        },
        {
          text: 'Writing down what you learned helps you improve more than just doing the work.',
          isFact: true,
          explain: 'In a study of call-centre trainees, Di Stefano and colleagues (2014) found that those who spent 15 minutes reflecting at the end of the day performed better than those who used the time for extra practice.',
        },
        {
          text: 'A good review needs at least an hour.',
          isFact: false,
          explain: 'Ten minutes is enough: what went well, what didn\'t, one change for next week.',
        },
        {
          text: 'AI can help spot patterns in your notes, like the same delay every week.',
          isFact: true,
          explain: 'Paste a few weeks of notes and ask "What patterns do you see?" It may notice what you\'re too close to see.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ten minutes on Friday: what went well, what didn\'t, one change for next week. Every few weeks, ask AI for patterns.',
    },
  ],
  apply: {
    scenario: 'Friday, 4:30pm. Tolu reviews his week.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the 10-minute review.',
        lines: ['What went well', 'What didn\'t', 'Why', 'One change for next week'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Di Stefano and colleagues find?',
        options: [
          { text: 'Trainees who reflected for 15 minutes performed better than those who practised more' },
          { text: 'Reflection wastes time', why: 'The opposite.' },
          { text: 'Only managers benefit', why: 'It was trainees.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful review note, or not?',
        groups: ['Useful', 'Not useful'],
        items: [
          { text: 'Shops sign up faster in the morning; visit earlier', group: 0 },
          { text: 'Busy week', group: 1 },
          { text: 'Waiting for sign-offs cost 2 days; ask earlier', group: 0 },
          { text: 'Stuff happened', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request best finds patterns?',
        options: [
          { text: 'Was my month good?', why: 'Invites a vague answer.' },
          { text: 'Here are my last four weekly reviews. What patterns do you see in what slowed me down, and what\'s one change to try?' },
          { text: 'Write my review for me.', why: 'You need your own reflection.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Why does Tolu stop at 4:30 on Fridays? Isn\'t that lost time?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'It\'s his 10-minute weekly review. It\'s why his sign-ups got faster: he noticed mornings work better.' },
          { text: 'Yes, he should stop.', why: 'Reflection pays off.' },
          { text: 'He\'s tired.', why: 'It\'s a deliberate habit.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the review.',
        template: 'What went well, what [[1]], one [[2]] for next week.',
        blanks: [['didn\'t', "didn't"], ['change']],
        distractors: ['ate', 'excuse'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes does the weekly review take?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Tolu\'s review isn\'t actionable?',
        lines: [
          'Went well: 14 sign-ups, mostly before 11am.',
          'Didn\'t: waited 2 days for Tobi\'s sign-off.',
          'Change: be better.',
          'Pattern: Tuesdays are slow at the market.',
        ],
        bug: 2,
        fix: 'Change: send sign-off requests on Monday morning.',
        explanation: '"Be better" isn\'t a change you can do.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the pattern to the change.',
        pairs: [
          ['Mornings work best', 'Book visits before 11am'],
          ['Sign-offs are slow', 'Ask on Monday'],
          ['Tuesdays are quiet', 'Use Tuesdays for admin'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tolu\'s pattern question.',
        tiles: ['What', 'patterns', 'do', 'you', 'see?'],
        distractors: ['nice'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Reviews only help after bad weeks', group: 0 },
          { text: 'Short reflection improves performance', group: 1 },
          { text: 'A review needs an hour', group: 0 },
          { text: 'AI can spot patterns across weeks', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why only one change per week?',
        options: [
          { text: 'One change is easy to actually do and to see if it worked' },
          { text: 'More is against the rules', why: 'It\'s practical.' },
          { text: 'Changes don\'t matter', why: 'One real change at a time does.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Do a 10-minute review of your week now. What\'s your one change?',
    starters: ['Went well:', 'One change:'],
  },
  deepen: { title: 'Try it today', summary: 'Put 10 minutes in your calendar every Friday called "Weekly review". Keep it for a month.' },
  notes: 'Di Stefano, Gino, Pisano & Staats (2014), Harvard Business School working paper "Learning by thinking": 15 minutes of end-of-day reflection improved trainee performance more than extra practice.',
};

export default lesson;
