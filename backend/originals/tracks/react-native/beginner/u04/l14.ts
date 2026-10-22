import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 14. Story with a choice: two kinds of people, two views; a bottom tab bar (Board / Kitchen) sharing one list. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Two people, two screens',
  summary: 'Customers want big numbers. Ray wants only what\'s still cooking, with big Ready buttons. One screen can\'t be both. Linh: "And don\'t you dare make two apps."',
  minutes: 13,
  outcomes: ['Give different people different views of the same data', 'Build a bottom tab bar with state', 'Keep one list that both tabs read'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 6 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Ray is scrolling past six ready orders to find the one cooking order he needs to mark.' },
        { speaker: 'linh', text: 'He\'s reading the customers\' board. It\'s not made for him.' },
        { speaker: 'mai', text: 'And customers keep tapping the Ready buttons. I saw a kid do it twice.' },
        { speaker: 'tey', text: 'Same orders, two jobs. What should Theo build?' },
      ],
      choice: {
        prompt: 'What should Theo build?',
        options: [
          { text: 'Two separate apps, one for Ray and one for customers.', outcome: 'Two apps means two lists of orders that have to stay in sync. Linh has already said no, and she\'s right.' },
          { text: 'Two tabs in one app: Board for customers, Kitchen for Ray. Both read the same orders.', outcome: 'Yes. One list in state, two views of it. Ray marks Ready in Kitchen and the Board updates instantly, because it\'s the same list.', best: true },
          { text: 'Hide the Ready buttons behind a long press.', outcome: 'The kid will find it. And Ray still has to scroll past every ready order.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Board and Kitchen tabs',
      caption: 'Switch to Kitchen and tap Ready. Switch back to Board: the order moved to the top, because both tabs share one list.',
      code: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const FIRST_ORDERS = [
  { id: '41', status: 'Ready' },
  { id: '42', status: 'Cooking' },
  { id: '43', status: 'Cooking' },
];

export default function App() {
  const [orders, setOrders] = useState(FIRST_ORDERS);
  const [tab, setTab] = useState('board');
  const ready = orders.filter((o) => o.status === 'Ready');
  const cooking = orders.filter((o) => o.status === 'Cooking');

  function markReady(id: string) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: 'Ready' } : o)));
  }

  return (
    <View style={styles.app}>
      <View style={styles.body}>
        {tab === 'board' ? (
          <View style={styles.gap}>
            <Text style={styles.title}>Ready to collect</Text>
            {ready.map((o) => <Text key={o.id} style={styles.bigNumber}>#{o.id}</Text>)}
          </View>
        ) : (
          <View style={styles.gap}>
            <Text style={styles.title}>Kitchen: {cooking.length} cooking</Text>
            {cooking.map((o) => (
              <Pressable key={o.id} style={styles.readyButton} onPress={() => markReady(o.id)}>
                <Text style={styles.readyText}>#{o.id} Ready</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
      <View style={styles.tabs}>
        <Pressable style={[styles.tab, tab === 'board' && styles.tabOn]} onPress={() => setTab('board')}>
          <Text style={styles.tabText}>Board</Text>
        </Pressable>
        <Pressable style={[styles.tab, tab === 'kitchen' && styles.tabOn]} onPress={() => setTab('kitchen')}>
          <Text style={styles.tabText}>Kitchen</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: '#fff7ed' },
  body: { flex: 1, padding: 24, paddingTop: 64 },
  gap: { gap: 12 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#9a3412' },
  bigNumber: { fontSize: 48, fontWeight: 'bold', color: '#15803d' },
  readyButton: { backgroundColor: '#15803d', paddingVertical: 18, borderRadius: 14, alignItems: 'center' },
  readyText: { color: '#ffffff', fontSize: 22, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#fed7aa', backgroundColor: '#ffffff' },
  tab: { flex: 1, paddingVertical: 16, alignItems: 'center' },
  tabOn: { backgroundColor: '#ffedd5' },
  tabText: { fontSize: 16, fontWeight: 'bold', color: '#9a3412' },
});
`,
      challenge: 'Add a count to the tab label: "Kitchen (2)". It should change when Ray marks an order Ready.',
    },
  ],
  apply: {
    scenario: 'Board and Kitchen.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does the Board update the moment Ray taps Ready in Kitchen?',
        options: [
          { text: 'The tabs send each other messages', why: 'No messages needed: there\'s only one list.' },
          { text: 'The phone refreshes every second', why: 'Nothing refreshes on a timer. State changed, so React redrew.' },
          { text: 'Both tabs read the same orders state, and markReady changes it' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a tab bar with "Board" and "Kitchen". Board shows "Customer board", Kitchen shows "Ray\'s kitchen"',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [tab, setTab] = useState('board');

  return (
    <View style={{ flex: 1, paddingTop: 64 }}>
      <View style={{ flex: 1, padding: 24 }}>

      </View>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [tab, setTab] = useState('board');

  return (
    <View style={{ flex: 1, paddingTop: 64 }}>
      <View style={{ flex: 1, padding: 24 }}>
        {tab === 'board' ? <Text>Customer board</Text> : <Text>Ray's kitchen</Text>}
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Pressable style={{ flex: 1, padding: 16 }} onPress={() => setTab('board')}><Text>Board</Text></Pressable>
        <Pressable style={{ flex: 1, padding: 16 }} onPress={() => setTab('kitchen')}><Text>Kitchen</Text></Pressable>
      </View>
    </View>
  );
}
`,
        hint: "{tab === 'board' ? <Text>Customer board</Text> : <Text>Ray's kitchen</Text>} and a row of two Pressables calling setTab.",
        checks: [
          { message: 'Starts on the board', screen: { text: 'Customer board' } },
          { message: 'Kitchen tab works', screen: { tap: ['Kitchen'], text: "Ray's kitchen" } },
          { message: 'And back to Board', screen: { tap: ['Kitchen', 'Board'], text: 'Customer board' } },
          { message: 'Tabs side by side', screen: { style: { of: 'Kitchen', prop: 'flexDirection', value: 'row' } } },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'So if Ray marks it on his phone, will customers see it on theirs?',
        options: [
          { text: 'Not yet. Both tabs share one list on one phone. Getting it onto everyone\'s phone needs a server, and that\'s coming later.' },
          { text: 'Yes, it\'s instant everywhere.', why: 'State lives on one phone. Sharing needs a server (Film 2).' },
          { text: 'Only if they\'re on Wi-Fi.', why: 'Wi-Fi isn\'t the issue. There\'s no server yet.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tab to what it shows.',
        pairs: [
          ['Board', 'Big ready numbers, nothing to tap'],
          ['Kitchen', 'Only cooking orders, big Ready buttons'],
          ['The tab bar', 'Switches the view'],
          ['orders state', 'Shared by both'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Highlight the active tab.',
        language: 'typescript',
        template: "style={[styles.tab, tab === 'kitchen' [[1]] styles.[[2]]]}",
        blanks: [['&&'], ['tabOn']],
        distractors: ['||', 'tab', '?'],
      },
      {
        kind: 'writeCode',
        prompt: 'Highlight the active tab: give it backgroundColor #ffedd5. On start, "Board" is highlighted',
        starter: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [tab, setTab] = useState('board');

  return (
    <View style={{ flex: 1, paddingTop: 64, justifyContent: 'flex-end' }}>
      <View style={{ flexDirection: 'row' }}>
        <Pressable style={styles.tab} onPress={() => setTab('board')}><Text>Board</Text></Pressable>
        <Pressable style={styles.tab} onPress={() => setTab('kitchen')}><Text>Kitchen</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: { flex: 1, padding: 16, alignItems: 'center' },
  tabOn: { backgroundColor: '#ffedd5' },
});
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [tab, setTab] = useState('board');

  return (
    <View style={{ flex: 1, paddingTop: 64, justifyContent: 'flex-end' }}>
      <View style={{ flexDirection: 'row' }}>
        <Pressable style={[styles.tab, tab === 'board' && styles.tabOn]} onPress={() => setTab('board')}><Text>Board</Text></Pressable>
        <Pressable style={[styles.tab, tab === 'kitchen' && styles.tabOn]} onPress={() => setTab('kitchen')}><Text>Kitchen</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: { flex: 1, padding: 16, alignItems: 'center' },
  tabOn: { backgroundColor: '#ffedd5' },
});
`,
        hint: "style={[styles.tab, tab === 'board' && styles.tabOn]} on Board, and the same with 'kitchen' on Kitchen.",
        checks: [
          { message: 'Board starts highlighted', screen: { style: { of: 'Board', prop: 'backgroundColor', value: '#ffedd5' } } },
          { message: 'Kitchen highlights when tapped', screen: { tap: ['Kitchen'], style: { of: 'Kitchen', prop: 'backgroundColor', value: '#ffedd5' } } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'tab is \'kitchen\'. Which text shows?',
        code: "{tab === 'board' ? <Text>Customer board</Text> : <Text>Ray's kitchen</Text>}",
        language: 'typescript',
        options: [
          { text: '"Ray\'s kitchen"' },
          { text: '"Customer board"', why: 'tab isn\'t \'board\', so the second one shows.' },
          { text: 'Both', why: 'A ternary shows exactly one.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tab should have it?',
        groups: ['Board (customers)', 'Kitchen (Ray)'],
        items: [
          { text: 'Big ready numbers', group: 0 },
          { text: 'Ready buttons', group: 1 },
          { text: '"Collect at the window"', group: 0 },
          { text: 'How many are still cooking', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Expo Router, what is the folder name for a group of tab screens? (In brackets.)',
        answers: ['(tabs)', 'tabs', 'app/(tabs)'],
        placeholder: '(...)',
      },
      {
        kind: 'findBug',
        prompt: 'Ray marks an order Ready in Kitchen, but the Board never changes. Which line is the problem?',
        language: 'typescript',
        lines: ['const [orders, setOrders] = useState(FIRST_ORDERS);', "const [tab, setTab] = useState('board');", '<Board orders={FIRST_ORDERS} />', '<Kitchen orders={orders} onReady={markReady} />'],
        bug: 2,
        fix: '<Board orders={orders} />',
        explanation: 'Board gets the starting list, which never changes. Pass the orders state to both tabs, so they always show the same list.',
      },
    ],
  },
  reflect: {
    prompt: 'Who are the different people using your app? What does each one need to see first?',
    starters: ['Person 1 needs...', 'Person 2 needs...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'In an Expo Router project, look at app/(tabs)/_layout.tsx: it lists the tabs. Add a "kitchen" tab next to the home tab and open it on your phone.',
  },
  notes: 'Bottom tabs simulated with state in the single-file preview; Expo Router uses an app/(tabs) group with a _layout.tsx and <Tabs>. Lifting shared state to the common parent (React docs: "Sharing State Between Components").',
};

export default lesson;
