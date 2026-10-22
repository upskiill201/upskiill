import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 6 — .append() and .insert(): adding members to the end, or at a position. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: '.append() and .insert()',
  summary: 'Ola wants to join. New members go to the end of the payout order, so Ada adds him there. Then the group votes to let Kemi\'s sister Funmi in third, because she\'s moving abroad soon.',
  minutes: 11,
  outcomes: [
    'Add an item to the end with .append()',
    'Add an item at a position with .insert()',
    'Know that both change the list and return None',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Lists can grow. Two methods add an item:</p><ul><li><code>members.append("Ola")</code> adds Ola <strong>to the end</strong>. This is the one you\'ll use most.</li><li><code>members.insert(2, "Funmi")</code> puts Funmi <strong>at position 2</strong>. Everyone from position 2 onwards moves one place back.</li></ul><p>Both change the list itself, in place. Unlike string methods, they don\'t give back a new value: they return <code>None</code>. So write <code>members.append("Ola")</code> on its own line, never <code>members = members.append("Ola")</code>. That would throw the list away.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Two new members',
      caption: 'Watch the length and the order change.',
      code: 'members = ["Ada", "Tunde", "Bisi", "Kemi"]\n\nmembers.append("Ola")\nprint(members)\n\nmembers.insert(2, "Funmi")\nprint(members)\nprint(len(members))\n',
      challenge: 'Insert "Zara" at the very front with position 0.',
    },
  ],
  apply: {
    scenario: 'New members join.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = ["Ada", "Tunde"]\nmembers.append("Ola")\nprint(members)',
        language: 'python',
        options: [
          { text: "['Ada', 'Tunde', 'Ola']" },
          { text: "['Ola', 'Ada', 'Tunde']", why: '.append() adds to the end.' },
          { text: 'None', why: 'The list is printed, not the return value of .append().' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add "Ola" to the end of the list, then print the list',
        starter: 'members = ["Ada", "Tunde", "Bisi"]\n',
        solution: 'members = ["Ada", "Tunde", "Bisi"]\nmembers.append("Ola")\nprint(members)\n',
        hint: 'members.append("Ola")',
        checks: [
          { message: "Print ['Ada', 'Tunde', 'Bisi', 'Ola']", outputEquals: "['Ada', 'Tunde', 'Bisi', 'Ola']" },
          { message: 'Use .append()', codeIncludes: '.append(' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Insert "Funmi" at position 1, then print the list',
        starter: 'members = ["Ada", "Tunde", "Bisi"]\n',
        solution: 'members = ["Ada", "Tunde", "Bisi"]\nmembers.insert(1, "Funmi")\nprint(members)\n',
        hint: 'members.insert(1, "Funmi"): position first, then the item.',
        checks: [
          { message: "Print ['Ada', 'Funmi', 'Tunde', 'Bisi']", outputEquals: "['Ada', 'Funmi', 'Tunde', 'Bisi']" },
          { message: 'Use .insert()', codeIncludes: '.insert(' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'After this, members is None. Which line did it?',
        language: 'python',
        lines: ['members = ["Ada", "Tunde"]', 'members = members.append("Ola")', 'print(members)'],
        bug: 1,
        fix: 'members.append("Ola")',
        explanation: '.append() changes the list and returns None. Assigning that None back to members throws the list away.',
      },
      {
        kind: 'matchPairs',
        prompt: 'members = ["Ada", "Tunde"]. Match the line to the new list.',
        pairs: [
          ['members.append("Ola")', "['Ada', 'Tunde', 'Ola']"],
          ['members.insert(0, "Ola")', "['Ola', 'Ada', 'Tunde']"],
          ['members.insert(1, "Ola")', "['Ada', 'Ola', 'Tunde']"],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Add Chika to the end of the list.',
        language: 'python',
        template: 'members.[[1]]("Chika")',
        blanks: [['append']],
        distractors: ['add', 'push'],
      },
      {
        kind: 'mcq',
        prompt: 'members has 12 items. After members.append("Ola"), what is len(members)?',
        options: [
          { text: '12', why: '.append() adds an item.' },
          { text: '13' },
          { text: 'None', why: 'len() of the list is a number; it\'s .append() that returns None.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add "Ola" to the end, then print the new pot (len(members) * SHARE)',
        starter: 'SHARE = 30000\nmembers = ["Ada", "Tunde", "Bisi"]\n',
        solution: 'SHARE = 30000\nmembers = ["Ada", "Tunde", "Bisi"]\nmembers.append("Ola")\nprint(len(members) * SHARE)\n',
        hint: 'Append first, then count.',
        checks: [
          { message: 'Print 120000', outputEquals: '120000' },
          { message: 'Ola is in the list', expr: 'members[-1] == "Ola"' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Why doesn\'t members.append() give me anything back, like .upper() does?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'It\'s a bug in Python.', why: 'It\'s deliberate, so you don\'t mistake it for a copy.' },
          { text: 'It returns the new item.', why: 'It returns None.' },
          { text: 'Strings can\'t change, so their methods hand you a new string. Lists can change, so .append() just changes the list you have.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does .append() return? (one word)',
        answers: ['None'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'New members go to the back of the payout order. Is that fair? What rule would you want if you joined an ajo late?',
    starters: ['It\'s fair because...', 'I\'d want...'],
  },
  deepen: {
    title: '.extend()',
    summary: 'members.extend(["Ola", "Zara"]) adds every item from another list. members.append(["Ola", "Zara"]) would add ONE item: a whole list inside the list.',
  },
  notes: 'list.append, list.insert (Python tutorial §5.1). Both mutate in place and return None. insert(i, x) shifts later items right.',
};

export default lesson;
