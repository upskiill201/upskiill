import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2 — strong (importance) vs em (stress emphasis). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Strong and em',
  summary: '"I NEVER said free drinks." Read it five ways and it means five things. Kofi learns the two tags for emphasis: strong for what\'s important, em for the word you\'d say louder.',
  minutes: 11,
  outcomes: ['Use strong for important words', 'Use em for stressed words', 'Choose between them by meaning'],
  learn: [
    {
      kind: 'compare',
      title: 'Same words, different meaning',
      before: { label: 'No emphasis', text: '<p>Free entry before 9pm.</p>\n<p>I did not say free drinks.</p>\n\nPeople skim past "before 9pm", turn up at 10, and complain. And the second line sounds flat: what is Kofi stressing?' },
      after: { label: 'With strong and em', text: '<p>Free entry <strong>before 9pm</strong>.</p>\n<p>I did <em>not</em> say free drinks.</p>\n\nstrong makes "before 9pm" stand out as important (bold). em stresses "not", the word you\'d say louder (italic). Screen readers can change their voice for them too.' },
      notes: [
        'strong = this is important, don\'t miss it. Browsers show it in bold.',
        'em = say this word with stress; it changes the meaning. Browsers show it in italics.',
        'Use them for meaning, not decoration. If everything is strong, nothing is.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Move the stress',
      caption: 'Read the sentence in your head with the stress on "Kofi". Then move the em to another word and read it again. The meaning changes.',
      code: '<p><em>Kofi</em> made this beat.</p>\n<p>Free entry <strong>before 9pm</strong>.</p>\n',
      challenge: 'Move the em to "this", then to "beat". Hear how the meaning changes each time.',
    },
  ],
  apply: {
    scenario: 'Kofi adds emphasis to his gig page.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each tag to its job.',
        pairs: [
          ['strong', 'Important: don\'t miss this'],
          ['em', 'Stress: say this word louder'],
          ['p', 'A plain paragraph'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make before 9pm important with strong',
        starter: '<p>Free entry before 9pm.</p>\n',
        solution: '<p>Free entry <strong>before 9pm</strong>.</p>\n',
        hint: 'Put <strong> before "before" and </strong> after "9pm".',
        checks: [
          { message: 'before 9pm is strong', dom: { selector: 'p strong', text: 'before 9pm' } },
          { message: 'Only before 9pm is strong', dom: { selector: 'strong', count: 1 } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi wants to stress the word "not" in "I did not say free drinks." Which tag?',
        options: [
          { text: 'strong', why: 'strong is for importance. Stressing one word, the way you\'d say it, is em.' },
          { text: 'em' },
          { text: 'h1', why: 'h1 is the page\'s main heading, not a word inside a sentence.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Stress the word not with em',
        starter: '<p>I did not say free drinks.</p>\n',
        solution: '<p>I did <em>not</em> say free drinks.</p>\n',
        hint: '<em>not</em>',
        checks: [
          { message: 'not is stressed with em', dom: { selector: 'p em', text: 'not' } },
          { message: 'Only one word is stressed', dom: { selector: 'em', count: 1 } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How does this look in the browser?',
        code: '<p><strong>Saturday</strong> is <em>finally</em> here</p>',
        language: 'html',
        options: [
          { text: 'Saturday in bold, finally in italics' },
          { text: 'Both in bold', why: 'em shows in italics by default, not bold.' },
          { text: 'The whole sentence in italics', why: 'Only finally is inside em.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'strong or em?',
        groups: ['strong', 'em'],
        items: [
          { text: 'A warning: doors close at 10pm', group: 0 },
          { text: 'I *love* this beat (the word you\'d say louder)', group: 1 },
          { text: 'Sold out', group: 0 },
          { text: 'It was *my* idea', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I made every sentence on the page strong so people read all of it. Genius, right?',
        options: [
          { text: 'Genius.', why: 'If everything is bold, nothing stands out. Strong works because it\'s rare.' },
          { text: 'If everything is strong, nothing stands out. Pick the one or two things people must not miss.' },
          { text: 'Use em on everything instead.', why: 'Same problem in italics. Emphasis only works when it\'s used sparingly.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the line.',
        language: 'html',
        template: '<p>This is [[1]]my[[2]] best beat.</p>',
        blanks: [['<em>'], ['</em>']],
        distractors: ['<h1>', '</p>', '<emph>'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which tag stresses a word, the way you\'d say it louder?',
        answers: ['em', '<em>'],
        placeholder: 'Two letters',
      },
      {
        kind: 'writeCode',
        prompt: 'Write: Doors close at 10pm, with 10pm in strong. Then a second paragraph: Do not be late, with not in em',
        starter: '',
        solution: '<p>Doors close at <strong>10pm</strong>.</p>\n<p>Do <em>not</em> be late.</p>\n',
        hint: 'Two p lines. <strong>10pm</strong> in the first, <em>not</em> in the second.',
        checks: [
          { message: '10pm is strong', dom: { selector: 'p strong', text: '10pm' } },
          { message: 'not is stressed', dom: { selector: 'p em', text: 'not' } },
          { message: 'Two paragraphs', dom: { selector: 'p', count: 2 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Say "I didn\'t take your phone" out loud, stressing a different word each time. Which version would you use in an argument?',
    starters: ['When I stress "I"...', 'The one I\'d use is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, write one sentence and make four copies of it, each with a different word in em. Read them out loud.',
  },
  notes: 'HTML Living Standard §4.5.2 em ("stress emphasis", changes meaning) and §4.5.3 strong ("strong importance, seriousness, or urgency"). Default rendering: em italic, strong bold. Asterisks in sortGroups items mark stress in plain text.',
};

export default lesson;
