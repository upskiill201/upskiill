import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2 — free. What you need: this preview, Expo Go, (later) a computer. What's free and what isn't. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What you need',
  summary: 'Theo has a laptop with a cracked hinge, a phone with 4% battery and zero budget. Good news: that\'s more than enough. Here\'s everything you need to build apps in this course, and what it costs.',
  minutes: 11,
  outcomes: ['Know what you need for each part of the course', 'Know what\'s free and what costs money', 'Understand what the phone preview in these lessons is'],
  learn: [
    {
      kind: 'steps',
      title: 'Your toolkit, one step at a time',
      steps: [
        {
          title: '1. Right now: this lesson',
          body: 'Every lesson has a phone preview that runs your React Native code in the browser, on any device. Nothing to install. You can do the whole first chapter with just this.',
        },
        {
          title: '2. From lesson 14: your own phone',
          body: 'Install Expo Go, a free app on Google Play and the App Store. It runs your React Native app on your real phone, so you can feel it in your hand. Android or iPhone, both work.',
        },
        {
          title: '3. When you build your own project: a computer',
          body: 'Any Windows, Mac or Linux computer with Node.js (free) and a code editor such as VS Code (free). One command, npx create-expo-app, makes a new app. Or use Expo Snack, a free editor in the browser.',
        },
        {
          title: '4. What it costs',
          body: 'Learning and building: $0. Publishing in the stores comes much later (Film 3): Google Play charges a one-time $25 developer fee, Apple $99 a year. You don\'t need either to finish this course.',
        },
        {
          title: '5. One honest note about the preview',
          body: 'The preview in these lessons runs React Native in your browser. On a real phone it\'s the same code and the same app, but small details (fonts, shadows) can look slightly different. That\'s why lesson 14 puts it on your phone.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Your toolkit, on screen',
      caption: 'A checklist screen. Each line is its own <Text>. Change "Theo" to your own name.',
      code: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Theo's toolkit</Text>
      <Text>This lesson: ready</Text>
      <Text>Expo Go on my phone: lesson 14</Text>
      <Text>A computer: for my own project</Text>
    </View>
  );
}
`,
      challenge: 'Add one more line: <Text>Budget: $0</Text>.',
    },
  ],
  apply: {
    scenario: 'Theo checks what he actually needs.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each tool to when you need it.',
        pairs: [
          ['The lesson\'s phone preview', 'Right now'],
          ['Expo Go', 'From lesson 14'],
          ['A computer with Node.js', 'Your own project'],
          ['A store developer account', 'Publishing, much later'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Theo has $0. Can he finish this course?',
        options: [
          { text: 'No, he needs a $99 Apple account first', why: 'That\'s only for publishing on the App Store, much later.' },
          { text: 'Only if he buys a new laptop', why: 'Any computer works, and Chapter 1 needs none at all.' },
          { text: 'Yes: everything for learning and building is free' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the checklist yours: change the title to "My toolkit"',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Theo's toolkit</Text>
      <Text>This lesson: ready</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>My toolkit</Text>
      <Text>This lesson: ready</Text>
    </View>
  );
}
`,
        hint: 'Replace "Theo\'s toolkit" between the first <Text ...> and </Text> with "My toolkit".',
        checks: [
          { message: 'The title says "My toolkit"', screen: { text: 'My toolkit' } },
          { message: 'Theo\'s name is gone', screen: { noText: 'Theo' } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The free app that runs your React Native app on your phone.',
        template: 'Install [[1]] [[2]] from Google Play or the App Store.',
        blanks: [['Expo'], ['Go']],
        distractors: ['React', 'Store', 'Snack'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Free, or costs money?',
        groups: ['Free', 'Costs money'],
        items: [
          { text: 'Expo Go', group: 0 },
          { text: 'Node.js and VS Code', group: 0 },
          { text: 'A Google Play developer account', group: 1 },
          { text: 'The Apple Developer Program', group: 1 },
          { text: 'This lesson\'s phone preview', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'mai',
        message: 'Your preview font looks a bit different from my phone. Is it broken?',
        options: [
          { text: 'Same code, same app. The preview runs in a browser, so tiny details like fonts can differ. Lesson 14 puts it on a real phone.' },
          { text: 'Yes, it\'s broken.', why: 'It isn\'t: small visual differences between the browser preview and a phone are expected.' },
          { text: 'Phones are wrong.', why: 'Neither is wrong. They draw fonts slightly differently.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What one-time fee does Google Play charge developers, in dollars?',
        answers: ['25', '$25', '25 dollars'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Add a line under the title that says "Budget: $0"',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>My toolkit</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>My toolkit</Text>
      <Text>Budget: $0</Text>
    </View>
  );
}
`,
        hint: 'Add <Text>Budget: $0</Text> on a new line, before </View>.',
        checks: [{ message: 'The screen says "Budget: $0"', screen: { text: 'Budget: $0' } }],
      },
      {
        kind: 'mcq',
        prompt: 'Which command makes a brand-new Expo app on a computer?',
        options: [
          { text: 'npm install phone', why: 'There\'s no such package. The command is npx create-expo-app.' },
          { text: 'npx create-expo-app' },
          { text: 'expo go build', why: 'Expo Go is the phone app; new projects start with npx create-expo-app.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the course\'s path in order.',
        lines: ['Code in the lesson\'s phone preview', 'Run it on your phone with Expo Go', 'Build your own project on a computer', 'Publish to the stores (Film 3)'],
      },
    ],
  },
  reflect: {
    prompt: 'Which phone do you have, and when could you try your first app on it? Put a time in your calendar for lesson 14.',
    starters: ['My phone is...', 'I\'ll try it on...'],
  },
  deepen: {
    title: 'Get ready early',
    summary: 'Install Expo Go now from Google Play or the App Store (it\'s free), so it\'s waiting for you in lesson 14.',
  },
  notes: 'Expo Go: free on Google Play and the App Store (expo.dev). npx create-expo-app is the documented way to start (docs.expo.dev). Google Play Console: one-time US$25 registration fee; Apple Developer Program: US$99/year (check at writing time of Film 3). Preview = react-native-web in the browser, so small rendering differences are expected; said honestly.',
};

export default lesson;
