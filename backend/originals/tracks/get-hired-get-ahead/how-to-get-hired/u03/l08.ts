import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 8 — build a story bank that covers most questions. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Six stories, most questions',
  summary: 'There are hundreds of possible interview questions. Miracle says Clinton doesn\'t need hundreds of answers. He needs about six good stories, each of which can answer several questions.',
  minutes: 12,
  outcomes: ['Choose six stories that cover common questions', 'Map each story to several questions', 'Keep the stories in a story bank'],
  learn: [
    {
      kind: 'steps',
      title: 'Build your story bank',
      steps: [
        { title: '1. List the common themes', body: 'Most behavioural questions are about a few themes: solving a problem, a mistake, working with others, a disagreement, learning fast, leading or taking initiative, handling pressure.' },
        { title: '2. Pick about six real stories', body: 'Clinton\'s: the offline confirmations, the broken sync, the Njangi Tracker, the credit mix-up with Nadia, starting the meet-up, and fixing phones at his aunt\'s stall.' },
        { title: '3. Write each in STAR, with a number', body: 'Five lines per story. One line each for S and T, two for A, one for R.' },
        { title: '4. Map stories to themes', body: 'Each story answers several questions. The Nadia story covers "disagreement", "working with others" and "handling a difficult situation".' },
        { title: '5. Practise picking fast', body: 'David reads a random question; Clinton picks a story in five seconds and tells it. That\'s the skill the real interview needs.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'About six real STAR stories, each mapped to several themes. Practise choosing the right one quickly.',
    },
  ],
  apply: {
    scenario: 'Clinton builds his story bank.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['List the common themes', 'Pick about six real stories', 'Write each in STAR', 'Map stories to themes', 'Practise picking fast'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each question to Clinton\'s best story.',
        pairs: [
          ['A time you disagreed with someone', 'The credit mix-up with Nadia'],
          ['A time you made a mistake', 'The broken sync'],
          ['A time you took initiative', 'Starting the meet-up'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which theme does the Nadia story cover?',
        groups: ['Covers it', 'Doesn\'t'],
        items: [
          { text: 'Disagreement', group: 0 },
          { text: 'Working with others', group: 0 },
          { text: 'Learning a new programming language', group: 1 },
          { text: 'Handling a difficult situation', group: 0 },
          { text: 'Managing money', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why about six stories, not one per question?',
        options: [
          { text: 'Six is a lucky number', why: 'Each story covers several themes.' },
          { text: 'Each story can answer several questions' },
          { text: 'Interviews only have six questions', why: 'They vary. Stories flex.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Can I use a story from fixing phones at my aunt\'s stall? It\'s not tech-company work.',
        options: [
          { text: 'No, only office work counts.', why: 'Any real experience can show the skill.' },
          { text: 'Only if I pretend it was a company.', why: 'Never pretend.' },
          { text: 'Yes: it shows dealing with upset customers and solving problems under pressure. Real counts.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak story bank entry.',
        lines: ['Offline confirmations: 11 drivers, 0 lost.', 'I\'m good with people (no story).', 'Broken sync: told Mr Tamba in 10 minutes.'],
        bug: 1,
        explanation: 'A claim isn\'t a story. Every entry needs a real STAR example.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How fast should Clinton practise picking a story?',
        options: [
          { text: 'About five seconds' },
          { text: 'Five minutes', why: 'Too slow for a real interview.' },
          { text: 'He shouldn\'t practise', why: 'Picking fast is the skill.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'About [[1]] real stories, each mapped to several [[2]].',
        blanks: [['six', '6'], ['themes', 'questions']],
        distractors: ['sixty', 'jokes', 'lies'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lines should each STAR story have in the bank? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Common interview theme, or not?',
        groups: ['Common theme', 'Not common'],
        items: [
          { text: 'Handling pressure', group: 0 },
          { text: 'Your favourite film', group: 1 },
          { text: 'Learning fast', group: 0 },
          { text: 'Working with others', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'List six real stories from your life (work, study, volunteering, family). Which themes does each cover?',
    starters: ['1.', '2.'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your first three stories in STAR, five lines each. You\'ll finish the bank in lesson 19.',
  },
  notes: 'Story-bank method is standard interview coaching.',
};

export default lesson;
