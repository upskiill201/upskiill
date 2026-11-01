import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 12. Before/After: the order notes box (multiline, maxLength, a helpful placeholder, a character count). */
const lesson: OriginalLesson = {
  key: 'l12',
  title: '"Two limes, please"',
  summary: 'Mai wants to write "two limes". A regular wants "broth on the side". Theo adds a notes box, and the first test note is 400 characters about someone\'s day. See what a few props change.',
  minutes: 12,
  outcomes: ['Make a multiline notes box', 'Limit how much people can type with maxLength', 'Guide people with an example placeholder and a counter'],
  learn: [
    {
      kind: 'compare',
      title: 'The notes box',
      before: {
        label: 'Before: a one-line box with no hints',
        text: '<TextInput\n  value={notes}\n  onChangeText={setNotes}\n  placeholder="Notes"\n/>',
      },
      after: {
        label: 'After: room to write, a limit, an example',
        text: '<TextInput\n  value={notes}\n  onChangeText={setNotes}\n  placeholder="e.g. no onions, two limes"\n  multiline\n  maxLength={80}\n  style={styles.notes}\n/>\n<Text style={styles.count}>{notes.length}/80</Text>',
      },
      notes: [
        'multiline lets the box grow over several lines, so people can see what they wrote.',
        'maxLength={80} stops it at 80 characters. Ray reads tickets in a hurry; a short note gets read.',
        'An example placeholder ("e.g. no onions, two limes") shows people what kind of note helps.',
        'notes.length counts the characters, so the counter "12/80" updates as they type. Every string has a length.',
        'Notes are for small requests. Big changes (size, extras) stay as taps, so they\'re never misspelled.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Notes with a counter',
      caption: 'Type a note in the phone and watch the counter. Try to go past 80.',
      code: `import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function App() {
  const [notes, setNotes] = useState('');

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>Anything else?</Text>
      <TextInput
        style={styles.notes}
        placeholder="e.g. no onions, two limes"
        value={notes}
        onChangeText={setNotes}
        multiline
        maxLength={80}
      />
      <Text style={styles.count}>{notes.length}/80</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 8, backgroundColor: '#fff7ed' },
  label: { fontSize: 16, fontWeight: 'bold' },
  notes: { borderWidth: 2, borderColor: '#fed7aa', borderRadius: 12, padding: 14, fontSize: 16, minHeight: 80, backgroundColor: '#ffffff' },
  count: { fontSize: 13, color: '#78716c', textAlign: 'right' },
});
`,
      challenge: 'Change maxLength to 40. Would "broth on the side, extra lime, no herbs" still fit?',
    },
  ],
  apply: {
    scenario: 'Notes for Ray.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each prop to what it does.',
        pairs: [
          ['multiline', 'The box grows over several lines'],
          ['maxLength={80}', 'Stops at 80 characters'],
          ['placeholder="e.g. ..."', 'Shows an example note'],
          ['notes.length', 'How many characters so far'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add a notes box (placeholder "e.g. no onions, two limes", multiline, maxLength 80) and show "Notes: " plus what was typed',
        starter: `import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export default function App() {
  const [notes, setNotes] = useState('');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>

    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export default function App() {
  const [notes, setNotes] = useState('');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <TextInput
        placeholder="e.g. no onions, two limes"
        value={notes}
        onChangeText={setNotes}
        multiline
        maxLength={80}
      />
      <Text>Notes: {notes}</Text>
    </View>
  );
}
`,
        hint: 'A TextInput with placeholder, value={notes}, onChangeText={setNotes}, multiline and maxLength={80}, then <Text>Notes: {notes}</Text>.',
        checks: [
          { message: 'Typing "two limes" shows it', screen: { fill: [{ field: 'e.g. no onions, two limes', text: 'two limes' }], text: 'Notes: two limes' } },
          { message: 'Limited to 80 characters', codeIncludes: 'maxLength={80}' },
          { message: 'Multiline', codeIncludes: 'multiline' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why limit notes to 80 characters?',
        options: [
          { text: 'A short note gets read during the rush; a long story doesn\'t' },
          { text: 'Phones can\'t store more', why: 'They can. It\'s for Ray, reading in a rush.' },
          { text: 'To save data', why: 'A few characters cost nothing. It\'s about being read.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'Why not let people choose Large in the notes too? Fewer buttons.',
        options: [
          { text: 'Taps can\'t be misspelled. "lrg" and "larg" would end up as the wrong bowl. Notes are just for small extras.' },
          { text: 'Good idea, I\'ll delete the size buttons.', why: 'Then every order is free text to decode.' },
          { text: 'Because notes are slow to load.', why: 'Not the reason: taps are clearer than typing.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a counter under the notes box that shows "{length}/80", e.g. "9/80" after typing "two limes"',
        starter: `import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export default function App() {
  const [notes, setNotes] = useState('');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <TextInput placeholder="Notes" value={notes} onChangeText={setNotes} maxLength={80} />
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export default function App() {
  const [notes, setNotes] = useState('');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <TextInput placeholder="Notes" value={notes} onChangeText={setNotes} maxLength={80} />
      <Text>{notes.length}/80</Text>
    </View>
  );
}
`,
        hint: 'Add <Text>{notes.length}/80</Text> under the TextInput.',
        checks: [
          { message: 'Starts at 0/80', screen: { text: '0/80' } },
          { message: 'After "two limes": 9/80', screen: { fill: [{ field: 'Notes', text: 'two limes' }], text: '9/80' } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A notes box that grows and stops at 80.',
        language: 'typescript',
        template: '<TextInput [[1]] [[2]]={80} />',
        blanks: [['multiline'], ['maxLength']],
        distractors: ['rows', 'limit', 'wrap'],
      },
      {
        kind: 'sortGroups',
        prompt: 'A tap choice or a note?',
        groups: ['Tap choice', 'Note'],
        items: [
          { text: 'Large or small', group: 0 },
          { text: 'Broth on the side', group: 1 },
          { text: 'Extra brisket', group: 0 },
          { text: 'Two limes', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many characters are in "two limes"? (Count the space too.)',
        answers: ['9', 'nine'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the counter show after typing "no onions"?',
        code: '<Text>{notes.length}/80</Text>',
        language: 'typescript',
        options: [
          { text: '8/80', why: 'Count the space: n-o-space-o-n-i-o-n-s is 9.' },
          { text: '80/80', why: 'That\'s the limit, not the count.' },
          { text: '9/80' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'The notes box only shows one line, and long notes disappear sideways. Which line is missing something?',
        language: 'typescript',
        lines: ['<TextInput', '  value={notes}', '  onChangeText={setNotes}', '  maxLength={80}', '/>'],
        bug: 3,
        fix: '  maxLength={80}\n  multiline',
        explanation: 'Without multiline, the box is a single line. Add multiline so the note wraps.',
      },
    ],
  },
  reflect: {
    prompt: 'Which things in your own app should be taps, and which should be typed notes? Why?',
    starters: ['Taps:...', 'Notes:...', 'Because...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'On your phone, type a long note and watch multiline grow the box. Then check the keyboard\'s return key: in a multiline box it makes a new line.',
  },
  notes: 'TextInput multiline, maxLength, placeholder; String.length. "no onions" = 9 characters; "two limes" = 9 characters.',
};

export default lesson;
