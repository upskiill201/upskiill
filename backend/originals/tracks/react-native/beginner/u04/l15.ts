import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 15. Checkpoint 3: lessons 11–14 (screens, ids and find, Expo Router files and params, tabs). */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Mai gets lost',
  summary: 'Mai\'s mission: get lost in the app. Open orders, go back, switch tabs, open an order that\'s been collected. If she can strand herself anywhere, Theo buys the bubble tea.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Open the right screen for a tapped item, and come back', 'Handle an id that no longer exists'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 9 p.m.',
      beats: [
        { speaker: 'mai', text: 'Rules: if I get stuck, you buy. Large taro, extra boba.' },
        { speaker: 'theo', text: 'Every screen has a way back. I checked.' },
        { speaker: 'mai', text: '(opening order #43 while Theo, on the other tab, collects it) We\'ll see.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: screens and ids.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Rows "#{id} {name}" open "Order #{id}: {status}" with a "Back" button. If the order isn\'t found, show "Order collected" and Back. A "Collect #41" button on the board removes #41',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([
    { id: '41', name: 'Dana', status: 'Ready' },
    { id: '42', name: 'Sam', status: 'Cooking' },
  ]);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>

    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([
    { id: '41', name: 'Dana', status: 'Ready' },
    { id: '42', name: 'Sam', status: 'Cooking' },
  ]);
  const [openId, setOpenId] = useState<string | null>(null);
  const open = orders.find((o) => o.id === openId);

  if (openId) {
    return (
      <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
        <Pressable onPress={() => setOpenId(null)}><Text>Back</Text></Pressable>
        {open ? <Text>Order #{open.id}: {open.status}</Text> : <Text>Order collected</Text>}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {orders.map((o) => (
        <Pressable key={o.id} onPress={() => setOpenId(o.id)}>
          <Text>#{o.id} {o.name}</Text>
        </Pressable>
      ))}
      <Pressable onPress={() => setOrders(orders.filter((o) => o.id !== '41'))}>
        <Text>Collect #41</Text>
      </Pressable>
    </View>
  );
}
`,
        hint: 'const open = orders.find(...). If openId is set, return a screen with Back and either the order or "Order collected". On the board, rows call setOpenId(o.id).',
        checks: [
          { message: 'Sam\'s row opens his order', screen: { tap: ['#42 Sam'], text: 'Order #42: Cooking' } },
          { message: 'Back returns', screen: { tap: ['#42 Sam', 'Back'], text: '#41 Dana' } },
          { message: 'Collect removes #41', screen: { tap: ['Collect #41'], noText: '#41 Dana' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Mai opened #43, then it was collected on the other tab. What should her screen show?',
        options: [
          { text: 'A blank screen', why: 'Looks broken. Say what happened.' },
          { text: 'The old details, as if nothing happened', why: 'That would be a stale copy. The id lookup finds nothing now.' },
          { text: '"Order collected", with a Back button' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its lesson.',
        pairs: [
          ["useState('board')", 'Another screen'],
          ['orders.find((o) => o.id === openId)', 'Tap your number'],
          ['app/order/[id].tsx', 'Expo Router'],
          ['Board and Kitchen', 'Two people, two screens'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'Okay, I couldn\'t get stuck. But why does the order screen need the id and not the whole order?',
        options: [
          { text: 'No reason, either works.', why: 'A copy goes stale when Ray changes the status.' },
          { text: 'Because the id stays the same while the order changes. Looking it up every time shows the latest status.' },
          { text: 'Objects can\'t be passed to screens.', why: 'They can. A copy just doesn\'t update.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'A link to order 42 in Expo Router.',
        language: 'typescript',
        template: "<[[1]] href={'/order/' + [[2]]}>Order 42</Link>",
        blanks: [['Link'], ['o.id']],
        distractors: ['Pressable', 'id()', 'order'],
      },
      {
        kind: 'sortGroups',
        prompt: 'find or filter?',
        groups: ['.find', '.filter'],
        items: [
          { text: 'The open order', group: 0 },
          { text: 'Orders still cooking', group: 1 },
          { text: 'Remove a collected order', group: 1 },
          { text: 'Order #42', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'openId is \'43\', but orders only has #41 and #42. What shows?',
        code: "const open = orders.find((o) => o.id === openId);\n{open ? <Text>Order #{open.id}</Text> : <Text>Order collected</Text>}",
        language: 'typescript',
        options: [
          { text: '"Order #43"', why: 'find returns undefined: there\'s no #43.' },
          { text: '"Order collected"' },
          { text: 'A crash', why: 'The ternary handles undefined safely.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Two tabs: "Board" shows "2 ready", "Kitchen" shows "1 cooking", both counted from the same orders',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

const ORDERS = [
  { id: '41', status: 'Ready' },
  { id: '42', status: 'Ready' },
  { id: '43', status: 'Cooking' },
];

export default function App() {
  const [tab, setTab] = useState('board');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>

    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

const ORDERS = [
  { id: '41', status: 'Ready' },
  { id: '42', status: 'Ready' },
  { id: '43', status: 'Cooking' },
];

export default function App() {
  const [tab, setTab] = useState('board');
  const ready = ORDERS.filter((o) => o.status === 'Ready');
  const cooking = ORDERS.filter((o) => o.status === 'Cooking');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {tab === 'board' ? <Text>{ready.length} ready</Text> : <Text>{cooking.length} cooking</Text>}
      <Pressable onPress={() => setTab('board')}><Text>Board</Text></Pressable>
      <Pressable onPress={() => setTab('kitchen')}><Text>Kitchen</Text></Pressable>
    </View>
  );
}
`,
        hint: 'Filter ready and cooking, then show one count or the other depending on tab, and two Pressables that call setTab.',
        checks: [
          { message: 'Board: "2 ready"', screen: { text: '2 ready' } },
          { message: 'Kitchen: "1 cooking"', screen: { tap: ['Kitchen'], text: '1 cooking' } },
          { message: 'Counted with filter', codeIncludes: '.filter(' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which Expo Router hook reads the id on the order screen?',
        answers: ['useLocalSearchParams', 'useLocalSearchParams()'],
        placeholder: 'useSomething',
      },
      {
        kind: 'mcq',
        prompt: 'Did Theo buy the bubble tea?',
        options: [
          { text: 'No. But Mai found something else: the board is long, and people want to type their name to find their order' },
          { text: 'Yes, she got stuck on the order screen', why: 'Every screen had a way back.' },
          { text: 'Yes, the app crashed', why: '"Order collected" saved him.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Try to get lost in an app you built. Is there any screen without a way back?',
    starters: ['I tried...', 'I got stuck at... / I never got stuck because...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 11–14.',
};

export default lesson;
