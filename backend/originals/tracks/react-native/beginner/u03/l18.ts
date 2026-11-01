import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 18. Before/After: Arjun's code review (stored canOrder → derived; inline repeated handlers → one helper). */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Code review: what\'s stored?',
  summary: 'Saturday night. Arjun reads Theo\'s order screen on a video call and stops at line 6: "Why is canOrder in state?" Compare Theo\'s version with the one after the review.',
  minutes: 12,
  outcomes: ['Spot state that should be calculated', 'Write one small helper for repeated updates', 'Review code by asking "what can drift?"'],
  learn: [
    {
      kind: 'compare',
      title: 'Theo\'s order screen, before and after review',
      before: {
        label: 'Before: canOrder kept in state, updated by hand',
        text: "const [order, setOrder] = useState({ name: '', qty: 1, size: 'Small' });\nconst [canOrder, setCanOrder] = useState(false);\n\n<TextInput onChangeText={(text) => {\n  setOrder({ ...order, name: text });\n  setCanOrder(text.trim().length > 0);\n}} />\n<Pressable onPress={() => setOrder({ ...order, size: 'Large' })} />\n<Pressable onPress={() => setOrder({ ...order, qty: order.qty + 1 })} />",
      },
      after: {
        label: 'After: canOrder calculated, one helper for changes',
        text: "const [order, setOrder] = useState({ name: '', qty: 1, size: 'Small' });\nconst canOrder = order.name.trim().length > 0 && order.qty > 0;\n\nfunction change(fields: Partial<typeof order>) {\n  setOrder({ ...order, ...fields });\n}\n\n<TextInput onChangeText={(text) => change({ name: text })} />\n<Pressable onPress={() => change({ size: 'Large' })} />\n<Pressable onPress={() => change({ qty: order.qty + 1 })} />",
      },
      notes: [
        'canOrder can be calculated from the order, so it isn\'t stored. Same rule as the total: store choices, calculate the rest.',
        'In the before version, any new way to change the name (a "Clear" button, say) must remember to update canOrder too. Forget once, and the button lies.',
        'change() does the "copy the order, change some fields" in one place. Every button reads shorter.',
        'Partial<typeof order> is TypeScript for "some of the order\'s fields". Spell a field wrong and the editor warns you.',
        'Arjun\'s review question for every useState: "Could this be worked out from something else?"',
      ],
    },
    {
      kind: 'tryIt',
      title: 'After the review',
      caption: 'The button is disabled until there\'s a name and lights up rust when ready. canOrder is never stored.',
      code: `import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [order, setOrder] = useState({ name: '', qty: 1, size: 'Small' });
  const canOrder = order.name.trim().length > 0 && order.qty > 0;

  function change(fields: Partial<typeof order>) {
    setOrder({ ...order, ...fields });
  }

  return (
    <View style={styles.screen}>
      <TextInput style={styles.input} placeholder="Your name" value={order.name} onChangeText={(text) => change({ name: text })} />
      <Pressable style={styles.small} onPress={() => change({ size: 'Large' })}><Text>Make it Large</Text></Pressable>
      <Pressable style={styles.small} onPress={() => change({ qty: order.qty + 1 })}><Text>+ bowl</Text></Pressable>
      <Text style={styles.line}>{order.qty} x {order.size}</Text>
      <Pressable style={[styles.button, !canOrder && styles.off]} disabled={!canOrder}>
        <Text style={styles.buttonText}>Place order</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 10, backgroundColor: '#fff7ed' },
  input: { borderWidth: 2, borderColor: '#fed7aa', borderRadius: 12, padding: 14, fontSize: 18, backgroundColor: '#ffffff' },
  small: { padding: 10, borderRadius: 10, borderWidth: 2, borderColor: '#9a3412', alignItems: 'center' },
  line: { fontSize: 20, fontWeight: 'bold' },
  button: { backgroundColor: '#9a3412', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  off: { backgroundColor: '#d6d3d1' },
  buttonText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
});
`,
      challenge: 'Add a "Clear" button that calls change({ name: \'\' }). Does Place order switch off by itself?',
    },
  ],
  apply: {
    scenario: 'Reviewing the order screen.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Store it in state, or calculate it?',
        groups: ['Store in state', 'Calculate'],
        items: [
          { text: 'The size picked', group: 0 },
          { text: 'Whether the order can be placed', group: 1 },
          { text: 'The name typed', group: 0 },
          { text: 'The total with tax', group: 1 },
          { text: 'How many characters are in the note', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Replace the canOrder state with a calculated const: a name with real letters. Typing "Dana" then tapping Place order shows "Sent to Ray"',
        starter: `import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [canOrder, setCanOrder] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <TextInput placeholder="Your name" value={name} onChangeText={setName} />
      <Pressable disabled={!canOrder} onPress={() => setSent(true)}>
        <Text>Place order</Text>
      </Pressable>
      {sent && <Text>Sent to Ray</Text>}
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [sent, setSent] = useState(false);
  const canOrder = name.trim().length > 0;

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <TextInput placeholder="Your name" value={name} onChangeText={setName} />
      <Pressable disabled={!canOrder} onPress={() => setSent(true)}>
        <Text>Place order</Text>
      </Pressable>
      {sent && <Text>Sent to Ray</Text>}
    </View>
  );
}
`,
        hint: 'Delete the canOrder useState line and write const canOrder = name.trim().length > 0;',
        checks: [
          { message: 'Empty name: not sent', screen: { tap: ['Place order'], noText: 'Sent to Ray' } },
          { message: 'Dana\'s order is sent', screen: { fill: [{ field: 'Your name', text: 'Dana' }], tap: ['Place order'], text: 'Sent to Ray' } },
          { message: 'Calculated, not stored', codeIncludes: 'const canOrder' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What was the real risk in the "before" version?',
        options: [
          { text: 'It used too much memory', why: 'One boolean is nothing. The risk is drifting out of step.' },
          { text: 'TextInput can\'t call two setters', why: 'It can. That\'s not the problem.' },
          { text: 'Any new code that changes the name has to remember to update canOrder, and one day it won\'t' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'What\'s the one question to ask about every useState?',
        options: [
          { text: '"Could this be worked out from something else?" If yes, calculate it.' },
          { text: '"Is it a number?"', why: 'Numbers can be state or calculated. The question is whether it can drift.' },
          { text: '"Can I add more?"', why: 'Fewer stored values means fewer to keep in step.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Arjun\'s helper.',
        language: 'typescript',
        template: 'function change(fields: Partial<typeof order>) {\n  setOrder({ [[1]], [[2]] });\n}',
        blanks: [['...order'], ['...fields']],
        distractors: ['order', 'fields', '...setOrder'],
      },
      {
        kind: 'writeCode',
        prompt: 'Write the change() helper and use it for the Large button. Tapping "Large" then "+ bowl" shows "2 x Large"',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [order, setOrder] = useState({ size: 'Small', qty: 1 });

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setOrder({ ...order, size: 'Large' })}><Text>Large</Text></Pressable>
      <Pressable onPress={() => setOrder({ ...order, qty: order.qty + 1 })}><Text>+ bowl</Text></Pressable>
      <Text>{order.qty} x {order.size}</Text>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [order, setOrder] = useState({ size: 'Small', qty: 1 });

  function change(fields: Partial<typeof order>) {
    setOrder({ ...order, ...fields });
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => change({ size: 'Large' })}><Text>Large</Text></Pressable>
      <Pressable onPress={() => change({ qty: order.qty + 1 })}><Text>+ bowl</Text></Pressable>
      <Text>{order.qty} x {order.size}</Text>
    </View>
  );
}
`,
        hint: 'function change(fields: Partial<typeof order>) { setOrder({ ...order, ...fields }); } then onPress={() => change({ size: \'Large\' })}.',
        checks: [
          { message: 'Large, then + bowl: "2 x Large"', screen: { tap: ['Large', '+ bowl'], text: '2 x Large' } },
          { message: 'Uses the helper', codeIncludes: 'function change' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the review note to the fix.',
        pairs: [
          ['canOrder can drift', 'Calculate it every render'],
          ['Every button copies the order', 'One change() helper'],
          ['Typo in a field name', 'Partial<typeof order> catches it'],
          ['Ticket line "NOTE:" is empty', 'Show it only when there\'s a note'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'order.name is "  " (two spaces) and qty is 1. What is canOrder?',
        code: 'const canOrder = order.name.trim().length > 0 && order.qty > 0;',
        language: 'typescript',
        options: [
          { text: 'true', why: 'trim() leaves "", length 0, so the first part is false.' },
          { text: 'false' },
          { text: '2', why: '&& of two comparisons gives true or false.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which TypeScript type means "some of the fields of this object"?',
        answers: ['Partial', 'Partial<T>', 'Partial<typeof order>'],
        placeholder: 'Type name',
      },
      {
        kind: 'findBug',
        prompt: 'After a "Clear" button empties the name, Place order still works. Which line causes it?',
        language: 'typescript',
        lines: ["const [canOrder, setCanOrder] = useState(false);", "<TextInput onChangeText={(t) => { setName(t); setCanOrder(t.trim().length > 0); }} />", "<Pressable onPress={() => setName('')}><Text>Clear</Text></Pressable>", '<Pressable disabled={!canOrder}><Text>Place order</Text></Pressable>'],
        bug: 0,
        fix: 'const canOrder = name.trim().length > 0;',
        explanation: 'Clear changes the name but not canOrder, so they drift apart. The real fix is not "also update canOrder in Clear", it\'s to calculate canOrder instead of storing it.',
      },
    ],
  },
  reflect: {
    prompt: 'Look at the state in your own app. Which useState could be calculated instead? Rewrite one.',
    starters: ['This state:...', 'Could be calculated from:...'],
  },
  deepen: {
    title: 'Read the docs',
    summary: 'React\'s "Choosing the State Structure" page lists the rules Arjun used: avoid redundant state and avoid contradictions. Read the "Avoid redundant state" section and compare it with Theo\'s before and after.',
  },
  notes: 'React docs: "Choosing the State Structure" (avoid redundant state). TypeScript Partial<T> utility type.',
};

export default lesson;
