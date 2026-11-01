import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 11. Chat with Tey: TextInput for the customer's name (value, onChangeText, placeholder). */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Whose order is it?',
  summary: 'Ray calls order numbers, but when two people both ordered a large pho, a name settles it. Theo needs a box where customers type their name. Tey introduces TextInput.',
  minutes: 12,
  outcomes: ['Let people type with TextInput', 'Keep what they type in state with value and onChangeText', 'Use the typed text elsewhere on the screen'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Two large phos, two hungry people, one shout of "41!". A name on the order fixes it. How does the app get a name?', replies: ['A text box?', 'Ask them?'] },
        { tey: 'A text box: TextInput, from \'react-native\'. It shows the phone\'s keyboard and lets people type. On its own it remembers nothing, so we pair it with state.', replies: ['Like the bowl count?'] },
        { tey: 'Exactly. const [name, setName] = useState(\'\'). Then <TextInput value={name} onChangeText={setName} />. Every key press calls setName with the new text.', replies: ['Why value={name}?'] },
        { tey: 'So the box always shows what\'s in state. The box and the state agree, always. Developers call it a "controlled" input.', replies: ['And the grey hint text?'] },
        { tey: 'placeholder="Your name". It disappears as soon as they type. Then you can use name anywhere: <Text>Order for {name}</Text>. Give the box a border and padding, or nobody will see it\'s a box.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Type your name',
      caption: 'Tap the box in the phone and type a name. The line underneath updates as you type.',
      code: `import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function App() {
  const [name, setName] = useState('');

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>Name for the order</Text>
      <TextInput style={styles.input} placeholder="Your name" value={name} onChangeText={setName} />
      <Text style={styles.preview}>{name ? 'Order for ' + name : 'Who is this order for?'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12, backgroundColor: '#fff7ed' },
  label: { fontSize: 16, fontWeight: 'bold', color: '#1c1917' },
  input: { borderWidth: 2, borderColor: '#fed7aa', borderRadius: 12, padding: 14, fontSize: 18, backgroundColor: '#ffffff' },
  preview: { fontSize: 20, fontWeight: 'bold', color: '#9a3412' },
});
`,
      challenge: 'Add autoCapitalize="words" to the TextInput and try typing "dana lee" on your phone.',
    },
  ],
  apply: {
    scenario: 'A name for every order.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does the order need a name as well as a number?',
        options: [
          { text: 'Names look nicer', why: 'It\'s about getting the right bowl to the right person.' },
          { text: 'Numbers are illegal', why: 'Ray loves numbers. A name settles mix-ups.' },
          { text: 'When two people order the same thing, a name makes sure the right person gets it' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a name box: state for name, a TextInput with placeholder "Your name", value and onChangeText. Typing "Dana" shows "Order for Dana"',
        starter: `import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export default function App() {

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>

    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export default function App() {
  const [name, setName] = useState('');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <TextInput placeholder="Your name" value={name} onChangeText={setName} />
      <Text>Order for {name}</Text>
    </View>
  );
}
`,
        hint: "const [name, setName] = useState(''); <TextInput placeholder=\"Your name\" value={name} onChangeText={setName} /> and <Text>Order for {name}</Text>.",
        checks: [
          { message: 'Typing "Dana" shows "Order for Dana"', screen: { fill: [{ field: 'Your name', text: 'Dana' }], text: 'Order for Dana' } },
          { message: 'A controlled input', codeIncludes: 'onChangeText={setName}' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each prop to its job.',
        pairs: [
          ['value={name}', 'The box shows what\'s in state'],
          ['onChangeText={setName}', 'Each key press updates state'],
          ['placeholder="Your name"', 'Grey hint until they type'],
          ["useState('')", 'Starts empty'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'I can\'t even see where to type. It\'s just white.',
        options: [
          { text: 'You\'re right: I\'ll give it a border, padding and a label so it looks like a box.' },
          { text: 'Tap around until you find it.', why: 'Nobody will. An input needs to look like one.' },
          { text: 'Text boxes are always invisible.', why: 'Only when you don\'t style them.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A controlled name box.',
        language: 'typescript',
        template: '<TextInput value={[[1]]} onChangeText={[[2]]} />',
        blanks: [['name'], ['setName']],
        distractors: ['setName()', 'text', 'onChange'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'name is empty. What does this show?',
        code: "<Text>{name ? 'Order for ' + name : 'Who is this order for?'}</Text>",
        language: 'typescript',
        options: [
          { text: '"Order for "', why: 'An empty name counts as false, so the second text shows.' },
          { text: '"Who is this order for?"' },
          { text: 'Nothing', why: 'The ternary always shows one of the two.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the box look like a box: borderWidth 2, borderRadius 12, padding 14',
        starter: `import { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function App() {
  const [name, setName] = useState('');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <TextInput style={styles.input} placeholder="Your name" value={name} onChangeText={setName} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: { fontSize: 18 },
});
`,
        solution: `import { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function App() {
  const [name, setName] = useState('');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <TextInput style={styles.input} placeholder="Your name" value={name} onChangeText={setName} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: { fontSize: 18, borderWidth: 2, borderRadius: 12, padding: 14, borderColor: '#fed7aa' },
});
`,
        hint: 'Add borderWidth: 2, borderRadius: 12, padding: 14 to styles.input (and a borderColor).',
        checks: [
          { message: 'Border width 2', codeIncludes: 'borderWidth: 2' },
          { message: 'Padding 14', codeIncludes: 'padding: 14' },
          { message: 'Still a working name box', screen: { fill: [{ field: 'Your name', text: 'Ray' }], noText: 'error' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good placeholder or bad one?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Your name', group: 0 },
          { text: 'Type here', group: 1 },
          { text: 'e.g. Dana', group: 0 },
          { text: 'Input', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which prop runs every time the text changes?',
        answers: ['onChangeText'],
        placeholder: 'propName',
      },
      {
        kind: 'findBug',
        prompt: 'Whatever you type, the box stays empty. Which line is the problem?',
        language: 'typescript',
        lines: ["const [name, setName] = useState('');", '<TextInput value={name} />', '<Text>Order for {name}</Text>'],
        bug: 1,
        fix: '<TextInput value={name} onChangeText={setName} />',
        explanation: 'value ties the box to state, but nothing updates state. Add onChangeText={setName}.',
      },
    ],
  },
  reflect: {
    prompt: 'What would your app ask people to type? Write the placeholder you\'d use for each box.',
    starters: ['Box 1:...', 'Box 2:...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Type into the name box on your phone. Try autoCapitalize="words" and returnKeyType="done" and feel the difference on a real keyboard.',
  },
  notes: 'TextInput controlled with value + onChangeText. autoCapitalize/returnKeyType mentioned for devices (keyboard behaviour isn\'t visible in the browser preview).',
};

export default lesson;
