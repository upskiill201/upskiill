import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2 — Chat, autocomplete, agent: three kinds of AI help with code. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Chat, autocomplete, agent',
  summary: 'Remi has used AI for code before: a chatbot that answers questions, and an editor that finishes his lines. An agent is different. It doesn\'t just suggest. It opens files, changes them and runs commands.',
  minutes: 11,
  outcomes: [
    'Tell chat, autocomplete and agents apart',
    'Know what makes something an agent',
    'Choose the right kind of help for a job',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Three kinds of help',
      steps: [
        { title: '1. Chat', body: 'You ask, it answers in text. You copy any code into your project yourself. It only sees what you paste in.' },
        { title: '2. Autocomplete', body: 'In your code editor, it suggests the next few lines as you type. You press Tab to accept. It sees the file you\'re in, and you stay in control of every line.' },
        { title: '3. Agent', body: 'You give it a task. It reads your project, decides what to change, edits files and can run commands such as the tests, then reports back. It works on its own for minutes at a time.' },
        { title: '4. What makes it an agent', body: 'Tools plus a loop: it can act (read, edit, run), see the result, and decide the next step without asking you each time.', code: 'change = agent.run("make the delivery thing", project)\nprint(change.log)   # what it did, step by step', language: 'python' },
        { title: '5. Why it matters', body: 'Chat and autocomplete can only suggest. An agent changes your files. More power, so more to check.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'What the agent did, step by step',
      caption: 'An agent keeps a log of its actions.',
      code: 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nchange = PracticeAgent().run("make the delivery thing", project)\nfor step in change.log:\n    print(step)\n',
      challenge: 'How many steps did it take? Print len(change.log).',
    },
  ],
  apply: {
    scenario: 'Which kind of help?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run the agent with "make the delivery thing" and print its log',
        starter: 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\n',
        solution: 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nchange = PracticeAgent().run("make the delivery thing", project)\nprint(change.log)\n',
        hint: 'print(change.log)',
        checks: [{ message: "Print ['read README.md', 'create board/dashboard.py']", outputEquals: "['read README.md', 'create board/dashboard.py']" }],
      },
      {
        kind: 'mcq',
        prompt: 'What can an agent do that chat and autocomplete can\'t?',
        options: [
          { text: 'Write code', why: 'All three can write code; only the agent applies and runs it.' },
          { text: 'Change files and run commands in your project on its own' },
          { text: 'Answer questions about code', why: 'Chat does that too.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Chat, autocomplete or agent?',
        groups: ['Chat', 'Autocomplete', 'Agent'],
        items: [
          { text: 'Suggests the rest of the line as you type', group: 1 },
          { text: 'Explains an error you paste in', group: 0 },
          { text: 'Edits three files and runs the tests', group: 2 },
          { text: 'You press Tab to accept', group: 1 },
          { text: 'Works on a task for minutes on its own', group: 2 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the kind of help to what it sees.',
        pairs: [
          ['Chat', 'Only what you paste in'],
          ['Autocomplete', 'The file you\'re typing in'],
          ['Agent', 'The whole project it\'s given'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'I\'ve used AI for code for a year. An agent is just a faster chatbot, right?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'Yes, exactly the same.', why: 'An agent acts on your project; chat only suggests.' },
          { text: 'Agents can\'t write code.', why: 'Writing and applying code is their main job.' },
          { text: 'No. A chatbot hands you text. An agent changes your files and runs things. That\'s why I review everything it does.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'log = ["read README.md", "create board/dashboard.py"]\nprint(len(log))',
        language: 'python',
        options: [
          { text: '2' },
          { text: '1', why: 'There are two steps in the list.' },
          { text: 'create board/dashboard.py', why: 'len counts the items.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the last step in the agent\'s log',
        starter: 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nchange = PracticeAgent().run("make the delivery thing", project)\n',
        solution: 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nchange = PracticeAgent().run("make the delivery thing", project)\nprint(change.log[-1])\n',
        hint: 'change.log[-1]',
        checks: [{ message: 'Print create board/dashboard.py', outputEquals: 'create board/dashboard.py' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'What makes an agent.',
        template: 'An agent is a model with [[1]] and a [[2]]: act, see the result, decide the next step.',
        blanks: [['tools'], ['loop']],
        distractors: ['keyboard', 'logo'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s notes is wrong?',
        lines: [
          'Chat answers in text; I copy the code myself.',
          'Autocomplete suggests lines; I press Tab to accept.',
          'An agent only suggests; it never changes my files.',
          'So with an agent, I have more to check.',
        ],
        bug: 2,
        fix: 'An agent edits files and runs commands on its own.',
        explanation: 'That\'s the difference, and why checking matters more.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which kind of AI help edits files and runs commands on its own?',
        answers: ['agent', 'an agent', 'coding agent', 'an ai agent'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which kind of AI help have you used most? What would change if it could edit your files by itself?',
    starters: ['I\'ve mostly used...', 'If it could edit files...'],
  },
  deepen: {
    title: 'Same model, different tools',
    summary: 'The same AI model can power a chat window, autocomplete and an agent. The difference is the tools around it: whether it can read files, edit them and run commands.',
  },
  notes: 'Practice agent log for "make the delivery thing": [\'read README.md\', \'create board/dashboard.py\']. Distinction chat / inline completion / agent reflects how current coding tools are described (2026); many products offer all three modes.',
};

export default lesson;
