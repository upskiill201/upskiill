import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Before/After: size chips that show which one is picked (conditional styles). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Small or large?',
  summary: 'Theo\'s size buttons work, but they look identical whether picked or not. A customer taps Large three times "to make sure". See how one line of conditional style fixes it.',
  minutes: 12,
  outcomes: ['Show which option is picked with a conditional style', 'Use the ternary (a ? b : c) inside style', 'Build a two-option chooser from state'],
  learn: [
    {
      kind: 'compare',
      title: 'The size buttons',
      before: {
        label: 'Before: picked or not, they look the same',
        text: "<Pressable style={styles.chip} onPress={() => setSize('Small')}>\n  <Text>Small $11.50</Text>\n</Pressable>\n<Pressable style={styles.chip} onPress={() => setSize('Large')}>\n  <Text>Large $13.50</Text>\n</Pressable>",
      },
      after: {
        label: 'After: the picked one is filled in',
        text: "<Pressable\n  style={[styles.chip, size === 'Large' && styles.chipOn]}\n  onPress={() => setSize('Large')}\n>\n  <Text style={size === 'Large' ? styles.textOn : styles.text}>Large $13.50</Text>\n</Pressable>",
      },
      notes: [
        'size === \'Large\' is true or false. The screen can use it to decide how things look.',
        'In a style array, [styles.chip, size === \'Large\' && styles.chipOn] adds chipOn only when it\'s true. When it\'s false, the false is simply ignored.',
        'The ternary, condition ? a : b, picks one of two values: the white text style when picked, the dark one when not.',
        'Now the customer sees their choice instantly and stops tapping "to make sure".',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Pick a size',
      caption: 'Tap Small and Large and watch the filled chip move. Change chipOn\'s colour and try again.',
      code: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [size, setSize] = useState('Small');

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>Size</Text>
      <View style={styles.row}>
        <Pressable style={[styles.chip, size === 'Small' && styles.chipOn]} onPress={() => setSize('Small')}>
          <Text style={size === 'Small' ? styles.textOn : styles.text}>Small $11.50</Text>
        </Pressable>
        <Pressable style={[styles.chip, size === 'Large' && styles.chipOn]} onPress={() => setSize('Large')}>
          <Text style={size === 'Large' ? styles.textOn : styles.text}>Large $13.50</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12, backgroundColor: '#fff7ed' },
  label: { fontSize: 20, fontWeight: 'bold' },
  row: { flexDirection: 'row', gap: 12 },
  chip: { flex: 1, paddingVertical: 16, borderRadius: 14, borderWidth: 2, borderColor: '#9a3412', alignItems: 'center' },
  chipOn: { backgroundColor: '#9a3412' },
  text: { fontSize: 16, fontWeight: 'bold', color: '#9a3412' },
  textOn: { fontSize: 16, fontWeight: 'bold', color: '#ffffff' },
});
`,
      challenge: 'Start the size as \'Large\' instead. Which chip is filled when the app opens?',
    },
  ],
  apply: {
    scenario: 'Choosing a size.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the customer tap Large three times?',
        options: [
          { text: 'The app was slow', why: 'It was instant, but nothing looked different.' },
          { text: 'Nothing showed which size was picked, so they weren\'t sure it worked' },
          { text: 'They wanted three large bowls', why: 'They wanted one, and to be sure it was large.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fill in the Large chip when it\'s picked: add styles.chipOn with && in its style array',
        starter: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [size, setSize] = useState('Small');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable style={styles.chip} onPress={() => setSize('Large')}>
        <Text>Large $13.50</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { paddingVertical: 16, borderRadius: 14, borderWidth: 2, borderColor: '#9a3412', alignItems: 'center' },
  chipOn: { backgroundColor: '#9a3412' },
});
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [size, setSize] = useState('Small');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable style={[styles.chip, size === 'Large' && styles.chipOn]} onPress={() => setSize('Large')}>
        <Text>Large $13.50</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { paddingVertical: 16, borderRadius: 14, borderWidth: 2, borderColor: '#9a3412', alignItems: 'center' },
  chipOn: { backgroundColor: '#9a3412' },
});
`,
        hint: "style={[styles.chip, size === 'Large' && styles.chipOn]}.",
        checks: [
          { message: 'After a tap, Large is filled rust', screen: { tap: ['Large $13.50'], style: { of: 'Large $13.50', prop: 'backgroundColor', value: '#9a3412' } } },
          { message: 'Not filled before the tap', codeIncludes: "size === 'Large' && styles.chipOn" },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'White text when picked, rust when not.',
        language: 'typescript',
        template: "<Text style={size === 'Large' [[1]] styles.textOn [[2]] styles.text}>",
        blanks: [['?'], [':']],
        distractors: ['&&', '||', '='],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'What happens to false inside a style array?',
        options: [
          { text: 'It crashes.', why: 'React Native ignores false in a style array. That\'s why && works.' },
          { text: 'It\'s ignored. So [styles.chip, picked && styles.chipOn] only adds chipOn when picked is true.' },
          { text: 'It turns the chip red.', why: 'false adds no style at all.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'size is \'Small\'. Which style does this Text get?',
        code: "<Text style={size === 'Large' ? styles.textOn : styles.text}>",
        language: 'typescript',
        options: [
          { text: 'styles.textOn', why: 'size === \'Large\' is false, so the ternary picks the second one.' },
          { text: 'Both', why: 'A ternary picks exactly one.' },
          { text: 'styles.text' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the Small chip work the same way: filled when size is \'Small\', and tapping it sets \'Small\'',
        starter: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [size, setSize] = useState('Large');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable style={styles.chip}>
        <Text>Small $11.50</Text>
      </Pressable>
      <Pressable style={[styles.chip, size === 'Large' && styles.chipOn]} onPress={() => setSize('Large')}>
        <Text>Large $13.50</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { paddingVertical: 16, borderRadius: 14, borderWidth: 2, borderColor: '#9a3412', alignItems: 'center' },
  chipOn: { backgroundColor: '#9a3412' },
});
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [size, setSize] = useState('Large');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable style={[styles.chip, size === 'Small' && styles.chipOn]} onPress={() => setSize('Small')}>
        <Text>Small $11.50</Text>
      </Pressable>
      <Pressable style={[styles.chip, size === 'Large' && styles.chipOn]} onPress={() => setSize('Large')}>
        <Text>Large $13.50</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { paddingVertical: 16, borderRadius: 14, borderWidth: 2, borderColor: '#9a3412', alignItems: 'center' },
  chipOn: { backgroundColor: '#9a3412' },
});
`,
        hint: "Copy the Large chip's pattern: style={[styles.chip, size === 'Small' && styles.chipOn]} and onPress={() => setSize('Small')}.",
        checks: [
          { message: 'Tapping Small fills it', screen: { tap: ['Small $11.50'], style: { of: 'Small $11.50', prop: 'backgroundColor', value: '#9a3412' } } },
          { message: 'Large is filled at the start', screen: { style: { of: 'Large $13.50', prop: 'backgroundColor', value: '#9a3412' } } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it means.',
        pairs: [
          ["size === 'Large'", 'True if Large is picked'],
          ['a && b', 'b only when a is true'],
          ['a ? b : c', 'b if a is true, else c'],
          ['[styles.chip, ...]', 'Combine styles, last wins'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does a Small pho cost? (Like 0.00)',
        answers: ['11.50', '$11.50', '11.5'],
        placeholder: '0.00',
      },
      {
        kind: 'sortGroups',
        prompt: 'When size is \'Large\', true or false?',
        groups: ['True', 'False'],
        items: [
          { text: "size === 'Large'", group: 0 },
          { text: "size === 'Small'", group: 1 },
          { text: "size !== 'Small'", group: 0 },
          { text: "size === 'Medium'", group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Both chips are always filled. Which line is wrong?',
        language: 'typescript',
        lines: ["<Pressable style={[styles.chip, size === 'Small' && styles.chipOn]}>", "<Pressable style={[styles.chip, styles.chipOn]}>", "chipOn: { backgroundColor: '#9a3412' },"],
        bug: 1,
        fix: "<Pressable style={[styles.chip, size === 'Large' && styles.chipOn]}>",
        explanation: 'The Large chip adds chipOn with no condition, so it\'s always filled.',
      },
    ],
  },
  reflect: {
    prompt: 'Find an app with options you pick (sizes, colours, delivery times). How does it show which one is picked?',
    starters: ['The app:...', 'It shows the pick by...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Put the size chooser on your phone and pick sizes with your thumb. Is it obvious, at a glance, which one is chosen?',
  },
  notes: 'Conditional styles: style arrays ignore falsy entries; ternary for either/or values.',
};

export default lesson;
