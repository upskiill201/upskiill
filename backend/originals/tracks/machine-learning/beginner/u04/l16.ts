import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LOAD } from './code';

/** Chapter 4 · Lesson 16 — The leak hunt: checking every column at once. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'The leak hunt',
  summary: 'Next month\'s export will have new columns. Halima doesn\'t want to find the next leak by luck. She writes a ten-second check that puts every yes/no column side by side, so a too-perfect one jumps out.',
  minutes: 13,
  outcomes: [
    'Compare how strongly each column separates the answer',
    'Use a loop to check many columns at once',
    'Decide whether a strong column is a pattern or a leak',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Next month\'s export',
      beats: [
        { speaker: 'emmanuel', text: 'Heads up: from next month the export gets three new columns. I don\'t know what half of them mean.' },
        { speaker: 'halima', text: 'Then I want a check that runs on every export: for each yes/no column, the no-show rate when it\'s 0 and when it\'s 1, and the gap between them.' },
        { speaker: 'chidi', text: 'A big gap means a great feature. So we keep the biggest.' },
        { speaker: 'miracle', text: 'Or a leak. A big gap is where you look, not what you keep.' },
        { speaker: 'narrator', text: 'Halima runs it on today\'s file. sms_reminder: a gap of 0.138. rain: 0.043. confirmed_on_day: 0.883.' },
        { speaker: 'tey', text: 'One column\'s gap is six times the next biggest. What should Halima do with the check?' },
      ],
      choice: {
        prompt: 'What should Halima do with a column whose gap is far bigger than the rest?',
        options: [
          { text: 'Investigate: ask when it\'s filled in, before using it.', outcome: 'Yes. A huge gap is the alarm bell. Here, it rings for confirmed_on_day, written after the fact.', best: true },
          { text: 'Keep it: the biggest gap is the best feature.', outcome: 'That\'s how Chidi got 97.5%. A gap that big is usually too good to be true.' },
          { text: 'Drop every column with a gap.', outcome: 'Then the model loses real patterns too, like the reminder.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'The leak check',
      caption: 'Every yes/no column, side by side.',
      code: LOAD + '\nfor col in ["sms_reminder", "rain", "confirmed_on_day"]:\n    rates = df.groupby(col)["no_show"].mean()\n    gap = rates.max() - rates.min()\n    print(col, round(gap, 3))\n',
      challenge: 'Add "previous_no_shows". Its values go from 0 to 4: is max minus min still a fair check?',
    },
  ],
  apply: {
    scenario: 'The leak hunt.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'For sms_reminder, rain and confirmed_on_day, print the column name and the gap between its highest and lowest no-show rate, rounded to 3 places',
        starter: LOAD + 'for col in ["sms_reminder", "rain", "confirmed_on_day"]:\n    rates = df.groupby(col)["no_show"].mean()\n',
        solution: LOAD + 'for col in ["sms_reminder", "rain", "confirmed_on_day"]:\n    rates = df.groupby(col)["no_show"].mean()\n    print(col, round(rates.max() - rates.min(), 3))\n',
        hint: 'print(col, round(rates.max() - rates.min(), 3))',
        checks: [{ message: 'Print the three gaps: 0.138, 0.043, 0.883', outputEquals: 'sms_reminder 0.138\nrain 0.043\nconfirmed_on_day 0.883' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a huge gap a reason to look, not a reason to keep?',
        options: [
          { text: 'Big gaps are always fine', why: 'That\'s how leaks get in.' },
          { text: 'Big gaps slow the model', why: 'Speed isn\'t the issue.' },
          { text: 'Real patterns are usually modest; a near-perfect split often means the column was written after the answer' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Look into it, or a normal pattern?',
        groups: ['Look into it', 'Normal pattern'],
        items: [
          { text: 'A gap of 0.883', group: 0 },
          { text: 'A gap of 0.138', group: 1 },
          { text: 'One value means "always missed"', group: 0 },
          { text: 'A gap of 0.043', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the column with the biggest gap',
        starter: LOAD + 'gaps = {}\nfor col in ["sms_reminder", "rain", "confirmed_on_day"]:\n    rates = df.groupby(col)["no_show"].mean()\n    gaps[col] = rates.max() - rates.min()\n',
        solution: LOAD + 'gaps = {}\nfor col in ["sms_reminder", "rain", "confirmed_on_day"]:\n    rates = df.groupby(col)["no_show"].mean()\n    gaps[col] = rates.max() - rates.min()\nprint(max(gaps, key=gaps.get))\n',
        hint: 'max(gaps, key=gaps.get) gives the key with the biggest value',
        checks: [{ message: 'Print confirmed_on_day', outputEquals: 'confirmed_on_day' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'So the leak check says rain is weak. Should we drop it?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, drop everything under 0.1.', why: 'Small real patterns can still help.' },
          { text: 'Weak isn\'t useless: a 4-point gap is real. The check finds leaks; it doesn\'t pick features.' },
          { text: 'Rain is the leak.', why: 'Its gap is small. The alarm is confirmed_on_day.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the column to its gap.',
        pairs: [
          ['sms_reminder', '0.138'],
          ['rain', '0.043'],
          ['confirmed_on_day', '0.883'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Miracle\'s rule.',
        template: 'A big gap is where you [[1]], not what you [[2]].',
        blanks: [['look'], ['keep']],
        distractors: ['stop', 'drop'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line turns the check into a leak-finder that also adds the leak?',
        language: 'python',
        lines: ['gaps[col] = rates.max() - rates.min()', 'best = max(gaps, key=gaps.get)', 'feats.append(best)'],
        bug: 2,
        fix: 'print(best)  # then ask when it\'s filled in',
        explanation: 'The column with the biggest gap is the one to question, not to add automatically.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Roughly how many times bigger is confirmed_on_day\'s gap than sms_reminder\'s? (0.883 / 0.138, to the nearest whole number.)',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'When should the leak check run?',
        options: [
          { text: 'Once, years ago', why: 'New columns arrive. Run it every time.' },
          { text: 'After the board meeting', why: 'By then a leak has already done its damage.' },
          { text: 'On every new export, before any model is trained' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Halima turned a lesson learned the hard way into a check that runs every time. What mistake of yours could become a checklist?',
    starters: ['My mistake was...', 'My check would be...'],
  },
  deepen: {
    title: 'Beyond yes/no columns',
    summary: 'For columns with many values, the same idea works with more care: compare the no-show rate across values, or train a tiny one-column model and see if it\'s suspiciously good.',
  },
  notes: 'appointments.csv gaps (max - min no-show rate): sms_reminder 0.138 (0.262 vs 0.124), rain 0.043 (0.215 vs 0.172), confirmed_on_day 0.883 (0.887 vs 0.004). 0.883/0.138 = 6.4.',
};

export default lesson;
