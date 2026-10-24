import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LR_FIT } from './code';

const T = LR_FIT + 't = test.assign(p=model.predict_proba(test[feats])[:, 1])\n';

/** Chapter 6 · Lesson 16 — Bisi's call list: from chances to a morning's work. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Bisi\'s call list',
  summary: 'Bisi has one morning and a phone. How many calls is enough? Ten calls reach 6 no-shows, twenty reach 12, forty reach 19. A story about turning chances into a list a real person can work through.',
  minutes: 12,
  outcomes: [
    'Turn predicted chances into a ranked call list',
    'Choose a list length from the time available',
    'Count what a list of any length catches',
  ],
  learn: [
    {
      kind: 'story',
      title: 'One morning, one phone',
      beats: [
        { speaker: 'bisi', text: 'I get about two hours on Monday morning. Five minutes a call, with the ones who don\'t answer. That\'s twenty calls, maybe thirty if I skip tea.' },
        { speaker: 'halima', text: 'Then the threshold isn\'t really the question. The question is: who are your twenty?' },
        { speaker: 'narrator', text: 'Halima sorts week 12 by the model\'s chance, highest first, and counts down the list.' },
        { speaker: 'halima', text: 'Ten calls reach 6 people who would have missed. Twenty reach 12. Thirty reach 15. Forty reach 19.' },
        { speaker: 'bisi', text: 'So the first ten are the richest. After that, every extra ten calls finds fewer.' },
        { speaker: 'halima', text: 'Exactly. And picking at random, twenty calls would reach about 4 of the 37 who missed.' },
        { speaker: 'bisi', text: 'Twenty, then. And if I skip tea, thirty.' },
        { speaker: 'tey', text: 'A threshold says "everyone above 0.3". A list says "the top 20". When the limit is a person\'s time, the list is often the better fit.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Counting down the list',
      caption: 'How many no-shows each list length reaches on week 12.',
      code: T + '\nfor n in [10, 20, 30, 40]:\n    print(n, "calls reach", t.nlargest(n, "p")["no_show"].sum(), "no-shows")\nprint("No-shows in week 12:", t["no_show"].sum())\n',
      challenge: 'How many no-shows would 60 calls reach?',
    },
  ],
  apply: {
    scenario: 'Bisi\'s call list.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many no-shows Bisi\'s top 30 calls would reach',
        starter: T,
        solution: T + 'print(t.nlargest(30, "p")["no_show"].sum())\n',
        hint: 't.nlargest(30, "p")["no_show"].sum()',
        checks: [{ message: 'Print 15', outputEquals: '15' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why might Bisi prefer "top 20" over "everyone above 0.3"?',
        options: [
          { text: '0.3 is too low to be useful', why: 'It catches 22. The issue is that it flags 44, more than she can call.' },
          { text: 'Thresholds are wrong', why: 'Both are valid; it depends on the limit.' },
          { text: 'Her limit is time: a fixed number of calls fits her morning, whatever the week looks like' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many week-12 no-shows the top 20 would miss',
        starter: T + 'caught = t.nlargest(20, "p")["no_show"].sum()\n',
        solution: T + 'caught = t.nlargest(20, "p")["no_show"].sum()\nprint(t["no_show"].sum() - caught)\n',
        hint: 'All no-shows minus the ones caught',
        checks: [{ message: 'Print 25', outputEquals: '25' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Threshold or top-N list?',
        groups: ['Threshold', 'Top-N list'],
        items: [
          { text: '"Call everyone above 0.3"', group: 0 },
          { text: '"Call the 20 riskiest"', group: 1 },
          { text: 'Number of calls changes each week', group: 0 },
          { text: 'Fits a fixed morning', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Twenty calls and I still miss 25 people. Is it worth it?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'No, stop calling.', why: 'The list clearly helps.' },
          { text: 'Picking at random, twenty calls would reach about 4. The list reaches 12. It doesn\'t catch everyone, but it makes your morning three times as useful.' },
          { text: 'Call all 200.', why: 'She has two hours.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the list length to the no-shows it reaches.',
        pairs: [
          ['Top 10', '6'],
          ['Top 20', '12'],
          ['Top 30', '15'],
          ['Top 40', '19'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The list.',
        language: 'python',
        template: 'calls = t.[[1]](20, "[[2]]")',
        blanks: [['nlargest'], ['p']],
        distractors: ['nsmallest', 'no_show'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line builds a list of the safest bookings instead?',
        language: 'python',
        lines: ['t = test.assign(p=model.predict_proba(test[feats])[:, 1])', 'calls = t.nsmallest(20, "p")', 'print(calls["appointment_id"].tolist())'],
        bug: 1,
        fix: 'calls = t.nlargest(20, "p")',
        explanation: 'nsmallest picks the lowest chances: the people most likely to come anyway.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many no-shows were there in week 12 altogether?',
        answers: ['37'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Going from 10 calls to 20 adds 6 no-shows. Going from 30 to 40 adds 4. Why fewer?',
        options: [
          { text: 'The list is sorted riskiest first, so each extra call is a bit less likely to be a no-show' },
          { text: 'Bisi gets tired', why: 'This is about the list, not Bisi.' },
          { text: 'The model breaks after 30', why: 'It\'s working as intended.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a to-do list where you only have time for the top few. How do you decide what goes first?',
    starters: ['On my list...', 'I put first...'],
  },
  deepen: {
    title: 'Lift',
    summary: 'Comparing a list\'s catch with what random picking would get is called lift. Bisi\'s top 20 catches 12 where random would get about 4: a lift of about 3. Marketing teams use the same idea to decide whom to contact.',
  },
  notes: 'Week 12 LR ranked: top 10 -> 6, 20 -> 12, 30 -> 15, 40 -> 19 no-shows; 37 no-shows of 200; random 20 calls ~3.7. Top 20 misses 25.',
};

export default lesson;
