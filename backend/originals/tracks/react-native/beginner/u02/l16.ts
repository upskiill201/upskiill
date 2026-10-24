import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 16. Build: the MenuCard component (photo, name, price as props) with its own styles. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Build: the menu card',
  summary: 'Saturday, 7 a.m., market day. Theo has one card design and five dishes. Build MenuCard once, with the picture, name and price as props, and the whole menu falls into place.',
  minutes: 14,
  outcomes: ['Build a styled, reusable MenuCard component', 'Pass a picture, name and price as props', 'Reuse it for every dish'],
  learn: [
    {
      kind: 'text',
      html: '<p>Chapter 1\'s MenuItem was one line of text. Today\'s <strong>MenuCard</strong> is a real card: a picture on the left, the name filling the middle, the price on the right. It takes three props:</p><pre><code>type MenuCardProps = {\n  name: string;\n  price: number;\n  photo: string;  // a file in /originals/react-native/\n};</code></pre><p>The card\'s look lives in one StyleSheet, so every dish is identical. Pictures follow a pattern: <code>\'/originals/react-native/\' + photo</code>, so each card only needs the file name, like <code>"pho.png"</code>.</p>',
    },
    {
      kind: 'tryIt',
      title: 'One card, every dish',
      caption: 'MenuCard is built and used twice. Add Spring rolls (2) at 5.5 with spring-rolls.png.',
      code: `import { View, Text, Image, StyleSheet } from 'react-native';

type MenuCardProps = { name: string; price: number; photo: string };

function MenuCard({ name, price, photo }: MenuCardProps) {
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
    <View style={styles.screen}>
      <MenuCard name="Large pho" price={13.5} photo="pho.png" />
      <MenuCard name="Banh mi" price={9} photo="banh-mi.png" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12, backgroundColor: '#fff7ed' },
  card: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, backgroundColor: '#ffffff', borderRadius: 16, borderWidth: 1, borderColor: '#fed7aa' },
  photo: { width: 64, height: 64, borderRadius: 12 },
  name: { flex: 1, fontSize: 18, fontWeight: 'bold', color: '#1c1917' },
  price: { fontSize: 18, fontWeight: 'bold', color: '#9a3412' },
});
`,
      challenge: 'Add the iced coffee too (4.75, iced-coffee.png).',
    },
  ],
  apply: {
    scenario: 'Building MenuCard.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Finish MenuCard: show the picture (\'/originals/react-native/\' + photo), the name, and the price with two decimals',
        starter: `import { View, Text, Image, StyleSheet } from 'react-native';

type MenuCardProps = { name: string; price: number; photo: string };

function MenuCard({ name, price, photo }: MenuCardProps) {
  return (
    <View style={styles.card}>

    </View>
  );
}

export default function App() {
  return (
    <View style={styles.screen}>
      <MenuCard name="Large pho" price={13.5} photo="pho.png" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, backgroundColor: '#ffffff', borderRadius: 16 },
  photo: { width: 64, height: 64, borderRadius: 12 },
  name: { flex: 1, fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 18, fontWeight: 'bold', color: '#9a3412' },
});
`,
        solution: `import { View, Text, Image, StyleSheet } from 'react-native';

type MenuCardProps = { name: string; price: number; photo: string };

function MenuCard({ name, price, photo }: MenuCardProps) {
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
    <View style={styles.screen}>
      <MenuCard name="Large pho" price={13.5} photo="pho.png" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, backgroundColor: '#ffffff', borderRadius: 16 },
  photo: { width: 64, height: 64, borderRadius: 12 },
  name: { flex: 1, fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 18, fontWeight: 'bold', color: '#9a3412' },
});
`,
        hint: "Inside the card View: <Image source={{ uri: '/originals/react-native/' + photo }} style={styles.photo} />, <Text style={styles.name}>{name}</Text>, <Text style={styles.price}>${price.toFixed(2)}</Text>.",
        checks: [
          { message: 'A picture', screen: { images: 1 } },
          { message: 'The name', screen: { text: 'Large pho' } },
          { message: 'The price, two decimals', screen: { text: '$13.50' } },
          { message: 'The price is rust', screen: { style: { of: '$13.50', prop: 'color', value: '#9a3412' } } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why pass photo="pho.png" instead of the whole address?',
        options: [
          { text: 'Shorter and tidier: the card adds the folder, so every dish only needs its file name' },
          { text: 'Full addresses are not allowed', why: 'They are. The card just builds them for you.' },
          { text: 'Pictures load faster', why: 'Same picture, same speed. It\'s about tidy code.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Build the picture\'s address.',
        language: 'typescript',
        template: "source={{ uri: '/originals/react-native/' [[1]] [[2]] }}",
        blanks: [['+'], ['photo']],
        distractors: ['-', 'name', '&'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'Can each card have its own colour? Pho orange, banh mi green...',
        options: [
          { text: 'Sure, rainbow menu!', why: 'Five colours fight the one brand colour and the main button.' },
          { text: 'Colours are boring anyway.', why: 'Not the point: consistency helps people scan.' },
          { text: 'Same card for every dish keeps it calm and easy to scan. The pictures already make each one different.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Use MenuCard for three dishes: Large pho (13.5, pho.png), Banh mi (9, banh-mi.png), Iced coffee (4.75, iced-coffee.png)',
        starter: `import { View, Text, Image, StyleSheet } from 'react-native';

type MenuCardProps = { name: string; price: number; photo: string };

function MenuCard({ name, price, photo }: MenuCardProps) {
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
    <View style={styles.screen}>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, backgroundColor: '#ffffff', borderRadius: 16 },
  photo: { width: 64, height: 64, borderRadius: 12 },
  name: { flex: 1, fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 18, fontWeight: 'bold', color: '#9a3412' },
});
`,
        solution: `import { View, Text, Image, StyleSheet } from 'react-native';

type MenuCardProps = { name: string; price: number; photo: string };

function MenuCard({ name, price, photo }: MenuCardProps) {
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
    <View style={styles.screen}>
      <MenuCard name="Large pho" price={13.5} photo="pho.png" />
      <MenuCard name="Banh mi" price={9} photo="banh-mi.png" />
      <MenuCard name="Iced coffee" price={4.75} photo="iced-coffee.png" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, backgroundColor: '#ffffff', borderRadius: 16 },
  photo: { width: 64, height: 64, borderRadius: 12 },
  name: { flex: 1, fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 18, fontWeight: 'bold', color: '#9a3412' },
});
`,
        hint: 'Three lines inside the screen View: <MenuCard name="..." price={...} photo="..." />.',
        checks: [
          { message: 'Three pictures', screen: { images: 3 } },
          { message: 'Iced coffee for $4.75', screen: { text: '$4.75' } },
          { message: 'Built with MenuCard', codeIncludes: '<MenuCard name="Iced coffee"' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of MenuCard to its job.',
        pairs: [
          ['photo prop', 'Which picture'],
          ['styles.name with flex: 1', 'Pushes the price right'],
          ['price.toFixed(2)', 'Shows $13.50, not 13.5'],
          ['accessibilityLabel={name}', 'Screen readers say the dish'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which file name is the iced coffee picture?',
        answers: ['iced-coffee.png'],
        placeholder: 'file.png',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this card\'s price say?',
        code: '<MenuCard name="Spring rolls (2)" price={5.5} photo="spring-rolls.png" />',
        language: 'typescript',
        options: [
          { text: '$5.5', why: 'MenuCard uses toFixed(2).' },
          { text: 'price', why: 'It shows the value: 5.5 as $5.50.' },
          { text: '$5.50' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put MenuCard\'s children in order, left to right.',
        language: 'typescript',
        lines: ['<Image ... style={styles.photo} />', '<Text style={styles.name}>{name}</Text>', '<Text style={styles.price}>${price.toFixed(2)}</Text>'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in MenuCard makes every picture invisible?',
        language: 'typescript',
        lines: ['photo: { borderRadius: 12 },', "name: { flex: 1, fontSize: 18 },", "price: { fontWeight: 'bold' },"],
        bug: 0,
        fix: 'photo: { width: 64, height: 64, borderRadius: 12 },',
        explanation: 'No width and height: every picture is 0 by 0.',
      },
    ],
  },
  reflect: {
    prompt: 'Design a card for your own app: what\'s on the left, in the middle, on the right? Which props does it take?',
    starters: ['Left:...', 'Middle:...', 'Right:...', 'Props:...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'On your phone, switch the folder to the full address (https://teyro.app/originals/react-native/) and check the three cards look the same as in the preview.',
  },
  notes: 'Build lesson. MenuCard replaces Chapter 1\'s MenuItem. String concatenation for the image URI; relative path works in the preview only (real devices need https).',
};

export default lesson;
