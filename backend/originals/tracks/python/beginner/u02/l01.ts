import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1 — Variables are labelled boxes. Story: Ada retypes "OFFICE AJO" for the ninth time. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Variables are labelled boxes',
  summary: 'Ada has typed "OFFICE AJO" nine times and 20000 eleven times. Then the group votes to raise the share. Arjun shows her a box with a label on it.',
  minutes: 11,
  outcomes: [
    'Store a value in a variable with =',
    'Use the variable instead of retyping the value',
    'Change one line and update the whole program',
  ],
  learn: [
    {
      kind: 'story',
      title: 'A Monday, after the vote',
      beats: [
        { speaker: 'narrator', text: 'The group votes: the monthly share goes up from 20000 to 25000. Ada opens her Ajo Tracker and starts hunting for every 20000.' },
        { speaker: 'ada', text: 'There are eleven of them. I missed one last time and the pot came out wrong.' },
        { speaker: 'arjun', text: '(on a call from Bengaluru) Write it once. Put 20000 in a box, label the box share, and use the label everywhere.' },
        { speaker: 'ada', text: 'And when it changes?' },
        { speaker: 'arjun', text: 'You change the box. One line.' },
      ],
      choice: {
        prompt: 'What should Ada do with the eleven 20000s?',
        options: [
          {
            text: 'Store the share once, as share = 25000, and use share everywhere.',
            outcome: 'Next time the group votes, she changes one line, and every sum updates itself.',
            best: true,
          },
          {
            text: 'Carefully find and replace all eleven.',
            outcome: 'It works today. Next vote, she has to hunt again, and one day she misses one.',
          },
          {
            text: 'Write a comment reminding herself where they are.',
            outcome: 'Comments help people read code, but Python still uses whatever numbers are typed in.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>A <strong>variable</strong> is a name that points at a value. Think of a box with a label: <code>share = 25000</code> puts 25000 in a box labelled <code>share</code>.</p><p>The <code>=</code> means <strong>store</strong>, not "equals". The name goes on the left, the value on the right. After that, writing <code>share</code> is the same as writing 25000, and <code>print(share)</code> prints <code>25000</code> (no quotes around the name: it\'s a label, not text).</p>',
    },
    {
      kind: 'tryIt',
      title: 'Boxes with labels',
      caption: 'Change share to 30000 and run it again. Both totals update.',
      code: 'group = "OFFICE AJO"\nmembers = 10\nshare = 25000\n\nprint(group)\nprint("Share:", share)\nprint("Pot:", members * share)\n',
      challenge: 'A new member joins. Change members to 11. Which lines did you have to touch?',
    },
  ],
  apply: {
    scenario: 'Ada puts her numbers in boxes.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does share = 25000 do?',
        options: [
          { text: 'Checks whether share is 25000', why: 'One = stores. Checking comes later, with ==.' },
          { text: 'Stores 25000 in a variable called share' },
          { text: 'Prints 25000', why: 'Nothing is printed until you use print().' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Store 25000 in a variable called share, then print it',
        starter: '# Store the share, then print it\n',
        solution: 'share = 25000\nprint(share)\n',
        hint: 'share = 25000 on one line, print(share) on the next.',
        checks: [
          { message: 'Print 25000', outputEquals: '25000' },
          { message: 'Make a variable called share', expr: 'share == 25000' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = 10\nprint(members * 2)',
        language: 'python',
        options: [
          { text: 'members * 2', why: 'No quotes, so Python uses the value in the box.' },
          { text: '102', why: 'members is the number 10, so * multiplies.' },
          { text: '20' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Store the group name in a variable.',
        language: 'python',
        template: 'group [[1]] "OFFICE AJO"',
        blanks: [['=']],
        distractors: ['==', ':'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Name, or value?',
        groups: ['Variable name', 'Value'],
        items: [
          { text: 'share', group: 0 },
          { text: '25000', group: 1 },
          { text: 'members', group: 0 },
          { text: '"OFFICE AJO"', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Work out the pot from two variables',
        starter: 'members = 10\nshare = 25000\n# Print the pot: members times share\n',
        solution: 'members = 10\nshare = 25000\nprint(members * share)\n',
        hint: 'print(members * share)',
        checks: [
          { message: 'Print 250000', outputEquals: '250000' },
          { message: 'Use the variables, not the numbers', codeIncludes: 'members * share' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is the wrong way round?',
        language: 'python',
        lines: ['members = 10', '25000 = share', 'print(members * share)'],
        bug: 1,
        fix: 'share = 25000',
        explanation: 'The name goes on the left of =, the value on the right.',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Why is one variable better than eleven 20000s?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'When the share changes, I change one line, and nothing gets missed.' },
          { text: 'It looks shorter.', why: 'Shorter is nice, but that is not the main win.' },
          { text: 'Python runs faster with variables.', why: 'Speed is not the point here. Fewer mistakes is.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that stores 10 in members.',
        language: 'python',
        tiles: ['members', '=', '10'],
        distractors: ['==', '"10"'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'share = 25000. What does print(share) show?',
        answers: ['25000'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'What do you keep retyping in your life (an address, a password hint, a signature)? What would "putting it in a box" look like?',
    starters: ['I keep retyping...', 'If it were in one place...'],
  },
  deepen: {
    title: 'Labels, not boxes',
    summary: 'Strictly, a Python variable is a name tag tied to a value, not a box holding it. It matters later, with lists. For now, boxes work.',
  },
  notes: 'Assignment with = (Python tutorial, §3.1.1 "Numbers": "The equal sign (=) is used to assign a value to a variable"). 10 * 25000 = 250000. Python names are references to objects (Python Language Reference, §4.2 Naming and binding).',
};

export default lesson;
