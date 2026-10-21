import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Step-by-step: find your triggers. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Find your triggers',
  summary: 'Kofi\'s log has 23 lines. Somewhere in them are three or four triggers that cause most of his urges. Step by step, here\'s how to find yours.',
  minutes: 11,
  outcomes: [
    'Turn an urge log into a short list of triggers',
    'Rank triggers by how often they cause urges',
    'Choose the one to work on first',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From log to triggers',
      steps: [
        { title: '1. Gather two weeks', body: 'At least 10 to 20 urges. Fewer than that and patterns can be chance.' },
        { title: '2. Count each detail', body: 'Make tallies: times (morning, afternoon, after 10 p.m.), feelings, places or apps, people. Kofi: after 10 p.m. 14, bored 8, stressed 6, sad 4, phone in bed 15, with Yaw 4.' },
        { title: '3. Find the combinations', body: 'Look for details that appear together. Kofi\'s biggest combo: after 10 p.m. + in bed + bored or stressed. That one combination covers 12 of his 23 urges.' },
        { title: '4. Name the trigger', body: 'Write it as a sentence: "When I\'m in bed after 10, bored or stressed, I scroll shops." Naming it makes it easier to catch in the moment.' },
        { title: '5. Rank them', body: 'List two or three triggers, biggest first. Kofi: (1) late-night bed scrolling, (2) shopping with Yaw at Kejetia, (3) after a football loss.' },
        { title: '6. Pick one', body: 'Work on the biggest first. Changing one trigger well beats trying to change all of them a little.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Count, combine, name, rank, pick one. Your log knows your triggers better than you do.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s 23 urges.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps.',
        lines: ['Gather two weeks of urges', 'Count each detail', 'Find the combinations', 'Name the trigger', 'Rank them', 'Pick one'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi\'s biggest combination covers 12 of 23 urges. About what percent is that? (Round to the nearest whole number.)',
        answers: ['52', '52%', '52 percent'],
        placeholder: 'A percent',
      },
      {
        kind: 'mcq',
        prompt: 'Why gather at least two weeks first?',
        options: [
          { text: 'With too few urges, patterns can be chance' },
          { text: 'Because shops change weekly', why: 'It\'s about having enough data.' },
          { text: 'No reason', why: 'More urges make patterns clearer.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Naming a trigger.',
        template: '"When I\'m [[1]], feeling [[2]], I [[3]]."',
        blanks: [['in bed', 'in bed after 10'], ['bored', 'stressed'], ['scroll shops', 'scroll']],
        distractors: ['rich', 'sleep'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Kofi\'s triggers. Biggest, or smaller?',
        groups: ['Biggest', 'Smaller'],
        items: [
          { text: 'Late-night bed scrolling', group: 0 },
          { text: 'Kejetia with Yaw', group: 1 },
          { text: 'After a football loss', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'I\'ll fix all three triggers this week!',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Start with the biggest one: late-night scrolling. Fix that well, then the next.' },
          { text: 'Great, do all three!', why: 'Trying everything at once usually means none stick.' },
          { text: 'Don\'t fix any.', why: 'One at a time works.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tally to what it tells Kofi.',
        pairs: [
          ['After 10 p.m.: 14', 'Late nights are the danger zone'],
          ['Bored: 8', 'Boredom is his top feeling'],
          ['With Yaw: 4', 'A smaller social trigger'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which trigger is written too vaguely to catch in the moment?',
        lines: [
          'When I\'m in bed after 10, bored, I scroll shops.',
          'When Yaw and I go to Kejetia, I buy things I didn\'t plan.',
          'Sometimes I buy stuff.',
        ],
        bug: 2,
        fix: 'After a football loss, I buy football things that night.',
        explanation: 'A trigger needs a when, a feeling or place, and what you do. "Sometimes" can\'t be caught.',
      },
      {
        kind: 'mcq',
        prompt: 'Why pick just one trigger to work on?',
        options: [
          { text: 'Changing one well beats changing all of them a little' },
          { text: 'The others don\'t matter', why: 'They matter; they come next.' },
          { text: 'One trigger is all anyone has', why: 'Most people have a few.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Phone in bed: 15 of 23 urges. How many urges happened somewhere else?',
        answers: ['8', 'eight'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Write your biggest trigger as one sentence: "When I\'m..., feeling..., I...".',
    starters: ['When I\'m...', 'feeling...', 'I...'],
  },
  deepen: {
    title: 'Triggers change',
    summary: 'Triggers shift with life: exam season, a new job, a breakup, payday. Re-read your log every month or two. A new pattern is easier to catch early.',
  },
  notes: 'Fictional 2-week tallies: after 10 p.m. 14, bored 8, stressed 6, sad 4, phone in bed 15, with Yaw 4; top combo 12/23 = 52%.',
};

export default lesson;
