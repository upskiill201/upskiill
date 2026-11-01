import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. The lift: Ada meets the head judge and talks about her database for 30 floors. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The lift',
  summary: 'Ada\'s ajo app has been shortlisted for "60 Seconds", the pitch night at the Lagos Tech Fest. On day one she steps into a lift with the head judge, Mrs Funke Adeyemi. "So, what\'s your app?" Thirty floors later, the doors open.',
  minutes: 12,
  outcomes: [
    'See what goes wrong when a pitch has no plan',
    'Know what an elevator pitch is for',
    'Know this course\'s goal: one great minute, for anything you need to pitch',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Lagos Tech Fest, Monday, 9:02 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Four months ago, Ada built a little app to run her office ajo, the savings group where ten colleagues each pay ₦20,000 a month and one person takes the pot. No more notebook. No more arguments about who paid.' },
        { speaker: 'narrator', text: 'Last week, her colleague Tunde secretly entered it into "60 Seconds", a pitch night for young builders. This morning, an email: SHORTLISTED. Pitch night is in five weeks. One minute on stage. Three judges. Three hundred people.' },
        { speaker: 'ada', text: '(in the lift, reading the email for the ninth time) One minute. ONE minute. I can\'t even order jollof in one minute.' },
        { speaker: 'narrator', text: 'The doors open on floor 2. In walks a tall woman with a lanyard: MRS FUNKE ADEYEMI, HEAD JUDGE. She presses 32. She looks at Ada\'s finalist badge.' },
        { speaker: 'narrator', text: 'Mrs Adeyemi: "Oh, a finalist. So, what\'s your app?"' },
        { speaker: 'ada', text: 'Oh! Um. Hi. So, it\'s built in Python, and I started with a list, then a dictionary, and there\'s a SQLite database now, with a members table and a payments table, and the dates were really hard because...' },
        { speaker: 'narrator', text: 'Floor 15. Ada is explaining date formats. Floor 24. Ada is explaining why Tunde\'s name was stored three different ways. Floor 32. Ding.' },
        { speaker: 'narrator', text: 'Mrs Adeyemi: "Hmm." She smiles politely, and walks out.' },
        { speaker: 'ada', text: '(to the empty lift) ...it helps people save money. That\'s what it does. I forgot to say what it does.' },
      ],
      choice: {
        prompt: 'Ada calls Arjun, her mentor, in a panic. What should he ask her first?',
        options: [
          {
            text: '"In one sentence: who is your app for, and what does it do for them?"',
            outcome: 'Ada stops. Thinks. "It\'s for office savings groups. It tracks who\'s paid, so nobody argues about money." Arjun: "THAT. You said that in four seconds. You spent thirty floors on databases."',
            best: true,
          },
          {
            text: '"Which database did you mention? Maybe she\'d prefer PostgreSQL."',
            outcome: 'Ada starts explaining again. The judge didn\'t care which database. She cared what it does, and for whom.',
          },
          {
            text: '"Don\'t worry, judges never remember lift chats."',
            outcome: 'Comforting, maybe. But Mrs Adeyemi will be on the panel in five weeks, and her first impression was "the database girl".',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p><strong>An elevator pitch</strong> is a short, clear answer to \"So, what do you do?\" or \"What's your idea?\", short enough to finish in a lift ride. Its job isn't to explain everything. Its job is to make someone want to <em>hear more</em>.</p><p><strong>This course:</strong> follow Ada for five weeks, from the lift disaster to her minute on stage. Every chapter, her pitch gets better. And every lesson, you build <em>your own</em>: for a job, an idea, a business, or just \"what do you do?\" at a party.</p>",
    },
  ],
  apply: {
    scenario: 'Lagos Tech Fest. The lift.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Ada forget to say in the lift?',
        options: [
          { text: 'Which database she used', why: 'She said that. Several times.' },
          { text: 'What the app actually does, and for whom' },
          { text: 'Her name', why: 'The badge had her name. It didn\'t have her point.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'What the judge needed, or what Ada talked about?',
        groups: ['What the judge needed', 'What Ada talked about'],
        items: [
          { text: 'Who the app is for', group: 0 },
          { text: 'SQLite tables', group: 1 },
          { text: 'What problem it solves', group: 0 },
          { text: 'Date formats', group: 1 },
          { text: 'Tunde\'s name stored three ways', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I know SO much about this app. Why did it come out so badly?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'You don\'t know enough yet.', why: 'She knows plenty. She chose the wrong part.' },
          { text: 'Judges just don\'t like apps.', why: 'She\'s judging an app competition.' },
          { text: 'Knowing a lot isn\'t the problem. You told her how it\'s built, not why it matters. A pitch starts with why.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The job of an elevator pitch: make someone want to hear ___. (one word)',
        answers: ['more'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Ada\'s morning in order.',
        lines: ['Tunde enters her app without telling her.', 'The SHORTLISTED email arrives.', 'The head judge gets in the lift.', 'Ada talks about databases for 30 floors.', 'The judge says "Hmm" and leaves.'],
      },
      {
        kind: 'mcq',
        prompt: 'What is an elevator pitch for?',
        options: [
          { text: 'A short, clear answer that makes someone want to hear more' },
          { text: 'Explaining everything about your idea', why: 'There isn\'t time, and nobody wants that.' },
          { text: 'Only for startup founders', why: 'Job seekers, students and employees pitch all the time.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s lift pitch. Which line should have come FIRST?',
        lines: [
          'It\'s built in Python with a SQLite database.',
          'There\'s a members table and a payments table.',
          'It helps office savings groups track who\'s paid, so nobody argues about money.',
        ],
        bug: 2,
        fix: 'Move it to the start: say what it does, and for whom, first.',
        explanation: 'The most important line came last, after the doors opened. Lead with what it does.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Who\'s who?',
        pairs: [
          ['Ada', 'Built the ajo app'],
          ['Tunde', 'Entered it without telling her'],
          ['Mrs Adeyemi', 'Head judge'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'What Ada should have said.',
        template: 'It\'s for office [[1]] groups. It tracks who\'s [[2]], so nobody argues about [[3]].',
        blanks: [['savings', 'ajo'], ['paid'], ['money']],
        distractors: ['SQLite', 'tables'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the question Arjun asks.',
        tiles: ['Who', 'is', 'it', 'for,', 'and', 'what', 'does', 'it', 'do?'],
        distractors: ['database'],
      },
    ],
  },
  reflect: {
    prompt: 'What do you need to pitch: yourself, an idea, a project or a business? Write down what it is, and who you\'d most like to pitch it to.',
    starters: ['I need to pitch...', 'To...'],
  },
  deepen: {
    title: 'Ask a friend the lift question',
    summary: 'Ask a friend: "If I had 30 seconds in a lift with you, what would you want to know about what I do?" Their answer is a clue to what your pitch should lead with.',
  },
  notes: 'Story setup. Ada (24, Lagos) and the ajo app continue Python for Beginners; Tunde is the ajo member from that course (named extra). Mrs Funke Adeyemi, the competition and the prize are fictional.',
};

export default lesson;
