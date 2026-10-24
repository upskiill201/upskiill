import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Cards: changing one item in a list in state with .map ({ ...o, status: 'Ready' }), and removing one with .filter. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Ray taps Ready',
  summary: 'So far the statuses are typed into the code. Ray needs a button on each row: tap it when the bowl is up. That means changing one order inside a list in state, without touching the others.',
  minutes: 13,
  outcomes: ['Change one item in an array in state with .map', 'Remove an item with .filter', 'Pass the item\'s id to a handler'],
  learn: [
    {
      kind: 'text',
      html: '<p>The orders live in state: <code>const [orders, setOrders] = useState(FIRST_ORDERS)</code>. Ray taps "Ready" on order #42. How do you change just that one?</p><p>Not like this: <code>orders[1].status = \'Ready\'</code>. That changes the old object in place, and React won\'t redraw (the same trap as push).</p><p>Instead, build a new list with <code>.map</code>. Every order is copied as it is, except the one with the matching id, which gets a new status:</p><pre><code>function markReady(id: string) {\n  setOrders(orders.map((o) =&gt;\n    o.id === id ? { ...o, status: \'Ready\' } : o\n  ));\n}</code></pre><p>Read it as: "for each order, if it\'s the one, copy it with status Ready; otherwise keep it."</p><p>Each row\'s button passes its own id: <code>onPress={() =&gt; markReady(order.id)}</code>.</p><p>When the customer collects their bowl, the order leaves the board. That\'s <code>.filter</code>: keep every order <em>except</em> that one.</p><pre><code>function collect(id: string) {\n  setOrders(orders.filter((o) =&gt; o.id !== id));\n}</code></pre>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Add with [...list, item]. Change with .map. Remove with .filter. Always a new array.',
    },
    {
      kind: 'tryIt',
      title: 'Ray\'s buttons',
      caption: 'Tap "Ready" on a cooking order, then "Collected" on a ready one. Only that row changes.',
      code: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const FIRST_ORDERS = [
  { id: '41', name: 'Dana', status: 'Cooking' },
  { id: '42', name: 'Sam', status: 'Cooking' },
  { id: '43', name: 'Priya', status: 'Cooking' },
];

export default function App() {
  const [orders, setOrders] = useState(FIRST_ORDERS);

  function markReady(id: string) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: 'Ready' } : o)));
  }

  function collect(id: string) {
    setOrders(orders.filter((o) => o.id !== id));
  }

  return (
    <View style={styles.screen}>
      {orders.map((o) => (
        <View key={o.id} style={styles.row}>
          <Text style={styles.name}>#{o.id} {o.name}: {o.status}</Text>
          {o.status === 'Cooking' ? (
            <Pressable style={styles.ready} onPress={() => markReady(o.id)}>
              <Text style={styles.buttonText}>Ready</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.collect} onPress={() => collect(o.id)}>
              <Text style={styles.buttonText}>Collected</Text>
            </Pressable>
          )}
        </View>
      ))}
      {orders.length === 0 && <Text style={styles.name}>All collected!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 10, backgroundColor: '#fff7ed' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, backgroundColor: '#ffffff', borderRadius: 12 },
  name: { flex: 1, fontSize: 17 },
  ready: { backgroundColor: '#15803d', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
  collect: { backgroundColor: '#78716c', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
  buttonText: { color: '#ffffff', fontWeight: 'bold' },
});
`,
      challenge: 'Add an "Undo" button to ready orders that sets the status back to \'Cooking\'.',
    },
  ],
  apply: {
    scenario: 'Changing one order in the list.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Write markReady(id) with .map, and give each row a "Ready #{id}" button. Tapping "Ready #42" shows "#42: Ready"',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([
    { id: '41', status: 'Cooking' },
    { id: '42', status: 'Cooking' },
  ]);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {orders.map((o) => (
        <View key={o.id}>
          <Text>#{o.id}: {o.status}</Text>
        </View>
      ))}
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([
    { id: '41', status: 'Cooking' },
    { id: '42', status: 'Cooking' },
  ]);

  function markReady(id: string) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: 'Ready' } : o)));
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {orders.map((o) => (
        <View key={o.id}>
          <Text>#{o.id}: {o.status}</Text>
          <Pressable onPress={() => markReady(o.id)}><Text>Ready #{o.id}</Text></Pressable>
        </View>
      ))}
    </View>
  );
}
`,
        hint: "function markReady(id: string) { setOrders(orders.map((o) => (o.id === id ? { ...o, status: 'Ready' } : o))); } and a Pressable with onPress={() => markReady(o.id)}.",
        checks: [
          { message: '#42 becomes Ready', screen: { tap: ['Ready #42'], text: '#42: Ready' } },
          { message: '#41 stays Cooking', screen: { tap: ['Ready #42'], text: '#41: Cooking' } },
          { message: 'Changed with map', codeIncludes: 'orders.map(' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In markReady, what happens to the orders that don\'t match the id?',
        options: [
          { text: 'They\'re removed', why: 'That would be filter. map keeps every item.' },
          { text: 'They\'re kept exactly as they were (": o")' },
          { text: 'They become Cooking', why: 'They keep whatever status they had.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which method for the job?',
        groups: ['[...orders, o]', '.map', '.filter'],
        items: [
          { text: 'A new order arrives', group: 0 },
          { text: 'Ray marks #42 Ready', group: 1 },
          { text: 'Dana collects her bowl', group: 2 },
          { text: 'A name is corrected', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'Why not orders[1].status = \'Ready\' and then setOrders(orders)?',
        options: [
          { text: 'That changes the old object in place. React sees the same array and may not redraw. map makes a new one.' },
          { text: 'It\'s fine, I\'ll do that.', why: 'It\'s the push trap again.' },
          { text: 'Because orders[1] might not exist.', why: 'True, but the bigger problem is mutating state.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add collect(id) with .filter, and a "Collect #{id}" button. Tapping "Collect #41" removes Dana\'s order',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([
    { id: '41', name: 'Dana' },
    { id: '42', name: 'Sam' },
  ]);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {orders.map((o) => (
        <View key={o.id}>
          <Text>#{o.id} {o.name}</Text>
        </View>
      ))}
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([
    { id: '41', name: 'Dana' },
    { id: '42', name: 'Sam' },
  ]);

  function collect(id: string) {
    setOrders(orders.filter((o) => o.id !== id));
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {orders.map((o) => (
        <View key={o.id}>
          <Text>#{o.id} {o.name}</Text>
          <Pressable onPress={() => collect(o.id)}><Text>Collect #{o.id}</Text></Pressable>
        </View>
      ))}
    </View>
  );
}
`,
        hint: 'function collect(id: string) { setOrders(orders.filter((o) => o.id !== id)); }',
        checks: [
          { message: 'Dana\'s order is gone', screen: { tap: ['Collect #41'], noText: '#41 Dana' } },
          { message: 'Sam\'s is still there', screen: { tap: ['Collect #41'], text: '#42 Sam' } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Mark one order ready.',
        language: 'typescript',
        template: "orders.map((o) => (o.id === id ? { [[1]], status: 'Ready' } : [[2]]))",
        blanks: [['...o'], ['o']],
        distractors: ['...orders', 'null', 'id'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'orders has #41, #42, #43. After collect(\'42\'), how many are left?',
        code: "setOrders(orders.filter((o) => o.id !== id));",
        language: 'typescript',
        options: [
          { text: '1', why: 'Only #42 is removed.' },
          { text: '3', why: '#42 doesn\'t pass the test, so it\'s left out.' },
          { text: '2' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to the button.',
        pairs: [
          ["{ ...o, status: 'Ready' }", 'Ready'],
          ['o.id !== id', 'Collected'],
          ['[...orders, newOrder]', '+ Order'],
          ["{ ...o, status: 'Cooking' }", 'Undo'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which array method do you use to change one order and keep all the others?',
        answers: ['map', '.map', '.map()', 'map()'],
        placeholder: 'method',
      },
      {
        kind: 'findBug',
        prompt: 'Tapping Ready on any row makes EVERY order Ready. Which line is wrong?',
        language: 'typescript',
        lines: ['function markReady(id: string) {', "  setOrders(orders.map((o) => ({ ...o, status: 'Ready' })));", '}'],
        bug: 1,
        fix: "  setOrders(orders.map((o) => (o.id === id ? { ...o, status: 'Ready' } : o)));",
        explanation: 'Without the id check, map changes every order. Only the one with the matching id should change.',
      },
    ],
  },
  reflect: {
    prompt: 'In your own app, what can people add, change and remove in a list? Write the method you\'d use for each.',
    starters: ['Add:...', 'Change:...', 'Remove:...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Hand the phone to someone and play Ray: they tap Ready, you play customers collecting. Does every button change only its own row?',
  },
  notes: 'Updating arrays in state immutably: map to replace one item, filter to remove (React docs: "Updating Arrays in State").',
};

export default lesson;
