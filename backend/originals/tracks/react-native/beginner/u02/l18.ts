import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 18. Before/After: Arjun's review of the styles (COLORS and SPACING theme, no magic numbers, styles named by role). */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Code review: a theme',
  summary: 'Friday night, Arjun reviews the menu screen. "It looks good. Now count how many times you typed #9a3412." Fourteen. See what a tiny theme does to the same screen.',
  minutes: 13,
  outcomes: ['Collect colours and spacing into a small theme', 'Replace repeated values with named ones', 'Keep styles named by role'],
  learn: [
    {
      kind: 'compare',
      title: 'The same styles, before and after review',
      before: {
        label: 'Before: values typed everywhere',
        text: "title: { fontSize: 34, color: '#9a3412' },\nsection: { marginTop: 16, color: '#9a3412' },\ncard: { padding: 16, borderRadius: 16, borderColor: '#fed7aa' },\nprice: { color: '#9a3412' },\nbutton: { backgroundColor: '#9a3412', borderRadius: 16 },",
      },
      after: {
        label: 'After: a small theme at the top',
        text: "const COLORS = { rust: '#9a3412', cream: '#fff7ed', ink: '#1c1917', line: '#fed7aa' };\nconst SPACE = { s: 8, m: 16, l: 24 };\nconst RADIUS = 16;\n\ntitle: { fontSize: 34, color: COLORS.rust },\nsection: { marginTop: SPACE.m, color: COLORS.rust },\ncard: { padding: SPACE.m, borderRadius: RADIUS, borderColor: COLORS.line },\nprice: { color: COLORS.rust },\nbutton: { backgroundColor: COLORS.rust, borderRadius: RADIUS },",
      },
      notes: [
        'Fourteen copies of #9a3412 became one COLORS.rust. A repaint is one line.',
        'SPACE keeps everyone on the 8-point scale: SPACE.m is always 16, so nobody types 13.',
        'One RADIUS for every rounded corner makes the whole app feel like one family.',
        'The screen looks identical. Like Chapter 1\'s review, it\'s about the next change, not this one.',
        'In a bigger app, the theme moves to its own file, theme.ts, and every screen imports it.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Repaint in one line',
      caption: 'Everything uses the theme. Change COLORS.rust to \'#1d4ed8\' (blue) and see every rust thing change at once. Then change RADIUS to 4.',
      code: `import { View, Text, Pressable, StyleSheet } from 'react-native';

const COLORS = { rust: '#9a3412', cream: '#fff7ed', ink: '#1c1917', line: '#fed7aa' };
const SPACE = { s: 8, m: 16, l: 24 };
const RADIUS = 16;

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pho Real</Text>
      <View style={styles.card}>
        <Text style={styles.name}>Large pho</Text>
        <Text style={styles.price}>$13.50</Text>
      </View>
      <Pressable style={styles.button}><Text style={styles.buttonText}>Order ahead</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: SPACE.l, paddingTop: 64, gap: SPACE.m, backgroundColor: COLORS.cream },
  title: { fontSize: 34, fontWeight: 'bold', color: COLORS.rust },
  card: { flexDirection: 'row', padding: SPACE.m, borderRadius: RADIUS, borderWidth: 1, borderColor: COLORS.line, backgroundColor: '#ffffff' },
  name: { flex: 1, fontSize: 18, color: COLORS.ink },
  price: { fontSize: 18, fontWeight: 'bold', color: COLORS.rust },
  button: { backgroundColor: COLORS.rust, paddingVertical: 18, borderRadius: RADIUS, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
});
`,
      challenge: 'Add white: \'#ffffff\' to COLORS and use COLORS.white for the card and the button text.',
    },
  ],
  apply: {
    scenario: 'Arjun\'s theme review.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was Arjun\'s main point?',
        options: [
          { text: 'The screen was ugly', why: 'He said it looked good. The code just repeated itself.' },
          { text: 'The same values were typed again and again, so every change meant hunting for copies' },
          { text: 'There were too many colours', why: 'Few colours, many copies. That was the problem.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Use the theme: replace the typed rust colours with COLORS.rust and the 16s with SPACE.m',
        starter: `import { View, Text, StyleSheet } from 'react-native';

const COLORS = { rust: '#9a3412', ink: '#1c1917' };
const SPACE = { s: 8, m: 16, l: 24 };

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pho Real</Text>
      <Text style={styles.price}>Large pho $13.50</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, paddingTop: 64 },
  title: { fontSize: 34, fontWeight: 'bold', color: '#9a3412', marginBottom: 16 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#9a3412' },
});
`,
        solution: `import { View, Text, StyleSheet } from 'react-native';

const COLORS = { rust: '#9a3412', ink: '#1c1917' };
const SPACE = { s: 8, m: 16, l: 24 };

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pho Real</Text>
      <Text style={styles.price}>Large pho $13.50</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: SPACE.m, paddingTop: 64 },
  title: { fontSize: 34, fontWeight: 'bold', color: COLORS.rust, marginBottom: SPACE.m },
  price: { fontSize: 18, fontWeight: 'bold', color: COLORS.rust },
});
`,
        hint: 'Swap \'#9a3412\' for COLORS.rust (twice), and padding: 16 / marginBottom: 16 for SPACE.m.',
        checks: [
          { message: 'Still rust on screen', screen: { style: { of: 'Pho Real', prop: 'color', value: '#9a3412' } } },
          { message: 'Colours from the theme', codeIncludes: 'color: COLORS.rust, marginBottom' },
          { message: 'Spacing from the theme', codeIncludes: 'SPACE.m' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the theme value to its job.',
        pairs: [
          ['COLORS.rust', 'The brand colour'],
          ['SPACE.m', '16, the usual gap'],
          ['RADIUS', 'Every rounded corner'],
          ['theme.ts', 'Where the theme lives in a big app'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'Why SPACE.m and not just 16? It\'s the same number.',
        options: [
          { text: 'No reason, they\'re equal.', why: 'Same number today. The name keeps everyone on the scale tomorrow.' },
          { text: 'Because 16 is unlucky.', why: 'Not a real reason.' },
          { text: 'The name keeps me on the scale. Nobody types 13 when the choices are s, m and l.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Would Arjun approve?',
        groups: ['Approve', 'Fix it'],
        items: [
          { text: 'color: COLORS.rust', group: 0 },
          { text: "color: '#9a3412' typed for the 14th time", group: 1 },
          { text: 'padding: SPACE.m', group: 0 },
          { text: 'marginTop: 13', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A small theme.',
        language: 'typescript',
        template: "const [[1]] = { rust: '#9a3412' };\nconst [[2]] = { s: 8, m: 16, l: 24 };",
        blanks: [['COLORS'], ['SPACE']],
        distractors: ['STYLES', 'SIZES', 'colors'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many times had Theo typed #9a3412?',
        answers: ['14', 'fourteen'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Theo changes COLORS.rust to \'#1d4ed8\'. What changes on screen?',
        code: "title: { color: COLORS.rust }\nprice: { color: COLORS.rust }\nbutton: { backgroundColor: COLORS.rust }",
        language: 'typescript',
        options: [
          { text: 'Only the title', why: 'Everything that uses COLORS.rust changes.' },
          { text: 'Nothing until he restarts the phone', why: 'Fast Refresh updates it straight away.' },
          { text: 'The title, the prices and the button all turn blue' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a RADIUS of 16 and use it for both the card and the button',
        starter: `import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}><Text>Large pho $13.50</Text></View>
      <Pressable style={styles.button}><Text style={styles.buttonText}>Order ahead</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 16 },
  card: { padding: 16, backgroundColor: '#ffffff', borderRadius: 12 },
  button: { backgroundColor: '#9a3412', padding: 18, borderRadius: 20, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 20 },
});
`,
        solution: `import { View, Text, Pressable, StyleSheet } from 'react-native';

const RADIUS = 16;

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}><Text>Large pho $13.50</Text></View>
      <Pressable style={styles.button}><Text style={styles.buttonText}>Order ahead</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 16 },
  card: { padding: 16, backgroundColor: '#ffffff', borderRadius: RADIUS },
  button: { backgroundColor: '#9a3412', padding: 18, borderRadius: RADIUS, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 20 },
});
`,
        hint: 'const RADIUS = 16; above App, then borderRadius: RADIUS in both styles.',
        checks: [
          { message: 'Card radius 16', screen: { style: { of: 'Large pho', prop: 'borderRadius', value: '16' } } },
          { message: 'Button radius 16', screen: { style: { of: 'Order ahead', prop: 'borderRadius', value: '16' } } },
          { message: 'Uses RADIUS', codeIncludes: 'borderRadius: RADIUS' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which value breaks the theme?',
        language: 'typescript',
        lines: ['title: { color: COLORS.rust },', 'card: { padding: SPACE.m },', "price: { color: '#9a3413' },", 'button: { borderRadius: RADIUS },'],
        bug: 2,
        fix: 'price: { color: COLORS.rust },',
        explanation: '#9a3413 is a typo, one digit off rust. With COLORS.rust, typos like this can\'t happen.',
      },
    ],
  },
  reflect: {
    prompt: 'Write a tiny theme for your own app: COLORS, SPACE and RADIUS.',
    starters: ['const COLORS = {...}', 'const SPACE = {...}', 'const RADIUS = ...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'Many teams call this a "design token" system. Search the term to see how big apps name colours and spacing.',
  },
  notes: 'Theme constants (design tokens). Moving to theme.ts is mentioned for real projects; single-file lessons keep them at the top.',
};

export default lesson;
