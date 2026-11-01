import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Before/After: justifyContent and alignItems (centring the header, lining up rows). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Line it up',
  summary: 'Linh wants the opening screen to feel like the truck\'s sign: the name centred, big and calm. Theo\'s version hugs the top-left corner. Two properties fix it. See what changes.',
  minutes: 12,
  outcomes: ['Position children along the main axis with justifyContent', 'Line them up across it with alignItems', 'Centre something on screen'],
  learn: [
    {
      kind: 'compare',
      title: 'The welcome screen',
      before: {
        label: 'Before: everything in the top-left corner',
        text: "<View style={{ flex: 1 }}>\n  <Text style={styles.title}>Pho Real</Text>\n  <Text style={styles.tagline}>Order ahead. Skip the line.</Text>\n</View>",
      },
      after: {
        label: 'After: centred like the truck\'s sign',
        text: "<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>\n  <Text style={styles.title}>Pho Real</Text>\n  <Text style={styles.tagline}>Order ahead. Skip the line.</Text>\n</View>",
      },
      notes: [
        'justifyContent works ALONG the main axis. In a column (the default), that\'s up and down: \'center\' puts the group in the middle of the screen\'s height.',
        'alignItems works ACROSS the main axis. In a column that\'s left and right: \'center\' centres each child horizontally.',
        'In a row they swap: justifyContent is left and right, alignItems is up and down.',
        'Other useful values: \'space-between\' (spread out, first and last at the edges), \'flex-start\' and \'flex-end\'.',
        'flex: 1 on the screen matters: without it the View is only as tall as its content, so there\'s no space to centre in.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Centre it',
      caption: 'Try justifyContent: \'flex-end\' to push the name to the bottom, then back to \'center\'.',
      code: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pho Real</Text>
      <Text style={styles.tagline}>Order ahead. Skip the line.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#9a3412' },
  title: { fontSize: 44, fontWeight: 'bold', color: '#fff7ed' },
  tagline: { fontSize: 18, color: '#fff7ed', marginTop: 8 },
});
`,
      challenge: 'Change alignItems to \'flex-start\' and see the text move to the left.',
    },
  ],
  apply: {
    scenario: 'Lining things up.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'In a column (the default), match each to its direction.',
        pairs: [
          ['justifyContent', 'Up and down (along the column)'],
          ['alignItems', 'Left and right (across it)'],
          ["'center'", 'In the middle'],
          ["'space-between'", 'Spread out to the edges'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Centre the welcome screen: justifyContent and alignItems both \'center\'',
        starter: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pho Real</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#9a3412' },
  title: { fontSize: 44, fontWeight: 'bold', color: '#fff7ed' },
});
`,
        solution: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pho Real</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#9a3412' },
  title: { fontSize: 44, fontWeight: 'bold', color: '#fff7ed' },
});
`,
        hint: 'In styles.screen, add justifyContent: \'center\' and alignItems: \'center\'.',
        checks: [
          { message: 'Centred up and down', screen: { style: { of: 'Pho Real', prop: 'justifyContent', value: 'center' } } },
          { message: 'Centred left and right', screen: { style: { of: 'Pho Real', prop: 'alignItems', value: 'center' } } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In a ROW, which property moves children left and right?',
        options: [
          { text: 'alignItems', why: 'In a row, alignItems is up and down. They swap.' },
          { text: 'textAlign', why: 'textAlign aligns text inside one Text, not children of a View.' },
          { text: 'justifyContent' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'I added justifyContent: \'center\' and nothing moved.',
        options: [
          { text: 'Does the View have flex: 1? Without it, it\'s only as tall as the text, so there\'s nowhere to move.' },
          { text: 'The phone doesn\'t support centring.', why: 'It does. The View just has no spare space.' },
          { text: 'Try more justifyContent.', why: 'Adding it twice won\'t help. The View needs space: flex: 1.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make a row with "Order #41" on the left and "Ready" on the right, using justifyContent: \'space-between\' (no flex: 1 needed)',
        starter: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <Text style={styles.order}>Order #41</Text>
        <Text style={styles.status}>Ready</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  row: {},
  order: { fontSize: 20, fontWeight: 'bold' },
  status: { fontSize: 20, color: '#15803d' },
});
`,
        solution: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.row}>
        <Text style={styles.order}>Order #41</Text>
        <Text style={styles.status}>Ready</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  order: { fontSize: 20, fontWeight: 'bold' },
  status: { fontSize: 20, color: '#15803d' },
});
`,
        hint: 'styles.row: { flexDirection: \'row\', justifyContent: \'space-between\' }.',
        checks: [
          { message: 'A row', screen: { style: { of: 'Order #41', prop: 'flexDirection', value: 'row' } } },
          { message: 'Spread to the edges', screen: { style: { of: 'Order #41', prop: 'justifyContent', value: 'space-between' } } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Centre everything.',
        language: 'typescript',
        template: "screen: { flex: 1, [[1]]: 'center', [[2]]: 'center' },",
        blanks: [['justifyContent'], ['alignItems']],
        distractors: ['textAlign', 'align', 'center'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Where does the text end up?',
        code: "<View style={{ flex: 1, justifyContent: 'flex-end' }}>\n  <Text>Order ahead</Text>\n</View>",
        language: 'typescript',
        options: [
          { text: 'At the top', why: 'flex-end pushes to the END of the column: the bottom.' },
          { text: 'At the bottom of the screen' },
          { text: 'In the middle', why: 'That\'s \'center\'. flex-end is the bottom.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'In a column: up/down or left/right?',
        groups: ['Up and down', 'Left and right'],
        items: [
          { text: "justifyContent: 'center'", group: 0 },
          { text: "alignItems: 'center'", group: 1 },
          { text: "justifyContent: 'flex-end'", group: 0 },
          { text: "alignItems: 'flex-start'", group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which justifyContent value spreads children out with the first and last at the edges?',
        answers: ['space-between', "'space-between'", 'spacebetween'],
        placeholder: 'value',
      },
      {
        kind: 'findBug',
        prompt: 'The welcome text won\'t centre vertically. Which line is the problem?',
        language: 'typescript',
        lines: ["screen: { justifyContent: 'center', alignItems: 'center' },", "title: { fontSize: 44, color: '#fff7ed' },"],
        bug: 0,
        fix: "screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },",
        explanation: 'Without flex: 1 the screen View is only as tall as its content, so there\'s no space to centre in.',
      },
    ],
  },
  reflect: {
    prompt: 'Find one centred thing and one "space-between" row in an app you use. What are they?',
    starters: ['Centred:...', 'Space-between:...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'In the "Layout with Flexbox" docs playground, try every justifyContent value on a column, then switch to a row and try them again.',
  },
  notes: 'justifyContent = main axis, alignItems = cross axis; they swap meaning with flexDirection. flex-start/flex-end/center/space-between/space-around/space-evenly.',
};

export default lesson;
