import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, IMPORTS } from './code';

const BASE = IMPORTS + DATA;

/** Chapter 10 · Lesson 7 — Importance isn't cause. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Importance isn\'t cause',
  summary: 'Folake wants to move patients closer to clinics because distance is "important". Five beliefs about what importance can and can\'t tell you, tested against the data.',
  minutes: 12,
  outcomes: [
    'Separate "helps predict" from "causes"',
    'Spot features that stand in for something else',
    'Know what evidence a cause would need',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A highly important feature causes the outcome.',
          isFact: false,
          explain: 'Myth. Importance means "helps this model guess". Distance helps partly because it stands in for being at Gumel, the rural clinic: all bookings over 18 km are Gumel\'s.',
        },
        {
          text: 'A feature can help predict without causing anything.',
          isFact: true,
          explain: 'Fact. Ice-cream sales predict sunburn. Both come from sunny days.',
        },
        {
          text: 'A low-importance feature doesn\'t matter in real life.',
          isFact: false,
          explain: 'Myth. The reminder is fourth in the forest chart, but reminder patients miss far less: 12.4% against 26.2% for those without one.',
        },
        {
          text: 'To know if reminders cause fewer no-shows, you\'d need to test it.',
          isFact: true,
          explain: 'Fact. For example, send reminders to a random half of patients and compare. Random assignment is what turns a pattern into evidence of cause.',
        },
        {
          text: 'Two models agreeing on importance proves cause.',
          isFact: false,
          explain: 'Myth. Both learned from the same data, with the same hidden reasons. Agreement makes a pattern more believable, not causal.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Distance or Gumel?',
      caption: 'Who has the long distances?',
      code: BASE + '\nfar = df[df["distance_km"] > 18]\nprint("Bookings over 18 km:", len(far))\nprint(far["clinic"].value_counts())\nprint(df.groupby("sms_reminder")["no_show"].mean().round(3))\n',
      challenge: 'Is distance still linked to no-shows within the city clinics alone?',
    },
  ],
  apply: {
    scenario: 'Importance isn\'t cause.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many different clinics have bookings over 18 km',
        starter: BASE + 'far = df[df["distance_km"] > 18]\n',
        solution: BASE + 'far = df[df["distance_km"] > 18]\nprint(far["clinic"].nunique())\n',
        hint: 'far["clinic"].nunique()',
        checks: [{ message: 'Print 1', outputEquals: '1' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Important means causes', group: 0 },
          { text: 'Predicting without causing is possible', group: 1 },
          { text: 'Low importance means no real effect', group: 0 },
          { text: 'Cause needs a fair test', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why might distance look so important?',
        options: [
          { text: 'Distance is the only cause', why: 'It stands in for several things.' },
          { text: 'A bug', why: 'It\'s a real, mixed-up signal.' },
          { text: 'It also tells the model "this is Gumel", with its buses, roads and fewer reminders' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the no-show rate for patients who got a reminder, rounded to 3 places',
        starter: BASE,
        solution: BASE + 'print(round(df[df["sms_reminder"] == 1]["no_show"].mean(), 3))\n',
        hint: 'Filter sms_reminder == 1, then mean of no_show',
        checks: [{ message: 'Print 0.124', outputEquals: '0.124' }],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Distance is important. Let\'s move patients to closer clinics!',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'The chart can\'t tell us that would work: distance partly stands for Gumel itself. If we want to know, we\'d test a change on some patients and compare.' },
          { text: 'Great idea.', why: 'Importance isn\'t cause.' },
          { text: 'Distance doesn\'t matter.', why: 'It helps predict; the question is why.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the claim to what it needs.',
        pairs: [
          ['"Distance helps predict"', 'Feature importance'],
          ['"Reminders reduce no-shows"', 'A fair, random test'],
          ['"Ice cream causes sunburn"', 'A hidden third factor'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Importance shows what helps the model [[1]], not what [[2]] the outcome.',
        blanks: [['guess'], ['causes']],
        distractors: ['remember', 'repeats'],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion goes too far?',
        lines: ['Past misses help the forest most.', 'Patients with reminders miss less often.', 'So reminders cut no-shows in half.'],
        bug: 2,
        fix: 'So reminders might help; a fair test would show how much.',
        explanation: 'Who gets reminders isn\'t random: Gumel gets fewer.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'All bookings over 18 km come from which clinic?',
        answers: ['Gumel', 'gumel'],
        placeholder: 'A clinic',
      },
      {
        kind: 'mcq',
        prompt: 'What would show whether reminders cause fewer no-shows?',
        options: [
          { text: 'A bigger forest', why: 'Models find patterns, not causes.' },
          { text: 'Higher importance', why: 'Importance isn\'t cause.' },
          { text: 'Sending reminders to a random half of patients and comparing' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a "fact" you\'ve heard that mixes up a link with a cause. What third factor might explain it?',
    starters: ['The "fact"...', 'A third factor...'],
  },
  deepen: {
    title: 'Randomised trials',
    summary: 'Medicine tests treatments by giving them to a random group and not to another. Randomness balances hidden factors, so differences can be blamed on the treatment. The same idea works for reminders.',
  },
  notes: 'All bookings with distance_km > 18 are Gumel. No-show rate with sms 0.124 vs without 0.262; city clinics only: distance > 9 km 0.195 vs 0.149 (Gumel gets fewer reminders). RF importance sms 0.131 (4th).',
};

export default lesson;
