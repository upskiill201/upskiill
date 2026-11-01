import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 16. Build: the home screen (Header with title and tagline, a festival banner, Footer). */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Build: the home screen',
  summary: 'After close, the truck smells of star anise and bleach. Linh says "Show me." Theo has one evening to build the real home screen of v0.1. Build it with him, piece by piece.',
  minutes: 14,
  outcomes: ['Build a real home screen from components', 'Combine readable sizes, props and a clean App', 'Ship the first piece of v0.1'],
  learn: [
    {
      kind: 'text',
      html: '<p>Tonight\'s plan, from Theo\'s napkin:</p><ul><li><strong>Header</strong>: "Pho Real", big and bold, with the tagline under it.</li><li><strong>Banner</strong>: a line about the festival, with the number of days to go passed in as a prop.</li><li><strong>Footer</strong>: opening hours and the street.</li></ul><p>App just lists the pieces in order. Every piece uses what you already know: View, Text, props, readable sizes.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Home screen, first pass',
      caption: 'The Header is done. Banner takes a prop called days. Change days={30} to 29 and see the banner update.',
      code: `import { View, Text } from 'react-native';

function Header() {
  return (
    <View>
      <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#9a3412' }}>Pho Real</Text>
      <Text style={{ fontSize: 18, marginTop: 4 }}>Order ahead. Skip the line.</Text>
    </View>
  );
}

function Banner({ days }: { days: number }) {
  return <Text style={{ fontSize: 16, marginTop: 24 }}>Eastside Food Truck Festival in {days} days</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, backgroundColor: '#fff7ed' }}>
      <Header />
      <Banner days={30} />
    </View>
  );
}
`,
      challenge: 'Add a Footer component with "Open 11 a.m. to 3 p.m., East 6th Street" and put it after the Banner.',
    },
  ],
  apply: {
    scenario: 'Building v0.1\'s home screen.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the Header: "Pho Real" at size 32 or more, then the tagline "Order ahead. Skip the line." at size 16 or more',
        starter: `import { View, Text } from 'react-native';

function Header() {
  return (
    <View>

    </View>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Header />
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

function Header() {
  return (
    <View>
      <Text style={{ fontSize: 34, fontWeight: 'bold' }}>Pho Real</Text>
      <Text style={{ fontSize: 18 }}>Order ahead. Skip the line.</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Header />
    </View>
  );
}
`,
        hint: 'Inside Header\'s View: <Text style={{ fontSize: 34, fontWeight: \'bold\' }}>Pho Real</Text>, then a Text for the tagline with fontSize: 18.',
        checks: [
          { message: 'A big "Pho Real" title (32 or more)', screen: { style: { of: 'Pho Real', prop: 'fontSize', min: 32 } } },
          { message: 'The tagline, size 16 or more', screen: { style: { of: 'Skip the line', prop: 'fontSize', min: 16 } } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the Banner take days as a prop instead of typing 30 inside it?',
        options: [
          { text: 'Tomorrow it\'s 29: App changes one number and the Banner updates' },
          { text: 'Props make text bigger', why: 'Props pass details in; size is style.' },
          { text: 'Because numbers aren\'t allowed in Text', why: 'They are, in braces. The prop is about changing it easily.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a Footer component that shows "Open 11 a.m. to 3 p.m., East 6th Street" and use it after the Banner',
        starter: `import { View, Text } from 'react-native';

function Banner({ days }: { days: number }) {
  return <Text style={{ fontSize: 16 }}>Eastside Food Truck Festival in {days} days</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 34, fontWeight: 'bold' }}>Pho Real</Text>
      <Banner days={30} />
    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

function Banner({ days }: { days: number }) {
  return <Text style={{ fontSize: 16 }}>Eastside Food Truck Festival in {days} days</Text>;
}

function Footer() {
  return <Text style={{ fontSize: 14, marginTop: 24 }}>Open 11 a.m. to 3 p.m., East 6th Street</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 34, fontWeight: 'bold' }}>Pho Real</Text>
      <Banner days={30} />
      <Footer />
    </View>
  );
}
`,
        hint: 'function Footer() { return <Text>Open 11 a.m. to 3 p.m., East 6th Street</Text>; } then <Footer /> after <Banner days={30} />.',
        checks: [
          { message: 'The footer shows the hours and street', screen: { text: 'Open 11 a.m. to 3 p.m., East 6th Street' } },
          { message: 'The banner still shows', screen: { text: 'Festival in 30 days' } },
          { message: 'A Footer component', codeIncludes: 'function Footer' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Pass the number of days to the Banner.',
        language: 'typescript',
        template: '<Banner [[1]]={[[2]]} />',
        blanks: [['days'], ['29']],
        distractors: ['day', '"29"', 'count'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'Why is the title that orange-brown colour?',
        options: [
          { text: 'It looked cool.', why: 'Maybe, but Theo had a better reason: it matches the truck.' },
          { text: 'It\'s the colour of the truck\'s sign. People should recognise us before they read a word.' },
          { text: 'Random.', why: 'Colours on a brand\'s app should never be random.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the banner say?',
        code: '<Banner days={12} />\n// Banner shows: Eastside Food Truck Festival in {days} days',
        language: 'typescript',
        options: [
          { text: 'Eastside Food Truck Festival in {days} days', why: 'Braces show the value: 12.' },
          { text: 'Eastside Food Truck Festival in days days', why: 'days is the prop\'s value, 12.' },
          { text: 'Eastside Food Truck Festival in 12 days' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the home screen from top to bottom.',
        language: 'typescript',
        lines: ['<View style={styles.screen}>', '  <Header />', '  <Banner days={30} />', '  <Footer />', '</View>'],
      },
      {
        kind: 'writeCode',
        prompt: 'Put it together: App shows Header, then Banner with 29 days, then Footer',
        starter: `import { View, Text } from 'react-native';

function Header() {
  return <Text style={{ fontSize: 34, fontWeight: 'bold' }}>Pho Real</Text>;
}

function Banner({ days }: { days: number }) {
  return <Text style={{ fontSize: 16 }}>Eastside Food Truck Festival in {days} days</Text>;
}

function Footer() {
  return <Text style={{ fontSize: 14 }}>Open 11 a.m. to 3 p.m.</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>

    </View>
  );
}
`,
        solution: `import { View, Text } from 'react-native';

function Header() {
  return <Text style={{ fontSize: 34, fontWeight: 'bold' }}>Pho Real</Text>;
}

function Banner({ days }: { days: number }) {
  return <Text style={{ fontSize: 16 }}>Eastside Food Truck Festival in {days} days</Text>;
}

function Footer() {
  return <Text style={{ fontSize: 14 }}>Open 11 a.m. to 3 p.m.</Text>;
}

export default function App() {
  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Header />
      <Banner days={29} />
      <Footer />
    </View>
  );
}
`,
        hint: 'Inside App\'s View: <Header />, <Banner days={29} />, <Footer />, each on its own line.',
        checks: [
          { message: 'The title shows', screen: { text: 'Pho Real' } },
          { message: 'The banner says 29 days', screen: { text: 'Festival in 29 days' } },
          { message: 'The footer shows', screen: { text: 'Open 11 a.m. to 3 p.m.' } },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days until the festival, at the start of this lesson?',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which component does each line belong in?',
        groups: ['Header', 'Footer'],
        items: [
          { text: 'Pho Real', group: 0 },
          { text: 'Open 11 a.m. to 3 p.m.', group: 1 },
          { text: 'Order ahead. Skip the line.', group: 0 },
          { text: 'East 6th Street', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Sketch the home screen of an app you\'d like to build. Which three components would it have, and which props would they take?',
    starters: ['Components:...', 'Props:...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Put tonight\'s home screen on your phone with Expo Go. Hold it at arm\'s length outside. Does the title read in daylight?',
  },
  notes: 'Build lesson. Colours #9a3412 / #fff7ed echo the truck\'s branding (fictional); colour styling is formally taught in Chapter 2.',
};

export default lesson;
