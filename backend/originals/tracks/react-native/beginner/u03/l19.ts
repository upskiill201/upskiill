import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 19. Reading: placing the order (a placed state, a confirmation screen, an order number, starting again). */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Order #41',
  summary: 'The last missing piece: what happens when someone taps Place order? A number Ray can shout, a screen that says "We\'ve got it", and a way to start the next order. Read how, then build it.',
  minutes: 13,
  outcomes: ['Swap the whole screen with an early return', 'Keep a running order number in state', 'Reset the order for the next customer'],
  learn: [
    {
      kind: 'reading',
      title: 'From building to placed',
      html: '<p>Until now, the order screen only ever showed the builder. After Place order, the customer needs a different screen: the confirmation. One boolean decides which:</p><pre><code>const [placed, setPlaced] = useState(false);</code></pre><h3>Swap the whole screen</h3><p>A component can <code>return</code> early. If the order is placed, App returns the confirmation and never reaches the builder below it:</p><pre><code>if (placed) {\n  return (\n    &lt;View style={styles.screen}&gt;\n      &lt;Text style={styles.big}&gt;Order #{number}&lt;/Text&gt;\n      &lt;Text&gt;Thanks, {order.name}. Listen for your number.&lt;/Text&gt;\n    &lt;/View&gt;\n  );\n}\n\nreturn ( /* the bowl builder */ );</code></pre><p>That\'s the same idea as <code>&amp;&amp;</code>, but for the whole screen instead of one line.</p><h3>A number Ray can shout</h3><p>Ray\'s paper tickets reached #40 at the last market. The app carries on from there, so the number is state too:</p><pre><code>const [number, setNumber] = useState(41);</code></pre><p>Why not a random number? Two customers could get the same one, and Ray shouts them in order. Counting up is predictable: 41, 42, 43.</p><h3>The next customer</h3><p>A "New order" button on the confirmation screen does three things: adds one to the number, empties the order, and goes back to the builder.</p><pre><code>function newOrder() {\n  setNumber(number + 1);\n  setOrder(EMPTY_ORDER);\n  setPlaced(false);\n}</code></pre><p><code>EMPTY_ORDER</code> is a constant at the top of the file, the same object useState started with, so "start again" always means exactly the same thing.</p><blockquote>For now the order lives only on this phone. Getting it onto Ray\'s screen in the truck needs a server: that\'s Film 2.</blockquote>',
    },
    {
      kind: 'tryIt',
      title: 'Place it, then start again',
      caption: 'Type a name and place the order. Then tap New order and place another. The number goes up.',
      code: `import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const EMPTY_ORDER = { name: '', size: 'Small' };

export default function App() {
  const [order, setOrder] = useState(EMPTY_ORDER);
  const [placed, setPlaced] = useState(false);
  const [number, setNumber] = useState(41);
  const canOrder = order.name.trim().length > 0;

  function newOrder() {
    setNumber(number + 1);
    setOrder(EMPTY_ORDER);
    setPlaced(false);
  }

  if (placed) {
    return (
      <View style={styles.screen}>
        <Text style={styles.big}>Order #{number}</Text>
        <Text style={styles.line}>Thanks, {order.name}. Listen for your number.</Text>
        <Pressable style={styles.button} onPress={newOrder}>
          <Text style={styles.buttonText}>New order</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <TextInput style={styles.input} placeholder="Your name" value={order.name} onChangeText={(text) => setOrder({ ...order, name: text })} />
      <Pressable style={[styles.button, !canOrder && styles.off]} disabled={!canOrder} onPress={() => setPlaced(true)}>
        <Text style={styles.buttonText}>Place order</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 64, gap: 14, backgroundColor: '#fff7ed' },
  big: { fontSize: 44, fontWeight: 'bold', color: '#9a3412' },
  line: { fontSize: 18, color: '#1c1917' },
  input: { borderWidth: 2, borderColor: '#fed7aa', borderRadius: 12, padding: 14, fontSize: 18, backgroundColor: '#ffffff' },
  button: { backgroundColor: '#9a3412', paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  off: { backgroundColor: '#d6d3d1' },
  buttonText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
});
`,
      challenge: 'Show the size on the confirmation too: "1 x Small pho".',
    },
  ],
  apply: {
    scenario: 'Placing the order.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does the order number count up from 41 instead of being random?',
        options: [
          { text: 'Random numbers are slower', why: 'They\'re instant. The issue is repeats and order.' },
          { text: 'Ray shouts numbers in order, and a random one could repeat' },
          { text: 'Math.random doesn\'t work on phones', why: 'It works fine. It\'s just the wrong tool here.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Show a confirmation screen with an early return: when placed, show "Order #41" and "Thanks, {name}"',
        starter: `import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [placed, setPlaced] = useState(false);
  const [number, setNumber] = useState(41);

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <TextInput placeholder="Your name" value={name} onChangeText={setName} />
      <Pressable onPress={() => setPlaced(true)}><Text>Place order</Text></Pressable>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [placed, setPlaced] = useState(false);
  const [number, setNumber] = useState(41);

  if (placed) {
    return (
      <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
        <Text>Order #{number}</Text>
        <Text>Thanks, {name}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <TextInput placeholder="Your name" value={name} onChangeText={setName} />
      <Pressable onPress={() => setPlaced(true)}><Text>Place order</Text></Pressable>
    </View>
  );
}
`,
        hint: 'Before the main return: if (placed) { return (<View><Text>Order #{number}</Text><Text>Thanks, {name}</Text></View>); }',
        checks: [
          { message: 'Placing shows "Order #41"', screen: { fill: [{ field: 'Your name', text: 'Dana' }], tap: ['Place order'], text: 'Order #41' } },
          { message: 'And thanks Dana', screen: { fill: [{ field: 'Your name', text: 'Dana' }], tap: ['Place order'], text: 'Thanks, Dana' } },
          { message: 'The builder is gone', screen: { tap: ['Place order'], noText: 'Place order' } },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put newOrder() together. (Any order works for React, but this reads best.)',
        lines: ['function newOrder() {', '  setNumber(number + 1);', '  setOrder(EMPTY_ORDER);', '  setPlaced(false);', '}'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Theo\'s reply.',
        from: 'mai',
        message: 'I placed an order, then closed the app, and order #41 is gone. Where did it go?',
        options: [
          { text: 'It\'s saved, just look harder.', why: 'useState lives in memory. It\'s really gone.' },
          { text: 'Phones delete orders at night.', why: 'Nothing deleted it. It was never saved.' },
          { text: 'Right now it only lives in the app\'s memory. Saving it, and sending it to Ray, comes later.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a "New order" button to the confirmation that adds one to the number and goes back to the builder. Place, New order, Place again: "Order #42"',
        starter: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [placed, setPlaced] = useState(false);
  const [number, setNumber] = useState(41);

  if (placed) {
    return (
      <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
        <Text>Order #{number}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setPlaced(true)}><Text>Place order</Text></Pressable>
    </View>
  );
}
`,
        solution: `import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function App() {
  const [placed, setPlaced] = useState(false);
  const [number, setNumber] = useState(41);

  function newOrder() {
    setNumber(number + 1);
    setPlaced(false);
  }

  if (placed) {
    return (
      <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
        <Text>Order #{number}</Text>
        <Pressable onPress={newOrder}><Text>New order</Text></Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 64, gap: 12 }}>
      <Pressable onPress={() => setPlaced(true)}><Text>Place order</Text></Pressable>
    </View>
  );
}
`,
        hint: 'function newOrder() { setNumber(number + 1); setPlaced(false); } and a Pressable with onPress={newOrder} on the confirmation.',
        checks: [
          { message: 'Second order is #42', screen: { tap: ['Place order', 'New order', 'Place order'], text: 'Order #42' } },
          { message: 'New order goes back to the builder', screen: { tap: ['Place order', 'New order'], button: 'Place order' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the state to its job.',
        pairs: [
          ['placed', 'Which screen to show'],
          ['number', 'What Ray shouts'],
          ['order', 'What\'s in the bowl'],
          ['EMPTY_ORDER', 'What "start again" means'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The early return.',
        language: 'typescript',
        template: '[[1]] (placed) {\n  [[2]] <Text>Order #{number}</Text>;\n}',
        blanks: [['if'], ['return']],
        distractors: ['when', 'show', 'render'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Order #41 is placed. Then New order is tapped twice, placing an order each time. What number is on the last ticket?',
        answers: ['43', '#43'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'placed is true. Which text is on the screen?',
        code: "if (placed) {\n  return <Text>Listen for your number</Text>;\n}\nreturn <Text>Build your bowl</Text>;",
        language: 'typescript',
        options: [
          { text: '"Listen for your number"' },
          { text: '"Build your bowl"', why: 'The early return happens first; the second return never runs.' },
          { text: 'Both', why: 'A function returns once.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'After New order, the next customer sees the last person\'s name in the box. Which line is missing?',
        language: 'typescript',
        lines: ['function newOrder() {', '  setNumber(number + 1);', '  setPlaced(false);', '}'],
        bug: 2,
        fix: '  setOrder(EMPTY_ORDER);\n  setPlaced(false);',
        explanation: 'The number moves on and the screen goes back, but the order (with Dana\'s name) is still in state. Reset it with setOrder(EMPTY_ORDER).',
      },
    ],
  },
  reflect: {
    prompt: 'What should your app show right after someone finishes the main thing? Write the confirmation in one or two lines.',
    starters: ['After they..., the screen says...'],
  },
  deepen: {
    title: 'Real-device mission',
    summary: 'Place three orders in a row on your phone. Check the number goes 41, 42, 43 and every new order starts empty.',
  },
  notes: 'Early return for conditional screens (React docs: "Conditional Rendering"). Sequential numbers over Math.random for collision-free, ordered calling. Persistence/server deliberately deferred (Film 2).',
};

export default lesson;
