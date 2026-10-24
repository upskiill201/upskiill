import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 13. Story with a choice: one main button (visual hierarchy, primary vs secondary). */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'One button to find',
  summary: 'Mai adds three new buttons, Call us, Directions and Share, all in bright rust, next to Order ahead. At a glance nobody can find the one that matters. What should Theo do?',
  minutes: 12,
  outcomes: ['Give a screen one main action', 'Style a secondary button so it stays quiet', 'Make the main button big and easy to hit'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 9 p.m.',
      beats: [
        { speaker: 'mai', text: 'I added Call us, Directions and Share. All rust. Very on brand.' },
        { speaker: 'narrator', text: 'Theo hands the phone to Ray. "Order a large pho." Ray stares at four identical rust buttons for six seconds, then says "Order 52" and walks away.' },
        { speaker: 'theo', text: 'Six seconds. That\'s forever in a line.' },
        { speaker: 'tey', text: 'Four loud buttons means none of them is loud. What should Theo do?' },
      ],
      choice: {
        prompt: 'What should Theo do?',
        options: [
          { text: 'Delete every button except Order ahead.', outcome: 'The order button is easy to find now, but people do need directions to the truck at the market. Removing them helps the line and hurts the people still looking for it.' },
          { text: 'Make Order ahead bigger still and leave the other three as they are.', outcome: 'Four rust buttons, one slightly bigger. Better, but the eye still bounces between them. Size alone doesn\'t make a hierarchy.' },
          { text: 'Keep one rust button, Order ahead. Make the others quiet: outlined, smaller, lower down.', outcome: 'Yes. Ray tries again: he taps Order ahead in under a second. The other buttons are still there for people who need them.', best: true },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Main and quiet',
      caption: 'One solid button and one outlined button. Make "Directions" solid rust too and see how they compete.',
      code: `import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Pressable style={styles.primary} onPress={() => Alert.alert('Coming in v0.3')}>
        <Text style={styles.primaryText}>Order ahead</Text>
      </Pressable>
      <Pressable style={styles.secondary} onPress={() => Alert.alert('East 6th Street, by the river')}>
        <Text style={styles.secondaryText}>Directions</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12, backgroundColor: '#fff7ed' },
  primary: { backgroundColor: '#9a3412', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  primaryText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  secondary: { borderWidth: 2, borderColor: '#9a3412', paddingVertical: 12, borderRadius: 16, alignItems: 'center' },
  secondaryText: { color: '#9a3412', fontSize: 16, fontWeight: 'bold' },
});
`,
      challenge: 'Add a third, quiet button: "Share".',
    },
  ],
  apply: {
    scenario: 'One button to find.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why couldn\'t Ray find the order button?',
        options: [
          { text: 'Four buttons looked exactly the same, so nothing said "this one"' },
          { text: 'He doesn\'t like apps', why: 'He found it in a second once it stood out.' },
          { text: 'The buttons were too big', why: 'Size wasn\'t the problem: sameness was.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make "Directions" a quiet, outlined button: borderWidth 2 and no backgroundColor',
        starter: `import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Pressable style={styles.primary}><Text style={styles.primaryText}>Order ahead</Text></Pressable>
      <Pressable style={styles.secondary}><Text style={styles.secondaryText}>Directions</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12 },
  primary: { backgroundColor: '#9a3412', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  primaryText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  secondary: { backgroundColor: '#9a3412', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  secondaryText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
});
`,
        solution: `import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Pressable style={styles.primary}><Text style={styles.primaryText}>Order ahead</Text></Pressable>
      <Pressable style={styles.secondary}><Text style={styles.secondaryText}>Directions</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12 },
  primary: { backgroundColor: '#9a3412', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  primaryText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  secondary: { borderWidth: 2, borderColor: '#9a3412', paddingVertical: 12, borderRadius: 16, alignItems: 'center' },
  secondaryText: { color: '#9a3412', fontSize: 16, fontWeight: 'bold' },
});
`,
        hint: 'In styles.secondary, remove backgroundColor and add borderWidth: 2, borderColor: \'#9a3412\'. Make secondaryText rust.',
        checks: [
          { message: 'Directions has an outline', screen: { style: { of: 'Directions', prop: 'borderWidth', value: '2' } } },
          { message: 'Directions text is rust, not white', screen: { style: { of: 'Directions', prop: 'color', value: '#9a3412' } } },
          { message: 'Order ahead is still solid rust', screen: { style: { of: 'Order ahead', prop: 'backgroundColor', value: '#9a3412' } } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Main action or quiet action on Pho Real\'s home screen?',
        groups: ['Main (solid)', 'Quiet (outlined)'],
        items: [
          { text: 'Order ahead', group: 0 },
          { text: 'Directions', group: 1 },
          { text: 'Share', group: 1 },
          { text: 'Call us', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'But Share is important! Make it rust too.',
        options: [
          { text: 'Fine, everything rust.', why: 'Then Ray takes six seconds again.' },
          { text: 'Delete Share then.', why: 'People do share. It just isn\'t the main thing.' },
          { text: 'Share stays, quieter. If two buttons shout, customers can\'t tell which one matters.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'An outlined button.',
        language: 'typescript',
        template: "secondary: { [[1]]: 2, [[2]]: '#9a3412', borderRadius: 16 },",
        blanks: [['borderWidth'], ['borderColor']],
        distractors: ['outline', 'border', 'strokeColor'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the style choice to the message it sends.',
        pairs: [
          ['Solid brand colour', 'This is the main thing to do'],
          ['Outline only', 'Also here, if you need it'],
          ['Bigger and higher up', 'Look here first'],
          ['Same everywhere', 'Nothing stands out'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many seconds did Ray stare at the four buttons?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which button does the eye find first?',
        code: "primary: { backgroundColor: '#9a3412', paddingVertical: 18 }\nsecondary: { borderWidth: 2, paddingVertical: 12 }",
        language: 'typescript',
        options: [
          { text: 'The secondary', why: 'Outlines are quieter than solid colour.' },
          { text: 'The primary: solid colour and bigger' },
          { text: 'Neither stands out', why: 'Solid and bigger wins.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a third quiet button "Share" using styles.secondary and styles.secondaryText',
        starter: `import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Pressable style={styles.primary}><Text style={styles.primaryText}>Order ahead</Text></Pressable>
      <Pressable style={styles.secondary}><Text style={styles.secondaryText}>Directions</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12 },
  primary: { backgroundColor: '#9a3412', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  primaryText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  secondary: { borderWidth: 2, borderColor: '#9a3412', paddingVertical: 12, borderRadius: 16, alignItems: 'center' },
  secondaryText: { color: '#9a3412', fontSize: 16, fontWeight: 'bold' },
});
`,
        solution: `import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Pressable style={styles.primary}><Text style={styles.primaryText}>Order ahead</Text></Pressable>
      <Pressable style={styles.secondary}><Text style={styles.secondaryText}>Directions</Text></Pressable>
      <Pressable style={styles.secondary}><Text style={styles.secondaryText}>Share</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12 },
  primary: { backgroundColor: '#9a3412', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  primaryText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  secondary: { borderWidth: 2, borderColor: '#9a3412', paddingVertical: 12, borderRadius: 16, alignItems: 'center' },
  secondaryText: { color: '#9a3412', fontSize: 16, fontWeight: 'bold' },
});
`,
        hint: 'Copy the Directions Pressable and change the text to Share.',
        checks: [
          { message: 'There\'s a Share button', screen: { button: 'Share' } },
          { message: 'Share is outlined', screen: { style: { of: 'Share', prop: 'borderWidth', value: '2' } } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which style makes the screen lose its one main button?',
        language: 'typescript',
        lines: ["primary: { backgroundColor: '#9a3412' },", "secondary: { backgroundColor: '#9a3412' },", "secondaryText: { color: '#9a3412' },"],
        bug: 1,
        fix: "secondary: { borderWidth: 2, borderColor: '#9a3412' },",
        explanation: 'If the secondary button is solid rust too, both shout. Make it outlined.',
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the ONE main action on a screen of an app you\'d build? What are the quiet ones?',
    starters: ['Main:...', 'Quiet:...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'Look up "visual hierarchy" in any design guide (Apple\'s Human Interface Guidelines or Google\'s Material Design both cover buttons). Notice how they style primary vs secondary actions.',
  },
  notes: 'Primary/secondary button hierarchy is standard UI guidance (Material: filled vs outlined buttons; Apple HIG prominent vs bordered styles).',
};

export default lesson;
