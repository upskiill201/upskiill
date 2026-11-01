import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4 — free. Your first screen, line by line: import, export default function App, return, View, Text. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Your first screen',
  summary: 'Saturday, 7 a.m., the truck\'s fold-out table. Theo builds Pho Real\'s first real screen and reads every line of it out loud to Mai, who is not awake.',
  minutes: 13,
  outcomes: ['Read every line of a React Native screen', 'Use View as a box and Text for words', 'Build a screen from a blank file'],
  learn: [
    {
      kind: 'text',
      html: '<p>Every React Native screen in this course has the same four parts. Here\'s Pho Real\'s first one:</p><pre><code>import { View, Text } from \'react-native\';\n\nexport default function App() {\n  return (\n    &lt;View&gt;\n      &lt;Text&gt;Pho Real&lt;/Text&gt;\n    &lt;/View&gt;\n  );\n}</code></pre><ul><li><strong>import</strong> brings in the parts you\'ll use. View and Text come from <code>react-native</code>.</li><li><strong>export default function App()</strong> is your screen. "App" is its name; "export default" means "this is the screen to show".</li><li><strong>return ( ... )</strong> says what appears on the phone.</li><li><strong>&lt;View&gt;</strong> is a box that holds other things. <strong>&lt;Text&gt;</strong> holds words. Every opening tag needs its closing tag: &lt;Text&gt; ... &lt;/Text&gt;.</li></ul>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'View is a box. Text is words. Words always go inside <Text>, never straight inside <View>.',
    },
    {
      kind: 'tryIt',
      title: 'Pho Real, screen one',
      caption: 'The style={{ ... }} parts are styling, which is Chapter 2. For now, change the words and add lines.',
      code: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
      <Text>Austin's favorite pho truck</Text>
      <Text>Open 11 a.m. to 3 p.m.</Text>
    </View>
  );
}
`,
      challenge: 'Add a fourth line: <Text>East 6th Street</Text>.',
    },
  ],
  apply: {
    scenario: 'Theo\'s first screen.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it does.',
        pairs: [
          ['import { View, Text } ...', 'Brings in the parts you use'],
          ['export default function App()', 'The screen to show'],
          ['return ( ... )', 'What appears on the phone'],
          ['<View>', 'A box that holds things'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where must the words "Pho Real" go?',
        options: [
          { text: 'Straight inside <View>', why: 'In React Native that crashes the app. Words go inside <Text>.' },
          { text: 'Inside <Text> and </Text>' },
          { text: 'Inside the import line', why: 'The import only lists the parts you use.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a line that says "Open 11 a.m. to 3 p.m."',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
      <Text>Open 11 a.m. to 3 p.m.</Text>
    </View>
  );
}
`,
        hint: 'A new <Text>Open 11 a.m. to 3 p.m.</Text> goes on its own line, before </View>.',
        checks: [
          { message: 'The screen says "Open 11 a.m. to 3 p.m."', screen: { text: 'Open 11 a.m. to 3 p.m.' } },
          { message: 'The title is still there', screen: { text: 'Pho Real' } },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the screen\'s lines in order.',
        language: 'typescript',
        lines: ["import { View, Text } from 'react-native';", 'export default function App() {', '  return (', '    <View>', '      <Text>Pho Real</Text>', '    </View>', '  );', '}'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would crash the app.',
        language: 'typescript',
        lines: ['<View>', '  <Text>Pho Real</Text>', '  Open 11 a.m. to 3 p.m.', '</View>'],
        bug: 2,
        fix: '  <Text>Open 11 a.m. to 3 p.m.</Text>',
        explanation: 'Words sitting straight inside a <View> crash a React Native app. Wrap them in <Text>.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the import.',
        language: 'typescript',
        template: "import { [[1]], Text } from '[[2]]';",
        blanks: [['View'], ['react-native']],
        distractors: ['Box', 'react-phone', 'Div'],
      },
      {
        kind: 'writeCode',
        prompt: 'Build a screen from almost nothing: a title "Pho Real" and a line "East 6th Street"',
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
      <Text>Pho Real</Text>
      <Text>East 6th Street</Text>
    </View>
  );
}
`,
        hint: 'Inside the View, write two lines: <Text>Pho Real</Text> and <Text>East 6th Street</Text>.',
        checks: [
          { message: 'The screen says "Pho Real"', screen: { text: 'Pho Real' } },
          { message: 'The screen says "East 6th Street"', screen: { text: 'East 6th Street' } },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s answer.',
        from: 'mai',
        message: '(half asleep) Why is it called App?',
        options: [
          { text: 'It\'s the screen\'s name. "export default" tells React Native this is the one to show.' },
          { text: 'Because Apple says so.', why: 'It\'s just the name we gave the function. "export default" is what matters.' },
          { text: 'No idea.', why: 'Theo knows: App is the screen\'s name.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which part holds words in React Native? (One word.)',
        answers: ['Text', '<Text>', 'text'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Which closing tag ends <View>?',
        options: [
          { text: '<View/>', why: 'That\'s a View with nothing inside. To close one that has children, use </View>.' },
          { text: '<End View>', why: 'Closing tags start with </.' },
          { text: '</View>' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If you built a first screen for something you care about (a shop, a club, a family business), what would its title and first two lines say?',
    starters: ['Title:...', 'Lines:...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'On reactnative.dev, the "Core Components" page lists View and Text with the phone parts they turn into on Android and iPhone.',
  },
  notes: 'Structure: import / export default function App / return JSX / View + Text. Raw text inside View crashes on device ("Text strings must be rendered within a <Text> component."); the runner enforces this. Styling deferred to Chapter 2 (inline style objects given).',
};

export default lesson;
