import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 20. Unit Challenge: v0.4 at the Thursday night market. The whole chapter in one build; cliffhanger into Chapter 5 (every order vanishes when the phone restarts). */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'v0.4: the board goes live',
  summary: 'Thursday night market, two days before the festival. The phone sits in a stand at the window, facing the line. Nobody has asked "Is my order ready?" in an hour. Build the version they\'re looking at.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a board with FlatList, a ready count, Ready buttons and a screen for each order', 'Navigate by id and come back'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday night market, 8:30 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Fairy lights, a brass band two trucks down, and a line of thirty. The phone in Mai\'s cardboard stand shows big green numbers.' },
        { speaker: 'linh', text: 'Forty minutes. Not one head through the window.' },
        { speaker: 'mai', text: 'A man just pointed at the board and said "that\'s me" to nobody. It\'s working.' },
        { speaker: 'tey', text: 'Build the v0.4 they\'re looking at.' },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: Pho Real v0.4.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build v0.4: a FlatList of orders (rows "#{id} {name}" that open the order), a header "{n} ready", a "Ready #{id}" button next to cooking orders, and an order screen showing "Order #{id}: {status}" with a "Back" button',
        starter: `import { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

type Order = { id: string; name: string; status: string };

const FIRST_ORDERS: Order[] = [
  { id: '41', name: 'Dana', status: 'Ready' },
  { id: '42', name: 'Sam', status: 'Cooking' },
  { id: '43', name: 'Priya', status: 'Cooking' },
];

export default function App() {
  const [orders, setOrders] = useState(FIRST_ORDERS);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <View style={styles.screen}>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12, backgroundColor: '#fff7ed' },
  header: { fontSize: 22, fontWeight: 'bold', color: '#15803d', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8 },
  rowText: { fontSize: 20 },
  ready: { backgroundColor: '#15803d', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
  readyText: { color: '#ffffff', fontWeight: 'bold' },
  big: { fontSize: 40, fontWeight: 'bold' },
  back: { fontSize: 18, color: '#9a3412', fontWeight: 'bold' },
});
`,
        solution: `import { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

type Order = { id: string; name: string; status: string };

const FIRST_ORDERS: Order[] = [
  { id: '41', name: 'Dana', status: 'Ready' },
  { id: '42', name: 'Sam', status: 'Cooking' },
  { id: '43', name: 'Priya', status: 'Cooking' },
];

export default function App() {
  const [orders, setOrders] = useState(FIRST_ORDERS);
  const [openId, setOpenId] = useState<string | null>(null);
  const ready = orders.filter((o) => o.status === 'Ready');
  const open = orders.find((o) => o.id === openId);

  function markReady(id: string) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: 'Ready' } : o)));
  }

  if (open) {
    return (
      <View style={styles.screen}>
        <Pressable onPress={() => setOpenId(null)}><Text style={styles.back}>Back</Text></Pressable>
        <Text style={styles.big}>Order #{open.id}: {open.status}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={orders}
        keyExtractor={(o) => o.id}
        ListHeaderComponent={<Text style={styles.header}>{ready.length} ready</Text>}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Pressable onPress={() => setOpenId(item.id)}>
              <Text style={styles.rowText}>#{item.id} {item.name}</Text>
            </Pressable>
            {item.status === 'Cooking' && (
              <Pressable style={styles.ready} onPress={() => markReady(item.id)}>
                <Text style={styles.readyText}>Ready #{item.id}</Text>
              </Pressable>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12, backgroundColor: '#fff7ed' },
  header: { fontSize: 22, fontWeight: 'bold', color: '#15803d', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8 },
  rowText: { fontSize: 20 },
  ready: { backgroundColor: '#15803d', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
  readyText: { color: '#ffffff', fontWeight: 'bold' },
  big: { fontSize: 40, fontWeight: 'bold' },
  back: { fontSize: 18, color: '#9a3412', fontWeight: 'bold' },
});
`,
        hint: 'Work out ready (filter) and open (find). Write markReady with map. Early-return the order screen when open is found. Otherwise a FlatList with ListHeaderComponent, and rows with two Pressables side by side.',
        checks: [
          { message: 'Header starts "1 ready"', screen: { text: '1 ready' } },
          { message: 'Ready #42 makes it "2 ready"', screen: { tap: ['Ready #42'], text: '2 ready' } },
          { message: 'Priya\'s row opens her order', screen: { tap: ['#43 Priya'], text: 'Order #43: Cooking' } },
          { message: 'The order screen shows the latest status', screen: { tap: ['Ready #43', '#43 Priya'], text: 'Order #43: Ready' } },
          { message: 'Back returns to the board', screen: { tap: ['#42 Sam', 'Back'], text: '#41 Dana' } },
          { message: 'A FlatList', codeIncludes: '<FlatList' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Back in lesson 1, what was the problem v0.4 had to solve?',
        options: [
          { text: 'The menu was hard to read', why: 'That was Chapter 2.' },
          { text: 'People couldn\'t choose extras', why: 'That was Chapter 3.' },
          { text: 'Forty people asking "Is my order ready?" while Ray tried to cook' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of v0.4 to the lesson behind it.',
        pairs: [
          ['A FlatList board', 'Forty orders and counting'],
          ['Ready buttons', 'Ray taps Ready'],
          ['Opening an order by its id', 'Tap your number'],
          ['No stale copies', 'Code review: one source of truth'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'At the market, Ray marks #43 Ready, but Priya\'s open order screen still says Cooking. Which line is the problem?',
        language: 'typescript',
        lines: ['const [orders, setOrders] = useState(FIRST_ORDERS);', "const ready = orders.filter((o) => o.status === 'Ready');", 'const [open, setOpen] = useState<Order | null>(null);', '// row: onPress={() => setOpen(item)}'],
        bug: 2,
        fix: 'const [openId, setOpenId] = useState<string | null>(null);',
        explanation: 'The open order is a copy taken at tap time. Store the id and find the order from the list every draw.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'Saturday is thirty thousand people. Will the board cope?',
        options: [
          { text: 'FlatList only draws what\'s on screen, so a long list is fine. What worries me is the phone itself.' },
          { text: 'No idea.', why: 'He does know: FlatList was built for long lists.' },
          { text: 'We\'ll only show ten orders all day.', why: 'Every order needs to be there.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Did v0.4 solve it, or is it still to come?',
        groups: ['Done in v0.4', 'Still to come'],
        items: [
          { text: 'Seeing every order and its status', group: 0 },
          { text: 'Orders surviving a phone restart', group: 1 },
          { text: 'A screen for each order', group: 0 },
          { text: 'A loading message while the app starts', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make the window numbers readable from the line: the ready number "41" in fontSize 64, bold, white (#ffffff) on dark green',
        starter: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text>41</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#14532d' },
});
`,
        solution: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.number}>41</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#14532d' },
  number: { fontSize: 64, fontWeight: 'bold', color: '#ffffff' },
});
`,
        hint: "Add number: { fontSize: 64, fontWeight: 'bold', color: '#ffffff' } and style={styles.number}.",
        checks: [
          { message: 'Big: at least 56', screen: { style: { of: '41', prop: 'fontSize', min: 56 } } },
          { message: 'White', screen: { style: { of: '41', prop: 'color', value: '#ffffff' } } },
          { message: 'Bold', screen: { style: { of: '41', prop: 'fontWeight', value: 'bold' } } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Lists in three words, from memory.',
        template: 'Add with [[1]], change with [[2]], remove with filter.',
        blanks: [['spread'], ['map']],
        distractors: ['push', 'sort', 'find'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which FlatList prop gives each item its key?',
        answers: ['keyExtractor'],
        placeholder: 'propName',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Chapter 4 in order.',
        lines: ['"Is my order ready?" forty times', 'Arrays, map and FlatList', 'Pills, filters and Ray\'s Ready button', 'Screens, ids and Expo Router', 'The board goes live'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'orders has #41 (Ready), #42 (Cooking), #43 (Ready). Ray marks #42 Ready. What does the header say?',
        code: "const ready = orders.filter((o) => o.status === 'Ready');\n<Text>{ready.length} ready</Text>",
        language: 'typescript',
        options: [
          { text: '2 ready', why: 'After #42 is marked, all three are Ready.' },
          { text: '3 ready' },
          { text: '42 ready', why: 'length counts orders; 42 is an id.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: '10:40 p.m. The phone buzzes, restarts for an update, and opens the app again. What does the board show?',
        options: [
          { text: 'Every order, just as before', why: 'State lives in memory. A restart wipes it.' },
          { text: 'Only the ready ones', why: 'Nothing survives the restart.' },
          { text: '"No orders yet." Forty-one orders, gone. Ray still has his paper tickets. Linh is very quiet.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Write your build log entry for v0.4: what you shipped, what broke, what you learned, and what scared you at the end.',
    starters: ['Shipped:...', 'Broke:...', 'Learned:...', 'What scared me:...'],
  },
  deepen: {
    title: 'Chapter 4 mission: the board in the wild',
    summary: 'Put your list app on your phone and use it for a real day: chores, a shopping list, homework. Then restart your phone. Next chapter, "Festival weekend": thirty thousand people, two days, and an app that forgets everything when the phone restarts. Theo has to make it remember.',
  },
  notes: 'Unit Challenge for Chapter 4 (v0.4). State lives in memory and is lost on restart (persistence is Chapter 5). Cliffhanger into Chapter 5 (effects, loading states, saving on the phone).',
};

export default lesson;
