import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, F5, IMPORTS, MINUTES, PIPE, PIPE_IMPORTS, VAL_SPLIT } from './code';

const HUNCHES =
  'df["monday"] = (df["weekday"] == "Mon").astype(int)\n' +
  'df["vaccination"] = (df["visit_type"] == "Vaccination").astype(int)\n' +
  'df["young_adult"] = (df["age_group"] == "18-34").astype(int)\n' +
  'df["late_morning"] = df["hour"].isin([10, 11]).astype(int)\n';
const VAL = IMPORTS + PIPE_IMPORTS + DATA + HUNCHES + VAL_SPLIT + MINUTES + F5;
const SCORE = 'model.fit(train[cols], train["no_show"])\nflags = (model.predict_proba(val[cols])[:, 1] >= 0.2).astype(int)\nprint(minutes(flags, val["no_show"]))\n';

/** Chapter 8 · Lesson 16 — Halima's floor knowledge. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Halima\'s floor knowledge',
  summary: 'Bisi and Halima write down four hunches before looking at any numbers: Mondays, vaccinations, young adults, late mornings. Tey helps test each one against the rule. One survives.',
  minutes: 13,
  outcomes: [
    'Turn written-down hunches into features',
    'Test each one against an agreed rule',
    'Accept the result when a hunch fails',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'The list, written before looking: Mondays are bad. Vaccinations rarely miss. Young adults (18-34) miss more. Late mornings (10 to 11) miss more. Ready?', replies: ['Start with Mondays.'] },
        { tey: 'Starting from the five features at 1,245 validation minutes. Adding monday: 1,225. Saves 20, it has a reason, it\'s known in advance. It\'s in.', replies: ['Vaccinations?'] },
        { tey: '1,240: saves only 5. And vaccinations miss at 18.3%, the same as everyone. The hunch doesn\'t hold up here. Out.', replies: ['Young adults? They really do miss more.'] },
        { tey: 'They do: 21.3% against 16.9%. But adding the column makes validation worse: 1,285. Part of the reason is probably already in the other features, like past misses. A true pattern isn\'t always a useful feature.', replies: ['Late mornings?'] },
        { tey: '1,250: slightly worse. Out.', replies: ['So one of four. Is that bad?'] },
        { tey: 'It\'s normal, and honest. Floor knowledge is where good features come from, but the data decides which ones help. Bisi\'s Monday hunch made the cut.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Four hunches',
      caption: 'Each added to the five features, on validation.',
      code: VAL + '\nfor hunch in ["monday", "vaccination", "young_adult", "late_morning"]:\n    cols = feats + [hunch]\n    ' + PIPE.trim() + '\n    model.fit(train[cols], train["no_show"])\n    flags = (model.predict_proba(val[cols])[:, 1] >= 0.2).astype(int)\n    print(hunch, minutes(flags, val["no_show"]))\n',
      challenge: 'Which hunches save at least 20 minutes against 1,245?',
    },
  ],
  apply: {
    scenario: 'Halima\'s floor knowledge.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add monday to the five features and print validation minutes lost',
        starter: VAL + 'cols = feats + ["monday"]\n' + PIPE,
        solution: VAL + 'cols = feats + ["monday"]\n' + PIPE + SCORE,
        hint: 'Fit, flag at 0.2, minutes',
        checks: [{ message: 'Print 1225', outputEquals: '1225' }],
      },
      {
        kind: 'mcq',
        prompt: 'Young adults really do miss more. Why isn\'t young_adult in v0.8?',
        options: [
          { text: 'Adding it made validation worse: a true pattern can still be useless to this model' },
          { text: 'It\'s a leak', why: 'Age is known when booking.' },
          { text: 'Halima forgot', why: 'It was tested and failed.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add young_adult to the five features and print validation minutes lost',
        starter: VAL + 'cols = feats + ["young_adult"]\n' + PIPE,
        solution: VAL + 'cols = feats + ["young_adult"]\n' + PIPE + SCORE,
        hint: 'Same code, different hunch',
        checks: [{ message: 'Print 1285', outputEquals: '1285' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which hunches made the cut?',
        groups: ['In', 'Out'],
        items: [
          { text: 'Mondays', group: 0 },
          { text: 'Vaccinations', group: 1 },
          { text: 'Young adults', group: 1 },
          { text: 'Late mornings', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Three of my four hunches failed. Was I wrong?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, completely.', why: 'Two were true patterns; one helped.' },
          { text: 'You were right about Mondays, and right that young adults miss more. It\'s just that only Mondays added something the model didn\'t already know.' },
          { text: 'The data is wrong.', why: 'The test was fair and agreed first.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the hunch to its validation minutes (from 1,245).',
        pairs: [
          ['Mondays', '1,225'],
          ['Vaccinations', '1,240'],
          ['Young adults', '1,285'],
          ['Late mornings', '1,250'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The lesson.',
        template: 'Floor knowledge suggests [[1]]; the [[2]] decides which ones help.',
        blanks: [['features'], ['data']],
        distractors: ['answers', 'boss'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step breaks the process?',
        lines: ['Write the hunches down first.', 'Test each on validation against the rule.', 'Keep young_adult anyway because it feels right.'],
        bug: 2,
        fix: 'Leave it out; note it for the fairness check in Chapter 12.',
        explanation: 'The rule was agreed; feelings don\'t override it.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What share of vaccinations missed? (a percentage, 1 decimal place)',
        answers: ['18.3', '18.3%'],
        placeholder: 'A percentage',
      },
      {
        kind: 'mcq',
        prompt: 'Why might young_adult add nothing even though young adults miss more?',
        options: [
          { text: 'Age doesn\'t exist in the data', why: 'It\'s the age_group column.' },
          { text: 'The rate is made up', why: 'It\'s measured: 21.3%.' },
          { text: 'Other features, like past misses, may already capture much of why they miss' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of your own beliefs about your work would you like to test with data?',
    starters: ['I believe...', 'I\'d test it by...'],
  },
  deepen: {
    title: 'Correlated features',
    summary: 'When two features carry overlapping information, adding the second adds little, and can even make the model\'s estimates noisier. That\'s one reason a true pattern can fail as a feature.',
  },
  notes: 'Validation from five features (1245): + monday 1225 (in), + vaccination 1240, + young_adult 1285, + late_morning 1250. Rates: vaccination 0.183 (same as others); 18-34 0.213 vs 0.169.',
};

export default lesson;
