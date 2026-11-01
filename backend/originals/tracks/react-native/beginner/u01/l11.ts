import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 11. Walkthrough: props. One MenuItem, every dish, with typed props. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Props: one card, every dish',
  summary: 'Theo has five dishes and five copies of the same code. When Linh raises the banh mi price, he has to find it in five places. Props fix that: one MenuItem, fed different details.',
  minutes: 13,
  outcomes: ['Pass details to a component with props', 'Describe props with a TypeScript type', 'Reuse one component for every menu item'],
  learn: [
    {
      kind: 'steps',
      title: 'From five copies to one MenuItem',
      steps: [
        {
          title: '1. Spot what changes',
          body: 'Every menu line has the same shape: a name and a price. Only the details change. Those details become props.',
        },
        {
          title: '2. Describe the props',
          body: 'In TypeScript you say what the component expects. A MenuItem needs a name (text) and a price (a number).',
          code: 'type MenuItemProps = {\n  name: string;\n  price: number;\n};',
          language: 'typescript',
        },
        {
          title: '3. Read them in the component',
          body: 'The component receives the props as its argument. The { name, price } pulls them out, ready to use in braces.',
          code: 'function MenuItem({ name, price }: MenuItemProps) {\n  return <Text>{name} ${price.toFixed(2)}</Text>;\n}',
          language: 'typescript',
        },
        {
          title: '4. Pass them like attributes',
          body: 'Text goes in quotes; numbers and other JavaScript go in braces.',
          code: '<MenuItem name="Large pho" price={13.5} />\n<MenuItem name="Banh mi" price={9} />',
          language: 'typescript',
        },
        {
          title: '5. Change it once, everywhere',
          body: 'Want every price bold? Change MenuItem once and all five dishes update. That\'s why props exist.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'One MenuItem, three dishes',
      caption: 'One component, three uses. Add a fourth: Spring rolls, 5.5.',
      code: `import { View, Text } from 'react-native';

type MenuItemProps = {
  name: string;
  price: number;
};

function MenuItem({ name, price }: MenuItemProps) {
  return <Text style={{ fontSize: 18, marginBottom: 8 }}>{name} \${price.toFixed(2)}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <MenuItem name="Small pho" price={11.5} />
      <MenuItem name="Large pho" price={13.5} />
      <MenuItem name="Banh mi" price={9} />
    </View>
  );
}
`,
      challenge: 'Make every price show in bold by changing MenuItem only once.',
    },
  ],
  apply: {
    scenario: 'One MenuItem for the whole menu.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What are props?',
        options: [
          { text: 'Details you pass into a component, like name and price' },
          { text: 'Pictures in the app', why: 'Props are the details a component receives.' },
          { text: 'A kind of style', why: 'Style is one prop among many. Props are any details passed in.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add Spring rolls ($5.50) and Iced coffee ($4.75) using the MenuItem component',
        starter: `import { View, Text } from 'react-native';

type MenuItemProps = {
  name: string;
  price: number;
};

function MenuItem({ name, price }: MenuItemProps) {
  return <Text style={{ fontSize: 18, marginBottom: 8 }}>{name} \${price.toFixed(2)}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <MenuItem name="Large pho" price={13.5} />
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
  return <Text style={{ fontSize: 18, marginBottom: 8 }}>{name} \${price.toFixed(2)}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <MenuItem name="Large pho" price={13.5} />
      <MenuItem name="Spring rolls" price={5.5} />
      <MenuItem name="Iced coffee" price={4.75} />
    </View>
  );
}
`,
        hint: 'Copy the MenuItem line twice and change the name and price: price={5.5} and price={4.75}.',
        checks: [
          { message: 'Spring rolls for $5.50', screen: { text: 'Spring rolls $5.50' } },
          { message: 'Iced coffee for $4.75', screen: { text: 'Iced coffee $4.75' } },
          { message: 'Use MenuItem, not plain Text', codeIncludes: '<MenuItem name="Spring rolls"' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Pass the details: text in quotes, numbers in braces.',
        language: 'typescript',
        template: '<MenuItem name=[[1]] price=[[2]] />',
        blanks: [['"Banh mi"'], ['{9}']],
        distractors: ['{Banh mi}', '"9"', '(9)'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['type MenuItemProps = {...}', 'Says what the component expects'],
          ['{ name, price }', 'Pulls the props out'],
          ['price={13.5}', 'Passes a number'],
          ['name="Large pho"', 'Passes text'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'Banh mi goes up to $9.50 tomorrow. How long will that take you?',
        options: [
          { text: 'A day, I have to find it everywhere.', why: 'With one MenuItem and one prop, it\'s one number.' },
          { text: 'I can\'t change prices in an app.', why: 'Of course he can: it\'s one prop.' },
          { text: 'Ten seconds: I change one number, price={9.5}.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make every price bold: change MenuItem so the whole line has fontWeight: \'bold\'',
        starter: `import { View, Text } from 'react-native';

type MenuItemProps = {
  name: string;
  price: number;
};

function MenuItem({ name, price }: MenuItemProps) {
  return <Text style={{ fontSize: 18, marginBottom: 8 }}>{name} \${price.toFixed(2)}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <MenuItem name="Large pho" price={13.5} />
      <MenuItem name="Banh mi" price={9} />
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
  return <Text style={{ fontSize: 18, marginBottom: 8, fontWeight: 'bold' }}>{name} \${price.toFixed(2)}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <MenuItem name="Large pho" price={13.5} />
      <MenuItem name="Banh mi" price={9} />
    </View>
  );
}
`,
        hint: 'Inside MenuItem\'s style, add fontWeight: \'bold\' after marginBottom: 8, with a comma.',
        checks: [
          { message: 'Large pho is bold', screen: { style: { of: 'Large pho', prop: 'fontWeight', value: 'bold' } } },
          { message: 'Banh mi is bold too', screen: { style: { of: 'Banh mi', prop: 'fontWeight', value: 'bold' } } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line passes the price the wrong way?',
        language: 'typescript',
        lines: ['<MenuItem name="Small pho" price={11.5} />', '<MenuItem name="Large pho" price="13.5" />', '<MenuItem name="Banh mi" price={9} />'],
        bug: 1,
        fix: '<MenuItem name="Large pho" price={13.5} />',
        explanation: 'In quotes, "13.5" is text, and text has no toFixed. Numbers go in braces: price={13.5}. TypeScript would underline this too.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In MenuItemProps, what type is price? (One word.)',
        answers: ['number'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: '<MenuItem name="Small pho" price={11.5} />\n// MenuItem shows: {name} ${price.toFixed(2)}',
        language: 'typescript',
        options: [
          { text: 'name $price', why: 'Braces show the values passed in.' },
          { text: 'Small pho $11.5', why: 'toFixed(2) gives two decimals.' },
          { text: 'Small pho $11.50' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which prop value is passed correctly?',
        groups: ['Correct', 'Wrong'],
        items: [
          { text: 'price={13.5}', group: 0 },
          { text: 'name="Banh mi"', group: 0 },
          { text: 'price="13.5"', group: 1 },
          { text: 'name={Banh mi}', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What in your own life is "the same shape with different details" (receipts, contacts, recipes)? Which props would its component take?',
    starters: ['The same shape:...', 'Props:...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'React\'s docs page "Passing Props to a Component" goes deeper into props, including default values. It all applies to React Native.',
  },
  notes: 'Props with a TypeScript type alias and destructuring. The runner transpiles without type-checking, so the "TypeScript would underline this" note is about real projects (VS Code). String props in quotes, expressions in braces.',
};

export default lesson;
