import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10. Checkpoint 2: lessons 6–9 plus earlier (alignment, spacing, palette). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the welcome screen',
  summary: 'Linh wants the app to open like the truck pulls up: rust everywhere for one second, the name in the middle, then the menu. Build the welcome screen, and check alignment, spacing and colour.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Centre a screen and space a list', 'Use a COLORS palette'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday night',
      beats: [
        { speaker: 'linh', text: 'When people open it, it should feel like the truck just pulled up. Our colour. Our name. In the middle.' },
        { speaker: 'theo', text: 'A welcome screen. Rust background, cream name, centred.' },
        { speaker: 'linh', text: 'I said what I said.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: alignment, spacing, colour.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the welcome screen: rust background (COLORS.rust), "Pho Real" in cream (COLORS.cream), centred both ways',
        starter: `import { View, Text, StyleSheet } from 'react-native';

const COLORS = { rust: '#9a3412', cream: '#fff7ed' };

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pho Real</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  title: { fontSize: 44, fontWeight: 'bold' },
});
`,
        solution: `import { View, Text, StyleSheet } from 'react-native';

const COLORS = { rust: '#9a3412', cream: '#fff7ed' };

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pho Real</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.rust },
  title: { fontSize: 44, fontWeight: 'bold', color: COLORS.cream },
});
`,
        hint: 'screen: add justifyContent: \'center\', alignItems: \'center\', backgroundColor: COLORS.rust. title: add color: COLORS.cream.',
        checks: [
          { message: 'Rust background', screen: { style: { of: 'Pho Real', prop: 'backgroundColor', value: '#9a3412' } } },
          { message: 'Cream title', screen: { style: { of: 'Pho Real', prop: 'color', value: '#fff7ed' } } },
          { message: 'Centred up and down', screen: { style: { of: 'Pho Real', prop: 'justifyContent', value: 'center' } } },
          { message: 'Centred left and right', screen: { style: { of: 'Pho Real', prop: 'alignItems', value: 'center' } } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In a ROW, which property lines children up top-to-bottom?',
        options: [
          { text: 'alignItems' },
          { text: 'justifyContent', why: 'In a row, justifyContent is left and right. alignItems is the cross direction.' },
          { text: 'flexDirection', why: 'That picks row or column. Alignment is alignItems.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Padding, margin or gap? Pick where each belongs.',
        groups: ['Inside a box (padding)', 'Between children (gap)'],
        items: [
          { text: 'Space around the text inside a card', group: 0 },
          { text: 'Even space between menu rows', group: 1 },
          { text: 'A fatter button to tap', group: 0 },
          { text: 'Space between three buttons in a row', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'Make the menu rust too. All of it. It\'s our colour.',
        options: [
          { text: 'Okay, all rust.', why: 'Then prices and the button vanish into the background.' },
          { text: 'The welcome screen is all rust. The menu stays calm, so the prices and the order button can be rust and jump out.' },
          { text: 'Rust is too dark.', why: 'Not the point: it\'s about what stands out.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Space the menu: give the list gap: 12 and each row padding: 16',
        starter: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.list}>
        <View style={styles.row}><Text style={styles.name}>Large pho</Text><Text>$13.50</Text></View>
        <View style={styles.row}><Text style={styles.name}>Banh mi</Text><Text>$9.00</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: 64 },
  list: {},
  row: { flexDirection: 'row', backgroundColor: '#ffffff' },
  name: { flex: 1, fontSize: 18 },
});
`,
        solution: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.list}>
        <View style={styles.row}><Text style={styles.name}>Large pho</Text><Text>$13.50</Text></View>
        <View style={styles.row}><Text style={styles.name}>Banh mi</Text><Text>$9.00</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: 64 },
  list: { gap: 12 },
  row: { flexDirection: 'row', backgroundColor: '#ffffff', padding: 16 },
  name: { flex: 1, fontSize: 18 },
});
`,
        hint: 'list: { gap: 12 } and add padding: 16 to row.',
        checks: [
          { message: 'Rows have padding 16', screen: { style: { of: 'Banh mi', prop: 'padding', value: '16' } } },
          { message: 'The list has gap 12', screen: { style: { of: 'Banh mi', prop: 'gap', value: '12' } } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each fix to the problem.',
        pairs: [
          ['flex: 1 on the screen', 'justifyContent does nothing'],
          ['color on the Text', 'Text stays black'],
          ['COLORS object', 'The same hex typed 20 times'],
          ['gap on the list', 'Rows touching each other'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Where are the two buttons?',
        code: "<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>\n  <Text>Menu</Text>\n  <Text>Order</Text>\n</View>",
        language: 'typescript',
        options: [
          { text: 'Both on the left', why: 'space-between pushes them to opposite edges.' },
          { text: 'Stacked', why: 'It\'s a row: side by side.' },
          { text: '"Menu" at the left edge, "Order" at the right edge' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The welcome screen\'s style.',
        language: 'typescript',
        template: "screen: { flex: 1, justifyContent: '[[1]]', alignItems: '[[2]]' },",
        blanks: [['center'], ['center']],
        distractors: ['middle', 'flex-start', 'space-between'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'On an 8-point scale, which is the next spacing value after 16?',
        answers: ['24'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Linh opens the welcome screen. What does she do?',
        options: [
          { text: 'Takes a screenshot and sends it to her sister in Houston' },
          { text: 'Asks for more colours', why: 'She asked for one colour, and got it.' },
          { text: 'Says "paper never crashes"', why: 'Not tonight.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What would the welcome screen of your own app look like? Colour, name, and one line under it.',
    starters: ['Colour:...', 'Name:...', 'Line:...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 6–9 with earlier review. Linh\'s sister in Houston is narrated, mentioned once.',
};

export default lesson;
