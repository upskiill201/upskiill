import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3 — free. Myth or Fact: native vs web vs React Native, one codebase, Meta 2015. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'What a phone app is made of',
  summary: 'Mai is convinced Theo\'s app will be "just a website pretending". Ray thinks it needs two teams, one per phone. Who\'s right? Myth or fact, round one.',
  minutes: 11,
  outcomes: ['Explain how a React Native app differs from a website', 'Know that one codebase runs on Android and iPhone', 'Say who made React Native and when'],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A React Native app is just a website wrapped in an app.',
          isFact: false,
          explain: 'Your <View> and <Text> become real phone parts: the same buttons, scrolling and text the phone itself uses. That\'s why it feels like an app, not a web page.',
        },
        {
          text: 'One React Native codebase can run on both Android and iPhone.',
          isFact: true,
          explain: 'You write the app once in JavaScript or TypeScript, and it runs on both. Before, companies often built every app twice, with two teams.',
        },
        {
          text: 'You need a Mac just to try your app on an iPhone.',
          isFact: false,
          explain: 'With Expo Go you can run your app on an iPhone from any computer. (Publishing to the App Store is a different step, for later.)',
        },
        {
          text: 'React Native was made by Facebook, now Meta, and released in 2015.',
          isFact: true,
          explain: 'It was announced in January 2015 and released as open source that March. It\'s free for anyone to use.',
        },
        {
          text: 'React Native apps are written in Swift and Kotlin.',
          isFact: false,
          explain: 'Swift and Kotlin are the phones\' own languages. React Native lets you write JavaScript or TypeScript instead, which is what this course uses.',
        },
        {
          text: 'Companies like Shopify build their phone apps with React Native.',
          isFact: true,
          explain: 'Shopify announced in 2020 that React Native was the future of its mobile apps. Meta uses it in its own apps too.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'One code, two phones',
      caption: 'This exact code would run on Android and on iPhone. Change the second line to say which phone you have.',
      code: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Written once</Text>
      <Text>Runs on Android and iPhone</Text>
    </View>
  );
}
`,
      challenge: 'Add a line that says who made React Native: Meta.',
    },
  ],
  apply: {
    scenario: 'Settling the argument at the truck.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What happens to a <Text> in a React Native app on a phone?',
        options: [
          { text: 'It becomes a real phone text element, the same kind the phone itself uses' },
          { text: 'It turns into a web page', why: 'That\'s the myth. React Native uses the phone\'s own parts.' },
          { text: 'It\'s shown as a picture of text', why: 'It\'s real text: you can select it, and screen readers can read it.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s best reply.',
        from: 'mai',
        message: 'So your app is a website pretending to be an app.',
        options: [
          { text: 'Yes, but a nice one.', why: 'It isn\'t a website. React Native uses the phone\'s real parts.' },
          { text: 'React Native turns my code into the phone\'s real buttons and text. It\'s an actual app.' },
          { text: 'Websites are better anyway.', why: 'Off topic, and it doesn\'t answer her.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'One codebase, Android and iPhone', group: 0 },
          { text: 'You must learn Swift first', group: 1 },
          { text: 'Released by Facebook in 2015', group: 0 },
          { text: 'You need a Mac to try it on an iPhone', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make the screen say "Runs on Android and iPhone"',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Written once</Text>
      <Text>Runs on Android</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Written once</Text>
      <Text>Runs on Android and iPhone</Text>
    </View>
  );
}
`,
        hint: 'Add " and iPhone" after "Runs on Android", inside the second <Text>.',
        checks: [{ message: 'The screen says "Runs on Android and iPhone"', screen: { text: 'Runs on Android and iPhone' } }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was React Native released?',
        answers: ['2015'],
        placeholder: 'A year',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each language to where it\'s used.',
        pairs: [
          ['Swift', 'iPhone\'s own language'],
          ['Kotlin', 'Android\'s own language'],
          ['TypeScript', 'React Native (this course)'],
          ['HTML', 'Web pages'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The big idea.',
        template: 'Write the app [[1]], run it on Android and [[2]].',
        blanks: [['once'], ['iPhone', 'iOS']],
        distractors: ['twice', 'Windows'],
      },
      {
        kind: 'mcq',
        prompt: 'Ray asks why companies used to need two app teams. Why?',
        options: [
          { text: 'Phones were bigger', why: 'Size wasn\'t it: each phone had its own language.' },
          { text: 'Apps were more fun to build twice', why: 'It was expensive, not fun.' },
          { text: 'Android and iPhone apps were written in different languages' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a line that says "Made by Meta"',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>React Native</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>React Native</Text>
      <Text>Made by Meta</Text>
    </View>
  );
}
`,
        hint: 'Add <Text>Made by Meta</Text> before </View>.',
        checks: [
          { message: 'The screen says "Made by Meta"', screen: { text: 'Made by Meta' } },
          { message: 'The title still says "React Native"', screen: { text: 'React Native' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which statement about Expo Go is true?',
        options: [
          { text: 'It only works on Android', why: 'It\'s on both Google Play and the App Store.' },
          { text: 'It runs your app on a real iPhone or Android phone, from any computer' },
          { text: 'It costs $99 a year', why: 'Expo Go is free. $99 a year is Apple\'s developer program, for publishing.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Look at an app on your phone. Which parts (buttons, lists, text) could you imagine building with <View> and <Text>?',
    starters: ['The app I looked at is...', 'I could build...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'The official site, reactnative.dev, has a short "Introduction" page. Skim the first section to see the same <View> and <Text> you just used.',
  },
  notes: 'React Native: announced at React.js Conf, January 2015; open-sourced at F8, March 2015 (Meta engineering blog). Renders native platform views (not a WebView). Expo Go: free on both stores; runs projects on iOS devices without a Mac. Shopify: "React Native is the Future of Mobile at Shopify" (Shopify engineering blog, 2020). Meta uses RN in its apps (reactnative.dev showcase). Re-check the showcase before adding more company names.',
};

export default lesson;
