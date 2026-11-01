import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 13. Before/After: the one-file navigator vs Expo Router (app/ folder, [id] routes, Link, useLocalSearchParams, router.back). */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Expo Router',
  summary: 'Theo\'s state navigator works, but Arjun asks the real-project question: "What happens with ten screens? And the phone\'s back gesture?" Compare the one-file version with Expo Router, the navigator Expo apps use.',
  minutes: 13,
  outcomes: ['Map screens to files in the app/ folder', 'Pass an id in the address with [id] and Link', 'Read it with useLocalSearchParams'],
  learn: [
    {
      kind: 'compare',
      title: 'Opening an order: one file vs Expo Router',
      before: {
        label: 'Before: one file, state decides the screen',
        text: "// App.tsx\nconst [openId, setOpenId] = useState<string | null>(null);\nconst open = orders.find((o) => o.id === openId);\n\nif (open) return <OrderScreen order={open} onBack={() => setOpenId(null)} />;\n\n<Pressable onPress={() => setOpenId(o.id)}>...</Pressable>",
      },
      after: {
        label: 'After: Expo Router, one file per screen',
        text: "// app/index.tsx  (the board, at \"/\")\nimport { Link } from 'expo-router';\n\n<Link href={'/order/' + o.id}>#{o.id} {o.name}</Link>\n\n// app/order/[id].tsx  (one order, at \"/order/42\")\nimport { useLocalSearchParams, router } from 'expo-router';\n\nexport default function OrderScreen() {\n  const { id } = useLocalSearchParams<{ id: string }>();\n  const order = orders.find((o) => o.id === id);\n  ...\n  <Pressable onPress={() => router.back()}>...</Pressable>\n}",
      },
      notes: [
        'Every file in the app/ folder is a screen. app/index.tsx is the first one, at the address "/".',
        'Square brackets make a fill-in-the-blank address: app/order/[id].tsx matches /order/41, /order/42 and so on.',
        '<Link href="/order/42"> goes there. The 42 becomes the id param.',
        'useLocalSearchParams() reads the params on the screen: { id: \'42\' }. Then it\'s the same .find as before.',
        'router.back() goes back, and the phone\'s own back gesture works for free, with the slide animation.',
        'Same idea as Theo\'s version: pass the id, find the order. Expo Router just keeps track of the screens for you.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'The same flow, in the preview',
      caption: 'The phone preview runs one file, so this plays Expo Router\'s part with state. The comments show which Expo Router file each part becomes.',
      code: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana', status: 'Ready' },
  { id: '42', name: 'Sam', status: 'Cooking' },
];

// In Expo Router: app/order/[id].tsx, with const { id } = useLocalSearchParams();
function OrderScreen({ id, back }: { id: string; back: () => void }) {
  const order = ORDERS.find((o) => o.id === id);
  if (!order) return <Text>Order not found</Text>;
  return (
    <View style={styles.screen}>
      <Pressable onPress={back}><Text style={styles.link}>{'< Back'}</Text></Pressable>
      <Text style={styles.big}>#{order.id}</Text>
      <Text style={styles.line}>{order.name}: {order.status}</Text>
    </View>
  );
}

export default function App() {
  // Expo Router remembers the address for you, like "/order/42".
  const [address, setAddress] = useState('/');

  if (address.startsWith('/order/')) {
    return <OrderScreen id={address.replace('/order/', '')} back={() => setAddress('/')} />;
  }

  // In Expo Router: app/index.tsx, with <Link href={'/order/' + o.id}>
  return (
    <View style={styles.screen}>
      {ORDERS.map((o) => (
        <Pressable key={o.id} onPress={() => setAddress('/order/' + o.id)}>
          <Text style={styles.link}>#{o.id} {o.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12, backgroundColor: '#fff7ed' },
  link: { fontSize: 20, color: '#9a3412', fontWeight: 'bold' },
  big: { fontSize: 48, fontWeight: 'bold' },
  line: { fontSize: 18 },
});
`,
      challenge: 'Add a Text at the top of each screen that shows the current address. That\'s what Expo Router keeps track of.',
    },
  ],
  apply: {
    scenario: 'Expo Router in a real project.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the file to the address it answers.',
        pairs: [
          ['app/index.tsx', '/'],
          ['app/order/[id].tsx', '/order/42'],
          ['app/menu.tsx', '/menu'],
          ['app/kitchen.tsx', '/kitchen'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In app/order/[id].tsx, what do the square brackets mean?',
        options: [
          { text: 'That part of the address can be anything, and it arrives as the id param' },
          { text: 'The file is optional', why: 'Brackets mark a param, not an optional file.' },
          { text: 'It\'s an array of orders', why: 'Nothing to do with arrays here: it\'s a fill-in-the-blank address.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Read the id on the order screen.',
        language: 'typescript',
        template: "import { [[1]] } from 'expo-router';\n\nconst { [[2]] } = useLocalSearchParams<{ id: string }>();",
        blanks: [['useLocalSearchParams'], ['id']],
        distractors: ['useState', 'params', 'Link'],
      },
      {
        kind: 'writeCode',
        prompt: 'Play the router: keep an address in state. Tapping "#42 Sam" sets it to \'/order/42\' and shows "Order 42". "Back" sets it to \'/\'',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [address, setAddress] = useState('/');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable><Text>#42 Sam</Text></Pressable>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [address, setAddress] = useState('/');

  if (address.startsWith('/order/')) {
    const id = address.replace('/order/', '');
    return (
      <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
        <Pressable onPress={() => setAddress('/')}><Text>Back</Text></Pressable>
        <Text>Order {id}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setAddress('/order/42')}><Text>#42 Sam</Text></Pressable>
    </View>
  );
}
`,
        hint: "onPress={() => setAddress('/order/42')}, then if (address.startsWith('/order/')) take the id with address.replace('/order/', '') and show Order {id} with a Back button.",
        checks: [
          { message: 'Opens "Order 42"', screen: { tap: ['#42 Sam'], text: 'Order 42' } },
          { message: 'Back goes home', screen: { tap: ['#42 Sam', 'Back'], text: '#42 Sam' } },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the order screen file together (app/order/[id].tsx).',
        lines: ["import { useLocalSearchParams } from 'expo-router';", 'export default function OrderScreen() {', '  const { id } = useLocalSearchParams<{ id: string }>();', '  const order = orders.find((o) => o.id === id);', '  return <Text>{order?.name}</Text>;', '}'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'Why switch to Expo Router if your state version works?',
        options: [
          { text: 'It\'s newer, so it\'s better.', why: 'Not a reason on its own.' },
          { text: 'I won\'t, state is enough forever.', why: 'Fine for two screens. Not for ten, with back gestures.' },
          { text: 'With ten screens, files beat one giant if. And the back gesture, animations and links come for free.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The user taps this link. Which file shows, and what is id?',
        code: "<Link href=\"/order/57\">Order 57</Link>",
        language: 'typescript',
        options: [
          { text: 'app/index.tsx, id is 57', why: 'index is "/", the board.' },
          { text: "app/order/[id].tsx, id is '57'" },
          { text: 'app/order/57.tsx', why: 'One [id] file serves every order number.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'One-file navigator, or Expo Router?',
        groups: ['One-file (state)', 'Expo Router'],
        items: [
          { text: "const [screen, setScreen] = useState('board')", group: 0 },
          { text: '<Link href="/order/42">', group: 1 },
          { text: 'useLocalSearchParams()', group: 1 },
          { text: 'setOpenId(null) to go back', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which folder do Expo Router screens live in?',
        answers: ['app', 'app/', '/app'],
        placeholder: 'folder',
      },
      {
        kind: 'findBug',
        prompt: 'Tapping an order opens "/order/[id]" literally, and the screen says "Order not found". Which line is the problem?',
        language: 'typescript',
        lines: ["import { Link } from 'expo-router';", '{orders.map((o) => (', '  <Link key={o.id} href="/order/[id]">', '    #{o.id} {o.name}', '  </Link>', '))}'],
        bug: 2,
        fix: "  <Link key={o.id} href={'/order/' + o.id}>",
        explanation: 'The [id] is for the file name. The link needs the real number: \'/order/\' + o.id.',
      },
    ],
  },
  reflect: {
    prompt: 'List your own app\'s screens as Expo Router files. Which one needs a [param]?',
    starters: ['app/index.tsx:...', 'app/...[...].tsx:...'],
  },
  deepen: {
    title: 'Real-device mission: Expo Router for real',
    summary: 'Create a new project with "npx create-expo-app@latest" (it uses Expo Router). Add app/order/[id].tsx, link to it from app/index.tsx, and open /order/42 on your phone. Swipe back from the edge of the screen.',
  },
  notes: 'Expo Router docs: file-based routing, dynamic routes ([id]), Link, useLocalSearchParams, router.back. The browser preview runs one file, so routing is simulated with state; Expo Router itself runs on device.',
};

export default lesson;
