import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LR_FIT } from './code';

const T = LR_FIT + 't = test.assign(p=model.predict_proba(test[feats])[:, 1])\n';

/** Chapter 6 · Lesson 20 — Chapter Challenge: Monday's call list. Cliffhanger: the 80% trap (Chapter 7). */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Monday\'s call list',
  summary: 'Bisi\'s first real Monday with v0.6. Build the list, check it, explain the top booking, and give Folake the honest numbers. Then the regional office sends an email that makes everyone look again at "82% accurate".',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build, check and explain a real call list', 'Use every Chapter 6 skill together'],
  learn: [
    {
      kind: 'story',
      title: 'Monday',
      beats: [
        { speaker: 'bisi', text: 'Monday, 8 a.m. Twenty names, please. And the reason for the first one, in case she asks.' },
        { speaker: 'halima', text: 'Coming. Ranked by column 1, checked by eye, explained in a sentence.' },
        { speaker: 'narrator', text: 'By Friday the list has done what week 12 promised. Then an email arrives from the regional office.' },
        { speaker: 'emmanuel', text: 'The regional office says another region\'s model is "80% accurate" too. Their model predicts that everyone comes.' },
        { speaker: 'halima', text: 'Everyone comes? On week 12, that would be right for 163 of 200 bookings. 81.5%.' },
        { speaker: 'folake', text: 'So a model that does nothing scores 81.5%, and ours scores 82%? What have we been measuring?' },
        { speaker: 'tey', text: 'That\'s Chapter 6: classification, predict_proba, coefficients, call lists, thresholds, trees, depth, fair comparisons, explanation, three classes and bugs. Chapter 7 answers Folake: why accuracy lies, and what to measure instead.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 6 challenge: Bisi\'s Monday call list.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build Bisi\'s list: print how many of the top 20 week-12 bookings really missed',
        starter: LR_FIT,
        solution: T + 'print(t.nlargest(20, "p")["no_show"].sum())\n',
        hint: 'Column 1 of predict_proba, then nlargest(20)',
        checks: [{ message: 'Print 12', outputEquals: '12' }],
      },
      {
        kind: 'mcq',
        prompt: 'Before sending the list, what should Halima check?',
        options: [
          { text: 'That the code ran', why: 'Chidi\'s ran too, and caught 0.' },
          { text: 'That the top bookings look risky to a nurse: past misses, no reminder' },
          { text: 'Nothing; the model is tested', why: 'A quick look catches big bugs.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the clinic of the riskiest week-12 booking',
        starter: T,
        solution: T + 'print(t.nlargest(1, "p")["clinic"].iloc[0])\n',
        hint: 't.nlargest(1, "p")["clinic"].iloc[0]',
        checks: [{ message: 'Print Gumel', outputEquals: 'Gumel' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which chapter skill does each step use?',
        groups: ['Choosing the model', 'Using the model'],
        items: [
          { text: 'Agree the rule first', group: 0 },
          { text: 'Compare on validation', group: 0 },
          { text: 'Rank by column 1', group: 1 },
          { text: 'Explain the top booking', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the share of week-12 bookings where the patient came, rounded to 3 places: the score of "everyone comes"',
        starter: T,
        solution: T + 'print(round((t["no_show"] == 0).mean(), 3))\n',
        hint: '(t["no_show"] == 0).mean()',
        checks: [{ message: 'Print 0.815', outputEquals: '0.815' }],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Ours is 82%. "Everyone comes" is 81.5%. Is our model useless?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, scrap it.', why: 'It clearly helps Bisi.' },
          { text: 'No, 82 is bigger.', why: 'Half a point isn\'t the real story.' },
          { text: 'No: "everyone comes" catches zero no-shows, our top 20 catches 12. Accuracy can\'t see that difference. We need a better measure.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the result to the model.',
        pairs: [
          ['82% accurate, top 20 catches 12', 'v0.6'],
          ['81.5% accurate, catches 0', 'Everyone comes'],
          ['Top 20 catches 0', 'Ranking by column 0'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The trap.',
        template: 'When most patients [[1]], a model that predicts nobody misses still looks [[2]].',
        blanks: [['come'], ['accurate']],
        distractors: ['miss', 'useless'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on the regional report is misleading?',
        lines: ['Model: predicts everyone comes.', 'Accuracy: 80%.', 'Conclusion: the model works well.'],
        bug: 2,
        fix: 'Conclusion: the model catches no no-shows.',
        explanation: 'High accuracy, zero use: it never flags anyone.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many of week 12\'s 200 bookings came?',
        answers: ['163'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does Folake\'s question set up for Chapter 7?',
        options: [
          { text: 'Better ways to measure a classifier than accuracy' },
          { text: 'A bigger dataset', why: 'The problem is the measure, not the data.' },
          { text: 'Deep learning', why: 'First, measure properly.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Chapter 6 done: you trained, compared and explained real classifiers. Which skill felt most useful?',
    starters: ['The most useful was...', 'Because...'],
  },
  notes: 'Chapter 6 challenge. Week 12: v0.6 LR top 20 = 12; riskiest booking A12323 at Gumel; 37 no-shows, 163 came of 200; "everyone comes" accuracy 0.815 vs LR 0.82. Cliffhanger: the accuracy trap -> Chapter 7 (Measuring a classifier).',
};

export default lesson;
