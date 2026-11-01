import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 20. Unit Challenge: v0.2, market Saturday. The whole chapter in one build; cliffhanger into Chapter 3 (Build your bowl). */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'v0.2: market Saturday',
  summary: 'Saturday, 12 noon, the Riverside Saturday Market, full sun. A QR code taped to the window, v0.2 on everyone\'s phone. Build the version people will see, then watch what they do with it.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a styled, scrolling menu screen from components', 'Use a theme, cards, pictures and one main button together'],
  learn: [
    {
      kind: 'story',
      title: 'Riverside Saturday Market, 12:00',
      beats: [
        { speaker: 'narrator', text: 'Full sun. Sixty-one degrees in the shade, ninety in the line. Mai has taped a QR code to the window: "See the menu while you wait."' },
        { speaker: 'linh', text: 'If anyone squints, we go back to the chalkboard.' },
        { speaker: 'theo', text: 'Nobody\'s going to squint.' },
        { speaker: 'tey', text: 'Build the v0.2 they\'re about to scan.' },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: Pho Real v0.2.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build v0.2: a ScrollView screen with a rust title "Pho Real", a MenuCard for Large pho (13.5, pho.png) and Banh mi (9, banh-mi.png), and one solid rust "Order ahead" button',
        starter: `import { ScrollView, View, Text, Image, Pressable, Alert, StyleSheet } from 'react-native';

const COLORS = { rust: '#9a3412', cream: '#fff7ed', ink: '#1c1917' };

export default function App() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.cream },
  content: { padding: 24, paddingTop: 64, gap: 12 },
});
`,
        solution: `import { ScrollView, View, Text, Image, Pressable, Alert, StyleSheet } from 'react-native';

const COLORS = { rust: '#9a3412', cream: '#fff7ed', ink: '#1c1917' };

function MenuCard({ name, price, photo }: { name: string; price: number; photo: string }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: '/originals/react-native/' + photo }} style={styles.photo} accessibilityLabel={name} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>\${price.toFixed(2)}</Text>
    </View>
  );
}

export default function App() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title} accessibilityRole="header">Pho Real</Text>
      <MenuCard name="Large pho" price={13.5} photo="pho.png" />
      <MenuCard name="Banh mi" price={9} photo="banh-mi.png" />
      <Pressable style={styles.button} accessibilityRole="button" onPress={() => Alert.alert('Coming in v0.3')}>
        <Text style={styles.buttonText}>Order ahead</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.cream },
  content: { padding: 24, paddingTop: 64, gap: 12 },
  title: { fontSize: 34, fontWeight: 'bold', color: COLORS.rust },
  card: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, backgroundColor: '#ffffff', borderRadius: 16 },
  photo: { width: 64, height: 64, borderRadius: 12 },
  name: { flex: 1, fontSize: 18, fontWeight: 'bold', color: COLORS.ink },
  price: { fontSize: 18, fontWeight: 'bold', color: COLORS.rust },
  button: { backgroundColor: COLORS.rust, paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
});
`,
        hint: 'Write a MenuCard (row card with Image, name, price), then in the ScrollView: a title Text, two MenuCards and a Pressable with styles.button.',
        checks: [
          { message: 'A rust title', screen: { style: { of: 'Pho Real', prop: 'color', value: '#9a3412' } } },
          { message: 'Two pictures', screen: { images: 2 } },
          { message: 'Banh mi for $9.00', screen: { text: '$9.00' } },
          { message: 'Cards are rows', screen: { style: { of: 'Banh mi', prop: 'flexDirection', value: 'row' } } },
          { message: 'A solid rust Order ahead button', screen: { style: { of: 'Order ahead', prop: 'backgroundColor', value: '#9a3412' } } },
          { message: 'It scrolls', codeIncludes: '<ScrollView' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Back in lesson 1, why did the couple lean away from v0.1?',
        options: [
          { text: 'It crashed', why: 'It never crashed. It just wasn\'t readable or inviting.' },
          { text: 'They don\'t eat pho', why: 'They were in the pho line.' },
          { text: 'It looked like a grey phone bill: no pictures, no layout, no colour' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of v0.2 to the lesson behind it.',
        pairs: [
          ['Name left, price right', 'Rows and columns'],
          ['COLORS and SPACE', 'Code review: a theme'],
          ['Pictures that show', 'Pictures on the menu'],
          ['A menu you can reach on any phone', 'Every phone is different'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'v0.2 crashes on one phone and looks wrong on another. Which line is the real bug?',
        language: 'typescript',
        lines: ["<View style={{ flexDirection: 'row' }}>", "  <Image source={{ uri: '/originals/react-native/pho.png' }} />", '  <Text style={{ flex: 1 }}>Large pho</Text>', '</View>'],
        bug: 1,
        fix: "  <Image source={{ uri: '/originals/react-native/pho.png' }} style={{ width: 64, height: 64 }} />",
        explanation: 'No crash here, but the picture is invisible: no width and height. (On a real phone it also needs the full https address.)',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'Thirty people looked at the menu on their phones. Nobody squinted. One man asked if the pho is gluten-free.',
        options: [
          { text: 'Tell him to read the app.', why: 'The app doesn\'t say. That\'s useful feedback.' },
          { text: 'Rice noodles are, but let\'s check the sauces before we say anything. And it should be on the menu.' },
          { text: 'Ignore it.', why: 'Customers asking questions is the app doing its job.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Did v0.2 fix it, or is it still to come?',
        groups: ['Fixed in v0.2', 'Still to come'],
        items: [
          { text: 'Readable in the sun', group: 0 },
          { text: 'Choosing large, no onions, extra brisket', group: 1 },
          { text: 'Pictures of every dish', group: 0 },
          { text: 'Actually placing an order', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add the gluten question\'s answer as small print: "Rice noodles. Ask us about sauces." in size 14 and color #78716c',
        starter: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pho Real</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12 },
  title: { fontSize: 34, fontWeight: 'bold', color: '#9a3412' },
});
`,
        solution: `import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pho Real</Text>
      <Text style={styles.small}>Rice noodles. Ask us about sauces.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12 },
  title: { fontSize: 34, fontWeight: 'bold', color: '#9a3412' },
  small: { fontSize: 14, color: '#78716c' },
});
`,
        hint: 'Add small: { fontSize: 14, color: \'#78716c\' } and a Text with style={styles.small}.',
        checks: [
          { message: 'The note shows', screen: { text: 'Rice noodles. Ask us about sauces.' } },
          { message: 'Size 14', screen: { style: { of: 'Rice noodles', prop: 'fontSize', value: '14' } } },
          { message: 'Muted grey', screen: { style: { of: 'Rice noodles', prop: 'color', value: '#78716c' } } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The card row, from memory.',
        language: 'typescript',
        template: "card: { flexDirection: '[[1]]', alignItems: 'center', gap: 16, padding: 16, borderRadius: [[2]] },",
        blanks: [['row'], ['16']],
        distractors: ['column', '0', 'center'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What style property spells "background colour" in React Native?',
        answers: ['backgroundColor'],
        placeholder: 'camelCase',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Chapter 2 in order.',
        lines: ['The grey list in the sun', 'StyleSheet and rows', 'Spacing and the truck\'s colours', 'Pictures and cards', 'v0.2 at the Riverside Saturday Market'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is the text?',
        code: "<View style={{ backgroundColor: '#9a3412', color: '#ffffff' }}>\n  <Text>Order ahead</Text>\n</View>",
        language: 'typescript',
        options: [
          { text: 'White', why: 'color on a View doesn\'t reach the Text. Style the Text itself.' },
          { text: 'Rust', why: 'Rust is the background. The text keeps its own default colour.' },
          { text: 'The default (black), because color on a View doesn\'t pass down' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'At 1:30 p.m., a woman holds up her phone at the window. What does she say?',
        options: [
          { text: '"Large, no onions, extra brisket, two limes. Can I just order that in here?"' },
          { text: '"I can\'t read this."', why: 'Nobody squinted. Her question is about ordering.' },
          { text: '"Where are the pictures?"', why: 'v0.2 has pictures. She wants to order.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write your build log entry for v0.2: what you shipped, what broke, what you learned, and what people asked for next.',
    starters: ['Shipped:...', 'Broke:...', 'Learned:...', 'People asked for...'],
  },
  deepen: {
    title: 'Chapter 2 mission: your own market test',
    summary: 'Show your styled menu to three people outside, on your phone. Write down the first thing each one tries to tap. Next chapter, "Build your bowl": "Large, no onions, extra brisket, two limes." Theo\'s app has to take real orders, with choices, a cart and a total in dollars.',
  },
  notes: 'Unit Challenge for Chapter 2 (v0.2). Gluten note kept non-committal ("ask us about sauces"): fish sauce/hoisin can contain gluten; no health claims. Cliffhanger into Chapter 3 (state, inputs, cart, totals).',
};

export default lesson;
