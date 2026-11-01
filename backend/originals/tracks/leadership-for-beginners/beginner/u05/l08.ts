import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Card deck: celebrate and learn (Amabile & Kramer's progress principle; after-action reviews). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Celebrate and learn',
  summary: 'Launch day. 9 a.m.: the banner goes live. 9:04: the first pre-order map state lights up. By 6 p.m., 5,300 pre-orders, past the goal. Lucía wants to celebrate, AND make sure next launch is easier. Tey deals the last cards.',
  minutes: 11,
  outcomes: [
    'Celebrate progress in a way that motivates',
    'Run a short after-action review',
    'Turn one launch into lessons for the next',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Two things good teams do after a big push: they <strong>celebrate</strong>, and they <strong>learn</strong>. Most teams do one, or neither, because everyone's exhausted and the next thing is already waiting. Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Progress is the biggest motivator</h3><p>Harvard researchers <strong>Teresa Amabile</strong> and <strong>Steven Kramer</strong> studied nearly 12,000 diary entries from knowledge workers. They found that of all the things that can boost people's mood and motivation at work, the most powerful was <strong>making progress in meaningful work</strong>, even small steps. They called it the progress principle.</p><h3>Card 2: Make progress visible</h3><p>The pre-order map lighting up, state by state, did exactly this. Sofía's idea wasn't just fun. It made progress visible to everyone.</p><h3>Card 3: Celebrate specific people</h3><p>Not \"great job, team!\" Name what each person did. In the way they like it: Sofía gets a note, Tomás a mention in the team chat.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: The after-action review</h3><p>The US Army developed the <strong>after-action review</strong>: four simple questions after any big event. What did we expect to happen? What actually happened? Why was there a difference? What will we do next time?</p><h3>Card 5: Keep it blameless</h3><p>Chapter 2's rule: ask what made things hard, not who messed up. The barcode problem was the supplier's, but the lesson is ours: check a sample bag earlier.</p><h3>Card 6: Write down three lessons</h3><p>Not thirty. Three things you'll actually do next time. Put them where the next launch plan starts.</p>",
    },
    {
      kind: 'check',
      question: 'What did Amabile and Kramer find was the biggest motivator at work?',
      options: ['Making progress in meaningful work', 'Free snacks', 'Big bonuses'],
      answer: 0,
      explanation: 'Even small steps forward boosted mood and motivation most.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Make progress visible. Celebrate specific people, their way. Then four questions: expected, happened, why, next time. Three lessons, written down.',
    },
  ],
  apply: {
    scenario: 'Launch day, 6 p.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the progress principle?',
        options: [
          { text: 'Always work faster', why: 'It\'s about seeing progress, not speed.' },
          { text: 'Only big wins count', why: 'Small steps count too.' },
          { text: 'Making progress in meaningful work boosts motivation most' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the after-action review questions in order.',
        lines: ['What did we expect?', 'What actually happened?', 'Why the difference?', 'What will we do next time?'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Celebrate or learn?',
        groups: ['Celebrate', 'Learn'],
        items: [
          { text: 'A note for Sofía about the map', group: 0 },
          { text: '"Why was there a difference?"', group: 1 },
          { text: 'Naming Tomás\'s test sends in the chat', group: 0 },
          { text: 'Three lessons, written down', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: 'Do we really need a review meeting? We hit the goal.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Twenty minutes, Thursday. We hit it the hard way. Let\'s make the next one easier.' },
          { text: 'Yes, two hours, mandatory.', why: 'Short is enough, and kinder after a long week.' },
          { text: 'You\'re right, let\'s skip it.', why: 'Then the barcode lesson gets lost.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The US Army\'s four-question review is the after-___ review. (one word)',
        answers: ['action', 'Action'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card to the move.',
        pairs: [
          ['Make progress visible', 'The pre-order map'],
          ['Keep it blameless', 'Check a sample bag earlier'],
          ['Three lessons', 'Where the next plan starts'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why only three lessons, not thirty?',
        options: [
          { text: 'Nothing else went wrong', why: 'Plenty did. Pick the most useful.' },
          { text: 'Three get used; thirty get forgotten' },
          { text: 'To save paper', why: 'It\'s about actually using them.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s celebration plan. Which line misses Chapter 4?',
        lines: [
          'Note for Sofía about the map.',
          'Big "Great job, team!" email, and that\'s it.',
          'Name Tomás\'s test sends in the team chat.',
        ],
        bug: 1,
        fix: 'One line per person: what they did and why it mattered.',
        explanation: 'Vague group praise is easy to ignore. Specific praise sticks.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'First [[1]], then [[2]]. Three lessons, [[3]] down.',
        blanks: [['celebrate'], ['learn'], ['written']],
        distractors: ['blame', 'forget'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the last review question.',
        tiles: ['What', 'will', 'we', 'do', 'next', 'time?'],
        distractors: ['blame'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you finished recently. Run the four questions: expected, happened, why, next time. What\'s your top lesson?',
    starters: ['I expected...', 'What happened was...', 'Next time...'],
  },
  deepen: {
    title: 'Four questions',
    summary: 'After your next big task or event, spend ten minutes on the four questions. Write down three lessons and put them where you\'ll start next time.',
  },
  notes: 'Teresa M. Amabile & Steven J. Kramer, The Progress Principle (2011) and "The Power of Small Wins" (HBR 2011): ~12,000 daily diary entries from 238 knowledge workers. US Army after-action review (AAR) four questions. Blameless learning (Chapter 2). Fictional figures (5,300 pre-orders).',
};

export default lesson;
