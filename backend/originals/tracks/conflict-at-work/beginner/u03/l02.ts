import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Reading: tone in writing. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Tone in writing',
  summary: 'Grace is sure she\'d have read Femi\'s tone in person. Priya sends her a study about email and sarcasm. People are far worse at reading tone in writing than they think, and far worse at writing it.',
  minutes: 12,
  outcomes: [
    'Know how often tone gets lost in writing',
    'See why writers overestimate how clear they are',
    'Write and read messages with tone in mind',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'We think we\'re clearer than we are',
      html: '<p>In 2005, Justin Kruger, Nicholas Epley and colleagues asked people to write short messages, some serious, some sarcastic, and send them by email. Writers predicted how many readers would get the tone right: about <strong>78%</strong>. Readers actually got it right about <strong>56%</strong> of the time, not much better than a coin toss.</p><p>When the same messages were spoken, accuracy was much higher.</p><p>Why? <strong>Egocentrism.</strong> When you write, you hear your own tone of voice in your head. The reader doesn\'t. They only see the words, and fill the gap with their own mood or worries.</p><p><strong>What helps:</strong></p><ul><li><strong>Writing:</strong> add the context and the feeling you mean ("Quick one, no rush: ..."). Use a call for anything sensitive.</li><li><strong>Reading:</strong> assume the most generous reading until you know otherwise, and check if it matters.</li></ul>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Tone gets lost in writing far more than writers expect. Add context when you write; be generous when you read; call for anything sensitive.',
    },
  ],
  apply: {
    scenario: 'Tone in writing.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'In Kruger and Epley\'s study, what percentage did writers expect readers to get right?',
        answers: ['78', '78%'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'And what percentage did readers actually get right?',
        answers: ['56', '56%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why do writers overestimate how clear they are?',
        options: [
          { text: 'They hear their own tone in their head; the reader doesn\'t' },
          { text: 'Readers are careless', why: 'The tone just isn\'t in the words.' },
          { text: 'They don\'t', why: 'The study found they do.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps tone come across, or not?',
        groups: ['Helps', 'Doesn\'t'],
        items: [
          { text: '"Quick one, no rush:"', group: 0 },
          { text: 'A one-word reply to a long message', group: 1 },
          { text: 'A short call for a sensitive topic', group: 0 },
          { text: 'Sarcasm in a work chat', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'I didn\'t think "Fine." could sound angry. I meant "OK, will do."',
        prompt: "Grace's best reply?",
        options: [
          { text: 'And I read it as furious. Turns out neither of us can hear tone in a chat. Shall we both add a few words next time?' },
          { text: 'It did sound angry.', why: 'It sounded angry to her; it wasn\'t.' },
          { text: 'You should always use emojis.', why: 'A few words of context work well.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the habit to whose job it is.',
        pairs: [
          ['Add context and feeling', 'The writer'],
          ['Assume the generous reading', 'The reader'],
          ['Move sensitive topics to a call', 'Both'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The reader\'s rule.',
        template: 'Assume the most [[1]] reading until you [[2]] otherwise.',
        blanks: [['generous'], ['know']],
        distractors: ['negative', 'guess'],
      },
      {
        kind: 'mcq',
        prompt: 'What happened when the same messages were spoken?',
        options: [
          { text: 'Accuracy was much higher' },
          { text: 'Accuracy was the same', why: 'Voice carries tone.' },
          { text: 'Accuracy was lower', why: 'Spoken was better.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Grace\'s new message habits is a mistake?',
        lines: [
          'Add "no rush" when there\'s no rush.',
          'Call for anything sensitive.',
          'Use sarcasm to keep messages light.',
          'Read others generously.',
        ],
        bug: 2,
        fix: 'Avoid sarcasm in writing.',
        explanation: 'Sarcasm was the hardest tone to read in the study.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a good habit when a message feels off.',
        lines: ['Notice the feeling', 'Assume the generous reading', 'Ask if it matters', 'Check, or move to a call'],
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite one of your recent short messages so the tone you meant is in the words.',
    starters: ['Original:...', 'With tone:...'],
  },
  deepen: {
    title: 'Egocentrism',
    summary: 'Egocentrism here doesn\'t mean selfishness. It means it\'s hard to step outside your own head and imagine how your words look without your voice behind them.',
  },
  notes: 'Kruger, Epley, Parker & Ng (2005), "Egocentrism over e-mail: Can we communicate as well as we think?", JPSP 89(6): senders predicted ~78% accuracy for detecting sarcasm/seriousness; email recipients ~56%; voice much higher.',
};

export default lesson;
