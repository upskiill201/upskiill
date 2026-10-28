import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 16. Cards: Ray's kitchen screen; a KitchenTicket component with an onReady(id) callback, fed by a filtered list. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Ray\'s kitchen screen',
  summary: 'Ray\'s rules again: what to cook, in what order, and one big button. Theo builds the Kitchen tab as a list of tickets, each one a component that reports back when Ray taps Ready.',
  minutes: 13,
  outcomes: ['Build a list item component with a callback prop', 'Feed a FlatList a filtered list', 'Pass the id back up through the callback'],
  learn: [
    {
      kind: 'text',
      html: '<p>Each cooking order becomes a <strong>ticket</strong> on Ray\'s screen: the number, the bowl, and a big green Ready button. That\'s a component:</p><pre><code>function KitchenTicket({ order, onReady }: {\n  order: Order;\n  onReady: (id: string) =&gt; void;\n}) {\n  return (\n    &lt;View style={styles.ticket}&gt;\n      &lt;Text style={styles.number}&gt;#{order.id}&lt;/Text&gt;\n      &lt;Text style={styles.bowl}&gt;{order.bowl}&lt;/Text&gt;\n      &lt;Pressable style={styles.ready} onPress={() =&gt; onReady(order.id)}&gt;\n        &lt;Text style={styles.readyText}&gt;Ready&lt;/Text&gt;\n      &lt;/Pressable&gt;\n    &lt;/View&gt;\n  );\n}</code></pre><p>The ticket doesn\'t change any orders itself. It calls <code>onReady(order.id)</code>, and App, which owns the list, decides what Ready means. Same pattern as OptionChip in Chapter 3, but now the callback carries the id with it: <code>(id: string) =&gt; void</code>.</p><p>The Kitchen tab feeds a FlatList only the cooking orders:</p><pre><code>const cooking = orders.filter((o) =&gt; o.status === \'Cooking\');\n\n&lt;FlatList\n  data={cooking}\n  keyExtractor={(o) =&gt; o.id}\n  renderItem={({ item }) =&gt; &lt;KitchenTicket order={item} onReady={markReady} /&gt;}\n  ListEmptyComponent={&lt;Text&gt;All caught up&lt;/Text&gt;}\n/&gt;</code></pre><p>When Ray taps Ready, markReady changes the list, the order is no longer Cooking, and its ticket disappears from his screen on the next draw. Nothing to remove by hand.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Data goes down as props; events come up through callbacks. A callback can carry information up, like the id of the order that was tapped.',
    },
    {
      kind: 'tryIt',
      title: 'The kitchen tickets',
      caption: 'Tap Ready on each ticket. They disappear as they\'re done, until the empty message shows.',
      code: `import { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

type Order = { id: string; bowl: string; status: string };

const FIRST_ORDERS: Order[] = [
  { id: '42', bowl: 'Small pho, no onions', status: 'Cooking' },
  { id: '43', bowl: 'Large pho, extra noodles', status: 'Cooking' },
  { id: '44', bowl: 'Large pho, extra brisket', status: 'Cooking' },
];

function KitchenTicket({ order, onReady }: { order: Order; onReady: (id: string) => void }) {
  return (
    <View style={styles.ticket}>
      <Text style={styles.number}>#{order.id}</Text>
      <Text style={styles.bowl}>{order.bowl}</Text>
      <Pressable style={styles.ready} onPress={() => onReady(order.id)}>
        <Text style={styles.readyText}>Ready</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  const [orders, setOrders] = useState(FIRST_ORDERS);
  const cooking = orders.filter((o) => o.status === 'Cooking');

  function markReady(id: string) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: 'Ready' } : o)));
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Kitchen: {cooking.length} to cook</Text>
      <FlatList
        data={cooking}
        keyExtractor={(o) => o.id}
        renderItem={({ item }) => <KitchenTicket order={item} onReady={markReady} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={<Text style={styles.empty}>All caught up</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#1c1917' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fed7aa', marginBottom: 12 },
  ticket: { backgroundColor: '#fffbeb', borderRadius: 12, padding: 16, gap: 6 },
  number: { fontSize: 32, fontWeight: 'bold', color: '#1c1917' },
  bowl: { fontSize: 18, color: '#44403c' },
  ready: { backgroundColor: '#15803d', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 6 },
  readyText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  empty: { fontSize: 20, color: '#fed7aa' },
});
`,
      challenge: 'The kitchen is dark on purpose: it\'s easier to read at night under the truck\'s lights. Try a light background and compare.',
    },
  ],
  apply: {
    scenario: 'Building Ray\'s screen.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does KitchenTicket call onReady(order.id) instead of changing the orders itself?',
        options: [
          { text: 'A component can\'t use setState', why: 'It can. But it doesn\'t own the orders: App does.' },
          { text: 'App owns the list, so App decides what Ready means; the ticket just reports which one was tapped' },
          { text: 'Callbacks are faster', why: 'It\'s about who owns the data, not speed.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Finish KitchenTicket: show "#{id}" and a "Ready #{id}" button that calls onReady(order.id). Tapping "Ready #43" leaves only #42 cooking',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

type Order = { id: string; status: string };

function KitchenTicket({ order, onReady }: { order: Order; onReady: (id: string) => void }) {
  return (
    <View>

    </View>
  );
}

export default function App() {
  const [orders, setOrders] = useState<Order[]>([
    { id: '42', status: 'Cooking' },
    { id: '43', status: 'Cooking' },
  ]);
  const cooking = orders.filter((o) => o.status === 'Cooking');

  function markReady(id: string) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: 'Ready' } : o)));
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      <Text>{cooking.length} to cook</Text>
      {cooking.map((o) => <KitchenTicket key={o.id} order={o} onReady={markReady} />)}
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

