import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 11. Walkthrough: the Image component (uri source, required size, resizeMode, borderRadius, accessibilityLabel). */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Pictures on the menu',
  summary: 'Every customer at the preview asked the same thing: "What does it look like?" Mai has drawn every dish for the menu. Time to put pictures in the app, and learn why an image with no size is invisible.',
  minutes: 13,
  outcomes: ['Show a picture with the Image component', 'Give every image a width and height', 'Describe images for people who can\'t see them'],
  learn: [
    {
      kind: 'steps',
      title: 'An image, step by step',
      steps: [
        {
          title: '1. Import Image',
          body: 'Image comes from \'react-native\', like View and Text.',
        },
        {
          title: '2. Point it at a picture with source',
          body: 'For a picture on the internet, source is an object with a uri. In these lessons, Pho Real\'s pictures live at /originals/react-native/.',
          code: "<Image source={{ uri: '/originals/react-native/pho.png' }} />",
          language: 'typescript',
        },
        {
          title: '3. Give it a size, or it\'s invisible',
          body: 'An image loaded from a uri has no size until you give it one. Without width and height it\'s 0 by 0: there, but invisible. This catches everyone once.',
          code: "<Image\n  source={{ uri: '/originals/react-native/pho.png' }}\n  style={{ width: 120, height: 120 }}\n/>",
          language: 'typescript',
        },
        {
          title: '4. Round the corners and choose how it fills',
          body: 'borderRadius rounds the corners (half the width makes a circle). resizeMode: \'cover\' fills the box and crops the edges; \'contain\' shows the whole picture.',
          code: "style={{ width: 120, height: 120, borderRadius: 16 }}\nresizeMode=\"cover\"",
          language: 'typescript',
        },
        {
          title: '5. Describe it',
          body: 'accessibilityLabel="A bowl of pho" lets a screen reader say what the picture shows. People who can\'t see it still know what they\'re ordering.',
        },
        {
          title: '6. On your own phone',
          body: 'A real phone needs the full web address: \'https://teyro.app/originals/react-native/pho.png\'. Pictures inside your project can also use require(\'./assets/pho.png\'), which you\'ll meet when you build your own app.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Pho, pictured',
      caption: 'Delete the style line and watch the picture vanish (0 by 0). Then put it back.',
      code: `import { View, Text, Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Image
        source={{ uri: '/originals/react-native/pho.png' }}
        style={styles.photo}
        accessibilityLabel="A bowl of pho with brisket and lime"
      />
      <Text style={styles.name}>Large pho $13.50</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, alignItems: 'center', backgroundColor: '#fff7ed' },
  photo: { width: 200, height: 200, borderRadius: 24 },
  name: { fontSize: 20, fontWeight: 'bold', marginTop: 16 },
});
`,
      challenge: 'Swap pho.png for banh-mi.png, and change the text to match.',
    },
  ],
  apply: {
    scenario: 'Pictures for the menu.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Theo\'s image doesn\'t show at all, and there\'s no error. Most likely cause?',
        options: [
          { text: 'The picture is too big', why: 'Big pictures still show. An image with no size is 0 by 0.' },
          { text: 'It has no width and height, so it\'s 0 by 0' },
          { text: 'Images don\'t work on Android', why: 'They do. It needs a size.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Show the banh mi picture (/originals/react-native/banh-mi.png) at 120 by 120 above its name',
        starter: `import { View, Text, Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.name}>Banh mi $9.00</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  name: { fontSize: 20, fontWeight: 'bold' },
});
`,
        solution: `import { View, Text, Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Image source={{ uri: '/originals/react-native/banh-mi.png' }} style={styles.photo} />
      <Text style={styles.name}>Banh mi $9.00</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  photo: { width: 120, height: 120 },
  name: { fontSize: 20, fontWeight: 'bold' },
});
`,
        hint: "<Image source={{ uri: '/originals/react-native/banh-mi.png' }} style={styles.photo} /> and photo: { width: 120, height: 120 }.",
        checks: [
          { message: 'There\'s a picture', screen: { images: 1 } },
          { message: 'It\'s the banh mi', codeIncludes: 'banh-mi.png' },
          { message: 'It has a width', codeIncludes: 'width' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A picture from a web address.',
        language: 'typescript',
        template: "<Image [[1]]={{ [[2]]: '/originals/react-native/pho.png' }} />",
        blanks: [['source'], ['uri']],
        distractors: ['src', 'url', 'href'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each prop or style to what it does.',
        pairs: [
          ['source={{ uri: ... }}', 'Which picture to show'],
          ['width and height', 'Makes it visible at all'],
          ['borderRadius: 16', 'Rounded corners'],
          ['accessibilityLabel', 'What a screen reader says'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'Why write "A bowl of pho" on the picture? Everyone can see it\'s pho.',
        options: [
          { text: 'Not everyone can see. A screen reader reads that label out loud to blind and low-vision customers.' },
          { text: 'For search engines.', why: 'In an app it\'s for screen readers, so everyone knows what they\'re ordering.' },
          { text: 'No reason, I\'ll delete it.', why: 'It\'s how blind and low-vision customers know what the picture is.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the iced coffee picture round: 96 by 96 with borderRadius 48, and give it an accessibilityLabel',
        starter: `import { View, Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Image source={{ uri: '/originals/react-native/iced-coffee.png' }} style={styles.photo} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  photo: { width: 96, height: 96 },
});
`,
        solution: `import { View, Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Image
        source={{ uri: '/originals/react-native/iced-coffee.png' }}
        style={styles.photo}
        accessibilityLabel="An iced coffee"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64 },
  photo: { width: 96, height: 96, borderRadius: 48 },
});
`,
        hint: 'Add borderRadius: 48 to styles.photo, and accessibilityLabel="An iced coffee" to the Image.',
        checks: [
          { message: 'The picture shows', screen: { images: 1 } },
          { message: 'Rounded with borderRadius 48', codeIncludes: 'borderRadius: 48' },
          { message: 'It has an accessibilityLabel', codeIncludes: 'accessibilityLabel' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'cover or contain?',
        groups: ['cover', 'contain'],
        items: [
          { text: 'Fill the whole box, crop the edges', group: 0 },
          { text: 'Show the whole picture, maybe with empty space', group: 1 },
          { text: 'A food photo in a square card', group: 0 },
          { text: 'A logo that must never be cut off', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'For a 96 by 96 picture, what borderRadius makes a perfect circle?',
        answers: ['48'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Your app works in the preview, but on your phone the pictures with \'/originals/...\' are blank. Why?',
        options: [
          { text: 'Phones can\'t show PNGs', why: 'They can. The phone needs the full web address.' },
          { text: 'The images are too small', why: 'Size isn\'t it: the address is incomplete for a phone.' },
          { text: 'A phone needs the full address: https://teyro.app/originals/react-native/...' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes the picture invisible?',
        language: 'typescript',
        lines: ["<Image", "  source={{ uri: '/originals/react-native/pho.png' }}", '  style={{ borderRadius: 16 }}', '/>'],
        bug: 2,
        fix: '  style={{ width: 120, height: 120, borderRadius: 16 }}',
        explanation: 'No width or height, so the picture is 0 by 0.',
      },
    ],
  },
  reflect: {
    prompt: 'Think of an app where pictures matter more than words. What would happen if all the pictures disappeared?',
    starters: ['The app:...', 'Without pictures...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'On your phone, use the full address https://teyro.app/originals/react-native/pho.png in your Image. Then turn on VoiceOver (iPhone) or TalkBack (Android) and tap the picture to hear its label.',
  },
  notes: 'Image: network images need explicit dimensions (RN docs "Images"); resizeMode cover/contain; accessibilityLabel read by VoiceOver/TalkBack. Lesson pictures are Teyro-made illustrations in frontend/public/originals/react-native/ (rendered from backend/originals/covers/react-native-dishes.html). Relative /originals/ URLs resolve in the in-lesson preview; real devices need the full https URL (works once deployed).',
};

export default lesson;
