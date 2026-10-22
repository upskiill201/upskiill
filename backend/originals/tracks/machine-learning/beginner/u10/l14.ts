import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FOREST, V9, VAL_BASE } from './code';

const TOP = (model: string) => `v = val.assign(p=${model}.predict_proba(val[feats])[:, 1])\nprint(sum(g.nlargest(20, "p")["no_show"].sum() for _, g in v.groupby("week")))\n`;

/** Chapter 10 · Lesson 14 — Choosing for the clinic, not the leaderboard. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Choosing for the clinic, not the leaderboard',
  summary: 'A leaderboard ranks models by one number. A clinic needs a model it can trust, explain, run and update. Tey walks through the full checklist, with the forest and v0.9 side by side.',
  minutes: 12,
  outcomes: [
    'List what matters beyond the score',
    'Weigh evidence, explanation, size and upkeep',
    'Make and defend a choice',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Suppose the forest and v0.9 had tied on minutes. How would you choose?', replies: ['Something besides the score?'] },
        { tey: 'Four things. First, evidence: which wins over 11 weeks, by more than the wobble? Here v0.9, by 165 minutes over the best forest.', replies: ['Second?'] },
        { tey: 'Explanation. Mrs Okonkwo asks why a patient is on the list. v0.9: "four past misses, no reminder". The forest: "47 of 100 trees leaned that way".', replies: ['Third?'] },
        { tey: 'Running cost: v0.9 is 1.7 KB, the forest about 380 KB, on old phones over mobile data.', replies: ['And fourth?'] },
        { tey: 'Upkeep: who can check it, retrain it and spot when it breaks? Six coefficients are easy to watch week by week.', replies: ['And on Bisi\'s list?'] },
        { tey: 'On the validation weeks, both reach 25 no-shows with 20 calls a week. On the clinic\'s other needs, v0.9 wins clearly. The leaderboard isn\'t the whole decision.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Bisi\'s list, both models',
      caption: 'No-shows reached by the top 20 each validation week.',
      code: VAL_BASE + V9 + FOREST + 'v9.fit(train[feats], train["no_show"])\nforest.fit(train[feats], train["no_show"])\nfor name, model in [("v0.9", v9), ("forest", forest)]:\n    v = val.assign(p=model.predict_proba(val[feats])[:, 1])\n    print(name, [g.nlargest(20, "p")["no_show"].sum() for _, g in v.groupby("week")])\n',
      challenge: 'If the lists tie, what decides?',
    },
  ],
  apply: {
    scenario: 'Choosing for the clinic.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many no-shows v0.9\'s top 20 reach across both validation weeks',
        starter: VAL_BASE + V9 + 'v9.fit(train[feats], train["no_show"])\n',
        solution: VAL_BASE + V9 + 'v9.fit(train[feats], train["no_show"])\n' + TOP('v9'),
        hint: 'Top 20 per week, then add the two',
        checks: [{ message: 'Print 25', outputEquals: '25' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which is NOT on Tey\'s checklist?',
        options: [
          { text: 'Evidence over 11 weeks', why: 'That\'s first on the list.' },
          { text: 'Which model sounds most advanced' },
          { text: 'Can staff understand it?', why: 'That\'s explanation.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Now the forest: print how many no-shows its top 20 reach across both validation weeks',
        starter: VAL_BASE + FOREST + 'forest.fit(train[feats], train["no_show"])\n',
        solution: VAL_BASE + FOREST + 'forest.fit(train[feats], train["no_show"])\n' + TOP('forest'),
        hint: 'Same code, forest',
        checks: [{ message: 'Print 25', outputEquals: '25' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Who wins on each point?',
        groups: ['v0.9 wins', 'Tie'],
        items: [
          { text: '11-week minutes lost', group: 0 },
          { text: 'Explaining one patient', group: 0 },
          { text: 'File size', group: 0 },
          { text: 'Bisi\'s top 20 on validation', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Other companies use forests. Won\'t we look behind?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Let\'s switch to look modern.', why: 'Appearances aren\'t evidence.' },
          { text: 'Forests are outdated.', why: 'They\'re fine; just not best here.' },
          { text: 'We tested forests properly and they lost on our data. Choosing the model that works best for our clinics is the opposite of falling behind.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the checklist item to v0.9\'s answer.',
        pairs: [
          ['Evidence', '165 minutes ahead over 11 weeks'],
          ['Explanation', '"Four past misses, no reminder"'],
          ['Running cost', 'About 1.7 KB'],
          ['Upkeep', 'Six numbers to watch'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The principle.',
        template: 'Choose for the [[1]], not the [[2]].',
        blanks: [['clinic'], ['leaderboard']],
        distractors: ['computer', 'patients'],
      },
      {
        kind: 'findBug',
        prompt: 'Which reason for choosing a model is weakest?',
        lines: ['It wins over 11 weeks.', 'Staff can understand its reasons.', 'Other companies use it.'],
        bug: 2,
        fix: 'It\'s small and easy to update.',
        explanation: 'What others use isn\'t evidence about our clinics.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes ahead of the best forest is v0.9 over 11 weeks?',
        answers: ['165'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'If a forest had clearly won on evidence, what then?',
        options: [
          { text: 'Weigh that gain against explanation, size and upkeep, and decide openly' },
          { text: 'Always ship the winner', why: 'Other needs still count.' },
          { text: 'Ignore it', why: 'Evidence matters most of all.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'When have you picked "the best on paper" and regretted it?',
    starters: ['Once...'],
  },
  deepen: {
    title: 'Model selection in practice',
    summary: 'Teams in hospitals and banks often prefer slightly weaker models they can audit and explain. In some places, rules require explanations for automated decisions about people.',
  },
  notes: 'Weeks 1-9 -> 10-11 top 20 per week: v0.9 [13, 12] = 25; RF(100, depth 5) [12, 13] = 25. Leave-one-week-out v0.9 6340 vs best RF 6505.',
};

export default lesson;
