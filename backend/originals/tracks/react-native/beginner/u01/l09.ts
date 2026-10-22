import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: Theo's build log, entry v0.1 (the running device). */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Build log v0.1',
  summary: 'Arjun\'s one rule: "Write down what you built, what broke and what you learned. Every version." Tap through Theo\'s first build log entry.',
  minutes: 11,
  outcomes: ['Keep a build log like a professional developer', 'Review the chapter\'s ideas so far', 'Start your own build log'],
  learn: [
    {
      kind: 'explore',
      title: 'Theo\'s build log, v0.1 (so far)',
      text: 'BUILD LOG v0.1, Pho Real app. Goal: a home screen people can read in line. Shipped: header with name and tagline, three dishes with prices, footer with opening hours. Pieces: Header, Footer, MenuItem (next). What broke: typed "Open 11 a.m." straight into a View. Red screen. Fix: every word inside <Text>. What broke 2: pasted my bootcamp HTML. <h1> is not a phone thing. Learned: braces show values, so prices live in code and toFixed(2) keeps the cents. Next: one MenuItem component for every dish. Mum says: "Still paper on Friday."',
      hotspots: [
        { phrase: 'Goal: a home screen people can read in line', note: 'One sentence that says what this version is for. Arjun asks for this first, every time.' },
        { phrase: 'Pieces: Header, Footer, MenuItem (next)', note: 'Components, named with capitals. The log lists them so the app\'s structure is clear at a glance.' },
        { phrase: 'every word inside <Text>', note: 'The rule from lesson 4, learned the hard way. Writing it down is how it sticks.' },
        { phrase: '<h1> is not a phone thing', note: 'From lesson 7: phones have View and Text, not HTML tags.' },
        { phrase: 'braces show values', note: 'Lesson 6: { } in JSX shows a JavaScript value, like largePrice.toFixed(2).' },
        { phrase: 'Next: one MenuItem component for every dish', note: 'Every entry ends with the next step. That\'s lesson 11: props.' },
        { phrase: 'Mum says: "Still paper on Friday."', note: 'The real customer\'s verdict. Theo has until the end of the chapter to change it.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The log, as a screen',
      caption: 'Theo keeps his log in a tiny app, of course. Add a "Learned:" line of your own.',
      code: `import { View, Text } from 'react-native';

function Entry() {
  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Build log v0.1</Text>
      <Text>Shipped: header, menu, footer</Text>
      <Text>Broke: words outside Text</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Entry />
    </View>
  );
}
`,
      challenge: 'Add <Text>Learned: braces show values</Text> inside Entry.',
    },
  ],
  apply: {
    scenario: 'Reading the build log.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each log line to the lesson it came from.',
        pairs: [
          ['Every word inside <Text>', 'Your first screen'],
          ['<h1> is not a phone thing', 'JSX: HTML\'s cousin'],
          ['Braces show values', 'The JavaScript you\'ll use'],
          ['Header, Footer, MenuItem', 'Components are building blocks'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Arjun insist on "what broke" in every entry?',
        options: [
          { text: 'To embarrass Theo', why: 'It\'s the opposite: every developer breaks things. Writing it down stops you breaking it twice.' },
          { text: 'Mistakes you write down are mistakes you don\'t repeat' },
          { text: 'Because the app store asks for it', why: 'The log is for Theo, not a store.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a "Learned: braces show values" line to the Entry component',
        starter: `import { View, Text } from 'react-native';

function Entry() {
  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Build log v0.1</Text>
      <Text>Shipped: header, menu, footer</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Entry />
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

function Entry() {
  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Build log v0.1</Text>
      <Text>Shipped: header, menu, footer</Text>
      <Text>Learned: braces show values</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Entry />
    </View>
  );
}
`,
        hint: 'Inside Entry\'s View, after the Shipped line: <Text>Learned: braces show values</Text>.',
        checks: [{ message: 'The screen says "Learned: braces show values"', screen: { text: 'Learned: braces show values' } }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in a build log, or not?',
        groups: ['In the log', 'Not needed'],
        items: [
          { text: 'What shipped in this version', group: 0 },
          { text: 'What broke and the fix', group: 0 },
          { text: 'Every line of code, copied in', group: 1 },
          { text: 'The next step', group: 0 },
          { text: 'What Theo ate for lunch', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The four parts of every entry.',
        template: 'Goal, what [[1]], what broke, what I [[2]].',
        blanks: [['shipped'], ['learned']],
        distractors: ['cost', 'ate'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'Your log says "fixed a bug". Which bug? How?',
        options: [
          { text: 'Words straight inside a View crash the app. Fix: wrap them in <Text>.' },
          { text: 'A bug. It\'s fixed now, does it matter?', why: 'Next month he\'ll meet the same bug and won\'t remember the fix.' },
          { text: 'The computer had a bug.', why: 'The code had the bug. Name it precisely.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which version is Theo working on? (Type it like v0.0.)',
        answers: ['v0.1', '0.1', 'V0.1'],
        placeholder: 'v0.0',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the next step in Theo\'s log?',
        options: [
          { text: 'Publish to the App Store', why: 'That\'s Film 3. Next is one MenuItem for every dish.' },
          { text: 'Learn Swift', why: 'React Native means he doesn\'t need to.' },
          { text: 'One MenuItem component for every dish' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Start your own log: change the title to "My build log" and add one "Next:" line',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Build log v0.1</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>My build log</Text>
      <Text>Next: build my first component</Text>
    </View>
  );
}
`,
        hint: 'Change the title text, then add a <Text> that starts with "Next:".',
        checks: [
          { message: 'The title says "My build log"', screen: { text: 'My build log' } },
          { message: 'A line that starts with "Next:"', screen: { text: 'Next:' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Linh\'s verdict is in the log too. Why does that matter?',
        options: [
          { text: 'It doesn\'t; only code matters', why: 'An app nobody uses has failed, however good the code.' },
          { text: 'The real user decides if the app works, and Linh is the real user' },
          { text: 'So he can complain about her', why: 'It\'s there to keep him honest about what counts.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Start your build log for this course. What did you ship this week, what broke, and what did you learn?',
    starters: ['Shipped:...', 'Broke:...', 'Learned:...'],
  },
  deepen: {
    title: 'Try it',
    summary: 'Keep your build log in a notes app, one entry per chapter. By the end of this course it\'s a record of everything you can do, handy for a portfolio or a job interview.',
  },
  notes: 'Build log v0.1 (fictional): the running device; one entry per chapter, lesson 9.',
};

export default lesson;
