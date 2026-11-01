import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 17. Tap to explore: Ray's paper ticket, which becomes an OrderSummary component. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Ray\'s ticket',
  summary: 'Linh said: "Show me what Ray would see." Ray hands Theo one of his paper tickets, grease-stained, with his own shorthand. Tap through it, then build the screen version.',
  minutes: 12,
  outcomes: ['Turn a real paper ticket into a screen', 'Build an OrderSummary component that takes the whole order as one prop', 'Show only the lines that matter'],
  learn: [
    {
      kind: 'explore',
      title: 'Ray\'s paper ticket',
      text: 'TICKET #38. DANA. 2 x LG PHO. + BRISKET. NO ONION. NOTE: broth on side. Subtotal $33.00. Tax $2.72. TOTAL $35.72. Ray\'s rules, written on the back: Name big. Size and count first. Only say extras that are ON. Notes in capitals so I can\'t miss them. Total at the bottom, for Linh.',
      hotspots: [
        { phrase: 'TICKET #38', note: 'An order number, so Ray can shout it. It comes later, when the order is placed (lesson 19).' },
        { phrase: 'DANA', note: 'From the name box. Ray wants it big: fontSize 28.' },
        { phrase: '2 x LG PHO', note: 'order.qty and order.size together, first, because that\'s what Ray cooks first.' },
        { phrase: '+ BRISKET', note: 'Shown only because brisket is on: {order.brisket && <Text>+ Brisket</Text>}.' },
        { phrase: 'NO ONION', note: 'Also a "show only when true" line. If onions are fine, Ray doesn\'t want to read "with onions".' },
        { phrase: 'NOTE: broth on side', note: 'Only when there\'s a note. Empty notes shouldn\'t print an empty "NOTE:".' },
        { phrase: 'Only say extras that are ON', note: 'The rule behind every && in the summary.' },
        { phrase: 'Total at the bottom, for Linh', note: 'Derived from the order, never stored. Linh checks it against the till.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Ray\'s ticket on a screen',
      caption: 'OrderSummary takes the whole order as one prop. Change brisket to false in App, or clear the notes, and watch the lines disappear.',
      code: `import { View, Text, StyleSheet } from 'react-native';

type Order = { name: string; size: string; qty: number; brisket: boolean; noOnions: boolean; notes: string };

function OrderSummary({ order }: { order: Order }) {
  const base = order.size === 'Large' ? 13.5 : 11.5;
  const subtotal = (base + (order.brisket ? 3 : 0)) * order.qty;
  const total = subtotal * 1.0825;

  return (
    <View style={styles.ticket}>
      <Text style={styles.name}>{order.name}</Text>
      <Text style={styles.line}>{order.qty} x {order.size} pho</Text>
      {order.brisket && <Text style={styles.line}>+ Brisket</Text>}
      {order.noOnions && <Text style={styles.line}>No onions</Text>}
      {order.notes !== '' && <Text style={styles.note}>NOTE: {order.notes.toUpperCase()}</Text>}
      <Text style={styles.total}>Total \${total.toFixed(2)}</Text>
    </View>
  );
}

export default function App() {
  const order = { name: 'Dana', size: 'Large', qty: 2, brisket: true, noOnions: true, notes: 'broth on side' };
  return (
    <View style={styles.screen}>
      <OrderSummary order={order} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#fff7ed' },
  ticket: { backgroundColor: '#ffffff', borderRadius: 16, padding: 20, gap: 6 },
  name: { fontSize: 28, fontWeight: 'bold', color: '#1c1917' },
  line: { fontSize: 18, color: '#1c1917' },
  note: { fontSize: 16, fontWeight: 'bold', color: '#9a3412' },
  total: { fontSize: 22, fontWeight: 'bold', color: '#9a3412', marginTop: 8 },
});
`,
      challenge: 'Set qty to 1 and brisket to false. Does the total come to $14.61? (13.50 plus 8.25% tax.)',
    },
  ],
  apply: {
    scenario: 'From paper to screen.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Ray\'s rules: always on the ticket, or only sometimes?',
        groups: ['Always', 'Only when it applies'],
        items: [
          { text: 'The name', group: 0 },
          { text: '+ Brisket', group: 1 },
          { text: 'Size and count', group: 0 },
          { text: 'NOTE: ...', group: 1 },
          { text: 'The total', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Build OrderSummary({ order }): show the name, "{qty} x {size}", and "+ Brisket" only when brisket is on. App passes Dana\'s order',
        starter: `import { View, Text } from 'react-native';

type Order = { name: string; size: string; qty: number; brisket: boolean };

function OrderSummary({ order }: { order: Order }) {
  return (
    <View>

    </View>
  );
}

export default function App() {
  const order = { name: 'Dana', size: 'Large', qty: 2, brisket: true };
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <OrderSummary order={order} />
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

type Order = { name: string; size: string; qty: number; brisket: boolean };

function OrderSummary({ order }: { order: Order }) {
  return (
    <View>
      <Text>{order.name}</Text>
      <Text>{order.qty} x {order.size}</Text>
      {order.brisket && <Text>+ Brisket</Text>}
    </View>
  );
}

export default function App() {
  const order = { name: 'Dana', size: 'Large', qty: 2, brisket: true };
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <OrderSummary order={order} />
    </View>
  );
}
`,
        hint: 'Inside the View: <Text>{order.name}</Text>, <Text>{order.qty} x {order.size}</Text> and {order.brisket && <Text>+ Brisket</Text>}.',
        checks: [
          { message: 'Dana\'s name', screen: { text: 'Dana' } },
          { message: '"2 x Large"', screen: { text: '2 x Large' } },
          { message: 'Brisket shows', screen: { text: '+ Brisket' } },
          { message: 'Only when brisket is on', codeIncludes: 'order.brisket &&' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does OrderSummary take the whole order as one prop?',
        options: [
          { text: 'Props can only hold objects', why: 'Props can be strings, numbers, functions, anything.' },
          { text: 'It\'s faster to draw', why: 'Same speed. It\'s about keeping the order together.' },
          { text: 'The ticket needs every field, and one order prop keeps the call short and in one piece' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'Ray wants to know why the ticket says "NOTE:" with nothing after it.',
        options: [
          { text: 'It\'s a feature.', why: 'An empty note line is noise during the rush.' },
          { text: 'Just ignore it.', why: 'Ray\'s rule: only say things that are there.' },
          { text: 'My mistake. I\'ll only show the note line when there\'s actually a note: order.notes !== \'\' && ...' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Show "NOTE: " plus the notes in capitals, only when notes isn\'t empty. Dana\'s note shows "NOTE: BROTH ON SIDE"',
        starter: `import { View, Text } from 'react-native';

function NoteLine({ notes }: { notes: string }) {
  return (
    <View>

    </View>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <NoteLine notes="broth on side" />
      <NoteLine notes="" />
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

function NoteLine({ notes }: { notes: string }) {
  return (
    <View>
      {notes !== '' && <Text>NOTE: {notes.toUpperCase()}</Text>}
    </View>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <NoteLine notes="broth on side" />
      <NoteLine notes="" />
    </View>
  );
}
`,
        hint: "{notes !== '' && <Text>NOTE: {notes.toUpperCase()}</Text>}",
        checks: [
          { message: 'Dana\'s note in capitals', screen: { text: 'NOTE: BROTH ON SIDE' } },
          { message: 'Only when there\'s a note', codeIncludes: "notes !== ''" },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Ray\'s shorthand to the code.',
        pairs: [
          ['DANA', '{order.name}'],
          ['2 x LG', '{order.qty} x {order.size}'],
          ['+ BRISKET', '{order.brisket && ...}'],
          ['broth on side, in capitals', 'notes.toUpperCase()'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does "two limes".toUpperCase() give?',
        answers: ['TWO LIMES', '"TWO LIMES"'],
        placeholder: 'Result',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'order.noOnions is false. What does this line show?',
        code: '{order.noOnions && <Text>No onions</Text>}',
        language: 'typescript',
        options: [
          { text: 'Nothing' },
          { text: '"No onions"', why: 'noOnions is false, so the line is skipped.' },
          { text: '"false"', why: 'React Native draws nothing for false.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Pass the order down.',
        language: 'typescript',
        template: '<OrderSummary [[1]]={[[2]]} />',
        blanks: [['order'], ['order']],
        distractors: ['props', 'setOrder', 'ticket'],
      },
      {
        kind: 'findBug',
        prompt: 'The ticket shows a blank where the name should be. Which line is the problem?',
        language: 'typescript',
        lines: ['function OrderSummary(order: Order) {', '  return (', '    <Text>{order.name}</Text>', '  );', '}'],
        bug: 0,
        fix: 'function OrderSummary({ order }: { order: Order }) {',
        explanation: 'Props arrive as one object. Without the braces, "order" is the whole props object, and order.name is undefined. Unpack it: ({ order }).',
      },
    ],
  },
  reflect: {
    prompt: 'Find a real paper form, receipt or ticket near you. Which lines are always there, and which only sometimes?',
    starters: ['Always:...', 'Only sometimes:...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Ask someone who works in a kitchen, shop or office what they need to see first on a ticket. Rearrange your OrderSummary to match.',
  },
  notes: 'Fictional ticket. 2 x Large + brisket = (13.50 + 3.00) x 2 = 33.00; tax 2.72; total 35.72. 13.50 x 1.0825 = 14.61375 → $14.61. String.toUpperCase().',
};

export default lesson;
