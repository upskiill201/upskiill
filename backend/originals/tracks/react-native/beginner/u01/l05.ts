import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — free. Checkpoint 1: lessons 1–4. Mai's challenge: the menu board. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Mai\'s challenge',
  summary: 'Mai bets Theo $5 he can\'t put the truck\'s chalkboard menu on a phone screen before the lunch rush. Check what you know about apps, tools, View and Text.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Build a small screen on your own', 'Explain what React Native is and what you need'],
  learn: [
    {
      kind: 'story',
      title: '10:45 a.m., fifteen minutes to lunch',
      beats: [
        { speaker: 'mai', text: 'Five dollars says you can\'t get the chalkboard on a phone before eleven.' },
        { speaker: 'theo', text: 'Make it ten.' },
        { speaker: 'linh', text: 'Whoever loses washes the noodle baskets.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: your first screens.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does React Native turn your <Text> and <View> into?',
        options: [
          { text: 'A web page inside an app', why: 'That\'s the myth from lesson 3.' },
          { text: 'Pictures of the screen', why: 'It\'s real, selectable text and real boxes.' },
          { text: 'Real phone parts on Android and iPhone' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Put the chalkboard on the phone: a title "Today\'s menu", then "Large pho $13.50" and "Banh mi $9.00"',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>

    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>Today's menu</Text>
      <Text>Large pho $13.50</Text>
      <Text>Banh mi $9.00</Text>
    </View>
  );
}
`,
        hint: 'Three lines inside the View, each one wrapped in <Text>...</Text>.',
        checks: [
          { message: 'A title that says "Today\'s menu"', screen: { text: 'Today\'s menu' } },
          { message: 'Large pho for $13.50', screen: { text: 'Large pho $13.50' } },
          { message: 'Banh mi for $9.00', screen: { text: 'Banh mi $9.00' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Needed to finish this course, or only to publish later?',
        groups: ['For the course', 'Only to publish'],
        items: [
          { text: 'Expo Go on your phone', group: 0 },
          { text: 'An Apple Developer account', group: 1 },
          { text: 'The lesson\'s phone preview', group: 0 },
          { text: 'A Google Play developer account', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Theo\'s screen crashes. Which line is the problem?',
        language: 'typescript',
        lines: ['<View>', '  <Text>Today\'s menu</Text>', '  <Text>Large pho $13.50</Text>', '  Spring rolls $5.50', '</View>'],
        bug: 3,
        fix: '  <Text>Spring rolls $5.50</Text>',
        explanation: 'The spring rolls line isn\'t inside a <Text>. Words straight inside a <View> crash the app.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s answer.',
        from: 'mai',
        message: 'Fine, it works. But will it work on my iPhone and Dad\'s Android?',
        options: [
          { text: 'Only on Android.', why: 'React Native runs one codebase on both.' },
          { text: 'Same code, both phones. That\'s the whole point of React Native.' },
          { text: 'I\'ll have to write it twice.', why: 'That\'s what React Native saves you from.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The screen\'s skeleton.',
        language: 'typescript',
        template: '[[1]] default function App() {\n  [[2]] (\n    <View>...</View>\n  );\n}',
        blanks: [['export'], ['return']],
        distractors: ['import', 'show', 'print'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each fact.',
        pairs: [
          ['Made by', 'Facebook, now Meta'],
          ['Released', '2015'],
          ['Runs your app on your phone', 'Expo Go'],
          ['Makes a new project', 'npx create-expo-app'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add the spring rolls to the board: "Spring rolls $5.50"',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>Today's menu</Text>
      <Text>Large pho $13.50</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>Today's menu</Text>
      <Text>Large pho $13.50</Text>
      <Text>Spring rolls $5.50</Text>
    </View>
  );
}
`,
        hint: 'One more <Text>Spring rolls $5.50</Text>, before </View>.',
        checks: [
          { message: 'Spring rolls for $5.50', screen: { text: 'Spring rolls $5.50' } },
          { message: 'Large pho is still there', screen: { text: 'Large pho $13.50' } },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does a Large pho cost? (Dollars and cents, like 1.00)',
        answers: ['13.50', '$13.50', '13.5'],
        placeholder: '0.00',
      },
      {
        kind: 'mcq',
        prompt: 'Who washes the noodle baskets?',
        options: [
          { text: 'Mai: Theo got the menu on the phone in time' },
          { text: 'Theo', why: 'He finished before eleven. Mai owes him $10.' },
          { text: 'Ray', why: 'Ray wasn\'t in the bet. He said "Order 12" and went back to the broth.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You\'ve built your first screens. What felt easy, and what do you want to understand better?',
    starters: ['Easy:...', 'I want to understand...'],
  },
  notes: 'Checkpoint for lessons 1–4. Prices per outline (USD). End of the free stretch.',
};

export default lesson;
