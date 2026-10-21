import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story with a choice: saving what's left never works. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Two missed Sundays',
  summary: 'Weeks 5 and 6: GH₵250 that should have gone to the jar stayed in Kofi\'s spending money. By week 7, GH₵90 of it is gone. Nothing dramatic. It just leaked. How does he stop it happening again?',
  minutes: 11,
  outcomes: [
    'See why "save what\'s left" fails',
    'Choose a system over a promise',
    'Recover from missed saving weeks',
  ],
  learn: [
    {
      kind: 'story',
      title: 'GH₵90',
      beats: [
        { speaker: 'narrator', text: 'Week 7, Sunday. Kofi finally checks. The GH₵250 he meant to move in weeks 5 and 6 has become GH₵160. Ninety cedis turned into jollof, a phone case and three things he can\'t name.' },
        { speaker: 'kofi', text: 'I didn\'t decide to spend it. It was just... there.' },
        { speaker: 'miracle', text: 'That\'s the rule nobody tells you. Money that sits where you spend, gets spent. Not because you\'re weak. Because it\'s there.' },
        { speaker: 'tey', text: 'GH₵90 isn\'t a disaster. But if it happens every month, that\'s GH₵360 by week 16. Let\'s fix the system, not Kofi.' },
      ],
      choice: {
        prompt: 'What does Kofi do?',
        options: [
          { text: 'Promise himself he\'ll never forget again.', outcome: 'He made that promise in week 4. Promises rely on memory and mood, and both fail in busy weeks.' },
          { text: 'Set up saving that happens on its own: automatic on payday, scheduled every Sunday, into a separate place.', outcome: 'Yes. The money moves before he can see it or spend it. Forgetting stops mattering. He moves the GH₵160 tonight and sets it up.', best: true },
          { text: 'Give all his money to Efua to look after.', outcome: 'It would work for a while, and Efua would hate it. A system he controls but can\'t easily undo is better than a person guarding his money.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Money that sits where you spend, gets spent. Move savings before you see them, automatically.',
    },
  ],
  apply: {
    scenario: 'The missed Sundays.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'GH₵250 should have moved. GH₵160 is left. How much leaked?',
        answers: ['90', 'GH₵90', '90 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why did GH₵90 disappear?',
        options: [
          { text: 'It sat in his spending money, so small purchases slowly used it' },
          { text: 'Someone stole it', why: 'Nobody took it. It leaked into everyday buys.' },
          { text: 'A big purchase', why: 'He can\'t even name three of the things.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Relies on memory, or works on its own?',
        groups: ['Relies on memory', 'Works on its own'],
        items: [
          { text: '"I\'ll move it on Sunday"', group: 0 },
          { text: 'Automatic transfer on payday', group: 1 },
          { text: 'A promise to try harder', group: 0 },
          { text: 'Scheduled weekly transfer', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'I feel so stupid. GH₵90, gone.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'You\'re not stupid. Your system had a hole. Move the GH₵160 tonight and close the hole.' },
          { text: 'Yes, that was careless.', why: 'Blame doesn\'t fix systems.' },
          { text: 'Forget the laptop then.', why: 'One leak is no reason to quit.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Miracle\'s rule.',
        template: 'Money that sits where you [[1]], gets [[2]].',
        blanks: [['spend'], ['spent']],
        distractors: ['save', 'saved'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'If GH₵90 leaked every month for 4 months, how much would that be?',
        answers: ['360', 'GH₵360', '360 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Kofi\'s old system caused the leak?',
        lines: [
          'Savings goal: GH₵3,500 by week 16.',
          'Leak money: GH₵70 a week.',
          'Moved by hand "when I remember".',
          'Jar tracker on the door.',
        ],
        bug: 2,
        fix: 'Moved automatically every Sunday.',
        explanation: '"When I remember" is the hole.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each option to its weakness.',
        pairs: [
          ['A promise', 'Fails in busy weeks'],
          ['Efua guards the money', 'Puts a friend in the middle'],
          ['Automatic system', 'Needs setting up once'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should Kofi do with the GH₵160 tonight?',
        options: [
          { text: 'Move it to the jar now, then set up the system' },
          { text: 'Spend it; the moment is gone', why: 'It\'s still GH₵160 toward the laptop.' },
          { text: 'Wait until next week', why: 'Waiting is how GH₵90 leaked.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Kofi\'s recovery.',
        lines: ['Notice the missed weeks', 'Move what\'s left tonight', 'Set up automatic saving', 'Stop relying on memory'],
      },
    ],
  },
  reflect: {
    prompt: 'Where does your saving rely on memory or mood? What could happen automatically instead?',
    starters: ['My saving relies on...', 'I could make ... automatic'],
  },
  deepen: {
    title: 'The default wins',
    summary: 'Behavioural research keeps finding that whatever happens by default, without anyone choosing, is what usually happens. Make saving the default and spending the thing you have to choose.',
  },
  notes: 'Running numbers: weeks 5–6 missed (250), 90 spent, 160 moved week 7. Defaults: e.g. Madrian & Shea (2001) on automatic enrolment; Johnson & Goldstein (2003); stated generally.',
};

export default lesson;
