import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 18. Before/After: Arjun's review; a stored copy of the open order and a separate ready list become an id plus derived values. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Code review: one source of truth',
  summary: 'Dana opened her order and stared at "Cooking" for ten minutes while her bowl sat on the counter. Ray had marked it Ready. Arjun finds the bug in two lines of Theo\'s code.',
  minutes: 12,
  outcomes: ['Spot copies of state that go stale', 'Store an id, not a copy', 'Keep one list as the single source of truth'],
  learn: [
    {
      kind: 'compare',
      title: 'Theo\'s board, before and after review',
      before: {
        label: 'Before: copies that drift',
        text: "const [orders, setOrders] = useState(FIRST_ORDERS);\nconst [readyOrders, setReadyOrders] = useState([]);\nconst [openOrder, setOpenOrder] = useState(null);\n\n// tapping a row\nonPress={() => setOpenOrder(order)}   // a copy of the order\n\n// Ray taps Ready\nsetOrders(orders.map(...));\nsetReadyOrders([...readyOrders, order]);",
      },
      after: {
        label: 'After: one list, everything else worked out',
        text: "const [orders, setOrders] = useState(FIRST_ORDERS);\nconst [openId, setOpenId] = useState<string | null>(null);\n\nconst ready = orders.filter((o) => o.status === 'Ready');\nconst open = orders.find((o) => o.id === openId);\n\n// tapping a row\nonPress={() => setOpenId(order.id)}\n\n// Ray taps Ready\nsetOrders(orders.map(...));",
      },
      notes: [
        'openOrder was a copy taken when Dana tapped. Ray changed the list, not her copy, so her screen said Cooking forever.',
        'Storing openId and finding the order every draw means the screen always shows the list\'s latest version.',
        'readyOrders was a second list that had to be kept in step by hand. Forget once (in Undo, say) and the board lies.',
        'ready is now calculated with filter, so it can\'t disagree with orders.',
        'Arjun\'s rule: one source of truth. The orders list is the only place an order lives. Everything else points at it (an id) or is worked out from it (filter, find, length).',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Watch a copy go stale',
      caption: 'Open #41 (copy) and tap "Ray: #41 Ready". The copy still says Cooking. Now try the id version below it.',
      code: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([{ id: '41', name: 'Dana', status: 'Cooking' }]);
  const [copy, setCopy] = useState<{ id: string; status: string } | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const live = orders.find((o) => o.id === openId);

  return (
    <View style={styles.screen}>
      <Pressable style={styles.button} onPress={() => setCopy(orders[0])}><Text style={styles.label}>Open #41 (copy)</Text></Pressable>
      <Pressable style={styles.button} onPress={() => setOpenId('41')}><Text style={styles.label}>Open #41 (by id)</Text></Pressable>
      <Pressable style={styles.ray} onPress={() => setOrders(orders.map((o) => ({ ...o, status: 'Ready' })))}>
        <Text style={styles.label}>Ray: #41 Ready</Text>
      </Pressable>
      <Text style={styles.line}>Copy says: {copy ? copy.status : '-'}</Text>
      <Text style={styles.line}>By id says: {live ? live.status : '-'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 10, backgroundColor: '#fff7ed' },
  button: { backgroundColor: '#9a3412', padding: 14, borderRadius: 12 },
  ray: { backgroundColor: '#15803d', padding: 14, borderRadius: 12 },
  label: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  line: { fontSize: 20 },
});
`,
      challenge: 'Tap both Open buttons, then Ray. Which line is right?',
    },
  ],
  apply: {
    scenario: 'Reviewing the board.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Dana\'s screen say Cooking after Ray marked her order Ready?',
        options: [
          { text: 'Her screen showed a copy taken when she tapped, and Ray changed the list, not the copy' },
          { text: 'Ray tapped the wrong order', why: 'He tapped the right one. The list was right; her copy wasn\'t.' },
          { text: 'Her phone was offline', why: 'Same phone, same app. The copy was the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Replace the copy with an id: store openId, find the order, so after "Ray: Ready" the screen shows "Status: Ready"',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

type Order = { id: string; status: string };

export default function App() {
  const [orders, setOrders] = useState<Order[]>([{ id: '41', status: 'Cooking' }]);
  const [open, setOpen] = useState<Order | null>(null);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      <Pressable onPress={() => setOpen(orders[0])}><Text>Open #41</Text></Pressable>
      <Pressable onPress={() => setOrders(orders.map((o) => ({ ...o, status: 'Ready' })))}><Text>Ray: Ready</Text></Pressable>
      {open && <Text>Status: {open.status}</Text>}
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

type Order = { id: string; status: string };

export default function App() {
  const [orders, setOrders] = useState<Order[]>([{ id: '41', status: 'Cooking' }]);
  const [openId, setOpenId] = useState<string | null>(null);
  const open = orders.find((o) => o.id === openId);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      <Pressable onPress={() => setOpenId('41')}><Text>Open #41</Text></Pressable>
      <Pressable onPress={() => setOrders(orders.map((o) => ({ ...o, status: 'Ready' })))}><Text>Ray: Ready</Text></Pressable>
      {open && <Text>Status: {open.status}</Text>}
    </View>
  );
}
`,
        hint: "Swap the open state for const [openId, setOpenId] = useState<string | null>(null); const open = orders.find((o) => o.id === openId); and setOpenId('41') on the button.",
        checks: [
          { message: 'Opens as Cooking', screen: { tap: ['Open #41'], text: 'Status: Cooking' } },
          { message: 'Shows Ready after Ray taps', screen: { tap: ['Open #41', 'Ray: Ready'], text: 'Status: Ready' } },
          { message: 'Finds by id', codeIncludes: '.find(' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Store it, or work it out?',
        groups: ['Store in state', 'Work it out'],
        items: [
          { text: 'The list of orders', group: 0 },
          { text: 'The ready orders', group: 1 },
          { text: 'Which order is open (its id)', group: 0 },
          { text: 'The open order itself', group: 1 },
          { text: 'How many are cooking', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'Where does an order live in your app now?',
        options: [
          { text: 'In orders, readyOrders and openOrder.', why: 'Three places is the bug.' },
          { text: 'Only in the orders list. Everything else is an id pointing at it, or worked out from it.' },
          { text: 'On Ray\'s ticket.', why: 'Paper is the past. The list is the source of truth.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Point at the order, don\'t copy it.',
        language: 'typescript',
        template: 'onPress={() => setOpenId(order.[[1]])}\nconst open = orders.[[2]]((o) => o.id === openId);',
        blanks: [['id'], ['find']],
        distractors: ['status', 'filter', 'copy'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Ray marks #41 Ready, but nobody calls setReadyOrders. What does the ready count show?',
        code: "const [readyOrders, setReadyOrders] = useState([]);\n// Ray: setOrders(orders.map(... status: 'Ready' ...))\n<Text>{readyOrders.length} ready</Text>",
        language: 'typescript',
        options: [
          { text: '1 ready', why: 'readyOrders was never updated: it\'s a separate list.' },
          { text: 'It crashes', why: 'It just shows the stale number.' },
          { text: '0 ready' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the stale copy to its fix.',
        pairs: [
          ['openOrder copy', 'openId + find'],
          ['readyOrders list', 'filter on orders'],
          ['orderCount number', 'orders.length'],
          ['canOrder boolean (Chapter 3)', 'Worked out from the name'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Arjun\'s rule: one source of ____. (One word.)',
        answers: ['truth'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Which question finds this kind of bug in code review?',
        options: [
          { text: '"Is this variable named well?"', why: 'Good question, different bug.' },
          { text: '"Is the same information kept in two places?"' },
          { text: '"Is this file too long?"', why: 'Also good, but it won\'t find stale copies.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'The kitchen shows an order as Cooking after it\'s been marked Ready. Which line causes it?',
        language: 'typescript',
        lines: ['const [orders, setOrders] = useState(FIRST_ORDERS);', "const ready = orders.filter((o) => o.status === 'Ready');", "const [cooking] = useState(orders.filter((o) => o.status === 'Cooking'));", '<FlatList data={cooking} ... />'],
        bug: 2,
        fix: "const cooking = orders.filter((o) => o.status === 'Cooking');",
        explanation: 'useState only uses its starting value once. cooking was frozen at the start. Work it out every draw instead.',
      },
    ],
  },
  reflect: {
    prompt: 'Find one place in your own code where the same information is kept twice. Which one should be the source of truth?',
    starters: ['Kept twice:...', 'Source of truth:...'],
  },
  deepen: {
    title: 'Read the docs',
    summary: 'React\'s "Choosing the State Structure" page has a section called "Avoid duplication in state" with almost exactly Dana\'s bug (a selected item copied into state). Read it.',
  },
  notes: 'React docs: "Choosing the State Structure" (avoid duplication: store selectedId, not the selected item; avoid redundant state).',
};

export default lesson;
