import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { PRED } from './code';

/** Chapter 7 · Lesson 4 — The confusion matrix. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The confusion matrix',
  summary: 'The four boxes, arranged in a 2×2 table, are called a confusion matrix. scikit-learn makes one in a line. Three cards on how to read it without getting confused yourself.',
  minutes: 11,
  outcomes: [
    'Make a confusion matrix with scikit-learn',
    'Read each cell correctly',
    'Spot the costly cell at a glance',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: the table.</strong> Rows are what really happened; columns are what the model said. For week 12 at 0.5:</p><pre>             said come   said miss\ncame            158          5\nmissed           31          6</pre><p>The diagonal (158 and 6) is right. Everything off it is wrong.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: one line of code.</strong> <code>confusion_matrix(y, pred)</code> returns exactly that table. Order matters: the real answers go first, the predictions second. Rows and columns follow the classes in order, 0 then 1.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: read the bottom row first.</strong> For no-shows, the bottom row is every patient who really missed: 31 the model missed, 6 it caught. That row tells Bisi how many empty chairs got through.</p>',
    },
    {
      kind: 'check',
      question: 'In confusion_matrix(y, pred), what do the rows show?',
      options: ['What really happened', 'What the model said', 'The features'],
      answer: 0,
      explanation: 'Rows: the truth. Columns: the prediction.',
    },
    {
      kind: 'tryIt',
      title: 'The matrix',
      caption: 'Week 12, v0.6 at the default threshold.',
      code: PRED + '\ncm = confusion_matrix(y, pred)\nprint(cm)\nprint("Missed no-shows (bottom left):", cm[1, 0])\n',
      challenge: 'Print cm[1, 1]. Which box is it?',
    },
  ],
  apply: {
    scenario: 'The confusion matrix.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the confusion matrix for week 12 as a list',
        starter: PRED,
        solution: PRED + 'print(confusion_matrix(y, pred).tolist())\n',
        hint: 'confusion_matrix(y, pred).tolist()',
        checks: [{ message: 'Print [[158, 5], [31, 6]]', outputEquals: '[[158, 5], [31, 6]]' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which cell holds the true positives?',
        options: [
          { text: 'Top left', why: 'That\'s true negatives.' },
          { text: 'Bottom left', why: 'That\'s false negatives.' },
          { text: 'Bottom right: missed, and the model said miss' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the bottom-left cell: no-shows the model missed',
        starter: PRED + 'cm = confusion_matrix(y, pred)\n',
        solution: PRED + 'cm = confusion_matrix(y, pred)\nprint(cm[1, 0])\n',
        hint: 'cm[1, 0]',
        checks: [{ message: 'Print 31', outputEquals: '31' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'On the diagonal (right), or off it (wrong)?',
        groups: ['Diagonal', 'Off the diagonal'],
        items: [
          { text: 'Came, said come', group: 0 },
          { text: 'Missed, said miss', group: 0 },
          { text: 'Came, said miss', group: 1 },
          { text: 'Missed, said come', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Why\'s it called a confusion matrix?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Because it\'s confusing.', why: 'Funny, but no.' },
          { text: 'It shows where the model gets confused: which real answers it mixes up with which predictions.' },
          { text: 'It\'s named after a scientist.', why: 'It describes the model\'s mix-ups.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the cell to its meaning.',
        pairs: [
          ['cm[0, 0]', 'Came, said come'],
          ['cm[0, 1]', 'Came, said miss'],
          ['cm[1, 0]', 'Missed, said come'],
          ['cm[1, 1]', 'Missed, said miss'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Making the matrix.',
        language: 'python',
        template: 'from sklearn.metrics import [[1]]\ncm = confusion_matrix([[2]], pred)',
        blanks: [['confusion_matrix'], ['y']],
        distractors: ['accuracy_score', 'test'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line swaps rows and columns?',
        language: 'python',
        lines: ['pred = model.predict(test[feats])', 'cm = confusion_matrix(pred, y)', 'print(cm)'],
        bug: 1,
        fix: 'cm = confusion_matrix(y, pred)',
        explanation: 'Real answers first, predictions second. Swapped, every off-diagonal cell is in the wrong place.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Add up all four cells. How many bookings?',
        answers: ['200'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'From the matrix, what\'s the accuracy?',
        options: [
          { text: '(158 + 6) ÷ 200 = 0.82' },
          { text: '158 ÷ 200', why: 'Add both diagonal cells.' },
          { text: '6 ÷ 11', why: 'That\'s a different measure (next lesson\'s).' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Draw a 2×2 table for a test you\'ve taken (e.g. a covid test). What goes in each cell?',
    starters: ['Top left...', 'Bottom left...'],
  },
  deepen: {
    title: 'Bigger matrices',
    summary: 'With three classes (quiet, normal, busy) the matrix is 3×3. The diagonal is still right, and each off-diagonal cell shows a specific mix-up, like "busy weeks predicted as normal".',
  },
  notes: 'Week 12 v0.6 at 0.5: confusion_matrix(y, pred) = [[158, 5], [31, 6]]. Accuracy (158 + 6) / 200 = 0.82.',
};

export default lesson;