type Order = { id: string; status: string };

function KitchenTicket({ order, onReady }: { order: Order; onReady: (id: string) => void }) {
  return (
    <View>
      <Text>#{order.id}</Text>
      <Pressable onPress={() => onReady(order.id)}>
        <Text>Ready #{order.id}</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  const [orders, setOrders] = useState<Order[]>([
    { id: '42', status: 'Cooking' },
    { id: '43', status: 'Cooking' },
  ]);
  const cooking = orders.filter((o) => o.status === 'Cooking');

  function markReady(id: string) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: 'Ready' } : o)));
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      <Text>{cooking.length} to cook</Text>
      {cooking.map((o) => <KitchenTicket key={o.id} order={o} onReady={markReady} />)}
    </View>
  );
}
`,
        hint: '<Text>#{order.id}</Text> and <Pressable onPress={() => onReady(order.id)}><Text>Ready #{order.id}</Text></Pressable>.',
        checks: [
          { message: 'Starts "2 to cook"', screen: { text: '2 to cook' } },
          { message: 'Ready #43 leaves 1', screen: { tap: ['Ready #43'], text: '1 to cook' } },
          { message: '#43\'s ticket is gone', screen: { tap: ['Ready #43'], noText: 'Ready #43' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to its job.',
        pairs: [
          ['(id: string) => void', 'The type of the onReady callback'],
          ['onReady(order.id)', 'Tells App which ticket was tapped'],
          ['data={cooking}', 'Only the orders still cooking'],
          ['ListEmptyComponent', '"All caught up"'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'Ray says the tickets vanish when he taps Ready. Did they get deleted?',
        options: [
          { text: 'Yes, sorry, I\'ll fix it.', why: 'Nothing was deleted. The Kitchen list only shows cooking orders.' },
          { text: 'They\'re hidden by a bug.', why: 'It\'s on purpose: Ray only needs what\'s still cooking.' },
          { text: 'No, they\'re still on the Board as Ready. The Kitchen only shows what\'s cooking, so they leave Ray\'s list.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The ticket\'s callback prop.',
        language: 'typescript',
        template: '{ order, onReady }: { order: Order; onReady: ([[1]]: string) => [[2]] }',
        blanks: [['id'], ['void']],
        distractors: ['order', 'string', 'null'],
      },
      {
        kind: 'writeCode',
        prompt: 'Show "All caught up" when nothing is cooking, using a FlatList with ListEmptyComponent',
        starter: `import { View, Text, FlatList } from 'react-native';

const ORDERS = [
  { id: '41', status: 'Ready' },
  { id: '42', status: 'Ready' },
];

export default function App() {
  const cooking = ORDERS.filter((o) => o.status === 'Cooking');
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>

    </View>
  );
}
`,
        solution: `import { View, Text, FlatList } from 'react-native';

const ORDERS = [
  { id: '41', status: 'Ready' },
  { id: '42', status: 'Ready' },
];

export default function App() {
  const cooking = ORDERS.filter((o) => o.status === 'Cooking');
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <FlatList
        data={cooking}
        keyExtractor={(o) => o.id}
        renderItem={({ item }) => <Text>#{item.id}</Text>}
        ListEmptyComponent={<Text>All caught up</Text>}
      />
    </View>
  );
}
`,
        hint: 'A FlatList with data={cooking}, keyExtractor, renderItem, and ListEmptyComponent={<Text>All caught up</Text>}.',
        checks: [
          { message: '"All caught up"', screen: { text: 'All caught up' } },
          { message: 'A FlatList', codeIncludes: '<FlatList' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Ray taps Ready on #44. Which id reaches markReady?',
        code: "<KitchenTicket order={{ id: '44', status: 'Cooking' }} onReady={markReady} />\n// inside: onPress={() => onReady(order.id)}",
        language: 'typescript',
        options: [
          { text: "'44'" },
          { text: 'undefined', why: 'order.id is passed along: \'44\'.' },
          { text: 'The whole order', why: 'Only order.id is passed.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Where does it belong?',
        groups: ['KitchenTicket', 'App'],
        items: [
          { text: 'The big green Ready button', group: 0 },
          { text: 'markReady', group: 1 },
          { text: 'The orders state', group: 1 },
          { text: 'The bowl description', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What TypeScript type means "a function that returns nothing"? (The part after =>.)',
        answers: ['void'],
        placeholder: 'type',
      },
      {
        kind: 'findBug',
        prompt: 'Tapping Ready on any ticket does nothing. Which line is the problem?',
        language: 'typescript',
        lines: ['function KitchenTicket({ order, onReady }: TicketProps) {', '  return (', '    <View>', '      <Text>#{order.id}</Text>', '      <Pressable onPress={() => onReady}>', '        <Text>Ready</Text>', '      </Pressable>'],
        bug: 4,
        fix: '      <Pressable onPress={() => onReady(order.id)}>',
        explanation: '() => onReady just mentions the function without calling it. Call it, with the id: onReady(order.id).',
      },
    ],
  },
  reflect: {
    prompt: 'Design a screen for the person who does the work behind your app (like Ray). What do they need, and what should be hidden from them?',
    starters: ['They need...', 'Hide...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Put the kitchen tickets on your phone and read them at arm\'s length in a dim room. Then in daylight. Adjust the sizes until both work.',
  },
  notes: 'Callback props carrying data upward; FlatList fed a derived (filtered) array.',
};

export default lesson;
