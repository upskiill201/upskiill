import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Reading: seeing who you help (Adam Grant's call-centre studies, 2007–2008). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Meet the people you help',
  summary: 'Monday, after Nurse Adaeze\'s call, the team closes more tickets than any day this quarter. Folake asks Miracle what she did. Miracle isn\'t sure it wasn\'t luck. Tey sends her the research.',
  minutes: 12,
  outcomes: [
    'Know the famous call-centre study on task significance',
    'Know why meeting a beneficiary changes behaviour',
    'Bring the people you help closer to your team',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Five minutes with a student',
      html: "<p>Organisational psychologist <strong>Adam Grant</strong> studied a university call centre where staff phoned alumni to raise money for scholarships. It was repetitive, unloved work: lots of rejection, rarely a thank-you.</p><h3>The experiment</h3><p>One group of callers spent about five minutes meeting a student whose scholarship had been paid for by their calls. The student explained what it meant to them. Other groups didn't. A month later, the callers who met the student spent about <strong>142% more time on the phone</strong> each week, and brought in about <strong>171% more money</strong>, than before. The groups who didn't meet a student showed no real change.</p><h3>Why it works</h3><p>Grant called it <strong>task significance</strong>: knowing your work has a real effect on other people. Meeting a beneficiary makes that impact real, emotional and personal, in a way that a poster or a mission statement can't.</p><h3>Not just for charities</h3><p>Grant and others found similar effects in other settings, like lifeguards who read stories about rescues. Clinic Success isn't so different from the call centre: repetitive calls, frustrated people, and impact that's invisible from the desk.</p><h3>Keep it real</h3><p>It works because it's genuine. A real nurse, a real mother, a real result. Invented \"customer stories\" feel like marketing, and people can tell.</p>",
    },
    {
      kind: 'check',
      question: 'What happened to callers who met a scholarship student?',
      options: ['Much more time on the phone and much more money raised a month later', 'No change', 'They quit'],
      answer: 0,
      explanation: 'About 142% more phone time and 171% more money, a month later.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Task significance: knowing your work affects real people. Meeting them makes it real. Keep it genuine, never invented.',
    },
  ],
  apply: {
    scenario: 'The research behind Monday.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is task significance?',
        options: [
          { text: 'How hard a task is', why: 'That\'s difficulty.' },
          { text: 'Knowing your work has a real effect on other people' },
          { text: 'How much a task pays', why: 'Not related.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the call centre to Clinic Success.',
        pairs: [
          ['Callers', 'Clinic Success agents'],
          ['Scholarship student', 'Mrs Lawal and her baby'],
          ['Five-minute meeting', 'Nurse Adaeze on video'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Genuine connection to impact, or not?',
        groups: ['Genuine', 'Not genuine'],
        items: [
          { text: 'A real nurse saying thank you', group: 0 },
          { text: 'An invented customer story', group: 1 },
          { text: 'A real clinic\'s before-and-after', group: 0 },
          { text: 'A poster saying "We Care"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Best day this quarter. What did you do?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'A nurse from a live clinic told them what their work did for a patient. There\'s research behind it. Can we make clinic visits regular?' },
          { text: 'Luck, probably.', why: 'It wasn\'t, and research explains why.' },
          { text: 'I gave a great speech.', why: 'Not true, and not the cause.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Adam ___ ran the call-centre study. (one word)',
        answers: ['Grant', 'grant'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t a mission statement do what meeting a beneficiary does?',
        options: [
          { text: 'Mission statements are too long', why: 'Short ones don\'t work either.' },
          { text: 'They can, if well written', why: 'The research points to personal contact.' },
          { text: 'Meeting someone makes the impact real, emotional and personal' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s plan to keep it going. Which line breaks the research?',
        lines: [
          'One real clinic story every Monday.',
          'If there\'s no real story, I\'ll make one up.',
          'A clinic visit for each person this quarter.',
        ],
        bug: 1,
        fix: 'If there\'s no new story, share a real clinic\'s numbers.',
        explanation: 'Invented stories feel like marketing, and people can tell.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put building task significance in order.',
        lines: ['Find a real person helped', 'Let them tell it', 'Connect it to someone\'s work', 'Make it regular'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Make the [[1]] real. Keep it [[2]].',
        blanks: [['impact'], ['genuine', 'real', 'true']],
        distractors: ['fake', 'secret'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the idea.',
        tiles: ['Meet', 'the', 'people', 'you', 'help.'],
        distractors: ['ignore'],
      },
    ],
  },
  reflect: {
    prompt: 'If you met one person your work has helped, what would you want to ask them? How would it change how you feel about the work?',
    starters: ['I\'d ask them...', 'It would make me feel...'],
  },
  deepen: {
    title: 'Five minutes',
    summary: 'If you lead a team, invite one real customer, user or beneficiary to talk to the team for five minutes this month. Let them tell it.',
  },
  notes: 'Adam M. Grant (2008), "The significance of task significance: Job performance effects, relational mechanisms, and boundary conditions", J. Applied Psychology 93(1); Grant, Campbell, Chen, Cottone, Lapedis & Lee (2007), "Impact and the art of motivation maintenance", Organizational Behavior and Human Decision Processes 103(1): beneficiary contact increased weekly phone time (~142%) and money raised (~171%) a month later. Lifeguard study: Grant (2008).',
};

export default lesson;
