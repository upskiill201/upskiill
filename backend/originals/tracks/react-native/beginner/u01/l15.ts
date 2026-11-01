import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 15. Checkpoint 3: lessons 11–14 plus earlier. The lunch-rush test. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the lunch-rush test',
  summary: 'Linh sets the test: during Friday\'s rush, three regulars read the menu on Theo\'s phone with one hand. If anyone squints or the screen goes red, it\'s back to paper. Check props, readable text, errors and devices.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Build a readable menu from one component', 'Fix errors from their messages'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 12:30 p.m.',
      beats: [
        { speaker: 'linh', text: 'Three customers. One hand each. If anyone squints, paper.' },
        { speaker: 'theo', text: 'And if nobody squints?' },
        { speaker: 'linh', text: 'Then we talk.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: props, readable text, errors.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the readable menu: use MenuItem for Large pho (13.5), Banh mi (9) and Iced coffee (4.75), with text size 18 in MenuItem',
        starter: `import { View, Text } from 'react-native';

type MenuItemProps = {
  name: string;
  price: number;
};

function MenuItem({ name, price }: MenuItemProps) {
  return <Text style={{ fontSize: 12 }}>{name} \${price.toFixed(2)}</Text>;
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

type MenuItemProps = {
  name: string;
  price: number;
};

function MenuItem({ name, price }: MenuItemProps) {
  return <Text style={{ fontSize: 18 }}>{name} \${price.toFixed(2)}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
      <MenuItem name="Large pho" price={13.5} />
      <MenuItem name="Banh mi" price={9} />
      <MenuItem name="Iced coffee" price={4.75} />
    </View>
  );
}
`,
        hint: 'Change fontSize: 12 to 18 in MenuItem. Then add three <MenuItem name="..." price={...} /> lines under the title.',
        checks: [
          { message: 'Large pho for $13.50', screen: { text: 'Large pho $13.50' } },
          { message: 'Banh mi for $9.00', screen: { text: 'Banh mi $9.00' } },
          { message: 'Iced coffee for $4.75', screen: { text: 'Iced coffee $4.75' } },
          { message: 'Menu text is size 18 or more', screen: { style: { of: 'Banh mi', prop: 'fontSize', min: 18 } } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A customer squints at grey 11-point text. What\'s the fix?',
        options: [
          { text: 'Tell them to zoom in', why: 'They\'ll walk to the burger truck instead.' },
          { text: 'Bigger text (16 to 20 for menu items) and darker colour' },
          { text: 'Add more items', why: 'More unreadable text doesn\'t help.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line passes a prop the wrong way?',
        language: 'typescript',
        lines: ['<MenuItem name="Large pho" price={13.5} />', '<MenuItem name="Banh mi" price={9} />', '<MenuItem name={Spring rolls} price={5.5} />'],
        bug: 2,
        fix: '<MenuItem name="Spring rolls" price={5.5} />',
        explanation: 'Text goes in quotes. {Spring rolls} tries to run "Spring rolls" as JavaScript, which is a syntax error.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'Red screen says "MenuItem is not defined". It\'s over.',
        options: [
          { text: 'Probably a typo or the component\'s missing. Let me read the line it points to.' },
          { text: 'It\'s over, back to paper.', why: 'It\'s a one-line fix: find where MenuItem should be defined.' },
          { text: 'Restart your phone.', why: 'The phone is fine. The code uses a name that doesn\'t exist.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the crash: the footer\'s words are straight inside a View',
        starter: `import { View, Text } from 'react-native';

function Footer() {
  return <View>Open 11 a.m. to 3 p.m.</View>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
      <Footer />
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

function Footer() {
  return <Text>Open 11 a.m. to 3 p.m.</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
      <Footer />
    </View>
  );
}
`,
        hint: 'In Footer, use <Text> instead of <View> (or wrap the words in Text inside the View).',
        checks: [{ message: 'The hours show without a crash', screen: { text: 'Open 11 a.m. to 3 p.m.' } }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to the lesson.',
        pairs: [
          ['name="Banh mi" price={9}', 'Props'],
          ['fontSize 16 to 20', 'Text people can read'],
          ['Read the first line', 'The red screen'],
          ['Scan the QR with Expo Go', 'From preview to your phone'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Passes the lunch-rush test, or fails?',
        groups: ['Passes', 'Fails'],
        items: [
          { text: 'Menu items at size 18, dark text', group: 0 },
          { text: 'A tiny 10-point "Order" link', group: 1 },
          { text: 'Pale grey prices in the sun', group: 1 },
          { text: 'A 32-point title', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'MenuItem\'s props, typed.',
        language: 'typescript',
        template: 'type MenuItemProps = {\n  name: [[1]];\n  price: [[2]];\n};',
        blanks: [['string'], ['number']],
        distractors: ['text', 'money', 'Text'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many customers take Linh\'s test?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Nobody squints. What does Linh say?',
        options: [
          { text: '"Paper is still better."', why: 'She said they\'d talk, and they do.' },
          { text: '"Fine. Can it take an order yet?"', why: 'That\'s next chapter\'s question, at the end of this one. For now she says something else.' },
          { text: '"Okay. We talk. Tonight, after close."' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Run your own lunch-rush test: ask one person to read your app with one hand. What did they struggle with?',
    starters: ['I asked...', 'They struggled with...'],
  },
  notes: 'Checkpoint for lessons 11–14 with earlier review.',
};

export default lesson;
