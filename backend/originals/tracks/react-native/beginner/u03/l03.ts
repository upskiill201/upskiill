import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Walkthrough: a quantity stepper (- / +) with limits, using a function for onPress. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Minus, plus',
  summary: 'The construction crew always orders six bowls at once. Theo builds a minus and plus stepper, and Mai immediately finds you can order minus four bowls. Step by step to a stepper that makes sense.',
  minutes: 13,
  outcomes: ['Build a minus/plus stepper with state', 'Write a handler function for onPress', 'Keep values within limits (no negative bowls)'],
  learn: [
    {
      kind: 'steps',
      title: 'Building the stepper',
      steps: [
        {
          title: '1. One state for the quantity',
          body: 'Start at 1: nobody opens the app to order zero bowls.',
          code: 'const [qty, setQty] = useState(1);',
          language: 'typescript',
        },
        {
          title: '2. Two buttons, two changes',
          body: 'Minus takes one away, plus adds one. Each button\'s onPress calls setQty with the new number.',
          code: '<Pressable onPress={() => setQty(qty - 1)}><Text>-</Text></Pressable>\n<Text>{qty}</Text>\n<Pressable onPress={() => setQty(qty + 1)}><Text>+</Text></Pressable>',
          language: 'typescript',
        },
        {
          title: '3. Mai breaks it',
          body: 'She taps minus five times: "-4 bowls". The code did exactly what it was told. Real apps need limits.',
        },
        {
          title: '4. Move the logic into a handler',
          body: 'When onPress needs more than one line, give it a named function inside App. Here: only go down if there\'s more than 1.',
          code: 'function less() {\n  if (qty > 1) setQty(qty - 1);\n}\n\n<Pressable onPress={less}>',
          language: 'typescript',
        },
        {
          title: '5. A top limit too',
          body: 'Linh\'s rule: 10 bowls per order, more and you call the truck. function more() { if (qty < 10) setQty(qty + 1); }',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The stepper',
      caption: 'Tap minus until it stops at 1, then plus until it stops at 10.',
      code: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [qty, setQty] = useState(1);

  function less() {
    if (qty > 1) setQty(qty - 1);
  }

  function more() {
    if (qty < 10) setQty(qty + 1);
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>How many bowls?</Text>
      <View style={styles.stepper}>
        <Pressable style={styles.step} onPress={less}><Text style={styles.stepText}>-</Text></Pressable>
        <Text style={styles.qty}>{qty}</Text>
        <Pressable style={styles.step} onPress={more}><Text style={styles.stepText}>+</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 16, backgroundColor: '#fff7ed' },
  label: { fontSize: 20, fontWeight: 'bold' },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  step: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#9a3412', alignItems: 'center', justifyContent: 'center' },
  stepText: { color: '#ffffff', fontSize: 28, fontWeight: 'bold' },
  qty: { fontSize: 32, fontWeight: 'bold', minWidth: 40, textAlign: 'center' },
});
`,
      challenge: 'Change the top limit to 6, the crew\'s usual order.',
    },
  ],
  apply: {
    scenario: 'Six bowls for the crew.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the stepper\'s code in order.',
        language: 'typescript',
        lines: ['const [qty, setQty] = useState(1);', 'function less() {', '  if (qty > 1) setQty(qty - 1);', '}', '<Pressable onPress={less}><Text>-</Text></Pressable>'],
      },
      {
        kind: 'writeCode',
        prompt: 'Build the stepper: a "-" and a "+" button around "Bowls: 1"; three taps on + make "Bowls: 4"',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [qty, setQty] = useState(1);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>Bowls: {qty}</Text>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [qty, setQty] = useState(1);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Pressable onPress={() => setQty(qty - 1)}><Text>-</Text></Pressable>
      <Text>Bowls: {qty}</Text>
      <Pressable onPress={() => setQty(qty + 1)}><Text>+</Text></Pressable>
    </View>
  );
}
`,
        hint: 'One Pressable with <Text>-</Text> and setQty(qty - 1), one with <Text>+</Text> and setQty(qty + 1).',
        checks: [
          { message: 'Three taps on + show 4', screen: { tap: ['+', '+', '+'], text: 'Bowls: 4' } },
          { message: 'A - button', screen: { button: '-' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Mai ordered "-4 bowls". Why did the app allow it?',
        options: [
          { text: 'React has a bug', why: 'React did exactly what the code said.' },
          { text: 'The code subtracted one every time, with nothing stopping it at 1' },
          { text: 'Mai\'s phone is broken', why: 'Any phone would do the same. The code needed a limit.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add the limit: the "-" button must never go below 1 (use a less() function with if)',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [qty, setQty] = useState(1);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Pressable onPress={() => setQty(qty - 1)}><Text>-</Text></Pressable>
      <Text>Bowls: {qty}</Text>
      <Pressable onPress={() => setQty(qty + 1)}><Text>+</Text></Pressable>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [qty, setQty] = useState(1);

  function less() {
    if (qty > 1) setQty(qty - 1);
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Pressable onPress={less}><Text>-</Text></Pressable>
      <Text>Bowls: {qty}</Text>
      <Pressable onPress={() => setQty(qty + 1)}><Text>+</Text></Pressable>
    </View>
  );
}
`,
        hint: 'Inside App: function less() { if (qty > 1) setQty(qty - 1); } and onPress={less} on the - button.',
        checks: [
          { message: 'Three taps on - stay at 1', screen: { tap: ['-', '-', '-'], text: 'Bowls: 1' } },
          { message: 'Plus still works', screen: { tap: ['+'], text: 'Bowls: 2' } },
          { message: 'Never shows a negative', screen: { tap: ['-', '-'], noText: 'Bowls: -' } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The top limit.',
        language: 'typescript',
        template: 'function more() {\n  if (qty [[1]] 10) setQty(qty [[2]] 1);\n}',
        blanks: [['<'], ['+']],
        distractors: ['>', '-', '='],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'Why stop at ten? More bowls is more money.',
        options: [
          { text: 'No reason.', why: 'Linh made the rule herself: big orders need a call.' },
          { text: 'Your rule, Mum: over ten, they call the truck so Ray isn\'t buried during the rush.' },
          { text: 'Phones can\'t count past ten.', why: 'They can. It\'s a business rule.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'When should onPress get a named function instead of an arrow on one line?',
        options: [
          { text: 'When it needs more than one simple step, like an if' },
          { text: 'Never', why: 'Named handlers keep longer logic readable.' },
          { text: 'Only for the + button', why: 'Any button whose logic grows.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the most bowls Linh allows per order?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it does.',
        pairs: [
          ['useState(1)', 'Starts the quantity at 1'],
          ['if (qty > 1)', 'Stops it going below 1'],
          ['onPress={less}', 'Runs less() on a tap'],
          ['setQty(qty + 1)', 'Adds one bowl'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The - button runs straight away, before anyone taps it. Which line?',
        language: 'typescript',
        lines: ['function less() {', '  if (qty > 1) setQty(qty - 1);', '}', '<Pressable onPress={less()}><Text>-</Text></Pressable>'],
        bug: 3,
        fix: '<Pressable onPress={less}><Text>-</Text></Pressable>',
        explanation: 'less() with brackets CALLS the function now. onPress needs the function itself: onPress={less}.',
      },
    ],
  },
  reflect: {
    prompt: 'What limits would your own app need (minimum, maximum, things that make no sense)? Write two.',
    starters: ['Never less than...', 'Never more than...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Put the stepper on your phone and hand it to someone who likes breaking things. Can they find a way past the limits?',
  },
  notes: 'Event handlers: pass the function (onPress={less}), not the call (onPress={less()}), a classic React mistake. Linh\'s 10-bowl cap is a fictional business rule.',
};

export default lesson;
