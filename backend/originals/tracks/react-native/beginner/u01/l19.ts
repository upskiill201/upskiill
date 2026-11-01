import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 19. Chat with Tey + build: one button (Pressable, onPress, Alert), big enough for a thumb. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Build: one button, one promise',
  summary: 'Every customer who sees v0.1 asks the same thing: "Where do I order?" Ordering arrives in v0.3. Tonight Theo adds the button, and a promise that it\'s coming.',
  minutes: 13,
  outcomes: ['Make a tappable button with Pressable', 'Run code when it\'s tapped with onPress', 'Show a message with Alert'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Customers keep tapping the menu, hoping something happens. What should be on the screen?', replies: ['A button!', 'An order form'] },
        { tey: 'A button. The form is Chapter 3. In React Native, anything you tap is usually a Pressable, with a Text inside it for the label.', replies: ['How do I make it do something?'] },
        { tey: 'onPress. You give it a function to run on each tap: onPress={() => Alert.alert(\'Coming in v0.3\')}. The arrow function from lesson 6, finally earning its keep.', replies: ['What\'s Alert?'] },
        { tey: 'A pop-up message, built into React Native: Alert.alert(title, message). Import it from \'react-native\' like View and Text.', replies: ['Anything else?'] },
        { tey: 'Make it big: at least 44 to 48 points tall, from lesson 12, with a strong background colour. A button nobody can hit is a promise nobody can keep.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Tap it',
      caption: 'Tap "Order ahead" in the phone. Then change the alert\'s message.',
      code: `import { View, Text, Pressable, Alert } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 34, fontWeight: 'bold' }}>Pho Real</Text>
      <Pressable
        onPress={() => Alert.alert('Coming in v0.3', 'Ordering ahead arrives in the next update.')}
        style={{ backgroundColor: '#9a3412', paddingVertical: 16, borderRadius: 14, marginTop: 24, alignItems: 'center' }}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Order ahead</Text>
      </Pressable>
    </View>
  );
}
`,
      challenge: 'Change the button\'s label to "Order ahead (soon)".',
    },
  ],
  apply: {
    scenario: 'The first button.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which component makes something tappable?',
        options: [
          { text: 'Text', why: 'Text shows words. Wrap it in a Pressable to make it tappable.' },
          { text: 'Pressable' },
          { text: 'View', why: 'A View is a box. Taps need a Pressable.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make an "Order ahead" button that shows an alert titled "Coming in v0.3" when tapped',
        starter: `import { View, Text, Pressable, Alert } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 34, fontWeight: 'bold' }}>Pho Real</Text>
    </View>
  );
}
`,
        solution: `import { View, Text, Pressable, Alert } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 34, fontWeight: 'bold' }}>Pho Real</Text>
      <Pressable onPress={() => Alert.alert('Coming in v0.3')}>
        <Text>Order ahead</Text>
      </Pressable>
    </View>
  );
}
`,
        hint: '<Pressable onPress={() => Alert.alert(\'Coming in v0.3\')}> with <Text>Order ahead</Text> inside, then </Pressable>.',
        checks: [
          { message: 'There\'s an "Order ahead" button', screen: { button: 'Order ahead' } },
          { message: 'Tapping it says "Coming in v0.3"', screen: { tap: ['Order ahead'], text: 'Coming in v0.3' } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Run code when the button is tapped.',
        language: 'typescript',
        template: "<Pressable [[1]]={() => Alert.[[2]]('Coming in v0.3')}>",
        blanks: [['onPress'], ['alert']],
        distractors: ['onClick', 'show', 'onTap'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'Why onPress and not onClick, like websites?',
        options: [
          { text: 'They\'re the same, use either.', why: 'Pressable listens for onPress. onClick is a web thing.' },
          { text: 'Phones don\'t click, they press. React Native\'s Pressable uses onPress.' },
          { text: 'onClick is for mice only, so it\'s banned.', why: 'Close, but the real answer: Pressable\'s prop is onPress.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the button easy to hit: give the Pressable paddingVertical of 16 or more and a backgroundColor',
        starter: `import { View, Text, Pressable, Alert } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Pressable onPress={() => Alert.alert('Coming in v0.3')}>
        <Text style={{ fontSize: 18 }}>Order ahead</Text>
      </Pressable>
    </View>
  );
}
`,
        solution: `import { View, Text, Pressable, Alert } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Pressable
        onPress={() => Alert.alert('Coming in v0.3')}
        style={{ paddingVertical: 16, backgroundColor: '#9a3412', borderRadius: 14, alignItems: 'center' }}
      >
        <Text style={{ fontSize: 18, color: 'white' }}>Order ahead</Text>
      </Pressable>
    </View>
  );
}
`,
        hint: 'Add style={{ paddingVertical: 16, backgroundColor: \'#9a3412\' }} to the Pressable.',
        checks: [
          { message: 'Padding of 16 or more', screen: { style: { of: 'Order ahead', prop: 'paddingVertical', min: 16 } } },
          { message: 'A background colour', codeIncludes: 'backgroundColor' },
          { message: 'Still shows the alert', screen: { tap: ['Order ahead'], text: 'Coming in v0.3' } },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the button\'s code in order.',
        language: 'typescript',
        lines: ['<Pressable', "  onPress={() => Alert.alert('Coming in v0.3')}", '>', '  <Text>Order ahead</Text>', '</Pressable>'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['Pressable', 'Makes it tappable'],
          ['onPress', 'What happens on a tap'],
          ['Alert.alert', 'Shows a pop-up message'],
          ['paddingVertical: 16', 'Makes it big enough for a thumb'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The alert crashes with "Alert is not defined". What\'s missing?',
        options: [
          { text: 'Alert in the import line from \'react-native\'' },
          { text: 'A second button', why: 'The error names Alert: it isn\'t imported.' },
          { text: 'A newer phone', why: 'It\'s the import, not the phone.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which version does ordering ahead really arrive? (Like v0.0)',
        answers: ['v0.3', '0.3', 'V0.3'],
        placeholder: 'v0.0',
      },
      {
        kind: 'mcq',
        prompt: 'Why tell customers "Coming in v0.3" instead of hiding the button until it works?',
        options: [
          { text: 'To trick them', why: 'It\'s honest: it says what\'s coming and when.' },
          { text: 'Buttons can\'t be hidden', why: 'They can. It\'s a choice about honesty and expectations.' },
          { text: 'It answers "Where do I order?" honestly and tells them it\'s coming soon' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one promise your app (or your work) makes to people? How do you tell them honestly when it\'s not ready yet?',
    starters: ['The promise:...', 'I\'d tell them...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Put the button on your phone with Expo Go and tap it with your thumb, one-handed. Then try it with the phone\'s text size turned up in Settings.',
  },
  notes: 'Pressable with onPress; Alert.alert(title, message?, buttons?) is part of react-native. Tap targets: Apple 44pt, Android 48dp (lesson 12). In the runner, Alert shows an in-preview dialog (react-native-web\'s Alert is a no-op).',
};

export default lesson;
