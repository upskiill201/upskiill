import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Step-by-step: keeping impact visible every week. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Keep the impact visible',
  summary: 'One nurse on one Monday changed the week. But Miracle knows feelings fade by Thursday. Tey helps her turn one moving moment into a habit that keeps the team connected to why the work matters.',
  minutes: 12,
  outcomes: [
    'Build a weekly habit that keeps impact visible',
    'Use real stories and real numbers together',
    'Let the team own the habit',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Keeping impact visible in five steps',
      steps: [
        { title: '1. One real story, every Monday', body: 'Two minutes at stand-up: one clinic, one result, one person helped. Short, true, specific. Not a speech.' },
        { title: '2. Let the team tell it', body: 'Rotate who brings the story. Halima brings Kano. Bisi brings Ikorodu. When the team finds the stories, they start noticing them all week.' },
        { title: '3. Add one real number', body: '"Our clinics sent 3,200 results this week." Stories make it feel real; numbers show it\'s not a one-off.' },
        { title: '4. Close the loop on hard tickets', body: 'When a tough problem is fixed, find out what happened next: "Remember the Ibadan clinic that kept crashing? They saw 40 patients on Friday." Hard work deserves to see its ending.' },
        { title: '5. A visit for everyone', body: 'Every person visits one live clinic this quarter. Emmanuel too. Especially Emmanuel.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Monday stand-up, two ways',
      before: { label: 'Status only', text: '"Tickets yesterday: 212. Open: 48. Any blockers? No? Great."' },
      after: { label: 'Impact first', text: '"Halima\'s story: a Kano clinic sent its first results in Hausa this week, and a grandmother read them herself. Results this week: 3,200. Now, blockers?"' },
      notes: ['Status still happens. Impact just comes first.', 'One story plus one number: two minutes.', 'Halima brought it, so it\'s hers, not Miracle\'s.'],
    },
  ],
  apply: {
    scenario: 'Making the Monday moment a habit.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['One real story every Monday', 'Let the team tell it', 'Add one real number', 'Close the loop on hard tickets', 'A visit for everyone'],
      },
      {
        kind: 'mcq',
        prompt: 'Why rotate who brings the story?',
        options: [
          { text: 'When the team finds stories, they notice impact all week' },
          { text: 'To save Miracle time', why: 'It\'s about the team noticing.' },
          { text: 'Fairness only', why: 'The main win is attention.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Status or impact?',
        groups: ['Status', 'Impact'],
        items: [
          { text: '"Tickets yesterday: 212."', group: 0 },
          { text: '"A grandmother read her own results."', group: 1 },
          { text: '"Open: 48."', group: 0 },
          { text: '"Ibadan saw 40 patients on Friday."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'Can I bring the story next Monday? A Kano clinic sent results in Hausa.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'I\'ll tell it, I\'m better at stories.', why: 'Takes it away from her.' },
          { text: 'Maybe, if there\'s time.', why: 'Make the time. It\'s two minutes.' },
          { text: 'Yes please! Two minutes, your words. I can\'t wait to hear it.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Stories make it feel real; ___ show it\'s not a one-off. (one word)',
        answers: ['numbers', 'Numbers', 'data'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why close the loop on hard tickets?',
        options: [
          { text: 'To check up on people', why: 'It\'s to show impact.' },
          { text: 'For the audit', why: 'It\'s for the team.' },
          { text: 'Hard work deserves to see its ending' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s new stand-up. Which line breaks the habit?',
        lines: [
          'Two minutes: this week\'s clinic story, from Bisi.',
          'Skip the story if we\'re busy.',
          'One number: results sent this week.',
        ],
        bug: 1,
        fix: 'The story always comes first, even on busy days.',
        explanation: 'Busy weeks are when people need the reason most.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the example.',
        pairs: [
          ['One real story', 'The Kano grandmother'],
          ['One real number', '3,200 results'],
          ['Close the loop', 'Ibadan saw 40 patients'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Impact [[1]], then status. One [[2]], one number.',
        blanks: [['first'], ['story']],
        distractors: ['last', 'speech'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the Monday opener.',
        tiles: ['This', 'week\'s', 'clinic', 'story:'],
        distractors: ['tickets'],
      },
    ],
  },
  reflect: {
    prompt: 'How could you bring one real story of impact into a regular meeting you\'re part of? Who could tell it?',
    starters: ['The meeting is...', 'The story could come from...'],
  },
  deepen: {
    title: 'Two minutes, first',
    summary: 'In your next regular meeting, spend the first two minutes on one real story of impact. Then do the usual agenda.',
  },
  notes: 'Sustaining beneficiary connection (Grant 2008) through routine practices; combining narrative with data in communication: standard practice. Fictional details.',
};

export default lesson;
