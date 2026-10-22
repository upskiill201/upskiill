import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 20. Unit Challenge: v0.3, the first real order. The whole chapter in one build; cliffhanger into Chapter 4 ("Is my order ready?"). */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'v0.3: the first real order',
  summary: 'Sunday, 11:30 a.m., the Riverside market. Theo props his old phone on the counter with v0.3 open: "Order here, skip the shouting." The first customer is already reaching for it. Build the version she\'s about to use.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a working order screen with state, chips, a name box, a total and validation', 'Place an order and show a numbered confirmation'],
  learn: [
    {
      kind: 'story',
      title: 'Riverside market, Sunday, 11:30',
      beats: [
        { speaker: 'narrator', text: 'Theo\'s old phone sits on the counter in a cardboard stand Mai made. Taped above it: "Order here. Skip the shouting."' },
        { speaker: 'linh', text: 'If it gets one order wrong, the cardboard goes in the recycling. With the phone.' },
        { speaker: 'mai', text: 'Large, no onions, extra brisket, two limes. I\'m watching.' },
        { speaker: 'tey', text: 'Build the v0.3 she\'s about to tap.' },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: Pho Real v0.3.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build v0.3: OptionChips for Small/Large and Extra brisket, a "Your name" box, "Subtotal $..." and "Total $..." (8.25% tax), and "Place order" (disabled until there\'s a name) that shows "Order #41"',
        starter: `import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const EMPTY_ORDER = { name: '', size: 'Small', brisket: false };

function OptionChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable style={[styles.chip, selected && styles.chipOn]} onPress={onPress}>
      <Text style={[styles.chipText, selected && styles.chipTextOn]}>{label}</Text>
    </Pressable>
  );
}

export default function App() {
  const [order, setOrder] = useState(EMPTY_ORDER);
  const [placed, setPlaced] = useState(false);
  const [number, setNumber] = useState(41);

  return (
    <View style={styles.screen}>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12, backgroundColor: '#fff7ed' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 999, borderWidth: 2, borderColor: '#9a3412' },
  chipOn: { backgroundColor: '#9a3412' },
  chipText: { fontSize: 16, fontWeight: 'bold', color: '#9a3412' },
  chipTextOn: { color: '#ffffff' },
  input: { borderWidth: 2, borderColor: '#fed7aa', borderRadius: 12, padding: 14, fontSize: 18, backgroundColor: '#ffffff' },
  total: { fontSize: 22, fontWeight: 'bold', color: '#9a3412' },
  button: { backgroundColor: '#9a3412', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  off: { backgroundColor: '#d6d3d1' },
  buttonText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  big: { fontSize: 44, fontWeight: 'bold', color: '#9a3412' },
});
`,
        solution: `import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const EMPTY_ORDER = { name: '', size: 'Small', brisket: false };

function OptionChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable style={[styles.chip, selected && styles.chipOn]} onPress={onPress}>
      <Text style={[styles.chipText, selected && styles.chipTextOn]}>{label}</Text>
    </Pressable>
  );
}

export default function App() {
  const [order, setOrder] = useState(EMPTY_ORDER);
  const [placed, setPlaced] = useState(false);
  const [number, setNumber] = useState(41);

  const base = order.size === 'Large' ? 13.5 : 11.5;
  const subtotal = base + (order.brisket ? 3 : 0);
  const total = subtotal + subtotal * 0.0825;
  const canOrder = order.name.trim().length > 0;

  function change(fields: Partial<typeof order>) {
    setOrder({ ...order, ...fields });
  }

  if (placed) {
    return (
      <View style={styles.screen}>
        <Text style={styles.big}>Order #{number}</Text>
        <Text>Thanks, {order.name}. Listen for your number.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <OptionChip label="Small" selected={order.size === 'Small'} onPress={() => change({ size: 'Small' })} />
        <OptionChip label="Large" selected={order.size === 'Large'} onPress={() => change({ size: 'Large' })} />
        <OptionChip label="Extra brisket" selected={order.brisket} onPress={() => change({ brisket: !order.brisket })} />
      </View>
      <TextInput style={styles.input} placeholder="Your name" value={order.name} onChangeText={(text) => change({ name: text })} />
      <Text>Subtotal \${subtotal.toFixed(2)}</Text>
      <Text style={styles.total}>Total \${total.toFixed(2)}</Text>
      <Pressable style={[styles.button, !canOrder && styles.off]} disabled={!canOrder} onPress={() => setPlaced(true)}>
        <Text style={styles.buttonText}>Place order</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12, backgroundColor: '#fff7ed' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 999, borderWidth: 2, borderColor: '#9a3412' },
  chipOn: { backgroundColor: '#9a3412' },
  chipText: { fontSize: 16, fontWeight: 'bold', color: '#9a3412' },
  chipTextOn: { color: '#ffffff' },
  input: { borderWidth: 2, borderColor: '#fed7aa', borderRadius: 12, padding: 14, fontSize: 18, backgroundColor: '#ffffff' },
  total: { fontSize: 22, fontWeight: 'bold', color: '#9a3412' },
  button: { backgroundColor: '#9a3412', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  off: { backgroundColor: '#d6d3d1' },
  buttonText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  big: { fontSize: 44, fontWeight: 'bold', color: '#9a3412' },
});
`,
        hint: 'Calculate base, subtotal, total and canOrder from order. Add an early return for placed. Then a row of three OptionChips, the TextInput, the two Text lines and the Pressable.',
        checks: [
          { message: 'Starts at Subtotal $11.50', screen: { text: 'Subtotal $11.50' } },
          { message: 'Large + brisket: Total $17.86', screen: { tap: ['Large', 'Extra brisket'], text: 'Total $17.86' } },
          { message: 'The Large chip fills when picked', screen: { tap: ['Large'], style: { of: 'Large', prop: 'backgroundColor', value: '#9a3412' } } },
          { message: 'No name, no order', screen: { tap: ['Place order'], noText: 'Order #41' } },
          { message: 'Dana\'s order is #41', screen: { fill: [{ field: 'Your name', text: 'Dana' }], tap: ['Place order'], text: 'Order #41' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Back in Chapter 2, what did the woman at the window ask for?',
        options: [
          { text: 'Bigger pictures', why: 'v0.2 already had pictures. She wanted to order.' },
          { text: 'A cheaper menu', why: 'She asked to order inside the app.' },
          { text: 'To order "large, no onions, extra brisket, two limes" in the app' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of v0.3 to the lesson behind it.',
        pairs: [
          ['Chips that fill', 'Small or large?'],
          ['The total with tax', 'What does it cost?'],
          ['Disabled until there\'s a name', 'The empty order'],
          ['Order #41', 'Order #41'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Mai picks Large, then types her name, and the order goes back to Small. Which line is the problem?',
        language: 'typescript',
        lines: ["const [order, setOrder] = useState(EMPTY_ORDER);", "<OptionChip label=\"Large\" selected={order.size === 'Large'} onPress={() => change({ size: 'Large' })} />", '<TextInput value={order.name} onChangeText={(text) => setOrder({ ...EMPTY_ORDER, name: text })} />'],
        bug: 2,
        fix: '<TextInput value={order.name} onChangeText={(text) => change({ name: text })} />',
        explanation: 'Spreading EMPTY_ORDER copies the empty order, not the current one. Spread the current order (or use change()).',
      },
      {
        kind: 'sortGroups',
        prompt: 'Did v0.3 fix it, or is it still to come?',
        groups: ['Done in v0.3', 'Still to come'],
        items: [
          { text: 'Choosing size and extras', group: 0 },
          { text: 'Seeing every order in a list', group: 1 },
          { text: 'A total with tax', group: 0 },
          { text: 'Telling customers their bowl is ready', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'Thirty-eight orders through the phone and not one wrong. Ray hasn\'t shouted all morning. Don\'t let it go to your head.',
        options: [
          { text: 'So we can stop here?', why: 'Look at the window: there\'s a new problem.' },
          { text: 'It was easy.', why: 'It took a whole chapter of work, and there\'s more to do.' },
          { text: 'I won\'t. Mai\'s already found the next thing: everyone keeps asking if their order\'s ready.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Add Ray\'s line to the confirmation: "Ray has your order" in bold rust (#9a3412)',
        starter: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.big}>Order #41</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12 },
  big: { fontSize: 44, fontWeight: 'bold', color: '#9a3412' },
});
`,
        solution: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.big}>Order #41</Text>
      <Text style={styles.ray}>Ray has your order</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12 },
  big: { fontSize: 44, fontWeight: 'bold', color: '#9a3412' },
  ray: { fontWeight: 'bold', color: '#9a3412' },
});
`,
        hint: "Add ray: { fontWeight: 'bold', color: '#9a3412' } and a Text with style={styles.ray}.",
        checks: [
          { message: 'The line shows', screen: { text: 'Ray has your order' } },
          { message: 'In rust', screen: { style: { of: 'Ray has your order', prop: 'color', value: '#9a3412' } } },
          { message: 'In bold', screen: { style: { of: 'Ray has your order', prop: 'fontWeight', value: 'bold' } } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The chapter\'s rule, from memory.',
        template: 'Store the [[1]]; calculate the [[2]].',
        blanks: [['choices'], ['totals']],
        distractors: ['styles', 'names', 'state'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which hook gives a component memory?',
        answers: ['useState', 'useState()'],
        placeholder: 'useSomething',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Chapter 3 in order.',
        lines: ['"Can I just order that in here?"', 'useState and taps', 'Sizes, extras and totals', 'Names, notes and validation', 'The bowl builder and order #41'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'order is Large with brisket. What does the screen show?',
        code: "const base = order.size === 'Large' ? 13.5 : 11.5;\nconst subtotal = base + (order.brisket ? 3 : 0);\n<Text>Subtotal ${subtotal.toFixed(2)}</Text>",
        language: 'typescript',
        options: [
          { text: 'Subtotal $13.50', why: 'Brisket adds 3.' },
          { text: 'Subtotal $17.86', why: 'That\'s the total with tax.' },
          { text: 'Subtotal $16.50' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'At 1 p.m., forty people are waiting for their bowls. What do they all keep doing?',
        options: [
          { text: 'Leaning in at the window to ask "Is my order ready?"' },
          { text: 'Ordering the wrong size', why: 'The chips got every size right.' },
          { text: 'Complaining about the total', why: 'The totals matched to the cent.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write your build log entry for v0.3: what you shipped, what broke, what you learned, and what people asked for next.',
    starters: ['Shipped:...', 'Broke:...', 'Learned:...', 'People asked for...'],
  },
  deepen: {
    title: 'Chapter 3 mission: take a real order',
    summary: 'Take an order from a friend or family member using only your app on your phone. Next chapter, "Is my order ready?": forty people asking the same question through the window. Theo needs a list of every order, a screen for each one, and a way to move between them.',
  },
  notes: 'Unit Challenge for Chapter 3 (v0.3). 16.50 x 1.0825 = 17.86125 → $17.86. Orders still live only on the counter phone (no server until Film 2). Cliffhanger into Chapter 4 (FlatList, navigation).',
};

export default lesson;
