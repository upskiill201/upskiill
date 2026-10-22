import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 14. Chat with Tey: every phone is different (ScrollView, SafeAreaView, useWindowDimensions). */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Every phone is different',
  summary: 'Linh\'s phone is five years old and small. On it, the menu runs off the bottom with no way to reach the iced coffee, and the title hides under the camera notch. Tey on scrolling and safe areas.',
  minutes: 12,
  outcomes: ['Let a long screen scroll with ScrollView', 'Keep content clear of notches with SafeAreaView', 'Adapt to the screen size with useWindowDimensions'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Theo tested on his own big phone. Linh\'s is small. What happens to a menu taller than the screen?', replies: ['It scrolls?', 'It gets cut off?'] },
        { tey: 'Cut off. A View never scrolls. Wrap the long part in a ScrollView instead, and people can swipe to the bottom. Same children, new wrapper.', replies: ['Why does the title hide?'] },
        { tey: 'The notch and the status bar. SafeAreaView keeps its children inside the safe part of the screen on every phone. (Big projects use the react-native-safe-area-context package; same idea.)', replies: ['And tiny screens?'] },
        { tey: 'useWindowDimensions() tells you the screen\'s width and height, live. const { width } = useWindowDimensions(); then make the photo smaller when width is small.', replies: ['So test on small phones'] },
        { tey: 'Always. Test on the smallest, oldest phone you can borrow. Linh\'s phone is now Theo\'s favourite test device.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A menu that scrolls',
      caption: 'Eight dishes won\'t fit on a small phone. The ScrollView lets you swipe. Try changing ScrollView back to View and scroll: you can\'t.',
      code: `import { ScrollView, View, Text, StyleSheet } from 'react-native';

const DISHES = ['Small pho $11.50', 'Large pho $13.50', 'Banh mi $9.00', 'Spring rolls (2) $5.50', 'Iced coffee $4.75', 'Lemonade $3.50', 'Rice bowl $10.00', 'Che dessert $4.00'];

export default function App() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Pho Real</Text>
      <View style={styles.card}><Text style={styles.item}>{DISHES[0]}</Text></View>
      <View style={styles.card}><Text style={styles.item}>{DISHES[1]}</Text></View>
      <View style={styles.card}><Text style={styles.item}>{DISHES[2]}</Text></View>
      <View style={styles.card}><Text style={styles.item}>{DISHES[3]}</Text></View>
      <View style={styles.card}><Text style={styles.item}>{DISHES[4]}</Text></View>
      <View style={styles.card}><Text style={styles.item}>{DISHES[5]}</Text></View>
      <View style={styles.card}><Text style={styles.item}>{DISHES[6]}</Text></View>
      <View style={styles.card}><Text style={styles.item}>{DISHES[7]}</Text></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff7ed' },
  content: { padding: 24, paddingTop: 64, gap: 12 },
  title: { fontSize: 34, fontWeight: 'bold', color: '#9a3412', marginBottom: 8 },
  card: { padding: 24, backgroundColor: '#ffffff', borderRadius: 16 },
  item: { fontSize: 18 },
});
`,
      challenge: 'Notice the padding is on contentContainerStyle, not style. Move it to style and see the difference at the bottom.',
    },
  ],
  apply: {
    scenario: 'Small phones, notches, long menus.',
    items: [
      {
        kind: 'mcq',
        prompt: 'The menu is taller than Linh\'s screen. What happens with a plain View?',
        options: [
          { text: 'It scrolls automatically', why: 'Views never scroll. You need a ScrollView.' },
          { text: 'The bottom is cut off: there\'s no way to reach it' },
          { text: 'The text shrinks to fit', why: 'React Native doesn\'t shrink it. It\'s cut off.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the long menu scroll: swap the outer View for a ScrollView (import it too)',
        starter: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.item}>Small pho $11.50</Text>
      <Text style={styles.item}>Large pho $13.50</Text>
      <Text style={styles.item}>Banh mi $9.00</Text>
      <Text style={styles.item}>Spring rolls (2) $5.50</Text>
      <Text style={styles.item}>Iced coffee $4.75</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: 64 },
  item: { fontSize: 18, padding: 32 },
});
`,
        solution: `import { ScrollView, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.item}>Small pho $11.50</Text>
      <Text style={styles.item}>Large pho $13.50</Text>
      <Text style={styles.item}>Banh mi $9.00</Text>
      <Text style={styles.item}>Spring rolls (2) $5.50</Text>
      <Text style={styles.item}>Iced coffee $4.75</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: 64 },
  item: { fontSize: 18, padding: 32 },
});
`,
        hint: 'Import ScrollView, and change <View style={styles.screen}> ... </View> to <ScrollView style={styles.screen}> ... </ScrollView>.',
        checks: [
          { message: 'Every dish is still there', screen: { text: 'Iced coffee $4.75' } },
          { message: 'Uses a ScrollView', codeIncludes: '<ScrollView' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to the tool.',
        pairs: [
          ['Menu taller than the screen', 'ScrollView'],
          ['Title hidden by the notch', 'SafeAreaView'],
          ['Photo too big on small phones', 'useWindowDimensions'],
          ['Padding cut off at the bottom', 'contentContainerStyle'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'On my phone the iced coffee is gone. Did you delete it?',
        options: [
          { text: 'Your phone is too old, Mum.', why: 'The app has to work on her phone: she\'s the customer.' },
          { text: 'It\'s there, just below the screen. I\'ll make the menu scroll so you can reach it.' },
          { text: 'Nobody orders iced coffee.', why: 'Plenty do, and Linh will notice.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Read the screen width.',
        language: 'typescript',
        template: 'const { [[1]] } = [[2]]();',
        blanks: [['width'], ['useWindowDimensions']],
        distractors: ['size', 'getScreen', 'height'],
      },
      {
        kind: 'mcq',
        prompt: 'In a ScrollView, where should padding for the list go?',
        options: [
          { text: 'contentContainerStyle, so it scrolls with the content' },
          { text: 'On every Text', why: 'Too much repetition. Put it on the content container.' },
          { text: 'Nowhere: ScrollViews can\'t have padding', why: 'They can, on contentContainerStyle.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the photo half the screen width: use useWindowDimensions and width / 2',
        starter: `import { View, Image, useWindowDimensions } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Image source={{ uri: '/originals/react-native/pho.png' }} style={{ width: 300, height: 300 }} />
    </View>
  );
}
`,
        solution: `import { View, Image, useWindowDimensions } from 'react-native';

