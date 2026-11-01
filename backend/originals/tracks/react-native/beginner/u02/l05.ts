import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5. Checkpoint 1: lessons 1–4 (colour basics, StyleSheet, styling myths, rows). */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Mai\'s napkin',
  summary: 'Mai\'s napkin sketch has three rows, the truck\'s colours and prices on the right. She gives Theo until the noodles finish cooking. Check what you know about StyleSheet and rows.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Build rows with StyleSheet', 'Avoid CSS habits in React Native styles'],
  learn: [
    {
      kind: 'story',
      title: 'Noodles: 4 minutes',
      beats: [
        { speaker: 'mai', text: 'Three dishes. Names left, prices right, truck colours. Before the noodles are done.' },
        { speaker: 'theo', text: 'And if I make it?' },
        { speaker: 'mai', text: 'Then I\'ll stop calling it a phone bill. Probably.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: StyleSheet and rows.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build Mai\'s napkin: a row style (flexDirection \'row\'), name with flex: 1, and rows for Large pho ($13.50) and Banh mi ($9.00)',
        starter: `import { View, Text, StyleSheet } from 'react-native';

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
        solution: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <Text style={styles.name}>Large pho</Text>
        <Text style={styles.price}>$13.50</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.name}>Banh mi</Text>
        <Text style={styles.price}>$9.00</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#fff7ed' },
  row: { flexDirection: 'row', marginBottom: 12 },
  name: { flex: 1, fontSize: 18 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#9a3412' },
});
`,
        hint: 'Two Views with style={styles.row}, each holding a name Text and a price Text. Add row, name and price to the StyleSheet.',
        checks: [
          { message: 'Large pho in a row', screen: { style: { of: 'Large pho', prop: 'flexDirection', value: 'row' } } },
          { message: 'Banh mi in a row', screen: { style: { of: 'Banh mi', prop: 'flexDirection', value: 'row' } } },
          { message: 'Names take the spare space', screen: { style: { of: 'Large pho', prop: 'flex', value: '1', self: true } } },
          { message: 'Both prices show', screen: { text: '$9.00' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which is the React Native way to write a style?',
        options: [
          { text: "{ 'font-size': '18px' }", why: 'Dashes and px are CSS.' },
          { text: '{ font-size: 18 }', why: 'Dashes aren\'t allowed in object keys without quotes, and RN uses camelCase.' },
          { text: '{ fontSize: 18 }' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does the Text inside get the style?',
        groups: ['Yes', 'No'],
        items: [
          { text: 'color set on the Text itself', group: 0 },
          { text: 'color set on the View around it', group: 1 },
          { text: 'color set on a Text around it', group: 0 },
          { text: 'fontSize set on the screen View', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s answer.',
        from: 'mai',
        message: 'Why is styles.price red-brown but the names aren\'t? Same row.',
        options: [
          { text: 'Each Text has its own style. The row only decides where they sit.' },
          { text: 'The row is broken.', why: 'It\'s working: text styles live on each Text.' },
          { text: 'Random.', why: 'It\'s deliberate: price has its own style.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is the text?',
        code: "const styles = StyleSheet.create({\n  a: { color: 'black' },\n  b: { color: '#9a3412' },\n});\n<Text style={[styles.b, styles.a]}>Banh mi</Text>",
        language: 'typescript',
        options: [
          { text: '#9a3412', why: 'The last style in the array wins, and that\'s styles.a.' },
          { text: 'black' },
          { text: 'Both', why: 'A Text has one colour. The last style wins.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Name left, price right.',
        language: 'typescript',
        template: "row: { [[1]]: 'row' },\nname: { flex: [[2]] },",
        blanks: [['flexDirection'], ['1']],
        distractors: ['direction', '100', 'layout'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each habit to its fix.',
        pairs: [
          ['font-size: 18px', 'fontSize: 18'],
          ['Colour on the View for its text', 'Colour on the Text'],
          ['Style copied on every line', 'StyleSheet.create'],
          ['Spaces to line up prices', 'flexDirection row + flex: 1'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do you import to use StyleSheet.create? (One word.)',
        answers: ['StyleSheet'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Which line stops the colour showing on the price?',
        language: 'typescript',
        lines: ["<View style={{ flexDirection: 'row', color: '#9a3412' }}>", '  <Text style={{ flex: 1 }}>Large pho</Text>', '  <Text>$13.50</Text>', '</View>'],
        bug: 0,
        fix: "<View style={{ flexDirection: 'row' }}> and <Text style={{ color: '#9a3412' }}>$13.50</Text>",
        explanation: 'Colour on a View doesn\'t reach the Text inside. Put it on the price Text.',
      },
      {
        kind: 'mcq',
        prompt: 'Did Theo make it before the noodles?',
        options: [
          { text: 'No, Mai still says "phone bill"', why: 'He made it. She says something else.' },
          { text: 'Yes. Mai: "It\'s... fine. It\'s actually fine."' },
          { text: 'He burned the noodles', why: 'Ray would never allow that.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Sketch (on paper) one screen you\'d like to build. Mark every row and every column.',
    starters: ['Rows:...', 'Columns:...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1–4.',
};

export default lesson;
