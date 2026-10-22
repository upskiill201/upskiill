import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5. Checkpoint 1: lessons 1–4 (useState, setters, handlers, limits, state rules). */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the crew\'s order',
  summary: 'Monday, 12:05. The construction crew walks up: six large phos, fast. Theo wants them to order on the app this time. Check what you know about state, taps and limits.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Build state that changes with taps', 'Keep values within limits'],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 12:05',
      beats: [
        { speaker: 'narrator', text: 'Six hard hats, one phone. The foreman squints at the screen.' },
        { speaker: 'theo', text: 'Tap plus until it says six. Then Large.' },
        { speaker: 'mai', text: 'Bet he finds a bug in ten seconds.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: state and taps.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the crew\'s order: a qty that starts at 1 with a "+" button capped at 10, and a size that starts \'Small\' with a "Large" button. Show "6 x Large" after five + taps and a Large tap.',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>

    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('Small');

  function more() {
    if (qty < 10) setQty(qty + 1);
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64 }}>
      <Text>{qty} x {size}</Text>
      <Pressable onPress={more}><Text>+</Text></Pressable>
      <Pressable onPress={() => setSize('Large')}><Text>Large</Text></Pressable>
    </View>
  );
}
`,
        hint: 'Two useState lines (qty starting 1, size starting \'Small\'), a Text showing {qty} x {size}, a + button with a more() limit, and a Large button.',
        checks: [
          { message: 'Starts "1 x Small"', screen: { text: '1 x Small' } },
          { message: 'Five + then Large shows "6 x Large"', screen: { tap: ['+', '+', '+', '+', '+', 'Large'], text: '6 x Large' } },
          { message: 'Never above 10', screen: { tap: ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'], text: '10 x Small' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the Text update when the foreman taps +?',
        options: [
          { text: 'The setter changes qty and React runs App again with the new value' },
          { text: 'The button edits the Text directly', why: 'Buttons change state; the Text shows the state.' },
          { text: 'The phone reloads the app', why: 'Only the screen redraws; nothing reloads.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'The foreman finds a bug: the + button counts before anyone taps. Which line?',
        language: 'typescript',
        lines: ['function more() {', '  if (qty < 10) setQty(qty + 1);', '}', '<Pressable onPress={more()}><Text>+</Text></Pressable>'],
        bug: 3,
        fix: '<Pressable onPress={more}><Text>+</Text></Pressable>',
        explanation: 'more() runs immediately. Give onPress the function: onPress={more}.',
      },
      {
        kind: 'sortGroups',
        prompt: 'State or fixed value?',
        groups: ['State', 'Fixed'],
        items: [
          { text: 'How many bowls the crew wants', group: 0 },
          { text: 'Linh\'s 10-bowl limit', group: 1 },
          { text: 'Small or Large', group: 0 },
          { text: 'The price of a large', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s answer.',
        from: 'mai',
        message: 'If I put two order cards on the screen, do they share one count?',
        options: [
          { text: 'Yes, one count for both.', why: 'Each copy of a component has its own state.' },
          { text: 'No, each card remembers its own count.' },
          { text: 'Only on Android.', why: 'Same on every phone: each copy has its own state.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The quantity state, starting at 1.',
        language: 'typescript',
        template: 'const [[1]] = useState([[2]]);',
        blanks: [['[qty, setQty]'], ['1']],
        distractors: ['{qty, setQty}', '0', '(qty, setQty)'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its job.',
        pairs: [
          ["useState('Small')", 'Starting size'],
          ['if (qty < 10)', 'The top limit'],
          ["setSize('Large')", 'Changes the size'],
          ['onPress={more}', 'Runs more() on a tap'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What shows after the app is closed and opened again?',
        code: 'const [qty, setQty] = useState(1);\n// the foreman had tapped up to 6',
        language: 'typescript',
        options: [
          { text: '6', why: 'State lives in memory and starts over on reopen.' },
          { text: '0', why: 'It starts from useState(1): 1.' },
          { text: '1: state starts again from its starting value' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many large phos does the crew order?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Did the foreman find a bug in ten seconds?',
        options: [
          { text: 'Yes: he ordered -3 bowls', why: 'The limit stopped that. He found something else.' },
          { text: 'No, but he asked: "Where do I say no onions?"' },
          { text: 'Yes: the app crashed', why: 'It didn\'t crash. He wanted an option it doesn\'t have yet.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one thing in your own app that needs a limit, like Linh\'s 10 bowls? What happens without it?',
    starters: ['It needs a limit on...', 'Without it...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1–4.',
};

export default lesson;
