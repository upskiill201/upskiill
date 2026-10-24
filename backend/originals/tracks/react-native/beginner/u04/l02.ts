import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Chat with Tey: the list of orders in state; length and adding with [...orders, newOrder]. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'A list that grows',
  summary: 'The board can\'t be a fixed list: new orders arrive every minute. Tey shows Theo how to keep the whole list in state and add to it without breaking anything.',
  minutes: 12,
  outcomes: ['Keep an array in state with useState', 'Count items with .length', 'Add an item with [...orders, newOrder]'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Last lesson\'s ORDERS was a constant. At the festival, orders arrive all day. What does the app use for things that change?', replies: ['State!'] },
        { tey: 'Right. An array can be state too: const [orders, setOrders] = useState(FIRST_ORDERS). Draw it with .map, exactly like before.', replies: ['How do I add one?'] },
        { tey: 'Not with orders.push(...). That changes the old array in place, and React doesn\'t notice. Make a new array instead: setOrders([...orders, newOrder]).', replies: ['Same dots as the order object?'] },
        { tey: 'Same spread. [...orders] copies every order into a new array, and newOrder goes on the end. New array, so React redraws.', replies: ['And counting them?'] },
        { tey: 'orders.length. Three orders: 3. It\'s calculated, so it\'s always right: <Text>{orders.length} orders</Text>. Store the list, calculate the count.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Orders keep coming',
      caption: 'Tap "+ Test order" a few times. The new orders get the next number, and the count follows.',
      code: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const FIRST_ORDERS = [
  { id: '41', name: 'Dana' },
  { id: '42', name: 'Sam' },
];

export default function App() {
  const [orders, setOrders] = useState(FIRST_ORDERS);

  function addTestOrder() {
    const id = String(41 + orders.length);
    setOrders([...orders, { id, name: 'Test' }]);
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.count}>{orders.length} orders</Text>
      {orders.map((order) => (
        <Text key={order.id} style={styles.row}>#{order.id} {order.name}</Text>
      ))}
      <Pressable style={styles.button} onPress={addTestOrder}>
        <Text style={styles.buttonText}>+ Test order</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 10, backgroundColor: '#fff7ed' },
  count: { fontSize: 16, fontWeight: 'bold', color: '#78716c' },
  row: { fontSize: 20, color: '#1c1917' },
  button: { backgroundColor: '#9a3412', paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
});
`,
      challenge: 'Change addTestOrder to use orders.push(...) and setOrders(orders). Tap it. Does anything happen?',
    },
  ],
  apply: {
    scenario: 'A growing list.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add a "+ Test order" button that adds { id: \'43\', name: \'Test\' } to the list. One tap shows "#43 Test"',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([{ id: '41', name: 'Dana' }, { id: '42', name: 'Sam' }]);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {orders.map((order) => (
        <Text key={order.id}>#{order.id} {order.name}</Text>
      ))}
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([{ id: '41', name: 'Dana' }, { id: '42', name: 'Sam' }]);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {orders.map((order) => (
        <Text key={order.id}>#{order.id} {order.name}</Text>
      ))}
      <Pressable onPress={() => setOrders([...orders, { id: '43', name: 'Test' }])}>
        <Text>+ Test order</Text>
      </Pressable>
    </View>
  );
}
`,
        hint: "A Pressable with onPress={() => setOrders([...orders, { id: '43', name: 'Test' }])}.",
        checks: [
          { message: 'Starts without #43', screen: { noText: '#43 Test' } },
          { message: 'One tap adds #43 Test', screen: { tap: ['+ Test order'], text: '#43 Test' } },
          { message: 'Dana is still there', screen: { tap: ['+ Test order'], text: '#41 Dana' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why doesn\'t orders.push(newOrder) update the screen?',
        options: [
          { text: 'push changes the old array in place, so React sees the same array and doesn\'t redraw' },
          { text: 'push only works on numbers', why: 'push works on any array. The problem is changing it in place.' },
          { text: 'Arrays can\'t be state', why: 'They can. Just replace them with a new one.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Add an order the React way.',
        language: 'typescript',
        template: 'setOrders([[[1]]orders, [[2]]]);',
        blanks: [['...'], ['newOrder']],
        distractors: ['orders', 'push', '..'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'Are you storing the order count in state as well?',
        options: [
          { text: 'Yes, count and orders, both in state.', why: 'Then they can drift apart. The count comes from the list.' },
          { text: 'I was going to add it to every order.', why: 'Same problem, more places to forget.' },
          { text: 'No: orders.length. Store the list, calculate the count.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Show the count at the top: "2 orders" (use orders.length)',
        starter: `import { useState } from 'react';
import { View, Text } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([{ id: '41', name: 'Dana' }, { id: '42', name: 'Sam' }]);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {orders.map((order) => (
        <Text key={order.id}>#{order.id} {order.name}</Text>
      ))}
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([{ id: '41', name: 'Dana' }, { id: '42', name: 'Sam' }]);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      <Text>{orders.length} orders</Text>
      {orders.map((order) => (
        <Text key={order.id}>#{order.id} {order.name}</Text>
      ))}
    </View>
  );
}
`,
        hint: '<Text>{orders.length} orders</Text> above the list.',
        checks: [
          { message: '"2 orders"', screen: { text: '2 orders' } },
          { message: 'Calculated from the list', codeIncludes: 'orders.length' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'orders has 2 items. After one tap, what does the count say?',
        code: "onPress={() => setOrders([...orders, { id: '43', name: 'Jo' }])}\n<Text>{orders.length} orders</Text>",
        language: 'typescript',
        options: [
          { text: '2 orders', why: 'A new array with 3 items replaces the old one.' },
          { text: '43 orders', why: '43 is the id, not the count.' },
          { text: '3 orders' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to the result.',
        pairs: [
          ['useState(FIRST_ORDERS)', 'The list, remembered'],
          ['orders.length', 'How many there are'],
          ['[...orders, newOrder]', 'A new list, one longer'],
          ['orders.push(newOrder)', 'Changes in place: no redraw'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'orders has 5 items. What is String(41 + orders.length)?',
        answers: ['46', "'46'", '"46"'],
        placeholder: 'id',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does the screen update?',
        groups: ['Updates', 'Doesn\'t update'],
        items: [
          { text: 'setOrders([...orders, o])', group: 0 },
          { text: 'orders.push(o)', group: 1 },
          { text: 'setOrders([o, ...orders])', group: 0 },
          { text: 'orders[0].name = \'Jo\'', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tapping "+ Test order" does nothing. Which line is the problem?',
        language: 'typescript',
        lines: ['function addTestOrder() {', "  orders.push({ id: '43', name: 'Test' });", '  setOrders(orders);', '}'],
        bug: 1,
        fix: "  setOrders([...orders, { id: '43', name: 'Test' }]);",
        explanation: 'push changes the same array React already has, so setOrders(orders) looks like "no change". Make a new array with the spread.',
      },
    ],
  },
  reflect: {
    prompt: 'What list in your own app grows while people use it? What would one item look like as an object?',
    starters: ['The list:...', 'One item:...'],
  },
  deepen: {
    title: 'Read the docs',
    summary: 'React\'s "Updating Arrays in State" page has a table of methods to avoid (push, splice) and what to use instead (spread, map, filter). Skim it: the next lessons use all three.',
  },
  notes: 'Arrays in state; avoid mutation (React docs: "Updating Arrays in State"). Derived count via length.',
};

export default lesson;
