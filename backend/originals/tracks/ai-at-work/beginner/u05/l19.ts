import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 19 — Ada's research recipe. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your research recipe',
  summary: 'Everything from this unit in one repeatable recipe Ada can use for any research question, big or small.',
  minutes: 12,
  outcomes: [
    'Use a seven-step research recipe',
    'Link each step to a lesson in this unit',
    'Scale the recipe up or down to the question',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Ada\'s research recipe',
      steps: [
        { title: '1. Decision', body: 'What will this research decide? That sets the questions and when to stop.' },
        { title: '2. Questions', body: 'Specific, answerable, each with where the answer would come from. Ask AI what\'s missing.' },
        { title: '3. Orient with AI', body: 'Learn the topic fast: the map, the key ideas, the official sources to read.' },
        { title: '4. Sources', body: 'Official and primary first. Read laterally. Follow claims upstream.' },
        { title: '5. Compare and challenge', body: 'Your criteria in a table, neutral questions, the strongest case against.' },
        { title: '6. Known, findable, unknowable', body: 'Stop when more research wouldn\'t change the decision. Unknowable? Recommend a test.' },
        { title: '7. One-page brief', body: 'Question, answer, why, risk, unknowns, cited sources.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Decision, questions, orient, sources, compare and challenge, known/unknown, brief. Small question? Steps 1, 4 and 7 in ten minutes.',
    },
  ],
  apply: {
    scenario: 'Ada turns the unit into a recipe.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the recipe.',
        lines: ['Decision', 'Questions', 'Orient with AI', 'Sources', 'Compare and challenge', 'Known, findable, unknowable', 'Brief'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the lesson.',
        pairs: [
          ['Questions', 'Asking good research questions'],
          ['Sources', 'Getting sources you can check'],
          ['Compare and challenge', 'Avoiding confirmation bias'],
          ['Brief', 'Turning research into a one-page brief'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Full recipe, or the short version?',
        groups: ['Full recipe', 'Short version'],
        items: [
          { text: 'Which country to launch in next', group: 0 },
          { text: 'What time a public holiday is', group: 1 },
          { text: 'Choosing a partner bank', group: 0 },
          { text: 'The spelling of a client\'s company name', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which steps are the short version?',
        options: [
          { text: 'Decision, sources, brief' },
          { text: 'Only "orient with AI"', why: 'Sources can\'t be skipped.' },
          { text: 'None; always do all seven', why: 'Scale to the question.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Could my team use your recipe for our own research?',
        prompt: 'Best reply?',
        options: [
          { text: 'Yes. Start every project with step 1: write down the decision. Everything else follows from it.' },
          { text: 'It only works for Ghana.', why: 'It works for any research.' },
          { text: 'Only if they use the same AI tool.', why: 'Tool-neutral.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete step 6.',
        template: 'Stop when more research wouldn\'t [[1]] the decision. Unknowable? Recommend a [[2]].',
        blanks: [['change'], ['test', 'pilot']],
        distractors: ['decorate', 'party'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Tobi\'s version is wrong?',
        lines: [
          '1. Write the decision',
          '2. Ask AI for the answer',
          '3. Check key facts in official sources',
          '4. Write a one-page brief',
        ],
        bug: 1,
        fix: '2. Write specific questions and use AI to orient',
        explanation: 'AI helps plan and explain; it doesn\'t give the answer to a big decision.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the recipe\'s first step.',
        tiles: ['What', 'will', 'this', 'research', 'decide?'],
        distractors: ['prove'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many steps are in the full recipe?',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step is this?',
        groups: ['Sources', 'Compare and challenge'],
        items: [
          { text: 'Read laterally about a new site', group: 0 },
          { text: 'Ask for the strongest case against', group: 1 },
          { text: 'Follow a claim upstream', group: 0 },
          { text: 'Build a table with your criteria', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where does AI help most in the recipe?',
        options: [
          { text: 'Orienting, finding missing questions, challenging, drafting the brief' },
          { text: 'Being the final source of facts', why: 'Facts come from sources.' },
          { text: 'Making the decision', why: 'People decide.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why start with the decision?',
        options: [
          { text: 'It tells you what to research and when to stop' },
          { text: 'It\'s the easiest step', why: 'It\'s the most important.' },
          { text: 'It looks good', why: 'It focuses everything.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own short research recipe for the kind of research you do most.',
    starters: ['My recipe:', 'The step I\'ll never skip:'],
  },
  deepen: { title: 'Try it today', summary: 'Use the short version (decision, sources, brief) on one small question today.' },
  notes: 'Summary of Unit 5.',
};

export default lesson;
