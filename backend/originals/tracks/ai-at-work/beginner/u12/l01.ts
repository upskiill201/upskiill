import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 12 · Lesson 1 — chat assistants, compared fairly. Story: five tools in one week. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Chat assistants, compared fairly',
  summary: 'Month 10. Carmen has been pitched five AI tools in a week. Each demo looked amazing. Ada shows her how to compare them on her team\'s real work, not on demos.',
  minutes: 12,
  outcomes: [
    'Compare AI tools on your own tasks',
    'Avoid being swayed by polished demos',
    'Score tools on a few clear criteria',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Five demos',
      beats: [
        { speaker: 'narrator', text: 'Month 10. Five sales demos in five days. Every tool wrote a perfect poem, a perfect email and a perfect plan.' },
        { speaker: 'lucia', text: 'Carmen loved all of them. How do we choose?' },
        { speaker: 'ada', text: 'Demos use tasks the tool is great at. Let\'s test all five on three of your team\'s real tasks, the same way.' },
        { speaker: 'narrator', text: 'Same three tasks, same prompts. Scored on accuracy, usefulness, data safety and cost. Two tools fall away in an hour.' },
        { speaker: 'tey', text: 'Fair comparison: your tasks, the same prompts, the same criteria. The best demo isn\'t always the best tool for you.' },
      ],
      choice: {
        prompt: 'How should Carmen\'s team compare the tools?',
        options: [
          { text: 'Same real tasks, same prompts, scored on the same criteria', outcome: 'Yes. Like-for-like, on work that matters to them.', best: true },
          { text: 'Pick the one with the best demo', outcome: 'Demos show best cases, not your cases.' },
          { text: 'Pick the cheapest', outcome: 'Cost matters, but so does whether it does the job.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Compare tools on 3 of your real tasks, with the same prompts, scored on accuracy, usefulness, data safety and cost.',
    },
  ],
  apply: {
    scenario: 'Carmen\'s team compares five tools.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why aren\'t demos a fair comparison?',
        options: [
          { text: 'Demos are fake', why: 'They\'re real, but chosen.' },
          { text: 'They show tasks the tool is great at, not your tasks' },
          { text: 'They\'re too short', why: 'They\'re chosen best cases.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a fair comparison.',
        lines: ['Pick 3 real tasks', 'Use the same prompts in each tool', 'Score on the same criteria', 'Compare the scores'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good comparison criterion, or not?',
        groups: ['Good criterion', 'Not useful'],
        items: [
          { text: 'Accuracy on our tasks', group: 0 },
          { text: 'How cool the logo is', group: 1 },
          { text: 'Data safety terms', group: 0 },
          { text: 'Cost per person', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many tools was Carmen pitched in a week?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'One tool\'s demo wrote an amazing poem. Shouldn\'t we pick that?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes, great poems.', why: 'Not your task.' },
          { text: 'Poems prove nothing at all.', why: 'Test on your tasks.' },
          { text: 'Your team doesn\'t write poems. Let\'s see how it does on your campaign briefs and reports.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Your real [[1]], the same [[2]], the same criteria.',
        blanks: [['tasks'], ['prompts']],
        distractors: ['demos', 'logos'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step makes the comparison unfair?',
        lines: [
          'Task 1: campaign brief, same prompt in each tool',
          'Task 2: report summary, same prompt in each tool',
          'Task 3: a different, easier prompt for the tool we like',
          'Score all on the same four criteria',
        ],
        bug: 2,
        fix: 'Same prompt for every tool.',
        explanation: 'Different prompts make scores incomparable.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the criterion to the question.',
        pairs: [
          ['Accuracy', 'Is it right?'],
          ['Usefulness', 'Does it save real work?'],
          ['Data safety', 'What happens to our data?'],
          ['Cost', 'Is it worth the price?'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s comparison rule.',
        tiles: ['Same', 'tasks,', 'same', 'prompts,', 'same', 'scores'],
        distractors: ['demo'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which test task is most useful?',
        options: [
          { text: 'Write a poem about spring.', why: 'Not their work.' },
          { text: 'Summarise this real campaign report for Carmen in 5 bullets with page numbers.' },
          { text: 'Tell me a joke.', why: 'Not their work.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fair, or unfair?',
        groups: ['Fair', 'Unfair'],
        items: [
          { text: 'Same report in every tool', group: 0 },
          { text: 'Testing only your favourite', group: 1 },
          { text: 'Same scoring sheet', group: 0 },
          { text: 'Judging by the salesperson', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How many real tasks does Ada suggest testing?',
        options: [
          { text: 'Three' },
          { text: 'One', why: 'Three gives a fairer picture.' },
          { text: 'Thirty', why: 'Too many to do quickly.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'If you had to compare two AI tools, which three real tasks would you test?',
    starters: ['Task 1:', 'Task 2:'],
  },
  deepen: { title: 'Try it today', summary: 'Run the same real task in two AI tools you have access to. Compare the results.' },
  notes: 'Content fictional. Tool-neutral by design.',
};

export default lesson;
