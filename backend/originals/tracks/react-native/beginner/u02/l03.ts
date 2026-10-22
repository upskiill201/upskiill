import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Myth or Fact: how React Native styling differs from CSS. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Styling myths',
  summary: 'Theo styled websites at bootcamp, so he types font-size: 18px and gets a red screen. React Native styling looks like CSS and isn\'t quite. Myth or fact, round two.',
  minutes: 11,
  outcomes: ['Know how React Native styles differ from CSS', 'Use numbers without "px"', 'Know that children don\'t inherit styles from a View'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'React Native styles are written like CSS: font-size: 18px.', isFact: false, explain: 'They\'re JavaScript objects with camelCase names: fontSize: 18. No dashes, no "px".' },
        { text: 'Sizes are plain numbers, like fontSize: 18 or padding: 24.', isFact: true, explain: 'They\'re density-independent pixels: the same physical size on a cheap phone and an expensive one.' },
        { text: 'Set color on a View and all the Text inside turns that colour.', isFact: false, explain: 'Views don\'t pass text styles down. Only a Text inside another Text inherits them. Style each Text, or use a shared style.' },
        { text: 'Things in a View stack top to bottom by default.', isFact: true, explain: 'React Native uses flexbox, and the default direction is a column. (On the web it\'s a row.) Lesson 4 is all about this.' },
        { text: 'Colours can be written as \'#9a3412\', \'rgb(154, 52, 18)\' or names like \'white\'.', isFact: true, explain: 'All work. Teams usually pick hex and keep the colours in one place (lesson 8).' },
        { text: 'You need a separate style file for every screen.', isFact: false, explain: 'Most screens keep their StyleSheet at the bottom of the same file. Shared colours go in one small file later.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Views don\'t pass colour down',
      caption: 'The View has color: \'#9a3412\', but the text stays black. Move color onto the Text\'s own style and watch it change.',
      code: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, color: '#9a3412' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Pho Real</Text>
    </View>
  );
}
`,
      challenge: 'Try fontSize: \'18px\' on the Text. What happens? Then put it back to 28.',
    },
  ],
  apply: {
    scenario: 'CSS habits vs React Native.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'CSS habit or React Native way?',
        groups: ['CSS habit', 'React Native way'],
        items: [
          { text: 'font-size: 18px', group: 0 },
          { text: 'fontSize: 18', group: 1 },
          { text: 'background-color: cream', group: 0 },
          { text: "backgroundColor: '#fff7ed'", group: 1 },
          { text: 'Styling the View to colour its text', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Theo sets color on a View. Why doesn\'t the text inside change?',
        options: [
          { text: 'He spelled color wrong', why: 'Spelling\'s fine. Views just don\'t pass text styles to children.' },
          { text: 'The phone is in dark mode', why: 'Nothing to do with dark mode.' },
          { text: 'In React Native, Views don\'t pass text styles down: style the Text itself' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix it: make "Pho Real" #9a3412 by styling the Text, not the View',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, color: '#9a3412' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Pho Real</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#9a3412' }}>Pho Real</Text>
    </View>
  );
}
`,
        hint: 'Add color: \'#9a3412\' inside the Text\'s style.',
        checks: [{ message: 'The title text itself is #9a3412', screen: { style: { of: 'Pho Real', prop: 'color', value: '#9a3412' } } }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the CSS to the React Native.',
        pairs: [
          ['font-size: 18px', 'fontSize: 18'],
          ['background-color', 'backgroundColor'],
          ['font-weight: bold', "fontWeight: 'bold'"],
          ['margin-top: 8px', 'marginTop: 8'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'Why not "px"? Every website uses px.',
        options: [
          { text: 'Plain numbers are the same physical size on every phone, cheap or expensive. React Native does the maths.' },
          { text: 'px is banned for legal reasons.', why: 'Not legal: React Native sizes are density-independent numbers.' },
          { text: 'No idea, just copy it.', why: 'There\'s a good reason: same size on every screen.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Turn the CSS into React Native.',
        language: 'typescript',
        template: '{ [[1]]: 24, [[2]]: 16 }',
        blanks: [['padding'], ['marginBottom']],
        distractors: ['margin-bottom', '"24px"', 'pad'],
      },
      {
        kind: 'mcq',
        prompt: 'By default, how do things stack inside a React Native View?',
        options: [
          { text: 'Side by side, left to right', why: 'That\'s the web\'s default row. React Native defaults to a column.' },
          { text: 'Top to bottom, in a column' },
          { text: 'On top of each other', why: 'They stack in a column, one under the other.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Write background-color the React Native way.',
        answers: ['backgroundColor'],
        placeholder: 'camelCase',
      },
      {
        kind: 'writeCode',
        prompt: 'Make "Large pho $13.50" size 20 with a marginTop of 12 (React Native style, no px)',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>Large pho $13.50</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 20, marginTop: 12 }}>Large pho $13.50</Text>
    </View>
  );
}
`,
        hint: 'style={{ fontSize: 20, marginTop: 12 }}: camelCase names, plain numbers.',
        checks: [
          { message: 'Size 20', screen: { style: { of: 'Large pho', prop: 'fontSize', value: '20' } } },
          { message: 'marginTop 12', screen: { style: { of: 'Large pho', prop: 'marginTop', value: '12' } } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which style line is written the CSS way?',
        language: 'typescript',
        lines: ["title: { fontSize: 34, fontWeight: 'bold' },", "item: { 'font-size': 18 },", "screen: { backgroundColor: '#fff7ed' },"],
        bug: 1,
        fix: 'item: { fontSize: 18 },',
        explanation: 'Dashes are CSS. React Native uses camelCase: fontSize.',
      },
    ],
  },
  reflect: {
    prompt: 'Which CSS habit (if any) do you expect to trip over most? If you\'ve never written CSS, which rule surprised you?',
    starters: ['I\'ll trip over...', 'Surprised by...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'React Native\'s docs list every style property for View and Text ("View Style Props", "Text Style Props"). Skim the Text list: it\'s shorter than you think.',
  },
  notes: 'RN styles: camelCase JS objects, unitless density-independent pixels; no cascade from View to Text (only nested Text inherits); flexDirection defaults to column; colours accept hex, rgb(a), hsl and named colours. The runner (react-native-web) may tolerate some web-only values like "18px"; on a device RN warns or errors, so lessons teach plain numbers.',
};

export default lesson;
