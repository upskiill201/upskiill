import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 19. Reading + build: accessible by design (labels, roles, hit areas, font scaling, screen readers). */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Everyone can use it',
  summary: 'A regular, Mr. Alvarez, uses his phone with VoiceOver: it reads the screen out loud. On v0.2 it says "image, image, button" and nothing else. Read how to make the app work for everyone.',
  minutes: 13,
  outcomes: ['Label pictures and buttons for screen readers', 'Tell screen readers what something is with accessibilityRole', 'Keep tap targets big and text scalable'],
  learn: [
    {
      kind: 'reading',
      title: '"Image. Image. Button."',
      html: '<p>Mr. Alvarez has bought a large pho every Friday for six years. He\'s blind, and uses <strong>VoiceOver</strong>, the iPhone\'s screen reader (Android\'s is <strong>TalkBack</strong>). It reads out whatever his finger touches. On v0.2 it says: "Image. Image. Button." He has no idea what anything is.</p><h3>Labels: say what it is</h3><p><code>accessibilityLabel</code> is what the screen reader says. On a picture: <code>accessibilityLabel="A bowl of pho"</code>. On a button whose text isn\'t enough, a clearer phrase: <code>accessibilityLabel="Order ahead, coming soon"</code>.</p><h3>Roles: say what it does</h3><p><code>accessibilityRole="button"</code> on a Pressable tells the screen reader "this is a button, you can tap it". <code>accessibilityRole="header"</code> on a title lets people jump between sections.</p><h3>Big targets, scalable text</h3><ul><li>Tap targets of at least 44 to 48 points (Chapter 1). If a small icon must stay small, <code>hitSlop={12}</code> makes the tappable area bigger than it looks.</li><li>Let text grow with the phone\'s text size setting (the default). Don\'t trap it in fixed-height boxes that cut words off.</li></ul><blockquote>Accessibility isn\'t a feature for a few people. Glare, a cracked screen, a coffee in one hand: everyone is "disabled" sometimes.</blockquote><h3>Test it</h3><p>Turn on VoiceOver (Settings, Accessibility) or TalkBack, close your eyes, and try to order a large pho. If you can\'t, neither can Mr. Alvarez.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Labelled and roled',
      caption: 'The card picture has a label, the title is a header, and the button has a role. Add accessibilityLabel="Directions to the truck" to the second button.',
      code: `import { View, Text, Image, Pressable, Alert, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title} accessibilityRole="header">Pho Real</Text>
      <Image source={{ uri: '/originals/react-native/pho.png' }} style={styles.photo} accessibilityLabel="A bowl of pho with brisket and lime" />
      <Pressable style={styles.button} accessibilityRole="button" onPress={() => Alert.alert('Coming in v0.3')}>
        <Text style={styles.buttonText}>Order ahead</Text>
      </Pressable>
      <Pressable style={styles.quiet} accessibilityRole="button" hitSlop={12}>
        <Text style={styles.quietText}>Directions</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 16, backgroundColor: '#fff7ed' },
  title: { fontSize: 34, fontWeight: 'bold', color: '#9a3412' },
  photo: { width: 160, height: 160, borderRadius: 16 },
  button: { backgroundColor: '#9a3412', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  quiet: { alignItems: 'center', paddingVertical: 12 },
  quietText: { color: '#9a3412', fontSize: 16, fontWeight: 'bold' },
});
`,
      challenge: 'Turn on your phone\'s screen reader and listen to this screen on Expo Go.',
    },
  ],
  apply: {
    scenario: 'Making v0.2 work for Mr. Alvarez.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each prop to what it does.',
        pairs: [
          ['accessibilityLabel', 'What the screen reader says'],
          ['accessibilityRole="button"', 'Says it can be tapped'],
          ['accessibilityRole="header"', 'Marks a title to jump between'],
          ['hitSlop={12}', 'Bigger tap area than it looks'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Label the picture "A bowl of pho" and give the Pressable accessibilityRole="button"',
        starter: `import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Image source={{ uri: '/originals/react-native/pho.png' }} style={styles.photo} />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Order ahead</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 16 },
  photo: { width: 160, height: 160 },
  button: { backgroundColor: '#9a3412', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 20 },
});
`,
        solution: `import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Image source={{ uri: '/originals/react-native/pho.png' }} style={styles.photo} accessibilityLabel="A bowl of pho" />
      <Pressable style={styles.button} accessibilityRole="button">
        <Text style={styles.buttonText}>Order ahead</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 16 },
  photo: { width: 160, height: 160 },
  button: { backgroundColor: '#9a3412', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 20 },
});
`,
        hint: 'Add accessibilityLabel="A bowl of pho" to the Image and accessibilityRole="button" to the Pressable.',
        checks: [
          { message: 'The picture has a label', codeIncludes: 'accessibilityLabel="A bowl of pho"' },
          { message: 'The Pressable is a button', codeIncludes: 'accessibilityRole="button"' },
          { message: 'Still shows the button', screen: { button: 'Order ahead' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does VoiceOver or TalkBack do?',
        options: [
          { text: 'Makes the screen brighter', why: 'That\'s brightness. Screen readers speak.' },
          { text: 'Translates the app', why: 'It reads the app aloud, in the phone\'s language.' },
          { text: 'Reads out loud whatever is under your finger, so people who can\'t see can use the phone' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'Why bother? Like, one customer uses a screen reader.',
        options: [
          { text: 'One we know of. And labels and big buttons help everyone: glare, a cracked screen, a coffee in one hand.' },
          { text: 'You\'re right, skip it.', why: 'Mr. Alvarez has bought pho every Friday for six years.' },
          { text: 'It\'s the law, that\'s all.', why: 'There are rules in some places, but the real reason is people.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps accessibility, or hurts it?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'accessibilityLabel on pictures', group: 0 },
          { text: 'A tiny 20-point tap area', group: 1 },
          { text: 'Text that grows with the phone setting', group: 0 },
          { text: '"Sold out" shown only by turning the name red', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A labelled, roled button.',
        language: 'typescript',
        template: '<Pressable [[1]]="button" [[2]]="Order ahead, coming soon">',
        blanks: [['accessibilityRole'], ['accessibilityLabel']],
        distractors: ['role', 'alt', 'title'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is Android\'s built-in screen reader called? (One word.)',
        answers: ['TalkBack', 'talkback', 'Talkback'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'A small "x" close icon must stay small. How do you make it easy to hit?',
        options: [
          { text: 'Make the icon huge', why: 'You can keep it small and grow the tap area with hitSlop.' },
          { text: 'Tell people to tap carefully', why: 'Not a fix.' },
          { text: 'hitSlop: a bigger tap area than it looks' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Mark the title as a header for screen readers: accessibilityRole="header"',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 34, fontWeight: 'bold' }}>Pho Real</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 34, fontWeight: 'bold' }} accessibilityRole="header">Pho Real</Text>
    </View>
  );
}
`,
        hint: 'Add accessibilityRole="header" to the title Text.',
        checks: [
          { message: 'The title is a header', codeIncludes: 'accessibilityRole="header"' },
          { message: 'Still says Pho Real', screen: { text: 'Pho Real' } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line leaves Mr. Alvarez guessing?',
        language: 'typescript',
        lines: ['<Text accessibilityRole="header">Pho Real</Text>', "<Image source={{ uri: '/originals/react-native/pho.png' }} style={styles.photo} />", '<Pressable accessibilityRole="button">'],
        bug: 1,
        fix: "<Image ... accessibilityLabel=\"A bowl of pho\" />",
        explanation: 'Without a label the screen reader only says "image".',
      },
    ],
  },
  reflect: {
    prompt: 'Turn on VoiceOver or TalkBack for two minutes and try an app you use every day. What worked, and what was impossible?',
    starters: ['Worked:...', 'Impossible:...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Put your menu on your phone, turn on VoiceOver (Settings, Accessibility) or TalkBack, close your eyes and try to find Order ahead. Fix anything that says only "image" or "button".',
  },
  notes: 'accessibilityLabel / accessibilityRole (newer RN also supports aria-* props and role); hitSlop on Pressable. VoiceOver (iOS) and TalkBack (Android) are the built-in screen readers. Mr. Alvarez is a narrated regular. Tap target guidance per Chapter 1.',
};

export default lesson;
