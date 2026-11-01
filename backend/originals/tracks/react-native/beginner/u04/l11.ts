import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 11. Chat with Tey: screens and navigation; a one-file navigator with state, and a Back button. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Another screen',
  summary: 'Customers don\'t want the whole board. They want to tap their number and see just their order. That\'s a second screen. Tey explains what "navigation" really means.',
  minutes: 12,
  outcomes: ['Explain what a screen and navigation are', 'Switch between two screens with state', 'Add a Back button'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Every app you use has screens: a list, then a details page, then back. Moving between them is called navigation. What decides which screen is showing?', replies: ['Some kind of memory?'] },
        { tey: 'Exactly: state. Underneath, a navigator remembers "which screen am I on", and draws that one. You can build a tiny one yourself: const [screen, setScreen] = useState(\'board\').', replies: ['Then what?'] },
        { tey: 'An early return, like the confirmation in Chapter 3. if (screen === \'order\') return the order screen. Otherwise, return the board.', replies: ['And going back?'] },
        { tey: 'A Back button that calls setScreen(\'board\'). People expect it top-left, and Android phones have a system back too. A real navigator handles both, plus the slide animation.', replies: ['Is there a real one?'] },
        { tey: 'Expo Router, in two lessons. It\'s built on this same idea. In the phone preview everything lives in one file, so we play the navigator ourselves with state. On your phone, Expo Router takes over.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Two screens, one state',
      caption: 'Tap "My order" to go to the order screen, then Back. The screen is just a value in state.',
      code: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('board');

  if (screen === 'order') {
    return (
      <View style={styles.screen}>
        <Pressable onPress={() => setScreen('board')}>
          <Text style={styles.back}>{'< Back'}</Text>
        </Pressable>
        <Text style={styles.big}>Order #42</Text>
        <Text style={styles.line}>Large pho, extra brisket</Text>
        <Text style={styles.status}>Cooking</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pho Real board</Text>
      <Pressable style={styles.button} onPress={() => setScreen('order')}>
        <Text style={styles.buttonText}>My order</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12, backgroundColor: '#fff7ed' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#9a3412' },
  back: { fontSize: 18, color: '#9a3412', fontWeight: 'bold' },
  big: { fontSize: 40, fontWeight: 'bold', color: '#1c1917' },
  line: { fontSize: 18 },
  status: { fontSize: 20, fontWeight: 'bold', color: '#b45309' },
  button: { backgroundColor: '#9a3412', paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
});
`,
      challenge: 'Add a third screen, \'menu\', with its own button on the board and a Back button.',
    },
  ],
  apply: {
    scenario: 'Moving between screens.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In the try-it, what decides which screen is showing?',
        options: [
          { text: 'The phone\'s settings', why: 'It\'s the app\'s own state.' },
          { text: 'A value in state: screen is \'board\' or \'order\'' },
          { text: 'Which button was created first', why: 'The order of code doesn\'t pick the screen; state does.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a second screen: tapping "My order" shows "Order #42", and a "Back" button returns to the board ("Pho Real board")',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('board');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Text>Pho Real board</Text>
      <Pressable onPress={() => setScreen('order')}><Text>My order</Text></Pressable>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('board');

  if (screen === 'order') {
    return (
      <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
        <Pressable onPress={() => setScreen('board')}><Text>Back</Text></Pressable>
        <Text>Order #42</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Text>Pho Real board</Text>
      <Pressable onPress={() => setScreen('order')}><Text>My order</Text></Pressable>
    </View>
  );
}
`,
        hint: "Before the return: if (screen === 'order') { return (<View>...Back button and <Text>Order #42</Text>...</View>); }",
        checks: [
          { message: '"My order" opens Order #42', screen: { tap: ['My order'], text: 'Order #42' } },
          { message: 'The board is hidden there', screen: { tap: ['My order'], noText: 'Pho Real board' } },
          { message: 'Back returns to the board', screen: { tap: ['My order', 'Back'], text: 'Pho Real board' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the word to its meaning.',
        pairs: [
          ['Screen', 'One full page of the app'],
          ['Navigation', 'Moving between screens'],
          ['Back', 'Return to where you came from'],
          ['Navigator', 'Remembers which screen is showing'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'Where\'s the Back button? I\'m stuck on the order screen.',
        options: [
          { text: 'Close the app and open it again.', why: 'Every screen you go into needs a way out.' },
          { text: 'Sorry, every screen needs a way back. I\'ll put Back top-left, where people look for it.' },
          { text: 'There isn\'t one, it\'s a one-way app.', why: 'Nobody wants to be trapped.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Show the order screen.',
        language: 'typescript',
        template: "[[1]] (screen === 'order') {\n  return <OrderScreen onBack={() => setScreen('[[2]]')} />;\n}",
        blanks: [['if'], ['board']],
        distractors: ['when', 'order', 'back'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'screen is \'board\'. The user taps "My order" then "Back". What is screen now?',
        code: "onPress={() => setScreen('order')}   // My order\nonPress={() => setScreen('board')}   // Back",
        language: 'typescript',
        options: [
          { text: '\'order\'', why: 'Back set it to \'board\'.' },
          { text: 'undefined', why: 'It\'s always one of the two.' },
          { text: '\'board\'' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a third screen: a "Menu" button on the board shows "Today\'s menu", with a "Back" button',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('board');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Text>Pho Real board</Text>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('board');

  if (screen === 'menu') {
    return (
      <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
        <Pressable onPress={() => setScreen('board')}><Text>Back</Text></Pressable>
        <Text>Today's menu</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Text>Pho Real board</Text>
      <Pressable onPress={() => setScreen('menu')}><Text>Menu</Text></Pressable>
    </View>
  );
}
`,
        hint: "A Menu button with setScreen('menu'), and if (screen === 'menu') return a screen with Back and <Text>Today's menu</Text>.",
        checks: [
          { message: 'Menu opens', screen: { tap: ['Menu'], text: "Today's menu" } },
          { message: 'Back works', screen: { tap: ['Menu', 'Back'], text: 'Pho Real board' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Its own screen, or part of the board?',
        groups: ['Its own screen', 'Part of the board'],
        items: [
          { text: 'One order\'s full details', group: 0 },
          { text: 'The ready count', group: 1 },
          { text: 'The kitchen view for Ray', group: 0 },
          { text: 'A row\'s status pill', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the word for moving between screens in an app?',
        answers: ['navigation', 'navigating'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'The order screen never shows, even after tapping "My order". Which line is the problem?',
        language: 'typescript',
        lines: ["const [screen, setScreen] = useState('board');", "if (screen === 'Order') {", '  return <Text>Order #42</Text>;', '}', "// button: onPress={() => setScreen('order')}"],
        bug: 1,
        fix: "if (screen === 'order') {",
        explanation: 'The button sets \'order\' but the check looks for \'Order\'. Text comparisons are exact, capitals included.',
      },
    ],
  },
  reflect: {
    prompt: 'Sketch the screens of your own app as boxes. Draw an arrow for every button that moves between them.',
    starters: ['Screen 1:...', 'Screen 2:...', 'Arrows:...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Open three apps on your phone and count how many taps it takes to reach a details screen and come back. Where is Back on each?',
  },
  notes: 'Conditional rendering as a minimal navigator; Expo Router introduced in lesson 13 (preview runs a single file). Android hardware back handled by real navigators.',
};

export default lesson;
