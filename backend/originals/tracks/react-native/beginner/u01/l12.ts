import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 12. Reading: text people can actually read (size, contrast, one hand, tap targets). */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Text people can read',
  summary: 'Theo shows v0.1 to the lunch line. A nurse on her break squints, holds the phone at arm\'s length, and hands it back: "I can\'t read that." Read why size and contrast matter so much on a phone.',
  minutes: 13,
  outcomes: ['Pick text sizes that work on a phone', 'Use contrast so text reads in sunlight', 'Make things big enough to tap with one thumb'],
  learn: [
    {
      kind: 'reading',
      title: 'Built for a hand, in the sun, in a hurry',
      html: '<p>Dana is a nurse with a 30-minute break. She reads Theo\'s menu in the Texas sun, holding an iced coffee in one hand and her phone in the other. She can\'t read it, so she walks to the burger truck. <strong>An app nobody can read is an app nobody uses.</strong></p><h3>Size</h3><p>In React Native, <code>fontSize</code> is a number, measured in points that scale with the screen. If you set nothing, text is about 14: fine for small print, too small for a menu. A good starting point:</p><ul><li><strong>Titles:</strong> 28 to 36</li><li><strong>Menu items and main text:</strong> 16 to 20</li><li><strong>Small print</strong> (opening hours, notes): 13 to 14, and never anything important</li></ul><h3>Contrast</h3><p>Pale grey on white looks elegant on a laptop indoors and disappears outdoors. Dark text on a light background (or the reverse) reads in sunlight. Accessibility guidelines (WCAG) ask for a contrast ratio of at least 4.5 to 1 for normal text.</p><h3>One thumb</h3><p>People use phones with one hand. Anything they tap should be big: Apple recommends tap targets of at least 44 by 44 points, and Android 48 by 48. A tiny "Order" link is a button nobody can hit.</p><blockquote>Test it like Dana: arm\'s length, one hand, outside. If you squint, your users leave.</blockquote><h3>Respect their settings</h3><p>Many people make their phone\'s text bigger in Settings. React Native\'s Text grows with that setting by default, so don\'t fight it with tiny fixed boxes that cut words off.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Make it readable',
      caption: 'This menu is too small and too pale. Make the title 32 and the items 18, and change the grey #bbbbbb to a dark #222222.',
      code: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#ffffff' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#bbbbbb' }}>Pho Real</Text>
      <Text style={{ fontSize: 11, color: '#bbbbbb' }}>Large pho $13.50</Text>
      <Text style={{ fontSize: 11, color: '#bbbbbb' }}>Banh mi $9.00</Text>
    </View>
  );
}
`,
      challenge: 'Hold your phone at arm\'s length. Can you read the preview now?',
    },
  ],
  apply: {
    scenario: 'Making v0.1 readable for Dana.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Dana walk away?',
        options: [
          { text: 'The pho was too expensive', why: 'She never got as far as the prices: she couldn\'t read them.' },
          { text: 'The text was too small and too pale to read outside' },
          { text: 'She doesn\'t like apps', why: 'She uses apps all day. This one was unreadable.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the title at least 28 and each menu item at least 16',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Pho Real</Text>
      <Text style={{ fontSize: 11 }}>Large pho $13.50</Text>
      <Text style={{ fontSize: 11 }}>Banh mi $9.00</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Pho Real</Text>
      <Text style={{ fontSize: 18 }}>Large pho $13.50</Text>
      <Text style={{ fontSize: 18 }}>Banh mi $9.00</Text>
    </View>
  );
}
`,
        hint: 'Change the title\'s fontSize to 32, and each menu item\'s fontSize to 18.',
        checks: [
          { message: 'Title size 28 or more', screen: { style: { of: 'Pho Real', prop: 'fontSize', min: 28 } } },
          { message: 'Large pho size 16 or more', screen: { style: { of: 'Large pho', prop: 'fontSize', min: 16 } } },
          { message: 'Banh mi size 16 or more', screen: { style: { of: 'Banh mi', prop: 'fontSize', min: 16 } } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each kind of text to a good size.',
        pairs: [
          ['Title', '28 to 36'],
          ['Menu items', '16 to 20'],
          ['Small print', '13 to 14'],
          ['Nothing set', 'About 14'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Readable in the sun, or not?',
        groups: ['Readable', 'Hard to read'],
        items: [
          { text: 'Dark text on a light background', group: 0 },
          { text: 'Pale grey on white', group: 1 },
          { text: 'White on a strong dark colour', group: 0 },
          { text: 'Yellow on white', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the contrast: make the menu item\'s colour dark (#222222 or black)',
        starter: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#ffffff' }}>
      <Text style={{ fontSize: 18, color: '#cccccc' }}>Large pho $13.50</Text>
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#ffffff' }}>
      <Text style={{ fontSize: 18, color: '#222222' }}>Large pho $13.50</Text>
    </View>
  );
}
`,
        hint: 'Change color: \'#cccccc\' to color: \'#222222\'.',
        checks: [{ message: 'The menu item is dark #222222', screen: { style: { of: 'Large pho', prop: 'color', value: '#222222' } } }],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'Big text looks childish. Make it tiny and grey, like the cool apps.',
        options: [
          { text: 'You\'re right, tiny looks better.', why: 'Looking cool doesn\'t help if Dana can\'t read the price.' },
          { text: 'Cool apps get away with it indoors. Ours is read in the sun with one hand. Readable wins.' },
          { text: 'Text size doesn\'t matter.', why: 'It\'s the difference between an order and a walk to the burger truck.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Apple\'s minimum tap target is 44 by 44 points. What\'s Android\'s? (One number.)',
        answers: ['48', '48 by 48', '48x48'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'A readable title.',
        language: 'typescript',
        template: "<Text style={{ [[1]]: 32, fontWeight: 'bold' }}>Pho Real</Text>",
        blanks: [['fontSize']],
        distractors: ['size', 'font', 'textSize'],
      },
      {
        kind: 'mcq',
        prompt: 'Many people turn up text size in their phone settings. What should your app do?',
        options: [
          { text: 'Let Text grow with the setting, and leave room for bigger words' },
          { text: 'Block the setting', why: 'Those users need bigger text. Fighting it locks them out.' },
          { text: 'Ignore it', why: 'React Native\'s Text follows the setting by default. Don\'t trap it in tiny fixed boxes.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What contrast ratio do accessibility guidelines (WCAG) ask for, for normal text?',
        options: [
          { text: '1.5 to 1', why: 'Far too low: that\'s pale grey on white.' },
          { text: '4.5 to 1' },
          { text: '100 to 1', why: 'There\'s no such requirement. The minimum is 4.5 to 1.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Try the Dana test on an app you use: arm\'s length, one hand, ideally outside. What would you change?',
    starters: ['The app:...', 'I\'d change...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'Search for "WebAIM contrast checker": paste two colours and it tells you if they pass. Try Pho Real\'s colours from this lesson.',
  },
  notes: 'React Native default fontSize is 14. WCAG 2.x AA: contrast at least 4.5:1 for normal text (3:1 for large). Apple HIG: minimum 44x44 pt hit targets; Material Design: 48x48 dp. RN Text respects system font scaling by default (allowFontScaling true). Dana is a narrated regular (outline).',
};

export default lesson;
