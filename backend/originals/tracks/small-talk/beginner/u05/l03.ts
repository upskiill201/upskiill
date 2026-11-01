import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Reading: tell a 30-second story — the shape of a small story that people remember. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Tell a 30-second story',
  summary: 'Someone asks Grace why she left nursing. Her answer lasts eleven minutes and covers 2007. Femi teaches her the 30-second story: the shape that makes people lean in instead of drifting off.',
  minutes: 12,
  outcomes: [
    'Tell a short story with a clear shape: moment, problem, turn, point',
    'Cut the details that don\'t matter',
    'Finish by handing the conversation back',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Femi\'s 30-second story',
      html: "<p>Wednesday. Grace has just told Tomasz why she left nursing. It took eleven minutes. It started in 2007. Tomasz now knows the name of every ward manager she ever had.</p><p>Femi, afterwards: \"Grace. Lovely story. Way too long. Small talk stories are thirty seconds. They have a shape.\"</p><h3>The shape</h3><ol><li><strong>The moment:</strong> start in a specific place and time. Not \"So I was a nurse for eighteen years...\" but \"It was 3 a.m. on a night shift...\"</li><li><strong>The problem:</strong> what went wrong, or what was at stake. \"...and the booking system crashed, again, and forty patients' appointments vanished.\"</li><li><strong>The turn:</strong> what changed. \"I spent the rest of the night rebooking them by hand, and I thought: someone has to fix this.\"</li><li><strong>The point:</strong> one line that lands it. \"So now I fix the systems instead of the patients.\"</li></ol><p>That's it. Twenty-five seconds.</p><h3>What to cut</h3><p>Dates, names of people they'll never meet, side stories, \"or was it Tuesday?\". If a detail doesn't help the moment, the problem or the turn, it goes.</p><h3>Hand it back</h3><p>End by inviting them in: \"Have you ever had a moment like that, where you knew you had to change something?\" A story that ends with a question becomes a conversation.</p><h3>Keep a few ready</h3><p>Everyone gets asked the same things: why this job, where you're from, what you did at the weekend. Have a 30-second story ready for each. It's not fake. It's just tidy.</p>",
    },
    {
      kind: 'check',
      question: 'Where should a 30-second story start?',
      options: ['At the very beginning of your career', 'In a specific moment: a place and a time', 'With a list of everyone involved'],
      answer: 1,
      explanation: '"It was 3 a.m. on a night shift..." puts the listener right there.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Moment, problem, turn, point. Thirty seconds. End with a question.',
    },
  ],
  apply: {
    scenario: 'Wednesday. Femi\'s story lesson.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Grace\'s 30-second story in order.',
        lines: ['It was 3 a.m. on a night shift,', 'and the booking system crashed and forty appointments vanished.', 'I rebooked them by hand and thought: someone has to fix this.', 'So now I fix the systems instead of the patients.'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['The moment', 'Puts the listener in a place and time'],
          ['The problem', 'What was at stake'],
          ['The turn', 'What changed'],
          ['The point', 'One line that lands it'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep it, or cut it?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'It was 3 a.m. on a night shift', group: 0 },
          { text: 'The ward manager\'s full name and her cat\'s name', group: 1 },
          { text: 'Forty appointments vanished', group: 0 },
          { text: '"Or was it a Tuesday? No, Wednesday..."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'Okay, tell me why you left nursing. Thirty seconds. Go.',
        prompt: 'Grace\'s story?',
        options: [
          { text: 'So it started in 2007, when I joined my first ward, and the manager was a woman called...', why: 'Eleven minutes incoming.' },
          { text: 'One night the booking system crashed and I rebooked forty patients by hand. I thought: someone has to fix this. So now I do. Have you ever had a moment like that?' },
          { text: 'Long story.', why: 'You have a 30-second version now.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A small-talk story should take about ___ seconds. (a number)',
        answers: ['30', 'thirty'],
        placeholder: 'Number',
      },
      {
        kind: 'mcq',
        prompt: 'Why end a story with a question?',
        options: [
          { text: 'It hands the conversation back, so it becomes a swap, not a speech' },
          { text: 'To test the listener', why: 'It\'s an invitation, not a test.' },
          { text: 'Stories always need a question mark', why: 'Not a rule, a habit that helps.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s weekend story. Which line should be cut?',
        lines: [
          'On Saturday Jayden took me to a climbing wall.',
          'First I had a shower, then I made toast, then I looked for my trainers for twenty minutes.',
          'I got two metres up and had to be lowered down like a sack of potatoes.',
        ],
        bug: 1,
        fix: 'Delete it.',
        explanation: 'The toast and the trainers don\'t help the moment, the problem or the turn.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Bridge question', 'Light, but invites a real answer'],
          ['Listen, don\'t fix', 'When someone shares something hard'],
          ['Deeper talk', 'Less awkward than expected'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The four-part shape.',
        template: '[[1]], problem, [[2]], point. Then hand it [[3]].',
        blanks: [['Moment'], ['turn'], ['back']],
        distractors: ['Beginning', 'over'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a story\'s opening moment.',
        tiles: ['It', 'was', '3', 'a.m.', 'on', 'a', 'night', 'shift.'],
        distractors: ['2007'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick a question you get asked a lot ("Why this job?", "Where are you from?"). Write your 30-second story: moment, problem, turn, point, question.',
    starters: ['Moment: ...', 'Problem: ...', 'Turn: ...', 'Point: ...', 'Question: ...'],
  },
  deepen: {
    title: 'Three stories ready',
    summary: 'Write three 30-second stories: why you do what you do, a funny recent moment, and where you\'re from. Say each out loud once. You\'ll never ramble for eleven minutes again.',
  },
  notes: 'Story structure (setting, complication, turn, resolution/point) is standard narrative teaching (e.g. Labov\'s narrative structure, simplified). Practical advice.',
};

export default lesson;
