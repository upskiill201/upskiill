import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 15. Checkpoint 3: lessons 11–14 (TextInput, notes, validation, the order object). */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Linh\'s order',
  summary: 'Linh tries the app herself: her name, a note, and one bowl. She doesn\'t read instructions. If something can go wrong, she\'ll find it. Check names, notes, validation and the order object.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Combine a name box, a notes box and a disabled button', 'Update one order object without losing fields'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 7 a.m.',
      beats: [
        { speaker: 'linh', text: 'I\'m ordering like a customer. Don\'t help me.' },
        { speaker: 'narrator', text: 'She taps Place order before typing anything. Then types her name. Then a note: "less salt please".' },
        { speaker: 'theo', text: '(not helping, very hard)' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: names, notes and a ready order.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the form: name box ("Your name"), notes box ("Notes", maxLength 80), and "Place order" disabled until there\'s a name. Placing shows "Order for Linh: less salt please"',
        starter: `import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [placed, setPlaced] = useState(false);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>

    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [placed, setPlaced] = useState(false);
  const ready = name.trim().length > 0;

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <TextInput placeholder="Your name" value={name} onChangeText={setName} />
      <TextInput placeholder="Notes" value={notes} onChangeText={setNotes} multiline maxLength={80} />
      <Pressable disabled={!ready} onPress={() => setPlaced(true)}>
        <Text>Place order</Text>
      </Pressable>
      {placed && <Text>Order for {name}: {notes}</Text>}
    </View>
  );
}
`,
        hint: 'Two TextInputs, const ready = name.trim().length > 0, disabled={!ready}, and {placed && <Text>Order for {name}: {notes}</Text>}.',
        checks: [
          { message: 'No name: nothing is placed', screen: { tap: ['Place order'], noText: 'Order for' } },
          { message: 'Linh\'s order goes through', screen: { fill: [{ field: 'Your name', text: 'Linh' }, { field: 'Notes', text: 'less salt please' }], tap: ['Place order'], text: 'Order for Linh: less salt please' } },
          { message: 'Notes are limited', codeIncludes: 'maxLength={80}' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Linh tapped Place order before typing her name. What should have happened?',
        options: [
          { text: 'An order for nobody', why: 'That\'s the bug from lesson 13.' },
          { text: 'The app closes', why: 'Nothing should crash. The button just waits.' },
          { text: 'Nothing: the button is disabled, with "Add your name to order" under it' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its lesson.',
        pairs: [
          ['value + onChangeText', 'Whose order is it?'],
          ['multiline + maxLength', '"Two limes, please"'],
          ['disabled={!ready}', 'The empty order'],
          ['{ ...order, size: \'Large\' }', 'One order, one object'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'linh',
        message: 'I wrote my whole life story in the notes and it stopped me. Rude.',
        options: [
          { text: 'It\'s a bug, I\'ll remove the limit.', why: 'The limit is on purpose: Ray reads in a rush.' },
          { text: 'That\'s the 80-character limit. Ray can read 80 characters during the rush. Your life story, not so much.' },
          { text: 'Phones can\'t hold more text.', why: 'They can. The limit is for Ray.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Change the name, keep the rest of the order.',
        language: 'typescript',
        template: 'onChangeText={(text) => setOrder({ [[1]], name: [[2]] })}',
        blanks: [['...order'], ['text']],
        distractors: ['order', 'name', '...text'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Is the order ready to place?',
        groups: ['Ready', 'Not ready'],
        items: [
          { text: 'name is "Linh"', group: 0 },
          { text: 'name is ""', group: 1 },
          { text: 'name is "   "', group: 1 },
          { text: 'name is "Mai"', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'order is { size: \'Large\', qty: 1, name: \'\' }. Linh types "Linh". What is order.size now?',
        code: "onChangeText={(text) => setOrder({ ...order, name: text })}",
        language: 'typescript',
        options: [
          { text: '\'Large\'' },
          { text: 'undefined', why: '...order copied size across.' },
          { text: '\'Linh\'', why: 'Only name changed.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a live counter "{length}/80" under the notes box. Typing "less salt" shows "9/80"',
        starter: `import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export default function App() {
  const [notes, setNotes] = useState('');

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <TextInput placeholder="Notes" value={notes} onChangeText={setNotes} multiline maxLength={80} />
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
      <TextInput placeholder="Notes" value={notes} onChangeText={setNotes} multiline maxLength={80} />
      <Text>{notes.length}/80</Text>
    </View>
  );
}
`,
        hint: '<Text>{notes.length}/80</Text>',
        checks: [
          { message: '"less salt" shows 9/80', screen: { fill: [{ field: 'Notes', text: 'less salt' }], text: '9/80' } },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which string method ignores spaces at the start and end?',
        answers: ['trim', 'trim()', '.trim()'],
        placeholder: 'method',
      },
      {
        kind: 'mcq',
        prompt: 'After her test order, what does Linh say?',
        options: [
          { text: '"Delete it."', why: 'She found nothing to break.' },
          { text: '"Fine. Now show me what Ray would see."' },
          { text: '"Add more colours."', why: 'She cares about the kitchen, not colours.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Ask someone to "order like a customer" in your app without help. Write down the first thing they did that surprised you.',
    starters: ['They...', 'I expected...', 'I\'ll change...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 11–14. "less salt" = 9 characters.',
};

export default lesson;
