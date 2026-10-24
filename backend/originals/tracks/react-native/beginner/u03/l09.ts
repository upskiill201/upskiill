import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: build log v0.3 (so far). */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Build log v0.3',
  summary: 'Nine days to the festival. Theo\'s app can remember sizes, extras and quantities, and adds up a total with tax. Tap through his v0.3 log so far.',
  minutes: 11,
  outcomes: ['Review state, toggles, conditional styles and totals', 'Spot what v0.3 still needs', 'Update your build log'],
  learn: [
    {
      kind: 'explore',
      title: 'Theo\'s build log, v0.3 (so far)',
      text: 'BUILD LOG v0.3, Pho Real app. Goal: build a bowl and see the right total. Shipped: useState for size, brisket, noodles and quantity; minus/plus with limits 1 to 10; size chips that fill when picked; extras that toggle with !; total worked out from the choices, with 8.25% Austin tax. What broke: onPress={less()} ran on its own. Fix: pass the function, not the call. What broke 2: I stored the total in state and it got stuck at $13.50 after adding brisket. Fix: calculate it, don\'t store it. Still missing: whose order is it? Notes like "two limes". Stopping empty orders. A Place order button. Arjun says: "Store choices, calculate totals." Festival: 9 days.',
      hotspots: [
        { phrase: 'useState for size, brisket, noodles and quantity', note: 'Four separate pieces of state, one per choice (lessons 1 to 4).' },
        { phrase: 'limits 1 to 10', note: 'Lesson 3: the less() and more() handlers with an if.' },
        { phrase: 'size chips that fill when picked', note: 'Lesson 6: [styles.chip, size === \'Large\' && styles.chipOn].' },
        { phrase: 'extras that toggle with !', note: 'Lesson 7: setBrisket(!brisket).' },
        { phrase: 'onPress={less()} ran on its own', note: 'The brackets call the function immediately. onPress={less} passes it.' },
        { phrase: 'Fix: calculate it, don\'t store it', note: 'Lesson 8: derived values never drift.' },
        { phrase: 'Still missing: whose order is it? Notes like "two limes". Stopping empty orders. A Place order button.', note: 'The second half of this chapter: TextInput, validation and placing the order.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The bug in the log',
      caption: 'This is the stuck-total bug from Theo\'s log: the total is kept in state and never updated. Tap Extra brisket: the total doesn\'t change. Fix it by calculating the total instead.',
      code: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [brisket, setBrisket] = useState(false);
  const [total, setTotal] = useState(13.5);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setBrisket(!brisket)}>
        <Text>{brisket ? 'Brisket: on' : 'Brisket: off'}</Text>
      </Pressable>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Total \${total.toFixed(2)}</Text>
    </View>
  );
}
`,
      challenge: 'Delete the total state and write const total = 13.5 + (brisket ? 3 : 0); instead.',
    },
  ],
  apply: {
    scenario: 'Reading the v0.3 log.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each log line to the lesson.',
        pairs: [
          ['Limits 1 to 10', 'Minus, plus'],
          ['Chips that fill when picked', 'Small or large?'],
          ['Toggle with !', 'Extras on, extras off'],
          ['Calculate, don\'t store', 'What does it cost?'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the stuck total: calculate it from brisket (13.5, +3 with brisket) instead of keeping it in state',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [brisket, setBrisket] = useState(false);
  const [total, setTotal] = useState(13.5);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setBrisket(!brisket)}>
        <Text>Extra brisket</Text>
      </Pressable>
      <Text>Total \${total.toFixed(2)}</Text>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [brisket, setBrisket] = useState(false);
  const total = 13.5 + (brisket ? 3 : 0);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setBrisket(!brisket)}>
        <Text>Extra brisket</Text>
      </Pressable>
      <Text>Total \${total.toFixed(2)}</Text>
    </View>
  );
}
`,
        hint: 'Replace the total useState line with const total = 13.5 + (brisket ? 3 : 0);',
        checks: [
          { message: 'Starts at $13.50', screen: { text: 'Total $13.50' } },
          { message: 'Brisket makes it $16.50', screen: { tap: ['Extra brisket'], text: 'Total $16.50' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Theo\'s total get stuck at $13.50?',
        options: [
          { text: 'The total was in state and nothing ever called setTotal when brisket changed' },
          { text: 'toFixed rounds it down', why: 'The value itself never changed.' },
          { text: 'Brisket is free', why: 'It\'s +$3.00. The stored total just never updated.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Shipped in v0.3 so far, or still missing?',
        groups: ['Shipped', 'Still missing'],
        items: [
          { text: 'Size chips', group: 0 },
          { text: 'The customer\'s name', group: 1 },
          { text: 'Total with tax', group: 0 },
          { text: 'A Place order button', group: 1 },
          { text: 'Notes like "two limes"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'Sum up this week\'s lesson in five words.',
        options: [
          { text: 'State is hard, avoid it.', why: 'State is the whole chapter. The rule is about totals.' },
          { text: 'Use lots of state.', why: 'Only for choices. Totals are calculated.' },
          { text: 'Store choices, calculate totals.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The two bugs and their fixes.',
        template: 'Pass the function, not the [[1]]. Calculate the total, don\'t [[2]] it.',
        blanks: [['call'], ['store']],
        distractors: ['name', 'show'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days to the festival in this log?',
        answers: ['9', 'nine'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show after one tap?',
        code: "const [brisket, setBrisket] = useState(false);\nconst total = 13.5 + (brisket ? 3 : 0);\n// tap: setBrisket(!brisket)\n<Text>${total.toFixed(2)}</Text>",
        language: 'typescript',
        options: [
          { text: '$13.50', why: 'brisket is now true, so 3 is added.' },
          { text: '$16.50' },
          { text: '$3.00', why: 'It\'s 13.5 plus 3.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a line to Theo\'s log screen: "Still missing: name, notes, Place order"',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Build log v0.3</Text>
      <Text>Shipped: sizes, extras, totals</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Build log v0.3</Text>
      <Text>Shipped: sizes, extras, totals</Text>
      <Text>Still missing: name, notes, Place order</Text>
    </View>
  );
}
`,
        hint: 'Add <Text>Still missing: name, notes, Place order</Text> at the end.',
        checks: [{ message: 'The line shows', screen: { text: 'Still missing: name, notes, Place order' } }],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s next for v0.3?',
        options: [
          { text: 'A new colour scheme', why: 'That was Chapter 2. Now it\'s name, notes, validation and placing the order.' },
          { text: 'Whose order it is, notes, stopping empty orders, and placing the order' },
          { text: 'Publishing to the App Store', why: 'That\'s Film 3.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Update your build log: which bug from this chapter have you hit yourself? Write down the fix in one line.',
    starters: ['The bug:...', 'The fix:...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Build the live total on your phone and check it with a calculator: large, brisket, two bowls. Does it match to the cent?',
  },
  notes: 'Build log v0.3 (fictional): running device. Stuck-total bug demonstrates redundant state.',
};

export default lesson;
