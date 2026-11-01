import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Chat with Tey: the JavaScript recap (const, numbers and toFixed, template strings, objects, arrays, arrow functions) and {braces} in JSX. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The JavaScript you\'ll use',
  summary: 'Bootcamp was three weeks ago and Theo has already forgotten how to show $13.50 instead of 13.5. A fast recap of the JavaScript this course uses, and how it gets onto the screen.',
  minutes: 13,
  outcomes: ['Put JavaScript values on screen with {braces}', 'Show prices with two decimals using toFixed(2)', 'Read objects, arrays and arrow functions in React Native code'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Quick one. The large pho costs 13.5 in your code. What does the menu need to say?', replies: ['$13.50', '13.5'] },
        { tey: '$13.50. Nobody pays $13.5. JavaScript has a tool for it: price.toFixed(2) gives "13.50", always two decimals.', replies: ['And how does it get on the screen?'] },
        { tey: 'Curly braces. Inside JSX, { } means "this part is JavaScript, show its value". So <Text>${price.toFixed(2)}</Text> shows $13.50. The $ is just a character; the braces do the work.', replies: ['What else will I need?'] },
        { tey: 'Four things. const for values that don\'t change. Objects for one thing with details: { name: \'Banh mi\', price: 9 }. Arrays for lists: [pho, banhMi]. And arrow functions: (x) => x * 2.', replies: ['Template strings too?'] },
        { tey: 'Yes: `${dish.name} costs $${dish.price.toFixed(2)}` joins text and values in backticks. Inside JSX you can use them in braces too. That\'s all the JavaScript Chapter 1 needs.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Values on the menu',
      caption: 'The prices live in JavaScript, and braces put them on screen. Change largePrice to 14 and watch the menu update.',
      code: `import { View, Text } from 'react-native';

const largePrice = 13.5;
const banhMi = { name: 'Banh mi', price: 9 };

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Pho Real</Text>
      <Text>Large pho \${largePrice.toFixed(2)}</Text>
      <Text>{banhMi.name} \${banhMi.price.toFixed(2)}</Text>
    </View>
  );
}
`,
      challenge: 'Add an iced coffee object (price 4.75) and show it the same way.',
    },
  ],
  apply: {
    scenario: 'Prices from code.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: 'const price = 9;\n<Text>${price.toFixed(2)}</Text>',
        language: 'typescript',
        options: [
          { text: '$9.00' },
          { text: '$9', why: 'toFixed(2) always gives two decimals: 9.00.' },
          { text: '${price.toFixed(2)}', why: 'Braces in JSX mean "show the value", so it shows the result, not the code.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Show the large pho price from the variable, with two decimals: "Large pho $13.50"',
        starter: `import { View, Text } from 'react-native';

const largePrice = 13.5;

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>Large pho</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

const largePrice = 13.5;

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>Large pho \${largePrice.toFixed(2)}</Text>
    </View>
  );
}
`,
        hint: 'After "Large pho", type a space, a $ sign, then {largePrice.toFixed(2)}.',
        checks: [
          { message: 'The screen says "Large pho $13.50"', screen: { text: 'Large pho $13.50' } },
          { message: 'Use the largePrice variable', codeIncludes: 'largePrice.toFixed(2)' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the JavaScript to what it is.',
        pairs: [
          ["{ name: 'Banh mi', price: 9 }", 'An object'],
          ['[pho, banhMi, coffee]', 'An array'],
          ['(x) => x * 2', 'An arrow function'],
          ['const', 'A value that doesn\'t change'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Two decimals, every time.',
        language: 'typescript',
        template: '<Text>${coffee.price.[[1]](2)}</Text>',
        blanks: [['toFixed']],
        distractors: ['round', 'decimals', 'toString'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'Why put the prices in code at the top? Just type them on the screen.',
        options: [
          { text: 'Typing is faster.', why: 'Once, maybe. But the price appears in many places: menu, cart, receipt.' },
          { text: 'Code is cooler.', why: 'Not a reason Linh will accept.' },
          { text: 'When the price changes, I change one number and every screen updates.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Show the iced coffee from the object: "Iced coffee $4.75"',
        starter: `import { View, Text } from 'react-native';

const coffee = { name: 'Iced coffee', price: 4.75 };

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>

    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

const coffee = { name: 'Iced coffee', price: 4.75 };

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>{coffee.name} \${coffee.price.toFixed(2)}</Text>
    </View>
  );
}
`,
        hint: 'Inside a <Text>: {coffee.name}, a space, a $ sign, then {coffee.price.toFixed(2)}.',
        checks: [
          { message: 'The screen says "Iced coffee $4.75"', screen: { text: 'Iced coffee $4.75' } },
          { message: 'Use the coffee object', codeIncludes: 'coffee.name' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What do curly braces { } mean inside JSX?',
        options: [
          { text: 'Start a new screen', why: 'Braces show a JavaScript value; screens are functions like App.' },
          { text: 'This part is JavaScript: show its value' },
          { text: 'Make the text bold', why: 'Bold is a style (fontWeight). Braces show values.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does (5.5).toFixed(2) give? (Type it exactly.)',
        answers: ['5.50', '"5.50"'],
        placeholder: '0.00',
      },
      {
        kind: 'sortGroups',
        prompt: 'Object or array?',
        groups: ['Object', 'Array'],
        items: [
          { text: "{ name: 'Large pho', price: 13.5 }", group: 0 },
          { text: "['Small', 'Large']", group: 1 },
          { text: '[11.5, 13.5, 9]', group: 1 },
          { text: '{ open: 11, close: 15 }', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: "const dish = { name: 'Spring rolls', price: 5.5 };\n<Text>{dish.name} costs ${dish.price.toFixed(2)}</Text>",
        language: 'typescript',
        options: [
          { text: 'dish.name costs $5.5', why: 'Braces show values, and toFixed(2) gives 5.50.' },
          { text: 'Spring rolls costs $5.50' },
          { text: 'Spring rolls costs 5.50', why: 'The $ before the braces is plain text, so it appears.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which bit of JavaScript feels shakiest for you: braces, toFixed, objects, arrays or arrow functions? Write one example of it from memory.',
    starters: ['Shakiest:...', 'My example:...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'If JavaScript basics feel rusty, Teyro\'s TypeScript for Beginners covers values, text, numbers and objects from zero, with code you run in every lesson.',
  },
  notes: 'Number.prototype.toFixed(2) returns a string with two decimals. JSX: { } embeds expressions; "$" outside braces is literal text. The lesson\'s code uses \\$ in template literals of this file only (escaped for the TS source).',
};

export default lesson;
