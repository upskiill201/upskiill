import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 16 — Good names make code readable. Ada teaches Arjun why. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Good names make code readable',
  summary: 'Arjun\'s client has sent back his code with one comment: "What is d?" For once, Ada is the one explaining. Good names are the cheapest documentation there is.',
  minutes: 11,
  outcomes: [
    'Choose names that say what a value means',
    'Include units where they matter',
    'Rename unclear variables safely',
  ],
  learn: [
    {
      kind: 'compare',
      title: "Arjun's code, before and after Ada",
      before: {
        label: 'Before',
        text: 'n = 11\nd = 25\ns = 25000\nt = n * s\nprint(t)\n\nIt runs. Nobody, including Arjun, knows what d is.',
      },
      after: {
        label: 'After',
        text: 'members = 11\npay_day = 25\nshare_naira = 25000\npot_naira = members * share_naira\nprint(pot_naira)\n\nSame program. Now it explains itself.',
      },
      notes: [
        'Say what it is, not what type it is: members, not number.',
        'Add the unit when it could be misread: share_naira, minutes_late.',
        'Short is fine when the meaning is obvious: i in a tiny loop is normal. d for pay day is not.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Rename everything',
      caption: 'Rename each variable to say what it means. It should still print 275000.',
      code: 'n = 11\ns = 25000\nt = n * s\nprint(t)\n',
      challenge: 'Add a variable for the pay day, with a name that needs no comment.',
    },
  ],
  apply: {
    scenario: "Ada renames Arjun's variables.",
    items: [
      {
        kind: 'mcq',
        prompt: 'Which is the clearest name for the monthly share in naira?',
        options: [
          { text: 's', why: 'One letter tells the reader nothing.' },
          { text: 'share_naira' },
          { text: 'the_amount_of_money_each_member_pays_every_month_in_naira', why: 'Clear, but far too long to read in every line.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Rename n, s and t to members, share and pot',
        starter: 'n = 11\ns = 25000\nt = n * s\nprint(t)\n',
        solution: 'members = 11\nshare = 25000\npot = members * share\nprint(pot)\n',
        hint: 'Rename every use, including inside the sum and the print.',
        checks: [
          { message: 'Still print 275000', outputEquals: '275000' },
          { message: 'Name the pot pot', expr: 'pot == 275000' },
          { message: 'Use members and share', codeIncludes: 'members * share' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear name, or unclear?',
        groups: ['Clear', 'Unclear'],
        items: [
          { text: 'pay_day', group: 0 },
          { text: 'd', group: 1 },
          { text: 'minutes_late', group: 0 },
          { text: 'thing2', group: 1 },
          { text: 'data', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the unclear name to a clear one.',
        pairs: [
          ['n', 'members'],
          ['d', 'pay_day'],
          ['t', 'pot_naira'],
          ['x', 'this_month'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada renamed s to share but missed one. Which line now fails?',
        language: 'python',
        lines: ['members = 11', 'share = 25000', 'pot = members * s'],
        bug: 2,
        fix: 'pot = members * share',
        explanation: 's no longer exists, so this is a NameError. Rename every use.',
      },
      {
        kind: 'writeCode',
        prompt: 'Store the lateness in minutes with a name that includes the unit, then print it',
        starter: '# Tunde paid 45 minutes late\n',
        solution: 'minutes_late = 45\nprint(minutes_late)\n',
        hint: 'A name like minutes_late says what and in which unit.',
        checks: [
          { message: 'Print 45', outputEquals: '45' },
          { message: 'Name it minutes_late', expr: 'minutes_late == 45' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'My client asked "What is d?" in a code review. Fair?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'No, they should read more carefully.', why: 'The reader shouldn\'t have to guess.' },
          { text: 'Add a comment saying d is the pay day.', why: 'Better to rename it, then no comment is needed.' },
          { text: 'Very fair. If a name needs explaining, the name is the problem. Call it pay_day.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Why add the unit, as in share_naira?',
        options: [
          { text: 'So nobody mixes up naira and kobo, or minutes and hours' },
          { text: 'Python needs units to do maths', why: 'Python ignores names. Units are for people.' },
          { text: 'It makes the number bigger', why: 'Names don\'t change values.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a clearly named line for the pot.',
        language: 'python',
        tiles: ['pot_naira', '=', 'members * share_naira'],
        distractors: ['t', 'n * s'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rename the variable d (the pay day) to something clear. (snake_case)',
        answers: ['pay_day', 'payday', 'payout_day', 'pay_date'],
        placeholder: 'A name',
      },
    ],
  },
  reflect: {
    prompt: 'Readable code is kind to the next person. What is one habit at work or school that\'s kind to the next person?',
    starters: ['One kind habit is...', 'It helps because...'],
  },
  deepen: {
    title: 'Readability counts',
    summary: 'It\'s line 7 of the Zen of Python (import this). Good names are where readability starts.',
  },
  notes: 'PEP 8 "Naming Conventions" (descriptive names; avoid l, O, I as single letters). Zen of Python (PEP 20): "Readability counts." 11 * 25000 = 275000.',
};

export default lesson;
