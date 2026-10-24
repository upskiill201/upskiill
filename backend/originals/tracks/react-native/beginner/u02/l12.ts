import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 12. Before/After: rows become cards (background, borderRadius, border, shadow and elevation). */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Make it a card',
  summary: 'The rows work, but they float on the cream like loose receipts. Mai: "Make them cards, like every food app." See what a few styles do to the same row.',
  minutes: 12,
  outcomes: ['Turn a row into a card with background and borderRadius', 'Add a subtle border or shadow', 'Know shadows differ between iPhone and Android'],
  learn: [
    {
      kind: 'compare',
      title: 'Large pho, row vs card',
      before: {
        label: 'Before: a row on the background',
        text: "row: {\n  flexDirection: 'row',\n  paddingVertical: 8,\n}",
      },
      after: {
        label: 'After: a card',
        text: "card: {\n  flexDirection: 'row',\n  alignItems: 'center',\n  gap: 16,\n  padding: 16,\n  backgroundColor: '#ffffff',\n  borderRadius: 16,\n  borderWidth: 1,\n  borderColor: '#fed7aa',\n}",
      },
      notes: [
        'backgroundColor: white on a cream screen makes the card lift off the page.',
        'borderRadius: 16 softens the corners; most food apps use 12 to 20.',
        'A thin borderWidth: 1 in a pale version of the brand colour outlines it gently, and looks the same on every phone.',
        'Shadows are different per platform: iPhone uses shadowColor, shadowOpacity and shadowRadius; Android uses elevation. A thin border is the simple, same-everywhere option.',
        'alignItems: \'center\' lines up the picture, name and price vertically, and gap: 16 spaces them.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'A real card',
      caption: 'Picture, name, price, in a card. Try borderRadius: 0 and then 32 to feel the difference.',
      code: `import { View, Text, Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Image source={{ uri: '/originals/react-native/pho.png' }} style={styles.photo} accessibilityLabel="A bowl of pho" />
        <Text style={styles.name}>Large pho</Text>
        <Text style={styles.price}>$13.50</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#fff7ed' },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16,
    backgroundColor: '#ffffff', borderRadius: 16, borderWidth: 1, borderColor: '#fed7aa',
  },
  photo: { width: 64, height: 64, borderRadius: 12 },
  name: { flex: 1, fontSize: 18, fontWeight: 'bold', color: '#1c1917' },
  price: { fontSize: 18, fontWeight: 'bold', color: '#9a3412' },
});
`,
      challenge: 'Add a second card for Banh mi underneath (the picture is banh-mi.png).',
    },
  ],
  apply: {
    scenario: 'From rows to cards.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What makes a white card "lift" off a cream screen?',
        options: [
          { text: 'fontWeight: \'bold\'', why: 'That\'s for text. The card lifts because of its own background.' },
          { text: 'The contrast between its white background and the cream around it' },
          { text: 'flex: 1', why: 'flex controls size along the axis, not how it looks.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Turn the row into a card: backgroundColor \'#ffffff\', borderRadius 16, padding 16',
        starter: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.name}>Large pho</Text>
        <Text style={styles.price}>$13.50</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#fff7ed' },
  card: { flexDirection: 'row' },
  name: { flex: 1, fontSize: 18 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#9a3412' },
});
`,
        solution: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.name}>Large pho</Text>
        <Text style={styles.price}>$13.50</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#fff7ed' },
  card: { flexDirection: 'row', backgroundColor: '#ffffff', borderRadius: 16, padding: 16 },
  name: { flex: 1, fontSize: 18 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#9a3412' },
});
`,
        hint: 'Add backgroundColor: \'#ffffff\', borderRadius: 16 and padding: 16 to styles.card.',
        checks: [
          { message: 'White card', screen: { style: { of: 'Large pho', prop: 'backgroundColor', value: '#ffffff' } } },
          { message: 'Rounded corners (16)', screen: { style: { of: 'Large pho', prop: 'borderRadius', value: '16' } } },
          { message: 'Padding 16', screen: { style: { of: 'Large pho', prop: 'padding', value: '16' } } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the style to its effect on the card.',
        pairs: [
          ['borderRadius: 16', 'Soft rounded corners'],
          ['borderWidth: 1', 'A thin outline'],
          ['elevation: 2', 'A shadow on Android'],
          ['shadowOpacity: 0.1', 'Part of a shadow on iPhone'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'Your shadow looks great on iPhone and is missing on Android. Why?',
        options: [
          { text: 'Android is broken.', why: 'It isn\'t: Android shadows use a different property.' },
          { text: 'iPhone uses shadowColor/shadowOpacity/shadowRadius; Android needs elevation. Or I use a thin border, which looks the same on both.' },
          { text: 'Shadows are only for iPhones.', why: 'Android has them too, through elevation.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a thin outline to the card: borderWidth 1 and borderColor \'#fed7aa\'',
        starter: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.name}>Banh mi</Text>
        <Text>$9.00</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#fff7ed' },
  card: { flexDirection: 'row', backgroundColor: '#ffffff', borderRadius: 16, padding: 16 },
  name: { flex: 1, fontSize: 18 },
});
`,
        solution: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.name}>Banh mi</Text>
        <Text>$9.00</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#fff7ed' },
  card: { flexDirection: 'row', backgroundColor: '#ffffff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#fed7aa' },
  name: { flex: 1, fontSize: 18 },
});
`,
        hint: 'Add borderWidth: 1, borderColor: \'#fed7aa\' to styles.card.',
        checks: [
          { message: 'A 1-wide border', screen: { style: { of: 'Banh mi', prop: 'borderWidth', value: '1' } } },
          { message: 'In pale orange #fed7aa', screen: { style: { of: 'Banh mi', prop: 'borderColor', value: '#fed7aa' } } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'iPhone shadow or Android shadow?',
        groups: ['iPhone', 'Android'],
        items: [
          { text: 'shadowColor', group: 0 },
          { text: 'elevation', group: 1 },
          { text: 'shadowRadius', group: 0 },
          { text: 'shadowOpacity', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Line up the picture, name and price.',
        language: 'typescript',
        template: "card: { flexDirection: 'row', [[1]]: 'center', [[2]]: 16 },",
        blanks: [['alignItems'], ['gap']],
        distractors: ['justify', 'space', 'textAlign'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which one style property gives a card a shadow on Android?',
        answers: ['elevation'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The card has a picture 64 tall and two lines of text. Without alignItems: \'center\', where does the text sit?',
        code: "card: { flexDirection: 'row' }\n// picture 64 tall, text 22 tall",
        language: 'typescript',
        options: [
          { text: 'Exactly in the middle', why: 'Only with alignItems: \'center\'.' },
          { text: 'At the bottom', why: 'Text stretches from the top in a row by default.' },
          { text: 'Lined up with the top of the picture' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'The card is invisible against the screen. Which line is the problem?',
        language: 'typescript',
        lines: ["screen: { backgroundColor: '#ffffff' },", "card: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16 },"],
        bug: 0,
        fix: "screen: { backgroundColor: '#fff7ed' },",
        explanation: 'White card on a white screen: no contrast, no card. Use the cream background, or a border.',
      },
    ],
  },
  reflect: {
    prompt: 'Open a food or shopping app. How are its cards made: background, corners, border, shadow? Which would suit your app?',
    starters: ['The app\'s cards have...', 'Mine would have...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'The React Native docs page "Shadow Props" shows the iPhone shadow properties, and "View Style Props" covers elevation for Android.',
  },
  notes: 'Shadows: iOS shadowColor/shadowOffset/shadowOpacity/shadowRadius; Android elevation (newer RN also supports boxShadow). Border properties are cross-platform. Without alignItems center in a row, children align to flex-start (top) and stretch by default.',
};

export default lesson;
