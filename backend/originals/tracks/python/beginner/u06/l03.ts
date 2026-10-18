import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 3 — len() of a list: how many members, and the pot from the count. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'len() of a list',
  summary: 'The tracker still has MEMBERS = 11 typed at the top, but Chika made it 12. Two numbers that should agree, don\'t. Arjun: "Let the list count itself."',
  minutes: 10,
  outcomes: [
    'Count items with len(list)',
    'Work out the pot from the list, not a typed number',
    'Find the last position as len(list) - 1',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'One number nobody has to update',
      text: 'len(members) is 12. So the pot is len(members) * SHARE, which is 360000. The last position is len(members) - 1, which is 11. When someone joins, all three update on their own.',
      hotspots: [
        { phrase: 'len(members) is 12', note: 'len() works on lists exactly as on strings: it counts the items.' },
        { phrase: 'len(members) * SHARE', note: 'No typed MEMBERS constant to forget. The list is the single source of truth.' },
        { phrase: 'which is 360000', note: '12 x 30000. The pot grew when Chika joined, without anyone changing a number.' },
        { phrase: 'len(members) - 1', note: 'The last valid position. Positions run from 0 to len - 1.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Let the list count',
      caption: 'Add a thirteenth name and run it again.',
      code: 'SHARE = 30000\nmembers = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf",\n           "Ifeoma", "Segun", "Amaka", "Dayo", "Tobi", "Chika"]\n\nprint(f"Members: {len(members)}")\nprint(f"Pot: {len(members) * SHARE:,}")\nprint(f"Last position: {len(members) - 1}")\n',
      challenge: 'Add "Ola" to the list. Which numbers change?',
    },
  ],
  apply: {
    scenario: 'Letting the list count itself.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(len(["Ada", "Tunde", "Bisi"]))',
        language: 'python',
        options: [
          { text: '3' },
          { text: '2', why: 'len counts items; the last position is 2.' },
          { text: '14', why: 'len counts items in the list, not letters.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many members are in the list',
        starter: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi"]\n',
        solution: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi"]\nprint(len(members))\n',
        hint: 'len(members)',
        checks: [
          { message: 'Print 5', outputEquals: '5' },
          { message: 'Use len()', codeIncludes: 'len(' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the pot: len(members) times SHARE',
        starter: 'SHARE = 30000\nmembers = ["Ada", "Tunde", "Bisi", "Kemi"]\n',
        solution: 'SHARE = 30000\nmembers = ["Ada", "Tunde", "Bisi", "Kemi"]\nprint(len(members) * SHARE)\n',
        hint: 'len(members) * SHARE',
        checks: [
          { message: 'Print 120000', outputEquals: '120000' },
          { message: 'Count with len()', codeIncludes: 'len(members)' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'members has 12 items. Match the code to the value.',
        pairs: [
          ['len(members)', '12'],
          ['len(members) - 1', '11'],
          ['len(members) * 30000', '360000'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Chika joined, but the pot is still 330000. Which line is the problem?',
        language: 'python',
        lines: ['MEMBERS = 11', 'members.append("Chika")', 'pot = MEMBERS * 30000'],
        bug: 2,
        fix: 'pot = len(members) * 30000',
        explanation: 'The typed constant didn\'t change when the list did. Count the list instead.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Updates by itself when someone joins, or has to be edited by hand?',
        groups: ['By itself', 'By hand'],
        items: [
          { text: 'len(members)', group: 0 },
          { text: 'MEMBERS = 11', group: 1 },
          { text: 'len(members) * SHARE', group: 0 },
          { text: 'pot = 330000', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The last position in any list.',
        language: 'python',
        template: 'last = [[1]](members) [[2]] 1',
        blanks: [['len'], ['-']],
        distractors: ['count', '+'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(len([]))',
        language: 'python',
        options: [
          { text: '0' },
          { text: 'An error', why: 'An empty list is fine: length 0.' },
          { text: '1', why: 'There\'s nothing inside the brackets.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Why is len(members) better than a MEMBERS constant here?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'Because the list already knows how many members there are. Two numbers that should match will one day drift apart.' },
          { text: 'Constants are always wrong.', why: 'Constants are great for rules. This is a count.' },
          { text: 'It\'s shorter.', why: 'The real win is never being out of date.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A list has 12 items. What is its last valid position?',
        answers: ['11'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: '"One source of truth" means storing a fact once. Where do you keep the same fact in two places that sometimes disagree?',
    starters: ['I keep... in two places', 'They disagree when...'],
  },
  deepen: {
    title: 'Empty lists',
    summary: 'members = [] is an empty list: len 0, and falsy in an if. "if not members:" means "if nobody has joined yet".',
  },
  notes: 'len() on lists (Built-in Functions: len). 12 x 30000 = 360000; 4 x 30000 = 120000. len([]) == 0.',
};

export default lesson;
