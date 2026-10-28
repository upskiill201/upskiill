import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 17. Tap to explore: Mai's notes on what people type to find their order; a search box that filters the list. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Find my order',
  summary: 'Mai stood by the board for an hour and wrote down exactly what people typed when Theo added a search box. Tap through her notes, then build a search that handles all of it.',
  minutes: 13,
  outcomes: ['Filter a list by what someone types', 'Match names without caring about capitals or spaces', 'Match numbers with or without the #'],
  learn: [
    {
      kind: 'explore',
      title: 'Mai\'s notebook: what people typed',
      text: 'SEARCH TEST, Wednesday, 7 to 8 p.m. 23 searches. What people typed: "43" (most common). "dana". "DANA". "Dana " with a space at the end. "#43", with the hash. "pri", only the start of a name. One man typed "large pho" (no results, he looked sad). Nobody typed the full "Order #43". Two people searched before typing anything and saw every order, which was fine. My verdict: ignore capitals, ignore spaces, ignore the #, and match part of a name. Show "No order matches" instead of a blank screen.',
      hotspots: [
        { phrase: '"43" (most common)', note: 'Matching numbers: o.id.includes(query). "43" is inside "43".' },
        { phrase: '"DANA"', note: 'Lower-case both sides before comparing: o.name.toLowerCase().includes(q.toLowerCase()).' },
        { phrase: '"Dana " with a space at the end', note: 'query.trim() removes the space, like the name box in Chapter 3.' },
        { phrase: '"#43", with the hash', note: 'query.replace(\'#\', \'\') drops the hash before matching.' },
        { phrase: '"pri", only the start of a name', note: '.includes matches part of the text, so "pri" finds Priya.' },
        { phrase: 'Two people searched before typing anything and saw every order', note: 'An empty query should show everything. Every string includes the empty string, so .includes(\'\') is always true and this happens for free.' },
        { phrase: 'Show "No order matches" instead of a blank screen', note: 'ListEmptyComponent again.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Search the board',
      caption: 'Try every search from Mai\'s notebook: 43, DANA, "Dana " with a space, #43, pri, large pho.',
      code: `import { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana', status: 'Ready' },
  { id: '42', name: 'Sam', status: 'Cooking' },
  { id: '43', name: 'Priya', status: 'Cooking' },
  { id: '44', name: 'Jo', status: 'Ready' },
];

export default function App() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase().replace('#', '');
  const results = ORDERS.filter((o) => o.id.includes(q) || o.name.toLowerCase().includes(q));

  return (
    <View style={styles.screen}>
      <TextInput style={styles.input} placeholder="Your name or number" value={query} onChangeText={setQuery} />
      <FlatList
        data={results}
        keyExtractor={(o) => o.id}
        renderItem={({ item }) => <Text style={styles.row}>#{item.id} {item.name}: {item.status}</Text>}
        ListEmptyComponent={<Text style={styles.empty}>No order matches</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12, backgroundColor: '#fff7ed' },
  input: { borderWidth: 2, borderColor: '#fed7aa', borderRadius: 12, padding: 14, fontSize: 18, backgroundColor: '#ffffff' },
  row: { fontSize: 20, paddingVertical: 8 },
  empty: { fontSize: 18, color: '#78716c' },
});
`,
      challenge: 'Type "4". Why do all four orders match? Would you want that?',
    },
  ],
  apply: {
    scenario: 'Finding one order fast.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add a search box ("Your name or number") that filters by name, ignoring capitals. Typing "DANA" shows "#41 Dana" and hides Sam',
        starter: `import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana' },
  { id: '42', name: 'Sam' },
];

export default function App() {
  const [query, setQuery] = useState('');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {ORDERS.map((o) => (
        <Text key={o.id}>#{o.id} {o.name}</Text>
      ))}
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana' },
  { id: '42', name: 'Sam' },
];

export default function App() {
  const [query, setQuery] = useState('');
  const results = ORDERS.filter((o) => o.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      <TextInput placeholder="Your name or number" value={query} onChangeText={setQuery} />
      {results.map((o) => (
        <Text key={o.id}>#{o.id} {o.name}</Text>
      ))}
    </View>
  );
}
`,
        hint: 'A TextInput for query, then const results = ORDERS.filter((o) => o.name.toLowerCase().includes(query.toLowerCase())) and map over results.',
        checks: [
          { message: '"DANA" finds Dana', screen: { fill: [{ field: 'Your name or number', text: 'DANA' }], text: '#41 Dana' } },
          { message: 'And hides Sam', screen: { fill: [{ field: 'Your name or number', text: 'DANA' }], noText: '#42 Sam' } },
          { message: 'Empty search shows everyone', screen: { text: '#42 Sam' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why lower-case both the name and the search before comparing?',
        options: [
          { text: 'Lower case is faster', why: 'Speed isn\'t it. "DANA" and "Dana" just aren\'t equal otherwise.' },
          { text: 'Names must be stored in lower case', why: 'Names stay as typed. You only compare lower-case copies.' },
          { text: 'So "DANA", "dana" and "Dana" all match' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Mai\'s note to the fix.',
        pairs: [
          ['"DANA"', '.toLowerCase()'],
          ['"Dana " with a space', '.trim()'],
          ['"#43"', ".replace('#', '')"],
          ['"pri"', '.includes(...)'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'The man who typed "large pho" saw a blank screen and looked so sad.',
        options: [
          { text: 'I\'ll show "No order matches. Try your name or number." so he knows what to type.' },
          { text: 'He should know his number.', why: 'Most people forget. Guide them.' },
          { text: 'I\'ll make it search every word in every order.', why: 'Big change for one search. A helpful empty message fixes it.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this give?',
        code: "'  #43 '.trim().replace('#', '')",
        language: 'typescript',
        options: [
          { text: "'#43'", why: 'replace removed the #.' },
          { text: "'43'" },
          { text: "' 43 '", why: 'trim removed the spaces first.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Match numbers too, ignoring the #: typing "#42" shows "#42 Sam"',
        starter: `import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana' },
  { id: '42', name: 'Sam' },
];

export default function App() {
  const [query, setQuery] = useState('');
  const results = ORDERS.filter((o) => o.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      <TextInput placeholder="Search" value={query} onChangeText={setQuery} />
      {results.map((o) => (
        <Text key={o.id}>#{o.id} {o.name}</Text>
      ))}
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const ORDERS = [
  { id: '41', name: 'Dana' },
  { id: '42', name: 'Sam' },
];

export default function App() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase().replace('#', '');
  const results = ORDERS.filter((o) => o.id.includes(q) || o.name.toLowerCase().includes(q));

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      <TextInput placeholder="Search" value={query} onChangeText={setQuery} />
      {results.map((o) => (
        <Text key={o.id}>#{o.id} {o.name}</Text>
      ))}
    </View>
  );
}
`,
        hint: "const q = query.trim().toLowerCase().replace('#', ''); then filter with o.id.includes(q) || o.name.toLowerCase().includes(q).",
        checks: [
          { message: '"#42" finds Sam', screen: { fill: [{ field: 'Search', text: '#42' }], text: '#42 Sam' } },
          { message: 'And hides Dana', screen: { fill: [{ field: 'Search', text: '#42' }], noText: '#41 Dana' } },
          { message: 'Names still work', screen: { fill: [{ field: 'Search', text: 'dana' }], text: '#41 Dana' } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Match part of a name.',
        language: 'typescript',
        template: 'o.name.[[1]]().[[2]](q)',
        blanks: [['toLowerCase'], ['includes']],
        distractors: ['trim', 'equals', 'find'],
      },
      {
        kind: 'sortGroups',
        prompt: 'With the final search, does it find Priya (#43)?',
        groups: ['Finds Priya', 'Doesn\'t'],
        items: [
          { text: 'pri', group: 0 },
          { text: '#43', group: 0 },
          { text: 'large pho', group: 1 },
          { text: 'PRIYA ', group: 0 },
          { text: 'Sam', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which string method checks whether one text appears inside another?',
        answers: ['includes', '.includes', '.includes()', 'includes()'],
        placeholder: 'method',
      },
      {
        kind: 'findBug',
        prompt: 'Searching "dana" finds nothing, though Dana has an order. Which line is wrong?',
        language: 'typescript',
        lines: ["const q = query.trim().toLowerCase();", 'const results = orders.filter(', '  (o) => o.name.includes(q)', ');'],
        bug: 2,
        fix: '  (o) => o.name.toLowerCase().includes(q)',
        explanation: 'The query was lower-cased but the name wasn\'t. "Dana" doesn\'t include "dana". Lower-case both.',
      },
    ],
  },
  reflect: {
    prompt: 'Watch someone search for something in your app (or any app). Write down exactly what they type. What would your search need to handle?',
    starters: ['They typed...', 'My search needs to...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'On a phone, the keyboard may add a capital letter or a space by itself. Type into your search box on a real phone and check autoCorrect and autoCapitalize="none" make it behave.',
  },
  notes: 'Client-side search with String.prototype.includes, toLowerCase, trim, replace. Every string includes "" (empty query shows all).',
};

export default lesson;
