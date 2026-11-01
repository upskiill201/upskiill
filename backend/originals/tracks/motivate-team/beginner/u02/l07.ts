import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Chat with Tey: a team goal worth caring about (meaningful, specific, shared). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'A goal worth caring about',
  summary: 'Clinic Success\'s official goal, set by someone who left last year: "Close 200 tickets a day." Nobody remembers it. Nobody cares. Miracle wants a goal the team would actually fight for. She asks Tey how.',
  minutes: 11,
  outcomes: [
    'Turn an activity target into a goal people care about',
    'Keep a goal specific and still meaningful',
    'Build the goal with the team, not for them',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'What\'s wrong with "close 200 tickets a day"?',
          replies: ['Nobody cares about it.', 'It rewards closing tickets, not fixing clinics.'],
        },
        {
          tey: "Both. It measures activity. You could hit 200 by closing easy tickets and ignoring the clinic that really needs help. A goal people care about points at the outcome that matters: clinics working, patients helped.",
          replies: ['But it still needs a number, right?'],
        },
        {
          tey: "Yes. Specific, challenging goals tend to work better than vague ones: Locke and Latham's research shows that. So keep the number, and change what it counts. Something like: \"All 300 clinics live by rollout, and every live clinic sending results within a day.\"",
          replies: ['Should I set it, or the team?'],
        },
        {
          tey: "Build it with them. Bring the problem: \"What would tell us we did a great job by rollout?\" Chidi will say the northern clinics. Halima will say clinics feeling supported. Bisi will say no clinic waiting more than a day. Your job is to shape it into one sentence.",
          replies: ['And then?'],
        },
        {
          tey: "Then make progress visible every week, against the goal. A goal nobody sees by Wednesday is a goal nobody chases.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Point the goal at the outcome, not the activity. Keep it specific and challenging. Build it with the team. Show progress every week.',
    },
  ],
  apply: {
    scenario: 'Tey and Miracle, rethinking the goal.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the problem with "close 200 tickets a day"?',
        options: [
          { text: 'The number is too low', why: 'Raising it makes it worse.' },
          { text: 'It measures activity, not the outcome that matters' },
          { text: 'It\'s too specific', why: 'Specific is good. It\'s pointed at the wrong thing.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Activity target or outcome goal?',
        groups: ['Activity', 'Outcome'],
        items: [
          { text: '200 tickets a day', group: 0 },
          { text: 'All 300 clinics live by rollout', group: 1 },
          { text: 'Calls answered per hour', group: 0 },
          { text: 'Results sent within a day', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'If we\'re setting a goal, the northern 40 have to be in it. They\'re the hardest.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Agreed. "All 300 live" includes your 40. Want to write that part of the goal?' },
          { text: 'Let\'s keep it simple and skip the hard ones.', why: 'Challenging goals work better, and he wants the challenge.' },
          { text: 'I\'ll decide the goal.', why: 'Build it with them.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Point the goal at the ___, not the activity. (one word)',
        answers: ['outcome', 'Outcome', 'result', 'results'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to what they\'d add to the goal.',
        pairs: [
          ['Chidi', 'The northern clinics'],
          ['Halima', 'Clinics feeling supported'],
          ['Bisi', 'No clinic waits over a day'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why build the goal with the team?',
        options: [
          { text: 'Miracle doesn\'t know enough', why: 'She shapes it. They own it.' },
          { text: 'People commit more to goals they helped shape' },
          { text: 'It\'s faster', why: 'Slower, but stronger.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s draft goal. Which line weakens it?',
        lines: [
          'All 300 clinics live by rollout.',
          'And close at least 250 tickets a day.',
          'Every live clinic sends results within a day.',
        ],
        bug: 1,
        fix: 'No clinic waits more than a day for help.',
        explanation: 'Adding a ticket target pulls attention back to activity.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put building a team goal in order.',
        lines: ['Ask what great would look like', 'Hear everyone\'s piece', 'Shape it into one sentence', 'Show progress every week'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'A goal nobody [[1]] by Wednesday is a goal nobody [[2]].',
        blanks: [['sees'], ['chases', 'cares about']],
        distractors: ['hates', 'writes'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the new goal.',
        tiles: ['All', '300', 'clinics', 'live', 'by', 'rollout.'],
        distractors: ['tickets'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s a goal you\'re measured on that counts activity, not outcome? What outcome would be worth caring about instead?',
    starters: ['I\'m measured on...', 'The outcome that matters is...'],
  },
  deepen: {
    title: 'Ask the great question',
    summary: 'Ask your team or group: "What would tell us we did a great job by [date]?" Turn the answers into one sentence with a number.',
  },
  notes: 'Edwin A. Locke & Gary P. Latham (2002): specific, challenging goals outperform vague ones; participation can increase commitment. Activity vs outcome metrics (surrogation risk): e.g. Choi, Hecht & Tayler (2012), hedged. Fictional details.',
};

export default lesson;
