import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Walkthrough: splitting one screen into components (Header, MenuItem, Footer). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Components are building blocks',
  summary: 'Theo\'s App is 60 lines long and growing. Arjun, on his first video call from Bengaluru: "Your app is one giant function. Break it into pieces." Here\'s how, one step at a time.',
  minutes: 13,
  outcomes: ['Write your own component', 'Use it like a tag: <Header />', 'Split a screen into small, named pieces'],
  learn: [
    {
      kind: 'steps',
      title: 'From one big App to building blocks',
      steps: [
        {
          title: '1. Spot the pieces',
          body: 'Look at the screen like Lego: a header (the name and tagline), the menu, and a footer (opening hours). Each one becomes a component.',
        },
        {
          title: '2. A component is a function that returns JSX',
          body: 'Exactly like App, with its own name. The name MUST start with a capital letter, so React knows it\'s a component, not an HTML-style tag.',
          code: "function Header() {\n  return (\n    <View>\n      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>\n      <Text>Order ahead. Skip the line.</Text>\n    </View>\n  );\n}",
          language: 'typescript',
        },
        {
          title: '3. Use it like a tag',
          body: 'Inside App, <Header /> shows everything Header returns. It closes itself, because nothing goes inside it.',
          code: 'export default function App() {\n  return (\n    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>\n      <Header />\n      <Footer />\n    </View>\n  );\n}',
          language: 'typescript',
        },
        {
          title: '4. Each component returns one box',
          body: 'A component returns ONE thing. If it has several Text lines, wrap them in a View.',
        },
        {
          title: '5. Read App like a table of contents',
          body: 'Now App reads like a list: Header, Footer. When the footer breaks, you know exactly where to look. That\'s why every real app is built from components.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Pho Real, in pieces',
      caption: 'Header and Footer are components. App just puts them in order. Change the opening hours in Footer.',
      code: `import { View, Text } from 'react-native';

function Header() {
  return (
    <View>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
      <Text>Order ahead. Skip the line.</Text>
    </View>
  );
}

function Footer() {
  return <Text style={{ marginTop: 24 }}>Open 11 a.m. to 3 p.m.</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Header />
      <Footer />
    </View>
  );
}
`,
      challenge: 'Use <Footer /> twice in App and see what happens. Then put it back to once.',
    },
  ],
  apply: {
    scenario: 'Arjun\'s first lesson: building blocks.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a React Native component?',
        options: [
          { text: 'A function, with a capital-letter name, that returns JSX' },
          { text: 'A file you download from the store', why: 'You write components yourself, as functions.' },
          { text: 'Any variable', why: 'A component is specifically a function that returns JSX.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Write a Footer component that shows "Open 11 a.m. to 3 p.m.", and use it in App',
        starter: `import { View, Text } from 'react-native';

function Header() {
  return <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Header />
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

function Header() {
  return <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>;
}

function Footer() {
  return <Text>Open 11 a.m. to 3 p.m.</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Header />
      <Footer />
    </View>
  );
}
`,
        hint: 'Copy the shape of Header: function Footer() { return <Text>...</Text>; }. Then add <Footer /> under <Header /> in App.',
        checks: [
          { message: 'The screen says "Open 11 a.m. to 3 p.m."', screen: { text: 'Open 11 a.m. to 3 p.m.' } },
          { message: 'A component called Footer', codeIncludes: 'function Footer' },
          { message: 'App uses <Footer />', codeIncludes: '<Footer' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This component won\'t work as a tag. Which line is the problem?',
        language: 'typescript',
        lines: ['function header() {', '  return <Text>Pho Real</Text>;', '}', '', '<header />'],
        bug: 0,
        fix: 'function Header() {',
        explanation: 'Component names must start with a capital letter. Lower-case <header /> looks like an HTML tag, which React Native doesn\'t have.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the Header component in order.',
        language: 'typescript',
        lines: ['function Header() {', '  return (', '    <View>', '      <Text>Pho Real</Text>', '      <Text>Order ahead. Skip the line.</Text>', '    </View>', '  );', '}'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'Why does a component with two Text lines need a View around them?',
        options: [
          { text: 'It doesn\'t.', why: 'A component returns one thing. Two Texts side by side need one box around them.' },
          { text: 'For the colour.', why: 'It\'s about returning one thing, not colour.' },
          { text: 'A component returns one thing, so the two Texts go inside one View.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'App returns <Header /> <Header /> inside its View. What appears?',
        code: "function Header() {\n  return <Text>Pho Real</Text>;\n}\n// in App:\n<Header />\n<Header />",
        language: 'typescript',
        options: [
          { text: 'An error', why: 'You can use a component as many times as you like.' },
          { text: '"Pho Real" twice' },
          { text: '"Pho Real" once', why: 'Each <Header /> shows its own copy.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Use the component inside App.',
        language: 'typescript',
        template: '<View>\n  [[1]]Header [[2]]\n</View>',
        blanks: [['<'], ['/>']],
        distractors: ['</', '>', '{'],
      },
      {
        kind: 'writeCode',
        prompt: 'Make a Tagline component that shows "Order ahead. Skip the line." and put it under the Header',
        starter: `import { View, Text } from 'react-native';

function Header() {
  return <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Header />
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

function Header() {
  return <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>;
}

function Tagline() {
  return <Text>Order ahead. Skip the line.</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Header />
      <Tagline />
    </View>
  );
}
`,
        hint: 'function Tagline() { return <Text>Order ahead. Skip the line.</Text>; } then <Tagline /> in App.',
        checks: [
          { message: 'The screen says "Order ahead. Skip the line."', screen: { text: 'Order ahead. Skip the line.' } },
          { message: 'A Tagline component', codeIncludes: 'function Tagline' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A component\'s name must start with what kind of letter?',
        answers: ['capital', 'a capital', 'capital letter', 'uppercase', 'upper case', 'a capital letter'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good component name or broken one?',
        groups: ['Works', 'Breaks'],
        items: [
          { text: 'MenuItem', group: 0 },
          { text: 'menuItem', group: 1 },
          { text: 'Footer', group: 0 },
          { text: 'footer', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Look at the home screen of any app you use. Which components would you split it into? Give each a name with a capital letter.',
    starters: ['The app:...', 'My components:...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'React\'s docs page "Your First Component" explains capital-letter names and why components return JSX. Everything there works the same in React Native.',
  },
  notes: 'Function components; names must be capitalised (lower-case JSX tags are treated as host elements). One root element per return (or a Fragment, introduced later). Arjun per CAST (freelance developer, Bengaluru); met Theo on a developers\' forum (outline v2).',
};

export default lesson;
