import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Before/After: the bootcamp HTML menu vs the same thing in React Native JSX. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'JSX: HTML\'s cousin',
  summary: 'At bootcamp Theo built Pho Real a one-page website in HTML. He pastes it into his app and gets a red screen. JSX looks like HTML, but it plays by phone rules. See exactly what changes.',
  minutes: 12,
  outcomes: ['Turn HTML tags into React Native components', 'Know why there are no h1, p or div tags on a phone', 'Use style instead of class'],
  learn: [
    {
      kind: 'compare',
      title: 'The same menu, two ways',
      before: {
        label: 'Theo\'s bootcamp website (HTML)',
        text: '<div class="menu">\n  <h1>Pho Real</h1>\n  <p>Large pho $13.50</p>\n  <p>Banh mi $9.00</p>\n  <br>\n</div>',
      },
      after: {
        label: 'The same thing in React Native (JSX)',
        text: '<View style={styles.menu}>\n  <Text style={styles.title}>Pho Real</Text>\n  <Text>Large pho $13.50</Text>\n  <Text>Banh mi $9.00</Text>\n</View>',
      },
      notes: [
        'div becomes View: a box. Phones don\'t know HTML tags.',
        'h1 and p both become Text. There are no heading sizes built in: a title is a Text with a big fontSize (Chapter 2).',
        'class becomes style. Styles are JavaScript objects, not CSS files.',
        'Every tag must close. HTML forgives <br>; JSX doesn\'t. A tag with nothing inside closes itself: <View />.',
        'Words only live inside Text. In HTML you can type words almost anywhere; in React Native that crashes.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Translate it',
      caption: 'This is the React Native version of Theo\'s website. Add the spring rolls ($5.50) the React Native way.',
      code: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
      <Text>Large pho $13.50</Text>
      <Text>Banh mi $9.00</Text>
    </View>
  );
}
`,
      challenge: 'Add a thin empty box between the title and the menu as a gap: <View style={{ height: 16 }} />. Notice it closes itself.',
    },
  ],
  apply: {
    scenario: 'From website to app.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each HTML tag to its React Native component.',
        pairs: [
          ['<div>', '<View>'],
          ['<h1>', '<Text> with a big fontSize'],
          ['<p>', '<Text>'],
          ['class="..."', 'style={...}'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Translate this HTML into React Native: <h1>Pho Real</h1> <p>Iced coffee $4.75</p>',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <h1>Pho Real</h1>
      <p>Iced coffee $4.75</p>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>Pho Real</Text>
      <Text>Iced coffee $4.75</Text>
    </View>
  );
}
`,
        hint: 'Swap <h1>...</h1> and <p>...</p> for <Text>...</Text>.',
        checks: [
          { message: 'The screen says "Pho Real"', screen: { text: 'Pho Real' } },
          { message: 'The screen says "Iced coffee $4.75"', screen: { text: 'Iced coffee $4.75' } },
          { message: 'No HTML tags left', codeIncludes: '<Text>Iced coffee' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t a React Native app use <h1>?',
        options: [
          { text: 'It can, it just looks smaller', why: 'Phones don\'t have HTML tags at all. Use Text and style it.' },
          { text: 'Because h1 is only for websites; on a phone everything is View, Text and friends' },
          { text: 'Because titles aren\'t allowed in apps', why: 'Titles are fine: a Text with a big fontSize.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks the JSX rules?',
        language: 'typescript',
        lines: ['<View>', '  <Text>Pho Real</Text>', '  <br>', '  <Text>Banh mi $9.00</Text>', '</View>'],
        bug: 2,
        fix: '  <View style={{ height: 16 }} />',
        explanation: 'HTML forgives an unclosed <br>, but JSX needs every tag closed, and <br> isn\'t a phone component anyway. Use a small View as a gap.',
      },
      {
        kind: 'sortGroups',
        prompt: 'HTML habit or React Native way?',
        groups: ['HTML habit', 'React Native way'],
        items: [
          { text: 'class="title"', group: 0 },
          { text: 'style={styles.title}', group: 1 },
          { text: 'Words typed straight into a box', group: 0 },
          { text: 'Every word inside <Text>', group: 1 },
          { text: '<View />', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'So all your HTML homework was useless?',
        options: [
          { text: 'Not at all. Tags, nesting and closing tags work the same. I\'m just swapping div for View and p for Text.' },
          { text: 'Yes, total waste.', why: 'Far from it: the structure carries straight over.' },
          { text: 'I\'ll just use HTML in the app.', why: 'The app would crash. Phones don\'t understand HTML tags.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A box with nothing inside closes itself.',
        language: 'typescript',
        template: '<View style={{ height: 16 }} [[1]]',
        blanks: [['/>']],
        distractors: ['>', '</View', '//'],
      },
      {
        kind: 'writeCode',
        prompt: 'Add a gap: put <View style={{ height: 16 }} /> between the title and the menu, and add "Spring rolls $5.50"',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
      <Text>Large pho $13.50</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
      <View style={{ height: 16 }} />
      <Text>Large pho $13.50</Text>
      <Text>Spring rolls $5.50</Text>
    </View>
  );
}
`,
        hint: 'Put <View style={{ height: 16 }} /> on the line after the title, and <Text>Spring rolls $5.50</Text> after the pho.',
        checks: [
          { message: 'Spring rolls for $5.50', screen: { text: 'Spring rolls $5.50' } },
          { message: 'A self-closing gap View', codeIncludes: '/>' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'HTML\'s <div> becomes which React Native component? (One word.)',
        answers: ['View', '<View>', 'view'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Where do React Native styles live?',
        options: [
          { text: 'In a separate .css file', why: 'React Native has no CSS files. Styles are JavaScript objects.' },
          { text: 'In the HTML class attribute', why: 'There\'s no class in React Native: use style.' },
          { text: 'In JavaScript objects, passed with style={...}' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If you\'ve written any HTML before, which habit will be hardest to drop? If you haven\'t, which rule surprised you most?',
    starters: ['Hardest habit:...', 'Surprise:...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'React\'s own docs have a short page, "Writing Markup with JSX", on why every tag closes and how braces work. It applies to React Native too.',
  },
  notes: 'JSX rules: single root returned, all tags closed, camelCase props, style objects not CSS classes. React Native has no HTML elements; RN has no default heading styles. Images (Image component) are taught in Chapter 2.',
};

export default lesson;
