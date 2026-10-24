import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 13. Story with a choice: the red screen, live, at lunch. Reading React Native errors calmly. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'The red screen',
  summary: 'Theo is showing the app to a regular when the whole phone turns red. Mai is filming. Linh raises one eyebrow. What does a calm developer do with a red screen?',
  minutes: 13,
  outcomes: ['Read a React Native error message calmly, top line first', 'Fix the three errors beginners meet most', 'Use the line number to find the problem'],
  learn: [
    {
      kind: 'story',
      title: '12:15 p.m., the window',
      beats: [
        { speaker: 'narrator', text: 'Theo hands his phone to a regular, a construction worker in a hard hat, to show off the menu. The screen turns completely red.' },
        { speaker: 'mai', text: '(filming) And here we see the app in its natural habitat.' },
        { speaker: 'linh', text: 'Paper never does that.' },
        { speaker: 'narrator', text: 'The red screen says: "Text is not defined." And underneath, a lot of small grey text.' },
        { speaker: 'tey', text: 'Every developer sees the red screen many times a day. The question is what Theo does next.' },
      ],
      choice: {
        prompt: 'What should Theo do?',
        options: [
          { text: 'Delete the last thing he changed and hope.', outcome: 'Sometimes it works by luck. Usually he deletes the wrong thing, and now there are two problems and no idea why.' },
          { text: 'Read the first line of the error slowly, then find the line it points to.', outcome: 'Yes. "Text is not defined": he used <Text> but forgot to import it. One word in the import line, and the menu is back before the regular finishes his coffee.', best: true },
          { text: 'Close the app and pretend it didn\'t happen.', outcome: 'The red screen is still there next time. And the error message was telling him exactly what was wrong.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Meet the red screen',
      caption: 'This code is broken on purpose: it uses Text but doesn\'t import it. Read the red message on the phone. Then fix the import line and watch the app come back.',
      code: `import { View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 28 }}>Pho Real</Text>
    </View>
  );
}
`,
      challenge: 'Fix it: change the first line to import { View, Text } from \'react-native\';',
      expectError: true,
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Three errors you\'ll meet most: "X is not defined" (import it or check the spelling), "Text strings must be rendered within a <Text> component" (wrap the words in Text), and a syntax error with a line number (a tag or bracket isn\'t closed).',
    },
  ],
  apply: {
    scenario: 'Reading the red screen.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each error to its usual fix.',
        pairs: [
          ['Text is not defined', 'Add Text to the import'],
          ['Text strings must be rendered within a <Text> component', 'Wrap the words in <Text>'],
          ['JSX element \'View\' has no corresponding closing tag', 'Add the missing </View>'],
          ['<div> isn\'t a React Native component', 'Use View instead'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the red screen: the code uses Text without importing it',
        starter: `import { View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 28 }}>Pho Real</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 28 }}>Pho Real</Text>
    </View>
  );
}
`,
        hint: 'The first line imports View only. Add Text: import { View, Text } from \'react-native\';',
        checks: [{ message: 'The app shows "Pho Real" again', screen: { text: 'Pho Real' } }],
      },
      {
        kind: 'mcq',
        prompt: 'What should you read first on a red screen?',
        options: [
          { text: 'The first line of the message: what went wrong' },
          { text: 'The small grey text at the bottom', why: 'That\'s the details of where in React it happened. The first line usually says what you need.' },
          { text: 'Nothing: just undo everything', why: 'The message is free help. Read it first.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix this crash: the opening hours are sitting straight inside the View',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 28 }}>Pho Real</Text>
      Open 11 a.m. to 3 p.m.
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 28 }}>Pho Real</Text>
      <Text>Open 11 a.m. to 3 p.m.</Text>
    </View>
  );
}
`,
        hint: 'Wrap the hours in <Text> and </Text>.',
        checks: [
          { message: 'No crash, and the hours show', screen: { text: 'Open 11 a.m. to 3 p.m.' } },
          { message: 'The title is still there', screen: { text: 'Pho Real' } },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'Red screen = your app is a disaster, right?',
        options: [
          { text: 'Yes, I give up.', why: 'Every developer sees red screens daily. This one took one word to fix.' },
          { text: 'It means the computer is broken.', why: 'The computer is fine. The message points at a mistake in the code.' },
          { text: 'It means the app told me exactly what\'s wrong. One word in the import, fixed.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'The error says "JSX element \'View\' has no corresponding closing tag." Which line needs fixing?',
        language: 'typescript',
        lines: ['return (', '  <View style={{ padding: 24 }}>', '    <Text>Pho Real</Text>', '  <View>', ');'],
        bug: 3,
        fix: '  </View>',
        explanation: 'The last View is an opening tag again. It needs the slash: </View>.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good first move or bad first move?',
        groups: ['Good first move', 'Bad first move'],
        items: [
          { text: 'Read the first line of the error', group: 0 },
          { text: 'Go to the line number it mentions', group: 0 },
          { text: 'Delete code at random', group: 1 },
          { text: 'Close the app and hope', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The error says "Pressable is not defined". What did you most likely forget to do? (One word.)',
        answers: ['import', 'import it', 'imported', 'importing'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'The error says "Txt is not defined". What\'s the most likely cause?',
        options: [
          { text: 'React Native is broken', why: 'It\'s working: it\'s telling you about Txt.' },
          { text: 'You need a newer phone', why: 'Phones don\'t cause spelling mistakes.' },
          { text: 'A typo: Txt instead of Text' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a calm developer\'s response to a red screen.',
        lines: ['Stay calm and read the first line', 'Find the line it points to', 'Fix the one thing it names', 'Watch the app reload', 'Write it in the build log'],
      },
    ],
  },
  reflect: {
    prompt: 'How do you usually react when something breaks (a device, a plan, code)? What would "read the first line" look like there?',
    starters: ['When something breaks, I...', 'Reading the first line would mean...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'In a real Expo project, the red screen is called a RedBox, and the terminal shows the same message. Next lesson you\'ll see both on your own phone.',
  },
  notes: 'Errors as surfaced by the runner: ReferenceError "Text is not defined" (explained in plain words), RN raw-text error, TypeScript JSX syntax error TS17008 with line, and the runner\'s HTML-tag error. Real RN shows a red error screen (RedBox / LogBox) in development.',
};

export default lesson;
