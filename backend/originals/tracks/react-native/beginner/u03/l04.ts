import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Myth or Fact: how state behaves (redraws, independence, resets, replacing values). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'State myths',
  summary: 'Theo\'s stepper works, and he has theories about why. Some are right. Some will bite him at the festival. Myth or fact, round three.',
  minutes: 11,
  outcomes: ['Know what happens when state changes', 'Know each component remembers its own state', 'Know state is lost when the app restarts (for now)'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Changing a normal variable updates the screen.', isFact: false, explain: 'Only the setter from useState tells React to redraw. A normal variable changes silently.' },
        { text: 'When state changes, the component runs again and draws the screen with the new value.', isFact: true, explain: 'That\'s how the Text shows "Bowls: 3": App ran again with bowls equal to 3.' },
        { text: 'Two copies of the same component share one state.', isFact: false, explain: 'Each copy remembers its own. Two steppers on screen count separately.' },
        { text: 'State survives when you close and reopen the app.', isFact: false, explain: 'useState lives in memory. Close the app and it starts again from the starting value. Saving to the phone is Chapter 5.' },
        { text: 'setSize(\'Large\') replaces the old value completely.', isFact: true, explain: 'The new value takes over. For objects, that matters: lesson 14 shows how to change one field and keep the rest.' },
        { text: 'You can have as many useState lines in one component as you need.', isFact: true, explain: 'One for size, one for brisket, one for quantity. Each is separate.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Two steppers, two memories',
      caption: 'The same Stepper component is used twice. Tap each one: they count separately.',
      code: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function Stepper({ label }: { label: string }) {
  const [qty, setQty] = useState(0);
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}: {qty}</Text>
      <Pressable style={styles.plus} onPress={() => setQty(qty + 1)}><Text style={styles.plusText}>+ {label}</Text></Pressable>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.screen}>
      <Stepper label="Pho" />
      <Stepper label="Banh mi" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 16, backgroundColor: '#fff7ed' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  label: { fontSize: 20, fontWeight: 'bold' },
  plus: { backgroundColor: '#9a3412', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12 },
  plusText: { color: '#ffffff', fontWeight: 'bold' },
});
`,
      challenge: 'Tap Restart above the phone. Where did your counts go?',
    },
  ],
  apply: {
    scenario: 'Theo\'s theories about state.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'The setter makes the screen redraw', group: 0 },
          { text: 'State is kept after the app restarts', group: 1 },
          { text: 'Each copy of a component has its own state', group: 0 },
          { text: 'A normal variable updates the screen', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Two Stepper components are on screen. You tap the first one\'s plus. What happens to the second?',
        options: [
          { text: 'It goes up too', why: 'Each copy has its own state.' },
          { text: 'It goes down', why: 'Nothing links them. It doesn\'t change.' },
          { text: 'Nothing: it has its own, separate state' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Use the Stepper twice: one labelled "Pho" and one labelled "Spring rolls"',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

function Stepper({ label }: { label: string }) {
  const [qty, setQty] = useState(0);
  return (
    <Pressable onPress={() => setQty(qty + 1)}>
      <Text>{label}: {qty}</Text>
    </Pressable>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>

    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

function Stepper({ label }: { label: string }) {
  const [qty, setQty] = useState(0);
  return (
    <Pressable onPress={() => setQty(qty + 1)}>
      <Text>{label}: {qty}</Text>
    </Pressable>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Stepper label="Pho" />
      <Stepper label="Spring rolls" />
    </View>
  );
}
`,
        hint: '<Stepper label="Pho" /> and <Stepper label="Spring rolls" /> inside the View.',
        checks: [
          { message: 'Tapping Pho twice shows "Pho: 2"', screen: { tap: ['Pho: 0', 'Pho: 1'], text: 'Pho: 2' } },
          { message: '...and Spring rolls stays at 0', screen: { tap: ['Pho: 0', 'Pho: 1'], text: 'Spring rolls: 0' } },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'I closed the app and my order disappeared. Is it broken?',
        options: [
          { text: 'Yes, completely broken.', why: 'It\'s expected for now: state lives in memory.' },
          { text: 'You shouldn\'t close apps.', why: 'People always close apps. Saving is coming.' },
          { text: 'Not broken: right now it only remembers while it\'s open. Saving to the phone comes before the festival.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the screen show after one tap?',
        code: "let size = 'Small';\n<Text>{size}</Text>\n<Pressable onPress={() => { size = 'Large'; }}>",
        language: 'typescript',
        options: [
          { text: 'Small: a normal variable never redraws the screen' },
          { text: 'Large', why: 'Nothing told React to redraw. It still shows Small.' },
          { text: 'An error', why: 'No error, just no update.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Three separate pieces of state.',
        language: 'typescript',
        template: "const [size, setSize] = useState('Small');\nconst [brisket, setBrisket] = useState([[1]]);\nconst [qty, setQty] = useState([[2]]);",
        blanks: [['false'], ['1']],
        distractors: ['"no"', '0.5', 'null'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to what happens.',
        pairs: [
          ['Call the setter', 'The component runs again'],
          ['Change a normal variable', 'Nothing on screen changes'],
          ['Close the app', 'State starts over'],
          ['Two copies of a component', 'Two separate states'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which chapter does the app learn to save to the phone? (A number.)',
        answers: ['5', 'five', 'chapter 5'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'How many useState lines can one component have?',
        options: [
          { text: 'Only one', why: 'As many as it needs, each for one value.' },
          { text: 'As many as it needs' },
          { text: 'Two at most', why: 'There\'s no limit like that.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line is a myth written as code?',
        language: 'typescript',
        lines: ['const [qty, setQty] = useState(1);', '<Text>{qty}</Text>', '// qty will still be 5 after the app restarts'],
        bug: 2,
        fix: '// qty starts again at 1 when the app restarts',
        explanation: 'State lives in memory: a restart begins from the starting value.',
      },
    ],
  },
  reflect: {
    prompt: 'Which state myth did you believe before this lesson? How would it have broken an app?',
    starters: ['I believed...', 'It would have broken...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'React\'s docs: "State is isolated and private" (in "State: A Component\'s Memory") shows two copies of a component with separate state.',
  },
  notes: 'State is per component instance; resets on reload/unmount; setter replaces value (objects need spreading). Persistence (AsyncStorage) planned for Chapter 5.',
};

export default lesson;
