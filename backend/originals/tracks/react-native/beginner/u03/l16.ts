import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 16. Cards: the bowl builder with a reusable OptionChip (selected + onPress callback props). */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'The bowl builder',
  summary: 'Small, Large, Extra brisket, Extra noodles, No onions: five chips, five copies of the same twenty lines. Theo makes one OptionChip and lets the screen tell it what to do.',
  minutes: 13,
  outcomes: ['Make a reusable chip component', 'Pass a selected prop to style it', 'Pass a function as a prop (a callback) so the parent decides what a tap does'],
  learn: [
    {
      kind: 'text',
      html: '<p>Every chip in the bowl builder looks the same and behaves the same: a rounded pill that fills in rust when it\'s picked. Only three things change: its <strong>label</strong>, whether it\'s <strong>selected</strong>, and <strong>what happens when you tap it</strong>.</p><p>So those become props:</p><pre><code>function OptionChip({ label, selected, onPress }: {\n  label: string;\n  selected: boolean;\n  onPress: () =&gt; void;\n}) {\n  return (\n    &lt;Pressable style={[styles.chip, selected &amp;&amp; styles.chipOn]} onPress={onPress}&gt;\n      &lt;Text style={[styles.chipText, selected &amp;&amp; styles.chipTextOn]}&gt;{label}&lt;/Text&gt;\n    &lt;/Pressable&gt;\n  );\n}</code></pre><p>The chip doesn\'t know about orders, sizes or brisket. It just draws itself and calls <code>onPress</code> when tapped. A function passed as a prop like this is called a <strong>callback</strong>.</p><p>The screen, which owns the order, decides everything:</p><pre><code>&lt;OptionChip\n  label="Large"\n  selected={order.size === \'Large\'}\n  onPress={() =&gt; setOrder({ ...order, size: \'Large\' })}\n/&gt;</code></pre><p>The state lives in one place (App). The chips just show it and report taps. Data goes <strong>down</strong> as props; taps come <strong>up</strong> through callbacks.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The parent owns the state. Children get values as props and call callbacks when something happens.',
    },
    {
      kind: 'tryIt',
      title: 'Five chips, one component',
      caption: 'Tap the sizes and extras. Every chip is the same OptionChip with different props.',
      code: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function OptionChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable style={[styles.chip, selected && styles.chipOn]} onPress={onPress}>
      <Text style={[styles.chipText, selected && styles.chipTextOn]}>{label}</Text>
    </Pressable>
  );
}

