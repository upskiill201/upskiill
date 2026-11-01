import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1 — "Make the delivery thing": the one-line brief and the wrong result. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"Make the delivery thing"',
  summary: 'Felix gives Remi an AI coding agent and one job: the Delivery Board. Remi types one line. The agent says "Done!" and hands him a weather dashboard.',
  minutes: 11,
  outcomes: [
    'Meet the Delivery Board project and the practice agent',
    'See what a one-line brief produces',
    'Check what an agent actually changed',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Build it with this',
      beats: [
        { speaker: 'narrator', text: 'Synergix, Nairobi. Mr Kamau wants a Delivery Board: every morning, a list of deliveries likely to arrive late. IT is Felix, alone, with six months of requests.' },
        { speaker: 'felix', text: 'I don\'t have time. Here\'s a licence for an AI coding agent. Build it with this. I\'ll review.' },
        { speaker: 'remi', text: 'How hard can it be? Zanele already found why deliveries are late.' },
        { speaker: 'narrator', text: 'Remi opens the agent and types one line: "make the delivery thing". Forty seconds later: "Done! I built a delivery dashboard for Nairobi with the weather, so you can plan around the rain."' },
        { speaker: 'remi', text: 'The weather? I never said anything about the weather.' },
        { speaker: 'tey', text: 'You never said anything about anything. The agent filled every gap with a guess. That\'s what this course is about: getting real work from an agent without being fooled by it.' },
      ],
      choice: {
        prompt: 'What should Remi do first?',
        options: [
          {
            text: 'Look at exactly what the agent changed before believing "Done!".',
            outcome: 'Right. "Done!" is the agent\'s claim. The files it touched are the facts. You\'ll do that in this lesson.',
            best: true,
          },
          {
            text: 'Send it to Felix for review: the agent says it\'s done.',
            outcome: 'Felix would reply with one word: "No." Never send work you haven\'t looked at yourself.',
          },
          {
            text: 'Delete the agent. It clearly doesn\'t work.',
            outcome: 'It did exactly what a one-line brief asked for: something about deliveries. The brief was the problem, not the agent.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Remi\'s first brief',
      caption: 'The practice agent: rule-based, no real AI, but it makes the mistakes real agents make.',
      code: 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nagent = PracticeAgent()\n\nchange = agent.run("make the delivery thing", project)\nprint(change.message)\nprint("Files it touched:", change.files_touched)\n',
      challenge: 'Print project.ls() to see every file in the project.',
    },
  ],
  apply: {
    scenario: 'Remi\'s first try.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run the agent with "make the delivery thing" and print the list of files it touched',
        starter: 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nagent = PracticeAgent()\n',
        solution: 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nagent = PracticeAgent()\nchange = agent.run("make the delivery thing", project)\nprint(change.files_touched)\n',
        hint: 'change = agent.run("...", project), then print(change.files_touched)',
        checks: [{ message: "Print ['board/dashboard.py']", outputEquals: "['board/dashboard.py']" }],
      },
      {
        kind: 'mcq',
        prompt: 'Why did the agent build a weather dashboard?',
        options: [
          { text: 'The agent is broken', why: 'It built something about deliveries, which is what the brief said.' },
          { text: 'The brief didn\'t say what to build, so it guessed' },
          { text: 'Felix set it up for weather', why: 'Nothing in the story says so; the brief was one line.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'A fact you can check, or just the agent\'s claim?',
        groups: ['Fact', 'Claim'],
        items: [
          { text: 'The list of files it touched', group: 0 },
          { text: '"Done!"', group: 1 },
          { text: 'The code in board/dashboard.py', group: 0 },
          { text: '"So you can plan around the rain"', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to their part in the story.',
        pairs: [
          ['Remi', 'Builds the board with the agent'],
          ['Felix', 'Reviews every change'],
          ['Zanele', 'Knows why deliveries are late'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'It said "Done!" so I guess it\'s done?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Yes, agents always know when they\'re done.', why: 'Agents often say done when they aren\'t.' },
          { text: 'Ask it again until it says something different.', why: 'Asking again doesn\'t check anything.' },
          { text: '"Done" is what it says. What it did is in the files. Look at them before you believe it.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The project starts with 9 files. The agent creates one new file. What does this print?',
        code: 'print(len(project.ls()))',
        language: 'python',
        options: [
          { text: '10' },
          { text: '9', why: 'It created board/dashboard.py, so there\'s one more.' },
          { text: '1', why: 'ls() lists every file in the project.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Run the same brief, then print how many files the project has now',
        starter: 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\n',
        solution: 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nPracticeAgent().run("make the delivery thing", project)\nprint(len(project.ls()))\n',
        hint: 'len(project.ls())',
        checks: [{ message: 'Print 10', outputEquals: '10' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Running the practice agent.',
        language: 'python',
        template: 'change = agent.[[1]]("make the delivery thing", project)\nprint(change.[[2]])',
        blanks: [['run'], ['files_touched']],
        distractors: ['done', 'weather'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s message to Felix is the problem?',
        lines: [
          'Hi Felix,',
          'The agent says the Delivery Board is done.',
          'I haven\'t looked at it, but it sounded confident.',
          'Can you review it today?',
        ],
        bug: 2,
        fix: 'Look at what it changed first, and tell Felix what you checked.',
        explanation: 'Confidence isn\'t evidence. The reviewer shouldn\'t be the first person to look.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which city is Synergix\'s office in?',
        answers: ['Nairobi'],
        placeholder: 'A city',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you gave someone a one-line instruction and got back the wrong thing. What did they need to know that you didn\'t say?',
    starters: ['I asked for...', 'They needed to know...'],
  },
  deepen: {
    title: 'The practice agent',
    summary: 'This course uses a built-in practice agent: no real AI, no cost, the same result every time. It reacts to what your brief contains and makes the classic mistakes real agents make, so you can learn to catch them safely.',
  },
  notes: 'teyro_agent (practice, rule-based): PracticeAgent().run("make the delivery thing", Project()) creates only board/dashboard.py and replies "Done! I built a delivery dashboard for Nairobi with the weather, so you can plan around the rain." The start project has 9 files; 10 after. Story set at Synergix after Data Science for Beginners.',
};

export default lesson;
