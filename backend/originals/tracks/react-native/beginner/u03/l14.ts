import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 14. Steps: one order object in state, updated with the spread operator. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'One order, one object',
  summary: 'Size, brisket, noodles, onions, quantity, name, notes: seven useState lines and counting. Arjun looks over Theo\'s shoulder: "That\'s one order. Keep it as one thing." Build it step by step.',
  minutes: 13,
  outcomes: ['Keep related choices in one object in state', 'Change one field and keep the rest with ...spread', 'Read fields with order.size, order.qty'],
  learn: [
    {
      kind: 'steps',
      title: 'From seven states to one order',
      steps: [
        {
          title: '1. Describe the order as an object',
          body: 'An object groups named values. This is one bowl order, with every choice in one place.',
          code: "const [order, setOrder] = useState({\n  size: 'Small',\n  brisket: false,\n  qty: 1,\n  name: '',\n});",
          language: 'typescript',
        },
        {
          title: '2. Read a field with a dot',
          body: 'order.size is "Small". order.qty is 1. Use them in JSX exactly like before.',
          code: '<Text>{order.qty} x {order.size}</Text>',
          language: 'typescript',
        },
        {
          title: '3. The trap: setting only one field',
          body: 'setOrder replaces the whole value. This line throws away brisket, qty and name, and keeps only size.',
          code: "setOrder({ size: 'Large' });   // the rest is gone",
          language: 'typescript',
        },
        {
          title: '4. Copy the rest with ...',
          body: 'The spread operator ...order copies every field from the old order. Then size: \'Large\' overwrites just that one.',
          code: "setOrder({ ...order, size: 'Large' });",
          language: 'typescript',
        },
        {
          title: '5. Same pattern for every change',
          body: 'Toggle, count, type: each one is "copy the order, change one field".',
          code: "setOrder({ ...order, brisket: !order.brisket });\nsetOrder({ ...order, qty: order.qty + 1 });\n<TextInput value={order.name} onChangeText={(text) => setOrder({ ...order, name: text })} />",
          language: 'typescript',
        },
        {
          title: '6. Totals still come from state',
          body: 'Nothing changes for derived values: they just read order.size, order.brisket and order.qty.',
          code: "const base = order.size === 'Large' ? 13.5 : 11.5;\nconst subtotal = (base + (order.brisket ? 3 : 0)) * order.qty;",
          language: 'typescript',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The order object',
      caption: 'Tap Large, Extra brisket and + bowl. The ticket line reads every field from one object.',
      code: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [order, setOrder] = useState({ size: 'Small', brisket: false, qty: 1 });

  return (
    <View style={styles.screen}>
      <Pressable style={styles.button} onPress={() => setOrder({ ...order, size: 'Large' })}>
        <Text style={styles.label}>Large</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => setOrder({ ...order, brisket: !order.brisket })}>
        <Text style={styles.label}>Extra brisket</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => setOrder({ ...order, qty: order.qty + 1 })}>
        <Text style={styles.label}>+ bowl</Text>
      </Pressable>
      <Text style={styles.ticket}>
        {order.qty} x {order.size}{order.brisket ? ', extra brisket' : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 10, backgroundColor: '#fff7ed' },
  button: { backgroundColor: '#9a3412', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  label: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  ticket: { fontSize: 22, fontWeight: 'bold', color: '#1c1917', marginTop: 12 },
});
`,
      challenge: 'Change the Large button to setOrder({ size: \'Large\' }) without the spread. Tap brisket first, then Large. What happens to the ticket?',
    },
  ],
  apply: {
    scenario: 'One order object.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Describe the order as an object in useState', 'Read fields with order.size', 'Change a field with { ...order, size: \'Large\' }', 'Calculate totals from order\'s fields'],
      },
      {
        kind: 'writeCode',
        prompt: 'Make the Large button keep the other fields: use ...order. Brisket, then Large, should show "1 x Large, extra brisket"',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [order, setOrder] = useState({ size: 'Small', brisket: false, qty: 1 });

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setOrder({ ...order, brisket: !order.brisket })}><Text>Extra brisket</Text></Pressable>
      <Pressable onPress={() => setOrder({ size: 'Large' })}><Text>Large</Text></Pressable>
      <Text>{order.qty} x {order.size}{order.brisket ? ', extra brisket' : ''}</Text>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [order, setOrder] = useState({ size: 'Small', brisket: false, qty: 1 });

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setOrder({ ...order, brisket: !order.brisket })}><Text>Extra brisket</Text></Pressable>
      <Pressable onPress={() => setOrder({ ...order, size: 'Large' })}><Text>Large</Text></Pressable>
      <Text>{order.qty} x {order.size}{order.brisket ? ', extra brisket' : ''}</Text>
    </View>
  );
}
`,
        hint: "Change the Large button to setOrder({ ...order, size: 'Large' }).",
        checks: [
          { message: 'Brisket, then Large keeps both', screen: { tap: ['Extra brisket', 'Large'], text: '1 x Large, extra brisket' } },
          { message: 'Uses the spread', codeIncludes: "...order, size: 'Large'" },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'order is { size: \'Small\', qty: 2 }. After this, what is order.qty?',
        code: "setOrder({ size: 'Large' });",
        language: 'typescript',
        options: [
          { text: 'undefined: the new object has no qty' },
          { text: '2', why: 'Without ...order, qty isn\'t copied over.' },
          { text: '1', why: 'Nothing resets it to 1. It\'s simply gone.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Add one bowl and keep everything else.',
        language: 'typescript',
        template: 'setOrder({ [[1]]order, qty: [[2]].qty + 1 });',
        blanks: [['...'], ['order']],
        distractors: ['..', 'qty', 'this'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'Why bother with one object? Seven useStates worked.',
        options: [
          { text: 'They did, but the order is one thing. One object is easier to send to the kitchen, reset, and read.' },
          { text: 'Objects are faster.', why: 'Speed isn\'t the point. It\'s about keeping one order together.' },
          { text: 'useState only allows one per app.', why: 'It allows as many as you like (lesson 4).' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a "+ bowl" button that adds one to order.qty and keeps the rest. Two taps shows "3 bowls"',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [order, setOrder] = useState({ size: 'Large', qty: 1 });

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Text>{order.qty} bowls</Text>
      <Text>Size: {order.size}</Text>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [order, setOrder] = useState({ size: 'Large', qty: 1 });

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setOrder({ ...order, qty: order.qty + 1 })}>
        <Text>+ bowl</Text>
      </Pressable>
      <Text>{order.qty} bowls</Text>
      <Text>Size: {order.size}</Text>
    </View>
  );
}
`,
        hint: 'A Pressable with onPress={() => setOrder({ ...order, qty: order.qty + 1 })}.',
        checks: [
          { message: 'Two taps: 3 bowls', screen: { tap: ['+ bowl', '+ bowl'], text: '3 bowls' } },
          { message: 'Size is kept', screen: { tap: ['+ bowl'], text: 'Size: Large' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it does.',
        pairs: [
          ['order.size', 'Reads one field'],
          ['...order', 'Copies every field'],
          ["{ ...order, size: 'Large' }", 'A copy with one field changed'],
          ["setOrder({ size: 'Large' })", 'Loses the other fields'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What are the three dots called? (Two words.)',
        answers: ['spread operator', 'spread syntax', 'the spread operator', 'spread'],
        placeholder: '... operator',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeps the rest of the order, or loses it?',
        groups: ['Keeps the rest', 'Loses the rest'],
        items: [
          { text: "setOrder({ ...order, size: 'Large' })", group: 0 },
          { text: 'setOrder({ qty: 2 })', group: 1 },
          { text: 'setOrder({ ...order, brisket: true })', group: 0 },
          { text: "setOrder({ name: 'Dana' })", group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Typing a name wipes the size and quantity. Which line is the problem?',
        language: 'typescript',
        lines: ["const [order, setOrder] = useState({ size: 'Small', qty: 1, name: '' });", '<TextInput', '  value={order.name}', '  onChangeText={(text) => setOrder({ name: text })}', '/>'],
        bug: 3,
        fix: '  onChangeText={(text) => setOrder({ ...order, name: text })}',
        explanation: 'Without ...order, each key press replaces the order with just a name.',
      },
    ],
  },
  reflect: {
    prompt: 'What "one thing" in your own app has several fields (a booking, a profile, a post)? Write it as an object.',
    starters: ['The thing:...', 'Its fields:...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Turn your bowl builder into one order object on your phone. Tap every button in a random order and check nothing gets lost.',
  },
  notes: 'useState with an object; state updates replace the value (React docs: "Updating Objects in State"); object spread syntax.',
};

export default lesson;
