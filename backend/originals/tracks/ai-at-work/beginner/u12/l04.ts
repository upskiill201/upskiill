import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 12 · Lesson 4 — matching the tool to the task. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Matching the tool to the task',
  summary: 'Ada stops asking "which AI is best?" and starts asking "which tool fits this task?". Five questions make the match.',
  minutes: 12,
  outcomes: [
    'Match a task to the right kind of tool',
    'Ask five questions before choosing',
    'Avoid using one tool for everything',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five questions to match tool and task',
      steps: [
        { title: '1. What\'s the task?', body: 'Writing, numbers, images, research, meetings, or something else?' },
        { title: '2. What data is involved?', body: 'Public, internal, personal or confidential? That decides which tools are allowed.' },
        { title: '3. Where does the work live?', body: 'In email, a document, a spreadsheet? Built-in AI may be easiest.' },
        { title: '4. What does a good result need?', body: 'Accuracy with sources? A specific format? Speed?' },
        { title: '5. Is AI even right for it?', body: 'Some tasks are faster by hand, or need a human. Covered in lesson 11.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Task, data, where it lives, what good looks like, and whether AI is right at all. Then pick the tool.',
    },
  ],
  apply: {
    scenario: 'Ada matches tools to tasks.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five questions.',
        lines: ['What\'s the task?', 'What data is involved?', 'Where does the work live?', 'What does good need?', 'Is AI right at all?'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the task to a sensible tool.',
        pairs: [
          ['Summarise an email thread', 'Built-in email AI'],
          ['Formula for a sheet', 'Spreadsheet AI or chat assistant'],
          ['Research with sources', 'An assistant that cites and searches'],
          ['A cover illustration', 'An image tool'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask about the data second?',
        options: [
          { text: 'It decides which tools you\'re even allowed to use' },
          { text: 'It\'s easy', why: 'It narrows the options.' },
          { text: 'It doesn\'t matter', why: 'It matters a lot.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which question does this answer?',
        groups: ['Data involved', 'Where it lives'],
        items: [
          { text: 'Customer phone numbers', group: 0 },
          { text: 'A shared spreadsheet', group: 1 },
          { text: 'A confidential contract', group: 0 },
          { text: 'An email thread', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Which AI is the best one?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'The newest one.', why: 'Depends on the task.' },
          { text: 'The most expensive.', why: 'Depends on the task.' },
          { text: 'Depends on the task. Tell me what you want to do and what data is involved, and I\'ll suggest the right kind of tool.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Don\'t ask which AI is [[1]]; ask which tool fits the [[2]].',
        blanks: [['best'], ['task']],
        distractors: ['newest', 'budget'],
      },
      {
        kind: 'findBug',
        prompt: 'Which match is a mistake?',
        lines: [
          'Thread summary: built-in email AI',
          'Formula: spreadsheet AI',
          'Customer ID list cleanup: a free public chat tool',
          'Cover image: approved image tool',
        ],
        bug: 2,
        fix: 'An approved tool, with personal data removed or allowed by policy.',
        explanation: 'Personal data rules out unapproved tools.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s first question.',
        tiles: ['What\'s', 'the', 'task?'],
        distractors: ['Which', 'brand?'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many questions does Ada ask before choosing a tool?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request helps Ada choose?',
        options: [
          { text: 'What\'s the best AI?', why: 'No task.' },
          { text: 'I need to turn weekly payment data into a chart for a client. Data is internal, in a spreadsheet. What kind of tool fits best?' },
          { text: 'Pick a tool for me.', why: 'No detail.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'One tool for everything, or matched?',
        groups: ['Matched', 'One for everything'],
        items: [
          { text: 'Email AI for threads, image tool for covers', group: 0 },
          { text: 'A chat tool for images, maths and meetings', group: 1 },
          { text: 'Spreadsheet AI for formulas', group: 0 },
          { text: 'Pasting every file into one chat', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why might one tool for everything be a problem?',
        options: [
          { text: 'It\'s boring', why: 'It\'s about fit and safety.' },
          { text: 'Tools have different strengths, and data rules may differ' },
          { text: 'It never is', why: 'Strengths differ.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Take one task you do with AI. Run the five questions. Are you using the best-fit tool?',
    starters: ['The task:', 'Best fit:'],
  },
  deepen: { title: 'Try it today', summary: 'Before your next AI task, answer the five questions in your head before opening a tool.' },
  notes: 'Tool-neutral guidance.',
};

export default lesson;
