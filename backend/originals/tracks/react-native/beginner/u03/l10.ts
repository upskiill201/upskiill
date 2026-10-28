import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10. Checkpoint 2: lessons 6–9 plus earlier (conditional styles, toggles, derived totals). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: Mai\'s order',
  summary: 'Mai tests the bowl builder with her usual: large, extra brisket, extra noodles, two of them. She has a calculator open. Check sizes, toggles and totals.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Combine size, extras and quantity into one total', 'Show choices with conditional styles and text'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 8 p.m.',
      beats: [
        { speaker: 'mai', text: 'Large. Extra brisket. Two bowls. If your total is off by one cent, I\'m telling Mum.' },
        { speaker: 'theo', text: 'It\'s calculated from the choices. It can\'t be off.' },
        { speaker: 'mai', text: '(typing on her calculator) We\'ll see.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: choices and totals.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the total: size (Small 11.5 / Large 13.5), brisket toggle (+3), and a "+ bowl" button. Large + brisket + 2 bowls shows "Subtotal $33.00"',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [size, setSize] = useState('Small');
  const [brisket, setBrisket] = useState(false);
  const [qty, setQty] = useState(1);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setSize('Large')}><Text>Large</Text></Pressable>
      <Pressable onPress={() => setBrisket(!brisket)}><Text>Extra brisket</Text></Pressable>
      <Pressable onPress={() => setQty(qty + 1)}><Text>+ bowl</Text></Pressable>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [size, setSize] = useState('Small');
  const [brisket, setBrisket] = useState(false);
  const [qty, setQty] = useState(1);

  const base = size === 'Large' ? 13.5 : 11.5;
  const subtotal = (base + (brisket ? 3 : 0)) * qty;

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setSize('Large')}><Text>Large</Text></Pressable>
      <Pressable onPress={() => setBrisket(!brisket)}><Text>Extra brisket</Text></Pressable>
      <Pressable onPress={() => setQty(qty + 1)}><Text>+ bowl</Text></Pressable>
      <Text>Subtotal \${subtotal.toFixed(2)}</Text>
    </View>
  );
}
`,
        hint: "const base = size === 'Large' ? 13.5 : 11.5; const subtotal = (base + (brisket ? 3 : 0)) * qty; then show it with toFixed(2).",
        checks: [
          { message: 'Starts at $11.50', screen: { text: 'Subtotal $11.50' } },
          { message: 'Mai\'s order: $33.00', screen: { tap: ['Large', 'Extra brisket', '+ bowl'], text: 'Subtotal $33.00' } },
          { message: 'Calculated, not stored', codeIncludes: 'const subtotal' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Mai\'s order is $33.00 before tax. What\'s 8.25% tax on it, to the cent?',
        options: [
          { text: '$2.72' },
          { text: '$3.30', why: 'That\'s 10%. Austin\'s rate is 8.25%: $2.72.' },
          { text: '$8.25', why: 'That\'s the rate, not the tax on $33.00.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool for each job?',
        groups: ['Conditional style', 'Conditional text'],
        items: [
          { text: 'Fill the Large chip when picked', group: 0 },
          { text: 'Show "+ extra brisket" only when on', group: 1 },
          { text: 'White text on the picked chip', group: 0 },
          { text: '"With onions" or "No onions"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s answer.',
        from: 'mai',
        message: 'My calculator says $35.72 with tax. What does yours say?',
        options: [
          { text: '$33.00.', why: 'That\'s before tax.' },
          { text: '$35.72. Same as yours, because it\'s calculated from the same choices.' },
          { text: '$36.30.', why: 'That would be 10% tax.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The filled chip.',
        language: 'typescript',
        template: "style={[styles.chip, size === 'Large' [[1]] styles.[[2]]]}",
        blanks: [['&&'], ['chipOn']],
        distractors: ['||', 'chip', '?'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the choice to how it changes the price.',
        pairs: [
          ['Large', '13.50 instead of 11.50'],
          ['Extra brisket', '+3.00'],
          ['Extra noodles', '+1.50'],
          ['No onions', 'Nothing: it\'s free'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'noodles is true. What does this show?',
        code: '{noodles && <Text>+ extra noodles</Text>}\n{!noodles && <Text>No extras</Text>}',
        language: 'typescript',
        options: [
          { text: '"No extras"', why: '!noodles is false, so that line hides.' },
          { text: 'Both lines', why: 'Only one condition is true.' },
          { text: '"+ extra noodles"' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the brisket button show its state: "Brisket: on" or "Brisket: off"',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [brisket, setBrisket] = useState(false);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Pressable onPress={() => setBrisket(!brisket)}>
        <Text>Brisket</Text>
      </Pressable>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [brisket, setBrisket] = useState(false);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Pressable onPress={() => setBrisket(!brisket)}>
        <Text>{brisket ? 'Brisket: on' : 'Brisket: off'}</Text>
      </Pressable>
    </View>
  );
}
`,
        hint: "<Text>{brisket ? 'Brisket: on' : 'Brisket: off'}</Text>",
        checks: [
          { message: 'Starts "Brisket: off"', screen: { text: 'Brisket: off' } },
          { message: 'A tap shows "Brisket: on"', screen: { tap: ['Brisket: off'], text: 'Brisket: on' } },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Mai\'s order with tax, to the cent? (Like 0.00)',
        answers: ['35.72', '$35.72'],
        placeholder: '0.00',
      },
      {
        kind: 'mcq',
        prompt: 'Did Mai tell Linh?',
        options: [
          { text: 'Yes: the total was a cent off', why: 'It matched to the cent.' },
          { text: 'No. She just said: "Fine. Now let me write \'two limes\' somewhere."' },
          { text: 'She deleted the app', why: 'She wants to add notes.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Work out one order from Pho Real\'s menu by hand, with 8.25% tax. Then check it with the app you built.',
    starters: ['My order:...', 'By hand:...', 'The app:...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 6–9. 33.00 × 0.0825 = 2.7225 → $2.72; total 35.7225 → $35.72.',
};

export default lesson;
