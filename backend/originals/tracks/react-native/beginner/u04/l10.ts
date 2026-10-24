import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10. Checkpoint 2: lessons 6–9 (row components, pills, filter, counts, map/filter updates). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: Ray\'s first shift',
  summary: 'Tuesday lunch. Ray runs the board himself for the first time, one greasy thumb on the phone. Check rows, pills, counts and the Ready buttons.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Combine filter counts with map updates', 'Build a row with a status pill and a button'],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday, 12:30 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Ray has never used an app at work. He holds the phone like it might bite.' },
        { speaker: 'theo', text: 'Bowl\'s up, tap Ready. That\'s it.' },
        { speaker: 'narrator', text: 'Twelve orders later, Ray says one word: "Huh." From Ray, that\'s a standing ovation.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: the working board.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the board: a header "{n} ready, {n} cooking", each order as "#{id}: {status}", and a "Ready #{id}" button on cooking orders. Tapping "Ready #42" makes the header "2 ready, 0 cooking"',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([
    { id: '41', status: 'Ready' },
    { id: '42', status: 'Cooking' },
  ]);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>

    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([
    { id: '41', status: 'Ready' },
    { id: '42', status: 'Cooking' },
  ]);
  const ready = orders.filter((o) => o.status === 'Ready');
  const cooking = orders.filter((o) => o.status === 'Cooking');

  function markReady(id: string) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: 'Ready' } : o)));
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      <Text>{ready.length} ready, {cooking.length} cooking</Text>
      {orders.map((o) => (
        <View key={o.id}>
          <Text>#{o.id}: {o.status}</Text>
          {o.status === 'Cooking' && (
            <Pressable onPress={() => markReady(o.id)}><Text>Ready #{o.id}</Text></Pressable>
          )}
        </View>
      ))}
    </View>
  );
}
`,
        hint: 'Filter ready and cooking for the header, write markReady with map, and show the button only when o.status === \'Cooking\'.',
        checks: [
          { message: 'Header starts "1 ready, 1 cooking"', screen: { text: '1 ready, 1 cooking' } },
          { message: 'Ready #42 updates the header', screen: { tap: ['Ready #42'], text: '2 ready, 0 cooking' } },
          { message: 'And the row', screen: { tap: ['Ready #42'], text: '#42: Ready' } },
          { message: 'No button on ready orders', screen: { noText: 'Ready #41' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Ray marks #42 Ready. Why do the header counts update without any extra code?',
        options: [
          { text: 'Ray\'s thumb is magic', why: 'Tempting, but no.' },
          { text: 'The counts are calculated from orders with filter, so they\'re right on every draw' },
          { text: 'FlatList counts for you', why: 'The counts come from filter and length.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its lesson.',
        pairs: [
          ['Green and amber pills', 'Cooking or ready?'],
          ['{ready.length} ready', 'Just the ready ones'],
          ['orders.map(o => o.id === id ? ...)', 'Ray taps Ready'],
          ['Still missing: order screen', 'Build log v0.4'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'Ray tapped Ready on the wrong order. Can he undo it?',
        options: [
          { text: 'No, it\'s permanent.', why: 'It\'s one more map away.' },
          { text: 'Tell him to be careful.', why: 'People make mistakes during a rush. The app should forgive them.' },
          { text: 'I\'ll add Undo: the same map, setting status back to Cooking.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which method?',
        groups: ['.map', '.filter'],
        items: [
          { text: 'Show only ready orders', group: 1 },
          { text: 'Turn orders into rows', group: 0 },
          { text: 'Mark one order Ready', group: 0 },
          { text: 'Remove a collected order', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Remove a collected order.',
        language: 'typescript',
        template: 'setOrders(orders.[[1]]((o) => o.id [[2]] id));',
        blanks: [['filter'], ['!==']],
        distractors: ['map', '===', '='],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What is the pill colour for order #43?',
        code: "const order = { id: '43', status: 'Cooking' };\nconst ready = order.status === 'Ready';\nbackgroundColor: ready ? 'green' : 'amber'",
        language: 'typescript',
        options: [
          { text: 'amber' },
          { text: 'green', why: '#43 is Cooking, so ready is false.' },
          { text: 'none', why: 'The ternary always picks one.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Show only the ready orders\' numbers, each as "#{id}", and nothing for cooking ones',
        starter: `import { View, Text } from 'react-native';

const ORDERS = [
  { id: '41', status: 'Cooking' },
  { id: '42', status: 'Ready' },
  { id: '43', status: 'Ready' },
];

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {ORDERS.map((o) => (
        <Text key={o.id}>#{o.id}</Text>
      ))}
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

const ORDERS = [
  { id: '41', status: 'Cooking' },
  { id: '42', status: 'Ready' },
  { id: '43', status: 'Ready' },
];

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {ORDERS.filter((o) => o.status === 'Ready').map((o) => (
        <Text key={o.id}>#{o.id}</Text>
      ))}
    </View>
  );
}
`,
        hint: "Put .filter((o) => o.status === 'Ready') before .map.",
        checks: [
          { message: '#42 shows', screen: { text: '#42' } },
          { message: '#41 doesn\'t', screen: { noText: '#41' } },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'orders has 6 items, 4 of them Ready. What is orders.filter((o) => o.status === \'Cooking\').length?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'After the shift, what does Mai point out?',
        options: [
          { text: 'The colours are wrong', why: 'Everyone could read them.' },
          { text: 'Ray is too slow', why: 'Ray was faster than ever.' },
          { text: 'Customers have to scroll the whole board to find their own order. They want a screen just for theirs' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Watch someone use a list you built. Where did their thumb go first? What did they look for?',
    starters: ['Their thumb went...', 'They looked for...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 6–9.',
};

export default lesson;
