import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5. Checkpoint 1: lessons 1–4 (arrays, .map, lists in state, FlatList, keys). */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the lunch rush list',
  summary: 'Monday, food truck lunch spot downtown. Theo runs the list for real: orders arrive, the count climbs, nobody\'s tick jumps. Check arrays, FlatList and keys.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Show a list in state with FlatList and keys', 'Add to it without mutating it'],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 12:05 p.m.',
      beats: [
        { speaker: 'linh', text: 'Downtown lunch. Office people. They have thirty minutes and they check their phones every ten seconds.' },
        { speaker: 'theo', text: 'Then they can check the list.' },
        { speaker: 'mai', text: 'I\'ll add fake orders until it breaks.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: lists.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Keep orders in state and show them with a FlatList ("#{id} {name}"). Add a "+ Order" button that adds { id: \'43\', name: \'Mai\' }, and a count "{n} orders"',
        starter: `import { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([{ id: '41', name: 'Dana' }, { id: '42', name: 'Sam' }]);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>

    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([{ id: '41', name: 'Dana' }, { id: '42', name: 'Sam' }]);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      <Text>{orders.length} orders</Text>
      <Pressable onPress={() => setOrders([...orders, { id: '43', name: 'Mai' }])}>
        <Text>+ Order</Text>
      </Pressable>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>#{item.id} {item.name}</Text>}
      />
    </View>
  );
}
`,
        hint: 'A Text with orders.length, a Pressable that calls setOrders([...orders, { id: \'43\', name: \'Mai\' }]), and a FlatList with data, keyExtractor and renderItem.',
        checks: [
          { message: 'Starts with "2 orders"', screen: { text: '2 orders' } },
          { message: 'Dana is listed', screen: { text: '#41 Dana' } },
          { message: '+ Order adds Mai', screen: { tap: ['+ Order'], text: '#43 Mai' } },
          { message: 'And the count is 3', screen: { tap: ['+ Order'], text: '3 orders' } },
          { message: 'A FlatList', codeIncludes: '<FlatList' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Mai says her new order didn\'t appear. Her code is orders.push(o). What\'s wrong?',
        options: [
          { text: 'push is too slow', why: 'It\'s instant. It just changes the array React already has.' },
          { text: 'push changes the old array, so React sees no change. Use setOrders([...orders, o])' },
          { text: 'The order has no name', why: 'Even a perfect order won\'t show without a new array.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its lesson.',
        pairs: [
          ['orders.map(...)', 'Forty people, one question'],
          ['[...orders, newOrder]', 'A list that grows'],
          ['FlatList + keyExtractor', 'Forty orders and counting'],
          ['key={order.id}', 'Keys, myths and mix-ups'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'I made 300 fake orders and it\'s still smooth. How?',
        options: [
          { text: 'Phones are fast.', why: 'They are, but FlatList is doing the work.' },
          { text: 'Luck.', why: 'It\'s on purpose.' },
          { text: 'FlatList only draws the rows near the screen. The other 290 wait until you scroll.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'A FlatList, from memory.',
        language: 'typescript',
        template: '<FlatList [[1]]={orders} keyExtractor={(item) => item.[[2]]} renderItem={({ item }) => <Text>{item.name}</Text>} />',
        blanks: [['data'], ['id']],
        distractors: ['items', 'name', 'list'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Changes the screen, or not?',
        groups: ['Screen updates', 'Nothing happens'],
        items: [
          { text: 'setOrders([...orders, o])', group: 0 },
          { text: 'orders.push(o)', group: 1 },
          { text: 'setOrders(orders.slice(1))', group: 0 },
          { text: 'orders.length = 0', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the screen show?',
        code: "const orders = [{ id: '41', name: 'Dana' }, { id: '42', name: 'Sam' }];\n<Text>{orders.length} orders, first: {orders[0].name}</Text>",
        language: 'typescript',
        options: [
          { text: '2 orders, first: Dana' },
          { text: '2 orders, first: Sam', why: 'Arrays count from 0, so [0] is Dana.' },
          { text: '1 orders, first: Dana', why: 'length counts items: 2.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Show "No orders yet" when the list is empty',
        starter: `import { View, Text, FlatList } from 'react-native';

export default function App() {
  const orders: { id: string; name: string }[] = [];
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
`,
        solution: `import { View, Text, FlatList } from 'react-native';

export default function App() {
  const orders: { id: string; name: string }[] = [];
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        ListEmptyComponent={<Text>No orders yet</Text>}
      />
    </View>
  );
}
`,
        hint: 'ListEmptyComponent={<Text>No orders yet</Text>}',
        checks: [{ message: '"No orders yet"', screen: { text: 'No orders yet' } }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'An array has 7 orders. What position number is the last one at? (Arrays start at 0.)',
        answers: ['6'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'At 12:40, what does Linh notice?',
        options: [
          { text: 'The list is wrong', why: 'It\'s right. The problem is what it doesn\'t say.' },
          { text: 'The phone is too small', why: 'It fits fine.' },
          { text: 'People still ask at the window: the list shows every order, but not which ones are ready' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Make a list of something you own (books, games, plants) as an array of objects with ids. Show it in a FlatList.',
    starters: ['My list:...', 'Each item has...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1–4.',
};

export default lesson;
