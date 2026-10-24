import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 20. Unit Challenge: v0.1, Linh sees it. The whole chapter in one build; cliffhanger into Chapter 2. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'v0.1: Linh sees it',
  summary: 'Sunday night, the truck is closed, and Theo hands his mum his phone. Header, menu, footer, one honest button. Build v0.1 with everything from Chapter 1, then see what Linh says.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a complete first screen from components and props', 'Fix the chapter\'s classic mistakes on your own'],
  learn: [
    {
      kind: 'story',
      title: 'Sunday, 9:40 p.m., the closed truck',
      beats: [
        { speaker: 'narrator', text: 'The fryer is off. Ray has gone home. Theo slides his phone across the counter.' },
        { speaker: 'theo', text: 'Pho Real, version 0.1. Be honest.' },
        { speaker: 'linh', text: 'I\'m always honest.' },
        { speaker: 'tey', text: 'Build the version Linh is about to hold. Then we\'ll see if she\'s honest.' },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: Pho Real v0.1.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build v0.1: a Header ("Pho Real", size 32+), a PHO section with Large pho (13.5) via MenuItem, and an "Order ahead" button that alerts "Coming in v0.3"',
        starter: `import { View, Text, Pressable, Alert } from 'react-native';

function MenuItem({ name, price }: { name: string; price: number }) {
  return <Text style={{ fontSize: 18, marginTop: 6 }}>{name} \${price.toFixed(2)}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>

    </View>
  );
}
`,
        solution: `import { View, Text, Pressable, Alert } from 'react-native';

function MenuItem({ name, price }: { name: string; price: number }) {
  return <Text style={{ fontSize: 18, marginTop: 6 }}>{name} \${price.toFixed(2)}</Text>;
}

function Header() {
  return <Text style={{ fontSize: 34, fontWeight: 'bold' }}>Pho Real</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Header />
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 20 }}>PHO</Text>
      <MenuItem name="Large pho" price={13.5} />
      <Pressable
        onPress={() => Alert.alert('Coming in v0.3')}
        style={{ paddingVertical: 16, backgroundColor: '#9a3412', borderRadius: 14, marginTop: 24, alignItems: 'center' }}
      >
        <Text style={{ fontSize: 18, color: 'white' }}>Order ahead</Text>
      </Pressable>
    </View>
  );
}
`,
        hint: 'Write a Header component, then in App: <Header />, a PHO title, <MenuItem name="Large pho" price={13.5} />, and a Pressable whose onPress calls Alert.alert(\'Coming in v0.3\').',
        checks: [
          { message: 'A big "Pho Real" title (32+)', screen: { style: { of: 'Pho Real', prop: 'fontSize', min: 32 } } },
          { message: 'Large pho for $13.50', screen: { text: 'Large pho $13.50' } },
          { message: 'An "Order ahead" button', screen: { button: 'Order ahead' } },
          { message: 'Tapping it says "Coming in v0.3"', screen: { tap: ['Order ahead'], text: 'Coming in v0.3' } },
          { message: 'A Header component', codeIncludes: 'function Header' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Day 1\'s question: why does an order-ahead app shorten the line?',
        options: [
          { text: 'Cooking gets faster', why: 'The broth takes the same time. Ordering stops happening at the window.' },
          { text: 'People order on the way, so the window only hands out bowls' },
          { text: 'Fewer people come', why: 'The goal is the same people, served faster.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'v0.1 crashes on Linh\'s phone. Which line?',
        language: 'typescript',
        lines: ['<View style={{ padding: 24 }}>', '  <Header />', '  Today: spring rolls are back!', '  <MenuItem name="Large pho" price={13.5} />', '</View>'],
        bug: 2,
        fix: '  <Text>Today: spring rolls are back!</Text>',
        explanation: 'Words straight inside a View crash a real phone. Every word lives in a Text.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece of v0.1 to what built it.',
        pairs: [
          ['The menu lines', 'MenuItem with name and price props'],
          ['$13.50, not $13.5', 'toFixed(2)'],
          ['The order button', 'Pressable and onPress'],
          ['"Coming in v0.3"', 'Alert.alert'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix Arjun\'s last three review notes: rename menuitem to MenuItem, show two decimals, and use it for Banh mi (9)',
        starter: `import { View, Text } from 'react-native';

function menuitem({ name, price }: { name: string; price: number }) {
  return <Text style={{ fontSize: 18 }}>{name} \${price}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 34, fontWeight: 'bold' }}>Pho Real</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

function MenuItem({ name, price }: { name: string; price: number }) {
  return <Text style={{ fontSize: 18 }}>{name} \${price.toFixed(2)}</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 34, fontWeight: 'bold' }}>Pho Real</Text>
      <MenuItem name="Banh mi" price={9} />
    </View>
  );
}
`,
        hint: 'function MenuItem (capital M and I), {price.toFixed(2)} instead of {price}, then <MenuItem name="Banh mi" price={9} /> in App.',
        checks: [
          { message: 'Banh mi for $9.00', screen: { text: 'Banh mi $9.00' } },
          { message: 'The component is called MenuItem', codeIncludes: 'function MenuItem' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'In v0.1 or coming later?',
        groups: ['In v0.1', 'Coming later'],
        items: [
          { text: 'A readable menu with prices', group: 0 },
          { text: 'Building a custom bowl', group: 1 },
          { text: 'An honest "Coming in v0.3" button', group: 0 },
          { text: '"Is my order ready?"', group: 1 },
          { text: 'Running on a real phone', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'The menu is right. The prices are right. I can read it without my glasses. But I tap the button and it says "coming soon".',
        options: [
          { text: 'That\'s v0.3. Two chapters. First the menu has to look good enough for festival crowds.' },
          { text: 'It\'s finished, Mum.', why: 'It isn\'t: ordering is the whole point, and it\'s two chapters away.' },
          { text: 'You\'re not meant to tap it.', why: 'Everyone taps it. That\'s why it says honestly when ordering arrives.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'v0.1\'s menu line, from memory.',
        language: 'typescript',
        template: '<[[1]] name="Iced coffee" price={[[2]]} />',
        blanks: [['MenuItem'], ['4.75']],
        distractors: ['menuItem', '"4.75"', 'Text'],
      },
      {
        kind: 'writeCode',
        prompt: 'Add a Banner component that takes days and shows "Eastside Food Truck Festival in 28 days" under the title',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 34, fontWeight: 'bold' }}>Pho Real</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

function Banner({ days }: { days: number }) {
  return <Text style={{ fontSize: 16, marginTop: 12 }}>Eastside Food Truck Festival in {days} days</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 34, fontWeight: 'bold' }}>Pho Real</Text>
      <Banner days={28} />
    </View>
  );
}
`,
        hint: 'function Banner({ days }: { days: number }) { return <Text>Eastside Food Truck Festival in {days} days</Text>; } and <Banner days={28} />.',
        checks: [
          { message: 'The banner says 28 days', screen: { text: 'Eastside Food Truck Festival in 28 days' } },
          { message: 'A Banner component with a days prop', codeIncludes: 'days={28}' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The red screen says "Pressable is not defined". First move?',
        options: [
          { text: 'Rewrite the whole screen', why: 'The message names one thing: Pressable isn\'t imported.' },
          { text: 'Switch to paper', why: 'Linh would love that. It\'s a one-word fix.' },
          { text: 'Add Pressable to the import from \'react-native\'' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the free app that runs your app on a real phone? (Two words.)',
        answers: ['Expo Go', 'expo go', 'ExpoGo'],
        placeholder: 'Two words',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Chapter 1\'s journey in order.',
        lines: ['A ticket falls in the broth', 'First screen with View and Text', 'Components and props', 'The red screen, read calmly', 'v0.1 on Linh\'s phone'],
      },
      {
        kind: 'mcq',
        prompt: 'Linh scrolls the menu twice, then pushes the phone back across the counter. What does she say?',
        options: [
          { text: '"Delete it."', why: 'Not quite. Linh is honest, and v0.1 earned something better.' },
          { text: '"Fine. Keep it. Now: can it take an actual order before the festival?"' },
          { text: '"It\'s perfect."', why: 'Linh doesn\'t say "perfect". She says something much more useful.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Write your build log entry for v0.1: what you shipped, what broke, what you learned, and what\'s next.',
    starters: ['Shipped:...', 'Broke:...', 'Learned:...', 'Next:...'],
  },
  deepen: {
    title: 'Chapter 1 mission: v0.1 on your phone',
    summary: 'Put your v0.1 on your own phone with Expo Go and show it to one person. Write down what they tap first. Next chapter, "Readable in the sun": Theo\'s menu meets a real crowd in the Texas sun, and it\'s time to make it look like a real app.',
  },
  notes: 'Unit Challenge for Chapter 1 (v0.1). Cliffhanger into Chapter 2 (styling: StyleSheet, flexbox, colour, images). Linh\'s "can it take an actual order" sets up v0.3 (Chapter 3).',
};

export default lesson;
