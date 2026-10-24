import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Walkthrough: flexbox direction (column vs row), the main axis, flex: 1. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Rows and columns',
  summary: 'Mai sketches the menu she wants on a napkin: dish name on the left, price on the right, on the same line. Theo\'s app can only stack things. Time to learn flexbox.',
  minutes: 13,
  outcomes: ['Lay things out in a row with flexDirection', 'Know what the main axis is', 'Let something fill the space with flex: 1'],
  learn: [
    {
      kind: 'steps',
      title: 'From a stack to a row',
      steps: [
        {
          title: '1. Every View is a flex container',
          body: 'React Native lays out everything with flexbox. Each View arranges its children along one line, called the main axis.',
        },
        {
          title: '2. The default is a column',
          body: 'flexDirection: \'column\' is the default: children stack top to bottom. That\'s why v0.1 was one long stack.',
        },
        {
          title: '3. Switch the direction to a row',
          body: 'Put the name and the price in their own View, and give that View flexDirection: \'row\'. Now they sit side by side.',
          code: "<View style={{ flexDirection: 'row' }}>\n  <Text>Large pho</Text>\n  <Text>$13.50</Text>\n</View>",
          language: 'typescript',
        },
        {
          title: '4. Let the name take the spare space',
          body: 'flex: 1 on the name says "take all the space that\'s left". The price is pushed to the right edge, exactly like Mai\'s napkin.',
          code: "<View style={{ flexDirection: 'row' }}>\n  <Text style={{ flex: 1 }}>Large pho</Text>\n  <Text>$13.50</Text>\n</View>",
          language: 'typescript',
        },
        {
          title: '5. Rows inside a column',
          body: 'The screen is still a column of rows: each MenuItem is a row, and the rows stack. Most app layouts are exactly this: columns of rows of columns.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Mai\'s napkin, in code',
      caption: 'One row: name on the left, price on the right. Remove flex: 1 from the name and see the price slide back next to it.',
      code: `import { View, Text, StyleSheet } from 'react-native';

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
      challenge: 'Change row\'s flexDirection to \'column\' and watch it turn back into a stack.',
    },
  ],
  apply: {
    scenario: 'Name left, price right.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the default flexDirection in React Native?',
        options: [
          { text: "'row'", why: 'That\'s the web\'s default. React Native defaults to a column.' },
          { text: "'column': children stack top to bottom" },
          { text: "'stack'", why: 'There\'s no stack value. It\'s column.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Put the name and price on one line: give the row View flexDirection: \'row\'',
        starter: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <Text style={styles.name}>Large pho</Text>
        <Text style={styles.price}>$13.50</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  row: { marginBottom: 12 },
  name: { fontSize: 18 },
  price: { fontSize: 18, fontWeight: 'bold' },
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  row: { flexDirection: 'row', marginBottom: 12 },
  name: { fontSize: 18 },
  price: { fontSize: 18, fontWeight: 'bold' },
});
`,
        hint: 'In styles.row, add flexDirection: \'row\'.',
        checks: [{ message: 'The row is flexDirection: \'row\'', screen: { style: { of: 'Large pho', prop: 'flexDirection', value: 'row' } } }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each style to what it does.',
        pairs: [
          ["flexDirection: 'row'", 'Children side by side'],
          ["flexDirection: 'column'", 'Children stacked (the default)'],
          ['flex: 1', 'Take all the space that\'s left'],
          ['The main axis', 'The direction children are laid out'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Push the price to the right edge: give the name flex: 1',
        starter: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <Text style={styles.name}>Banh mi</Text>
        <Text style={styles.price}>$9.00</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  row: { flexDirection: 'row' },
  name: { fontSize: 18 },
  price: { fontSize: 18, fontWeight: 'bold' },
});
`,
        solution: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <Text style={styles.name}>Banh mi</Text>
        <Text style={styles.price}>$9.00</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  row: { flexDirection: 'row' },
  name: { flex: 1, fontSize: 18 },
  price: { fontSize: 18, fontWeight: 'bold' },
});
`,
        hint: 'In styles.name, add flex: 1.',
        checks: [
          { message: 'The name has flex: 1', screen: { style: { of: 'Banh mi', prop: 'flex', value: '1', self: true } } },
          { message: 'Still a row', screen: { style: { of: 'Banh mi', prop: 'flexDirection', value: 'row' } } },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'Why don\'t you just add loads of spaces between the name and the price?',
        options: [
          { text: 'Good idea.', why: 'Spaces line up on one phone and break on the next. Flexbox adapts to every width.' },
          { text: 'Spaces would line up on my phone and break on every other size. flex: 1 adapts to any screen.' },
          { text: 'Spaces are illegal in code.', why: 'They aren\'t. They just don\'t make a layout.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How does this lay out?',
        code: "<View style={{ flexDirection: 'row' }}>\n  <Text>Small</Text>\n  <Text>Large</Text>\n</View>",
        language: 'typescript',
        options: [
          { text: '"Small" and "Large" side by side' },
          { text: '"Small" above "Large"', why: 'That\'s the default column. This View is a row.' },
          { text: 'Only "Large" shows', why: 'Both show, side by side.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A row with the name filling the space.',
        language: 'typescript',
        template: "row: { flexDirection: '[[1]]' },\nname: { [[2]]: 1 },",
        blanks: [['row'], ['flex']],
        distractors: ['column', 'grow', 'width'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Row or column?',
        groups: ['Row', 'Column'],
        items: [
          { text: 'A dish name next to its price', group: 0 },
          { text: 'The whole menu, one item under another', group: 1 },
          { text: 'Two buttons side by side', group: 0 },
          { text: 'Title, then tagline under it', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What value of flexDirection puts children side by side?',
        answers: ['row', "'row'"],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'The price sits right next to the name instead of at the edge. Which style is missing something?',
        language: 'typescript',
        lines: ["row: { flexDirection: 'row' },", 'name: { fontSize: 18 },', "price: { fontWeight: 'bold' },"],
        bug: 1,
        fix: 'name: { flex: 1, fontSize: 18 },',
        explanation: 'The name needs flex: 1 to take the spare space and push the price to the right.',
      },
    ],
  },
  reflect: {
    prompt: 'Look at any app you use. Find one row and one column on its screen. What\'s in each?',
    starters: ['A row:...', 'A column:...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'The React Native docs page "Layout with Flexbox" has a live playground. Try flexDirection there with three coloured boxes.',
  },
  notes: 'RN flexbox: default flexDirection column (web default is row); flex: 1 takes remaining space along the main axis.',
};

export default lesson;
