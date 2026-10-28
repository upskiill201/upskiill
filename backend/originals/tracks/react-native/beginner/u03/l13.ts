import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 13. Story with a choice: validation (empty orders, missing names) with a disabled button and a helpful message. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'The empty order',
  summary: 'Mai\'s favourite test: tap Place order with no name and zero bowls. The app happily "places" an order for nobody. Ray would be furious. What should the app do?',
  minutes: 12,
  outcomes: ['Decide when an order is valid', 'Disable a button until it is', 'Tell people what\'s missing, kindly'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 9:30 p.m.',
      beats: [
        { speaker: 'mai', text: 'Watch. No name. Zero bowls. Place order.' },
        { speaker: 'narrator', text: 'The screen says "Order placed!" for an order with nothing in it, for nobody.' },
        { speaker: 'theo', text: 'Ray would throw the ticket in the broth himself.' },
        { speaker: 'tey', text: 'An app should stop mistakes before they reach the kitchen. What should Theo do?' },
      ],
      choice: {
        prompt: 'What should Theo do?',
        options: [
          { text: 'Show an error pop-up after they tap Place order.', outcome: 'It works, but it\'s a slap after the fact: people tap, get told off, and try again. Better to show what\'s missing before they tap.' },
          { text: 'Trust customers to fill everything in.', outcome: 'At the festival, people will be rushing with one hand. Some will forget their name. The kitchen gets a ticket for "nobody".' },
          { text: 'Disable Place order until there\'s a name and at least one bowl, and say what\'s missing next to it.', outcome: 'Yes. The button is greyed out with a note: "Add your name to order". Type it, and the button lights up. No pop-ups, no confusion.', best: true },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Ready or not',
      caption: 'The button is disabled until you type a name. Type one and watch it light up, then tap it.',
      code: `import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const ready = name.trim().length > 0;

  return (
    <View style={styles.screen}>
      <TextInput style={styles.input} placeholder="Your name" value={name} onChangeText={setName} />
      <Pressable
        style={[styles.button, !ready && styles.buttonOff]}
        disabled={!ready}
        onPress={() => Alert.alert('Order placed for ' + name)}
      >
        <Text style={styles.buttonText}>Place order</Text>
      </Pressable>
      {!ready && <Text style={styles.hint}>Add your name to order</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12, backgroundColor: '#fff7ed' },
  input: { borderWidth: 2, borderColor: '#fed7aa', borderRadius: 12, padding: 14, fontSize: 18, backgroundColor: '#ffffff' },
  button: { backgroundColor: '#9a3412', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  buttonOff: { backgroundColor: '#d6d3d1' },
  buttonText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  hint: { fontSize: 14, color: '#78716c', textAlign: 'center' },
});
`,
      challenge: 'Type only spaces in the name. Does the button light up? (That\'s what .trim() is for.)',
    },
  ],
  apply: {
    scenario: 'Stopping empty orders.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is a disabled button with a note better than an error after the tap?',
        options: [
          { text: 'People see what\'s missing before they tap, instead of being told off after' },
          { text: 'Error pop-ups are banned', why: 'They\'re allowed. They\'re just a worse experience here.' },
          { text: 'Disabled buttons are faster to code', why: 'Similar effort. It\'s about the customer.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Disable "Place order" until a name is typed: const ready = name.trim().length > 0, and disabled={!ready}',
        starter: `import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [placed, setPlaced] = useState(false);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <TextInput placeholder="Your name" value={name} onChangeText={setName} />
      <Pressable onPress={() => setPlaced(true)}>
        <Text>Place order</Text>
      </Pressable>
      {placed && <Text>Order placed!</Text>}
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [placed, setPlaced] = useState(false);
  const ready = name.trim().length > 0;

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <TextInput placeholder="Your name" value={name} onChangeText={setName} />
      <Pressable disabled={!ready} onPress={() => setPlaced(true)}>
        <Text>Place order</Text>
      </Pressable>
      {placed && <Text>Order placed!</Text>}
    </View>
  );
}
`,
        hint: 'Add const ready = name.trim().length > 0; and disabled={!ready} on the Pressable.',
        checks: [
          { message: 'With no name, tapping does nothing', screen: { tap: ['Place order'], noText: 'Order placed!' } },
          { message: 'With a name, it places the order', screen: { fill: [{ field: 'Your name', text: 'Dana' }], tap: ['Place order'], text: 'Order placed!' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Should the order be allowed?',
        groups: ['Ready to order', 'Not yet'],
        items: [
          { text: 'Name "Dana", 1 bowl', group: 0 },
          { text: 'No name, 2 bowls', group: 1 },
          { text: 'Name of only spaces', group: 1 },
          { text: 'Name "Ray", 6 bowls', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'I typed three spaces as my name and it let me order!',
        options: [
          { text: 'Spaces are a valid name.', why: 'Ray can\'t shout "three spaces!". trim() removes them.' },
          { text: 'Stop testing, Mai.', why: 'Her tests are why the festival will go well.' },
          { text: 'Good catch. I\'ll use name.trim(), which ignores spaces, so a name has to have real letters.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'A name with real letters in it.',
        language: 'typescript',
        template: 'const ready = name.[[1]]().length [[2]] 0;',
        blanks: [['trim'], ['>']],
        distractors: ['clean', '<', '=='],
      },
      {
        kind: 'writeCode',
        prompt: 'Show a hint "Add your name to order" only while the order isn\'t ready',
        starter: `import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const ready = name.trim().length > 0;

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <TextInput placeholder="Your name" value={name} onChangeText={setName} />
      <Pressable disabled={!ready}>
        <Text>Place order</Text>
      </Pressable>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const ready = name.trim().length > 0;

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <TextInput placeholder="Your name" value={name} onChangeText={setName} />
      <Pressable disabled={!ready}>
        <Text>Place order</Text>
      </Pressable>
      {!ready && <Text>Add your name to order</Text>}
    </View>
  );
}
`,
        hint: '{!ready && <Text>Add your name to order</Text>} under the button.',
        checks: [
          { message: 'The hint shows with no name', screen: { text: 'Add your name to order' } },
          { message: 'It disappears once a name is typed', screen: { fill: [{ field: 'Your name', text: 'Ray' }], noText: 'Add your name to order' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to its job.',
        pairs: [
          ['name.trim()', 'Removes spaces at the ends'],
          ['disabled={!ready}', 'Button does nothing until ready'],
          ['!ready && styles.buttonOff', 'Greys the button out'],
          ['{!ready && <Text>...</Text>}', 'Says what\'s missing'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does "  Dana  ".trim() give? (Type it.)',
        answers: ['Dana', '"Dana"'],
        placeholder: 'Result',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'name is "Ray". Is the button enabled?',
        code: "const ready = name.trim().length > 0;\n<Pressable disabled={!ready}>",
        language: 'typescript',
        options: [
          { text: 'No', why: '"Ray" has 3 letters: ready is true, so disabled is false.' },
          { text: 'Yes' },
          { text: 'Only on iPhone', why: 'Same on every phone.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'The button is never enabled, even with a name. Which line is wrong?',
        language: 'typescript',
        lines: ["const [name, setName] = useState('');", 'const ready = name.trim().length > 0;', '<Pressable disabled={ready}>'],
        bug: 2,
        fix: '<Pressable disabled={!ready}>',
        explanation: 'disabled should be true when NOT ready. Missing the !, it\'s disabled exactly when it\'s ready.',
      },
    ],
  },
  reflect: {
    prompt: 'What could someone send by mistake in your own app (empty form, wrong amount)? How would you stop it before they tap?',
    starters: ['They could send...', 'I\'d stop it by...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Hand the order screen to the most impatient person you know. Can they place an empty or nameless order? If they can, fix it.',
  },
  notes: 'Validation with derived booleans; disabled Pressable; String.trim(). Inline guidance preferred over after-the-fact alerts (common UX guidance on form validation).',
};

export default lesson;
