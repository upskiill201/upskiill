import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Before/After: a plain text row becomes an OrderRow with a coloured status pill. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Cooking or ready?',
  summary: 'The list shows every order, but "Cooking" and "Ready" look the same. From six feet away, in the sun, nobody can tell. Compare Theo\'s plain row with the row after Mai\'s squint test.',
  minutes: 12,
  outcomes: ['Make a row component for one list item', 'Show a status as a coloured pill', 'Pick colours from the status with a conditional style'],
  learn: [
    {
      kind: 'compare',
      title: 'One order row',
      before: {
        label: 'Before: everything is the same grey text',
        text: "renderItem={({ item }) => (\n  <Text>#{item.id} {item.name}: {item.status}</Text>\n)}",
      },
      after: {
        label: 'After: a row component with a status pill',
        text: "function OrderRow({ order }: { order: Order }) {\n  const ready = order.status === 'Ready';\n  return (\n    <View style={styles.row}>\n      <Text style={styles.number}>#{order.id}</Text>\n      <Text style={styles.name}>{order.name}</Text>\n      <View style={[styles.pill, ready ? styles.pillReady : styles.pillCooking]}>\n        <Text style={styles.pillText}>{order.status}</Text>\n      </View>\n    </View>\n  );\n}\n\nrenderItem={({ item }) => <OrderRow order={item} />}",
      },
      notes: [
        'The number is big and first: it\'s what people match against their confirmation.',
        'The status sits in a pill: a small rounded box with its own colour. Green for Ready, amber for Cooking.',
        'ready ? styles.pillReady : styles.pillCooking picks one style or the other. Same idea as the size chips.',
        'Colour isn\'t the only signal: the pill still says "Ready" in words, for people who can\'t tell green from amber.',
        'OrderRow takes the whole order as one prop, like OrderSummary did. renderItem just hands it over.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Rows with pills',
      caption: 'Ready orders get a green pill, cooking ones amber. Change Sam\'s status to \'Ready\' in ORDERS.',
      code: `import { View, Text, FlatList, StyleSheet } from 'react-native';

type Order = { id: string; name: string; status: string };

const ORDERS: Order[] = [
  { id: '41', name: 'Dana', status: 'Ready' },
  { id: '42', name: 'Sam', status: 'Cooking' },
  { id: '43', name: 'Priya', status: 'Cooking' },
];

function OrderRow({ order }: { order: Order }) {
  const ready = order.status === 'Ready';
  return (
    <View style={styles.row}>
      <Text style={styles.number}>#{order.id}</Text>
      <Text style={styles.name}>{order.name}</Text>
      <View style={[styles.pill, ready ? styles.pillReady : styles.pillCooking]}>
        <Text style={styles.pillText}>{order.status}</Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.screen}>
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderRow order={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#fff7ed' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, backgroundColor: '#ffffff', borderRadius: 16 },
  number: { fontSize: 24, fontWeight: 'bold', color: '#1c1917' },
  name: { flex: 1, fontSize: 18, color: '#44403c' },
  pill: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 999 },
  pillReady: { backgroundColor: '#15803d' },
  pillCooking: { backgroundColor: '#b45309' },
  pillText: { color: '#ffffff', fontWeight: 'bold', fontSize: 14 },
});
`,
      challenge: 'Add a third status, \'Collected\', with a grey pill (#a8a29e). You\'ll need a little more than one ternary.',
    },
  ],
  apply: {
    scenario: 'Rows people can read from six feet away.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does the pill still say "Ready" in words, as well as being green?',
        options: [
          { text: 'Some people can\'t tell green from amber; words work for everyone' },
          { text: 'Green pills are illegal without text', why: 'No law. It\'s about people who can\'t see the colour difference.' },
          { text: 'To fill the space', why: 'The words carry the meaning for people who can\'t rely on colour.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Give the status a pill: a View around the status Text, green (#15803d) when Ready, amber (#b45309) when Cooking',
        starter: `import { View, Text } from 'react-native';

type Order = { id: string; name: string; status: string };

function OrderRow({ order }: { order: Order }) {
  return (
    <View style={{ flexDirection: 'row', gap: 12, padding: 12, backgroundColor: '#ffffff' }}>
      <Text>#{order.id} {order.name}</Text>
      <Text>{order.status}</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      <OrderRow order={{ id: '41', name: 'Dana', status: 'Ready' }} />
      <OrderRow order={{ id: '42', name: 'Sam', status: 'Cooking' }} />
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

type Order = { id: string; name: string; status: string };

function OrderRow({ order }: { order: Order }) {
  const ready = order.status === 'Ready';
  return (
    <View style={{ flexDirection: 'row', gap: 12, padding: 12, backgroundColor: '#ffffff' }}>
      <Text>#{order.id} {order.name}</Text>
      <View style={{ borderRadius: 999, paddingHorizontal: 12, backgroundColor: ready ? '#15803d' : '#b45309' }}>
        <Text style={{ color: '#ffffff' }}>{order.status}</Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      <OrderRow order={{ id: '41', name: 'Dana', status: 'Ready' }} />
      <OrderRow order={{ id: '42', name: 'Sam', status: 'Cooking' }} />
    </View>
  );
}
`,
        hint: "const ready = order.status === 'Ready'; then wrap the status Text in <View style={{ borderRadius: 999, backgroundColor: ready ? '#15803d' : '#b45309' }}>.",
        checks: [
          { message: 'Ready is green', screen: { style: { of: 'Ready', prop: 'backgroundColor', value: '#15803d' } } },
          { message: 'Cooking is amber', screen: { style: { of: 'Cooking', prop: 'backgroundColor', value: '#b45309' } } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the row to its reason.',
        pairs: [
          ['Big number first', 'People match it to their confirmation'],
          ['Green pill', 'Ready, at a glance'],
          ['The word "Ready"', 'Works without colour'],
          ['OrderRow component', 'One row design for every order'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'Make Ready flash on and off! People will notice.',
        options: [
          { text: 'Great, every half second.', why: 'Flashing is tiring to look at, and can trigger seizures for some people.' },
          { text: 'Let\'s make everything flash.', why: 'Then nothing stands out.' },
          { text: 'Flashing is hard to read and can be unsafe for some people. A steady green pill and a big number is enough.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Pick the pill style.',
        language: 'typescript',
        template: 'style={[styles.pill, ready [[1]] styles.pillReady [[2]] styles.pillCooking]}',
        blanks: [['?'], [':']],
        distractors: ['&&', '||', ';'],
      },
      {
        kind: 'writeCode',
        prompt: 'Use OrderRow in the FlatList: renderItem={({ item }) => <OrderRow order={item} />}',
        starter: `import { View, Text, FlatList } from 'react-native';

type Order = { id: string; name: string };

function OrderRow({ order }: { order: Order }) {
  return <Text>Order #{order.id} for {order.name}</Text>;
}

const ORDERS: Order[] = [{ id: '41', name: 'Dana' }, { id: '42', name: 'Sam' }];

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
`,
        solution: `import { View, Text, FlatList } from 'react-native';

type Order = { id: string; name: string };

function OrderRow({ order }: { order: Order }) {
  return <Text>Order #{order.id} for {order.name}</Text>;
}

const ORDERS: Order[] = [{ id: '41', name: 'Dana' }, { id: '42', name: 'Sam' }];

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderRow order={item} />}
      />
    </View>
  );
}
`,
        hint: 'Replace the Text in renderItem with <OrderRow order={item} />.',
        checks: [
          { message: '"Order #41 for Dana"', screen: { text: 'Order #41 for Dana' } },
          { message: '"Order #42 for Sam"', screen: { text: 'Order #42 for Sam' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'order.status is \'Cooking\'. Which colour is the pill?',
        code: "const ready = order.status === 'Ready';\nbackgroundColor: ready ? '#15803d' : '#b45309'",
        language: 'typescript',
        options: [
          { text: 'Green (#15803d)', why: 'ready is false, so the second colour is used.' },
          { text: 'Amber (#b45309)' },
          { text: 'No colour', why: 'The ternary always picks one.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Inside OrderRow, or in the FlatList?',
        groups: ['OrderRow', 'FlatList'],
        items: [
          { text: 'The pill colour', group: 0 },
          { text: 'Which array to show', group: 1 },
          { text: 'The big order number', group: 0 },
          { text: 'keyExtractor', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What borderRadius turns a box into a pill, whatever its size?',
        answers: ['999', '9999'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Every pill is amber, even Dana\'s ready order. Which line is wrong?',
        language: 'typescript',
        lines: ["const ready = order.status === 'ready';", '<View style={[styles.pill, ready ? styles.pillReady : styles.pillCooking]}>', '  <Text>{order.status}</Text>', '</View>'],
        bug: 0,
        fix: "const ready = order.status === 'Ready';",
        explanation: 'Text comparisons are exact, capitals included. The status is \'Ready\', so \'ready\' never matches.',
      },
    ],
  },
  reflect: {
    prompt: 'What statuses do items in your own app have? Pick a colour and a word for each.',
    starters: ['Status 1:...', 'Status 2:...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Put the list on your phone, set it on a table and step back six feet. Can you tell which orders are ready? If not, make the pills bigger.',
  },
  notes: 'Status pill with conditional style. Colour not the only means of conveying information (WCAG 1.4.1 Use of Color). Avoid flashing content (WCAG 2.3.1).',
};

export default lesson;