export default function App() {
  const [order, setOrder] = useState({ size: 'Small', brisket: false, noodles: false, noOnions: false });

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Size</Text>
      <View style={styles.row}>
        <OptionChip label="Small" selected={order.size === 'Small'} onPress={() => setOrder({ ...order, size: 'Small' })} />
        <OptionChip label="Large" selected={order.size === 'Large'} onPress={() => setOrder({ ...order, size: 'Large' })} />
      </View>
      <Text style={styles.heading}>Extras</Text>
      <View style={styles.row}>
        <OptionChip label="Extra brisket" selected={order.brisket} onPress={() => setOrder({ ...order, brisket: !order.brisket })} />
        <OptionChip label="Extra noodles" selected={order.noodles} onPress={() => setOrder({ ...order, noodles: !order.noodles })} />
        <OptionChip label="No onions" selected={order.noOnions} onPress={() => setOrder({ ...order, noOnions: !order.noOnions })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12, backgroundColor: '#fff7ed' },
  heading: { fontSize: 18, fontWeight: 'bold', color: '#1c1917' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 999, borderWidth: 2, borderColor: '#9a3412' },
  chipOn: { backgroundColor: '#9a3412' },
  chipText: { fontSize: 16, color: '#9a3412', fontWeight: 'bold' },
  chipTextOn: { color: '#ffffff' },
});
`,
      challenge: 'Add a sixth chip, "Extra lime", without writing any new chip styles.',
    },
  ],
  apply: {
    scenario: 'One chip, many choices.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does OptionChip take onPress as a prop instead of calling setOrder itself?',
        options: [
          { text: 'Components can\'t call functions', why: 'They can. The point is who owns the order.' },
          { text: 'Pressable doesn\'t allow setters', why: 'It does. This is about design.' },
          { text: 'The chip doesn\'t own the order. App does, so App decides what each tap changes' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Finish OptionChip: fill it rust (#9a3412) when selected, and call onPress when tapped. Tapping Large fills it',
        starter: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function OptionChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable style={styles.chip}>
      <Text>{label}</Text>
    </Pressable>
  );
}

export default function App() {
  const [size, setSize] = useState('Small');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <OptionChip label="Small" selected={size === 'Small'} onPress={() => setSize('Small')} />
      <OptionChip label="Large" selected={size === 'Large'} onPress={() => setSize('Large')} />
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { padding: 12, borderRadius: 999, borderWidth: 2, borderColor: '#9a3412' },
  chipOn: { backgroundColor: '#9a3412' },
});
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function OptionChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable style={[styles.chip, selected && styles.chipOn]} onPress={onPress}>
      <Text>{label}</Text>
    </Pressable>
  );
}

export default function App() {
  const [size, setSize] = useState('Small');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <OptionChip label="Small" selected={size === 'Small'} onPress={() => setSize('Small')} />
      <OptionChip label="Large" selected={size === 'Large'} onPress={() => setSize('Large')} />
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { padding: 12, borderRadius: 999, borderWidth: 2, borderColor: '#9a3412' },
  chipOn: { backgroundColor: '#9a3412' },
});
`,
        hint: 'style={[styles.chip, selected && styles.chipOn]} and onPress={onPress} on the Pressable.',
        checks: [
          { message: 'Small starts filled', screen: { style: { of: 'Small', prop: 'backgroundColor', value: '#9a3412' } } },
          { message: 'Tapping Large fills it', screen: { tap: ['Large'], style: { of: 'Large', prop: 'backgroundColor', value: '#9a3412' } } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each prop to its job.',
        pairs: [
          ['label', 'The words on the chip'],
          ['selected', 'Filled or outlined'],
          ['onPress', 'What App does on a tap'],
          ['() => void', 'The type of a function with no result'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'Can the chips remember if they\'re picked by themselves? Seems simpler.',
        options: [
          { text: 'Then App wouldn\'t know what\'s picked, and the total couldn\'t use it. App keeps the order; chips just show it.' },
          { text: 'Yes, let\'s give every chip its own useState.', why: 'Then the order is scattered across five chips and the total can\'t see it.' },
          { text: 'Chips can\'t have state.', why: 'They can. It\'s just the wrong place for the order.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The Large chip.',
        language: 'typescript',
        template: "<OptionChip label=\"Large\" [[1]]={order.size === 'Large'} [[2]]={() => setOrder({ ...order, size: 'Large' })} />",
        blanks: [['selected'], ['onPress']],
        distractors: ['style', 'onChange', 'value'],
      },
      {
        kind: 'writeCode',
        prompt: 'Add an "Extra lime" chip that toggles order.lime, and a line "Lime: yes" or "Lime: no"',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

function OptionChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={{ padding: 12, borderWidth: 2, backgroundColor: selected ? '#9a3412' : '#ffffff' }}>
      <Text>{label}</Text>
    </Pressable>
  );
}

export default function App() {
  const [order, setOrder] = useState({ size: 'Small', lime: false });

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>

    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

function OptionChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={{ padding: 12, borderWidth: 2, backgroundColor: selected ? '#9a3412' : '#ffffff' }}>
      <Text>{label}</Text>
    </Pressable>
  );
}

export default function App() {
  const [order, setOrder] = useState({ size: 'Small', lime: false });

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <OptionChip label="Extra lime" selected={order.lime} onPress={() => setOrder({ ...order, lime: !order.lime })} />
      <Text>Lime: {order.lime ? 'yes' : 'no'}</Text>
    </View>
  );
}
`,
        hint: "<OptionChip label=\"Extra lime\" selected={order.lime} onPress={() => setOrder({ ...order, lime: !order.lime })} /> and <Text>Lime: {order.lime ? 'yes' : 'no'}</Text>.",
        checks: [
          { message: 'Starts "Lime: no"', screen: { text: 'Lime: no' } },
          { message: 'A tap shows "Lime: yes"', screen: { tap: ['Extra lime'], text: 'Lime: yes' } },
          { message: 'And fills the chip', screen: { tap: ['Extra lime'], style: { of: 'Extra lime', prop: 'backgroundColor', value: '#9a3412' } } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Where does it live?',
        groups: ['In App (the parent)', 'In OptionChip'],
        items: [
          { text: 'The order state', group: 0 },
          { text: 'The pill shape style', group: 1 },
          { text: 'What a tap changes', group: 0 },
          { text: 'Rust fill when selected', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do we call a function passed to a component as a prop, to run later?',
        answers: ['callback', 'a callback', 'callback function'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'order.brisket is false. Tap this chip twice. What is order.brisket?',
        code: "<OptionChip label=\"Extra brisket\" selected={order.brisket}\n  onPress={() => setOrder({ ...order, brisket: !order.brisket })} />",
        language: 'typescript',
        options: [
          { text: 'true', why: 'Two flips: false to true to false.' },
          { text: 'false' },
          { text: 'undefined', why: '...order keeps everything; brisket just flips.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tapping a chip does nothing at all. Which line is wrong?',
        language: 'typescript',
        lines: ['function OptionChip({ label, selected, onPress }: ChipProps) {', '  return (', '    <Pressable style={[styles.chip, selected && styles.chipOn]}>', '      <Text>{label}</Text>', '    </Pressable>'],
        bug: 2,
        fix: '    <Pressable style={[styles.chip, selected && styles.chipOn]} onPress={onPress}>',
        explanation: 'The chip receives onPress but never gives it to the Pressable. Pass it on: onPress={onPress}.',
      },
    ],
  },
  reflect: {
    prompt: 'Which repeated thing in your own app could be one component with props? What would its props be?',
    starters: ['The component:...', 'Props:...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Build the full bowl builder on your phone with OptionChip. Check the chips wrap onto two lines on a narrow phone (flexWrap: \'wrap\').',
  },
  notes: 'Props and callbacks; lifting state up (React docs: "Sharing State Between Components"). Data down, events up.',
};

export default lesson;
