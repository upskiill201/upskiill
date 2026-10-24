import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1 — free. The cold open: the line, the ticket in the broth, Theo's decision. First code in minute two. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The line around the block',
  summary: 'Friday, 12:40 p.m., Austin. The line at Pho Real runs past the corner and a ticket just fell into the broth. Theo, three weeks out of a coding bootcamp, has an idea.',
  minutes: 12,
  outcomes: ['Meet Theo, Linh, Mai and Pho Real', 'Change a real React Native screen in your first two minutes', 'See why an app could fix the line'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 12:40 p.m., Austin, Texas',
      beats: [
        { speaker: 'narrator', text: 'The line at Pho Real, the Nguyen family\'s food truck, runs past the corner. Twenty-two minutes from order to bowl.' },
        { speaker: 'narrator', text: 'Two office workers check their watches, give up, and walk to the burger truck next door.' },
        { speaker: 'linh', text: 'Table seven, large brisket, no onions! Where\'s the ticket? Theo, where is the ticket?' },
        { speaker: 'narrator', text: 'The ticket is in the broth.' },
        { speaker: 'mai', text: '(from the window, filming) This is going on my story.' },
        { speaker: 'theo', text: 'Mum. I literally just learned how to build apps. Why are we still doing this on paper?' },
        { speaker: 'linh', text: 'Because paper never crashes. Take the cash, please.' },
        { speaker: 'tey', text: 'One month until the Eastside Food Truck Festival: 30,000 people, 60 trucks, the busiest weekend of Pho Real\'s year. Theo has to decide what to do about the line.' },
      ],
      choice: {
        prompt: 'What should Theo do?',
        options: [
          { text: 'Print bigger paper tickets and hope.', outcome: 'Bigger tickets still end up in the broth. The line is still 22 minutes, because ordering at the window is the slow part.' },
          { text: 'Ask a delivery app to list the truck.', outcome: 'Possible, but delivery apps charge restaurants a big share of every order, and they don\'t help the people standing in line right now. Linh shakes her head.' },
          { text: 'Build an order-ahead app: people order on their phones and pick up when it\'s ready.', outcome: 'Yes. If people order while they walk over, the window only hands out bowls. Theo writes "PHO REAL APP v0.1" on a napkin. Ray, the cook, says "Order 41" and nothing else.', best: true },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Your first change to a real app',
      caption: 'This is React Native: real app code, running on the phone below. Change the word "Pho" in the title to "Pho Real" and watch the phone update.',
      code: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho</Text>
      <Text>Order ahead. Skip the line.</Text>
    </View>
  );
}
`,
      challenge: 'Change "Order ahead. Skip the line." to something you\'d want to read while standing in a 22-minute line.',
    },
  ],
  apply: {
    scenario: 'Theo\'s napkin plan.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is the line at Pho Real so slow?',
        options: [
          { text: 'The pho takes 22 minutes to cook', why: 'The broth is already cooked. The slow part is ordering and paying at one window.' },
          { text: 'Ordering, paying and writing tickets all happen at one window, one person at a time' },
          { text: 'The truck is too small', why: 'Size isn\'t the problem. Every customer has to order at the same window.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the title say "Pho Real"',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
    </View>
  );
}
`,
        hint: 'Find the word Pho between <Text ...> and </Text>, and add " Real" after it.',
        checks: [{ message: 'The screen says "Pho Real"', screen: { text: 'Pho Real' } }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does an order-ahead app help with it?',
        groups: ['Helps', 'Doesn\'t help'],
        items: [
          { text: 'Customers ordering while they walk over', group: 0 },
          { text: 'Tickets falling in the broth', group: 0 },
          { text: 'The broth taking 12 hours to cook', group: 1 },
          { text: 'Knowing exactly what each customer wants', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s best reply.',
        from: 'linh',
        message: 'An app? Paper tickets never crash, Theo.',
        options: [
          { text: 'Paper is for old people, Mum.', why: 'That\'s how you lose the argument and the truck\'s trust in one sentence.' },
          { text: 'Fine, forget it.', why: 'The line is costing customers every lunch. It\'s worth one more try.' },
          { text: 'Paper doesn\'t crash, but it does end up in the broth. Give me a month and I\'ll show you.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes is the wait from order to bowl?',
        answers: ['22', 'twenty-two', 'twenty two'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Add a second line that says "Order ahead. Skip the line."',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
      <Text>Order ahead. Skip the line.</Text>
    </View>
  );
}
`,
        hint: 'Under the title, add another <Text>...</Text> with the words inside it, before </View>.',
        checks: [
          { message: 'The title still says "Pho Real"', screen: { text: 'Pho Real' } },
          { message: 'The screen says "Order ahead. Skip the line."', screen: { text: 'Order ahead. Skip the line.' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to who they are.',
        pairs: [
          ['Theo', 'Just finished a coding bootcamp'],
          ['Linh', 'Runs Pho Real, 12 years and counting'],
          ['Mai', 'Theo\'s sister, 16, always filming'],
          ['Ray', 'The cook who speaks in order numbers'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Theo\'s napkin.',
        template: 'Customers [[1]] on their phones, then pick up when it\'s [[2]].',
        blanks: [['order'], ['ready']],
        distractors: ['wait', 'cold'],
      },
      {
        kind: 'mcq',
        prompt: 'In the code, where do the words that appear on screen go?',
        code: '<Text>Pho Real</Text>',
        language: 'typescript',
        options: [
          { text: 'Before <Text>', why: 'Text before the tag isn\'t inside it. In React Native that actually crashes the app.' },
          { text: 'After </Text>', why: 'After the closing tag, the words aren\'t inside the Text any more.' },
          { text: 'Between <Text> and </Text>' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Theo\'s Friday in order.',
        lines: ['The line runs past the corner', 'Two customers walk away', 'A ticket falls in the broth', 'Theo decides to build an app', 'He writes "v0.1" on a napkin'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a line, a form or a queue in your life that wastes time. What would an app have to do to fix it?',
    starters: ['The line I hate is...', 'An app would have to...'],
  },
  deepen: {
    title: 'Coming up',
    summary: 'Next lesson: everything you need to build apps with this course. Spoiler: a phone and this lesson are enough to start.',
  },
  notes: 'Opening story per outline v2 (Pho Real, Austin, Eastside Food Truck Festival: fictional). Delivery apps charging restaurants a large commission is general and widely reported; no company named. Cast: theo, linh, mai (course-only CastIds), Ray narrated.',
};

export default lesson;
