import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Chat with Tey: useState line by line (value, setter, initial value, redraw). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What useState really does',
  summary: 'Theo got the counter working by copying it. Arjun asks him to explain the useState line out loud, and he can\'t. Tey takes it apart, one piece at a time.',
  minutes: 12,
  outcomes: ['Read const [value, setValue] = useState(start)', 'Know that calling the setter redraws the screen', 'Use state for a number, text or true/false'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'const [bowls, setBowls] = useState(0). Four pieces. Want them one at a time?', replies: ['Yes please', 'Start with useState'] },
        { tey: 'useState(0) says: "React, please remember a value for this screen, starting at 0." It comes from \'react\', so it\'s imported at the top.', replies: ['And the square brackets?'] },
        { tey: 'useState gives back two things: the current value, and a function to change it. [bowls, setBowls] names them. You pick the names; value and setValue is the habit.', replies: ['Why not just bowls = bowls + 1?'] },
        { tey: 'Because a normal variable changes quietly and the screen never finds out. setBowls(3) does two jobs: it stores 3 AND tells React to redraw the screen with it.', replies: ['So the whole App runs again?'] },
        { tey: 'Exactly. App runs again, this time bowls is 3, and the Text shows "Bowls: 3". State can be a number, text (\'Large\'), or true/false (onions or no onions). Same idea every time.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Three kinds of state',
      caption: 'A number, some text and a true/false, each with its own setter. Tap the buttons and watch each value change.',
      code: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [bowls, setBowls] = useState(1);
  const [size, setSize] = useState('Small');
  const [onions, setOnions] = useState(true);

  return (
    <View style={styles.screen}>
      <Text style={styles.line}>{bowls} x {size} pho</Text>
      <Text style={styles.line}>{onions ? 'With onions' : 'No onions'}</Text>
      <Pressable style={styles.button} onPress={() => setBowls(bowls + 1)}><Text style={styles.label}>One more</Text></Pressable>
      <Pressable style={styles.button} onPress={() => setSize('Large')}><Text style={styles.label}>Make it large</Text></Pressable>
      <Pressable style={styles.button} onPress={() => setOnions(false)}><Text style={styles.label}>No onions</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12, backgroundColor: '#fff7ed' },
  line: { fontSize: 22, fontWeight: 'bold', color: '#1c1917' },
  button: { backgroundColor: '#9a3412', paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  label: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
});
`,
      challenge: 'Add a button "Back to small" that sets size back to \'Small\'.',
    },
  ],
  apply: {
    scenario: 'useState, piece by piece.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each piece of the line to its job.',
        pairs: [
          ['useState', 'Asks React to remember a value'],
          ['(0)', 'The starting value'],
          ['bowls', 'The value right now'],
          ['setBowls', 'Changes it and redraws'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why doesn\'t bowls = bowls + 1 update the screen?',
        options: [
          { text: 'It does, just slowly', why: 'It never does: React isn\'t told anything changed.' },
          { text: 'A normal change doesn\'t tell React to redraw. Only the setter does.' },
          { text: 'Because bowls is a const', why: 'That\'s true too, but the real reason is React never hears about it.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add state for the size, starting at \'Small\', and a "Make it large" button that sets it to \'Large\'',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>Size: Small</Text>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [size, setSize] = useState('Small');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>Size: {size}</Text>
      <Pressable onPress={() => setSize('Large')}>
        <Text>Make it large</Text>
      </Pressable>
    </View>
  );
}
`,
        hint: 'const [size, setSize] = useState(\'Small\'); show {size} in the Text; a Pressable with onPress={() => setSize(\'Large\')}.',
        checks: [
          { message: 'Starts as "Size: Small"', screen: { text: 'Size: Small' } },
          { message: 'Tapping makes it "Size: Large"', screen: { tap: ['Make it large'], text: 'Size: Large' } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A true/false state for onions.',
        language: 'typescript',
        template: 'const [onions, [[1]]] = useState([[2]]);',
        blanks: [['setOnions'], ['true']],
        distractors: ['changeOnions', '"yes"', 'onions'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s explanation.',
        from: 'arjun',
        message: 'Okay. What happens, exactly, when someone taps "One more"?',
        options: [
          { text: 'setBowls stores the new number and React runs App again, so the Text shows it.' },
          { text: 'The phone refreshes the whole app from scratch.', why: 'Only this screen redraws, and state is kept.' },
          { text: 'The button changes the Text directly.', why: 'Buttons change state; the Text just shows the state.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'What kind of state is it?',
        groups: ['Number', 'Text or true/false'],
        items: [
          { text: 'How many bowls', group: 0 },
          { text: 'Small or Large', group: 1 },
          { text: 'Onions on or off', group: 1 },
          { text: 'How many extra limes', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the screen say after one tap?',
        code: "const [size, setSize] = useState('Small');\n<Text>Size: {size}</Text>\n<Pressable onPress={() => setSize('Large')}>",
        language: 'typescript',
        options: [
          { text: 'Size: Small', why: 'The tap sets size to Large and the screen redraws.' },
          { text: 'Size: size', why: 'Braces show the value, not the name.' },
          { text: 'Size: Large' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do you import useState from? (One word.)',
        answers: ['react', "'react'"],
        placeholder: 'package',
      },
      {
        kind: 'writeCode',
        prompt: 'Add an onions state (start true) and a "No onions" button; the screen should say "No onions" after the tap',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [onions, setOnions] = useState(true);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>{onions ? 'With onions' : 'No onions'}</Text>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [onions, setOnions] = useState(true);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>{onions ? 'With onions' : 'No onions'}</Text>
      <Pressable onPress={() => setOnions(false)}>
        <Text>Hold the onions</Text>
      </Pressable>
    </View>
  );
}
`,
        hint: 'Add a Pressable with onPress={() => setOnions(false)} and a label like "Hold the onions".',
        checks: [
          { message: 'Starts "With onions"', screen: { text: 'With onions' } },
          { message: 'A tap on the button makes it "No onions"', screen: { tap: ['Hold the onions'], text: 'No onions' } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The count never changes on screen. Which line is the bug?',
        language: 'typescript',
        lines: ['let bowls = 0;', '<Text>Bowls: {bowls}</Text>', '<Pressable onPress={() => { bowls = bowls + 1; }}>'],
        bug: 2,
        fix: "const [bowls, setBowls] = useState(0); ... onPress={() => setBowls(bowls + 1)}",
        explanation: 'Changing a normal variable never tells React to redraw. Use state and its setter.',
      },
    ],
  },
  reflect: {
    prompt: 'Explain useState out loud, as Theo did for Arjun, in two sentences. Then write them down.',
    starters: ['useState...', 'When I call the setter...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'React\'s docs page "State: A Component\'s Memory" explains exactly why a normal variable isn\'t enough, with interactive examples.',
  },
  notes: 'useState semantics: returns [value, setter]; setter schedules a re-render with the new value. The tryIt label "One more" etc. In writeCode 4 the button label must be "Hold the onions" (the check taps it); "No onions" is the resulting text.',
};

export default lesson;
