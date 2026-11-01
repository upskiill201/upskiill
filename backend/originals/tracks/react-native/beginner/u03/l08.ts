import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Cards: the total, calculated from state every time (derived values), plus Austin's 8.25% sales tax. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'What does it cost?',
  summary: 'Large, extra brisket, two bowls. The customer wants one number: the total. Theo\'s first idea is to keep the total in state too. Arjun: "Don\'t. Work it out." Here\'s why.',
  minutes: 13,
  outcomes: ['Calculate a total from state on every render', 'Add sales tax and show dollars with two decimals', 'Avoid keeping numbers you can calculate in state'],
  learn: [
    {
      kind: 'text',
      html: '<p>The total depends on the choices: size, extras and quantity. You could keep it in state and update it on every tap, but then it can drift out of step: one missed update and the total is wrong.</p><p>Instead, <strong>work it out every time the screen draws</strong>. It\'s just a few lines inside App:</p><pre><code>const base = size === \'Large\' ? 13.5 : 11.5;\nconst extras = (brisket ? 3 : 0) + (noodles ? 1.5 : 0);\nconst subtotal = (base + extras) * qty;\nconst tax = subtotal * 0.0825;   // Austin sales tax, 8.25%\nconst total = subtotal + tax;</code></pre><p>These are <strong>derived values</strong>: calculated from state, never stored. Change any choice and they\'re right again on the next draw, automatically.</p><p>Show money with two decimals: <code>${total.toFixed(2)}</code>. A large with extra brisket is $16.50, plus $1.36 tax: <strong>$17.86</strong>.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'If you can calculate it from state, don\'t store it in state. Store the choices; calculate the totals.',
    },
    {
      kind: 'tryIt',
      title: 'The live total',
      caption: 'Tap Large and Extra brisket and watch the subtotal, tax and total update. Then try the plus button.',
      code: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [size, setSize] = useState('Small');
  const [brisket, setBrisket] = useState(false);
  const [qty, setQty] = useState(1);

  const base = size === 'Large' ? 13.5 : 11.5;
  const extras = brisket ? 3 : 0;
  const subtotal = (base + extras) * qty;
  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  return (
    <View style={styles.screen}>
      <Pressable style={styles.button} onPress={() => setSize('Large')}><Text style={styles.label}>Large</Text></Pressable>
      <Pressable style={styles.button} onPress={() => setBrisket(!brisket)}><Text style={styles.label}>Extra brisket</Text></Pressable>
      <Pressable style={styles.button} onPress={() => setQty(qty + 1)}><Text style={styles.label}>+ bowl</Text></Pressable>
      <Text style={styles.line}>Subtotal \${subtotal.toFixed(2)}</Text>
      <Text style={styles.line}>Tax \${tax.toFixed(2)}</Text>
      <Text style={styles.total}>Total \${total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 10, backgroundColor: '#fff7ed' },
  button: { backgroundColor: '#9a3412', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  label: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  line: { fontSize: 18, color: '#1c1917' },
  total: { fontSize: 24, fontWeight: 'bold', color: '#9a3412' },
});
`,
      challenge: 'Add extra noodles (+1.50) as another toggle and include it in extras.',
    },
  ],
  apply: {
    scenario: 'Getting the total right.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why calculate the total instead of keeping it in state?',
        options: [
          { text: 'State can\'t hold numbers', why: 'It can. But a stored total can drift out of step with the choices.' },
          { text: 'A calculated total is always right for the current choices; a stored one can drift' },
          { text: 'It makes the app look nicer', why: 'Same look. It\'s about being correct.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Show the price from the size: "Price $11.50" for Small, "Price $13.50" after tapping Large',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [size, setSize] = useState('Small');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setSize('Large')}><Text>Large</Text></Pressable>
      <Text>Price</Text>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [size, setSize] = useState('Small');
  const price = size === 'Large' ? 13.5 : 11.5;

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setSize('Large')}><Text>Large</Text></Pressable>
      <Text>Price \${price.toFixed(2)}</Text>
    </View>
  );
}
`,
        hint: "const price = size === 'Large' ? 13.5 : 11.5; then <Text>Price ${price.toFixed(2)}</Text>.",
        checks: [
          { message: 'Small shows $11.50', screen: { text: 'Price $11.50' } },
          { message: 'Large shows $13.50', screen: { tap: ['Large'], text: 'Price $13.50' } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Austin\'s sales tax.',
        language: 'typescript',
        template: 'const tax = subtotal * [[1]];\nconst total = subtotal [[2]] tax;',
        blanks: [['0.0825'], ['+']],
        distractors: ['8.25', '0.825', '*'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A large with extra brisket: $16.50 plus 8.25% tax. What\'s the total? (Like 0.00)',
        answers: ['17.86', '$17.86'],
        placeholder: '0.00',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'Where\'s the total stored?',
        options: [
          { text: 'In its own useState, updated on every tap.', why: 'That\'s the drift risk Arjun warned about.' },
          { text: 'In the database.', why: 'There\'s no database yet, and no need: it\'s calculated.' },
          { text: 'It isn\'t. It\'s worked out from size, extras and quantity every time the screen draws.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Add the brisket toggle to the price: +3 when on. Small + brisket shows "Price $14.50"',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [size, setSize] = useState('Small');
  const [brisket, setBrisket] = useState(false);
  const price = size === 'Large' ? 13.5 : 11.5;

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setBrisket(!brisket)}><Text>Extra brisket</Text></Pressable>
      <Text>Price \${price.toFixed(2)}</Text>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [size, setSize] = useState('Small');
  const [brisket, setBrisket] = useState(false);
  const price = (size === 'Large' ? 13.5 : 11.5) + (brisket ? 3 : 0);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setBrisket(!brisket)}><Text>Extra brisket</Text></Pressable>
      <Text>Price \${price.toFixed(2)}</Text>
    </View>
  );
}
`,
        hint: "Add (brisket ? 3 : 0) to the price: const price = (size === 'Large' ? 13.5 : 11.5) + (brisket ? 3 : 0);",
        checks: [
          { message: 'Starts at $11.50', screen: { text: 'Price $11.50' } },
          { message: 'With brisket: $14.50', screen: { tap: ['Extra brisket'], text: 'Price $14.50' } },
          { message: 'Toggled off again: $11.50', screen: { tap: ['Extra brisket', 'Extra brisket'], text: 'Price $11.50' } },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the total calculation.',
        language: 'typescript',
        lines: ["const base = size === 'Large' ? 13.5 : 11.5;", 'const extras = brisket ? 3 : 0;', 'const subtotal = (base + extras) * qty;', 'const tax = subtotal * 0.0825;', 'const total = subtotal + tax;'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Small, no extras, qty 2. What\'s the subtotal?',
        code: "const base = size === 'Large' ? 13.5 : 11.5;\nconst subtotal = (base + 0) * qty;",
        language: 'typescript',
        options: [
          { text: '$11.50', why: 'Two bowls: 11.50 times 2.' },
          { text: '$23.00' },
          { text: '$27.00', why: 'That would be two large.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Store in state, or calculate?',
        groups: ['State', 'Calculate'],
        items: [
          { text: 'Small or Large', group: 0 },
          { text: 'The total', group: 1 },
          { text: 'How many bowls', group: 0 },
          { text: 'The tax', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The total shows $17.86125. Which line needs fixing?',
        language: 'typescript',
        lines: ['const tax = subtotal * 0.0825;', 'const total = subtotal + tax;', '<Text>Total ${total}</Text>'],
        bug: 2,
        fix: '<Text>Total ${total.toFixed(2)}</Text>',
        explanation: 'Money always shows two decimals: toFixed(2).',
      },
    ],
  },
  reflect: {
    prompt: 'In an app you\'d build, what should be stored and what should be calculated? List one of each.',
    starters: ['Store:...', 'Calculate:...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'React\'s docs page "Choosing the State Structure" has a rule called "avoid redundant state": exactly this idea. Also: real apps often store money in cents (1350, not 13.5) to avoid rounding surprises. Film 2 does that.',
  },
  notes: 'Austin, TX combined sales tax rate 8.25% (6.25% state + 2% local), checked at writing; prepared food is taxable in Texas. 16.50 × 0.0825 = 1.36125 → $1.36; total $17.86. Avoided examples where floating-point toFixed rounding surprises (e.g. 18.00 × 0.0825). Cents-based money deferred to Film 2.',
};

export default lesson;
