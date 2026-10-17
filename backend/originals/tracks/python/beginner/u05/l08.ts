import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8 — and, or, not: combining conditions. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'and, or, not',
  summary: 'The late fee only applies if someone paid late AND hasn\'t been excused. Members on holiday OR on sick leave are excused. Ada\'s rules have more than one part now.',
  minutes: 12,
  outcomes: [
    'Combine conditions with and and or',
    'Flip a condition with not',
    'Write a multi-part rule as one condition',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Three words join conditions:</p><ul><li><code>a and b</code> is True only when <strong>both</strong> are True.</li><li><code>a or b</code> is True when <strong>at least one</strong> is True.</li><li><code>not a</code> flips it: True becomes False, and False becomes True.</li></ul><p>The ajo\'s late-fee rule: <code>if late and not excused:</code>. A member is excused <code>if on_holiday or on_sick_leave</code>.</p>',
    },
    {
      kind: 'text',
      html: '<p>Write each side in full. <code>if day == 26 or 27:</code> doesn\'t mean "26 or 27": Python reads it as <code>(day == 26) or 27</code>, and 27 on its own counts as True, so the condition is always True. Write <code>if day == 26 or day == 27:</code>.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The late-fee rule',
      caption: 'Late, but excused: no fee.',
      code: 'late = True\non_holiday = True\non_sick_leave = False\n\nexcused = on_holiday or on_sick_leave\nif late and not excused:\n    print("Add the late fee")\nelse:\n    print("No fee")\n',
      challenge: 'Set on_holiday to False. What changes?',
    },
  ],
  apply: {
    scenario: 'Rules with more than one part.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(True and False)',
        language: 'python',
        options: [
          { text: 'True', why: 'and needs both to be True.' },
          { text: 'False' },
          { text: 'An error', why: 'and works on bools.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'If the member is late and not excused, print Add the late fee, otherwise No fee',
        starter: 'late = True\nexcused = False\n',
        solution: 'late = True\nexcused = False\nif late and not excused:\n    print("Add the late fee")\nelse:\n    print("No fee")\n',
        hint: 'if late and not excused:',
        checks: [
          { message: 'Print Add the late fee', outputEquals: 'Add the late fee' },
          { message: 'Use and and not', codeIncludes: 'and not' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the expression to its value.',
        pairs: [
          ['True and True', 'True'],
          ['True or False', 'True, either works'],
          ['not True', 'False'],
          ['False or False', 'False, neither works'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'late = True, excused = True. True or False?',
        groups: ['True', 'False'],
        items: [
          { text: 'late and excused', group: 0 },
          { text: 'late and not excused', group: 1 },
          { text: 'late or excused', group: 0 },
          { text: 'not late', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'A member is excused on holiday or on sick leave. Store excused and print it',
        starter: 'on_holiday = False\non_sick_leave = True\n',
        solution: 'on_holiday = False\non_sick_leave = True\nexcused = on_holiday or on_sick_leave\nprint(excused)\n',
        hint: 'excused = on_holiday or on_sick_leave',
        checks: [
          { message: 'Print True', outputEquals: 'True' },
          { message: 'Use or', codeIncludes: ' or ' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which condition is always True, by accident?',
        language: 'python',
        lines: ['if day == 26 or day == 27:', 'if day == 26 or 27:', 'if day > 25 and day < 28:'],
        bug: 1,
        fix: 'if day == 26 or day == 27:',
        explanation: 'Python reads it as (day == 26) or 27, and 27 on its own counts as True.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Paid in full and on time.',
        language: 'python',
        template: 'if paid >= SHARE [[1]] day <= PAY_DAY:',
        blanks: [['and']],
        distractors: ['or', '&&'],
      },
      {
        kind: 'mcq',
        prompt: 'Which condition means "between the 20th and the 25th, inclusive"?',
        options: [
          { text: 'day >= 20 or day <= 25', why: 'or is True for almost every day.' },
          { text: 'day == 20 or 25', why: 'That\'s the always-True trap.' },
          { text: 'day >= 20 and day <= 25' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'When do I use and vs or for the excused rule?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Read the rule in English: "on holiday OR on sick leave" means either one is enough. and would need both.' },
          { text: 'Always and.', why: 'Then you\'d need to be on holiday and sick at once.' },
          { text: 'They\'re the same.', why: 'True or False is True; True and False is False.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(not False) show?',
        answers: ['True'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Many rules have "and" and "or" hidden in them ("members and guests", "cash or transfer"). Write one rule from your life with both.',
    starters: ['The rule is...', 'In Python it would be...'],
  },
  deepen: {
    title: 'Short-circuiting',
    summary: 'Python stops early: in a and b, if a is False it never looks at b. In a or b, if a is True it never looks at b. That will matter when b could crash.',
  },
  notes: 'Boolean operations and, or, not (Python Language Reference §6.11); and/or short-circuit. day == 26 or 27 parses as (day == 26) or 27; 27 is truthy.',
};

export default lesson;
