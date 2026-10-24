import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: build log v0.4 (so far). */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Build log v0.4',
  summary: 'Five days to the festival. The app has a board: every order, a coloured pill, the ready ones at the top, and Ray\'s buttons. Tap through Theo\'s v0.4 log so far.',
  minutes: 11,
  outcomes: ['Review lists, FlatList, keys, filter and map', 'Spot what v0.4 still needs', 'Update your build log'],
  learn: [
    {
      kind: 'explore',
      title: 'Theo\'s build log, v0.4 (so far)',
      text: 'BUILD LOG v0.4, Pho Real app. Goal: nobody has to ask "Is my order ready?". Shipped: orders kept as an array in state; new orders added with [...orders, order]; a FlatList board with keyExtractor; OrderRow with a green or amber pill; ready numbers at the top with filter; counts in the header; Ray\'s Ready and Collected buttons using map and filter. What broke: I used the row position as the key and a tick jumped from Sam to Priya. Fix: key on the order id. What broke 2: orders.push did nothing. Fix: a new array, always. Still missing: a screen for one order with the details. A way for the customer to see only their own order. A separate kitchen view for Ray. Arjun says: "Add, change, remove: spread, map, filter." Festival: 5 days.',
      hotspots: [
        { phrase: 'orders kept as an array in state', note: 'Lesson 2: useState with a list.' },
        { phrase: 'a FlatList board with keyExtractor', note: 'Lesson 3: only the rows near the screen are drawn.' },
        { phrase: 'a green or amber pill', note: 'Lesson 6: a conditional style, plus the word, so colour isn\'t the only clue.' },
        { phrase: 'ready numbers at the top with filter', note: 'Lesson 7: a smaller list calculated from the full one.' },
        { phrase: 'Ray\'s Ready and Collected buttons using map and filter', note: 'Lesson 8: change one, remove one, always a new array.' },
        { phrase: 'a tick jumped from Sam to Priya', note: 'Lesson 4: index keys follow positions, not orders.' },
        { phrase: 'Still missing: a screen for one order with the details. A way for the customer to see only their own order. A separate kitchen view for Ray.', note: 'The second half of this chapter: screens, passing an id, and navigation.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The bug in the log',
      caption: 'This is the push bug from Theo\'s log. Tap "+ Order": nothing appears. Fix addOrder so it makes a new array.',
      code: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([{ id: '41', name: 'Dana' }]);

  function addOrder() {
    orders.push({ id: String(41 + orders.length), name: 'New' });
    setOrders(orders);
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {orders.map((o) => (
        <Text key={o.id} style={{ fontSize: 20 }}>#{o.id} {o.name}</Text>
      ))}
      <Pressable onPress={addOrder} style={{ backgroundColor: '#9a3412', padding: 14, borderRadius: 12 }}>
        <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>+ Order</Text>
      </Pressable>
    </View>
  );
}
`,
      challenge: 'Replace the two lines in addOrder with setOrders([...orders, { id: String(41 + orders.length), name: \'New\' }]).',
    },
  ],
  apply: {
    scenario: 'Reading the v0.4 log.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each log line to its lesson.',
        pairs: [
          ['Key on the order id', 'Keys, myths and mix-ups'],
          ['A FlatList board', 'Forty orders and counting'],
          ['Ready numbers at the top', 'Just the ready ones'],
          ['Ready and Collected buttons', 'Ray taps Ready'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the push bug: "+ Order" should add { id: \'42\', name: \'New\' } so "#42 New" appears',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([{ id: '41', name: 'Dana' }]);

  function addOrder() {
    orders.push({ id: '42', name: 'New' });
    setOrders(orders);
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {orders.map((o) => (
        <Text key={o.id}>#{o.id} {o.name}</Text>
      ))}
      <Pressable onPress={addOrder}><Text>+ Order</Text></Pressable>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([{ id: '41', name: 'Dana' }]);

  function addOrder() {
    setOrders([...orders, { id: '42', name: 'New' }]);
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {orders.map((o) => (
        <Text key={o.id}>#{o.id} {o.name}</Text>
      ))}
      <Pressable onPress={addOrder}><Text>+ Order</Text></Pressable>
    </View>
  );
}
`,
        hint: "Replace both lines with setOrders([...orders, { id: '42', name: 'New' }]);",
        checks: [
          { message: '"#42 New" appears', screen: { tap: ['+ Order'], text: '#42 New' } },
          { message: 'No push', codeIncludes: '...orders' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did the tick jump from Sam to Priya?',
        options: [
          { text: 'The keys were positions, so after #41 left, Priya took the position (and state) Sam had' },
          { text: 'Sam\'s phone was slow', why: 'One phone, one list. It was the keys.' },
          { text: 'filter removed the wrong order', why: 'filter removed the right one. The keys mismatched the state.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Shipped in v0.4 so far, or still missing?',
        groups: ['Shipped', 'Still missing'],
        items: [
          { text: 'The order board', group: 0 },
          { text: 'A screen for one order', group: 1 },
          { text: 'Coloured status pills', group: 0 },
          { text: 'A kitchen view for Ray', group: 1 },
          { text: 'Ready numbers at the top', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'Lists in three words each: how do you add, change and remove?',
        options: [
          { text: 'Push, edit, delete.', why: 'Those change the array in place: no redraw.' },
          { text: 'Spread, map, filter.' },
          { text: 'Use more state.', why: 'One list, three methods.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The log\'s two rules.',
        template: 'Key on the order [[1]], never the position. Always make a new [[2]].',
        blanks: [['id'], ['array']],
        distractors: ['name', 'object', 'index'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days to the festival in this log?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What do the counts say?',
        code: "const orders = [\n  { id: '41', status: 'Ready' },\n  { id: '42', status: 'Ready' },\n  { id: '43', status: 'Cooking' },\n];\nconst ready = orders.filter((o) => o.status === 'Ready');\n<Text>{ready.length} ready of {orders.length}</Text>",
        language: 'typescript',
        options: [
          { text: '1 ready of 3', why: 'Two orders are Ready.' },
          { text: '3 ready of 3', why: 'filter keeps only the matching ones.' },
          { text: '2 ready of 3' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a line to Theo\'s log screen: "Still missing: order screen, kitchen view"',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Build log v0.4</Text>
      <Text>Shipped: the board, pills, Ready buttons</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Build log v0.4</Text>
      <Text>Shipped: the board, pills, Ready buttons</Text>
      <Text>Still missing: order screen, kitchen view</Text>
    </View>
  );
}
`,
        hint: 'Add <Text>Still missing: order screen, kitchen view</Text>.',
        checks: [{ message: 'The line shows', screen: { text: 'Still missing: order screen, kitchen view' } }],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s next for v0.4?',
        options: [
          { text: 'Saving orders to the phone', why: 'That\'s Chapter 5. Now it\'s screens.' },
          { text: 'More than one screen: one order\'s details, and a kitchen view for Ray' },
          { text: 'Payments', why: 'Not in Film 1. Next is navigation.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Update your build log: which list bug from this chapter have you hit yourself? Write down the fix in one line.',
    starters: ['The bug:...', 'The fix:...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Put the board on your phone with five orders. Mark two ready and collect one. Check the counts and the top row agree with what you see.',
  },
  notes: 'Build log v0.4 (fictional): running device. Push bug demonstrates mutation of state.',
};

export default lesson;
