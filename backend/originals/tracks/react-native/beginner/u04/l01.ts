import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story with a choice: forty people asking "Is my order ready?"; one order becomes many (arrays and .map). */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Forty people, one question',
  summary: 'The app took thirty-eight orders without a mistake. Then the window filled with faces: "Is my order ready?" "What about mine?" Ray can\'t cook and answer at the same time.',
  minutes: 12,
  outcomes: ['See why the app needs to show many orders, not one', 'Keep many orders in an array', 'Turn an array into lines on the screen with .map'],
  learn: [
    {
      kind: 'story',
      title: 'Sunday, 1:15 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Forty people stand around the truck. Every thirty seconds, someone leans in at the window.' },
        { speaker: 'mai', text: 'That\'s the ninth "Is my order ready?" in five minutes. I\'m counting.' },
        { speaker: 'linh', text: 'Ray just burned a brisket because he was reading tickets out loud.' },
        { speaker: 'narrator', text: 'Seven days to the Eastside Food Truck Festival. Thirty thousand people. If forty is this bad...' },
        { speaker: 'tey', text: 'Every order is in Theo\'s app already. What should he do with them?' },
      ],
      choice: {
        prompt: 'What should Theo do?',
        options: [
          { text: 'Show every order on one screen, each with its status: Cooking or Ready. Customers check the board instead of the window.', outcome: 'Yes. One list, updated by the kitchen, read by everyone. That\'s this chapter: lists first, then a screen for each order.', best: true },
          { text: 'Give Mai a megaphone.', outcome: 'Mai is enthusiastic about this. Linh is not. At the festival, a megaphone is one more noise in thirty thousand.' },
          { text: 'Ask customers to stop asking.', outcome: 'They\'ll keep asking for as long as they can\'t see the answer.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Many orders, one screen',
      caption: 'The orders are an array. .map turns each one into a line of Text. Add a fourth order to the array and watch it appear.',
      code: `import { View, Text, StyleSheet } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana', status: 'Ready' },
  { id: '42', name: 'Sam', status: 'Cooking' },
  { id: '43', name: 'Priya', status: 'Cooking' },
];

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Orders</Text>
      {ORDERS.map((order) => (
        <Text key={order.id} style={styles.row}>
          #{order.id} {order.name}: {order.status}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 10, backgroundColor: '#fff7ed' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#9a3412' },
  row: { fontSize: 20, color: '#1c1917' },
});
`,
      challenge: 'Add { id: \'44\', name: \'Jo\', status: \'Cooking\' } to ORDERS. You don\'t touch the JSX at all.',
    },
  ],
  apply: {
    scenario: 'From one order to many.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is a board of every order better than answering at the window?',
        options: [
          { text: 'It looks more modern', why: 'Looks aren\'t the point. It\'s about Ray\'s time.' },
          { text: 'Phones are louder than people', why: 'The board is silent. That\'s the point.' },
          { text: 'Everyone can check it themselves, so Ray can keep cooking' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Show every order in ORDERS as "#{id} {name}", using .map and key={order.id}',
        starter: `import { View, Text } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana' },
  { id: '42', name: 'Sam' },
  { id: '43', name: 'Priya' },
];

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>

    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana' },
  { id: '42', name: 'Sam' },
  { id: '43', name: 'Priya' },
];

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {ORDERS.map((order) => (
        <Text key={order.id}>#{order.id} {order.name}</Text>
      ))}
    </View>
  );
}
`,
        hint: '{ORDERS.map((order) => (<Text key={order.id}>#{order.id} {order.name}</Text>))}',
        checks: [
          { message: 'Dana is first', screen: { text: '#41 Dana' } },
          { message: 'Priya is there too', screen: { text: '#43 Priya' } },
          { message: 'Uses .map', codeIncludes: '.map(' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it is.',
        pairs: [
          ['[ ... ]', 'An array: a list of values'],
          ["{ id: '41', name: 'Dana' }", 'One order, as an object'],
          ['ORDERS.map(...)', 'Turns each order into something new'],
          ['key={order.id}', 'Tells React which line is which'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'Why not just write forty <Text> lines by hand?',
        options: [
          { text: 'Because the orders change all day. With .map, the screen follows the array: add an order, a line appears.' },
          { text: 'Forty is too many for a phone.', why: 'Phones can show thousands. It\'s about orders changing.' },
          { text: 'You\'re right, let\'s do that.', why: 'Every new order would need new code.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many lines of Text does this draw?',
        code: "const ORDERS = [{ id: '41' }, { id: '42' }, { id: '43' }, { id: '44' }];\nORDERS.map((o) => <Text key={o.id}>#{o.id}</Text>)",
        language: 'typescript',
        options: [
          { text: '1', why: '.map makes one for every item.' },
          { text: '4' },
          { text: '44', why: '44 is the last id. There are four items.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'One line per order.',
        language: 'typescript',
        template: '{ORDERS.[[1]]((order) => <Text [[2]]={order.id}>{order.name}</Text>)}',
        blanks: [['map'], ['key']],
        distractors: ['each', 'id', 'for'],
      },
      {
        kind: 'writeCode',
        prompt: 'Add the status to each line: "#41 Dana: Ready"',
        starter: `import { View, Text } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana', status: 'Ready' },
  { id: '42', name: 'Sam', status: 'Cooking' },
];

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {ORDERS.map((order) => (
        <Text key={order.id}>#{order.id} {order.name}</Text>
      ))}
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana', status: 'Ready' },
  { id: '42', name: 'Sam', status: 'Cooking' },
];

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {ORDERS.map((order) => (
        <Text key={order.id}>#{order.id} {order.name}: {order.status}</Text>
      ))}
    </View>
  );
}
`,
        hint: 'Add ": {order.status}" inside the Text.',
        checks: [
          { message: '"#41 Dana: Ready"', screen: { text: '#41 Dana: Ready' } },
          { message: '"#42 Sam: Cooking"', screen: { text: '#42 Sam: Cooking' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'One value, or a list?',
        groups: ['One value', 'A list (array)'],
        items: [
          { text: 'The size of one bowl', group: 0 },
          { text: 'Every order today', group: 1 },
          { text: 'The menu\'s dishes', group: 1 },
          { text: 'Dana\'s name', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which array method turns each item into something new, like a line of Text?',
        answers: ['map', '.map', '.map()', 'map()'],
        placeholder: 'method',
      },
      {
        kind: 'findBug',
        prompt: 'The screen shows nothing at all, though ORDERS has three orders. Which line is wrong?',
        language: 'typescript',
        lines: ['<View>', '  {ORDERS.map((order) => {', '    <Text key={order.id}>{order.name}</Text>;', '  })}', '</View>'],
        bug: 1,
        fix: '  {ORDERS.map((order) => (',
        explanation: 'With curly braces, the arrow function needs a return. With round brackets, it returns the Text automatically. (Change the closing "})" to "))" too.)',
      },
    ],
  },
  reflect: {
    prompt: 'Which list in your own app would people check over and over? What would each line show?',
    starters: ['The list:...', 'Each line shows...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Put the three orders on your phone with .map, then add ten more. Does the screen run out of room? (That\'s lesson 3\'s problem.)',
  },
  notes: 'Arrays of objects; Array.prototype.map in JSX with key (React docs: "Rendering Lists").',
};

export default lesson;
