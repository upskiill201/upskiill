import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story with a choice: v0.1 meets the midday sun at the market preview. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Readable in the sun',
  summary: 'Linh agrees to one trial: next Saturday, the Riverside Saturday Market, 12 noon. Theo shows v0.1 to a few customers outside first. In the Texas sun it looks like a grey list from 2009, and Mai says so.',
  minutes: 12,
  outcomes: ['See why styling decides whether people use an app', 'Change colours and sizes with style', 'Plan what v0.2 must fix'],
  learn: [
    {
      kind: 'story',
      title: 'Saturday preview, 12:10 p.m., full sun',
      beats: [
        { speaker: 'narrator', text: 'Theo holds v0.1 out to a couple waiting in line. They lean in, shade the screen with a hand, and lean out again.' },
        { speaker: 'mai', text: 'It\'s a list. A grey list. It looks like a phone bill.' },
        { speaker: 'linh', text: 'The truck is orange-brown and cream. People know it from across the street. The app looks like nobody.' },
        { speaker: 'narrator', text: 'Everything is squashed to the left. The prices hide right next to the names. There are no pictures of the food, which is the one thing everyone wants to see.' },
        { speaker: 'tey', text: 'The code works. The screen doesn\'t. Market Saturday is in one week. What should Theo do?' },
      ],
      choice: {
        prompt: 'What should Theo do?',
        options: [
          { text: 'Make everything bigger and bolder until it\'s readable.', outcome: 'Everything shouts, so nothing stands out. Bigger helps, but without layout, colour and spacing it\'s a louder grey list.' },
          { text: 'Learn to style properly: layout, spacing, the truck\'s colours and photos of the food.', outcome: 'Yes. That\'s this chapter. By next Saturday the menu has pictures, prices lined up on the right, the truck\'s colours, and a button you can\'t miss.', best: true },
          { text: 'Leave it. People should read the words, not look at colours.', outcome: 'People decide in about a second whether an app looks worth using. In the sun, with one hand, a plain list loses to the burger truck.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'From grey to Pho Real',
      caption: 'Every style is an object of properties. Change the title\'s color to the truck\'s \'#9a3412\' and the screen\'s backgroundColor to cream \'#fff7ed\'.',
      code: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#ffffff' }}>
      <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#888888' }}>Pho Real</Text>
      <Text style={{ fontSize: 18 }}>Large pho $13.50</Text>
    </View>
  );
}
`,
      challenge: 'Now try the price in the same orange-brown, and see if it reads better or worse.',
    },
  ],
  apply: {
    scenario: 'What v0.2 has to fix.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'What did the market preview show? Problem, or fine?',
        groups: ['Problem', 'Fine'],
        items: [
          { text: 'No pictures of the food', group: 0 },
          { text: 'The prices are correct', group: 1 },
          { text: 'Prices squashed next to the names', group: 0 },
          { text: 'Doesn\'t look like the truck', group: 0 },
          { text: 'It doesn\'t crash', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Give the title the truck\'s colour, #9a3412',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#888888' }}>Pho Real</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#9a3412' }}>Pho Real</Text>
    </View>
  );
}
`,
        hint: 'Change color: \'#888888\' to color: \'#9a3412\'.',
        checks: [{ message: 'The title is #9a3412', screen: { style: { of: 'Pho Real', prop: 'color', value: '#9a3412' } } }],
      },
      {
        kind: 'mcq',
        prompt: 'Why did the couple lean out again?',
        options: [
          { text: 'They don\'t like pho', why: 'They were in the line for pho. The screen lost them, not the food.' },
          { text: 'The app crashed', why: 'It didn\'t crash. It just looked like a grey phone bill in the sun.' },
          { text: 'A plain grey list with no pictures is hard to read and easy to ignore in the sun' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'Why does it matter what colour an app is? It\'s the same pho.',
        options: [
          { text: 'It doesn\'t, Mum.', why: 'It does: people recognise the truck by its colours from across the street.' },
          { text: 'Same reason the truck is orange-brown: people recognise us before they read a word.' },
          { text: 'Because colours are trendy.', why: 'Linh won\'t buy "trendy". Recognition is the real reason.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the background the truck\'s cream, #fff7ed',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#ffffff' }}>
      <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#9a3412' }}>Pho Real</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#fff7ed' }}>
      <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#9a3412' }}>Pho Real</Text>
    </View>
  );
}
`,
        hint: 'In the View\'s style, change backgroundColor: \'#ffffff\' to \'#fff7ed\'.',
        checks: [{ message: 'The screen is cream #fff7ed', screen: { style: { of: 'Pho Real', prop: 'backgroundColor', value: '#fff7ed' } } }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to what this chapter uses to fix it.',
        pairs: [
          ['Everything squashed to the left', 'Flexbox layout'],
          ['No pictures of the food', 'The Image component'],
          ['Looks like nobody', 'The truck\'s colours'],
          ['Cramped, hard to tap', 'Spacing: padding and margin'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Colour the title.',
        language: 'typescript',
        template: "<Text style={{ [[1]]: '#9a3412' }}>Pho Real</Text>",
        blanks: [['color']],
        distractors: ['colour', 'textColor', 'fill'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the name of the market where Pho Real will test the app?',
        answers: ['Riverside Saturday Market', 'Riverside', 'the Riverside Saturday Market', 'riverside market'],
        placeholder: 'Market name',
      },
      {
        kind: 'mcq',
        prompt: 'In React Native, how do you spell the colour property?',
        options: [
          { text: 'color (American spelling, like CSS)' },
          { text: 'colour', why: 'It\'s color, without the u, like in CSS.' },
          { text: 'textColour', why: 'There\'s no such property. Use color.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put this week in order.',
        lines: ['The market preview in the sun', 'Mai calls it a phone bill', 'Theo learns layout, colour and pictures', 'v0.2 at the Riverside Saturday Market'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of an app or sign you recognise instantly by its colours. What makes it recognisable before you read anything?',
    starters: ['I recognise...', 'Because...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Open v0.1 on your phone outdoors in daylight (or at full brightness by a window). What\'s hardest to read? Keep a note: this chapter fixes it.',
  },
  notes: 'Riverside Saturday Market is fictional. "People decide in about a second" kept general (first-impression research on visual appeal, e.g. Lindgaard et al. 2006 found judgements within 50 ms; we don\'t quote the number). React Native style props use American spelling (color).',
};

export default lesson;