export default function App() {
  const { width } = useWindowDimensions();
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Image source={{ uri: '/originals/react-native/pho.png' }} style={{ width: width / 2, height: width / 2 }} />
    </View>
  );
}
`,
        hint: 'Inside App, before return: const { width } = useWindowDimensions(); then style={{ width: width / 2, height: width / 2 }}.',
        checks: [
          { message: 'The picture shows', screen: { images: 1 } },
          { message: 'Uses useWindowDimensions', codeIncludes: 'useWindowDimensions()' },
          { message: 'Half the width', codeIncludes: 'width / 2' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool for each job?',
        groups: ['ScrollView', 'SafeAreaView'],
        items: [
          { text: 'A menu of 20 dishes', group: 0 },
          { text: 'A title under the camera notch', group: 1 },
          { text: 'A long "About us" page', group: 0 },
          { text: 'Content under the status bar', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which component makes long content swipeable? (One word.)',
        answers: ['ScrollView'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'The bottom of the menu is unreachable on Linh\'s phone. Which line is the problem?',
        language: 'typescript',
        lines: ['<View style={styles.screen}>', '  <Header />', '  <MenuList />', '</View>'],
        bug: 0,
        fix: '<ScrollView style={styles.screen}> ... </ScrollView>',
        explanation: 'A View never scrolls. Use a ScrollView for content that can be taller than the screen.',
      },
    ],
  },
  reflect: {
    prompt: 'Whose phone could you borrow as your "small, old phone" tester? What do you expect to break on it?',
    starters: ['I\'ll borrow...', 'I expect...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Open your app on the smallest phone you can find (or turn your phone\'s text size up to the largest). Can you reach everything? Does anything hide under the notch?',
  },
  notes: 'ScrollView (contentContainerStyle for padding/gap), SafeAreaView (iOS-only in core; Expo projects use react-native-safe-area-context), useWindowDimensions hook. Teyro\'s preview frame has no notch, so SafeAreaView is taught conceptually and tested on device.',
};

export default lesson;
