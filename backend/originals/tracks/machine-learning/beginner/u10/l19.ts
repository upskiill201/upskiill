import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FOREST, TEST_BASE, V9 } from './code';

const BOTH = TEST_BASE + V9 + FOREST + 'v9.fit(train[feats], train["no_show"])\nforest.fit(train[feats], train["no_show"])\n';
const WEEK12 = (m: string) => `flags = (${m}.predict_proba(test[feats])[:, 1] >= 0.2).astype(int)\nprint(minutes(flags, test["no_show"]))\n`;

/** Chapter 10 · Lesson 19 — Version 0.95. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Version 0.95',
  summary: 'The forest didn\'t replace v0.9. It did something else: it checked v0.9 against the strongest alternatives and gave a second view of what drives no-shows. Six steps to version 0.95.',
  minutes: 12,
  outcomes: [
    'Record a decision not to switch models',
    'Use a second model as a cross-check',
    'Report week 12 for the record, honestly',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From v0.9 to v0.95',
      steps: [
        { title: '1. The challengers', body: 'Forests (depths 3 to 6), boosting and a v0.9 + forest vote, all judged over 11 weeks.' },
        { title: '2. The verdict', body: 'v0.9 6,340 minutes. Vote 6,435, boosting 6,470, best forest 6,505. v0.9 stays the predictor.' },
        { title: '3. The cross-check', body: 'The forest agrees past misses is the strongest clue. Where they disagree (the reminder), we know why.' },
        { title: '4. The drivers chart', body: '"What predicts a missed appointment", ranked from v0.9, with the forest\'s agreement noted. The reminder flagged as worth a fair test.' },
        { title: '5. Week 12, for the record', body: 'After the decision: v0.9 520 minutes, forest 575. Both reach 12 in Bisi\'s top 20.', code: 'flags = (forest.predict_proba(test[feats])[:, 1] >= 0.2).astype(int)', language: 'python' },
        { title: '6. Write it down', body: 'v0.95: v0.9\'s model, now tested against forests and boosting over 11 weeks, plus the drivers chart. Re-run the comparison when the data grows.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Week 12, for the record',
      caption: 'Opened after the decision, not to make it.',
      code: BOTH + '\nfor name, model in [("v0.9", v9), ("forest", forest)]:\n    p = model.predict_proba(test[feats])[:, 1]\n    flags = (p >= 0.2).astype(int)\n    print(name, minutes(flags, test["no_show"]), "| top 20:", test.assign(p=p).nlargest(20, "p")["no_show"].sum())\n',
      challenge: 'Would it have been right to switch if the forest had won here?',
    },
  ],
  apply: {
    scenario: 'Version 0.95.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the forest\'s minutes lost on week 12, for the record',
        starter: BOTH,
        solution: BOTH + WEEK12('forest'),
        hint: 'Flag test at 0.2, then minutes',
        checks: [{ message: 'Print 575', outputEquals: '575' }],
      },
      {
        kind: 'mcq',
        prompt: 'What changed from v0.9 to v0.95?',
        options: [
          { text: 'A forest replaced logistic regression', why: 'v0.9 stayed.' },
          { text: 'New features', why: 'Same six.' },
          { text: 'Not the model: the evidence behind it and the drivers chart' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print v0.9\'s minutes lost on week 12',
        starter: BOTH,
        solution: BOTH + WEEK12('v9'),
        hint: 'Same code, v9',
        checks: [{ message: 'Print 520', outputEquals: '520' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Decided by 11 weeks, or only reported from week 12?',
        groups: ['Decided by 11 weeks', 'Reported from week 12'],
        items: [
          { text: 'Keep v0.9', group: 0 },
          { text: 'Best forest depth: 3', group: 0 },
          { text: 'Forest: 575 minutes', group: 1 },
          { text: 'v0.9: 520 minutes', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'A whole chapter and the version number barely moves?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'You\'re right, scrap it.', why: 'The evidence is real progress.' },
          { text: 'It moves because we know more: v0.9 survived its strongest challengers, and the clinics get a drivers chart. Not every version needs a new model.' },
          { text: 'We should switch to look busy.', why: 'Evidence decides.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its week-12 minutes (for the record).',
        pairs: [
          ['Doing nothing', '740'],
          ['v0.9', '520'],
          ['Forest', '575'],
          ['Boosting', '580'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The notebook line.',
        template: 'v0.95: v0.9 kept after testing [[1]] and boosting over 11 weeks, plus a [[2]] chart.',
        blanks: [['forests'], ['drivers']],
        distractors: ['features', 'accuracy'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step would break the rules?',
        lines: ['Decide with 11-week cross-validation.', 'Report week 12 after deciding.', 'Switch to whichever wins week 12.'],
        bug: 2,
        fix: 'The decision stands; week 12 is only reported.',
        explanation: 'Choosing on week 12 is peeking.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Bisi\'s week-12 top 20, how many no-shows do both models reach?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'When should the forest comparison be re-run?',
        options: [
          { text: 'Every day', why: 'Only when something meaningful changes.' },
          { text: 'Never', why: 'Data changes.' },
          { text: 'When there\'s much more data or new kinds of clues' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'When was "we tested it and kept what we had" the right answer in your life?',
    starters: ['Once...'],
  },
  deepen: {
    title: 'Champion and challenger',
    summary: 'Many teams keep a "champion" model in use and regularly test "challengers" against it. A challenger replaces the champion only when it clearly wins. v0.9 is Afiya\'s champion.',
  },
  notes: 'v0.95 = v0.9 kept; challengers over 11 weeks: vote 6435, HGB 6470, RF depth 3 6505 vs v0.9 6340. Week 12 for the record: v0.9 520, RF(100, depth 5) 575, HGB 580, nothing 740; top 20 both 12.',
};

export default lesson;
