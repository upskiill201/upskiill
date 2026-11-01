import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story with a choice: the order nobody can place; the app needs memory (state). */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Large, no onions, extra brisket',
  summary: '"Large, no onions, extra brisket, two limes. Can I just order that in here?" Everyone at the market asked the same thing. Theo\'s app can show a menu, but it can\'t remember a single tap.',
  minutes: 12,
  outcomes: ['See why an app needs to remember things', 'Meet state: values that change the screen', 'Make a tap change what the screen shows'],
  learn: [
    {
      kind: 'story',
      title: 'Sunday, the morning after the market',
      beats: [
        { speaker: 'linh', text: 'Thirty people looked at your menu. Twenty-two asked how to order on it. One woman tapped the large pho eleven times.' },
        { speaker: 'theo', text: 'Nothing happens when you tap it. It doesn\'t remember anything.' },
        { speaker: 'mai', text: 'So it\'s a very pretty poster.' },
        { speaker: 'narrator', text: 'Twelve days to the Eastside Food Truck Festival. Linh writes three words on the chalkboard: "BUILD YOUR BOWL".' },
        { speaker: 'tey', text: 'To take an order, the app has to remember choices: which size, which extras, how many. What should Theo do first?' },
      ],
      choice: {
        prompt: 'What should Theo do first?',
        options: [
          { text: 'Add a big form with every option and figure out memory later.', outcome: 'A form that forgets every tap is still a poster. Memory comes first; the form is built on it.' },
          { text: 'Learn state: how a screen remembers a value and redraws when it changes.', outcome: 'Yes. One tap, one remembered value, one updated screen. Everything in this chapter (sizes, extras, totals, the order) is built from that.', best: true },
          { text: 'Let people type their whole order into one text box.', outcome: '"lrg no onoin xtra brsket" is exactly the kind of order that ends up wrong. Choices people can tap are faster and clearer.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Your first app that remembers',
      caption: 'Tap "Add a bowl" in the phone. The number goes up, because the app remembers it in state. Read the code; next lesson explains every line.',
      code: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [bowls, setBowls] = useState(0);

  return (
    <View style={styles.screen}>
      <Text style={styles.count}>Bowls: {bowls}</Text>
      <Pressable style={styles.button} onPress={() => setBowls(bowls + 1)}>
        <Text style={styles.buttonText}>Add a bowl</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 16, backgroundColor: '#fff7ed' },
  count: { fontSize: 28, fontWeight: 'bold', color: '#1c1917' },
  button: { backgroundColor: '#9a3412', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
});
`,
      challenge: 'Change bowls + 1 to bowls + 2. What happens when you tap now?',
    },
  ],
  apply: {
    scenario: 'An app that remembers.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why couldn\'t v0.2 take an order?',
        options: [
          { text: 'The menu was too long', why: 'Length wasn\'t the problem. Taps didn\'t change anything.' },
          { text: 'There were no prices', why: 'Prices were there. It couldn\'t remember choices.' },
          { text: 'It couldn\'t remember any tap, so nothing a customer chose was kept' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Run the counter: tapping "Add a bowl" twice should show "Bowls: 2"',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [bowls, setBowls] = useState(0);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>Bowls: {bowls}</Text>
      <Pressable onPress={() => {}}>
        <Text>Add a bowl</Text>
      </Pressable>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [bowls, setBowls] = useState(0);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>Bowls: {bowls}</Text>
      <Pressable onPress={() => setBowls(bowls + 1)}>
        <Text>Add a bowl</Text>
      </Pressable>
    </View>
  );
}
`,
        hint: 'The onPress does nothing yet. Make it () => setBowls(bowls + 1).',
        checks: [
          { message: 'Starts at "Bowls: 0"', screen: { text: 'Bowls: 0' } },
          { message: 'Two taps show "Bowls: 2"', screen: { tap: ['Add a bowl', 'Add a bowl'], text: 'Bowls: 2' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does the app need to remember it (state)?',
        groups: ['Needs state', 'Fixed'],
        items: [
          { text: 'Which size the customer picked', group: 0 },
          { text: 'The price of a large pho', group: 1 },
          { text: 'How many bowls are in the order', group: 0 },
          { text: 'The truck\'s name', group: 1 },
          { text: 'Whether extra brisket is on', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'Why not just let people type their order in a box?',
        options: [
          { text: 'Typing is great.', why: 'Free typing is slow on a phone and easy to get wrong.' },
          { text: 'Taps are faster in a line, and "lrg no onoin" ends up as the wrong bowl. Choices first, notes for the extras.' },
          { text: 'Boxes are illegal.', why: 'They aren\'t. There\'ll be a notes box later, for special requests.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The line that gives the app a memory.',
        language: 'typescript',
        template: 'const [bowls, setBowls] = [[1]](0);',
        blanks: [['useState']],
        distractors: ['useMemory', 'state', 'remember'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The app starts, and the customer taps "Add a bowl" three times. What does it show?',
        code: 'const [bowls, setBowls] = useState(0);\n<Pressable onPress={() => setBowls(bowls + 1)}>',
        language: 'typescript',
        options: [
          { text: 'Bowls: 3' },
          { text: 'Bowls: 0', why: 'Each tap sets bowls to one more, and the screen redraws.' },
          { text: 'Bowls: 1', why: 'Every tap adds one: 1, 2, 3.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days to the Eastside Food Truck Festival, at the start of this chapter?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Make a "Remove a bowl" button that takes one away',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [bowls, setBowls] = useState(2);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>Bowls: {bowls}</Text>
      <Pressable onPress={() => setBowls(bowls + 1)}>
        <Text>Add a bowl</Text>
      </Pressable>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [bowls, setBowls] = useState(2);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>Bowls: {bowls}</Text>
      <Pressable onPress={() => setBowls(bowls + 1)}>
        <Text>Add a bowl</Text>
      </Pressable>
      <Pressable onPress={() => setBowls(bowls - 1)}>
        <Text>Remove a bowl</Text>
      </Pressable>
    </View>
  );
}
`,
        hint: 'Copy the Pressable, change the text to Remove a bowl, and use setBowls(bowls - 1).',
        checks: [
          { message: 'There\'s a Remove a bowl button', screen: { button: 'Remove a bowl' } },
          { message: 'One tap takes 2 down to 1', screen: { tap: ['Remove a bowl'], text: 'Bowls: 1' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece to its job.',
        pairs: [
          ['bowls', 'The remembered value'],
          ['setBowls', 'Changes it and redraws the screen'],
          ['useState(0)', 'Starts it at 0'],
          ['onPress', 'Runs when the button is tapped'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does Linh write on the chalkboard?',
        options: [
          { text: '"PAPER FOREVER"', why: 'Not this time.' },
          { text: '"CLOSED SUNDAY"', why: 'She writes the plan for the week.' },
          { text: '"BUILD YOUR BOWL"' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of an app you use. Name three things it remembers while you use it (what\'s in a cart, a toggle, a typed message).',
    starters: ['It remembers...', '...and...', '...and...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Put the bowl counter on your phone with Expo Go and tap it fast. Notice it never misses a tap: state updates are quick.',
  },
  notes: 'useState introduced by example; explained next lesson. Story continues from Chapter 2\'s market (fictional numbers).',
};

export default lesson;
