import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 19. Reading: the ready board; sorting a copy (oldest first), taking the first few with slice, and big numbers. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The ready board',
  summary: 'Linh wants the phone in a stand at the window, facing the line: ready numbers, huge, oldest first. "The person who\'s waited longest should see their number first." Read how to sort and trim a list.',
  minutes: 13,
  outcomes: ['Sort a copy of a list without changing the original', 'Sort numbers correctly with a compare function', 'Take the first few items with slice'],
  learn: [
    {
      kind: 'reading',
      title: 'Oldest first',
      html: '<p>Orders arrive in number order, but Ray finishes them in any order: a small pho is quicker than a large with extras. So the ready list can come out jumbled: #47, #43, #45. Linh wants it sorted, smallest number (oldest order) first.</p><h3>sort changes the array it\'s called on</h3><p><code>ready.sort(...)</code> rearranges <code>ready</code> itself. That\'s fine for a list you just made with filter, but never call sort directly on state: that\'s changing state in place, the push trap again. To be safe, sort a copy:</p><pre><code>const sorted = [...ready].sort((a, b) =&gt; Number(a.id) - Number(b.id));</code></pre><h3>The compare function</h3><p>sort calls your function with two items, a and b. Return a negative number to put a first, positive to put b first. <code>Number(a.id) - Number(b.id)</code> does exactly that for numbers.</p><p>Why <code>Number(...)</code>? The ids are text. Without a compare function, sort compares text letter by letter, so "100" comes before "99" (because "1" is before "9"). At the festival, the numbers will pass 100.</p><h3>Only the first few</h3><p>The window screen has room for six big numbers. <code>.slice(0, 6)</code> gives the first six (or fewer, if there are fewer):</p><pre><code>const showing = sorted.slice(0, 6);</code></pre><blockquote>filter, then sort a copy, then slice. Read it left to right: which ones, in what order, how many.</blockquote><h3>Make it readable from the line</h3><p>Numbers at fontSize 56 or more, bold, high contrast, and a short instruction: "Ready: collect at the window". No names on the public screen: a number is enough, and it\'s more private.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The window screen',
      caption: 'The ready orders arrive jumbled. The board sorts a copy, oldest first, and shows the first six. Add { id: \'100\', status: \'Ready\' } and check it goes last.',
      code: `import { View, Text, StyleSheet } from 'react-native';

const ORDERS = [
  { id: '47', status: 'Ready' },
  { id: '43', status: 'Ready' },
  { id: '48', status: 'Cooking' },
  { id: '45', status: 'Ready' },
  { id: '99', status: 'Ready' },
];

export default function App() {
  const ready = ORDERS.filter((o) => o.status === 'Ready');
  const showing = [...ready].sort((a, b) => Number(a.id) - Number(b.id)).slice(0, 6);

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Ready: collect at the window</Text>
      <View style={styles.grid}>
        {showing.map((o) => (
          <Text key={o.id} style={styles.number}>{o.id}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 16, backgroundColor: '#14532d' },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#dcfce7' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 24 },
  number: { fontSize: 64, fontWeight: 'bold', color: '#ffffff' },
});
`,
      challenge: 'Remove the compare function: .sort() on its own. Where does 100 end up now?',
    },
  ],
  apply: {
    scenario: 'Sorting the board.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Sort a copy of READY oldest first with Number(a.id) - Number(b.id), map over it, and add a line "First: #{id}" for the first one. It should say "First: #43"',
        starter: `import { View, Text } from 'react-native';

const READY = [{ id: '47' }, { id: '43' }, { id: '45' }];

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {READY.map((o) => (
        <Text key={o.id}>#{o.id}</Text>
      ))}
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

const READY = [{ id: '47' }, { id: '43' }, { id: '45' }];

export default function App() {
  const sorted = [...READY].sort((a, b) => Number(a.id) - Number(b.id));
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      <Text>First: #{sorted[0].id}</Text>
      {sorted.map((o) => (
        <Text key={o.id}>#{o.id}</Text>
      ))}
    </View>
  );
}
`,
        hint: 'const sorted = [...READY].sort((a, b) => Number(a.id) - Number(b.id)); then map over sorted. Add <Text>First: #{sorted[0].id}</Text> to check it.',
        checks: [
          { message: '"First: #43"', screen: { text: 'First: #43' } },
          { message: 'Sorts a copy', codeIncludes: '[...READY]' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why sort [...ready] instead of ready, or the orders state directly?',
        options: [
          { text: 'sort changes the array it\'s called on, and state must never be changed in place' },
          { text: 'sort only works on copies', why: 'It works on any array, by changing it. That\'s the danger.' },
          { text: 'Copies sort faster', why: 'Same speed. It\'s about not changing state.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What order does this give?',
        code: "['99', '100', '43'].sort()",
        language: 'typescript',
        options: [
          { text: "['43', '99', '100']", why: 'Without a compare function, sort compares text: "1" comes before "4" and "9".' },
          { text: "['100', '43', '99']" },
          { text: "['99', '43', '100']", why: 'It does sort, just as text.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'Should we put names on the window screen too? It\'s friendlier.',
        options: [
          { text: 'Yes, full names, big.', why: 'Everyone in the line would read them. Numbers are enough.' },
          { text: 'Only for regulars.', why: 'Same privacy problem.' },
          { text: 'I\'d keep it to numbers: the whole line can see that screen. Names stay on each person\'s own order screen.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The first six, oldest first.',
        language: 'typescript',
        template: '[...ready].sort((a, b) => Number(a.id) - Number(b.id)).[[1]](0, [[2]])',
        blanks: [['slice'], ['6']],
        distractors: ['splice', '5', 'filter'],
      },
      {
        kind: 'orderLines',
        prompt: 'Build the window list, left to right.',
        lines: ["const ready = orders.filter((o) => o.status === 'Ready');", 'const sorted = [...ready].sort((a, b) => Number(a.id) - Number(b.id));', 'const showing = sorted.slice(0, 6);', '{showing.map((o) => <Text key={o.id}>{o.id}</Text>)}'],
      },
      {
        kind: 'writeCode',
        prompt: 'Show only the first 2 numbers with slice: "#41" and "#42", but not "#43"',
        starter: `import { View, Text } from 'react-native';

const SORTED = [{ id: '41' }, { id: '42' }, { id: '43' }];

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {SORTED.map((o) => (
        <Text key={o.id}>#{o.id}</Text>
      ))}
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

const SORTED = [{ id: '41' }, { id: '42' }, { id: '43' }];

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 8 }}>
      {SORTED.slice(0, 2).map((o) => (
        <Text key={o.id}>#{o.id}</Text>
      ))}
    </View>
  );
}
`,
        hint: 'SORTED.slice(0, 2).map(...)',
        checks: [
          { message: '#42 shows', screen: { text: '#42' } },
          { message: '#43 doesn\'t', screen: { noText: '#43' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the question it answers.',
        pairs: [
          ['.filter(...)', 'Which ones?'],
          ['.sort(...)', 'In what order?'],
          ['.slice(0, 6)', 'How many?'],
          ['.map(...)', 'What does each look like?'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does Number(\'47\') - Number(\'43\') give?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'After the board sorts, the Kitchen tab\'s list is in a different order too. Which line is the problem?',
        language: 'typescript',
        lines: ['const [orders, setOrders] = useState(FIRST_ORDERS);', "const ready = orders.filter((o) => o.status === 'Ready');", 'const byAge = orders.sort((a, b) => Number(a.id) - Number(b.id));', 'const showing = byAge.slice(0, 6);'],
        bug: 2,
        fix: 'const byAge = [...orders].sort((a, b) => Number(a.id) - Number(b.id));',
        explanation: 'orders.sort rearranges the state array itself, so every screen that uses it changes. Sort a copy.',
      },
    ],
  },
  reflect: {
    prompt: 'What order should the list in your own app be in, and why? Oldest, newest, closest, cheapest?',
    starters: ['Sorted by...', 'Because...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Put the window screen on your phone, prop it up and walk to the far side of the room. Can you read every number? Find the smallest fontSize that still works.',
  },
  notes: 'Array.prototype.sort mutates and compares as strings by default ("100" < "99"); copy with spread first (or toSorted in newer engines). slice(0, n). Public displays: numbers only for privacy.',
};

export default lesson;
