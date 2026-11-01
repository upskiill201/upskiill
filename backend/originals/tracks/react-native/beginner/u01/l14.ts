import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 14. Walkthrough: from the lesson preview to your own phone with Expo Go (computer path and Snack path). */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'From preview to your phone',
  summary: 'Linh won\'t believe it\'s a real app until it\'s on her own phone. Tonight, Theo puts Pho Real on it. Follow along and put your app on yours.',
  minutes: 14,
  outcomes: ['Run a React Native app on your own phone with Expo Go', 'Start a project on a computer, or use Expo Snack in the browser', 'See your phone reload when you save'],
  learn: [
    {
      kind: 'steps',
      title: 'Your app, on your phone',
      steps: [
        {
          title: '1. Install Expo Go',
          body: 'Free, from Google Play or the App Store. Open it once so it\'s ready.',
        },
        {
          title: '2a. With a computer: make the project',
          body: 'In a terminal (with Node.js installed), make a new app from the blank TypeScript template. It creates a folder with an App.tsx shaped exactly like the code in these lessons.',
          code: 'npx create-expo-app@latest pho-real --template blank-typescript\ncd pho-real\nnpx expo start',
          language: 'plaintext',
        },
        {
          title: '2b. No computer handy: Expo Snack',
          body: 'Open snack.expo.dev in a browser, paste your code into App.tsx, and open the "My Device" tab to get a QR code. Snack is free and needs no installing.',
        },
        {
          title: '3. Scan the QR code',
          body: 'npx expo start (or Snack) shows a QR code. On Android, scan it from inside Expo Go. On iPhone, scan it with the Camera app. Keep the phone and computer on the same Wi-Fi.',
        },
        {
          title: '4. Change something and save',
          body: 'Edit App.tsx, save, and watch your phone update by itself in a second or two. That\'s called Fast Refresh. Errors show as the red screen from last lesson, on the phone and in the terminal.',
        },
        {
          title: '5. Paste in your lesson code',
          body: 'Copy any App from these lessons into App.tsx: it runs the same on your phone. Your own app, in your hand.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Your first real-device screen',
      caption: 'Copy this into App.tsx on your phone (or Snack). Change the name to yours before you do.',
      code: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
      <Text style={{ fontSize: 18, marginTop: 8 }}>Running on Theo's phone</Text>
    </View>
  );
}
`,
      challenge: 'On your phone: change the second line, save, and time how long the phone takes to update.',
    },
  ],
  apply: {
    scenario: 'Pho Real, on Linh\'s phone.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order (computer path).',
        lines: ['Install Expo Go on the phone', 'Run npx create-expo-app on the computer', 'Run npx expo start', 'Scan the QR code', 'Edit App.tsx and save'],
      },
      {
        kind: 'mcq',
        prompt: 'On an iPhone, how do you open the QR code from npx expo start?',
        options: [
          { text: 'Email it to yourself', why: 'No need: the Camera app scans it and opens Expo Go.' },
          { text: 'Scan it with the Camera app' },
          { text: 'It only works on Android', why: 'Both work. On iPhone, use the Camera app.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the second line say "Running on my phone"',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
      <Text style={{ fontSize: 18, marginTop: 8 }}>Running on Theo's phone</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
      <Text style={{ fontSize: 18, marginTop: 8 }}>Running on my phone</Text>
    </View>
  );
}
`,
        hint: 'Replace "Theo\'s" with "my" in the second Text.',
        checks: [
          { message: 'The screen says "Running on my phone"', screen: { text: 'Running on my phone' } },
          { message: 'Theo\'s name is gone', screen: { noText: 'Theo' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each command or tool to what it does.',
        pairs: [
          ['npx create-expo-app', 'Makes a new project'],
          ['npx expo start', 'Starts it and shows a QR code'],
          ['Expo Go', 'Runs the app on your phone'],
          ['Expo Snack', 'Edits and runs apps in the browser'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s answer.',
        from: 'linh',
        message: 'The QR code does nothing on my phone.',
        options: [
          { text: 'Your phone is too old.', why: 'Expo Go runs on most phones. Check the Wi-Fi first.' },
          { text: 'Then it\'s not a real app.', why: 'It is. The phone just can\'t reach the computer yet.' },
          { text: 'Are we on the same Wi-Fi? The phone has to reach my laptop.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Start the app from a terminal.',
        language: 'plaintext',
        template: 'npx [[1]] [[2]]',
        blanks: [['expo'], ['start']],
        distractors: ['react', 'run', 'go'],
      },
      {
        kind: 'mcq',
        prompt: 'What is Fast Refresh?',
        options: [
          { text: 'The phone updates by itself a moment after you save' },
          { text: 'A faster internet plan', why: 'It\'s a development feature: save, and the app updates.' },
          { text: 'Restarting the phone', why: 'No restart needed: the app updates in place.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Computer path or Snack path?',
        groups: ['Computer (create-expo-app)', 'Browser (Expo Snack)'],
        items: [
          { text: 'Needs Node.js installed', group: 0 },
          { text: 'snack.expo.dev', group: 1 },
          { text: 'Runs npx expo start', group: 0 },
          { text: 'The "My Device" tab', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which file do you edit in the blank TypeScript template? (File name.)',
        answers: ['App.tsx', 'app.tsx'],
        placeholder: 'File name',
      },
      {
        kind: 'mcq',
        prompt: 'Linh opens the app on her own phone. What does she say?',
        options: [
          { text: '"Still paper on Friday."', why: 'Not quite. She scrolls the menu twice, slowly.' },
          { text: '"Hm. The prices are right." That\'s high praise from Linh.' },
          { text: '"Delete it."', why: 'She doesn\'t. She sends a screenshot to her sister.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Real-device mission: put any app from this chapter on your phone with Expo Go. What did it feel like to hold your own app? What looked different from the preview?',
    starters: ['It felt...', 'Different from the preview:...'],
  },
  deepen: {
    title: 'Real-device mission checklist',
    summary: 'Expo Go installed. Project started (computer) or Snack open. QR code scanned. One change saved and seen on the phone. If it doesn\'t connect, check both devices are on the same Wi-Fi, or start with npx expo start --tunnel.',
  },
  notes: 'create-expo-app with --template blank-typescript creates App.tsx (docs.expo.dev "create-expo-app"). npx expo start shows a QR; Android scans in Expo Go, iOS with the Camera app (Expo docs). Same network required unless --tunnel. Expo Snack: snack.expo.dev, "My Device" runs on Expo Go via QR. Fast Refresh is React Native\'s live reload.',
};

export default lesson;
