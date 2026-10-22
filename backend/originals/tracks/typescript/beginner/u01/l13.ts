import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 13. Where TypeScript runs: browsers, phones, servers (Node.js); the checker and the runner. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Where TypeScript runs',
  summary: 'Kinwell\'s booking app runs on patients\' phones, on nurses\' laptops, and on servers nobody ever sees. The same language runs all three. Here\'s how.',
  minutes: 11,
  outcomes: ['Name three places TypeScript code ends up running', 'Explain the difference between checking and running', 'Say what Node.js is for'],
  learn: [
    {
      kind: 'text',
      html:
        '<p><strong>1. In the browser.</strong> When a patient opens Kinwell\'s booking page, their browser downloads JavaScript and runs it. That code was written in TypeScript, checked, and turned into JavaScript first.</p>',
    },
    {
      kind: 'text',
      html:
        '<p><strong>2. On phones.</strong> A phone\'s browser runs JavaScript exactly like a laptop\'s. That\'s how you\'re running TypeScript in this lesson right now, with nothing installed.</p>',
    },
    {
      kind: 'text',
      html:
        '<p><strong>3. On servers.</strong> A server is a computer somewhere that stores the bookings and sends the reminders. Since 2009, a program called <strong>Node.js</strong> lets JavaScript run on servers too, not just in browsers. Kinwell\'s server code is TypeScript as well.</p>',
    },
    {
      kind: 'text',
      html:
        '<p><strong>Checking vs running.</strong> Two separate jobs. The <strong>checker</strong> (TypeScript itself) reads your code and reports mistakes. The <strong>runner</strong> (a browser, or Node.js) runs the JavaScript. In this course, both happen in your browser every time you press Run: check first, then run.</p>',
    },
    {
      kind: 'check',
      question: 'What is Node.js for?',
      options: ['Drawing web pages', 'Checking spelling', 'Running JavaScript on servers, outside the browser'],
      answer: 2,
      explanation: 'Node.js lets JavaScript (and so TypeScript, once turned into JavaScript) run on servers and computers, not just in browsers.',
    },
    {
      kind: 'tryIt',
      title: 'Running on your device right now',
      caption: 'Wherever you\'re reading this, your device is checking and running TypeScript. Press Run.',
      code: 'const where: string = "my own device";\nconsole.log("This TypeScript was checked and run on " + where);\n',
      challenge: 'Change where to the name of your phone or laptop, and run it again.',
    },
  ],
  apply: {
    scenario: 'Grace maps out where Kinwell\'s code lives.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Where does this code run?',
        groups: ['In the browser', 'On a server'],
        items: [
          { text: 'The booking page a patient sees', group: 0 },
          { text: 'Storing every booking safely', group: 1 },
          { text: 'The button that changes colour when tapped', group: 0 },
          { text: 'Sending reminder texts at night', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does Node.js let you do?',
        options: [
          { text: 'Check TypeScript for mistakes', why: 'Checking is TypeScript\'s job. Node.js is a runner.' },
          { text: 'Run JavaScript on servers and computers, outside a browser' },
          { text: 'Design web pages', why: 'Node.js runs code. It doesn\'t design anything.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each job to who does it.',
        pairs: [
          ['Finds mistakes before running', 'The checker (TypeScript)'],
          ['Runs the code in a web page', 'The browser'],
          ['Runs the code on a server', 'Node.js'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make a string called place holding the browser, and show Running in the browser',
        starter: '',
        solution: 'const place: string = "the browser";\nconsole.log("Running in " + place);\n',
        hint: 'const place: string = "the browser"; then join it to "Running in " with +.',
        checks: [
          { message: 'Label place as a string', codeIncludes: ': string' },
          { message: 'Show Running in the browser', outputIncludes: 'Running in the browser' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'What happens when you press Run in this course? Put it in order.',
        lines: ['TypeScript checks your code', 'The labels are removed', 'The JavaScript runs', 'The output appears'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'jayden',
        message: 'Mum, you need a proper computer to code. Your phone can\'t do it.',
        options: [
          { text: 'You\'re right, I\'ll stop until I buy one.', why: 'Every phone browser runs JavaScript. Grace has been coding on hers for weeks.' },
          { text: 'My phone\'s browser checks and runs TypeScript fine. I\'ve been doing it all week.' },
          { text: 'Phones can only run apps from the app store.', why: 'Phone browsers run JavaScript, which is all this course needs.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: 'const runner: string = "Node.js";\nconsole.log(runner + " runs JavaScript on servers");',
        language: 'typescript',
        options: [
          { text: 'runner runs JavaScript on servers', why: 'runner is a name, so its value, Node.js, is shown.' },
          { text: 'Node.js runs JavaScript on servers' },
          { text: 'An error: you can\'t join text', why: '+ joins two pieces of text without any problem.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which program lets JavaScript run on servers? (it ends in .js)',
        answers: ['Node.js', 'Node', 'nodejs', 'node js'],
        placeholder: 'Its name',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the label.',
        language: 'typescript',
        template: 'const device: [[1]] = "phone";\nconsole.log("Coding on my " + device);',
        blanks: [['string']],
        distractors: ['number', 'phone'],
      },
      {
        kind: 'writeCode',
        prompt: 'Show two lines: Checked by TypeScript, then Run by the browser',
        starter: '',
        solution: 'console.log("Checked by TypeScript");\nconsole.log("Run by the browser");\n',
        hint: 'Two console.log lines.',
        checks: [{ message: 'Checked by TypeScript, then Run by the browser', outputEquals: 'Checked by TypeScript\nRun by the browser' }],
      },
    ],
  },
  reflect: {
    prompt: 'Which apps or websites you use every day do you think are written in TypeScript or JavaScript? What would you love to build for your own phone?',
    starters: ['I think ... uses it.', 'I\'d love to build...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'Real-World TypeScript, the third course in this track, shows you how to install Node.js and run TypeScript on your own computer.',
  },
  notes: 'Node.js: first released 2009 (Ryan Dahl). Avoid specific Node version claims about built-in TypeScript support here; that belongs in Real-World TypeScript (Chapter 4, Tidy code) and must be re-checked then.',
};

export default lesson;
