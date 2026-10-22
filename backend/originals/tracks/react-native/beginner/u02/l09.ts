import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: build log v0.2 (so far). */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Build log v0.2',
  summary: 'Halfway to market Saturday. Theo\'s build log is getting longer, and Arjun reads it before every call. Tap through the v0.2 entry so far.',
  minutes: 11,
  outcomes: ['Review StyleSheet, flexbox, spacing and colour', 'Spot what v0.2 still needs', 'Update your own build log'],
  learn: [
    {
      kind: 'explore',
      title: 'Theo\'s build log, v0.2 (so far)',
      text: 'BUILD LOG v0.2, Pho Real app. Goal: a menu people can read in the sun at the market. Shipped: StyleSheet with named styles, rows with name left and price right (flexDirection row, flex: 1), centred welcome screen, spacing on an 8 scale, COLORS from Mum\'s paint chip. What broke: put color on a View and wondered why the text stayed black. Fix: text styles go on the Text. What broke 2: justifyContent did nothing. The screen had no flex: 1. Learned: "if everything is rust, nothing is." Still missing: photos of the food, cards, a button you can\'t miss, and long menus scrolling. Mai says: "It\'s fine. It\'s actually fine." Market Saturday: 4 days.',
      hotspots: [
        { phrase: 'Goal: a menu people can read in the sun at the market', note: 'One sentence for the whole version. Everything else in the entry should serve it.' },
        { phrase: 'rows with name left and price right (flexDirection row, flex: 1)', note: 'Lesson 4: a row, with the name taking the spare space.' },
        { phrase: 'spacing on an 8 scale', note: 'Lesson 7: 8, 16, 24. No more 13s.' },
        { phrase: 'COLORS from Mum\'s paint chip', note: 'Lesson 8: one palette object, so a repaint is one line.' },
        { phrase: 'text styles go on the Text', note: 'Lesson 3: Views don\'t pass colour down to their Text.' },
        { phrase: 'The screen had no flex: 1', note: 'Lesson 6: no space to centre in without it.' },
        { phrase: 'Still missing: photos of the food, cards, a button you can\'t miss, and long menus scrolling', note: 'The second half of this chapter, in that order.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The log screen, styled',
      caption: 'Last chapter\'s log screen, now with a StyleSheet. Give the "Still missing" line the rust colour so it stands out.',
      code: `import { View, Text, StyleSheet } from 'react-native';

const COLORS = { rust: '#9a3412', cream: '#fff7ed', ink: '#1c1917' };

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Build log v0.2</Text>
      <Text style={styles.line}>Shipped: rows, spacing, colours</Text>
      <Text style={styles.line}>Still missing: photos, cards, scrolling</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: COLORS.cream, gap: 8 },
  title: { fontSize: 26, fontWeight: 'bold', color: COLORS.ink },
  line: { fontSize: 16, color: COLORS.ink },
});
`,
      challenge: 'Make a styles.todo (color: COLORS.rust) and use it on the "Still missing" line.',
    },
  ],
  apply: {
    scenario: 'Reading the v0.2 log.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each log line to the lesson.',
        pairs: [
          ['Text styles go on the Text', 'Styling myths'],
          ['No flex: 1, nothing to centre in', 'Line it up'],
          ['8, 16, 24', 'Room to breathe'],
          ['If everything is rust, nothing is', 'The truck\'s colours'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make the "Still missing" line stand out: add a todo style with color COLORS.rust and use it',
        starter: `import { View, Text, StyleSheet } from 'react-native';

const COLORS = { rust: '#9a3412', ink: '#1c1917' };

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.line}>Shipped: rows, spacing, colours</Text>
      <Text style={styles.line}>Still missing: photos, cards, scrolling</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  line: { fontSize: 16, color: COLORS.ink },
});
`,
        solution: `import { View, Text, StyleSheet } from 'react-native';

const COLORS = { rust: '#9a3412', ink: '#1c1917' };

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.line}>Shipped: rows, spacing, colours</Text>
      <Text style={[styles.line, styles.todo]}>Still missing: photos, cards, scrolling</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  line: { fontSize: 16, color: COLORS.ink },
  todo: { color: COLORS.rust },
});
`,
        hint: 'Add todo: { color: COLORS.rust } and use style={[styles.line, styles.todo]} on the last line.',
        checks: [
          { message: 'The "Still missing" line is rust', screen: { style: { of: 'Still missing', prop: 'color', value: '#9a3412' } } },
          { message: 'The "Shipped" line stays ink', screen: { style: { of: 'Shipped', prop: 'color', value: '#1c1917' } } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does v0.2 still need, according to the log?',
        options: [
          { text: 'A new name for the truck', why: 'The log lists photos, cards, a stand-out button and scrolling.' },
          { text: 'A backend server', why: 'That\'s Film 2. v0.2 is about how the menu looks.' },
          { text: 'Photos, cards, a button you can\'t miss, and scrolling' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Shipped already, or still to do?',
        groups: ['Shipped', 'Still to do'],
        items: [
          { text: 'Rows with prices on the right', group: 0 },
          { text: 'Photos of the food', group: 1 },
          { text: 'COLORS palette', group: 0 },
          { text: 'Long menus that scroll', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'Your log says "fixed centring". That\'s not enough.',
        options: [
          { text: 'It\'s fixed, does it matter how?', why: 'Next time it happens he\'ll need the how.' },
          { text: 'justifyContent did nothing because the screen had no flex: 1. Added it, now it centres.' },
          { text: 'I\'ll remember.', why: 'He won\'t, and nobody else can read his memory.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The log\'s lesson about colour.',
        template: 'If everything is [[1]], [[2]] is.',
        blanks: [['rust'], ['nothing']],
        distractors: ['cream', 'everything'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days to market Saturday, in the log?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does the log record "what broke" even when it\'s fixed?',
        options: [
          { text: 'Writing it down is how you stop making the same mistake' },
          { text: 'Arjun likes long logs', why: 'He likes useful ones.' },
          { text: 'App stores ask for it', why: 'The log is for Theo, not a store.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a "Market Saturday: 4 days" line in bold',
        starter: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Build log v0.2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  title: { fontSize: 26, fontWeight: 'bold' },
});
`,
        solution: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Build log v0.2</Text>
      <Text style={styles.countdown}>Market Saturday: 4 days</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  title: { fontSize: 26, fontWeight: 'bold' },
  countdown: { fontSize: 16, fontWeight: 'bold' },
});
`,
        hint: 'Add countdown: { fontWeight: \'bold\' } and a Text with style={styles.countdown}.',
        checks: [
          { message: 'The countdown shows', screen: { text: 'Market Saturday: 4 days' } },
          { message: 'In bold', screen: { style: { of: 'Market Saturday', prop: 'fontWeight', value: 'bold' } } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Mai say this time?',
        options: [
          { text: '"It looks like a phone bill."', why: 'That was v0.1. She\'s come round.' },
          { text: '"Make everything rust."', why: 'She tried that in lesson 8.' },
          { text: '"It\'s fine. It\'s actually fine."' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Update your build log: what styling did you ship this week, what broke, and what\'s still missing?',
    starters: ['Shipped:...', 'Broke:...', 'Still missing:...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Put your styled menu on your phone with Expo Go and take it outside. Compare it with your v0.1 note from lesson 1.',
  },
  notes: 'Build log v0.2 (fictional): the running device.',
};

export default lesson;
