import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Myth or fact: keys and lists (index keys, unique ids, keys inside the row). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Keys, myths and mix-ups',
  summary: 'Theo used the row number as the key. Then order #42 was collected, the list shifted up, and Sam\'s "Ready" tick jumped onto Priya\'s order. Sort the myths about keys from the facts.',
  minutes: 12,
  outcomes: ['Explain what a key is for', 'Choose a stable, unique key', 'Spot the index-as-key bug'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Keys are only there to stop a warning.', isFact: false, explain: 'The warning is a symptom. Keys are how React matches each row to the right item when the list changes.' },
        { text: 'A key must be unique among the items in the same list.', isFact: true, explain: 'Two orders with key "41" and React can\'t tell them apart. Ids from your data are unique by design.' },
        { text: 'Using the position (index) as the key is always fine.', isFact: false, explain: 'Only for lists that never change order or lose items. Remove the first order and every index shifts, so rows can keep the wrong state.' },
        { text: 'The order id makes a good key.', isFact: true, explain: 'It belongs to the order, never changes, and is unique. Exactly what a key needs.' },
        { text: 'Math.random() is a good key because it\'s always unique.', isFact: false, explain: 'It changes on every draw, so React thinks every row is brand new each time and rebuilds them all. Keys must stay the same.' },
        { text: 'The key goes on the outermost element you return for each item.', isFact: true, explain: 'In .map it\'s the element you return (a Text or a row View). FlatList\'s keyExtractor does it for you.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Watch the tick jump',
      caption: 'Each row remembers its own "checked" state. Tick Sam, then tap "Collect first order". With index keys, the tick jumps to the wrong person. Change key={index} to key={order.id} and try again.',
      code: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function Row({ name }: { name: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <Pressable style={styles.row} onPress={() => setChecked(!checked)}>
      <Text style={styles.name}>{checked ? '[x] ' : '[ ] '}{name}</Text>
    </Pressable>
  );
}

export default function App() {
  const [orders, setOrders] = useState([
    { id: '41', name: 'Dana' },
    { id: '42', name: 'Sam' },
    { id: '43', name: 'Priya' },
  ]);

  return (
    <View style={styles.screen}>
      {orders.map((order, index) => (
        <Row key={index} name={order.name} />
      ))}
      <Pressable style={styles.button} onPress={() => setOrders(orders.slice(1))}>
        <Text style={styles.buttonText}>Collect first order</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 10, backgroundColor: '#fff7ed' },
  row: { padding: 14, backgroundColor: '#ffffff', borderRadius: 12 },
  name: { fontSize: 20 },
  button: { backgroundColor: '#9a3412', paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
});
`,
      challenge: 'With key={index}: tick Sam, collect. Who\'s ticked now? Then switch to key={order.id} and repeat.',
    },
  ],
  apply: {
    scenario: 'Choosing keys.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Good key or bad key for an order?',
        groups: ['Good key', 'Bad key'],
        items: [
          { text: 'order.id', group: 0 },
          { text: 'Math.random()', group: 1 },
          { text: 'The position, in a list that changes', group: 1 },
          { text: 'A ticket number that never repeats', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In the try-it, why did Sam\'s tick jump to Priya?',
        options: [
          { text: 'Priya tapped it', why: 'Nobody did. The keys moved.' },
          { text: 'State is shared between rows', why: 'Each row has its own. React gave Sam\'s row state to the wrong item.' },
          { text: 'With index keys, Priya moved into position 1, so she got the state that belonged to "key 1"' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the keys: use the order id. Tick Sam, collect the first order, and Sam should still be ticked',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

function Row({ name }: { name: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <Pressable onPress={() => setChecked(!checked)}>
      <Text>{checked ? 'Ticked: ' : 'Open: '}{name}</Text>
    </Pressable>
  );
}

export default function App() {
  const [orders, setOrders] = useState([
    { id: '41', name: 'Dana' },
    { id: '42', name: 'Sam' },
    { id: '43', name: 'Priya' },
  ]);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {orders.map((order, index) => (
        <Row key={index} name={order.name} />
      ))}
      <Pressable onPress={() => setOrders(orders.slice(1))}><Text>Collect first order</Text></Pressable>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

function Row({ name }: { name: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <Pressable onPress={() => setChecked(!checked)}>
      <Text>{checked ? 'Ticked: ' : 'Open: '}{name}</Text>
    </Pressable>
  );
}

export default function App() {
  const [orders, setOrders] = useState([
    { id: '41', name: 'Dana' },
    { id: '42', name: 'Sam' },
    { id: '43', name: 'Priya' },
  ]);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {orders.map((order) => (
        <Row key={order.id} name={order.name} />
      ))}
      <Pressable onPress={() => setOrders(orders.slice(1))}><Text>Collect first order</Text></Pressable>
    </View>
  );
}
`,
        hint: 'Change key={index} to key={order.id}.',
        checks: [
          { message: 'Sam stays ticked', screen: { tap: ['Open: Sam', 'Collect first order'], text: 'Ticked: Sam' } },
          { message: 'Priya stays open', screen: { tap: ['Open: Sam', 'Collect first order'], text: 'Open: Priya' } },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'Your list warns: "Each child in a list should have a unique key prop." Can you just turn the warning off?',
        options: [
          { text: 'Turning it off hides the problem. I\'ll give each row key={order.id} so React knows which row is which.' },
          { text: 'Yes, warnings don\'t matter.', why: 'This one points at a real bug.' },
          { text: 'I\'ll use Math.random() as the key.', why: 'Keys that change every draw are worse than none.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Keys from the data.',
        language: 'typescript',
        template: '{orders.map((order) => <Row [[1]]={order.[[2]]} name={order.name} />)}',
        blanks: [['key'], ['id']],
        distractors: ['index', 'value', 'name'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does orders.slice(1) give, if orders is [Dana, Sam, Priya]?',
        code: 'orders.slice(1)',
        language: 'typescript',
        options: [
          { text: '[Dana]', why: 'slice(1) starts at position 1 and keeps the rest.' },
          { text: '[Sam, Priya]' },
          { text: '[Dana, Sam]', why: 'That would drop the last one.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the key to what happens.',
        pairs: [
          ['key={order.id}', 'Rows follow their orders'],
          ['key={index}', 'Rows can swap state when items move'],
          ['key={Math.random()}', 'Every row is rebuilt each draw'],
          ['No key at all', 'A warning, and index is used'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What prop name does React use to tell list items apart?',
        answers: ['key'],
        placeholder: 'prop',
      },
      {
        kind: 'mcq',
        prompt: 'Where does the key go in a .map?',
        options: [
          { text: 'On the outermost element returned for each item' },
          { text: 'On the Text deepest inside the row', why: 'It goes on the element you return, the outside one.' },
          { text: 'On the View around the whole list', why: 'One key on the list doesn\'t help tell the items apart.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'The key warning still shows. Which line is the problem?',
        language: 'typescript',
        lines: ['{orders.map((order) => (', '  <View style={styles.row}>', '    <Text key={order.id}>{order.name}</Text>', '  </View>', '))}'],
        bug: 1,
        fix: '  <View key={order.id} style={styles.row}>',
        explanation: 'The key must be on the outermost element returned for each item, which is the View, not the Text inside it.',
      },
    ],
  },
  reflect: {
    prompt: 'What is a natural, stable id for each item in your own app\'s list?',
    starters: ['Each item\'s id would be...', 'It never changes because...'],
  },
  deepen: {
    title: 'Read the docs',
    summary: 'React\'s "Rendering Lists" page has a section, "Why does React need keys?", with a file-name analogy. Read it, then explain keys to someone in one sentence.',
  },
  notes: 'React docs: "Rendering Lists" (keys must be unique among siblings and stable; index keys and generated-on-render keys cause bugs).',
};

export default lesson;
