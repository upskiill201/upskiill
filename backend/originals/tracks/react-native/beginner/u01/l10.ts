import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10. Checkpoint 2: lessons 6–9 (plus earlier). Arjun's first code review. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: Arjun\'s first review',
  summary: 'Arjun reviews Theo\'s code on a video call from Bengaluru, at 8 p.m. his time. He finds four things. Can you find them first? Check what you know about braces, JSX and components.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Fix JSX and component mistakes', 'Show values with braces and toFixed'],
  learn: [
    {
      kind: 'story',
      title: 'Video call, 9:30 a.m. in Austin',
      beats: [
        { speaker: 'arjun', text: 'It runs. Good. Now let\'s make it right. I found four things.' },
        { speaker: 'theo', text: 'Four? It\'s forty lines.' },
        { speaker: 'arjun', text: 'Ten percent. That\'s a normal first review. Let\'s go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: JavaScript in JSX, and components.',
    items: [
      {
        kind: 'findBug',
        prompt: 'Thing 1: which line shows the wrong price?',
        language: 'typescript',
        lines: ['const smallPrice = 11.5;', '<Text>Small pho ${smallPrice}</Text>', '<Text>Large pho $13.50</Text>'],
        bug: 1,
        fix: '<Text>Small pho ${smallPrice.toFixed(2)}</Text>',
        explanation: 'Without toFixed(2), 11.5 shows as $11.5. Prices need two decimals: $11.50.',
      },
      {
        kind: 'writeCode',
        prompt: 'Fix thing 1: show "Small pho $11.50" from the smallPrice variable',
        starter: `import { View, Text } from 'react-native';

const smallPrice = 11.5;

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>Small pho \${smallPrice}</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

const smallPrice = 11.5;

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>Small pho \${smallPrice.toFixed(2)}</Text>
    </View>
  );
}
`,
        hint: 'Change {smallPrice} to {smallPrice.toFixed(2)}.',
        checks: [{ message: 'The screen says "Small pho $11.50"', screen: { text: 'Small pho $11.50' } }],
      },
      {
        kind: 'mcq',
        prompt: 'Thing 2: Theo named a component menuItem. What happens?',
        options: [
          { text: 'It\'s treated like an HTML tag, which phones don\'t have, so it breaks' },
          { text: 'Nothing, names don\'t matter', why: 'Lower-case names are treated as built-in tags. Components need a capital: MenuItem.' },
          { text: 'It turns bold', why: 'Names don\'t affect style.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix thing 2 and 3: rename the component to Banner (capital B) and use it in App',
        starter: `import { View, Text } from 'react-native';

function banner() {
  return <Text>Festival weekend: order ahead!</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

function Banner() {
  return <Text>Festival weekend: order ahead!</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
      <Banner />
    </View>
  );
}
`,
        hint: 'Rename function banner to function Banner, then add <Banner /> under the title.',
        checks: [
          { message: 'The banner appears', screen: { text: 'Festival weekend: order ahead!' } },
          { message: 'The component is called Banner', codeIncludes: 'function Banner' },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'Thing 4: your Header returns two Text lines next to each other. What\'s wrong?',
        options: [
          { text: 'Nothing, it\'s fine.', why: 'A component returns one thing: wrap the two Texts in a View.' },
          { text: 'They need different colours.', why: 'It\'s about returning one thing, not colour.' },
          { text: 'A component returns one thing. I\'ll wrap them in a View.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each HTML habit to the React Native fix.',
        pairs: [
          ['<div>', '<View>'],
          ['<p>Text</p>', '<Text>Text</Text>'],
          ['<br>', '<View style={{ height: 16 }} />'],
          ['class="title"', 'style={...}'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: "const coffee = { name: 'Iced coffee', price: 4.75 };\n<Text>{coffee.name}: ${coffee.price.toFixed(2)}</Text>",
        language: 'typescript',
        options: [
          { text: 'coffee.name: $4.75', why: 'Braces show the value of coffee.name, not the words.' },
          { text: 'Iced coffee: $4.75' },
          { text: 'Iced coffee: $4.8', why: 'toFixed(2) keeps two decimals: 4.75.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'A component that returns two lines.',
        language: 'typescript',
        template: 'function Header() {\n  return (\n    <[[1]]>\n      <Text>Pho Real</Text>\n      <Text>Order ahead.</Text>\n    </[[2]]>\n  );\n}',
        blanks: [['View'], ['View']],
        distractors: ['div', 'Box', 'Text'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does (11.5).toFixed(2) give?',
        answers: ['11.50', '"11.50"'],
        placeholder: '0.00',
      },
      {
        kind: 'sortGroups',
        prompt: 'Will this work in React Native?',
        groups: ['Works', 'Breaks'],
        items: [
          { text: '<Header />', group: 0 },
          { text: '<header />', group: 1 },
          { text: '<Text>{price}</Text>', group: 0 },
          { text: '<View>Price</View>', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Arjun found four things in forty lines and called it normal. How do you feel about having your work reviewed? What would make it easier?',
    starters: ['Reviews make me feel...', 'It would help if...'],
  },
  notes: 'Checkpoint for lessons 6–9 with earlier review. Time zones: 9:30 a.m. in Austin (CDT, UTC-5) is 8 p.m. in Bengaluru (IST, UTC+5:30).',
};

export default lesson;
