import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 14 — changing careers when there's no internal option. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Changing from outside',
  summary: 'Clinton had an internal bridge. Many people don\'t. David\'s cousin, a bank clerk in Douala, wants to move into data analysis with no data team at her bank. Clinton and Miracle help her plan a change from the outside.',
  minutes: 12,
  outcomes: ['Plan a career change without an internal route', 'Build evidence through side projects and volunteering', 'Find a bridge role'],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to change from outside',
      steps: [
        { title: '1. Find the overlap in your current job', body: 'She makes the branch\'s weekly cash report in a spreadsheet. That\'s data work already. She asks her manager if she can automate it and add one chart.' },
        { title: '2. Build evidence on the side', body: 'One small project on public data, written up like a case study (How to Get Noticed, Chapter 2). Evenings, a few hours a week.' },
        { title: '3. Learn the basics, with a purpose', body: 'A focused course, used straight away on her project. Not five courses in parallel.' },
        { title: '4. Build a new network', body: 'Three informational chats with data analysts. A local data meet-up. The weak-ties lessons from How to Get Hired, again.' },
        { title: '5. Look for bridge roles', body: 'Roles that use both worlds: a reporting analyst at a bank, data work at a fintech that values banking knowledge. A full leap isn\'t the only option.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Overlap in your job, a side project, focused learning, a new network, bridge roles. Small steps, real evidence.',
    },
  ],
  apply: {
    scenario: 'Helping David\'s cousin change careers.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Find the overlap in your current job', 'Build evidence on the side', 'Learn the basics, with a purpose', 'Build a new network', 'Look for bridge roles'],
      },
      {
        kind: 'mcq',
        prompt: 'What overlap did she find in her current job?',
        options: [
          { text: 'None', why: 'The weekly report is data work.' },
          { text: 'The weekly cash report in a spreadsheet' },
          { text: 'Answering phones', why: 'The weekly report.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Bridge role, or full leap?',
        groups: ['Bridge role', 'Full leap'],
        items: [
          { text: 'Reporting analyst at a bank', group: 0 },
          { text: 'Machine-learning researcher abroad', group: 1 },
          { text: 'Data work at a fintech valuing banking', group: 0 },
          { text: 'Quitting to freelance with no clients', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the step that slows her down.',
        lines: ['One project on public data, written up.', 'Five courses at once, none used.', 'Three chats with analysts.'],
        bug: 1,
        explanation: 'Focused learning, used straight away.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best first step for her.',
        from: 'clinton',
        message: 'She has no data team at the bank. Where does she start?',
        options: [
          { text: 'Quit the bank tomorrow.', why: 'Start with overlap and evidence.' },
          { text: 'Give up; no team means no chance.', why: 'Change from outside is possible.' },
          { text: 'Ask her manager if she can automate the weekly cash report and add a chart. Overlap first.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to an earlier course.',
        pairs: [
          ['Side project write-up', 'How to Get Noticed, Ch2'],
          ['New network', 'How to Get Hired, Ch1'],
          ['Bridge story', 'This chapter'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How much time does the side project need?',
        options: [
          { text: 'A few hours a week, in the evenings' },
          { text: 'Every waking hour', why: 'A few hours a week.' },
          { text: 'None', why: 'A few hours a week.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Small [[1]], real [[2]].',
        blanks: [['steps'], ['evidence']],
        distractors: ['leaps', 'excuses', 'dreams'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many informational chats should she aim for? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good outside-change move, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Joining a local data meet-up', group: 0 },
          { text: 'Lying about experience on her CV', group: 1 },
          { text: 'A written-up public-data project', group: 0 },
          { text: 'Waiting for someone to discover her', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you wanted to change fields without an internal route, what overlap exists in what you do now?',
    starters: ['The overlap:', 'My side project could be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find one task in your current role or studies that overlaps with the field you\'re curious about. Ask to do more of it.',
  },
  notes: 'David\'s cousin is a named extra. Ties together skills from all three courses. Where you live: retraining support, public programmes and bridge roles vary; check locally.',
};

export default lesson;
