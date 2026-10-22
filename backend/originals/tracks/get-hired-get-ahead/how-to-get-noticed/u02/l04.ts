import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 4 — find a problem worth solving. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Find a problem worth solving',
  summary: 'Not everyone has a mum with a messy njangi book. Miracle shows Clinton (and you) a four-step way to find a real problem in anyone\'s life, one small enough to fix and real enough to matter.',
  minutes: 12,
  outcomes: ['Find real problems in the people around you', 'Check a problem is worth solving', 'Shrink it to something you can finish'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to a good problem',
      steps: [
        { title: '1. Listen for complaints', body: 'Problems hide in complaints. "Every month someone says they paid." "Nobody knows when the next practice is." "I keep running out of airtime cards." Write down every complaint you hear for a week.' },
        { title: '2. Check it happens again and again', body: 'A one-off isn\'t worth a project. Ask: does it happen every week or every month? Does it annoy more than one person? Mum\'s njangi argues every single month. That passes.' },
        { title: '3. Check you can help', body: 'Pick a problem your skills can touch: a sheet, a guide, an app, a plan, a poster, a schedule. You don\'t need to solve it completely, just make it better.' },
        { title: '4. Shrink it', body: 'Cut it to the smallest useful version. Not "a banking app for every njangi", but "a page that shows who paid this month and who\'s next". You can grow it later.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'The best first problems are close to home: people you can ask questions, who will actually use what you make, and who\'ll tell you honestly if it works.',
    },
  ],
  apply: {
    scenario: 'Clinton and David hunt for problems.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the four steps in order.',
        lines: ['Listen for complaints', 'Check it happens again and again', 'Check you can help', 'Shrink it to the smallest useful version'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth a project, or not?',
        groups: ['Worth it', 'Not worth it'],
        items: [
          { text: 'The njangi argues about payments every month', group: 0 },
          { text: 'Clinton lost his pen once', group: 1 },
          { text: 'Players never know when practice is', group: 0 },
          { text: 'It rained on one Saturday', group: 1 },
          { text: 'His aunt\'s customers ask the same questions daily', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where do problems hide, according to Miracle?',
        options: [
          { text: 'In textbooks', why: 'Textbooks have exercises. Real problems hide in what people complain about.' },
          { text: 'In complaints people repeat' },
          { text: 'In job adverts', why: 'Adverts show what employers want. Real problems are in everyday complaints.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'My study group never knows which topics we\'ve covered. Is that a project?',
        options: [
          { text: 'No, it\'s too boring.', why: 'Boring problems that happen every week make great projects.' },
          { text: 'Only if you build an app for every medical school.', why: 'Start with one group. Shrink it.' },
          { text: 'Yes: it happens every week, it annoys everyone, and a shared topic tracker would help. Start small.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the idea that skipped step 4 (shrink it).',
        lines: ['A one-page guide: 5 things to check before a phone repair.', 'An app that runs every phone repair shop in Africa.', 'A price list his aunt can share on WhatsApp.'],
        bug: 1,
        explanation: 'Way too big to finish. The smallest useful version is the guide or the price list.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each complaint to a small fix.',
        pairs: [
          ['Nobody knows when practice is', 'A shared fixtures sheet'],
          ['Customers ask the same questions', 'A one-page guide'],
          ['Arguments about who paid', 'A simple payment tracker'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why are problems close to home good first projects?',
        options: [
          { text: 'You can ask the people questions, and they\'ll actually use it and tell you honestly' },
          { text: 'They\'re easier to fake', why: 'Never fake. They\'re easier to test with real people.' },
          { text: 'Recruiters only like local projects', why: 'It\'s about real users and honest feedback, not location.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete step 4.',
        template: 'Cut it to the smallest [[1]] version. You can [[2]] it later.',
        blanks: [['useful'], ['grow', 'improve']],
        distractors: ['expensive', 'delete', 'sell'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Step 1: listen for ___. (one word)',
        answers: ['complaints', 'complaint', 'problems'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which version of the njangi project passes all four steps?',
        options: [
          { text: '"A national savings platform."', why: 'Fails step 4: far too big.' },
          { text: '"Something to do with money."', why: 'Too vague to build or finish.' },
          { text: '"A page showing who paid this month and who\'s next, for Mum\'s twelve members."' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Run the four steps on one complaint you\'ve heard this week. What\'s the smallest useful thing you could make?',
    starters: ['The complaint is...', 'It happens...', 'The smallest fix would be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'For one week, write down every complaint you hear at home, at school or at work. On Sunday, pick the one that passes all four steps.',
  },
  notes: 'Problem-finding framing (listen for repeated pain, check frequency, check fit, shrink scope) mirrors common product-discovery and design-thinking practice, simplified for beginners. Works for non-tech fields too (guides, schedules, posters).',
};

export default lesson;
