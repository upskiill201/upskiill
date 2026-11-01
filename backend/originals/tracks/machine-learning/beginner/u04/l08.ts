import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LOAD } from './code';

/** Chapter 4 · Lesson 8 — Columns from the future: tap through the export. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Columns from the future',
  summary: 'Halima prints the 14 column names and goes through them like a ward round: when is each one known? Most are fine. One is a leak. One is tricky. Tap through her notes.',
  minutes: 12,
  outcomes: [
    'Sort every column by when it becomes known',
    'Spot the tricky in-between cases',
    'Drop the columns a predictor must not use',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Halima\'s column round',
      text: 'appointment_id: just a label. clinic, week, weekday, hour, visit_type, age_group: known when the booking is made. wait_days and sms_reminder: known before the day. distance_km and previous_no_shows: known from the patient\'s record. rain: only known on the day itself. confirmed_on_day: filled in by reception on the day, after the fact. no_show: the answer.',
      hotspots: [
        { phrase: 'appointment_id: just a label', note: 'An ID tells you nothing about the patient. As a feature it would only let the model memorise.' },
        { phrase: 'known when the booking is made', note: 'Safe: Bisi has all of these the evening before.' },
        { phrase: 'known from the patient\'s record', note: 'Safe, as long as previous_no_shows counts only earlier appointments, never this one.' },
        { phrase: 'rain: only known on the day itself', note: 'Tricky. The evening before, Bisi only has a forecast. Chapter 8 uses the forecast honestly.' },
        { phrase: 'filled in by reception on the day, after the fact', note: 'The leak. Written once the answer is known.' },
        { phrase: 'no_show: the answer', note: 'The label. Never a feature.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Do a "column round" before any model: for every column, write down when it becomes known. Anything known after the moment of prediction stays out.',
    },
    {
      kind: 'tryIt',
      title: 'Drop the future',
      caption: 'Keep only columns known the evening before.',
      code: LOAD + '\nfuture = ["confirmed_on_day", "no_show", "appointment_id"]\nsafe = [c for c in df.columns if c not in future]\nprint(len(safe), "safe columns:")\nprint(safe)\n',
      challenge: 'Where would rain go? Add it to future and see the list shrink.',
    },
  ],
  apply: {
    scenario: 'The column round.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make a list of the columns that aren\'t confirmed_on_day, no_show or appointment_id. Print how many there are',
        starter: LOAD + 'future = ["confirmed_on_day", "no_show", "appointment_id"]\n',
        solution: LOAD + 'future = ["confirmed_on_day", "no_show", "appointment_id"]\nsafe = [c for c in df.columns if c not in future]\nprint(len(safe))\n',
        hint: 'safe = [c for c in df.columns if c not in future]',
        checks: [{ message: 'Print 11', outputEquals: '11' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'When does Bisi know it?',
        groups: ['The evening before', 'Only on the day or after'],
        items: [
          { text: 'wait_days', group: 0 },
          { text: 'rain (actual)', group: 1 },
          { text: 'previous_no_shows', group: 0 },
          { text: 'confirmed_on_day', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is appointment_id a bad feature, even though it\'s known in advance?',
        options: [
          { text: 'It\'s from the future', why: 'It\'s known at booking. It\'s just meaningless.' },
          { text: 'It\'s just a label: it says nothing about the patient and only helps memorising' },
          { text: 'It\'s text', why: 'Even as a number it would carry no real pattern.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Drop confirmed_on_day from the table and print how many columns are left',
        starter: LOAD,
        solution: LOAD + 'df = df.drop(columns=["confirmed_on_day"])\nprint(df.shape[1])\n',
        hint: 'df.drop(columns=["confirmed_on_day"]), then df.shape[1]',
        checks: [
          { message: 'Print 13', outputEquals: '13' },
          { message: 'confirmed_on_day is gone', expr: '"confirmed_on_day" not in df.columns' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'I call people the evening before. Can the model use tomorrow\'s rain?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, rain is always fine.', why: 'The actual rain isn\'t known the evening before.' },
          { text: 'Never mention rain again.', why: 'A forecast is fair. Chapter 8 uses it.' },
          { text: 'Only the forecast you\'d have that evening. The real rain is only known on the day, so training on it would be a small leak.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the column to Halima\'s note.',
        pairs: [
          ['appointment_id', 'Just a label'],
          ['rain', 'Tricky: only known on the day'],
          ['confirmed_on_day', 'The leak'],
          ['no_show', 'The answer'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The column round.',
        template: 'Anything known [[1]] the moment of prediction stays [[2]].',
        blanks: [['after'], ['out']],
        distractors: ['before', 'in'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the safe list is wrong?',
        language: 'python',
        lines: ['safe = ["wait_days", "sms_reminder"]', 'safe += ["distance_km", "previous_no_shows"]', 'safe += ["confirmed_on_day"]'],
        bug: 2,
        fix: 'Delete the line: confirmed_on_day isn\'t safe',
        explanation: 'confirmed_on_day is written on the day, after the fact.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'appointments.csv has 14 columns. After dropping confirmed_on_day, no_show and appointment_id, how many are left?',
        answers: ['11', 'eleven'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'previous_no_shows is safe on one condition. Which?',
        options: [
          { text: 'It\'s below 5', why: 'The size doesn\'t matter. What it counts does.' },
          { text: 'It counts only earlier appointments, never this one' },
          { text: 'It\'s scaled', why: 'Scaling doesn\'t stop a leak.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Halima\'s nurse training made her ask "when was this written?" about every chart. What habit from your work or studies would make you good at spotting leaks?',
    starters: ['My habit is...', 'It helps because...'],
  },
  deepen: {
    title: 'The moment of prediction',
    summary: 'Every model is used at a specific moment: for Bisi, the evening before. Write that moment down first. Then "is this a leak?" becomes a simple question about time.',
  },
  notes: 'appointments.csv has 14 columns. Excluding confirmed_on_day, no_show, appointment_id leaves 11 (clinic, week, weekday, hour, visit_type, age_group, wait_days, sms_reminder, distance_km, previous_no_shows, rain). Rain effect: dry 17.2%, rain 21.5%.',
};

export default lesson;
