import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, F6, IMPORTS, MONDAY, PIPE8, PIPE_IMPORTS, RAW, SPLIT } from './code';

const FIT = IMPORTS + PIPE_IMPORTS + DATA + MONDAY + SPLIT + F6 + PIPE8 + 'model.fit(train[feats], train["no_show"])\n';
const NEW = FIT + RAW + 'raw["monday"] = (raw["weekday"] == "Mon").astype(int)\nnew = raw[raw["week"] == 12].drop_duplicates()\np = model.predict_proba(new[feats])[:, 1]\n';

/** Chapter 8 · Lesson 20 — Chapter Challenge: Monday's raw export. Cliffhanger: better, or lucky? (Chapter 9). */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: the raw export',
  summary: 'Emmanuel sends next week\'s export straight from the booking system: duplicates, blank distances, " km" typed by hand. v0.8 has to handle it with no cleaning by Halima. Then Chidi arrives with a tree that\'s nearly perfect.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Run a pipeline on a messy real-world file', 'Use every Chapter 8 skill together'],
  learn: [
    {
      kind: 'story',
      title: 'Straight from the system',
      beats: [
        { speaker: 'emmanuel', text: 'Week 12, raw. Two rows exported twice, one blank distance, a few "km"s typed in. Sorry.' },
        { speaker: 'halima', text: 'Fix the " km" text, drop the duplicates, and the pipeline does the rest: fills the blank, scales, scores.' },
        { speaker: 'narrator', text: 'The list is ready before Bisi\'s first coffee. Then Chidi appears, grinning.' },
        { speaker: 'chidi', text: 'Forget logistic regression. I grew a decision tree with no depth limit on every number column. It\'s nearly perfect on the training weeks!' },
        { speaker: 'miracle', text: 'And v0.8 tied v0.7 on week 12. So we have one model that might be slightly better and one that\'s nearly perfect on data it has already seen. How do we tell what\'s real?' },
        { speaker: 'tey', text: 'That\'s Chapter 8: features, categories, one-hot, scaling, missing values, new and time features, rain, pipelines, safe fitting, too many features, features to avoid, and floor knowledge. Chapter 9 answers Miracle: overfitting, and cross-validation.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 8 challenge: v0.8 on Emmanuel\'s raw week-12 export.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Load the raw export, drop duplicates in week 12, and print how many bookings are left',
        starter: IMPORTS + RAW,
        solution: IMPORTS + RAW + 'new = raw[raw["week"] == 12].drop_duplicates()\nprint(len(new))\n',
        hint: 'raw[raw["week"] == 12].drop_duplicates()',
        checks: [{ message: 'Print 200', outputEquals: '200' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which problem in the raw file does the pipeline fix by itself?',
        options: [
          { text: 'Blank distances: the imputer fills them' },
          { text: 'Duplicate rows', why: 'Drop those before predicting.' },
          { text: '" km" text', why: 'Fix that with pandas first.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Run v0.8 on the raw week and print how many bookings it flags at 0.2',
        starter: NEW,
        solution: NEW + 'print((p >= 0.2).sum())\n',
        hint: '(p >= 0.2).sum()',
        checks: [{ message: 'Print 63', outputEquals: '63' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Who fixes it: pandas first, or the pipeline?',
        groups: ['pandas first', 'The pipeline'],
        items: [
          { text: '"12 km" typed as text', group: 0 },
          { text: 'Rows exported twice', group: 0 },
          { text: 'Blank distance', group: 1 },
          { text: 'Different scales', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the no-show chance v0.8 gives the booking with a blank distance (A12302), rounded to 3 places',
        starter: NEW + 'new = new.assign(p=p)\n',
        solution: NEW + 'new = new.assign(p=p)\nprint(round(new[new["appointment_id"] == "A12302"]["p"].iloc[0], 3))\n',
        hint: 'Filter appointment_id == "A12302", then ["p"].iloc[0]',
        checks: [{ message: 'Print 0.113', outputEquals: '0.113' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Nearly perfect on training! My tree beats everything.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Ship it.', why: 'Training scores are too hopeful.' },
          { text: 'Trees are banned.', why: 'Trees are fine; the test is what matters.' },
          { text: 'Remember the ID model in lesson 13: 100% on training, nothing gained on validation. Perfect on seen data usually means memorised. Chapter 9 tests it properly.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Chapter 8 tool to the raw-file problem.',
        pairs: [
          ['SimpleImputer', 'Blank distance'],
          ['drop_duplicates', 'Rows exported twice'],
          ['str.replace(" km", "")', 'Distance typed as text'],
          ['StandardScaler', 'Different units'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The chapter in one line.',
        template: 'Good [[1]] from floor knowledge, tested on validation, inside a [[2]] fitted on training.',
        blanks: [['features'], ['pipeline']],
        distractors: ['models', 'leak'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step would break on next week\'s file?',
        lines: ['Fix " km" text with pandas.', 'Drop duplicates.', 'Delete bookings with a blank distance.'],
        bug: 2,
        fix: 'Let the imputer fill blank distances.',
        explanation: 'Those patients still need a prediction.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'v0.8 tied v0.7 on week 12. How many minutes did both lose?',
        answers: ['535'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Chapter 8 done: you built features and a pipeline that survive messy data. What will you check first in a new spreadsheet?',
    starters: ['First I\'ll check...'],
  },
  notes: 'Chapter 8 challenge. Raw week 12 after " km" fix and drop_duplicates: 200 bookings; v0.8 (fitted on clean weeks 1-11) flags 63 at 0.2; A12302 (blank distance, Yaba) p = 0.113. Cliffhanger: Chidi\'s unlimited tree nearly perfect on training; is v0.8 really better? -> Chapter 9.',
};

export default lesson;
