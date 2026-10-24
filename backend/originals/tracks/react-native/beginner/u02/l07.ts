import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Chat with Tey: padding, margin, gap and a spacing scale. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Room to breathe',
  summary: 'Everything on Theo\'s menu touches everything else. Mai says it "looks stressed". Tey on padding, margin and gap, the three ways to give a screen room.',
  minutes: 12,
  outcomes: ['Use padding for space inside, margin for space outside', 'Use gap for even space between children', 'Stick to a spacing scale like 8, 16, 24'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Mai\'s right, the menu looks stressed. Everything touches. Three tools fix it. Ready?', replies: ['Ready', 'Three?'] },
        { tey: 'Padding is space INSIDE a box, between its edge and what\'s in it. A button with padding: 16 has a fat, tappable inside.', replies: ['And margin?'] },
        { tey: 'Margin is space OUTSIDE a box, pushing its neighbours away. marginBottom: 12 on each row keeps them from touching.', replies: ['What\'s gap?'] },
        { tey: 'gap goes on the parent: gap: 12 puts 12 between every child. No margin on each one, no extra space after the last.', replies: ['How much space, though?'] },
        { tey: 'Pick a scale and stick to it: 8, 16, 24, 32. Random numbers like 7, 13 and 22 make a screen feel slightly wrong, even when nobody can say why.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Give it room',
      caption: 'The menu uses gap on the list and padding inside each row. Change gap to 0 and see it get stressed again.',
      code: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pho Real</Text>
      <View style={styles.list}>
        <View style={styles.row}><Text style={styles.name}>Large pho</Text><Text style={styles.price}>$13.50</Text></View>
        <View style={styles.row}><Text style={styles.name}>Banh mi</Text><Text style={styles.price}>$9.00</Text></View>
        <View style={styles.row}><Text style={styles.name}>Iced coffee</Text><Text style={styles.price}>$4.75</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#fff7ed' },
  title: { fontSize: 34, fontWeight: 'bold', color: '#9a3412', marginBottom: 24 },
  list: { gap: 12 },
  row: { flexDirection: 'row', padding: 16, backgroundColor: '#ffffff', borderRadius: 12 },
  name: { flex: 1, fontSize: 18 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#9a3412' },
});
`,
      challenge: 'Change the row padding from 16 to 4. Can you still imagine tapping it with a thumb?',
    },
  ],
  apply: {
    scenario: 'Spacing the menu.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does padding do?',
        options: [
          { text: 'Adds space inside a box, between its edge and its content' },
          { text: 'Adds space outside a box', why: 'That\'s margin. Padding is inside.' },
          { text: 'Makes the text bigger', why: 'Padding adds space around the content, not size to the text.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Give each row padding: 16 so it\'s easy to tap',
        starter: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <Text style={styles.name}>Large pho</Text>
        <Text>$13.50</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  row: { flexDirection: 'row', backgroundColor: '#ffffff' },
  name: { flex: 1, fontSize: 18 },
});
`,
        solution: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <Text style={styles.name}>Large pho</Text>
        <Text>$13.50</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  row: { flexDirection: 'row', backgroundColor: '#ffffff', padding: 16 },
  name: { flex: 1, fontSize: 18 },
});
`,
        hint: 'Add padding: 16 to styles.row.',
        checks: [{ message: 'Rows have padding 16', screen: { style: { of: 'Large pho', prop: 'padding', value: '16' } } }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tool to where the space goes.',
        pairs: [
          ['padding', 'Inside the box'],
          ['margin', 'Outside the box'],
          ['gap', 'Between children, set on the parent'],
          ['8, 16, 24, 32', 'A spacing scale'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'Your margins are 7, 13 and 22. Why?',
        options: [
          { text: 'They looked right at the time.', why: 'That\'s the problem: random numbers feel slightly off. Use a scale.' },
          { text: 'Odd numbers are faster.', why: 'Not a thing.' },
          { text: 'No reason. I\'ll switch to 8, 16 and 24 so everything lines up.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Space the list evenly: give the list View gap: 12',
        starter: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.list}>
        <Text style={styles.item}>Large pho $13.50</Text>
        <Text style={styles.item}>Banh mi $9.00</Text>
        <Text style={styles.item}>Iced coffee $4.75</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  list: {},
  item: { fontSize: 18 },
});
`,
        solution: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.list}>
        <Text style={styles.item}>Large pho $13.50</Text>
        <Text style={styles.item}>Banh mi $9.00</Text>
        <Text style={styles.item}>Iced coffee $4.75</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  list: { gap: 12 },
  item: { fontSize: 18 },
});
`,
        hint: 'In styles.list, add gap: 12.',
        checks: [{ message: 'The list has gap 12', screen: { style: { of: 'Banh mi', prop: 'gap', value: '12' } } }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Padding or margin?',
        groups: ['Padding', 'Margin'],
        items: [
          { text: 'Make a button fatter to tap', group: 0 },
          { text: 'Push the title away from the list', group: 1 },
          { text: 'Space inside a card around its text', group: 0 },
          { text: 'Space between two separate cards', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Space inside the row, and below the title.',
        language: 'typescript',
        template: 'row: { [[1]]: 16 },\ntitle: { [[2]]: 24 },',
        blanks: [['padding'], ['marginBottom']],
        distractors: ['space', 'border', 'gapBottom'],
      },
      {
        kind: 'mcq',
        prompt: 'Why use gap instead of a margin on every row?',
        options: [
          { text: 'gap is faster to type and leaves no extra space after the last row' },
          { text: 'Margins don\'t work in React Native', why: 'They do. gap is just tidier for even spacing.' },
          { text: 'gap makes text bigger', why: 'gap only adds space between children.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'On the spacing scale 8, 16, 24, 32, what comes next?',
        answers: ['40'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which value breaks the spacing scale?',
        language: 'typescript',
        lines: ['screen: { padding: 24 },', 'title: { marginBottom: 16 },', 'row: { padding: 13 },', 'list: { gap: 8 },'],
        bug: 2,
        fix: 'row: { padding: 16 },',
        explanation: '13 isn\'t on the 8-point scale. 16 lines up with everything else.',
      },
    ],
  },
  reflect: {
    prompt: 'Open an app you like. Where does it use lots of space? How does that make the important things stand out?',
    starters: ['It uses space around...', 'It makes...stand out'],
  },
  deepen: {
    title: 'Go further',
    summary: 'Many design systems use an 8-point spacing grid. Search "8-point grid" to see why the multiples of 8 work so well on screens.',
  },
  notes: 'padding (inside), margin (outside), gap/rowGap/columnGap supported in React Native 0.71+. The 8-point grid is a widely used design convention, not a platform rule.',
};

export default lesson;
