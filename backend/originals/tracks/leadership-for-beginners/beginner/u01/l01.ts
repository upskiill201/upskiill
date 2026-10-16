import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. The promotion: Lucía gets the job, and Marta, who applied too, doesn't. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The promotion',
  summary: 'Monday, 9:04 a.m. Carmen calls Lucía into her office: "The team lead job is yours." Lucía walks back to her desk. Marta, her best work friend, also applied. The team chat goes very quiet.',
  minutes: 11,
  outcomes: [
    'See why the first days of leading feel so strange',
    'Notice how a new title changes how people see you',
    "Know this course's goal: lead your first 90 days well",
  ],
  learn: [
    {
      kind: 'story',
      title: 'Nopal, Mexico City. Day 1, 9:04 a.m.',
      beats: [
        { speaker: 'carmen', text: 'Sit down, Lucía. I\'ll be quick: the team lead job is yours. Six people, the summer launch, and you report to me. Congratulations. Any questions?' },
        { speaker: 'lucia', text: 'Thank you! I... yes. No. Thank you. When do I start?' },
        { speaker: 'carmen', text: 'Now. I\'ll tell the team at ten. Oh, and Lucía? Marta applied too. Be kind.' },
        { speaker: 'narrator', text: 'Lucía walks back to the desk she has shared with Marta for six years. Marta looks up, smiles a little too brightly, and says nothing.' },
        { speaker: 'narrator', text: 'At 10:02 the announcement lands in the team chat. Diego, twelve years at Nopal, reacts with a thumbs-up. Tomás sends three party emojis. Sofía, the newest hire, sends nothing. Marta sends "Congrats!!" and then goes to lunch. At 10:30.' },
        { speaker: 'lucia', text: '(whispering, to her laptop) Yesterday I was one of them. What am I now?' },
      ],
      choice: {
        prompt: "What's the best first move for Lucía, today?",
        options: [
          {
            text: 'Ask Marta for a coffee, just the two of them, before anything else',
            outcome: 'Marta hesitates, then says yes. Their friendship is the relationship most at risk this week, and it is far easier to talk on Day 1 than on Day 30.',
            best: true,
          },
          {
            text: 'Send the team a long message about her plans for the department',
            outcome: "Nobody asked for a manifesto at 10:15 on Day 1. People want to know what changes for them, and they'd like to be asked, not told.",
          },
          {
            text: 'Keep her head down and carry on with her old work as if nothing changed',
            outcome: "Tempting, and very common. But something did change, and everyone can see it. Pretending it didn't only makes it more awkward.",
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p><strong>This course:</strong> Lucía's first 90 days, one step at a time. Every lesson is a moment from her week and the leadership tool that handles it. By Day 90 she has to launch the summer campaign and sit her review with Carmen. You'll learn the same habits as she does, based on what research says good leaders actually do.</p>",
    },
  ],
  apply: {
    scenario: 'Nopal, Day 1.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the team chat go quiet after the announcement?',
        options: [
          { text: 'Everyone hates Lucía', why: 'Nobody said that. Uncertainty, not hatred.' },
          { text: "Lucía's relationships just changed, and people don't know yet what that means for them" },
          { text: 'They were busy', why: 'Possible, but the silence says something.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Who reacted how?',
        groups: ['Supportive', 'Unsure'],
        items: [
          { text: 'Tomás: three party emojis', group: 0 },
          { text: 'Marta: "Congrats!!" then an early lunch', group: 1 },
          { text: 'Sofía: no reply', group: 1 },
          { text: 'Diego: a thumbs-up', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'Congrats!! You deserve it. Honestly.',
        prompt: "What's a good reply from Lucía?",
        options: [
          { text: 'I know, right?! So excited!', why: 'Marta applied too. Read the room.' },
          { text: 'Thanks.', why: 'Polite, but it closes the door on the conversation they need.' },
          { text: 'Thank you. That means a lot. Coffee later, just us? I want to hear how you feel about it.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Lucía has to plan for her first ___ days. (a number)',
        answers: ['90', 'ninety'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why talk to Marta first, before the rest of the team?',
        options: [
          { text: "It's the relationship most at risk, and it's easiest to talk about early" },
          { text: 'To get Marta on her side against Diego', why: 'This is about the friendship, not taking sides.' },
          { text: 'Because Carmen told her to', why: 'Carmen said "be kind". The coffee is Lucía\'s idea.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: "Put Lucía's morning in order.",
        lines: ['Carmen offers her the job.', 'Lucía walks back to her desk.', 'The announcement lands in the team chat.', 'Marta goes to lunch early.', 'Lucía asks herself what she is now.'],
      },
      {
        kind: 'findBug',
        prompt: "Lucía's plan for Day 1. Which idea will backfire?",
        lines: [
          'Have a coffee with Marta.',
          'Announce big changes to how the team works by lunchtime.',
          'Ask each person how the change feels for them.',
        ],
        bug: 1,
        fix: 'Listen first; change things later, once she understands them.',
        explanation: "Big changes on Day 1, before she's asked a single question, tell the team their views don't matter.",
      },
      {
        kind: 'matchPairs',
        prompt: "Who's who at Nopal?",
        pairs: [
          ['Carmen', "Lucía's boss"],
          ['Marta', 'Her best work friend, who also applied'],
          ['Diego', 'Twelve years at Nopal'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: "What changed for Lucía.",
        template: 'Yesterday she was one of the [[1]]. Today she [[2]] it, including her best [[3]].',
        blanks: [['team'], ['leads'], ['friend']],
        distractors: ['boss', 'quits'],
      },
      {
        kind: 'tapBuild',
        prompt: "Build Lucía's question to herself.",
        tiles: ['Yesterday', 'I', 'was', 'one', 'of', 'them.'],
        distractors: ['boss'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you got a new role, or watched a friend get promoted. What changed between you and the people around you?',
    starters: ['When it happened...', 'What changed was...'],
  },
  deepen: {
    title: 'Notice the shift',
    summary: 'If you lead people, even informally, notice this week how people talk to you compared with how they talk to each other. That gap is normal. Leading well is about closing it.',
  },
  notes: 'Story setup. Nopal, Carmen, Marta, Sofía, Tomás and Rafa are course-only characters (CAST.md). Managing former peers is a widely reported challenge for new managers (e.g. Linda Hill, Becoming a Manager).',
};

export default lesson;
