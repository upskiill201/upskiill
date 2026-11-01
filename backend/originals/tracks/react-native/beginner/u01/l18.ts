import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 18. Before/After: Arjun's code review (names, constants, small components, no copy-paste). */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Code review with Arjun',
  summary: 'Theo\'s menu works. Arjun scrolls through it in silence for a long minute, then says, "It works. Now make it so you can still read it in a month." See what changes.',
  minutes: 13,
  outcomes: ['Spot copy-paste code and replace it with a component', 'Keep prices in named constants at the top', 'Name things so the code explains itself'],
  learn: [
    {
      kind: 'compare',
      title: 'The menu, before and after review',
      before: {
        label: 'Theo\'s first version: it works',
        text: "export default function App() {\n  return (\n    <View style={{ padding: 24 }}>\n      <Text style={{ fontSize: 18, marginTop: 6 }}>Small pho ${(11.5).toFixed(2)}</Text>\n      <Text style={{ fontSize: 18, marginTop: 6 }}>Large pho ${(13.5).toFixed(2)}</Text>\n      <Text style={{ fontSize: 18, marginTop: 6 }}>Banh mi ${(9).toFixed(2)}</Text>\n      <Text style={{ fontSize: 18, marginTop: 6 }}>Iced coffee ${(4.75).toFixed(2)}</Text>\n    </View>\n  );\n}",
      },
      after: {
        label: 'After Arjun\'s review: same screen, easy to change',
        text: "const PRICES = { smallPho: 11.5, largePho: 13.5, banhMi: 9, icedCoffee: 4.75 };\n\nfunction MenuItem({ name, price }: { name: string; price: number }) {\n  return <Text style={{ fontSize: 18, marginTop: 6 }}>{name} ${price.toFixed(2)}</Text>;\n}\n\nexport default function App() {\n  return (\n    <View style={{ padding: 24 }}>\n      <MenuItem name=\"Small pho\" price={PRICES.smallPho} />\n      <MenuItem name=\"Large pho\" price={PRICES.largePho} />\n      <MenuItem name=\"Banh mi\" price={PRICES.banhMi} />\n      <MenuItem name=\"Iced coffee\" price={PRICES.icedCoffee} />\n    </View>\n  );\n}",
      },
      notes: [
        'The same style was copied four times. Now it lives once, in MenuItem: change the size in one place.',
        'Prices were buried inside the screen. Now they sit in one PRICES object at the top, where Linh\'s next price change is a ten-second job.',
        'Names explain themselves: PRICES.banhMi says what it is; a bare 9 doesn\'t.',
        'The screen looks exactly the same. Review is about the next person to read the code, often you, next month.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Change a price in one place',
      caption: 'Linh raises the banh mi to $9.50. Change one number in PRICES and watch the menu update.',
      code: `import { View, Text } from 'react-native';

const PRICES = { smallPho: 11.5, largePho: 13.5, banhMi: 9, icedCoffee: 4.75 };

function MenuItem({ name, price }: { name: string; price: number }) {
  return <Text style={{ fontSize: 18, marginTop: 6 }}>{name} \${price.toFixed(2)}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <MenuItem name="Small pho" price={PRICES.smallPho} />
      <MenuItem name="Large pho" price={PRICES.largePho} />
      <MenuItem name="Banh mi" price={PRICES.banhMi} />
      <MenuItem name="Iced coffee" price={PRICES.icedCoffee} />
    </View>
  );
}
`,
      challenge: 'Add springRolls: 5.5 to PRICES and a MenuItem that uses it.',
    },
  ],
  apply: {
    scenario: 'Arjun\'s review.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was the main problem with Theo\'s first version?',
        options: [
          { text: 'The same style and pattern were copied four times, so every change meant four edits' },
          { text: 'It didn\'t work', why: 'It worked fine. Review is about keeping it easy to change.' },
          { text: 'The prices were wrong', why: 'The prices were right, just buried and repeated.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Refactor: replace the copied Text lines with MenuItem, using the PRICES object',
        starter: `import { View, Text } from 'react-native';

const PRICES = { largePho: 13.5, banhMi: 9 };

function MenuItem({ name, price }: { name: string; price: number }) {
  return <Text style={{ fontSize: 18, marginTop: 6 }}>{name} \${price.toFixed(2)}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 18, marginTop: 6 }}>Large pho $13.50</Text>
      <Text style={{ fontSize: 18, marginTop: 6 }}>Banh mi $9.00</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

const PRICES = { largePho: 13.5, banhMi: 9 };

function MenuItem({ name, price }: { name: string; price: number }) {
  return <Text style={{ fontSize: 18, marginTop: 6 }}>{name} \${price.toFixed(2)}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <MenuItem name="Large pho" price={PRICES.largePho} />
      <MenuItem name="Banh mi" price={PRICES.banhMi} />
    </View>
  );
}
`,
        hint: 'Swap each Text for <MenuItem name="..." price={PRICES....} />.',
        checks: [
          { message: 'Large pho for $13.50', screen: { text: 'Large pho $13.50' } },
          { message: 'Banh mi for $9.00', screen: { text: 'Banh mi $9.00' } },
          { message: 'Prices come from PRICES', codeIncludes: 'PRICES.banhMi' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Would Arjun approve?',
        groups: ['Approve', 'Change it'],
        items: [
          { text: 'const PRICES = { banhMi: 9 }', group: 0 },
          { text: 'The same style typed on every line', group: 1 },
          { text: 'A component called MenuItem', group: 0 },
          { text: 'A variable called x2', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'The screen looks identical after the refactor. So why bother?',
        options: [
          { text: 'Because the next change takes ten seconds instead of ten minutes, and nothing gets missed.' },
          { text: 'To make the code longer.', why: 'It\'s about making change easy, not length.' },
          { text: 'No reason, I\'ll undo it.', why: 'The reason is the next price change.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Linh\'s price change: make the banh mi $9.50 by changing PRICES only',
        starter: `import { View, Text } from 'react-native';

const PRICES = { largePho: 13.5, banhMi: 9 };

function MenuItem({ name, price }: { name: string; price: number }) {
  return <Text style={{ fontSize: 18, marginTop: 6 }}>{name} \${price.toFixed(2)}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <MenuItem name="Large pho" price={PRICES.largePho} />
      <MenuItem name="Banh mi" price={PRICES.banhMi} />
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

const PRICES = { largePho: 13.5, banhMi: 9.5 };

function MenuItem({ name, price }: { name: string; price: number }) {
  return <Text style={{ fontSize: 18, marginTop: 6 }}>{name} \${price.toFixed(2)}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <MenuItem name="Large pho" price={PRICES.largePho} />
      <MenuItem name="Banh mi" price={PRICES.banhMi} />
    </View>
  );
}
`,
        hint: 'In the PRICES line at the top, change banhMi: 9 to banhMi: 9.5.',
        checks: [
          { message: 'Banh mi for $9.50', screen: { text: 'Banh mi $9.50' } },
          { message: 'Changed in PRICES', codeIncludes: 'banhMi: 9.5' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each review note to its fix.',
        pairs: [
          ['Copied style on every line', 'One MenuItem component'],
          ['Prices buried in the screen', 'A PRICES object at the top'],
          ['A number with no name', 'PRICES.banhMi'],
          ['A component called item', 'Rename it MenuItem'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Use the named price.',
        language: 'typescript',
        template: '<MenuItem name="Large pho" price={[[1]].[[2]]} />',
        blanks: [['PRICES'], ['largePho']],
        distractors: ['prices', 'large', '13.5'],
      },
      {
        kind: 'mcq',
        prompt: 'Why write PRICES in capitals?',
        options: [
          { text: 'JavaScript needs capitals for objects', why: 'It doesn\'t. It\'s a naming habit.' },
          { text: 'It\'s louder', why: 'It\'s a signal to readers, not volume.' },
          { text: 'A common habit for values set once at the top that never change while the app runs' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'After the review, how many places do you change to restyle every menu line? (A number.)',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Arjun circles one name. Which line?',
        language: 'typescript',
        lines: ['const PRICES = { largePho: 13.5 };', 'const x = 9;', 'function MenuItem({ name, price }: { name: string; price: number }) {'],
        bug: 1,
        fix: 'const BANH_MI_PRICE = 9; // or banhMi: 9 inside PRICES',
        explanation: 'x says nothing. In a month nobody (including Theo) will know it\'s the banh mi price.',
      },
    ],
  },
  reflect: {
    prompt: 'Look back at your code from this chapter. What would Arjun circle? Pick one thing and fix it.',
    starters: ['Arjun would circle...', 'My fix:...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'The idea behind this review has a name: DRY, "don\'t repeat yourself". Search for it, and look out for copy-paste in your next build.',
  },
  notes: 'Refactoring: extract component, named constants, meaningful names. UPPER_CASE for module-level constants is a convention, not a rule. Banh mi price change to $9.50 is local to this exercise; the menu standard stays $9.00 for the rest of Chapter 1.',
};

export default lesson;
