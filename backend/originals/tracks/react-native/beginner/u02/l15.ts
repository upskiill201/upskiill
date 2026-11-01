import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 15. Checkpoint 3: lessons 11–14 plus earlier (pictures, cards, hierarchy, scrolling). The small-phone test. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the small-phone test',
  summary: 'Friday night, one day to market. Linh\'s old phone is the judge: pictures must show, the menu must scroll, and Order ahead must be the button you find first. Check pictures, cards, buttons and scrolling.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Build a picture card in a scrolling list', 'Keep one main button'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 10:30 p.m.',
      beats: [
        { speaker: 'linh', text: 'My phone. My rules. Pictures, scroll, and I find the order button without my glasses.' },
        { speaker: 'theo', text: 'Deal.' },
        { speaker: 'mai', text: '(filming) The final boss is a five-year-old phone.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: pictures, cards, hierarchy, scrolling.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build one menu card: the pho picture (64 by 64), "Large pho" with flex: 1, and "$13.50", in a white card with borderRadius 16 and padding 16',
        starter: `import { View, Text, Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#fff7ed' },
});
`,
        solution: `import { View, Text, Image, StyleSheet } from 'react-native';

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
  card: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, backgroundColor: '#ffffff', borderRadius: 16 },
  photo: { width: 64, height: 64, borderRadius: 12 },
  name: { flex: 1, fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 18, fontWeight: 'bold', color: '#9a3412' },
});
`,
        hint: 'A View with styles.card (row, white, borderRadius 16, padding 16) holding an Image, a name Text and a price Text.',
        checks: [
          { message: 'A picture', screen: { images: 1 } },
          { message: 'A row', screen: { style: { of: 'Large pho', prop: 'flexDirection', value: 'row' } } },
          { message: 'White card', screen: { style: { of: 'Large pho', prop: 'backgroundColor', value: '#ffffff' } } },
          { message: 'Rounded (16)', screen: { style: { of: 'Large pho', prop: 'borderRadius', value: '16' } } },
          { message: 'Price shows', screen: { text: '$13.50' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'An Image shows nothing and there\'s no error. First thing to check?',
        options: [
          { text: 'That it has a width and height' },
          { text: 'That the phone has enough memory', why: 'Almost always it\'s a missing size: 0 by 0.' },
          { text: 'That it\'s inside a ScrollView', why: 'Images work anywhere, but need a size.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Passes Linh\'s test, or fails?',
        groups: ['Passes', 'Fails'],
        items: [
          { text: 'One solid Order ahead, quiet outlined others', group: 0 },
          { text: 'A long menu in a plain View', group: 1 },
          { text: 'Pictures with width and height', group: 0 },
          { text: 'Four identical rust buttons', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s answer.',
        from: 'linh',
        message: 'The shadow on the cards is gone on my phone. Theo\'s phone has it.',
        options: [
          { text: 'Your phone\'s an Android: it needs elevation. Or I\'ll use a thin border so it looks the same on both.' },
          { text: 'Shadows don\'t matter.', why: 'They do to Linh, and there\'s an easy fix.' },
          { text: 'Buy an iPhone, Mum.', why: 'Not a fix. Android needs elevation.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the screen scroll: use a ScrollView with contentContainerStyle={styles.content} for padding and gap',
        starter: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.card}>Large pho $13.50</Text>
      <Text style={styles.card}>Banh mi $9.00</Text>
      <Text style={styles.card}>Iced coffee $4.75</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff7ed' },
  content: { padding: 24, paddingTop: 64, gap: 12 },
  card: { fontSize: 18, padding: 24, backgroundColor: '#ffffff' },
});
`,
        solution: `import { ScrollView, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.card}>Large pho $13.50</Text>
      <Text style={styles.card}>Banh mi $9.00</Text>
      <Text style={styles.card}>Iced coffee $4.75</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff7ed' },
  content: { padding: 24, paddingTop: 64, gap: 12 },
  card: { fontSize: 18, padding: 24, backgroundColor: '#ffffff' },
});
`,
        hint: 'Import ScrollView and use <ScrollView style={styles.screen} contentContainerStyle={styles.content}>.',
        checks: [
          { message: 'Uses a ScrollView', codeIncludes: '<ScrollView' },
          { message: 'Padding on the content container', codeIncludes: 'contentContainerStyle={styles.content}' },
          { message: 'All three dishes show', screen: { text: 'Iced coffee $4.75' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to its lesson.',
        pairs: [
          ['width and height on Image', 'Pictures on the menu'],
          ['White background, borderRadius', 'Make it a card'],
          ['One solid button', 'One button to find'],
          ['ScrollView', 'Every phone is different'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A picture with a size.',
        language: 'typescript',
        template: "<Image source={{ uri: '/originals/react-native/pho.png' }} style={{ [[1]]: 64, [[2]]: 64 }} />",
        blanks: [['width'], ['height']],
        distractors: ['size', 'scale', 'fontSize'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What shape is this picture?',
        code: "style={{ width: 80, height: 80, borderRadius: 40 }}",
        language: 'typescript',
        options: [
          { text: 'A square with sharp corners', why: 'borderRadius 40 rounds them.' },
          { text: 'A circle' },
          { text: 'An oval', why: 'Width and height are equal, so it\'s a circle.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which prop describes a picture for screen readers? (One word.)',
        answers: ['accessibilityLabel'],
        placeholder: 'propName',
      },
      {
        kind: 'mcq',
        prompt: 'Linh scrolls to the iced coffee, finds Order ahead first try, and hands the phone back. What does she say?',
        options: [
          { text: '"Paper is still faster."', why: 'Not tonight.' },
          { text: '"Bring the market banner. And charge your phone."' },
          { text: '"Add more buttons."', why: 'She liked that there was one to find.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Run the small-phone test on your own app: the smallest screen, text size up. What fails first?',
    starters: ['Fails first:...', 'My fix:...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 11–14 with earlier review.',
};

export default lesson;
