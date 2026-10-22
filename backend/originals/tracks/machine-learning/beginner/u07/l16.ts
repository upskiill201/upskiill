import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { PROBS } from './code';

const FLAG = PROBS + 'flags = (p >= 0.2).astype(int)\n';
const MINUTES = 'def minutes(flags, answers):\n    missed = ((flags == 0) & (answers == 1)).sum()\n    return 20 * missed + 5 * flags.sum()\n';

/** Chapter 7 · Lesson 16 — A slide for the board. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'A slide for the board',
  summary: 'Folake gets three minutes at the board meeting. Halima has to fit the whole chapter onto one slide, and survive the director who asks "compared with what?". A story about presenting a classifier.',
  minutes: 12,
  outcomes: [
    'Present a classifier\'s results in the audience\'s terms',
    'Always show a baseline next to the model',
    'Answer "compared with what?"',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Three minutes',
      beats: [
        { speaker: 'folake', text: 'Three minutes, one slide. No "precision". They\'re clinic people.' },
        { speaker: 'halima', text: 'Then I\'ll say it in chairs and minutes. Week 12, the clinic flag at 0.2: 63 calls, which reached 26 of the 37 patients who would have missed.' },
        { speaker: 'miracle', text: 'And the baseline, on the same slide. Doing nothing: 37 empty chairs, 740 nurse-minutes lost.' },
        { speaker: 'halima', text: 'With the flag: 11 surprises left, plus the calls. 535 minutes. About three and a half hours saved, in one week, across eight clinics.' },
        { speaker: 'narrator', text: 'At the meeting, a director leans forward.' },
        { speaker: 'emmanuel', text: 'She\'s going to ask "compared with what?"' },
        { speaker: 'halima', text: 'Compared with doing nothing, on a week the model had never seen, with costs Bisi set before we looked. It\'s on the slide.' },
        { speaker: 'tey', text: 'The slide uses the audience\'s words, puts the baseline next to the model, and says how it was tested. That\'s most of good reporting.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The slide\'s numbers',
      caption: 'Everything on Halima\'s slide, from one run.',
      code: FLAG + MINUTES + '\nprint("Calls:", flags.sum())\nprint("No-shows reached:", ((flags == 1) & (y == 1)).sum(), "of", y.sum())\nprint("Minutes lost with the flag:", minutes(flags, y))\nprint("Minutes lost doing nothing:", 20 * y.sum())\n',
      challenge: 'Turn the minutes saved into hours.',
    },
  ],
  apply: {
    scenario: 'A slide for the board.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the minutes lost on week 12 with the 0.2 flag',
        starter: FLAG + MINUTES,
        solution: FLAG + MINUTES + 'print(minutes(flags, y))\n',
        hint: 'minutes(flags, y)',
        checks: [{ message: 'Print 535', outputEquals: '535' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why say "26 of 37 patients" instead of "recall 0.70"?',
        options: [
          { text: 'Recall is wrong', why: 'It\'s the same fact, in other words.' },
          { text: 'The board thinks in patients and chairs, not metric names' },
          { text: 'To hide the number', why: 'It\'s clearer, not hidden.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the minutes saved on week 12: doing nothing minus the flag',
        starter: FLAG + MINUTES,
        solution: FLAG + MINUTES + 'print(20 * y.sum() - minutes(flags, y))\n',
        hint: '20 * y.sum() - minutes(flags, y)',
        checks: [{ message: 'Print 205', outputEquals: '205' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'On the slide, or not?',
        groups: ['On the slide', 'Off the slide'],
        items: [
          { text: '26 of 37 no-shows reached', group: 0 },
          { text: 'Doing nothing: 740 minutes', group: 0 },
          { text: 'The F-beta formula', group: 1 },
          { text: 'Accuracy 76%', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'A director asked: "compared with what?" What do I say?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Compared with other AI companies.', why: 'We don\'t have that comparison.' },
          { text: 'Compared with 100%.', why: 'That\'s not a fair baseline.' },
          { text: 'Compared with doing nothing, on a week the model never saw, using costs the clinics agreed before we looked.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the slide line to its number.',
        pairs: [
          ['Calls made', '63'],
          ['No-shows reached', '26'],
          ['Minutes lost doing nothing', '740'],
          ['Minutes lost with the flag', '535'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The slide\'s headline.',
        template: 'Calling [[1]] patients reached 26 of 37 no-shows and saved [[2]] nurse-minutes.',
        blanks: [['63'], ['205']],
        distractors: ['200', '740'],
      },
      {
        kind: 'findBug',
        prompt: 'Which slide line would mislead the board?',
        lines: ['Tested on one week the model had never seen.', 'Saved about 3.4 nurse-hours across 8 clinics.', 'No-shows are now solved.'],
        bug: 2,
        fix: '11 no-shows still got through without a warning.',
        explanation: 'Show what\'s left, not just what\'s fixed.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many no-shows still got through with no warning?',
        answers: ['11', 'eleven'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is accuracy (76% at 0.2) left off the slide?',
        options: [
          { text: 'It\'s a secret', why: 'It\'s just not useful here.' },
          { text: 'It\'s lower than doing nothing (81.5%), even though the flag saves time: it would confuse, not inform' },
          { text: 'It\'s wrong', why: 'It\'s right, and misleading.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a result you\'ve had to explain to someone outside your field. What words did you swap?',
    starters: ['I said...', 'Instead of...'],
  },
  deepen: {
    title: 'Lower accuracy, more useful',
    summary: 'At 0.2 the flag is 76% accurate, below "everyone comes", yet it saves 205 minutes a week. It\'s the clearest proof in this chapter that accuracy measures the wrong thing for rare events.',
  },
  notes: 'Week 12 at 0.2: 63 flags, TP 26, FP 37, FN 11, accuracy 0.76. Minutes: flag 535, nothing 740, saved 205 (~3.4 h).',
};

export default lesson;
