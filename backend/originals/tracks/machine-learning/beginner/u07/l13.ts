import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { PROBS } from './code';

const FLAGGED = PROBS + 't = test.assign(flag=(p >= 0.2).astype(int))\n';

/** Chapter 7 · Lesson 13 — Scores per clinic. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Scores per clinic',
  summary: 'One overall recall can hide a clinic the model barely helps. Halima splits week 12 by clinic at a threshold of 0.2. Tap through what the per-clinic numbers say, and what they can\'t.',
  minutes: 12,
  outcomes: [
    'Break a measure down by group',
    'Spot a group the model serves badly',
    'Be careful with very small numbers',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Week 12 by clinic, threshold 0.2',
      text: 'Overall, the flag catches 26 of 37 no-shows. At Gumel it catches all 6, and at Kano City all 4. At Lekki it catches 1 of 3, and at Surulere 2 of 6. Wuse gets 11 flags for just 2 no-shows. With 3 to 6 no-shows per clinic, one patient changes recall a lot.',
      hotspots: [
        { phrase: 'catches 26 of 37 no-shows', note: 'Recall 0.70 across all eight clinics.' },
        { phrase: 'At Gumel it catches all 6', note: 'Recall 1.0. Gumel patients live far away and have more past misses: the clues the model relies on.' },
        { phrase: 'At Lekki it catches 1 of 3', note: 'Recall 0.33. Lekki\'s no-shows may have reasons the four features can\'t see.' },
        { phrase: 'Wuse gets 11 flags for just 2 no-shows', note: 'Precision 0.18: Wuse\'s receptionist would make many wasted calls.' },
        { phrase: 'one patient changes recall a lot', note: 'At Lekki, catching one more patient would move recall from 0.33 to 0.67. Treat these as warnings to look closer, not verdicts.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Per-clinic recall',
      caption: 'Group by clinic, then count.',
      code: FLAGGED + '\nfor clinic, g in t.groupby("clinic"):\n    caught = ((g["flag"] == 1) & (g["no_show"] == 1)).sum()\n    print(clinic, "caught", caught, "of", g["no_show"].sum(), "| flags", g["flag"].sum())\n',
      challenge: 'Which clinic would you look at first, and what would you check?',
    },
  ],
  apply: {
    scenario: 'Scores per clinic.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many no-shows the 0.2 flag catches at Surulere',
        starter: FLAGGED + 'g = t[t["clinic"] == "Surulere"]\n',
        solution: FLAGGED + 'g = t[t["clinic"] == "Surulere"]\nprint(((g["flag"] == 1) & (g["no_show"] == 1)).sum())\n',
        hint: '((g["flag"] == 1) & (g["no_show"] == 1)).sum()',
        checks: [{ message: 'Print 2', outputEquals: '2' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why check scores per clinic at all?',
        options: [
          { text: 'An overall number can hide a clinic the model barely helps' },
          { text: 'To find the best clinic manager', why: 'It\'s about the model, not staff.' },
          { text: 'The overall number is wrong', why: 'It\'s right; it\'s just an average.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many bookings the 0.2 flag marks at Wuse',
        starter: FLAGGED + 'g = t[t["clinic"] == "Wuse"]\n',
        solution: FLAGGED + 'g = t[t["clinic"] == "Wuse"]\nprint(g["flag"].sum())\n',
        hint: 'g["flag"].sum()',
        checks: [{ message: 'Print 11', outputEquals: '11' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Week 12 at 0.2: recall high or low?',
        groups: ['High (0.8 or more)', 'Low (under 0.5)'],
        items: [
          { text: 'Gumel', group: 0 },
          { text: 'Kano City', group: 0 },
          { text: 'Lekki', group: 1 },
          { text: 'Surulere', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Lekki 0.33! Is the model broken for Lekki?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, turn it off for Lekki.', why: 'Three patients isn\'t enough to decide.' },
          { text: 'Maybe, maybe not: it\'s 1 of 3 patients. It\'s a warning to watch Lekki over more weeks and ask its staff why patients miss.' },
          { text: 'No, ignore it.', why: 'It\'s worth watching.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the clinic to its week-12 result at 0.2.',
        pairs: [
          ['Gumel', 'Caught 6 of 6'],
          ['Lekki', 'Caught 1 of 3'],
          ['Wuse', '11 flags, 2 no-shows'],
          ['Ikeja', 'Caught 3 of 5'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Splitting by clinic.',
        language: 'python',
        template: 'for clinic, g in t.[[1]]("clinic"):\n    print(clinic, g["no_show"].[[2]]())',
        blanks: [['groupby'], ['sum']],
        distractors: ['sort_values', 'len'],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion goes too far?',
        lines: ['Overall recall is 0.70.', 'Lekki\'s recall is 0.33, from 3 no-shows.', 'So the model doesn\'t work for Lekki patients.'],
        bug: 2,
        fix: 'So Lekki is worth watching over more weeks.',
        explanation: 'Three patients is far too few to prove anything.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'At Wuse, 11 flags caught 2 no-shows. Precision, to 2 decimal places?',
        answers: ['0.18', '.18'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best next step for the clinics with low scores?',
        options: [
          { text: 'Build one model per clinic right away', why: 'Too little data per clinic for that.' },
          { text: 'Hide the per-clinic numbers', why: 'They\'re useful warnings.' },
          { text: 'Track them over more weeks and ask staff what the model can\'t see' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of an average that might hide a group doing badly (a class, a team, a city). How would you check?',
    starters: ['The average...', 'I\'d check...'],
  },
  deepen: {
    title: 'Groups and fairness',
    summary: 'Splitting scores by group is the first step of a fairness check. Chapter 12 does it properly, for groups like age, and asks whether differences are the model\'s fault or the data\'s.',
  },
  notes: 'Week 12 at 0.2 by clinic (bookings, no-shows, flags, caught): Gumel 10/6/9/6; Ibadan North 29/5/7/4; Ikeja 28/5/8/3; Kano City 24/4/9/4; Lekki 21/3/6/1; Surulere 30/6/6/2; Wuse 26/3/11/2; Yaba 32/5/7/4. Overall 26/37.',
};

export default lesson;
