import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 12. Steps: tap a row to open that order; pass the id, find the order, handle "not found". */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Tap your number',
  summary: 'Last lesson\'s order screen always showed #42. Now every row on the board has to open its own order. The trick: the screen only needs one thing, the order\'s id.',
  minutes: 13,
  outcomes: ['Open a screen for the item that was tapped', 'Pass just the id and find the order with .find', 'Show a fallback when an order isn\'t found'],
  learn: [
    {
      kind: 'steps',
      title: 'From a row to its own screen',
      steps: [
        {
          title: '1. Remember which order is open',
          body: 'Instead of a screen name, keep the open order\'s id. null means "no order open: show the board".',
          code: 'const [openId, setOpenId] = useState<string | null>(null);',
          language: 'typescript',
        },
        {
          title: '2. Each row passes its own id',
          body: 'Make each row a Pressable. Tapping it stores that row\'s id.',
          code: 'renderItem={({ item }) => (\n  <Pressable onPress={() => setOpenId(item.id)}>\n    <Text>#{item.id} {item.name}</Text>\n  </Pressable>\n)}',
          language: 'typescript',
        },
        {
          title: '3. Find the order from the id',
          body: '.find returns the first item that matches, or undefined if none does.',
          code: 'const open = orders.find((o) => o.id === openId);',
          language: 'typescript',
        },
        {
          title: '4. Show its screen',
          body: 'If an order is open, return its screen. Back sets openId to null.',
          code: 'if (open) {\n  return <OrderScreen order={open} onBack={() => setOpenId(null)} />;\n}',
          language: 'typescript',
        },
        {
          title: '5. Plan for "not found"',
          body: 'If the order was collected while someone was looking, find returns undefined. Say so kindly instead of crashing.',
          code: "if (openId && !open) {\n  return <Text>That order has been collected.</Text>;\n}",
          language: 'typescript',
        },
        {
          title: '6. Why pass the id, not the whole order?',
          body: 'The id never changes. The order does (Cooking to Ready). By finding it fresh from the list every draw, the screen always shows the latest status.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Every row opens its own order',
      caption: 'Tap any row. The order screen finds that order by its id. Back returns to the board.',
      code: `import { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

type Order = { id: string; name: string; bowl: string; status: string };

const ORDERS: Order[] = [
  { id: '41', name: 'Dana', bowl: 'Large pho, extra brisket', status: 'Ready' },
  { id: '42', name: 'Sam', bowl: 'Small pho, no onions', status: 'Cooking' },
  { id: '43', name: 'Priya', bowl: 'Large pho, extra noodles', status: 'Cooking' },
];

function OrderScreen({ order, onBack }: { order: Order; onBack: () => void }) {
  return (
    <View style={styles.screen}>
      <Pressable onPress={onBack}><Text style={styles.back}>{'< Board'}</Text></Pressable>
      <Text style={styles.big}>#{order.id}</Text>
      <Text style={styles.line}>{order.name}: {order.bowl}</Text>
      <Text style={styles.status}>{order.status}</Text>
    </View>
  );
}

export default function App() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = ORDERS.find((o) => o.id === openId);

  if (open) {
    return <OrderScreen order={open} onBack={() => setOpenId(null)} />;
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Tap your number</Text>
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => setOpenId(item.id)}>
            <Text style={styles.rowText}>#{item.id} {item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 10, backgroundColor: '#fff7ed' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#9a3412', marginBottom: 8 },
  row: { padding: 16, backgroundColor: '#ffffff', borderRadius: 12, marginBottom: 8 },
  rowText: { fontSize: 20 },
  back: { fontSize: 18, color: '#9a3412', fontWeight: 'bold' },
  big: { fontSize: 48, fontWeight: 'bold' },
  line: { fontSize: 18 },
  status: { fontSize: 22, fontWeight: 'bold', color: '#15803d' },
});
`,
      challenge: 'Colour the status on the order screen amber when it\'s Cooking and green when it\'s Ready.',
    },
  ],
  apply: {
    scenario: 'One screen for every order.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Keep openId in state, starting at null', 'Each row calls setOpenId(item.id)', 'Find the order with orders.find', 'If there is one, return its screen', 'Back calls setOpenId(null)'],
      },
      {
        kind: 'writeCode',
        prompt: 'Make each row open its order: keep openId in state, find the order, and show "Order #{id} for {name}" with a "Back" button',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana' },
  { id: '42', name: 'Sam' },
];

export default function App() {

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {ORDERS.map((o) => (
        <Pressable key={o.id}>
          <Text>#{o.id} {o.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana' },
  { id: '42', name: 'Sam' },
];

export default function App() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = ORDERS.find((o) => o.id === openId);

  if (open) {
    return (
      <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
        <Pressable onPress={() => setOpenId(null)}><Text>Back</Text></Pressable>
        <Text>Order #{open.id} for {open.name}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {ORDERS.map((o) => (
        <Pressable key={o.id} onPress={() => setOpenId(o.id)}>
          <Text>#{o.id} {o.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}
`,
        hint: 'useState<string | null>(null), const open = ORDERS.find((o) => o.id === openId), an early return when open, and onPress={() => setOpenId(o.id)} on each row.',
        checks: [
          { message: 'Sam\'s row opens Sam\'s order', screen: { tap: ['#42 Sam'], text: 'Order #42 for Sam' } },
          { message: 'Dana\'s row opens Dana\'s order', screen: { tap: ['#41 Dana'], text: 'Order #41 for Dana' } },
          { message: 'Back returns to the list', screen: { tap: ['#42 Sam', 'Back'], text: '#41 Dana' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the order screen get the id and look the order up, instead of keeping a copy of the order?',
        options: [
          { text: 'Copies use too much memory', why: 'A few fields are nothing. A copy goes out of date.' },
          { text: 'You can\'t put objects in state', why: 'You can. But a copy won\'t see Ray\'s updates.' },
          { text: 'The id never changes, so looking it up every draw always gives the latest status' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to its job.',
        pairs: [
          ['openId', 'Which order is open (or null)'],
          ['orders.find(...)', 'The order with that id'],
          ['setOpenId(item.id)', 'Open this row\'s order'],
          ['setOpenId(null)', 'Back to the board'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'I opened #43, then Ray collected it, and now the screen is blank. Scary.',
        options: [
          { text: 'That\'s fine, just tap Back.', why: 'A blank screen looks broken. Say what happened.' },
          { text: 'Good catch. find returned nothing, so I\'ll show "That order has been collected" with a Back button.' },
          { text: 'Ray shouldn\'t collect orders.', why: 'Collecting is his job. The app should cope.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Find the open order.',
        language: 'typescript',
        template: 'const open = orders.[[1]]((o) => o.id === [[2]]);',
        blanks: [['find'], ['openId']],
        distractors: ['filter', 'id', 'map'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What is open?',
        code: "const orders = [{ id: '41' }, { id: '42' }];\nconst open = orders.find((o) => o.id === '99');",
        language: 'typescript',
        options: [
          { text: 'undefined' },
          { text: '[]', why: 'That\'s what filter would give. find gives one item or undefined.' },
          { text: "{ id: '99' }", why: 'find only returns items that exist in the array.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'find or filter?',
        groups: ['.find (one item)', '.filter (a list)'],
        items: [
          { text: 'The order with id 42', group: 0 },
          { text: 'All ready orders', group: 1 },
          { text: 'Dana\'s order', group: 0 },
          { text: 'Every order with brisket', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does .find give back when nothing matches?',
        answers: ['undefined'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Every row opens Dana\'s order. Which line is the problem?',
        language: 'typescript',
        lines: ['{orders.map((o) => (', "  <Pressable key={o.id} onPress={() => setOpenId('41')}>", '    <Text>#{o.id} {o.name}</Text>', '  </Pressable>', '))}'],
        bug: 1,
        fix: '  <Pressable key={o.id} onPress={() => setOpenId(o.id)}>',
        explanation: 'Every row passes the same fixed id. Pass this row\'s own id: o.id.',
      },
    ],
  },
  reflect: {
    prompt: 'Which list in your own app needs a details screen? What would that screen show that the row doesn\'t?',
    starters: ['The list:...', 'The details screen adds...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Put the board and order screen on your phone. Open an order, then (in code) change its status. Does the screen show the new status without reopening?',
  },
  notes: 'Array.prototype.find; store an id and derive the item (avoids stale copies). useState<string | null> generic.',
};

export default lesson;
