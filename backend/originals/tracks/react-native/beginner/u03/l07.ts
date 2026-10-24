import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Reading: extras as true/false state, toggling with !, showing things only when true (&&, ternary). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Extras on, extras off',
  summary: 'Extra brisket, extra noodles, no onions. Each is a yes or a no. Read how true/false state, one exclamation mark and a little && turn them into toggles.',
  minutes: 13,
  outcomes: ['Store yes/no choices as true/false state', 'Flip a value with setX(!x)', 'Show something only when a value is true'],
  learn: [
    {
      kind: 'reading',
      title: 'Yes or no, on or off',
      html: '<p>The bowl has three yes-or-no choices: <strong>extra brisket</strong> (+$3.00), <strong>extra noodles</strong> (+$1.50) and <strong>no onions</strong> (free). Each is a <strong>boolean</strong>: a value that\'s only ever <code>true</code> or <code>false</code>.</p><pre><code>const [brisket, setBrisket] = useState(false);</code></pre><h3>Flip it with !</h3><p>The exclamation mark means "not". <code>!true</code> is false and <code>!false</code> is true. So one button can turn an extra on AND off:</p><pre><code>onPress={() => setBrisket(!brisket)}</code></pre><p>That\'s a <strong>toggle</strong>. Tap once: on. Tap again: off. Customers expect exactly this.</p><h3>Show it only when it\'s true</h3><p>In JSX, <code>{brisket &amp;&amp; &lt;Text&gt;+ extra brisket&lt;/Text&gt;}</code> shows the line only when brisket is true. When it\'s false, nothing appears.</p><p>For either/or, use the ternary from last lesson: <code>{onions ? \'With onions\' : \'No onions\'}</code>.</p><blockquote>&amp;&amp; for "show this or nothing". The ternary for "show this or that".</blockquote><h3>Name booleans like questions</h3><p><code>brisket</code> reads fine, but <code>hasBrisket</code> or <code>noOnions</code> reads like a yes/no question. Pick names that make the if statements read like English.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Toggle the extras',
      caption: 'Tap the extras on and off. The summary only shows the ones that are on.',
      code: `import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [brisket, setBrisket] = useState(false);
  const [noodles, setNoodles] = useState(false);

  return (
    <View style={styles.screen}>
      <Pressable style={[styles.chip, brisket && styles.chipOn]} onPress={() => setBrisket(!brisket)}>
        <Text style={brisket ? styles.textOn : styles.text}>Extra brisket +$3.00</Text>
      </Pressable>
      <Pressable style={[styles.chip, noodles && styles.chipOn]} onPress={() => setNoodles(!noodles)}>
        <Text style={noodles ? styles.textOn : styles.text}>Extra noodles +$1.50</Text>
      </Pressable>
      <Text style={styles.summary}>Large pho</Text>
      {brisket && <Text style={styles.extra}>+ extra brisket</Text>}
      {noodles && <Text style={styles.extra}>+ extra noodles</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 12, backgroundColor: '#fff7ed' },
  chip: { paddingVertical: 14, borderRadius: 14, borderWidth: 2, borderColor: '#9a3412', alignItems: 'center' },
  chipOn: { backgroundColor: '#9a3412' },
  text: { fontSize: 16, fontWeight: 'bold', color: '#9a3412' },
  textOn: { fontSize: 16, fontWeight: 'bold', color: '#ffffff' },
  summary: { fontSize: 20, fontWeight: 'bold', marginTop: 12 },
  extra: { fontSize: 16, color: '#1c1917' },
});
`,
      challenge: 'Add a "No onions" toggle that shows "No onions" in the summary when it\'s on.',
    },
  ],
  apply: {
    scenario: 'Extras for the bowl.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does setBrisket(!brisket) do?',
        options: [
          { text: 'Always turns brisket on', why: '! flips it: on becomes off too.' },
          { text: 'Deletes brisket', why: 'It flips true and false.' },
          { text: 'Flips it: true becomes false, false becomes true' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make "Extra brisket" a toggle (setBrisket(!brisket)) and show "+ extra brisket" only when it\'s on',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [brisket, setBrisket] = useState(false);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setBrisket(true)}>
        <Text>Extra brisket</Text>
      </Pressable>
      <Text>Large pho</Text>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [brisket, setBrisket] = useState(false);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setBrisket(!brisket)}>
        <Text>Extra brisket</Text>
      </Pressable>
      <Text>Large pho</Text>
      {brisket && <Text>+ extra brisket</Text>}
    </View>
  );
}
`,
        hint: 'onPress={() => setBrisket(!brisket)}, and under "Large pho": {brisket && <Text>+ extra brisket</Text>}.',
        checks: [
          { message: 'Hidden at first', screen: { noText: '+ extra brisket' } },
          { message: 'One tap shows it', screen: { tap: ['Extra brisket'], text: '+ extra brisket' } },
          { message: 'A second tap hides it again', screen: { tap: ['Extra brisket', 'Extra brisket'], noText: '+ extra brisket' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: '&& or the ternary?',
        groups: ['&& (this or nothing)', 'Ternary (this or that)'],
        items: [
          { text: 'Show "+ extra brisket" only if it\'s on', group: 0 },
          { text: '"With onions" or "No onions"', group: 1 },
          { text: 'A "Sold out" badge only when sold out', group: 0 },
          { text: 'Rust chip or outline chip', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Show the noodles line only when it\'s on.',
        language: 'typescript',
        template: '{noodles [[1]] <Text>+ extra noodles</Text>}',
        blanks: [['&&']],
        distractors: ['?', '||', '=='],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'I tapped Extra noodles by accident. Now I\'m stuck with noodles forever?',
        options: [
          { text: 'Yes, sorry.', why: 'With a toggle, tapping again turns it off.' },
          { text: 'Tap it again. It\'s a toggle: on, off, on.' },
          { text: 'Restart the app.', why: 'No need: tapping again flips it back.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'brisket is false. What appears?',
        code: '<Text>Large pho</Text>\n{brisket && <Text>+ extra brisket</Text>}',
        language: 'typescript',
        options: [
          { text: 'Only "Large pho"' },
          { text: '"Large pho" and "false"', why: 'React shows nothing for false.' },
          { text: '"Large pho" and "+ extra brisket"', why: 'Only when brisket is true.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a "No onions" toggle: noOnions starts false; the summary says "No onions" when it\'s on and "With onions" when it\'s off',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Text>Large pho</Text>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [noOnions, setNoOnions] = useState(false);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setNoOnions(!noOnions)}>
        <Text>Hold the onions</Text>
      </Pressable>
      <Text>Large pho</Text>
      <Text>{noOnions ? 'No onions' : 'With onions'}</Text>
    </View>
  );
}
`,
        hint: "const [noOnions, setNoOnions] = useState(false); a 'Hold the onions' Pressable that flips it; <Text>{noOnions ? 'No onions' : 'With onions'}</Text>.",
        checks: [
          { message: 'Starts "With onions"', screen: { text: 'With onions' } },
          { message: 'Tapping "Hold the onions" says "No onions"', screen: { tap: ['Hold the onions'], text: 'No onions' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each extra to its price.',
        pairs: [
          ['Extra brisket', '+$3.00'],
          ['Extra noodles', '+$1.50'],
          ['No onions', 'Free'],
          ['Extra lime', 'Always free'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is !true?',
        answers: ['false'],
        placeholder: 'true or false',
      },
      {
        kind: 'findBug',
        prompt: 'The brisket toggle turns on but never off. Which line?',
        language: 'typescript',
        lines: ['const [brisket, setBrisket] = useState(false);', '<Pressable onPress={() => setBrisket(true)}>', '{brisket && <Text>+ extra brisket</Text>}'],
        bug: 1,
        fix: '<Pressable onPress={() => setBrisket(!brisket)}>',
        explanation: 'setBrisket(true) only ever turns it on. Flip it with !brisket.',
      },
    ],
  },
  reflect: {
    prompt: 'List three yes/no choices in an app you\'d build. Name each like a question (hasX, isY, noZ).',
    starters: ['1:...', '2:...', '3:...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'React\'s docs page "Conditional Rendering" covers &&, the ternary and one trap: {count && ...} shows 0 when count is 0. Use count > 0 && ... instead.',
  },
  notes: 'Booleans, logical NOT, && and ternary rendering. Note the 0 && trap (mentioned in Deepen). Prices per outline.',
};

export default lesson;
