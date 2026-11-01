import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 8 — in for lists: is this person a member? */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'in for lists',
  summary: 'Someone called Femi messages the group: "I\'m in the ajo, when is my turn?" He isn\'t. Ada wants the tracker to check before it answers anyone.',
  minutes: 10,
  outcomes: [
    'Check membership with "name" in members',
    'Use not in to spot people who aren\'t members',
    'Combine in with if to avoid errors',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'You used in with strings in Chapter 4: "a" in "Ada" is True. It works on lists too. "Femi" in members is True if Femi is one of the items, False if not.', replies: ['Does it match part of a name?'] },
        { tey: 'No. With a list, in compares whole items. "Ad" in ["Ada", "Tunde"] is False: there\'s no item that is exactly "Ad". And capitals count: "ada" isn\'t "Ada".', replies: ['And the opposite?'] },
        { tey: 'not in. "Femi" not in members is True when he isn\'t a member. Read it out loud: it says what it means.', replies: ['Why bother checking?'] },
        { tey: 'Because .remove("Femi") crashes if he isn\'t there. Check first:\nif "Femi" in members:\n    members.remove("Femi")\nNo crash, either way.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Is Femi a member?',
      caption: 'Change name and run it.',
      code: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi"]\nname = "Femi"\n\nif name in members:\n    print(f"{name} is a member")\nelse:\n    print(f"{name} is not in this ajo")\n',
      challenge: 'Try name = "ada". Then fix it with .title() so it still finds Ada.',
    },
  ],
  apply: {
    scenario: 'Checking who is a member.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = ["Ada", "Tunde", "Bisi"]\nprint("Tunde" in members)',
        language: 'python',
        options: [
          { text: 'False', why: 'Tunde is the second item.' },
          { text: 'True' },
          { text: '1', why: 'in gives True or False, not a position.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = ["Ada", "Tunde", "Bisi"]\nprint("Ad" in members)',
        language: 'python',
        options: [
          { text: 'False' },
          { text: 'True', why: 'With a list, in compares whole items. No item is exactly "Ad".' },
          { text: 'An error', why: 'It runs fine; it\'s just False.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print "Member" if name is in members, otherwise "Not a member"',
        starter: 'members = ["Ada", "Tunde", "Bisi"]\nname = "Femi"\n',
        solution: 'members = ["Ada", "Tunde", "Bisi"]\nname = "Femi"\nif name in members:\n    print("Member")\nelse:\n    print("Not a member")\n',
        hint: 'if name in members:',
        checks: [
          { message: 'Print Not a member', outputEquals: 'Not a member' },
          { message: 'Use in', codeIncludes: ' in members' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'members = ["Ada", "Tunde", "Bisi"]. True or False?',
        groups: ['True', 'False'],
        items: [
          { text: '"Bisi" in members', group: 0 },
          { text: '"bisi" in members', group: 1 },
          { text: '"Femi" not in members', group: 0 },
          { text: '"Ada" not in members', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Remove "Femi" only if he is in the list, then print the list',
        starter: 'members = ["Ada", "Tunde", "Bisi"]\n',
        solution: 'members = ["Ada", "Tunde", "Bisi"]\nif "Femi" in members:\n    members.remove("Femi")\nprint(members)\n',
        hint: 'Check with if "Femi" in members: before .remove().',
        checks: [
          { message: "Print ['Ada', 'Tunde', 'Bisi'] with no crash", outputEquals: "['Ada', 'Tunde', 'Bisi']" },
          { message: 'Check with in first', codeIncludes: 'in members' },
          { message: 'Use .remove()', codeIncludes: '.remove(' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The user typed "  ada". Which line makes the check fail?',
        language: 'python',
        lines: ['members = ["Ada", "Tunde"]', 'name = input("Name: ")', 'if name in members:', '    print("Welcome back")'],
        bug: 1,
        fix: 'name = input("Name: ").strip().title()',
        explanation: '"  ada" isn\'t exactly "Ada". Clean the input before checking, as in Chapter 4.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Only add Ola if he isn\'t already a member.',
        language: 'python',
        template: 'if "Ola" [[1]] [[2]] members:\n    members.append("Ola")',
        blanks: [['not'], ['in']],
        distractors: ['is', '!='],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the expression to its value.',
        pairs: [
          ['"a" in "Ada"', 'True: strings match parts'],
          ['"a" in ["Ada"]', 'False: lists match whole items'],
          ['"Ada" in ["Ada"]', 'True: an exact item'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Femi swears he\'s a member. The tracker says he isn\'t. Who do I believe?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Add him so he stops messaging.', why: 'The list is the group\'s agreement; changing it needs the group.' },
          { text: 'Check the list is right first. If it is, the tracker is telling you what the group agreed. Then talk to Femi kindly.' },
          { text: 'The code must be broken.', why: 'in is reliable; the question is whether the data is.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Two words: the test that is True when an item is NOT in a list.',
        answers: ['not in'],
        placeholder: 'Two words',
      },
    ],
  },
  reflect: {
    prompt: 'A program can only be as right as its data. When did a list you trusted turn out to be out of date?',
    starters: ['I trusted...', 'It was out of date because...'],
  },
  deepen: {
    title: '.index() and .count()',
    summary: 'members.index("Bisi") gives Bisi\'s position (ValueError if she isn\'t there). members.count("Ada") says how many times "Ada" appears. Both are handy after an in check.',
  },
  notes: 'Membership tests in / not in on sequences (Python docs, Common Sequence Operations). For lists, in checks equality with whole items; for strings, it checks substrings.',
};

export default lesson;
