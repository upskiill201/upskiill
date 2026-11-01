import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Reading: the truck's colours as a palette (COLORS object), roles, contrast, not colour alone. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The truck\'s colours',
  summary: 'Linh brings a paint chip from the truck\'s last respray: "Rust 9A3412". That one chip becomes the app\'s whole colour system. Read how real apps pick and name their colours.',
  minutes: 13,
  outcomes: ['Keep an app\'s colours in one COLORS object', 'Give each colour a job: background, text, accent', 'Never use colour as the only signal'],
  learn: [
    {
      kind: 'reading',
      title: 'Five colours, each with a job',
      html: '<p>Linh\'s paint chip says <strong>Rust #9A3412</strong>. The truck\'s awning is cream, the lettering nearly black. Theo turns them into a <strong>palette</strong>: a small set of colours, each with one job.</p><pre><code>const COLORS = {\n  rust: \'#9a3412\',    // brand: titles, prices, the main button\n  cream: \'#fff7ed\',   // the screen background\n  card: \'#ffffff\',    // cards on top of the background\n  ink: \'#1c1917\',     // body text\n  muted: \'#78716c\',   // small print\n};</code></pre><h3>Why one object?</h3><p>Every screen uses <code>COLORS.rust</code> instead of typing <code>\'#9a3412\'</code>. When Linh repaints the truck in two years, Theo changes one line and the whole app follows. Teams call this a <strong>theme</strong>.</p><h3>Give every colour a job</h3><p>The brand colour is for the few things that matter most: the title, the prices, the one main button. If everything is rust, nothing stands out. Most of the screen should be calm: cream background, white cards, dark ink.</p><h3>Contrast, again</h3><p>Rust on cream and ink on white pass the contrast guideline from Chapter 1 (at least 4.5 to 1 for normal text). The muted grey is only for small print that doesn\'t matter much, and it still needs to be readable.</p><blockquote>Never let colour be the only signal. "Sold out" in red means nothing to someone who can\'t see red: write the words too.</blockquote><p>About 1 in 12 men and 1 in 200 women have some form of colour blindness, so a red-only or green-only message can be invisible to many of Pho Real\'s customers.</p>',
    },
    {
      kind: 'tryIt',
      title: 'One palette, every screen',
      caption: 'Every colour comes from COLORS. Change COLORS.rust to a deep green \'#166534\' and watch the whole app repaint.',
      code: `import { View, Text, StyleSheet } from 'react-native';

const COLORS = { rust: '#9a3412', cream: '#fff7ed', card: '#ffffff', ink: '#1c1917', muted: '#78716c' };

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pho Real</Text>
      <View style={styles.card}>
        <Text style={styles.name}>Large pho</Text>
        <Text style={styles.price}>$13.50</Text>
      </View>
      <Text style={styles.small}>Extra lime always free</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: COLORS.cream },
  title: { fontSize: 34, fontWeight: 'bold', color: COLORS.rust, marginBottom: 16 },
  card: { flexDirection: 'row', padding: 16, borderRadius: 12, backgroundColor: COLORS.card },
  name: { flex: 1, fontSize: 18, color: COLORS.ink },
  price: { fontSize: 18, fontWeight: 'bold', color: COLORS.rust },
  small: { fontSize: 14, color: COLORS.muted, marginTop: 16 },
});
`,
      challenge: 'Put COLORS.rust back. Then try making everything rust, and notice how nothing stands out any more.',
    },
  ],
  apply: {
    scenario: 'Pho Real\'s palette.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each colour to its job.',
        pairs: [
          ['COLORS.rust', 'Titles, prices, the main button'],
          ['COLORS.cream', 'The screen background'],
          ['COLORS.ink', 'Body text'],
          ['COLORS.muted', 'Small print'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Use the palette: make the price COLORS.rust and the screen background COLORS.cream',
        starter: `import { View, Text, StyleSheet } from 'react-native';

const COLORS = { rust: '#9a3412', cream: '#fff7ed', ink: '#1c1917' };

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.price}>Large pho $13.50</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  price: { fontSize: 18, fontWeight: 'bold' },
});
`,
        solution: `import { View, Text, StyleSheet } from 'react-native';

const COLORS = { rust: '#9a3412', cream: '#fff7ed', ink: '#1c1917' };

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.price}>Large pho $13.50</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: COLORS.cream },
  price: { fontSize: 18, fontWeight: 'bold', color: COLORS.rust },
});
`,
        hint: 'styles.screen gets backgroundColor: COLORS.cream; styles.price gets color: COLORS.rust.',
        checks: [
          { message: 'The price is rust', screen: { style: { of: 'Large pho', prop: 'color', value: '#9a3412' } } },
          { message: 'The background is cream', screen: { style: { of: 'Large pho', prop: 'backgroundColor', value: '#fff7ed' } } },
          { message: 'Colours come from COLORS', codeIncludes: 'COLORS.rust' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why keep the colours in one COLORS object?',
        options: [
          { text: 'JavaScript requires it', why: 'It doesn\'t. It\'s a habit that makes change easy.' },
          { text: 'It makes the app faster', why: 'Speed isn\'t the point. Changing colours in one place is.' },
          { text: 'Change a colour once and the whole app follows' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'Make EVERYTHING rust. It\'s our colour!',
        options: [
          { text: 'If everything\'s rust, nothing stands out. Rust is for the few things people must see: prices and the order button.' },
          { text: 'Sure, why not.', why: 'Then the prices and button disappear into everything else.' },
          { text: 'Rust is ugly.', why: 'Not the point, and Linh would disagree loudly.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good use of the brand colour, or too much?',
        groups: ['Good', 'Too much'],
        items: [
          { text: 'The main "Order ahead" button', group: 0 },
          { text: 'Every word on the screen', group: 1 },
          { text: 'The prices', group: 0 },
          { text: 'The whole background', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Spring rolls are sold out. How should the menu show it?',
        options: [
          { text: 'Turn the name red', why: 'Colour alone: many people can\'t tell red from other colours.' },
          { text: 'Write "Sold out" next to it (and grey it if you like)' },
          { text: 'Make it smaller', why: 'Size alone isn\'t a clear signal. Say it in words.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Use the palette in a style.',
        language: 'typescript',
        template: 'title: { color: [[1]].[[2]] },',
        blanks: [['COLORS'], ['rust']],
        distractors: ["'rust'", 'colors', 'orange'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the hex code on Linh\'s paint chip? (Like #000000.)',
        answers: ['#9A3412', '#9a3412', '9A3412', '9a3412'],
        placeholder: '#000000',
      },
      {
        kind: 'writeCode',
        prompt: 'Add a small-print line "Extra lime always free" using COLORS.muted and size 14',
        starter: `import { View, Text, StyleSheet } from 'react-native';

const COLORS = { rust: '#9a3412', ink: '#1c1917', muted: '#78716c' };

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pho Real</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  title: { fontSize: 34, fontWeight: 'bold', color: COLORS.rust },
});
`,
        solution: `import { View, Text, StyleSheet } from 'react-native';

const COLORS = { rust: '#9a3412', ink: '#1c1917', muted: '#78716c' };

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pho Real</Text>
      <Text style={styles.small}>Extra lime always free</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  title: { fontSize: 34, fontWeight: 'bold', color: COLORS.rust },
  small: { fontSize: 14, color: COLORS.muted },
});
`,
        hint: 'Add small: { fontSize: 14, color: COLORS.muted } and a <Text style={styles.small}>.',
        checks: [
          { message: 'The note is muted grey', screen: { style: { of: 'Extra lime', prop: 'color', value: '#78716c' } } },
          { message: 'Size 14', screen: { style: { of: 'Extra lime', prop: 'fontSize', value: '14' } } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'About how many men have some form of colour blindness?',
        options: [
          { text: 'About 1 in 12' },
          { text: 'About 1 in 1,000', why: 'Far more common than that: about 1 in 12 men.' },
          { text: 'Almost none', why: 'It\'s common: about 1 in 12 men and 1 in 200 women.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Pick a palette for an app you\'d build: a brand colour, a background, text and small print. Write them as a COLORS object.',
    starters: ['const COLORS = {...}'],
  },
  deepen: {
    title: 'Try it',
    summary: 'Run Pho Real\'s rust on cream through a contrast checker (search "WebAIM contrast checker"). Then try the muted grey on cream.',
  },
  notes: 'Colour vision deficiency prevalence: ~8% of men (1 in 12) and ~0.5% of women (1 in 200) of Northern European descent (NHS / Colour Blind Awareness). WCAG 1.4.1: use of colour must not be the only visual means of conveying information. Rust #9a3412 on cream #fff7ed contrast ≈ 7:1 (passes AA).',
};

export default lesson;
