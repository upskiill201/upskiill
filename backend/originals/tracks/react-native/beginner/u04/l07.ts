import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Reading: filter for "just the ready ones", counts per status, a list header. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Just the ready ones',
  summary: 'Thirty orders on the board, three of them ready. People scroll past their own number looking for green. Linh: "Put the ready ones at the top. And tell me how many are still cooking."',
  minutes: 13,
  outcomes: ['Make a smaller list with .filter', 'Count items that match with .filter(...).length', 'Add a header to a FlatList'],
  learn: [
    {
      kind: 'reading',
      title: 'Lists made from lists',
      html: '<p>The board already has every order. Linh wants two smaller lists: the <strong>ready</strong> ones and the <strong>cooking</strong> ones. You don\'t store those. You <strong>filter</strong> them out of the full list every time the screen draws.</p><pre><code>const ready = orders.filter((o) =&gt; o.status === \'Ready\');\nconst cooking = orders.filter((o) =&gt; o.status === \'Cooking\');</code></pre><p><code>.filter</code> runs your function on every item and keeps the ones where it returns <code>true</code>. You get a new array; the original is untouched.</p><h3>Counting</h3><p>A filtered list has a length like any array:</p><pre><code>&lt;Text&gt;{ready.length} ready, {cooking.length} cooking&lt;/Text&gt;</code></pre><p>This is the same rule as the total in Chapter 3: <strong>store the list, calculate the rest</strong>. When an order changes to Ready, both lists and both counts are right on the next draw.</p><h3>A header that scrolls with the list</h3><p>FlatList has <code>ListHeaderComponent</code>: something drawn above the first row that scrolls with it. Good for a title and the counts:</p><pre><code>&lt;FlatList\n  data={ready}\n  ListHeaderComponent={&lt;Text&gt;Ready to collect&lt;/Text&gt;}\n  ...\n/&gt;</code></pre><blockquote>filter keeps, map changes, length counts. Together they answer most questions about a list.</blockquote><h3>Two lists on one screen?</h3><p>Two FlatLists stacked can fight over scrolling. For now, show the ready ones in a short row of big numbers at the top, and the full list underneath. (React Native also has SectionList, a list with headings, if you want to explore.)</p>',
    },
    {
      kind: 'tryIt',
      title: 'Ready at the top',
      caption: 'The big numbers at the top are the ready orders, filtered from the same list. Change Priya to \'Ready\' and watch the top and the counts update.',
      code: `import { View, Text, FlatList, StyleSheet } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana', status: 'Ready' },
  { id: '42', name: 'Sam', status: 'Cooking' },
  { id: '43', name: 'Priya', status: 'Cooking' },
  { id: '44', name: 'Jo', status: 'Ready' },
];

export default function App() {
  const ready = ORDERS.filter((o) => o.status === 'Ready');
  const cooking = ORDERS.filter((o) => o.status === 'Cooking');

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>Ready to collect</Text>
      <View style={styles.readyRow}>
        {ready.map((o) => (
          <Text key={o.id} style={styles.readyNumber}>#{o.id}</Text>
        ))}
      </View>
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.counts}>{ready.length} ready, {cooking.length} cooking</Text>}
        renderItem={({ item }) => <Text style={styles.row}>#{item.id} {item.name}: {item.status}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 8, backgroundColor: '#fff7ed' },
  label: { fontSize: 16, fontWeight: 'bold', color: '#15803d' },
  readyRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  readyNumber: { fontSize: 40, fontWeight: 'bold', color: '#15803d' },
  counts: { fontSize: 16, color: '#78716c', marginVertical: 8 },
  row: { fontSize: 18, paddingVertical: 8 },
});
`,
      challenge: 'Change the filter so the top shows the cooking orders instead. One word changes.',
    },
  ],
  apply: {
    scenario: 'Filtering the board.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Show only the ready orders, as "#{id} is ready", using .filter then .map',
        starter: `import { View, Text } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana', status: 'Ready' },
  { id: '42', name: 'Sam', status: 'Cooking' },
  { id: '43', name: 'Priya', status: 'Ready' },
];

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>

    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana', status: 'Ready' },
  { id: '42', name: 'Sam', status: 'Cooking' },
  { id: '43', name: 'Priya', status: 'Ready' },
];

export default function App() {
  const ready = ORDERS.filter((o) => o.status === 'Ready');
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {ready.map((o) => (
        <Text key={o.id}>#{o.id} is ready</Text>
      ))}
    </View>
  );
}
`,
        hint: "const ready = ORDERS.filter((o) => o.status === 'Ready'); then ready.map(...) into <Text key={o.id}>#{o.id} is ready</Text>.",
        checks: [
          { message: '#41 is ready', screen: { text: '#41 is ready' } },
          { message: '#43 is ready', screen: { text: '#43 is ready' } },
          { message: 'Sam\'s order isn\'t', screen: { noText: '#42' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the ready list calculated with .filter instead of kept in its own state?',
        options: [
          { text: 'State can\'t hold two arrays', why: 'It can. But two copies of the same orders can disagree.' },
          { text: 'filter is faster than useState', why: 'Speed isn\'t the reason. It\'s one source of truth.' },
          { text: 'It comes from the full list, so it can never disagree with it' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the array method to what it does.',
        pairs: [
          ['.map', 'Changes each item into something new'],
          ['.filter', 'Keeps only the items that match'],
          ['.length', 'Counts the items'],
          ['.slice(1)', 'Everything after the first'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'How many are still cooking? I need to know if Ray needs help.',
        options: [
          { text: 'It\'s on the board: the header says "2 ready, 3 cooking", worked out from the list every time it changes.' },
          { text: 'Count the rows yourself.', why: 'The app can count for her.' },
          { text: 'I\'ll update a number by hand when Ray tells me.', why: 'It would drift. filter and length keep it right.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a FlatList header with the counts: "1 ready, 2 cooking"',
        starter: `import { View, Text, FlatList } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana', status: 'Ready' },
  { id: '42', name: 'Sam', status: 'Cooking' },
  { id: '43', name: 'Priya', status: 'Cooking' },
];

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>#{item.id} {item.status}</Text>}
      />
    </View>
  );
}
`,
        solution: `import { View, Text, FlatList } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana', status: 'Ready' },
  { id: '42', name: 'Sam', status: 'Cooking' },
  { id: '43', name: 'Priya', status: 'Cooking' },
];

export default function App() {
  const ready = ORDERS.filter((o) => o.status === 'Ready');
  const cooking = ORDERS.filter((o) => o.status === 'Cooking');
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text>{ready.length} ready, {cooking.length} cooking</Text>}
        renderItem={({ item }) => <Text>#{item.id} {item.status}</Text>}
      />
    </View>
  );
}
`,
        hint: 'Filter twice, then ListHeaderComponent={<Text>{ready.length} ready, {cooking.length} cooking</Text>}.',
        checks: [
          { message: '"1 ready, 2 cooking"', screen: { text: '1 ready, 2 cooking' } },
          { message: 'Counted with filter', codeIncludes: '.filter(' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: "const ages = [12, 19, 25, 15];\n<Text>{ages.filter((a) => a >= 18).length}</Text>",
        language: 'typescript',
        options: [
          { text: '2' },
          { text: '4', why: 'Only 19 and 25 pass the test.' },
          { text: '44', why: 'It counts the items that pass, it doesn\'t add them.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Just the cooking ones.',
        language: 'typescript',
        template: "const cooking = orders.[[1]]((o) => o.status [[2]] 'Cooking');",
        blanks: [['filter'], ['===']],
        distractors: ['map', '=', 'find'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Kept by .filter((o) => o.status === \'Ready\')?',
        groups: ['Kept', 'Left out'],
        items: [
          { text: "{ id: '41', status: 'Ready' }", group: 0 },
          { text: "{ id: '42', status: 'Cooking' }", group: 1 },
          { text: "{ id: '43', status: 'ready' }", group: 1 },
          { text: "{ id: '44', status: 'Ready' }", group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which FlatList prop draws something above the first row that scrolls with the list?',
        answers: ['ListHeaderComponent'],
        placeholder: 'propName',
      },
      {
        kind: 'findBug',
        prompt: 'The top of the board shows every order, not just the ready ones. Which line is wrong?',
        language: 'typescript',
        lines: ["const ready = orders.map((o) => o.status === 'Ready');", '{ready.map((o) => (', '  <Text key={o.id}>#{o.id}</Text>', '))}'],
        bug: 0,
        fix: "const ready = orders.filter((o) => o.status === 'Ready');",
        explanation: '.map changes every item (here, into true or false). .filter keeps the ones that match.',
      },
    ],
  },
  reflect: {
    prompt: 'What two or three filters would be useful on a list in your own app? Write them as .filter lines.',
    starters: ['.filter((x) => ...)', 'It would show...'],
  },
  deepen: {
    title: 'Explore',
    summary: 'Look up React Native\'s SectionList: a list with headings ("Ready", "Cooking"). Try turning the board into two sections on your phone.',
  },
  notes: 'Array.prototype.filter, derived lists and counts; FlatList ListHeaderComponent; SectionList mentioned. Nested same-direction VirtualizedLists cause scroll issues.',
};

export default lesson;
