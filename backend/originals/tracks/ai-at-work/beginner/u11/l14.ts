import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 14 — teaching a colleague. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Teaching a colleague',
  summary: 'Lucía asks Ada to teach her team the basics. Ada has one hour. Five steps make it stick.',
  minutes: 12,
  outcomes: [
    'Teach an AI habit in one short session',
    'Start from the learner\'s real work',
    'Leave them with something to use tomorrow',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Teaching AI in one hour',
      steps: [
        { title: '1. Start with their work', body: '"What\'s one task you did this week that took too long?" Teach with that, not a made-up example.' },
        { title: '2. Show one before and after', body: 'A vague prompt, then a good one. Let them see the difference.' },
        { title: '3. Let them do it', body: 'They write the prompt for their own task while you watch. Help, don\'t take the keyboard.' },
        { title: '4. Teach the check', body: 'What to verify every time: facts, numbers, names, promises. Plus what never to paste.' },
        { title: '5. Leave one template', body: 'A saved prompt for their task, so they use it tomorrow.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Their task, one before and after, they try it, teach the check, leave a template. Hands on, not slides.',
    },
  ],
  apply: {
    scenario: 'Ada teaches Lucía\'s team.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the teaching steps.',
        lines: ['Start with their work', 'Show a before and after', 'Let them do it', 'Teach the check', 'Leave a template'],
      },
      {
        kind: 'mcq',
        prompt: 'Why start with their own task?',
        options: [
          { text: 'To save Ada preparing', why: 'It\'s about relevance.' },
          { text: 'It\'s relevant, so they remember and use it' },
          { text: 'Made-up examples are banned', why: 'Real ones stick better.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good teaching move, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Letting them type the prompt', group: 0 },
          { text: 'An hour of slides about AI history', group: 1 },
          { text: 'Teaching what to check', group: 0 },
          { text: 'Taking the keyboard and doing it for them', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'My team found your session really practical. What made it work?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'My slides.', why: 'It was hands-on.' },
          { text: 'Luck.', why: 'It was the approach.' },
          { text: 'They worked on their own real tasks, did it themselves, and left with a template to use tomorrow.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: '[[1]] on, not slides. Leave a [[2]].',
        blanks: [['Hands'], ['template']],
        distractors: ['Eyes', 'speech'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Ada\'s session plan is weakest?',
        lines: [
          'Ask each person for a slow task',
          'Show a before and after',
          'Then lecture for 40 minutes',
          'Leave each person a template',
        ],
        bug: 2,
        fix: 'Let them each write a prompt for their own task.',
        explanation: 'People learn by doing, not listening.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which before-and-after example teaches best?',
        options: [
          { text: '"Write an email" vs "write an email please"', why: 'No real difference.' },
          { text: '"Write a campaign update" vs "Write a 5-line update for Carmen: results, one risk, one ask by Friday"', },
          { text: 'Two identical prompts', why: 'Nothing to learn.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to its purpose.',
        pairs: [
          ['Their work', 'Relevance'],
          ['They try it', 'Real learning'],
          ['The check', 'Safe use'],
          ['A template', 'Use tomorrow'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s opening question.',
        tiles: ['What', 'took', 'too', 'long', 'this', 'week?'],
        distractors: ['history'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How long is Ada\'s teaching session? (hours)',
        answers: ['1', 'one', 'an hour'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Teach in the first session, or later?',
        groups: ['First session', 'Later'],
        items: [
          { text: 'What never to paste', group: 0 },
          { text: 'Advanced chaining of ten steps', group: 1 },
          { text: 'How to check facts', group: 0 },
          { text: 'Every tool on the market', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why teach the check in the very first session?',
        options: [
          { text: 'Safe habits are easiest to build from the start' },
          { text: 'It\'s boring, so get it over with', why: 'It\'s essential.' },
          { text: 'It isn\'t needed early', why: 'It\'s most important early.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Who could you teach one AI habit to this week? Which task of theirs would you start with?',
    starters: ['I\'ll teach...', 'Their task:'],
  },
  deepen: { title: 'Try it today', summary: 'Show one colleague a before-and-after prompt for a task they actually do.' },
  notes: 'General adult-learning guidance: active practice and relevance improve retention.',
};

export default lesson;
