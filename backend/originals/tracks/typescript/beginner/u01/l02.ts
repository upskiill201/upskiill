import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2 — free. Where JavaScript came from (Netscape, 1995) and why it runs in every browser. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Ten days in May',
  summary: 'In 1995 one programmer had ten days to make web pages do something. What he built now runs on almost every website on Earth.',
  minutes: 12,
  outcomes: ['Say where JavaScript came from and what it was for', 'Explain why every browser can run it', 'Run JavaScript-style code yourself'],
  learn: [
    {
      kind: 'reading',
      title: 'The language inside every browser',
      html:
        '<p>Femi swivels his chair round. "Before TypeScript, you need to meet its parent. And its parent had a <em>very</em> rushed birth."</p>' +
        '<p><strong>May 1995.</strong> Netscape made the most popular web browser in the world. Web pages back then just sat there: text, pictures and links. Netscape wanted pages that could <em>do</em> things, like check a form before you sent it.</p>' +
        '<p>They asked a programmer called <strong>Brendan Eich</strong> to build a small language for it. By his own account, he made the first working version in about <strong>ten days</strong>. Its code name was Mocha. It became LiveScript, and in December 1995 it was renamed <strong>JavaScript</strong>.</p>' +
        '<p>Despite the name, JavaScript has almost nothing to do with Java, another language. The name was mostly marketing: Java was the fashionable language that year.</p>' +
        '<p>Every web browser since has had JavaScript built in. That\'s why it\'s everywhere: on your phone, on your laptop, on every booking page Kinwell has ever made. When you write code in this course, it ends up as JavaScript, the one language every browser speaks.</p>',
    },
    {
      kind: 'check',
      question: 'Why can every web browser run JavaScript?',
      options: ['It\'s built into every browser', 'You install it separately', 'It only runs on Netscape'],
      answer: 0,
      explanation: 'Since 1995 every browser has had JavaScript built in, so code written in it runs almost anywhere.',
    },
    {
      kind: 'tryIt',
      title: 'Older than Grace\'s career',
      caption: 'JavaScript is a few years older than Grace\'s nursing career. Run this to work out how many years old it is now.',
      code: 'console.log("JavaScript was born in 1995.");\nconsole.log("This year it turns:");\nconsole.log(2026 - 1995);\n',
      challenge: 'Change the last line to work out how old you were in 1995, or how many years ago you were born.',
    },
  ],
  apply: {
    scenario: 'Femi\'s history lesson, at his desk.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was JavaScript first made for?',
        options: [
          { text: 'Booking hospital appointments', why: 'Kinwell uses it for that now, but in 1995 it was made so web pages could react to people.' },
          { text: 'Making Java faster', why: 'JavaScript and Java are different languages. The name was mostly marketing.' },
          { text: 'Making web pages do things, not just sit there' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put JavaScript\'s names in the order they were used.',
        lines: ['Mocha', 'LiveScript', 'JavaScript'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the last line show?',
        code: 'console.log("Born:");\nconsole.log(1995);',
        language: 'typescript',
        options: [
          { text: 'Born: 1995 on one line', why: 'Each console.log starts its own line.' },
          { text: '1995, on its own line' },
          { text: 'Nothing: numbers need quotes', why: 'Numbers don\'t need quotes. console.log can show them directly.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Show the message JavaScript runs in every browser',
        starter: '',
        solution: 'console.log("JavaScript runs in every browser");\n',
        hint: 'console.log("...") with the sentence inside the quotes.',
        checks: [{ message: 'Show JavaScript runs in every browser', outputIncludes: 'JavaScript runs in every browser' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each fact to the right detail.',
        pairs: [
          ['Who built it', 'Brendan Eich'],
          ['Where', 'Netscape'],
          ['When', '1995'],
          ['How long the first version took', 'About ten days'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'True or false about JavaScript?',
        groups: ['True', 'False'],
        items: [
          { text: 'It\'s built into every web browser', group: 0 },
          { text: 'It\'s a version of Java', group: 1 },
          { text: 'It started at Netscape', group: 0 },
          { text: 'It only works on computers, not phones', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Show the year JavaScript was born.',
        language: 'typescript',
        template: 'console.log([[1]]);',
        blanks: [['1995']],
        distractors: ['2012', '"Mocha"'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'grace',
        message: 'Wait. If JavaScript was rushed in ten days, is that why the spreadsheet tool our old supplier built kept breaking?',
        options: [
          { text: 'No, JavaScript never has mistakes.', why: 'Every language lets some mistakes through. JavaScript lets through more than most, which is why TypeScript exists.' },
          { text: 'Partly: JavaScript lets a lot of mistakes through until the code runs. That\'s the problem TypeScript was made to fix.' },
          { text: 'Yes, nobody should use JavaScript.', why: 'JavaScript runs most of the web, including Kinwell. The fix isn\'t avoiding it, it\'s checking it.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which language is built into every web browser?',
        answers: ['JavaScript', 'JS'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Work out how many years ago 1995 was. Show the answer with console.log and a sum, not a typed number.',
        starter: 'console.log("Years since JavaScript was born:");\n',
        solution: 'console.log("Years since JavaScript was born:");\nconsole.log(2026 - 1995);\n',
        hint: 'Put the sum inside the brackets: console.log(2026 - 1995).',
        checks: [
          { message: 'Show the label', outputIncludes: 'Years since JavaScript was born' },
          { message: 'Show 31', outputIncludes: '31' },
          { message: 'Work it out with a minus sign', codeIncludes: '-' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'JavaScript was built in a rush and is still with us 30 years later. What is something you made in a hurry that people ended up relying on?',
    starters: ['Something I rushed was...', 'People still use it because...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'Look up "Brendan Eich JavaScript history" to read his own account of the ten days.',
  },
  notes: 'Brendan Eich, foreword to "Node: Up and Running" (O\'Reilly): "in 10 days in May 1995, I prototyped Mocha". Names: Mocha → LiveScript (autumn 1995) → JavaScript (December 1995, Sun licensing deal). Phrase as "first working version in about ten days", never "the language was finished in ten days". The course year is 2026 (2026 - 1995 = 31).',
};

export default lesson;
