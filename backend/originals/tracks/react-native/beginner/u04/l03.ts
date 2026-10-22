import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Steps: FlatList (data, renderItem, keyExtractor, separators and empty lists). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Forty orders and counting',
  summary: 'Theo adds forty test orders and the screen runs off the bottom of the phone. He could wrap it in a ScrollView, but Arjun says the festival will have four hundred. Meet FlatList.',
  minutes: 13,
  outcomes: ['Show a long list with FlatList', 'Use data, renderItem and keyExtractor', 'Show a message when the list is empty'],
  learn: [
    {
      kind: 'steps',
      title: 'Building the order list',
      steps: [
        {
          title: '1. Why not .map inside a ScrollView?',
          body: 'It works for twenty items. For four hundred, the phone draws every row at once, even the ones far off screen. FlatList only draws what\'s near the screen, so long lists stay smooth.',
        },
        {
          title: '2. Give it the data',
          body: 'FlatList comes from \'react-native\'. data is your array.',
          code: "import { FlatList } from 'react-native';\n\n<FlatList data={orders} />",
          language: 'typescript',
        },
        {
          title: '3. Say how to draw one item',
          body: 'renderItem is a function. FlatList calls it for each item, passing { item }. Return the row.',
          code: 'renderItem={({ item }) => <Text>#{item.id} {item.name}</Text>}',
          language: 'typescript',
        },
        {
          title: '4. Say which item is which',
          body: 'keyExtractor returns a unique string for each item, like the key in .map. The order id is perfect.',
          code: 'keyExtractor={(item) => item.id}',
          language: 'typescript',
        },
        {
          title: '5. Plan for zero',
          body: 'At 10 a.m. there are no orders yet. ListEmptyComponent shows instead of a blank screen.',
          code: 'ListEmptyComponent={<Text>No orders yet</Text>}',
          language: 'typescript',
        },
        {
          title: '6. All together',
          body: 'FlatList scrolls by itself, so don\'t put it inside a ScrollView.',
          code: '<FlatList\n  data={orders}\n  keyExtractor={(item) => item.id}\n  renderItem={({ item }) => <Text>#{item.id} {item.name}</Text>}\n  ListEmptyComponent={<Text>No orders yet</Text>}\n/>',
          language: 'typescript',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Thirty orders in a FlatList',
      caption: 'The list makes thirty test orders. Scroll it inside the phone. Then change 30 to 0 and see the empty message.',
      code: `import { View, Text, FlatList, StyleSheet } from 'react-native';

const NAMES = ['Dana', 'Sam', 'Priya', 'Jo', 'Alex', 'Kim'];
const ORDERS = Array.from({ length: 30 }, (_, i) => ({ id: String(41 + i), name: NAMES[i % NAMES.length] }));

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Orders</Text>
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.row}>#{item.id} {item.name}</Text>}
        ListEmptyComponent={<Text style={styles.empty}>No orders yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#fff7ed' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#9a3412', marginBottom: 12 },
  row: { fontSize: 20, paddingVertical: 10, color: '#1c1917' },
  empty: { fontSize: 18, color: '#78716c' },
});
`,
      challenge: 'Add ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: \'#fed7aa\' }} />} for a line between rows.',
    },
  ],
  apply: {
    scenario: 'A list that can hold the festival.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Build the FlatList, step by step.',
        lines: ["import { FlatList } from 'react-native';", '<FlatList', '  data={orders}', '  keyExtractor={(item) => item.id}', '  renderItem={({ item }) => <Text>{item.name}</Text>}', '/>'],
      },
      {
        kind: 'writeCode',
        prompt: 'Show ORDERS with a FlatList: each row "#{id} {name}", keyExtractor using the id',
        starter: `import { View, Text, FlatList } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana' },
  { id: '42', name: 'Sam' },
  { id: '43', name: 'Priya' },
];

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>

    </View>
  );
}
`,
        solution: `import { View, Text, FlatList } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana' },
  { id: '42', name: 'Sam' },
  { id: '43', name: 'Priya' },
];

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>#{item.id} {item.name}</Text>}
      />
    </View>
  );
}
`,
        hint: '<FlatList data={ORDERS} keyExtractor={(item) => item.id} renderItem={({ item }) => <Text>#{item.id} {item.name}</Text>} />',
        checks: [
          { message: '#41 Dana', screen: { text: '#41 Dana' } },
          { message: '#43 Priya', screen: { text: '#43 Priya' } },
          { message: 'A FlatList', codeIncludes: '<FlatList' },
          { message: 'Keys from the id', codeIncludes: 'keyExtractor' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why use FlatList instead of .map in a ScrollView for the festival?',
        options: [
          { text: 'FlatList has nicer colours', why: 'It has no colours of its own. It\'s about long lists.' },
          { text: 'FlatList only draws the rows near the screen, so hundreds of orders stay smooth' },
          { text: '.map is banned in React Native', why: '.map is fine for short lists.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each FlatList prop to its job.',
        pairs: [
          ['data', 'The array to show'],
          ['renderItem', 'How to draw one item'],
          ['keyExtractor', 'A unique key for each item'],
          ['ListEmptyComponent', 'What to show when there are none'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'The list is empty at opening time. Add ListEmptyComponent showing "No orders yet"',
        starter: `import { View, Text, FlatList } from 'react-native';

const ORDERS: { id: string; name: string }[] = [];

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>#{item.id} {item.name}</Text>}
      />
    </View>
  );
}
`,
        solution: `import { View, Text, FlatList } from 'react-native';

const ORDERS: { id: string; name: string }[] = [];

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>#{item.id} {item.name}</Text>}
        ListEmptyComponent={<Text>No orders yet</Text>}
      />
    </View>
  );
}
`,
        hint: 'Add ListEmptyComponent={<Text>No orders yet</Text>} to the FlatList.',
        checks: [{ message: '"No orders yet" shows', screen: { text: 'No orders yet' } }],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'I put your FlatList inside a ScrollView so it scrolls better.',
        options: [
          { text: 'Nice, keep it.', why: 'It causes the warning and undoes FlatList\'s speed-up.' },
          { text: 'FlatList scrolls by itself. Inside a ScrollView it loses its trick and the phone warns about it. Take it out.' },
          { text: 'Put the ScrollView inside the FlatList instead.', why: 'Neither: FlatList already scrolls.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Draw one item.',
        language: 'typescript',
        template: 'renderItem={({ [[1]] }) => <Text>{item.[[2]]}</Text>}',
        blanks: [['item'], ['name']],
        distractors: ['order', 'data', 'key'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'data is []. What shows?',
        code: "<FlatList\n  data={[]}\n  renderItem={({ item }) => <Text>{item.name}</Text>}\n  ListEmptyComponent={<Text>No orders yet</Text>}\n/>",
        language: 'typescript',
        options: [
          { text: '"No orders yet"' },
          { text: 'A blank screen', why: 'ListEmptyComponent fills the gap.' },
          { text: 'An error', why: 'An empty array is fine.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which component from \'react-native\' draws long lists efficiently?',
        answers: ['FlatList', '<FlatList>', '<FlatList />'],
        placeholder: 'Component',
      },
      {
        kind: 'findBug',
        prompt: 'Every row is blank, though orders has three names. Which line is the problem?',
        language: 'typescript',
        lines: ['<FlatList', '  data={orders}', '  keyExtractor={(item) => item.id}', '  renderItem={(item) => <Text>{item.name}</Text>}', '/>'],
        bug: 3,
        fix: '  renderItem={({ item }) => <Text>{item.name}</Text>}',
        explanation: 'renderItem gets an object with the item inside it, not the item itself. Unpack it with ({ item }).',
      },
    ],
  },
  reflect: {
    prompt: 'What should your own app\'s list say when it\'s empty? Write a friendly empty message.',
    starters: ['When there\'s nothing yet, it says...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Make 400 test orders with Array.from and show them in a FlatList on your phone. Then try the same with .map in a ScrollView and feel the difference when it opens.',
  },
  notes: 'FlatList (React Native docs: FlatList; "Optimizing FlatList Configuration"). VirtualizedLists inside plain ScrollViews trigger a warning.',
};

export default lesson;
