import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 17. Build: the menu, from Linh's chalkboard (Tap to explore) to MenuItem and SectionTitle components. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Build: the menu',
  summary: 'Linh\'s chalkboard has been the menu for twelve years, and it has rules nobody wrote down. Tap through the board, then turn it into the app\'s menu.',
  minutes: 14,
  outcomes: ['Turn a real-world menu into components and props', 'Group items with a reusable section title', 'Build the full v0.1 menu'],
  learn: [
    {
      kind: 'explore',
      title: 'Linh\'s chalkboard',
      text: 'PHO REAL. PHO: Small $11.50. Large $13.50. Add brisket +$3.00. SIDES: Banh mi $9.00. Spring rolls (2) $5.50. DRINKS: Iced coffee $4.75. No onions? Just ask. Extra lime always free. Cash or card. Ray says: order number, not your name.',
      hotspots: [
        { phrase: 'PHO:', note: 'A section title. In the app: one SectionTitle component, used three times with a title prop.' },
        { phrase: 'Large $13.50', note: 'A MenuItem: name="Large pho" price={13.5}. The $ and the .50 come from toFixed(2).' },
        { phrase: 'Add brisket +$3.00', note: 'An extra, not a dish. Extras arrive in Chapter 3, with the "build your bowl" cart.' },
        { phrase: 'Spring rolls (2) $5.50', note: 'The (2) is part of the name: name="Spring rolls (2)".' },
        { phrase: 'No onions? Just ask.', note: 'A note, not an item. Small print, size 13 to 14.' },
        { phrase: 'Extra lime always free', note: 'Free things still need saying. Mai will ask for it in every test.' },
        { phrase: 'Ray says: order number, not your name.', note: 'Ray\'s rule becomes the order screen\'s big number in Chapter 4.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The menu, in sections',
      caption: 'SectionTitle and MenuItem make the board. Add the SIDES section with Banh mi and Spring rolls (2).',
      code: `import { View, Text } from 'react-native';

function SectionTitle({ title }: { title: string }) {
  return <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#9a3412', marginTop: 20, letterSpacing: 1 }}>{title}</Text>;
}

function MenuItem({ name, price }: { name: string; price: number }) {
  return <Text style={{ fontSize: 18, marginTop: 6 }}>{name} \${price.toFixed(2)}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 34, fontWeight: 'bold' }}>Pho Real</Text>
      <SectionTitle title="PHO" />
      <MenuItem name="Small pho" price={11.5} />
      <MenuItem name="Large pho" price={13.5} />
    </View>
  );
}
`,
      challenge: 'Add a DRINKS section with Iced coffee at 4.75.',
    },
  ],
  apply: {
    scenario: 'Chalkboard to app.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which part of the board is it?',
        groups: ['MenuItem', 'Not a menu item'],
        items: [
          { text: 'Large $13.50', group: 0 },
          { text: 'No onions? Just ask.', group: 1 },
          { text: 'Iced coffee $4.75', group: 0 },
          { text: 'Cash or card', group: 1 },
          { text: 'Banh mi $9.00', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add the SIDES section: a SectionTitle "SIDES", then Banh mi (9) and Spring rolls (2) (5.5)',
        starter: `import { View, Text } from 'react-native';

function SectionTitle({ title }: { title: string }) {
  return <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 20 }}>{title}</Text>;
}

function MenuItem({ name, price }: { name: string; price: number }) {
  return <Text style={{ fontSize: 18, marginTop: 6 }}>{name} \${price.toFixed(2)}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <SectionTitle title="PHO" />
      <MenuItem name="Large pho" price={13.5} />
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

function SectionTitle({ title }: { title: string }) {
  return <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 20 }}>{title}</Text>;
}

function MenuItem({ name, price }: { name: string; price: number }) {
  return <Text style={{ fontSize: 18, marginTop: 6 }}>{name} \${price.toFixed(2)}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <SectionTitle title="PHO" />
      <MenuItem name="Large pho" price={13.5} />
      <SectionTitle title="SIDES" />
      <MenuItem name="Banh mi" price={9} />
      <MenuItem name="Spring rolls (2)" price={5.5} />
    </View>
  );
}
`,
        hint: 'After the pho: <SectionTitle title="SIDES" />, then two MenuItem lines.',
        checks: [
          { message: 'A SIDES section', screen: { text: 'SIDES' } },
          { message: 'Banh mi for $9.00', screen: { text: 'Banh mi $9.00' } },
          { message: 'Spring rolls (2) for $5.50', screen: { text: 'Spring rolls (2) $5.50' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "No onions? Just ask." small print and not a MenuItem?',
        options: [
          { text: 'It has no price: it\'s a note, so it gets a smaller, quieter style' },
          { text: 'Because Linh doesn\'t like onions', why: 'It\'s about what kind of line it is: a note, not a dish.' },
          { text: 'MenuItems can\'t have question marks', why: 'They can. It\'s just not a dish.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the board to the code.',
        pairs: [
          ['PHO:', '<SectionTitle title="PHO" />'],
          ['Small $11.50', '<MenuItem name="Small pho" price={11.5} />'],
          ['Iced coffee $4.75', '<MenuItem name="Iced coffee" price={4.75} />'],
          ['Add brisket +$3.00', 'An extra, coming in Chapter 3'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'Why does SectionTitle exist? Just type PHO in a Text.',
        options: [
          { text: 'You\'re right, I\'ll delete it.', why: 'Three sections that must look the same: one component keeps them identical.' },
          { text: 'Components are required by law.', why: 'Not a thing.' },
          { text: 'Three sections, one style. If Mum wants them bigger, I change one place.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a DRINKS section with Iced coffee (4.75), and a small note "Extra lime always free" at size 14',
        starter: `import { View, Text } from 'react-native';

function SectionTitle({ title }: { title: string }) {
  return <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 20 }}>{title}</Text>;
}

function MenuItem({ name, price }: { name: string; price: number }) {
  return <Text style={{ fontSize: 18, marginTop: 6 }}>{name} \${price.toFixed(2)}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <SectionTitle title="PHO" />
      <MenuItem name="Large pho" price={13.5} />
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

function SectionTitle({ title }: { title: string }) {
  return <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 20 }}>{title}</Text>;
}

function MenuItem({ name, price }: { name: string; price: number }) {
  return <Text style={{ fontSize: 18, marginTop: 6 }}>{name} \${price.toFixed(2)}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <SectionTitle title="PHO" />
      <MenuItem name="Large pho" price={13.5} />
      <SectionTitle title="DRINKS" />
      <MenuItem name="Iced coffee" price={4.75} />
      <Text style={{ fontSize: 14, marginTop: 16 }}>Extra lime always free</Text>
    </View>
  );
}
`,
        hint: '<SectionTitle title="DRINKS" />, <MenuItem name="Iced coffee" price={4.75} />, then a Text with style={{ fontSize: 14 }}.',
        checks: [
          { message: 'A DRINKS section', screen: { text: 'DRINKS' } },
          { message: 'Iced coffee for $4.75', screen: { text: 'Iced coffee $4.75' } },
          { message: 'The lime note at size 14', screen: { style: { of: 'Extra lime always free', prop: 'fontSize', value: '14' } } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The section title component.',
        language: 'typescript',
        template: 'function SectionTitle({ [[1]] }: { title: string }) {\n  return <Text>{[[2]]}</Text>;\n}',
        blanks: [['title'], ['title']],
        distractors: ['name', 'props', 'text'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much does adding brisket cost, in dollars? (Like 0.00)',
        answers: ['3.00', '$3.00', '3', '$3'],
        placeholder: '0.00',
      },
      {
        kind: 'findBug',
        prompt: 'Which line shows the price as "$5.5"?',
        language: 'typescript',
        lines: ['function MenuItem({ name, price }: { name: string; price: number }) {', '  return <Text>{name} ${price}</Text>;', '}'],
        bug: 1,
        fix: '  return <Text>{name} ${price.toFixed(2)}</Text>;',
        explanation: 'Without toFixed(2), 5.5 shows as $5.5. Prices always get two decimals.',
      },
      {
        kind: 'mcq',
        prompt: 'Ray\'s rule "order number, not your name" becomes what, later?',
        options: [
          { text: 'A new truck', why: 'It becomes a screen: the big order number, Chapter 4.' },
          { text: 'A section title', why: 'It\'s about the order screen in Chapter 4.' },
          { text: 'The order screen\'s big number, in Chapter 4' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Find a real menu, price list or board near you. Which lines would be SectionTitles, which MenuItems, and which small print?',
    starters: ['SectionTitles:...', 'MenuItems:...', 'Small print:...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Put the full menu on your phone with Expo Go. Read it outside with one hand. Is the small print still readable?',
  },
  notes: 'Build lesson. Chalkboard content fictional; prices per outline (USD). Extras (brisket) deferred to Chapter 3, order numbers to Chapter 4.',
};

export default lesson;
