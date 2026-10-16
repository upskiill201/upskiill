import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Card deck: show, don't just tell (examples, mock-ups, worked examples). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Show, don\'t just tell',
  summary: 'Arjun spends twenty minutes describing the size picker in words. Then he spends two minutes drawing it on paper and sends a photo. Kavya: "OH. That. Easy." Tey deals out the cards on showing.',
  minutes: 11,
  outcomes: [
    'Know why examples beat descriptions',
    'Pick the right kind of example for a task',
    'Avoid examples people copy too exactly',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Words carry meaning. Pictures and examples carry <em>detail</em>: the exact layout, the tone, the size of the button, the things you forgot to say. When the curse of knowledge hides steps from you, an example shows them anyway. Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: A rough sketch beats a perfect paragraph</h3><p>A photo of a pen sketch took Arjun two minutes and answered twenty minutes of description. It doesn't have to be pretty.</p><h3>Card 2: Show a real example</h3><p>\"Like the size picker on this shoe shop, but in Hindi too.\" A link to something real is the fastest brief in the world.</p><h3>Card 3: Show a bad example too</h3><p>\"Not like this one: the options are too small to tap.\" Knowing what to avoid is often as useful as knowing what to aim for.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: Say what to copy and what not to</h3><p>Examples can be copied too exactly. \"Copy the layout, not the colours.\" Say which part of the example matters.</p><h3>Card 5: Worked examples for new skills</h3><p>Education researchers have found that beginners often learn faster from studying a fully worked example than from solving problems alone, known as the worked-example effect (John Sweller and colleagues). For Joel's first UPI integration, a finished example from Arjun's last project saved a day.</p><h3>Card 6: Keep a library</h3><p>Save your best examples: a great product page, a clean pull request, a good test. Next time, the brief is half written.</p>",
    },
    {
      kind: 'check',
      question: 'Why say "copy the layout, not the colours"?',
      options: ['Examples get copied too exactly unless you say what matters', 'Colours are illegal', 'To be polite'],
      answer: 0,
      explanation: 'Point at the part of the example that matters.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Sketch it. Link a real example, and a bad one. Say what to copy and what not to. Use worked examples for new skills. Keep a library.',
    },
  ],
  apply: {
    scenario: 'The size picker, in words and pictures.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the sketch work better than twenty minutes of words?',
        options: [
          { text: 'Kavya doesn\'t read', why: 'She does. Pictures carry more.' },
          { text: 'It was very artistic', why: 'It was a rough pen sketch.' },
          { text: 'Pictures carry the details words leave out' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good use of an example, or risky?',
        groups: ['Good', 'Risky'],
        items: [
          { text: '"Copy the layout, not the colours."', group: 0 },
          { text: '"Make it exactly like this site."', group: 1 },
          { text: 'A bad example, labelled "not like this"', group: 0 },
          { text: 'An example with no explanation at all', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'I\'ve never built a UPI checkout before.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Here\'s the one from my last project, fully working. Read it first, then build yours. Ask me about any line.' },
          { text: 'Google it.', why: 'A worked example would save him a day.' },
          { text: 'I\'ll do it then.', why: 'Takes away his chance to learn.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Beginners often learn faster from a fully ___ example. (one word)',
        answers: ['worked', 'Worked'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card to the move.',
        pairs: [
          ['Rough sketch', 'A photo of a pen drawing'],
          ['Bad example', '"Not like this: too small to tap."'],
          ['Library', 'Saved great examples for next time'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why show a bad example too?',
        options: [
          { text: 'To criticise another shop', why: 'It\'s to clarify, not to mock.' },
          { text: 'Knowing what to avoid is often as useful as knowing the target' },
          { text: 'It isn\'t useful', why: 'It often is.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s message with the example. Which line causes trouble?',
        lines: [
          'Here\'s a size picker I like.',
          'Make ours exactly the same.',
          'Ours also needs Hindi labels.',
        ],
        bug: 1,
        fix: 'Copy the layout and the big tap areas, not the colours.',
        explanation: '"Exactly the same" gets copied too exactly, including the wrong brand colours.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put showing well in order.',
        lines: ['Find or sketch an example', 'Add a "not like this"', 'Say what to copy', 'Save it to the library'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Words carry [[1]]. Examples carry [[2]].',
        blanks: [['meaning'], ['detail', 'details']],
        distractors: ['noise', 'colour'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Kavya\'s reaction.',
        tiles: ['OH.', 'That.', 'Easy.'],
        distractors: ['What?'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s something you usually explain in words that would be faster to show? What example could you use?',
    starters: ['I usually explain...', 'I could show...'],
  },
  deepen: {
    title: 'Start a library',
    summary: 'Save three examples of great work in your field in one folder: a document, a message, a design. Next time you brief someone, start there.',
  },
  notes: 'Worked-example effect: John Sweller & Graham Cooper (1985); Sweller, van Merriënboer & Paas (1998), Educational Psychology Review 10(3). Examples and visuals in briefs: standard design and communication practice. Fictional details.',
};

export default lesson;
