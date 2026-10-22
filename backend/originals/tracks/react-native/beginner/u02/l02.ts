import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Cards: StyleSheet.create, named styles, combining styles with arrays. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'StyleSheet: styles with names',
  summary: 'Theo\'s screen has the same {{ fontSize: 18, color: \'#1c1917\' }} typed on twelve lines. Arjun: "Give your styles names. Put them in one place." Meet StyleSheet.create.',
  minutes: 13,
  outcomes: ['Move inline styles into StyleSheet.create', 'Use a named style with style={styles.name}', 'Combine two styles with an array'],
  learn: [
    {
      kind: 'text',
      html: '<p>So far every style has been written inline: <code>style={{ fontSize: 18 }}</code>. That works, but the same style ends up copied everywhere. React Native\'s answer is <strong>StyleSheet.create</strong>: one object, at the bottom of the file, with a name for each style.</p><pre><code>const styles = StyleSheet.create({\n  screen: { flex: 1, padding: 24, backgroundColor: \'#fff7ed\' },\n  title: { fontSize: 34, fontWeight: \'bold\', color: \'#9a3412\' },\n  item: { fontSize: 18, color: \'#1c1917\' },\n});</code></pre><ul><li>Use a style by name: <code>&lt;Text style={styles.title}&gt;</code>.</li><li>Change <code>styles.item</code> once and every item changes.</li><li>Combine styles with an array: <code>style={[styles.item, styles.price]}</code>. If both set the same property, the <strong>last one wins</strong>.</li><li>Import <code>StyleSheet</code> from \'react-native\' like View and Text.</li></ul>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Name styles by what they ARE, not how they look: styles.price, not styles.boldOrange. When Linh changes the colour, the name still makes sense.',
    },
    {
      kind: 'tryIt',
      title: 'One StyleSheet',
      caption: 'All the styles live at the bottom. Make styles.item size 20 and watch every item change.',
      code: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pho Real</Text>
      <Text style={styles.item}>Large pho $13.50</Text>
      <Text style={styles.item}>Banh mi $9.00</Text>
      <Text style={[styles.item, styles.special]}>Spring rolls $5.50</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#fff7ed' },
  title: { fontSize: 34, fontWeight: 'bold', color: '#9a3412', marginBottom: 16 },
  item: { fontSize: 18, color: '#1c1917', marginBottom: 8 },
  special: { fontWeight: 'bold' },
});
`,
      challenge: 'Add color: \'#9a3412\' to styles.special and see that only the spring rolls change.',
    },
  ],
  apply: {
    scenario: 'Naming the styles.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does StyleSheet.create give you?',
        options: [
          { text: 'A faster phone', why: 'It organises styles; speed isn\'t the point here.' },
          { text: 'One place with a name for each style, used like style={styles.title}' },
          { text: 'A CSS file', why: 'React Native has no CSS files. StyleSheet is JavaScript.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Use the named style: give the title style={styles.title}',
        starter: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text>Pho Real</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#fff7ed' },
  title: { fontSize: 34, fontWeight: 'bold', color: '#9a3412' },
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
  screen: { flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#fff7ed' },
  title: { fontSize: 34, fontWeight: 'bold', color: '#9a3412' },
});
`,
        hint: 'Change <Text> to <Text style={styles.title}>.',
        checks: [
          { message: 'The title is size 34', screen: { style: { of: 'Pho Real', prop: 'fontSize', value: '34' } } },
          { message: 'Using styles.title', codeIncludes: 'style={styles.title}' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Create the styles.',
        language: 'typescript',
        template: 'const styles = [[1]].[[2]]({\n  item: { fontSize: 18 },\n});',
        blanks: [['StyleSheet'], ['create']],
        distractors: ['Style', 'make', 'CSS'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is the spring rolls text?',
        code: "const styles = StyleSheet.create({\n  item: { color: '#1c1917' },\n  special: { color: '#9a3412' },\n});\n<Text style={[styles.item, styles.special]}>Spring rolls</Text>",
        language: 'typescript',
        options: [
          { text: '#9a3412: the last style in the array wins' },
          { text: '#1c1917: the first style wins', why: 'In an array, later styles override earlier ones.' },
          { text: 'A mix of both', why: 'Colours don\'t mix. The last one wins.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a "price" style (fontWeight: \'bold\', color: \'#9a3412\') and use it with styles.item on the Large pho line',
        starter: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.item}>Large pho $13.50</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  item: { fontSize: 18, color: '#1c1917' },
});
`,
        solution: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={[styles.item, styles.price]}>Large pho $13.50</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  item: { fontSize: 18, color: '#1c1917' },
  price: { fontWeight: 'bold', color: '#9a3412' },
});
`,
        hint: 'Add price: { fontWeight: \'bold\', color: \'#9a3412\' } in the StyleSheet, then style={[styles.item, styles.price]}.',
        checks: [
          { message: 'The line is #9a3412', screen: { style: { of: 'Large pho', prop: 'color', value: '#9a3412' } } },
          { message: 'Still size 18 from styles.item', screen: { style: { of: 'Large pho', prop: 'fontSize', value: '18' } } },
          { message: 'Combined with an array', codeIncludes: '[styles.item, styles.price]' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good style name, or one to avoid?',
        groups: ['Good name', 'Avoid'],
        items: [
          { text: 'styles.price', group: 0 },
          { text: 'styles.boldOrange', group: 1 },
          { text: 'styles.menuItem', group: 0 },
          { text: 'styles.style2', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'arjun',
        message: 'Why name it styles.price and not styles.orangeBold?',
        options: [
          { text: 'Because orange is ugly.', why: 'Not the reason: names should say what something is.' },
          { text: 'No reason.', why: 'There is one: colours change, prices stay prices.' },
          { text: 'If Mum changes the colour to green, "price" still makes sense. "orangeBold" would be a lie.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it does.',
        pairs: [
          ['StyleSheet.create({...})', 'Makes the named styles'],
          ['style={styles.title}', 'Uses one named style'],
          ['style={[styles.a, styles.b]}', 'Combines two, the last wins'],
          ["import { StyleSheet } from 'react-native'", 'Brings StyleSheet in'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In style={[styles.item, styles.special]}, which style wins if both set color? (Type its name.)',
        answers: ['special', 'styles.special'],
        placeholder: 'Style name',
      },
      {
        kind: 'findBug',
        prompt: 'The app crashes with "StyleSheet is not defined". Which line is the problem?',
        language: 'typescript',
        lines: ["import { View, Text } from 'react-native';", '', 'const styles = StyleSheet.create({', "  title: { fontSize: 34 },", '});'],
        bug: 0,
        fix: "import { View, Text, StyleSheet } from 'react-native';",
        explanation: 'StyleSheet comes from react-native too. Add it to the import.',
      },
    ],
  },
  reflect: {
    prompt: 'If you had to name the three styles your app uses most, what would you call them, by what they are?',
    starters: ['styles....', 'styles....', 'styles....'],
  },
  deepen: {
    title: 'Go further',
    summary: 'The React Native docs page "Style" shows StyleSheet.create and style arrays, with the same "last one wins" rule.',
  },
  notes: 'StyleSheet.create; style arrays merge left to right (later overrides earlier). Naming by meaning is a common convention, not a rule.',
};

export default lesson;
