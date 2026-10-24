import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 17. Build: the full menu screen from Mai's annotated mockup (Tap to explore). */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Build: the menu screen',
  summary: 'Mai has done a proper mockup, with notes in the margins and arrows everywhere. Tap through her notes, then build the whole menu screen: header, sections, cards, one main button, scrolling.',
  minutes: 15,
  outcomes: ['Build a full screen from a design', 'Combine ScrollView, sections, cards and a main button', 'Turn design notes into styles'],
  learn: [
    {
      kind: 'explore',
      title: 'Mai\'s mockup notes',
      text: 'PHO REAL MENU v0.2. Header: name in rust, 34, bold; tagline under it in ink, 16. Sections: PHO, SIDES, DRINKS in small rust capitals with space above. Cards: picture left 64x64, name fills the middle, price right in rust. 12 between cards. Whole menu scrolls on small phones. Order ahead: ONE solid rust button, full width, at the bottom of the menu. Background cream. Nothing grey except small print. Mai\'s rule: if Mum can\'t read it without glasses, it\'s wrong.',
      hotspots: [
        { phrase: 'name in rust, 34, bold', note: 'styles.title: fontSize 34, fontWeight bold, color COLORS.rust.' },
        { phrase: 'PHO, SIDES, DRINKS in small rust capitals with space above', note: 'A SectionTitle component, with marginTop for the space above.' },
        { phrase: 'picture left 64x64, name fills the middle, price right in rust', note: 'Exactly MenuCard from last lesson.' },
        { phrase: '12 between cards', note: 'gap: 12 on the list (or the scroll content).' },
        { phrase: 'Whole menu scrolls on small phones', note: 'ScrollView, with padding on contentContainerStyle.' },
        { phrase: 'ONE solid rust button', note: 'The main action, from "One button to find".' },
        { phrase: 'if Mum can\'t read it without glasses, it\'s wrong', note: 'The test from Chapter 1, still the best one.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The menu screen',
      caption: 'Everything together. Scroll in the phone. Add a DRINKS section with the iced coffee at the end of the list.',
      code: `import { ScrollView, View, Text, Image, Pressable, Alert, StyleSheet } from 'react-native';

const COLORS = { rust: '#9a3412', cream: '#fff7ed', ink: '#1c1917', line: '#fed7aa' };

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.section}>{title}</Text>;
}

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
      <Text style={styles.title}>Pho Real</Text>
      <Text style={styles.tagline}>Order ahead. Skip the line.</Text>
      <SectionTitle title="PHO" />
      <MenuCard name="Large pho" price={13.5} photo="pho.png" />
      <SectionTitle title="SIDES" />
      <MenuCard name="Banh mi" price={9} photo="banh-mi.png" />
      <MenuCard name="Spring rolls (2)" price={5.5} photo="spring-rolls.png" />
      <Pressable style={styles.button} onPress={() => Alert.alert('Coming in v0.3')}>
        <Text style={styles.buttonText}>Order ahead</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.cream },
  content: { padding: 24, paddingTop: 64, gap: 12 },
  title: { fontSize: 34, fontWeight: 'bold', color: COLORS.rust },
  tagline: { fontSize: 16, color: COLORS.ink },
  section: { fontSize: 13, fontWeight: 'bold', letterSpacing: 1, color: COLORS.rust, marginTop: 16 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, backgroundColor: '#ffffff', borderRadius: 16, borderWidth: 1, borderColor: COLORS.line },
  photo: { width: 64, height: 64, borderRadius: 12 },
  name: { flex: 1, fontSize: 18, fontWeight: 'bold', color: COLORS.ink },
  price: { fontSize: 18, fontWeight: 'bold', color: COLORS.rust },
  button: { backgroundColor: COLORS.rust, paddingVertical: 18, borderRadius: 16, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
});
`,
      challenge: 'Put the Order ahead button at the very top instead. Which do you prefer, and why?',
    },
  ],
  apply: {
    scenario: 'Mockup to screen.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which component builds it?',
        groups: ['MenuCard', 'SectionTitle'],
        items: [
          { text: 'Picture, name and price', group: 0 },
          { text: 'DRINKS in small rust capitals', group: 1 },
          { text: 'Banh mi $9.00', group: 0 },
          { text: 'SIDES', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add a DRINKS section with an Iced coffee card (4.75, iced-coffee.png) before the button',
        starter: `import { ScrollView, View, Text, Image, Pressable, StyleSheet } from 'react-native';

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.section}>{title}</Text>;
}

function MenuCard({ name, price, photo }: { name: string; price: number; photo: string }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: '/originals/react-native/' + photo }} style={styles.photo} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>\${price.toFixed(2)}</Text>
    </View>
  );
}

export default function App() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <SectionTitle title="PHO" />
      <MenuCard name="Large pho" price={13.5} photo="pho.png" />
      <Pressable style={styles.button}><Text style={styles.buttonText}>Order ahead</Text></Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff7ed' },
  content: { padding: 24, paddingTop: 64, gap: 12 },
  section: { fontSize: 13, fontWeight: 'bold', color: '#9a3412', marginTop: 16 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, backgroundColor: '#ffffff', borderRadius: 16 },
  photo: { width: 64, height: 64, borderRadius: 12 },
  name: { flex: 1, fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 18, fontWeight: 'bold', color: '#9a3412' },
  button: { backgroundColor: '#9a3412', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
});
`,
        solution: `import { ScrollView, View, Text, Image, Pressable, StyleSheet } from 'react-native';

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.section}>{title}</Text>;
}

function MenuCard({ name, price, photo }: { name: string; price: number; photo: string }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: '/originals/react-native/' + photo }} style={styles.photo} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>\${price.toFixed(2)}</Text>
    </View>
  );
}

export default function App() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <SectionTitle title="PHO" />
      <MenuCard name="Large pho" price={13.5} photo="pho.png" />
      <SectionTitle title="DRINKS" />
      <MenuCard name="Iced coffee" price={4.75} photo="iced-coffee.png" />
      <Pressable style={styles.button}><Text style={styles.buttonText}>Order ahead</Text></Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff7ed' },
  content: { padding: 24, paddingTop: 64, gap: 12 },
  section: { fontSize: 13, fontWeight: 'bold', color: '#9a3412', marginTop: 16 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, backgroundColor: '#ffffff', borderRadius: 16 },
  photo: { width: 64, height: 64, borderRadius: 12 },
  name: { flex: 1, fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 18, fontWeight: 'bold', color: '#9a3412' },
  button: { backgroundColor: '#9a3412', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
});
`,
        hint: 'Before the Pressable: <SectionTitle title="DRINKS" /> and <MenuCard name="Iced coffee" price={4.75} photo="iced-coffee.png" />.',
        checks: [
          { message: 'A DRINKS section', screen: { text: 'DRINKS' } },
          { message: 'Iced coffee for $4.75', screen: { text: '$4.75' } },
          { message: 'Two pictures now', screen: { images: 2 } },
          { message: 'The Order ahead button is still there', screen: { button: 'Order ahead' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Mai\'s note says "12 between cards". Where does that go?',
        options: [
          { text: 'gap: 12 on the ScrollView\'s contentContainerStyle' },
          { text: 'padding: 12 inside every card', why: 'Padding is inside each card, not between them.' },
          { text: 'fontSize: 12', why: 'That changes text size, not spacing.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'Why is the button at the BOTTOM? People need it first!',
        options: [
          { text: 'You\'re wrong.', why: 'It\'s a fair question. There\'s a reason either way.' },
          { text: 'They look at the food first, then order. Bottom follows the way people read. Let\'s test both at the market.' },
          { text: 'Buttons always go at the bottom.', why: 'Not always. It\'s a choice worth testing.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Mai\'s note to the code.',
        pairs: [
          ['Name in rust, 34, bold', 'styles.title'],
          ['Picture left, price right', 'MenuCard'],
          ['Scrolls on small phones', 'ScrollView'],
          ['ONE solid rust button', 'styles.button'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Spacing the scrolling menu.',
        language: 'typescript',
        template: '<ScrollView style={styles.screen} [[1]]={styles.[[2]]}>',
        blanks: [['contentContainerStyle'], ['content']],
        distractors: ['containerStyle', 'innerStyle', 'screen'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Mai\'s notes, how big is each card\'s picture? (Like 10x10.)',
        answers: ['64x64', '64 x 64', '64 by 64', '64'],
        placeholder: '00x00',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The section title has fontSize 13 and the cards have 18. What does the eye read first in each section?',
        code: "section: { fontSize: 13, color: '#9a3412' }\nname: { fontSize: 18, fontWeight: 'bold' }",
        language: 'typescript',
        options: [
          { text: 'The section title', why: 'It\'s small: a quiet label. The bigger, bolder dish names come first.' },
          { text: 'The prices only', why: 'Prices are the same size as names. The names lead.' },
          { text: 'The dish names, then the small section label' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the menu screen, top to bottom.',
        lines: ['Pho Real title', 'Tagline', 'PHO section and its cards', 'SIDES section and its cards', 'Order ahead button'],
      },
      {
        kind: 'findBug',
        prompt: 'The last card is stuck to the bottom edge with no space. Which line is the problem?',
        language: 'typescript',
        lines: ["screen: { flex: 1, padding: 24, backgroundColor: '#fff7ed' },", 'content: { gap: 12 },', "button: { backgroundColor: '#9a3412' },"],
        bug: 0,
        fix: "screen: { flex: 1, backgroundColor: '#fff7ed' }, content: { padding: 24, gap: 12 },",
        explanation: 'In a ScrollView, padding on style doesn\'t scroll with the content. Put it on contentContainerStyle.',
      },
    ],
  },
  reflect: {
    prompt: 'Make a quick mockup (paper is fine) of one screen you\'d like to build. Write three notes in the margin, like Mai did.',
    starters: ['Note 1:...', 'Note 2:...', 'Note 3:...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Put the full menu screen on your phone with Expo Go (full https picture addresses). Scroll it one-handed outdoors. Anything you\'d change before a real market?',
  },
  notes: 'Build lesson. Combines SectionTitle, MenuCard, ScrollView, COLORS and the primary button.',
};

export default lesson;
